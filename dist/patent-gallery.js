(() => {
 const dialog=document.querySelector('#certificate-dialog');
 if(!dialog)return;
 const filters=[...document.querySelectorAll('[data-patent-filter]')];
 const cards=[...document.querySelectorAll('.certificate-card')];
 const status=document.querySelector('.certificate-status');
 const heading=document.querySelector('#certificate-heading');
 if(filters.length&&status&&heading){
  heading.tabIndex=-1;
  status.parentElement.hidden=false;
  for(const filter of filters){
   filter.hidden=false;
   filter.addEventListener('click',()=>{
    const field=filter.dataset.patentFilter;
    for(const item of filters)item.setAttribute('aria-pressed',String(item===filter));
    for(const card of cards)card.hidden=field!=='all'&&card.dataset.field!==field;
    status.textContent=(field==='all'?'전체 특허증':filter.getAttribute('aria-label'))+' '+cards.filter(card=>!card.hidden).length+'건';
    if(field!=='all'){
     heading.focus({preventScroll:true});
     heading.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
    }
   });
  }
 }
 const viewer=dialog.querySelector('.certificate-viewer');
 const image=dialog.querySelector('.certificate-full');
 const zoom=dialog.querySelector('.certificate-zoom');
 const close=dialog.querySelector('.certificate-close');
 let opener=null,scrollY=0,previousStyle='',backdrop=false;
 function resetZoom(){viewer.classList.remove('is-zoomed');zoom.setAttribute('aria-pressed','false');zoom.textContent='원본 크기로 확대';viewer.scrollTop=0;viewer.scrollLeft=0;}
 document.querySelectorAll('.certificate-open').forEach(button=>button.addEventListener('click',()=>{
  opener=button;const thumb=button.querySelector('img');
  dialog.querySelector('#certificate-dialog-title').textContent=button.dataset.title;
  dialog.querySelector('#certificate-dialog-number').textContent=button.dataset.number;
  image.src=button.dataset.fullImage||thumb.getAttribute('src');image.alt=thumb.alt;image.width=Number(button.dataset.fullWidth||thumb.getAttribute('width'));image.height=Number(button.dataset.fullHeight||thumb.getAttribute('height'));
  image.style.setProperty('--certificate-width',image.width+'px');
  dialog.querySelector('.certificate-original').href=image.src;
  resetZoom();scrollY=window.scrollY;previousStyle=document.body.getAttribute('style')||'';
  document.body.style.position='fixed';document.body.style.top=`-${scrollY}px`;document.body.style.width='100%';document.body.style.overflow='hidden';
  dialog.showModal();close.focus();
 }));
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('keydown',e=>{
  if(e.key!=='Tab')return;
  const targets=[...dialog.querySelectorAll('button,a[href],[tabindex="0"]')];
  const first=targets[0],last=targets[targets.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
 });
 dialog.addEventListener('pointerdown',e=>{backdrop=e.target===dialog;});
 dialog.addEventListener('click',e=>{if(backdrop&&e.target===dialog)dialog.close();backdrop=false;});
 dialog.addEventListener('close',()=>{document.body.setAttribute('style',previousStyle);window.scrollTo({top:scrollY,behavior:'instant'});opener?.focus({preventScroll:true});resetZoom();});
 zoom.addEventListener('click',()=>{const expanded=viewer.classList.toggle('is-zoomed');zoom.setAttribute('aria-pressed',String(expanded));zoom.textContent=expanded?'화면에 맞추기':'원본 크기로 확대';});
})();
