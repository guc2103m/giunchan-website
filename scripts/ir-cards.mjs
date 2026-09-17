const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const foundation=['foundation-technology','foundation-intellectual-property','foundation-research-evidence','foundation-commercialization'];
const photos={I03:['revenue-material-supply','revenue-consumer-products','revenue-product-collaboration'],I04:['growth-cognitive-material','growth-supply-infrastructure','growth-global-partnership']};
export function irCards(id,ts){
 if(id==='I02')return '<div class="concept-cards ir-foundations">'+ts.map((t,i)=>{const [title,...body]=t.split(' — ');return '<article class="concept-card"><span class="visual-label">0'+(i+1)+'</span><div class="ir-foundation-art"><img class="ir-foundation-'+(i+1)+'" src="/assets/'+foundation[i]+'-display.png" alt="" aria-hidden="true" loading="lazy"></div><h3>'+e(title)+'</h3><p>'+e(body.join(' — '))+'</p></article>'}).join('')+'</div>';
 return '<div class="ir-photo-cards">'+photos[id].map((asset,i)=>'<article><img class="ir-card-photo" src="/assets/'+asset+'.png" width="1254" height="1254" alt="" loading="lazy"><div class="ir-card-copy"><span class="ir-card-number">0'+(i+1)+'</span><h3>'+e(ts[i*2])+'</h3><p>'+e(ts[i*2+1])+'</p></div></article>').join('')+'</div>';
}
