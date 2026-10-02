// Structured editorial blocks. No arbitrary HTML, scripts, styles or event handlers.
const tags=new Set('article header div span h1 h2 h3 h4 p strong em b i sup sub br time figure img figcaption nav ol ul li a blockquote section video source caption table thead tbody tr th td details summary picture'.split(' '));
const attrs=new Set('class id aria-label aria-labelledby aria-describedby role tabindex datetime width height loading decoding fetchpriority controls playsinline preload type scope colspan rowspan alt src href target rel poster sizes srcset open data-content-id aria-hidden'.split(' '));
const esc=v=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
export function safeEditorialURL(v){return typeof v==='string'&&((v.startsWith('/')&&!v.startsWith('//')&&!v.includes('\\'))||/^#[a-zA-Z0-9_-]+$/.test(v)||/^https?:\/\//.test(v))&&!/[\u0000-\u0020]/.test(v.replaceAll(' ','%20'))?v:'';}
export function renderTree(n){
 if(n.type==='text')return esc(n.text);
 if(n.type!=='element'||!tags.has(n.tag))return '';
 const properties=Object.entries(n.attrs||{}).filter(([k,v])=>attrs.has(k)&&k!=='rel'&&(!['src','href','poster'].includes(k)||safeEditorialURL(v))&&(k!=='srcset'||String(v).split(',').every(x=>safeEditorialURL(x.trim().split(/\s+/)[0])))).map(([k,v])=>` ${k}="${esc(v)}"`).join('');
 const rel=n.tag==='a'&&n.attrs?.target==='_blank'?' rel="noopener noreferrer"':'';
 return `<${n.tag}${properties}${rel}>`+(['img','br','source'].includes(n.tag)?'':(n.children||[]).map(renderTree).join('')+`</${n.tag}>`);
}
