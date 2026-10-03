(()=>{
const grid=document.querySelector('#note-grid'),status=document.querySelector('#note-status'),search=document.querySelector('#note-search'),retry=document.querySelector('#note-retry');
let posts=[],categoryIdentified=false;
const el=(tag,text,className)=>{const node=document.createElement(tag);if(text)node.textContent=text;if(className)node.className=className;return node;};
function render(){
 const q=search.value.trim().toLocaleLowerCase('ko');
 const shown=posts.filter(p=>(p.title+' '+p.description).toLocaleLowerCase('ko').includes(q));grid.replaceChildren();
 for(const p of shown){
  const card=el('article',null,'note-card'),a=el(p.detailUrl?'a':'div');if(p.detailUrl){a.href=p.detailUrl;a.setAttribute('aria-label',p.title+' — 연구노트 읽기');}
  const media=el('div',null,'note-media'),placeholder=el('span','GMK RESEARCH NOTE','note-placeholder');media.append(placeholder);
  if(p.image){const img=el('img');img.alt=p.title+' 대표 이미지';img.loading='lazy';img.referrerPolicy='no-referrer';img.addEventListener('load',()=>{placeholder.hidden=true});img.addEventListener('error',()=>{img.remove();placeholder.hidden=false},{once:true});img.src=p.image;media.append(img);}
  const content=el('div',null,'note-content');content.append(el('p',p.categories.join(' · ')||'네이버 블로그','note-category'),el('h2',p.title),el('p',p.description||'네이버 블로그에서 전체 내용을 읽어보세요.','note-summary'));
  if(p.date){const time=el('time',new Date(p.date).toLocaleDateString('ko-KR',{timeZone:'Asia/Seoul',year:'numeric',month:'long',day:'numeric'}));time.dateTime=p.date;content.append(time);}
  if(p.detailUrl)content.append(el('span','글 읽기 →','note-read'));a.append(media,content);card.append(a);if(!p.detailUrl){card.append(el('p','전체 본문 가져오기 준비 중','note-import-status'));const original=el('a','네이버 원문 보기 →','note-pending-link');original.href=p.url;original.target='_blank';original.rel='noopener noreferrer';card.append(original);}grid.append(card);
 }
 status.textContent=shown.length?`${categoryIdentified?'GMK연구노트':'RSS 전체 글'} ${shown.length}개${q?' · 검색 결과':''}`:(q?'검색 결과가 없습니다. 다른 검색어를 입력해 주세요.':'현재 표시할 연구노트가 없습니다.');
}
async function load(){
 retry.hidden=true;grid.setAttribute('aria-busy','true');status.textContent='연구노트를 불러오고 있습니다.';
 try{const response=await fetch('/api/naver-blog',{signal:AbortSignal.timeout(15000)});if(!response.ok)throw new Error('RSS API HTTP '+response.status);const data=await response.json();posts=data.posts;categoryIdentified=data.categoryIdentified;render();}
 catch(error){grid.replaceChildren();status.textContent='현재 연구노트를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.';retry.hidden=false;if(['localhost','127.0.0.1'].includes(location.hostname))console.error('[gmk-note]',error);}
 finally{grid.setAttribute('aria-busy','false');}
}
search.addEventListener('input',render);document.querySelector('#note-all').addEventListener('click',()=>{search.value='';render();});retry.addEventListener('click',load);load();

})();
