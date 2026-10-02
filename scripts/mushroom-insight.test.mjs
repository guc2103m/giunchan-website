import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const page=fs.readFileSync('dist/insights/are-mushrooms-plants/index.html','utf8');
const body=page.match(/<main id="main">([\s\S]*?)<\/main>/)[1];
const plain=s=>s.replace(/<[^>]+>/g,'').replaceAll('&amp;','&').replace(/\s+/g,' ').trim();
test('new article metadata and visible FAQ agree',()=>{
 assert.equal((page.match(/<h1[ >]/g)||[]).length,1);
 assert.equal((page.match(/<title>/g)||[]).length,1);
 assert.equal((page.match(/name="description"/g)||[]).length,1);
 assert.equal((page.match(/application\/ld\+json/g)||[]).length,1);
 const graph=JSON.parse(page.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
 assert.equal(graph.length,5);
 const article=graph.find(x=>x['@type']==='Article');
 assert.equal(article.datePublished,'2026-09-28');
 assert.equal(article.author.name,'주식회사 기운찬');
 const faq=graph.find(x=>x['@type']==='FAQPage').mainEntity;
 assert.equal(faq.length,6);
 for(let i=0;i<faq.length;i++){
  const match=body.match(new RegExp(`<h3 id="mushroom-faq-${i+1}">([\\s\\S]*?)</h3><p>([\\s\\S]*?)</p>`));
  assert.equal(plain(match[1]),faq[i].name);
  assert.equal(plain(match[2]),faq[i].acceptedAnswer.text);
 }
 assert.ok(!/추천 이미지 위치|영상 삽입 사양|게시 설정 제안|�/.test(body));
 assert.ok(!/GMK(?!®)/.test(plain(body)));
});
test('six original-ratio images, safe video attributes and complete anchors',()=>{
 const imgs=[...body.matchAll(/<img\b[^>]+>/g)];assert.equal(imgs.length,6);
 for(const [img] of imgs){assert.match(img,/alt="[^"]+"/);assert.match(img,/width="\d+" height="\d+"/);assert.ok(fs.existsSync(path.join('dist',img.match(/src="([^"]+)"/)[1])));}
 const video=body.match(/<video\b[^>]+>/)[0];assert.match(video,/controls/);assert.match(video,/playsinline/);assert.match(video,/preload="metadata"/);assert.ok(!/autoplay|muted|loop/.test(video));
 for(const [,id] of body.matchAll(/href="#([^"]+)"/g))assert.ok(body.includes(`id="${id}"`));
 assert.ok(body.indexOf('추천2 버섯의일생 주기4단계.png')<body.indexOf('<li><strong>포자 발아'));
 assert.ok(body.indexOf('<video')>body.indexOf('<li><strong>포자 생성과 확산'));
 assert.ok(body.indexOf('<video')<body.indexOf('<h2 id="mushroom-section-5"'));
});
test('new card added alongside all four existing cards',()=>{
 const list=fs.readFileSync('dist/insights/index.html','utf8');
 assert.equal((list.match(/class="insight-card"/g)||[]).length,5);
 for(const slug of ['are-mushrooms-plants','gmk-material','what-is-gmk','human-study-and-approval','food-label-guide'])assert.ok(list.includes(`/insights/${slug}/`));
 assert.ok(fs.readFileSync('dist/sitemap.xml','utf8').includes('https://www.guc.co.kr/insights/are-mushrooms-plants/'));
});
