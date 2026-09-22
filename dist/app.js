// Shared desktop disclosures and mobile accordion; links retain their routes.
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
const header=document.querySelector('.site-header');
const mobile=matchMedia('(max-width:1023px)');
const items=[...nav.querySelectorAll('.nav-item')];
let opened=null;
function setExpanded(item,open){
 item.querySelector('.nav-dropdown').hidden=!open;
 item.querySelectorAll('[aria-expanded]').forEach(el=>el.setAttribute('aria-expanded',String(open)));
 item.classList.toggle('is-open',open);
}
function closeDropdown(){if(opened)setExpanded(opened,false);opened=null;}
function positionDropdown(item){
 const panel=item.querySelector('.nav-dropdown');panel.style.removeProperty('left');
 if(mobile.matches)return;
 const box=panel.getBoundingClientRect();
 const shift=Math.min(0,innerWidth-16-box.right);
 panel.style.left=`${Math.max(16-box.left,shift)}px`;
}
function openDropdown(item){
 if(opened!==item)closeDropdown();opened=item;setExpanded(item,true);positionDropdown(item);
}
function closeMenu(){closeDropdown();nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','메뉴 열기');}
toggle.addEventListener('click',()=>{
 const open=toggle.getAttribute('aria-expanded')!=='true';closeMenu();
 nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');
});
items.forEach(item=>{
 item.addEventListener('pointerenter',e=>{if(!mobile.matches&&e.pointerType!=='touch')openDropdown(item);});
 item.addEventListener('pointerleave',e=>{if(!mobile.matches&&e.pointerType!=='touch'&&opened===item)closeDropdown();});
 item.addEventListener('focusin',e=>{if(!mobile.matches&&e.target.matches('.nav-parent,.nav-dropdown a'))openDropdown(item);});
 item.addEventListener('focusout',e=>{if(!mobile.matches&&!item.contains(e.relatedTarget)&&opened===item)closeDropdown();});
 item.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{opened===item?closeDropdown():openDropdown(item);}));
 item.addEventListener('keydown',e=>{
  if(e.key==='ArrowDown'&&!e.target.closest('.nav-dropdown')){e.preventDefault();openDropdown(item);item.querySelector('.nav-dropdown a').focus();}
 });
});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
nav.querySelectorAll(':scope > a').forEach(a=>a.addEventListener('pointerenter',()=>{if(!mobile.matches)closeDropdown();}));
document.addEventListener('pointerdown',e=>{if(!header.contains(e.target))closeMenu();});
document.addEventListener('keydown',e=>{
 if(e.key!=='Escape')return;
 if(opened){const target=opened.querySelector(mobile.matches?'.nav-mobile-trigger':'.nav-parent');target.focus();closeDropdown();e.preventDefault();}
 else if(nav.classList.contains('open')){closeMenu();toggle.focus();e.preventDefault();}
});
document.addEventListener('focusin',e=>{if(!header.contains(e.target))closeMenu();});
mobile.addEventListener('change',closeMenu);
window.addEventListener('resize',()=>{if(opened)positionDropdown(opened);});

const search=document.querySelector('.search-form');
if(search){
 const filterButtons=[...document.querySelectorAll('[data-filter]')];
 const cards=[...document.querySelectorAll('#article-list .insight-card')];
 function renderSearch(){const url=new URL(location.href);const filter=['research','press'].includes(url.searchParams.get('category'))?url.searchParams.get('category'):'all';const q=url.searchParams.get('q')||'';search.elements.q.value=q;let count=0;cards.forEach(card=>{card.hidden=!((filter==='all'||card.dataset.category===filter)&&card.textContent.toLocaleLowerCase().includes(q.toLocaleLowerCase()));if(!card.hidden)count++;});filterButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));document.querySelector('#result-count').textContent=`${count}개의 글`;document.querySelector('#no-results').hidden=count!==0;}
 function update(filter){const url=new URL(location.href);const q=search.elements.q.value.trim();q?url.searchParams.set('q',q):url.searchParams.delete('q');filter==='all'?url.searchParams.delete('category'):url.searchParams.set('category',filter);history.pushState({},'',url);renderSearch();}
 filterButtons.forEach(b=>b.addEventListener('click',()=>update(b.dataset.filter)));search.addEventListener('submit',e=>{e.preventDefault();update(document.querySelector('[data-filter][aria-pressed=true]').dataset.filter)});window.addEventListener('popstate',renderSearch);renderSearch();
}
