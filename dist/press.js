if(location.hash==='#press'||new URL(location.href).searchParams.get('category')==='press')location.replace('/newsroom/');
(() => {
 const panel=document.getElementById('research-panel');
 if(!panel)return;
 const cards=[...panel.querySelectorAll('#article-list > .insight-card')];
 const nav=panel.querySelector('.research-pagination');
 const status=panel.querySelector('.research-page-status');
 const pageSize=9,total=Math.max(1,Math.ceil(cards.length/pageSize));
 let current=1;
 const render=(page,move=false)=>{
  current=Math.max(1,Math.min(total,page));
  cards.forEach((card,i)=>{card.hidden=i<(current-1)*pageSize||i>=current*pageSize;});
  nav.hidden=total<=1;nav.replaceChildren();
  const button=(label,page,disabled=false,active=false)=>{
   const b=document.createElement('button');b.type='button';b.textContent=label;b.disabled=disabled;
   b.setAttribute('aria-label',label==='이전'||label==='다음'?label+' 페이지':label+' 페이지');
   if(active)b.setAttribute('aria-current','page');
   b.addEventListener('click',()=>{const url=new URL(location.href);url.searchParams.set('researchPage',page);url.hash='research';history.pushState(null,'',url);render(page,true);});nav.append(b);
  };
  if(total>1){button('이전',current-1,current===1);for(let i=1;i<=total;i++)button(String(i),i,false,i===current);button('다음',current+1,current===total);}
  status.textContent=cards.length?`전체 ${cards.length}개 · ${current} / ${total} 페이지`:'등록된 연구자료가 없습니다.';
  if(move){panel.scrollIntoView({block:'start'});nav.querySelector('[aria-current=page]')?.focus({preventScroll:true});}
 };
 const fromURL=()=>render(Number.parseInt(new URL(location.href).searchParams.get('researchPage'),10)||1);
 window.addEventListener('popstate',fromURL);fromURL();
})();
