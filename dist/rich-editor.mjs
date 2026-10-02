import {renderBlocks} from '/cms-render.mjs';
import {tags,attrs,safeStyle} from '/content-tree.mjs';
import {validateTree} from '/content-document.mjs';
export function htmlToTree(html,resolveURL=v=>v){
 const doc=new DOMParser().parseFromString(html,'text/html');
 function node(n){
  if(n.nodeType===3)return {type:'text',text:n.nodeValue};
  if(n.nodeType!==1)return null;
  const tag=n.localName;if(!tags.has(tag))throw new Error('지원하지 않는 콘텐츠가 있습니다: '+tag+'. 원문을 유지한 상태에서 확인해 주세요.');
  const properties={};for(const a of n.attributes){
   if(a.name.startsWith('data-jodit')||['contenteditable','draggable','spellcheck'].includes(a.name))continue;
   if(!attrs.has(a.name))throw new Error('지원하지 않는 속성이 있습니다. 저장을 취소했습니다.');
   properties[a.name]=a.name==='style'?safeStyle(a.value):['src','poster'].includes(a.name)?resolveURL(a.value):a.value;
  }
  if(properties.class)properties.class=properties.class.split(/\s+/).filter(c=>!c.startsWith('jodit')).join(' ');
  return {type:'element',tag,attrs:properties,children:[...n.childNodes].map(node).filter(Boolean)};
 }
 return validateTree([...doc.body.childNodes].map(node).filter(Boolean));
}
export function createRichEditor(target,{onChange,onImage,onGallery,onSelectImage}){
 const editor=Jodit.make(target,{
  language:'ko',height:'auto',minHeight:550,toolbarSticky:true,toolbarStickyOffset:0,
  toolbarAdaptive:false,showCharsCounter:false,showWordsCounter:false,showXPathInStatusbar:false,
  askBeforePasteHTML:false,askBeforePasteFromWord:false,defaultActionOnPaste:'insert_as_html',
  cleanHTML:{removeEmptyElements:false,fillEmptyParagraph:false,replaceNBSP:false,removeTrailingBr:false,replaceOldTags:false,removeEventAttributes:true,safeJavaScriptLink:true,convertUnsafeEmbeds:false},
  disablePlugins:['wrap-nodes','paste-storage','image-properties','image','file','video','iframe','source','powered-by-jodit'],
  buttons:['paragraph','font','fontsize','|','bold','italic','underline','superscript','brush','|','align','ul','ol','link','table','|','undo','redo',
   {name:'cmsImage',text:'이미지',tooltip:'커서에 이미지 삽입',exec:()=>onImage()},
   {name:'cmsGallery',text:'이미지 모음',tooltip:'최대 3장',exec:()=>onGallery()}],
  controls:{font:{list:{'Pretendard Variable, sans-serif':'기본 (Pretendard)','Arial, sans-serif':'Arial','Georgia, serif':'Georgia'}},paragraph:{list:{p:'본문',h2:'소제목',h3:'작은 소제목',blockquote:'인용'}}},
  events:{beforePaste:e=>{const html=e.clipboardData?.getData('text/html');if(html){try{htmlToTree(html);}catch(error){alert('붙여넣을 내용에 지원하지 않는 서식이 있습니다. '+error.message);return false;}}},change:()=>onChange(),click:e=>{if(e.target?.tagName==='IMG')onSelectImage(e.target);}}
 });
 return editor;
}
