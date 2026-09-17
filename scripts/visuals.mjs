import {developmentTimeline} from './development-timeline.mjs';
import {irCards} from './ir-cards.mjs';
import {gmkProcess} from './gmk-process.mjs';
import {replacementImage} from './image-refresh.mjs';
// Content-preserving visual renderers. All descriptive text comes from the supplied scenario.
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const paths={
 culture:'<ellipse cx="24" cy="25" rx="18" ry="8"/><path d="M6 25v7c0 5 8 9 18 9s18-4 18-9v-7M11 22c4-9 22-9 26 0M18 25h1m9 2h1m-6-6h1"/>',
 flask:'<path d="M18 5h12M20 5v14L8 38c-2 3 0 5 3 5h26c3 0 5-2 3-5L28 19V5M15 28h18M18 35h1m9 3h1"/>',
 leaf:'<path d="M25 40V23M24 30C8 30 6 15 6 8c17 0 20 13 18 22ZM24 24C24 10 34 7 42 6c0 13-5 23-18 24M13 16l11 14M35 15 25 25"/>',
 grain:'<path d="M24 44V8M24 17C15 18 12 10 13 5c8 0 11 5 11 12ZM24 27c-9 1-12-7-11-12 8 0 11 5 11 12ZM24 37c-9 1-12-7-11-12 8 0 11 5 11 12ZM24 22c9 1 12-7 11-12-8 0-11 5-11 12ZM24 32c9 1 12-7 11-12-8 0-11 5-11 12Z"/>',
 network:'<circle cx="24" cy="24" r="7"/><circle cx="24" cy="5" r="3"/><circle cx="42" cy="17" r="3"/><circle cx="35" cy="40" r="3"/><circle cx="12" cy="40" r="3"/><circle cx="6" cy="17" r="3"/><path d="M24 8v9M39 18l-8 4M33 37l-5-7M14 37l6-7M9 18l8 4"/>',
 document:'<path d="M28 5H12v38h26V15L28 5ZM28 5v10h10M18 23h14M18 29h14M18 35h8"/>',
 shield:'<path d="M24 4 7 11v12c0 11 17 21 17 21s17-10 17-21V11L24 4Z"/><path d="m16 23 6 6 12-13"/>',
 chart:'<path d="M6 42h37M11 34V23h6v11M23 34V15h6v19M35 34V6h6v28M8 17 20 8l9 2L41 3"/>',
 target:'<circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="10"/><circle cx="24" cy="24" r="2"/><path d="m24 24 18-18M34 6h8v8"/>',
 box:'<path d="m24 5 18 10v20L24 45 6 35V15L24 5ZM6 15l18 10 18-10M24 25v20M15 10l18 10v8"/>',
 check:'<circle cx="24" cy="24" r="18"/><path d="m14 24 7 7 14-15"/>',
 partners:'<path d="m4 19 10-9 10 5 10-5 10 9M4 19l7 17 9 6 6-1 13-13M44 19 34 30 21 18l-6 4 7 5 7-4M4 19l9 4M44 19l-8 4M19 35l6 5M24 30l7 6"/>',
 globe:'<circle cx="24" cy="24" r="19"/><ellipse cx="24" cy="24" rx="9" ry="19"/><path d="M6 17h36M6 31h36M5 24h38"/>',
 clock:'<circle cx="24" cy="24" r="19"/><path d="M24 12v13l9 5"/>',
 light:'<path d="M17 34h14M18 39h12M21 44h6M16 29c-11-11-3-25 8-25s19 14 8 25l-1 5H17l-1-5ZM24 24v10"/>',
 pin:'<path d="M40 19c0 12-16 25-16 25S8 31 8 19a16 16 0 1 1 32 0Z"/><circle cx="24" cy="19" r="6"/>',
 mail:'<rect x="5" y="10" width="38" height="28" rx="2"/><path d="m5 12 19 15 19-15"/>',
 phone:'<path d="m11 5 8 10-5 5c4 7 8 11 15 15l5-5 10 8c-1 6-6 9-12 6C17 38 10 31 4 16 1 10 5 6 11 5Z"/>',
 cycle:'<path d="M39 16A17 17 0 0 0 9 11l-4 7M5 7v11h11M9 32a17 17 0 0 0 30 5l4-7M43 41V30H32"/>',
 search:'<circle cx="21" cy="20" r="14"/><path d="m32 31 12 13M21 13v14M14 20h14"/>',
 settings:'<circle cx="24" cy="24" r="8"/><path d="m19 5-1 6-6 3-6-2-3 8 5 4-1 6-4 4 6 7 6-3 6 2 2 6h9l1-6 5-4 6 1 3-8-5-3-1-6 4-5-6-6-6 3-6-2-2-6Z"/>',
 book:'<path d="M24 10C15 4 6 7 4 9v32c5-4 14-3 20 1 6-4 15-5 20-1V9c-2-2-11-5-20 1ZM24 10v32M10 16h8M10 23h8M30 16h8M30 23h8"/>'
};
export const icon=(name,cls='')=>`<svg class="line-icon ${cls}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.flask}</svg>`;
const img=(name,alt,cls='')=>replacementImage(name,cls)||`<img class="${cls}" src="/assets/${name}.webp" alt="${e(alt)}" loading="lazy" width="960" height="640">`;
const text=t=>`<p>${e(t)}</p>`;
const label=t=>`<span class="visual-label">${t}</span>`;
const photo=(name,cap='')=>`<figure class="editorial-photo">${img(name,cap||'소재와 연구를 표현한 이미지')}${cap?`<figcaption>${e(cap)}</figcaption>`:''}</figure>`;
export function infographic(kind='culture',images=null){
 const flows={culture:[['grain','함께 접종','다양한 버섯균사체와 곡물배지'],['culture','복합배양','처음부터 함께 배양'],['network','GMK®','천연물 바이오소재'],['leaf','원료·제품 활용','산업과 일상으로']],business:[['light','제품기획','목표와 제품 유형'],['flask','시제품','배합·적용 검토'],['partners','제조 협력','제조·공급 조건'],['box','납품','제품과 시장의 연결']],brand:[['flask','기운찬 연구','복합배양 기술'],['network','GMK®','연구에서 소재로'],['leaf','도두On','소재에서 제품으로'],['box','일상','소비자의 생활로']],nature:[['leaf','균사','보이지 않는 작은 시작'],['network','균사체','연결되며 자라는 생명력'],['cycle','버섯','밖으로 돋아나는 결과']]};
 const items=flows[kind];return `<div class="infographic infographic-${kind}" role="group" aria-label="${kind==='culture'?'복합배양 기술의 흐름':'단계별 연결'}">${items.map(([ic,t,d],i)=>`<div class="info-node ${t==='GMK®'?'info-core':''}"><span class="info-num">0${i+1}</span><div class="info-symbol">${images?`<img class="business-step-art business-step-art-${i+1}" src="/assets/${images[i]}-display.png" alt="" aria-hidden="true" loading="lazy">`:icon(ic)}</div><h3>${t}</h3><p>${d}</p>${i<items.length-1?'<span class="info-arrow" aria-hidden="true">→</span>':''}</div>`).join('')}</div>`;
}
const iconsById={C03:['culture','search','partners'],R02:['culture','shield','flask']};
function dashCards(ts,icons=[],className='',images=null){
 return `<div class="concept-cards ${className}">${ts.map((t,i)=>{const parts=t.split(' — ');return `<article class="concept-card">${label('0'+(i+1))}${images?`<div class="patent-art"><img class="patent-art-${i+1}" src="/assets/${images[i]}-display.png" alt="" aria-hidden="true" loading="lazy"></div>`:icon(icons[i%icons.length]||'network')}<h3>${e(parts[0])}</h3>${parts[1]?text(parts.slice(1).join(' — ')):''}</article>`}).join('')}</div>`;
}
function pairedCards(ts,icons,photos=[]){return `<div class="concept-cards">${Array.from({length:Math.ceil(ts.length/2)},(_,i)=>`<article class="concept-card ${photos[i]?'with-photo':''}">${photos[i]?img(photos[i],'연구와 소재를 표현한 이미지'):icon(icons[i]||'flask')}<div>${label('0'+(i+1))}<h3>${e(ts[i*2])}</h3>${text(ts[i*2+1]||'')}</div></article>`).join('')}</div>`;}
const strip=(a,b)=>`<div class="status-comparison"><div>${icon('check')}<span>완료한 연구</span><strong>${a}</strong></div><span class="status-connector" aria-hidden="true">→</span><div>${icon('clock')}<span>진행 중인 절차</span><strong>${b}</strong></div></div>`;
export function sectionClass(id){
 if(['C04','BB03','BB08','I06','BD04'].includes(id))return 'visual-section dramatic-section';
 if(['C03','C05','R02','R03','RP02','BI01','BD02','I02','I03','I04','BB05','BB06','CS04'].includes(id))return 'visual-section panel-section';
 if(id==='CH02')return 'visual-section timeline-section';
 return 'visual-section';
}
export function enhanceSection(id,blocks,render){
 const ts=blocks.filter(b=>b.type==='paragraph').map(b=>b.text);const full=()=>render(blocks);const rest=n=>render(blocks.slice(n));
 if(id==='C02')return `<div class="editorial-split"><div>${label('SINCE 2015')}<h3 class="editorial-title">${e(ts[0])}</h3>${ts.slice(1).map(text).join('')}<div class="mini-signature"><strong>GIUNCHAN</strong><span>Nature · Science · Everyday</span></div></div>${photo('company-story-nature.png','자연에서 시작된 소재의 가능성')}</div>`;
 if(id==='C03')return `<div class="concept-cards company-focus">${ts.map((t,i)=>{const [title,...desc]=t.split(' — ');return `<article class="concept-card"><div class="company-focus-image"><img class="${['focus-culture','focus-research','focus-partnership'][i]}" src="/assets/${['mixed-culture-technology','material-research','commercialization-partnership'][i]}-balanced.webp" alt="${e(title)}" width="${[925,874,1608][i]}" height="${[606,675,349][i]}" loading="lazy" decoding="async"></div><h3>${e(title)}</h3>${text(desc.join(' — '))}</article>`}).join('')}</div>`;
 if(['I02','I03','I04'].includes(id))return irCards(id,ts);
 if(id==='R02')return pairedCards(ts,iconsById[id],['petri','microscope','lab']);
 if(id==='C04')return `<div class="ceo-layout">${img('company-ceo','기운찬 대표자','ceo-photo')}<div class="quote-panel"><span class="quote-mark" aria-hidden="true">“</span><div>${full()}</div><span class="quote-credit">GIUNCHAN · CEO MESSAGE</span></div></div>`;
 if(id==='C05')return `<div class="vision-grid">${[0,2].map((i,j)=>`<article><span class="vision-art"><img src="/assets/${j?'execution-global':'vision-target'}-display.png" width="${j?1024:900}" height="${j?1024:900}" alt="${j?'기운찬의 확장과 실행':'목표를 향한 기운찬의 비전'}" loading="lazy" decoding="async"></span><span class="visual-label">${j?'OUR MISSION':'OUR VISION'}</span><h3>${e(ts[i])}</h3>${text(ts[i+1])}</article>`).join('')}</div>`;
 if(id==='C06')return `<div class="company-research-grid">${[0,1].map(i=>`<article>${photo(i?'cultivation-material-potential.jpg':'people-research-environment.jpg',i?'배양 소재의 가능성':'연구와 관찰')}<h3>${e(ts[i*2])}</h3>${text(ts[i*2+1])}</article>`).join('')}</div>`;
 if(id==='C07')return `<dl class="company-facts">${ts.map(t=>{const [k,...v]=t.split(':');return `<div><dt>${e(k)}</dt><dd>${e(v.join(':').trim())}</dd></div>`}).join('')}</dl>`;
 if(id==='CH02')return `<div class="history-layout"><aside>${photo('company-logo-history.png','자연에서 연구로')}<strong>2015—2026</strong><span>연구와 사업의 발자취</span></aside><ol class="history-line">${Array.from({length:Math.ceil(ts.length/2)},(_,i)=>{const [year,...t]=(ts[i*2]||'').split(' | ');return `<li><span class="timeline-dot"></span><strong>${e(year)}</strong><div><h3>${e(t.join(' | '))}</h3>${text(ts[i*2+1]||'')}</div></li>`}).join('')}</ol></div>`;
 if(['CS02','CS03','CS04','CS05'].includes(id)){const photos={CS02:'mycelium',CS03:'local-agriculture.png',CS04:'cultivation-environment.jpg',CS05:'nature'};return `<div class="editorial-split ${id==='CS03'?'reverse':''}">${photo(photos[id],{CS02:'자연의 순환',CS03:'곡물배지와 배양 소재',CS04:'배양 환경의 관찰',CS05:'일상의 작은 실천'}[id])}<div><span class="sustainability-icon"><img src="/assets/sustainability-${{CS02:'natural-material',CS03:'grain-culture',CS04:'controlled-culture',CS05:'resource-cycle'}[id]}-display.png" width="100" height="100" alt="" aria-hidden="true" loading="lazy" decoding="async"></span>${full()}</div></div>`;}
 if(id==='CL01'){const address='충남 천안시 동남구 충절로 252';return `<div class="company-location"><div>${icon('pin')}${render(blocks.filter(b=>b.text!=='R&D  연구개발 현황'))}<a class="text-link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}" target="_blank" rel="noopener noreferrer">구글 지도에서 보기 ↗</a></div><iframe title="기운찬 방문 주소 지도: 충남 천안시 동남구 충절로 252" src="https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed" width="700" height="420" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>`;}
 if(['R03','RE04'].includes(id))return `<div class="research-status">${strip('인체적용시험','개별인정형 원료 인정')}<div class="research-status-copy">${full()}</div>${id==='RE04'?`<div class="metric-cards"><div><span>시험 소재</span><strong>GMK®추출물</strong></div><div><span>핵심 평가</span><strong>K-MMSE</strong></div><div><span>보고된 통계적 결과</span><strong>p &lt; 0.05</strong></div></div>`:''}</div>`;
 if(id==='R04')return `<div class="evidence-links">${ts.map((t,i)=>{const [a,b]=t.split(' — ');const urls=['/rnd/gmk/','/rnd/evidence/','/rnd/patents/','/business/development/#quality-production'];return `<a href="${urls[i]}"><div class="rnd-resource-icon"><img class="${['rnd-art-gmk','rnd-art-evidence','rnd-art-patent','rnd-art-quality'][i]}" src="/assets/${['rnd-gmk-technology','rnd-research-evidence','rnd-patent','rnd-quality-production'][i]}-display.png" width="100" height="100" alt="" aria-hidden="true" loading="lazy" decoding="async"></div><div><h3>${e(a)}</h3>${text(b||'')}</div><span aria-hidden="true">↗</span></a>`}).join('')}</div>`;
 if(id==='RG01')return `<div class="definition-card">${icon('network')}<div>${full()}</div></div>`;
 if(id==='RG02')return `<div class="editorial-split"><figure class="editorial-photo culture-animation"><video autoplay loop muted playsinline preload="metadata" poster="/assets/co-cultivation-poster.webp" width="600" height="338" aria-label="서로 다른 버섯균사체가 함께 성장하고 확장되는 복합배양 개념 영상"><source src="/assets/co-cultivation.mp4" type="video/mp4"><img src="/assets/co-cultivation-original.gif" alt="서로 다른 버섯균사체가 함께 성장하고 확장되는 복합배양 개념 영상"></video><figcaption>복합배양 과정을 이해하기 쉽게 표현한 시각자료</figcaption></figure><div>${label('TOGETHER FROM THE BEGINNING')}${full()}</div></div>`;
 if(id==='RG03')return gmkProcess(ts);
 if(id==='RG04')return `<div class="editorial-split"><div>${full()}</div>${photo('ingredient-forms-uses.jpg','원료의 형태와 활용')}</div>`;
 if(id==='RE02'){
  const start=ts.findIndex(t=>t.startsWith('연구 1'));const research=ts.slice(start);const bundles=[];let current=[];let tail=[];
  for(const t of research){if(/^연구 \d/.test(t)){if(current.length)bundles.push(current);current=[t];}else if(t.startsWith('세포·동물 연구결과')){tail.push(t);}else current.push(t);}if(current.length)bundles.push(current);
  return `<div class="publication-intro">${ts.slice(0,start).map(text).join('')}${photo('microscope','과학적 근거를 축적하는 연구')}</div><div class="publication-grid">${bundles.map((a,i)=>`<article class="publication"><div class="publication-top"><strong>${e(a[1]?.slice(0,4)||'')}</strong>${icon('book')}</div><span class="paper-category">${e(a[0])}</span>${a.slice(1).map(t=>t.startsWith('논문명:')?`<h3 lang="en">${e(t.slice(4).trim())}</h3>`:t.startsWith('논문 원문:')?`<a class="text-link" target="_blank" rel="noopener noreferrer" href="${e(t.split(' ').at(-1))}">논문 원문 보기 ↗</a>`:text(t)).join('')}</article>`).join('')}</div>${tail.map(text).join('')}`;
 }
 if(id==='RE03')return `<div class="safety-panel">${icon('shield')}<div>${full()}<div class="topic-chips"><span>반복투여 독성</span><span>단회투여 독성</span><span>유전독성</span></div></div></div>`;
 if(id==='RP01')return `<div class="patent-numbers"><div>${icon('shield')}<span>국내 등록 특허</span><strong>9<small>건</small></strong></div><div>${icon('globe')}<span>미국 등록 특허</span><strong>1<small>건</small></strong></div></div>${full()}`;
 if(id==='RP02')return dashCards(ts.filter(t=>t.includes(' — ')),[],'patent-fields',['patent-cultivation-technology','patent-material-application','patent-cognitive-research'])+ts.filter(t=>!t.includes(' — ')).map(text).join('');
 if(['B02','B03','B04','B05'].includes(id)){const ims={B02:'powder',B03:'product-development-support.png',B04:'gift',B05:'new-market.jpg'};return `<div class="editorial-split ${id==='B03'||id==='B05'?'reverse':''}">${photo(ims[id],{B02:'소재에서 시작되는 협력',B03:'제품화의 가능성',B04:'도두On 소비자 제품',B05:'새로운 시장으로'}[id])}<div>${id==='B02'||id==='B03'?`<img class="business-intro-art business-intro-${id}" src="/assets/${id==='B02'?'material':'productization-process'}-display.png" alt="" aria-hidden="true" loading="lazy">`:`<img class="business-brand-art business-brand-${id}" src="/assets/${id==='B04'?'dodoon-official-logo':'global-partnership'}-display.png" alt="${id==='B04'?'도두On':''}" loading="lazy">`}${full()}</div></div>${id==='B03'?infographic('business',['product-planning','prototype','manufacturing-partnership','delivery']):''}`;}
 if(id==='BI01')return `<div class="material-selection">${ts.filter(t=>t.includes(' — ')).map((t,i)=>{const [a,b]=t.split(' — ');return `<a href="/business/ingredients/${['gmk','extract','liquid'][i]}/">${label('MATERIAL 0'+(i+1))}${icon(['grain','network','flask'][i])}<h3>${e(a)}</h3>${text(b)}<span class="text-link">원료 상세 보기 →</span></a>`}).join('')}</div>`;
 if(['BI02','BI03','BI04'].includes(id))return `<div class="material-detail"><div class="material-diagram">${icon(id==='BI02'?'grain':id==='BI03'?'network':'flask')}<span>GMK®</span><strong>${id==='BI02'?'분말':id==='BI03'?'추출물':'추출액'}</strong></div><div>${ts.map(t=>t.startsWith('검토할 항목:')?`<h3>함께 검토할 항목</h3><ul class="check-grid">${t.slice(7).split(',').map(a=>`<li>${icon('check')}${e(a.trim())}</li>`).join('')}</ul>`:text(t)).join('')}</div></div>`;
 if(id==='BI05')return `<div class="faq-layout"><div>${icon('document')}<h3>${e(ts[0])}</h3>${text(ts[1])}</div><div>${rest(2)}</div></div>`;
 if(id==='BD02')return developmentTimeline(ts);
 if(id==='BD03')return `<div class="editorial-split"><div>${full()}</div><div class="partnership-graphic"><div>${icon('network')}<strong>기운찬</strong><span>소재·개발 협력</span></div><span class="partnership-symbol" aria-hidden="true">+</span><div>${icon('settings')}<strong>제조 파트너</strong><span>제품별 제조 협력</span></div></div></div>`;
 if(id==='BD04'||id==='I06')return `<div class="cta-copy">${icon(id==='BD04'?'light':'partners')}<div>${full()}</div></div>`;
 if(id==='BB02')return `<div class="editorial-split">${photo('mycelium','작은 균사에서 시작되는 이야기')}<div>${render(blocks.slice(0,4))}</div></div>${infographic('nature')}<div class="brand-story-notes">${rest(4)}</div>`;
 if(id==='BB03')return `<div class="brand-manifesto">${img('forest','자연 속 버섯과 균사체')}<div>${full()}</div></div>`;
 if(id==='BB04')return `<div class="editorial-split"><div>${label('FROM RESEARCH TO MATERIAL')}${full()}</div>${photo('culture','버섯균사체 연구에서 태어난 소재')}</div>`;
 if(id==='BB05')return `<div class="centered-copy">${full()}</div>${infographic('brand')}`;
 if(id==='BB06')return `<div class="brand-meaning"><div><img src="/assets/dodoon.webp" alt="도두On" width="240" height="240"><strong>도두<span>On</span></strong></div><div>${full()}</div></div>`;
 if(id==='BB07')return `<div class="catalog-intro">${full()}</div>`;
 if(id==='BB08')return `<div class="brand-closing">${photo('brand','자연과 일상의 연결')}<div>${full()}</div></div>`;

 if(id==='I05')return `<div class="quality-panel">${icon('clock')}<div>${full()}</div></div>`;
 if(id==='N02')return `${photo('forest','자연에서 소재로 이어지는 GMK®')}${full()}${infographic('culture')}`;
 if(id==='N03')return `${strip('인체적용시험','원료 인정 절차')}${full()}`;
 return full();
}
export function productContent(blocks,render,im){
 const ts=blocks.filter(b=>b.type==='paragraph').map(b=>b.text);const specs=ts.filter(t=>t.startsWith('제품정보:')||t.startsWith('제품 선택 정보:'));
 const other=blocks.filter(b=>b.type!=='paragraph'||!specs.includes(b.text));
 return `${specs.map(t=>`<div class="product-spec-strip">${icon('box')}<div><span>PRODUCT INFORMATION</span><p>${e(t)}</p></div></div>`).join('')}<div class="product-story-layout"><div class="product-story">${render(other)}</div><aside class="product-companion">${im?img(im,'제품 구성 이미지'):icon('network')}<strong>도두On</strong><span>기운찬의 연구를 일상으로</span></aside></div>`;
}
