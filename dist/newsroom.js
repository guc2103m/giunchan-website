document.querySelectorAll('[data-newsroom-image]').forEach(img=>{
 const fallback=()=>{img.hidden=true;const placeholder=img.parentElement.querySelector('.newsroom-placeholder');if(placeholder)placeholder.hidden=false;};
 img.addEventListener('error',fallback,{once:true});
 if(img.complete&&!img.naturalWidth)fallback();
});
