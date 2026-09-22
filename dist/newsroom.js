(() => {
 const rows=[...document.querySelectorAll('.newsroom-row')],years=[...document.querySelectorAll('.newsroom-year')];
 const button=document.getElementById('newsroom-more'),status=document.getElementById('newsroom-status');
 if(!button)return;
 let visible=5;
 function render(){rows.forEach((row,index)=>row.hidden=index>=visible);years.forEach(year=>year.hidden=![...year.querySelectorAll('.newsroom-row')].some(row=>!row.hidden));button.hidden=visible>=rows.length;status.textContent=`전체 ${rows.length}건 중 ${Math.min(visible,rows.length)}건 표시`;}
 button.addEventListener('click',()=>{const next=rows[visible];visible+=5;render();next?.querySelector('.newsroom-copy h3 a')?.focus({preventScroll:true});});render();
})();
