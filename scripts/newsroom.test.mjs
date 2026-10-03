import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {sortPress,pressPath} from './press.mjs';
import {newsroomArticle,newsroomCard} from '../lib/newsroom.mjs';
const posts=JSON.parse(fs.readFileSync('content/press-releases.json','utf8'));
const read=route=>fs.readFileSync(`dist${route}index.html`,'utf8');
const main=html=>html.match(/<main id="main">([\s\S]*?)<\/main>/)[1];
test('newsroom source inventory remains unchanged and shows all 16 cards',()=>{
 const before=JSON.parse(execFileSync('git',['show','HEAD:content/press-releases.json'],{encoding:'utf8'}));
 assert.equal(posts.length,16);assert.deepEqual(posts.map(p=>p.slug),before.map(p=>p.slug));
 for(const p of posts){const old=before.find(x=>x.slug===p.slug);assert.deepEqual(p.sourceLinks,old.sourceLinks);assert.equal(p.publishedAt,old.publishedAt);assert.equal(p.originalTitle,old.originalTitle);assert.equal(p.publisher,old.publisher);}
 const list=read('/newsroom/');assert.equal((list.match(/class="newsroom-card"/g)||[]).length,16);assert.equal((main(list).match(/<h1\b/g)||[]).length,1);assert.ok(main(list).includes('NEWSROOM'));assert.ok(main(list).includes('기운찬의 연구와 활동을 전하는 소식'));assert.ok(main(list).includes('언론에 소개된 기운찬의 연구 성과와 기업 활동을 모았습니다.'));assert.ok(!main(list).includes('뉴스룸"</h1>'));assert.ok(!main(list).includes('newsroom-year'));assert.ok(!main(list).includes('자세히 보기'));
 const body=main(read('/insights/'));assert.ok(body.includes('RESEARCH INSIGHTS'));assert.match(body,/버섯과 균사체, GMK<sup[^>]*>®<\/sup> 소재와 식품에 관한 이야기를 이해하기 쉽게 정리합니다\./);
 assert.deepEqual(sortPress([{publishedAt:'2020-01-01',slug:'a'},{publishedAt:'2020-01-01',slug:'b'}]).map(p=>p.slug),['a','b']);
});
test('all 16 newsroom details show the existing cover, known metadata, summary, source and return link',()=>{
 for(const p of posts){
  const html=read(pressPath(p)),body=main(html);
  assert.ok(body.includes('newsroom-detail-figure'),p.slug);assert.ok(body.includes(p.newsroomImage),p.slug);assert.ok(body.includes('홈페이지 작성자: 주식회사 기운찬'),p.slug);assert.ok(body.includes('기사 원문 보기'),p.slug);assert.ok(body.includes('뉴스룸 목록으로 돌아가기'),p.slug);assert.ok(body.includes('이 기사의 저작권은 해당 언론사에 있습니다'),p.slug);
   const sources=[p.originalArticleUrl,p.originalArticleUrl.replace(/^http:/,'https:')].map(url=>url.replaceAll('&','&amp;'));assert.ok(sources.some(source=>body.includes(source)),p.slug);
  if(p.reporter)assert.ok(body.includes('기사 기자: '+p.reporter),p.slug);else assert.ok(!body.includes('기사 기자:'),p.slug);
  assert.equal(main(read(`/newsroom/${p.slug}/`)),body);
 }
 const human=main(read('/insights/press/gmk-human-study-complete-2026/'));assert.ok(human.includes('중앙일보 · 뉴스파고'));assert.ok(human.includes('55세 이상'));assert.ok(human.includes('16주'));assert.ok(human.includes('기능성 인정 또는 제품 효능의 확정을 뜻하지 않습니다.'));
 const cell=main(read('/insights/press/gmk-cell-study-2025/'));assert.ok(cell.includes('세포 수준 연구'));assert.ok(cell.includes('사람 대상 시험'));
 const animal=main(read('/insights/press/gmk-preclinical-neuro-study/'));assert.ok(animal.includes('동물실험'));assert.ok(animal.includes('사람을 대상으로 한 연구가 아닙니다.'));
 const noReporter=newsroomArticle({...posts.find(p=>p.slug==='giunchan-powder-product-archive'),published_at:'2020-04-07T00:00:00+09:00',details:{publisher:'매일경제',source_url:posts.find(p=>p.slug==='giunchan-powder-product-archive').originalArticleUrl}});assert.ok(!noReporter.includes('기사 기자:'));
});
test('newsroom tiles retain image and exact full title only',()=>{const p=posts[0],h=newsroomCard({slug:p.slug,title:p.title,published_at:p.publishedAt,thumbnail_path:p.newsroomImage,thumbnail_alt:'',details:{}});assert.ok(!/<time|자세히 보기|<p>/.test(h));assert.ok(h.includes(p.title));assert.ok(h.includes('alt='));assert.ok(h.includes('width="800" height="450"'));});
