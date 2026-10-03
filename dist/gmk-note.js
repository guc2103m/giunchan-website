(()=>{
const grid=document.querySelector('#note-grid'),status=document.querySelector('#note-status'),retry=document.querySelector('#note-retry');
let posts=[],activeFilter='all';
const el=(tag,text,className)=>{const node=document.createElement(tag);if(text)node.textContent=text;if(className)node.className=className;return node;};
const terms={mushroom:['버섯'],mycelium:['균사','균사체'],gmk:['gmk'],food:['식품','건강']};
function render(){
 const shown=posts.filter(p=>activeFilter==='all'||terms[activeFilter].some(term=>(p.title+' '+p.description).toLocaleLowerCase('ko').includes(term)));grid.replaceChildren();
 for(const [index,p] of shown.entries()){
  const href=p.detailUrl||((p.importStatus==='ready'||p.slug==='hyphae-mycelium-mushrooms')?`/gmk-note/${encodeURIComponent(p.slug)}/`:null);
  const card=el('article',null,'note-card'),a=el(href?'a':'div');if(href){a.href=href;a.setAttribute('aria-label',p.title+' — 연구노트 읽기');}
  const media=el('div',null,'note-media'),placeholder=el('span','GMK RESEARCH NOTE','note-placeholder');media.append(placeholder);
  if(p.image){if(['gmk-brain-research','gmk-natural-material','gmk-learning-journey','reading-mushrooms'].includes(p.slug))media.classList.add('note-media--contain');const img=el('img');img.alt=p.title+' 대표 이미지';img.width=800;img.height=500;img.sizes='(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw';img.loading=index<3?'eager':'lazy';img.decoding='async';if(index<3)img.fetchPriority='high';img.referrerPolicy='no-referrer';img.addEventListener('load',()=>{placeholder.hidden=true});img.addEventListener('error',()=>{img.remove();placeholder.hidden=false},{once:true});img.src=p.image;media.append(img);}
  const content=el('div',null,'note-content');content.append(el('p',p.categories.join(' · ')||'GMK연구노트','note-category'),el('h2',p.title),el('p',p.description||'','note-summary'));
  if(p.date){const time=el('time',new Date(p.date).toLocaleDateString('ko-KR',{timeZone:'Asia/Seoul',year:'numeric',month:'long',day:'numeric'}));time.dateTime=p.date;content.append(time);}
  content.append(el('span','글 읽기 →','note-read'));a.append(media,content);card.append(a);grid.append(card);
 }
 status.textContent=shown.length?`GMK연구노트 ${shown.length}개`:'현재 표시할 연구노트가 없습니다.';
}
async function load(){
 retry.hidden=true;grid.setAttribute('aria-busy','true');status.textContent='연구노트를 불러오고 있습니다.';
 try{const response=await fetch('/api/naver-blog',{signal:AbortSignal.timeout(15000)});if(!response.ok)throw new Error('RSS API HTTP '+response.status);const data=await response.json();posts=data.posts;render();}
 catch(error){grid.replaceChildren();status.textContent='현재 연구노트를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.';retry.hidden=false;if(['localhost','127.0.0.1'].includes(location.hostname))console.error('[gmk-note]',error);}
 finally{grid.setAttribute('aria-busy','false');}
}
document.querySelectorAll('[data-note-filter]').forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.noteFilter;document.querySelectorAll('[data-note-filter]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));render();}));retry.addEventListener('click',load);load();
})();
