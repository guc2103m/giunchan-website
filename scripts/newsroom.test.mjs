import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {execFileSync} from 'node:child_process';import {sortPress,pressPath} from './press.mjs';
const posts=JSON.parse(fs.readFileSync('content/press-releases.json','utf8'));
const read=route=>fs.readFileSync(`dist${route}index.html`,'utf8');
const main=html=>html.match(/<main id="main">([\s\S]*?)<\/main>/)[1];
test('all records, dates and original links preserved',()=>{
 const before=JSON.parse(execFileSync('git',['-c','safe.directory=G:/ChatGPT/홈페이지개편/site','show','6038966:content/press-releases.json'],{encoding:'utf8'}));
 assert.equal(posts.length,16);assert.deepEqual(posts.map(p=>p.slug),before.map(p=>p.slug));
 for(const p of posts){const old=before.find(x=>x.slug===p.slug);assert.deepEqual(p.sourceLinks,old.sourceLinks);if(p.slug!=='gmk-human-study-complete-2026'){assert.equal(p.publishedAt,p.slug==='food-startup-contest-2016'?'2016-10-19':old.publishedAt);assert.equal(p.originalTitle,old.originalTitle);assert.equal(p.publisher,old.publisher);}}
 const list=read('/newsroom/');assert.equal((list.match(/class="newsroom-row"/g)||[]).length,16);
 const dates=[...list.matchAll(/datetime="([^"]+)"/g)].map(m=>m[1]);assert.deepEqual(dates,[...dates].sort().reverse());assert.equal(dates[0],'2026-08-26');assert.equal(dates.at(-1),'2016-10-19');assert.equal((list.match(/class="newsroom-thumbnail"/g)||[]).length,16);
 assert.deepEqual(sortPress([{publishedAt:'2020-01-01',slug:'a'},{publishedAt:'2020-01-01',slug:'b'}]).map(p=>p.slug),['a','b']);
});
test('concise detail and both URL families work without copied media',()=>{
 for(const p of posts){const html=read(pressPath(p)),body=main(html);assert.equal(main(read(`/newsroom/${p.slug}/`)),body);assert.ok(!/<img|<iframe|<script|관련 기관|연구단계|현재 상태|당시 발표 내용|자료 검토|기존 기운찬 게시물/.test(body));assert.equal((body.match(/이 기사의 저작권은 해당 언론사에 있습니다/g)||[]).length,1);assert.ok(!html.includes('"@type":"NewsArticle"'));for(const link of body.matchAll(/<a[^>]+href="https?:[^>]+>/g)){assert.ok(link[0].includes('target="_blank"'));assert.ok(link[0].includes('noopener noreferrer'));}}
 const human=main(read('/insights/press/gmk-human-study-complete-2026/'));assert.ok(human.includes('중앙일보 · 2026.08.26'));assert.ok(human.includes('뉴스파고 · 2026.08.27'));assert.equal((human.match(/class="button"/g)||[]).length,2);
});
test('research articles and unrelated page bodies unchanged; shared navigation updated',()=>{
 const insights=read('/insights/');assert.equal((insights.match(/class="insight-card"/g)||[]).length,4);assert.ok(!/press-panel|press-tab|보도자료/.test(insights));
 const paths=execFileSync('git',['-c','safe.directory=G:/ChatGPT/홈페이지개편/site','ls-tree','-r','--name-only','6038966','dist'],{encoding:'utf8'}).trim().split('\n').filter(p=>p.endsWith('.html'));
 let checked=0;for(const path of paths){if(path==='dist/insights/index.html'||path.startsWith('dist/insights/press/')||path.startsWith('dist/newsroom/'))continue;const old=execFileSync('git',['-c','safe.directory=G:/ChatGPT/홈페이지개편/site','show',`6038966:${path}`],{encoding:'utf8'});assert.equal(main(fs.readFileSync(path,'utf8')),main(old),path);checked++;}assert.ok(checked>=30);
 assert.ok(read('/').includes('href="/newsroom/"'));assert.ok(!read('/').includes('보도자료'));
});
