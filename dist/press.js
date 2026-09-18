(() => {
 const tabs=[...document.querySelectorAll('.insights-tabs [role=tab]')];
 if(!tabs.length)return;
 const select=(press,focus=false)=>{tabs.forEach((tab,i)=>{const active=(i===1)===press;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;document.getElementById(tab.getAttribute('aria-controls')).hidden=!active;if(active&&focus)tab.focus();});};
 const fromURL=()=>select(location.hash==='#press'||new URL(location.href).searchParams.get('category')==='press');
 tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>{history.replaceState(null,'',i?'#press':'#research');select(i===1);});tab.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const press=event.key==='End'?true:event.key==='Home'?false:i===0;history.replaceState(null,'',press?'#press':'#research');select(press,true);}});});
 window.addEventListener('hashchange',fromURL);fromURL();
})();
