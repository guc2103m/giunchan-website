import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {parseFeed} from '../api/naver-blog.js';
import editorial from '../content/note-edits/hyphae-mycelium-mushrooms.json' with {type:'json'};
import notes from '../content/gmk-notes.json' with {type:'json'};
import {newsroomArticle,staticNewsroomPost} from '../lib/newsroom.mjs';
const backupDir='content/cms-migrations/gmk-note-review-20261003';
test('blog inventory remains preserved and the prior backup hashes verify',()=>{
 const manifest=JSON.parse(fs.readFileSync(`${backupDir}/manifest.json`,'utf8'));
 for(const item of manifest)assert.equal(crypto.createHash('sha256').update(fs.readFileSync(`${backupDir}/${item.file}`)).digest('hex'),item.sha256,item.file);
 assert.equal(notes.length,12);assert.equal(notes.filter(p=>p.status==='ready').length,11);
 const pending=notes.find(p=>p.slug==='hyphae-mycelium-mushrooms');assert.equal(pending.id,editorial.sourceId);assert.equal(pending.blocks,undefined);assert.ok(pending.description.length>200);
 assert.equal(editorial.sections.reduce((n,s)=>n+(s.image?1:0),1),3);assert.equal(editorial.faq.length,2);assert.ok(editorial.videoOmitted);
});
test('RSS-backed blog feed gives all preserved full-body records internal routes',()=>{
 const feed=`<rss version="2.0"><channel><item><title>GMK 글</title><link>https://blog.naver.com/guc5792203/224149016964</link><pubDate>Mon, 19 Jan 2026 05:30:00 +0000</pubDate><description><![CDATA[<p>연구 본문</p><img src="https://blogthumb.pstatic.net/test.jpg?type=s3"/>]]></description><category>GMK연구노트</category></item><item><title>균사와 버섯</title><link>https://blog.naver.com/guc5792203/224426045282</link><pubDate>Tue, 29 Sep 2026 07:02:36 +0000</pubDate><description><![CDATA[RSS 요약입니다. 전체 원문은 별도 편집본]]></description><category>GMK연구노트</category></item></channel></rss>`;
 const data=parseFeed(feed);assert.equal(data.posts.length,2);assert.equal(data.posts[0].detailUrl,'/gmk-note/gmk-brain-research/');assert.equal(data.posts[0].importStatus,'ready');assert.equal(data.posts[1].detailUrl,'/gmk-note/hyphae-mycelium-mushrooms/');assert.equal(data.posts[1].importStatus,'ready');
});
test('blog list removes search UI and placeholder language while topic tabs are functional',()=>{
 const html=fs.readFileSync('scripts/gmk-note.mjs','utf8'),js=fs.readFileSync('dist/gmk-note.js','utf8');
 assert.ok(!html.includes('note-search'));assert.ok(!html.includes('준비 중'));assert.ok(js.includes("terms={mushroom:['버섯'],mycelium:['균사','균사체'],gmk:['gmk'],food:['식품','건강']}"));assert.ok(js.includes('data-note-filter'));assert.ok(!js.includes('전체 본문 가져오기 준비 중'));assert.ok(js.includes('p.importStatus===\'ready\''));
});
test('existing newsroom metadata, source links and images appear in the detail layout',()=>{
 const record=JSON.parse(fs.readFileSync('content/press-releases.json','utf8')).find(p=>p.slug==='gmk-cell-study-2025');
 const html=newsroomArticle({...staticNewsroomPost(record),details:{...staticNewsroomPost(record).details,published_at:'2025-06-30T00:00:00+09:00',reporter:'임호범'}});
 assert.ok(html.includes(record.newsroomImage));assert.ok(html.includes('한국경제'));assert.ok(html.includes('기사 기자: 임호범'));assert.ok(html.includes('홈페이지 작성자: 주식회사 기운찬'));assert.ok(html.includes('10.3390/cells14130977'));assert.ok(html.includes('세포 모델의 결과'));
});
