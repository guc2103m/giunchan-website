import {fileURLToPath} from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {ingredientFAQs} from './ingredient-faq.mjs';
const root=new URL('../',import.meta.url);
const read=p=>fs.readFileSync(new URL(p,root),'utf8');
const legacy=['/business/ingredients/gmk/','/business/ingredients/liquid/'];
const plain=s=>s.replace(/<[^>]*>/g,'').replaceAll('&amp;','&');
test('ingredient consolidation preserves visible FAQ and removes indexable legacy pages',()=>{
 const html=read('dist/business/ingredients/index.html');
 const faq=[...html.matchAll(/<details><summary>(.*?)<\/summary><p>(.*?)<\/p><\/details>/gs)];
 assert.equal(faq.length,7);
 assert.deepEqual(faq.map(m=>[plain(m[1]).replace(/^Q\. /,''),plain(m[2]).replace(/^A\. /,'')]),ingredientFAQs);
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1);
 assert.ok(html.includes('href="https://www.guc.co.kr/business/ingredients/"'));
 assert.ok(html.includes('비밀유지 협의'));
 const config=JSON.parse(read('vercel.json'));
 for(const route of legacy){
  const rule=config.redirects.find(r=>r.source===route);
  assert.equal(rule?.statusCode,301);assert.equal(rule.destination,'/business/ingredients/');
  assert.ok(!config.redirects.some(r=>r.source===rule.destination));
  assert.ok(!read('dist/sitemap.xml').includes(route));
  const fallback=read('dist'+route+'index.html');
  assert.match(fallback,/noindex,nofollow/);assert.match(fallback,/http-equiv="refresh"/);
  assert.doesNotMatch(fallback,/application\/ld\+json|property="og:|name="twitter:|rel="canonical"/);
 }
});
test('generated pages contain no links into merged ingredient routes',()=>{
 const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
 for(const f of walk(fileURLToPath(new URL('dist/',root))).filter(f=>f.endsWith('.html'))){
  const html=fs.readFileSync(f,'utf8');
  assert.doesNotMatch(html, /href=["'](?:https:\/\/www\.guc\.co\.kr)?\/business\/ingredients\/(gmk|liquid)\/?(?:[?#"'])/,f);
 }
});
