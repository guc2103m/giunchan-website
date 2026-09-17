from pathlib import Path
p=Path(__file__).with_name('build.mjs')
s=p.read_text(encoding='utf-8')
assert "from './visuals.mjs'" not in s
s="import {icon, infographic, enhanceSection, sectionClass, productContent} from './visuals.mjs';\n"+s
s=s.replace('<link rel="stylesheet" href="/style.css">','<link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/visual.css?v=2">')
start=s.index('<div class="flow"><div><span>01</span><strong>함께 접종')
end=s.index('<div class="status-row">',start)
s=s[:start]+"${infographic('culture')}"+s[end:]
s=s.replace('<article><span class="index">0${i+1}</span><h3>', '<article>${icon([\'flask\',\'shield\',\'document\'][i])}<span class="index">0${i+1}</span><h3>')
s=s.replace('class="article-section" id="${id}" data-content-id="${id}"><h2>${esc(heading)}</h2>${renderBlocks(blocks)}','class="article-section ${sectionClass(id)}" id="${id}" data-content-id="${id}"><div class="section-kicker">${esc(({C:\'ABOUT GIUNCHAN\',CH:\'OUR HISTORY\',CS:\'SUSTAINABILITY\',R:\'RESEARCH & DEVELOPMENT\',RG:\'GMK® TECHNOLOGY\',RE:\'RESEARCH EVIDENCE\',RP:\'INTELLECTUAL PROPERTY\',RQ:\'QUALITY\',B:\'BUSINESS\',BI:\'INGREDIENTS\',BD:\'PRODUCT DEVELOPMENT\',BB:\'DODOON STORY\',I:\'INVESTOR RELATIONS\',N:\'INSIGHTS\'})[id.replace(/\\d/g,\'\')]||\'GIUNCHAN\')}</div><h2>${esc(heading)}</h2>${enhanceSection(id,blocks,renderBlocks)}')
lines=s.splitlines()
lines=[line for line in lines if not line.startswith("if(id==='R04')html+=cards") and not line.startswith("if(id==='RG03')html+=") and not line.startswith("if(id==='BI01')html+=cards")]
s='\n'.join(lines)+'\n'
s=s.replace("if(url==='/company/')content=`<div class=\"company-lead\">${picture('forest','숲과 균사체를 표현한 이미지')}</div>`+content;",'')
s=s.replace("const visual=url.includes('sustainability')?'nature':'research';", "const visual=url.includes('sustainability')?'nature':url.includes('history')?'mycelium':url.includes('evidence')?'microscope':url.startsWith('/business/')?'research':url==='/ir/'?'science':'research';")
s=s.replace("${renderBlocks(publicBlocks(id).slice(2))}<section class=\"article-section\" data-content-id=\"P09\">", "${productContent(publicBlocks(id).slice(2),renderBlocks,im)}<section class=\"article-section product-information\" data-content-id=\"P09\">")
s=s.replace('<aside><h2>기운찬과 연결하세요</h2>',"<aside>${picture('brand','자연과 함께하는 소재 연구','contact-photo')}<h2>기운찬과 연결하세요</h2>")
s=s.replace('<h3>전화 문의</h3>',"<h3>${icon('phone')}전화 문의</h3>").replace('<h3>이메일 문의</h3>',"<h3>${icon('mail')}이메일 문의</h3>")
p.write_text(s,encoding='utf-8')
print('Visual renderers integrated into all page templates.')
