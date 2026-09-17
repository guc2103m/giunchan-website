const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','메뉴 열기');}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();toggle.focus();}});
nav?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
const search=document.querySelector('.search-form');
if(search){
 const filterButtons=[...document.querySelectorAll('[data-filter]')];
 const cards=[...document.querySelectorAll('#article-list .insight-card')];
 function renderSearch(){const url=new URL(location.href);const filter=['research','press'].includes(url.searchParams.get('category'))?url.searchParams.get('category'):'all';const q=url.searchParams.get('q')||'';search.elements.q.value=q;let count=0;cards.forEach(card=>{card.hidden=!((filter==='all'||card.dataset.category===filter)&&card.textContent.toLocaleLowerCase().includes(q.toLocaleLowerCase()));if(!card.hidden)count++;});filterButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));document.querySelector('#result-count').textContent=`${count}개의 글`;document.querySelector('#no-results').hidden=count!==0;}
 function update(filter){const url=new URL(location.href);const q=search.elements.q.value.trim();q?url.searchParams.set('q',q):url.searchParams.delete('q');filter==='all'?url.searchParams.delete('category'):url.searchParams.set('category',filter);history.pushState({},'',url);renderSearch();}
 filterButtons.forEach(b=>b.addEventListener('click',()=>update(b.dataset.filter)));search.addEventListener('submit',e=>{e.preventDefault();update(document.querySelector('[data-filter][aria-pressed=true]').dataset.filter)});window.addEventListener('popstate',renderSearch);renderSearch();
}
const form=document.querySelector('.contact-form');
if(form){
 const params=new URLSearchParams(location.search);const types=['ingredient','development','partnership','consumer'];
 form.elements.type.value=types.includes(params.get('type'))?params.get('type'):'ingredient';
 const interest=params.get('material')||params.get('product');if([...form.elements.interest.options].some(o=>o.value===interest))form.elements.interest.value=interest;
 const help={ingredient:'관심 소재와 적용 목적을 알려주세요.',development:'구상 중인 제품과 필요한 협력 범위를 알려주세요.',partnership:'검토 목적과 필요한 자료를 알려주세요.',consumer:'제품명과 궁금한 내용을 알려주세요.'};
 const sync=()=>{const consumer=form.elements.type.value==='consumer';form.elements.company.required=!consumer;document.querySelector('#company-required').textContent=consumer?'(선택)':'(필수)';document.querySelector('#type-help').textContent=help[form.elements.type.value];};
 form.elements.type.addEventListener('change',sync);sync();
 form.addEventListener('submit',e=>{e.preventDefault();const result=form.querySelector('.result');const invalid=[...form.elements].find(el=>el.willValidate&&!el.validity.valid);if(invalid){invalid.setAttribute('aria-invalid','true');invalid.focus();result.classList.add('error');result.textContent=invalid.name==='email'&&invalid.value?'이메일 주소를 다시 확인해 주세요.':'필수 항목을 확인해 주세요.';return;}result.classList.remove('error');result.textContent='입력 내용을 확인했습니다. 아직 접수되지 않았습니다. 전화 또는 이메일로 문의해 주세요.';});
 form.addEventListener('input',e=>{if(e.target.validity?.valid)e.target.removeAttribute('aria-invalid');});
}
