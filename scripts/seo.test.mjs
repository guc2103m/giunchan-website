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


test('legacy redirects match Vercel trailing-slash normalization',()=>{
 const config=JSON.parse(read('vercel.json'));
 assert.equal(config.trailingSlash,true);
 assert.equal(config.redirects.length,38);
 const legacy=config.redirects.filter(r=>r.source.startsWith('/forum/view/')&&r.source!=='/forum/view/40419/');
 assert.equal(legacy.length,15);
 for(const rule of legacy){
  assert.ok(rule.source.endsWith('/'),rule.source);
  assert.equal(rule.statusCode,301);
  assert.ok(fs.existsSync(path.join(root,'dist',rule.destination,'index.html')));
 }
 const approved=[
  ['/%EC%97%B0%EA%B5%AC%EA%B0%9C%EB%B0%9C/','/rnd/'],
  ['/%EA%B8%B0%EC%97%85%EC%86%8C%EA%B0%9C/','/company/'],
  ['/forum/view/40419/','/insights/press/school-meal-product-archive/'],
 ];
 for(const [source,destination] of approved){
  const rule=config.redirects.find(item=>item.source===source);
  assert.ok(rule,`missing ${source}`);
  assert.equal(rule.destination,destination);
  assert.equal(rule.statusCode,301);
  assert.ok(!Object.hasOwn(rule,'preserveQueryParams'),'vercel.json redirects preserve query strings by default');
  assert.ok(!config.redirects.some(item=>item.source===destination),'destination must be canonical and avoid chains');
 }
 const cognikhanRules=config.redirects.filter(item=>item.source==='/products/cognican/'||item.source==='/products/cognican');
 assert.equal(cognikhanRules.length,2);
 for(const rule of cognikhanRules){assert.equal(rule.destination,'/products/cognikhan/');assert.equal(rule.statusCode,301);}
 const routes=JSON.parse(read('review/routes.json'));
 assert.ok(routes.includes('/products/cognikhan/'));
 assert.ok(!routes.includes('/products/cognican/'));
 assert.ok(read('dist/sitemap.xml').includes(origin+'/products/cognikhan/'));
 assert.ok(!read('dist/sitemap.xml').includes(origin+'/products/cognican/'));
 const excluded=['/forum/view/261509','/forum/view/185067','/forum/view/261510','/index/view/107083','/index/view/107089','/forum/view/224006','/forum/view/234155','/forum/view/40417','/index/view/116649','/index/view/107084','/forum/view/200287','/index/view/107086','/index/view/107085','/forum/view/224000','/forum/view/190823','/forum/view/200289','/index/view/370824','/goods/goods_view.php'];
 for(const source of excluded)assert.ok(!config.redirects.some(item=>item.source===source),`unexpected redirect ${source}`);
});
