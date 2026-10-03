import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import handler from '../api/content.js';
import {optimizeImageHTML,renderBlocks,renderCard} from '../lib/content-render.mjs';
import {undatedMigratedSlugs,publicDateFilter} from '../lib/content-migrations.mjs';
const resp=()=>({code:200,body:'',setHeader(){},writeHead(n){this.code=n;},end(s){this.body=String(s);}});
for(const slug of undatedMigratedSlugs){
 const root=`content/cms-migrations/${slug}/`;
 const post=JSON.parse(await fs.readFile(root+'post.json','utf8'));
 const original=await fs.readFile(root+'original.html','utf8');
 const inventory=JSON.parse(await fs.readFile(root+'inventory.json','utf8'));
 test(`${slug}: original main content and markup survive structured rendering`,()=>{
  const rendered=renderBlocks(post.content.blocks);
  for(const tag of ['img','video','table','caption','a','sup','details','h1','h2','h3'])assert.equal((rendered.match(new RegExp('<'+tag+'(?:\\s|>)','g'))||[]).length,inventory[tag],tag);
  // Entity encoding may differ, but all source text/attributes/order remain in the tree.
  const source=original.match(/<main id="main">([\s\S]*?)<\/main>/)[1];
  const normalize=s=>s.replace(/\s+(controls|playsinline|open)(?=[\s>])/g,' $1=""').replaceAll('&#x27;','&#39;').replace(/\s+rel="[^"]*"/g,'');
  assert.equal(normalize(rendered),normalize(source));
  assert.equal(post.published_at,null);assert.ok(!renderCard(post).includes('<time'));
 });
 test(`${slug}: CMS URL, metadata, hidden states and failure use no static fallback`,async()=>{
  const old=global.fetch;
  try{
   global.fetch=async()=>new Response(JSON.stringify([post]));
   const r=resp();await handler({url:`/insights/${slug}/`,method:'GET'},r);assert.equal(r.code,200);
   assert.ok(r.body.includes(optimizeImageHTML(renderBlocks(post.content.blocks))));
   const shell=await fs.readFile(`.cms-runtime/insights/${slug}/index.html`,'utf8');
   assert.equal(r.body.replace('<link rel="stylesheet" href="/cms-editorial.css">','').match(/<head>[\s\S]*?<\/head>/)[0],shell.match(/<head>[\s\S]*?<\/head>/)[0]);
   global.fetch=async()=>new Response('[]');const hidden=resp();await handler({url:`/insights/${slug}/`,method:'GET'},hidden);assert.equal(hidden.code,404);
   global.fetch=async()=>{throw new Error('offline');};const offline=resp();await handler({url:`/insights/${slug}/`,method:'GET'},offline);assert.equal(offline.code,503);
  }finally{global.fetch=old;}
 });
}
test('null-date visibility is limited to the four reviewed slugs',()=>{const q=publicDateFilter();assert.ok(q.includes('and(published_at.is.null,slug.in.'));assert.ok(!q.includes('drink-1'));assert.equal(undatedMigratedSlugs.length,4);});
test('all reviewed cards appear once and keep registered superscripts',async()=>{const posts=await Promise.all(undatedMigratedSlugs.map(async slug=>JSON.parse(await fs.readFile(`content/cms-migrations/${slug}/post.json`,'utf8'))));const old=global.fetch;try{global.fetch=async()=>new Response(JSON.stringify(posts));const r=resp();await handler({url:'/insights/',method:'GET'},r);for(const p of posts)assert.equal(r.body.split(`href="/insights/${p.slug}/"`).length-1,1);assert.ok(r.body.includes('GMK<sup class="registered-mark">®</sup>'));}finally{global.fetch=old;}});
