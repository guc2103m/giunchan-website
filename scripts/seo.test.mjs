import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const root=fileURLToPath(new URL('../',import.meta.url));
const origin='https://www.guc.co.kr';
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
test('built public pages expose one official canonical, social URL, and valid linked data',()=>{
 const routes=JSON.parse(read('review/routes.json'));
 for(const route of routes){
  const html=read('dist'+route+'index.html');
  if(/http-equiv="refresh"/i.test(html)){assert.match(html,/noindex/);continue;}
  assert.doesNotMatch(html,/<meta name="robots" content="[^"]*noindex/);
  const canonical=[...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
  assert.equal(canonical.length,1,route);
  const final=route.startsWith('/newsroom/')&&route!=='/newsroom/'?route.replace('/newsroom/','/insights/press/'):route;
  assert.equal(canonical[0][1],origin+final,route);
  assert.ok(html.includes(`<meta property="og:url" content="${origin+final}">`),route);
  const image=html.match(/<meta property="og:image" content="([^"]+)"/)[1];
  assert.ok(image.startsWith(origin+'/assets/'));
  assert.ok(fs.existsSync(path.join(root,'dist',decodeURIComponent(new URL(image).pathname))));
  const scripts=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length,1);
  const data=JSON.parse(scripts[0][1]);
  assert.equal(data['@graph'].find(x=>x['@type']==='WebPage').url,origin+final);
  assert.doesNotMatch(html.slice(0,html.indexOf('</head>')), /vercel\.app|chatgpt\.site/);
 }
});
test('sitemap has unique reachable, indexable final pages and robots advertises it',()=>{
 const urls=[...read('dist/sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
 assert.equal(urls.length,new Set(urls).size);
 assert.ok(urls.includes(origin+'/')&&urls.includes(origin+'/newsroom/'));
 for(const url of urls){assert.ok(url.startsWith(origin+'/'));const html=read('dist'+new URL(url).pathname+'index.html');assert.doesNotMatch(html,/http-equiv="refresh"|content="noindex/);assert.ok(html.includes(`rel="canonical" href="${url}"`));}
 const robots=read('dist/robots.txt');assert.match(robots,/Allow: \/\n/);assert.doesNotMatch(robots,/Disallow: \/\s*$/m);assert.ok(robots.includes('Sitemap: '+origin+'/sitemap.xml'));
 assert.match(read('dist/404.html'),/content="noindex,nofollow"/);
});
test('preview keeps search exclusion while production metadata remains on official domain',()=>{
 const result=execFileSync(process.execPath,['--input-type=module','-e',`import {robotsText,seoHead} from './scripts/seo.mjs'; console.log(JSON.stringify({robots:robotsText(),head:seoHead('/','Title','Description','')}));`],{cwd:root,env:{...process.env,VERCEL_ENV:'preview'},encoding:'utf8'});
 const {robots,head}=JSON.parse(result);assert.match(robots,/Disallow: \/\n/);assert.match(head,/noindex,nofollow/);assert.ok(head.includes('href="'+origin+'/"'));
});
