from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[1]
assets=[('자연에서 시작된 소재의 가능성.jpg','company-nature'),('대표자이미지.jpg','company-ceo'),('giunchan_vector_icons/01_co_cultivation.png','company-culture'),('giunchan_vector_icons/02_material_research.png','company-research'),('giunchan_vector_icons/03_business_partnership.png','company-partnership')]
for source,target in assets:
 Image.open(Path('C:/Users/coqqu/Downloads')/source).convert('RGB').save(root/'dist/assets'/f'{target}.webp',quality=92)
p=root/'scripts/visuals.mjs';s=p.read_text(encoding='utf-8')
s=s.replace("photo('forest','자연에서 시작된 소재의 가능성')", "photo('company-nature','자연에서 시작된 소재의 가능성')")
s=s.replace("if(['C03','I02'].includes(id))return dashCards(ts,iconsById[id]);", """if(id==='C03')return `<div class="concept-cards company-focus">${ts.map((t,i)=>{const [title,...desc]=t.split(' — ');return `<article class="concept-card">${img(['company-culture','company-research','company-partnership'][i],title)}<h3>${e(title)}</h3>${text(desc.join(' — '))}</article>`}).join('')}</div>`;
 if(id==='I02')return dashCards(ts,iconsById[id]);""")
s=s.replace('<div class="quote-panel"><span', '<div class="ceo-layout">'+ '${img(\'company-ceo\',\'기운찬 대표자\',\'ceo-photo\')}'+'<div class="quote-panel"><span')
s=s.replace('GIUNCHAN · CEO MESSAGE</span></div>`','GIUNCHAN · CEO MESSAGE</span></div></div>`')
s=s.replace('`<div class="research-mosaic">${photo(\'microscope\',\'연구와 관찰\')}${photo(\'petri\',\'배양 소재의 가능성\')}</div><div class="editorial-columns">${full()}</div>`', '`<div class="company-research-grid">${[0,1].map(i=>`<article>${photo(i?\'petri\':\'microscope\',i?\'배양 소재의 가능성\':\'연구와 관찰\')}<h3>${e(ts[i*2])}</h3>${text(ts[i*2+1])}</article>`).join(\'\')}</div>`')
start=s.index(" if(id==='CL01')")
end=s.index('\n',start)
s=s[:start]+''' if(id==='CL01'){const address='충남 천안시 동남구 충절로 252';return `<div class="company-location"><div>${icon('pin')}${render(blocks.filter(b=>b.text!=='R&D  연구개발 현황'))}<a class="text-link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}" target="_blank" rel="noopener noreferrer">구글 지도에서 보기 ↗</a></div><iframe title="기운찬 방문 주소 지도: 충남 천안시 동남구 충절로 252" src="https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed" width="700" height="420" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>`;}'''+s[end:]
p.write_text(s,encoding='utf-8')
p=root/'scripts/build.mjs';s=p.read_text(encoding='utf-8')
s=s.replace("['연혁','/company/history/']", "['연혁·오시는 길','/company/history/']").replace(",['오시는 길','/company/location/']",'')
s=s.replace("['/company/history/','연혁','OUR HISTORY',range('CH',2)]", "['/company/history/','연혁·오시는 길','OUR HISTORY',[...range('CH',2),'CL01']]")
s=s.replace("for(const [url,title,kicker,ids] of routes){", "for(const [url,title,kicker,ids] of routes){if(url==='/company/location/'){write(url,'연혁·오시는 길','<meta http-equiv=\"refresh\" content=\"0;url=/company/history/#CL01\"><div class=\"container section\"><h1>연혁·오시는 길</h1><a href=\"/company/history/#CL01\">오시는 길 확인하기 →</a></div>');continue;}")
p.write_text(s,encoding='utf-8')
with (root/'dist/visual.css').open('a',encoding='utf-8') as f:
 f.write('''\n#C02 .editorial-split{grid-template-columns:1.3fr 1fr;gap:48px;align-items:center;border-bottom:1px solid var(--line);padding-bottom:24px}#C02 .editorial-photo img{height:auto;aspect-ratio:7/4}#C02 figcaption{border:0}#C02 .mini-signature{border:0}.company-focus .concept-card>img{width:100%;height:auto;aspect-ratio:5/3;object-fit:contain;margin-bottom:20px}.company-focus .concept-card{padding:24px}.ceo-layout{display:grid;grid-template-columns:1fr 1.3fr;background:var(--deep);align-items:center}.ceo-photo{width:100%;height:auto;display:block}.ceo-layout .quote-panel{padding:36px}.company-research-grid{display:grid;grid-template-columns:1fr 1fr;gap:36px}.company-research-grid .editorial-photo img{width:100%;height:auto;aspect-ratio:3/2;object-fit:cover}.company-research-grid h3{margin-top:24px}.company-location{display:grid;grid-template-columns:1fr 1.2fr;gap:40px;align-items:center}.company-location iframe{border:1px solid var(--line);width:100%;height:420px}#CL01{scroll-margin-top:110px}@media(max-width:700px){#C02 .editorial-split,.ceo-layout,.company-research-grid,.company-location{grid-template-columns:1fr;gap:28px}.ceo-layout .quote-panel{padding:28px}.company-location iframe{height:340px}.company-focus .concept-card>img{max-height:210px}.company-research-grid h3{font-size:23px}}\n''')
