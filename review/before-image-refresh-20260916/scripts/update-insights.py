from pathlib import Path
root=Path(__file__).resolve().parents[1]
p=root/'scripts/build.mjs'
s=p.read_text(encoding='utf-8')
s="import {individualArticle} from './individual-article.mjs';\n"+s
s=s.replace("'forest','what-is-gmk'", "'insight-gmk','what-is-gmk'")
s=s.replace('인체적용시험과 원료 인정은 어떻게 다른가요?', '개별인정형 원료란 무엇인가요?')
s=s.replace("'연구의 결과와 인정 절차를 구분해 이해하기','research','human-study-and-approval'", "'일반 식품 원료와 무엇이 다르고, 어떻게 인정받는지 알아보기','insight-individual-approval','human-study-and-approval'")
s=s.replace('for(const [url,title,kicker,ids] of routes){', '''for(const [url,title,kicker,ids] of routes){if(ids[0]==='N03'){track('N03',url);write(url,title,subhero(title,kicker,'식약처 인정 절차 쉽게 알아보기','insight-individual-approval')+'<div class="container article-wrap reading">'+individualArticle()+'</div>');continue;}''')
s=s.replace("note:id==='P09'?", "note:id==='N03'?'사용자 제공 개별인정형 원료 블로그 원고(2026-09-10)로 교체':id==='P09'?")
p.write_text(s,encoding='utf-8')
with (root/'dist/visual.css').open('a',encoding='utf-8') as f:
 f.write('''\n.insight-card img{height:auto;min-height:0;aspect-ratio:7/4;object-fit:contain}.individual-article{padding:48px 0 72px;max-width:860px;margin:auto}.individual-article p{font-size:17px;line-height:1.95;white-space:normal}.individual-article h2{font-size:27px;margin:52px 0 20px;scroll-margin-top:110px}.article-toc{padding:28px 32px;background:var(--soft);border:1px solid var(--line);margin-bottom:36px}.article-toc h2{margin:0 0 14px}.article-toc ol{padding-left:22px}.article-toc a{text-decoration:underline;text-underline-offset:4px}.article-checks{padding:24px 24px 24px 48px;background:var(--soft)}.article-process{display:flex;gap:30px;padding:26px 26px 26px 48px;background:var(--soft)}.article-process li{flex:1;font-weight:700;color:var(--green)}.article-notice{padding:22px;border-left:3px solid var(--green);background:var(--soft)}.article-byline{border-top:1px solid var(--line);padding-top:24px;color:#617468}.individual-article caption{text-align:left;font-weight:700;padding-bottom:12px}@media(max-width:700px){.individual-article h2{font-size:23px}.individual-article p{font-size:16px}.article-toc{padding:22px}.article-process{display:block}.article-process li+li{margin-top:14px}.individual-article table{min-width:0;table-layout:fixed}.individual-article th,.individual-article td{padding:12px 8px;font-size:14px;overflow-wrap:anywhere}}\n''')
