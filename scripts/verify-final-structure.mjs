import assert from 'node:assert/strict';
import { pages, nav, redirects, insights, products, stats } from '../lib/site-data.ts';
const base=process.env.VERIFY_BASE_URL||'http://localhost:3010';
assert.deepEqual(nav.map(x=>x.label),['COMPANY','TECHNOLOGY','BUSINESS','BRANDS','INSIGHT','NEWSROOM']);
assert.equal(nav[0].children.length,0);
assert.equal(stats.length,3);
const routes=['/',...Object.keys(pages),...insights.map(x=>x.href),...products.map(x=>'/brands/dodoon/products/'+x.slug)];
for(const route of routes){
 const response=await fetch(base+route);
 assert.equal(response.status,200,route);
 const body=await response.text();
 assert(body.includes('<h1'),route+' heading');
}
for(const [source,destination] of Object.entries(redirects)){
 const response=await fetch(base+source,{redirect:'manual'});
 assert.equal(response.status,308,source);
 const actual=new URL(response.headers.get('location'),base);
 assert.equal(actual.pathname+decodeURI(actual.search)+actual.hash,destination,source);
}
const company=await (await fetch(base+'/company')).text();
for(const id of ['about','ceo','information','location','contact']) assert(company.includes('id="'+id+'"'),id);
assert(!company.includes('class="stats final-stats"'),'Company must not repeat metrics');
const home=await (await fetch(base+'/')).text();
assert(home.includes('국내외 특허'));
assert(!home.includes('ESG MANAGEMENT'));
assert(!home.includes('대표 인사말'));
const sitemap=await (await fetch(base+'/sitemap.xml')).text();
assert(!sitemap.includes('giunchan.example'));
assert(!sitemap.includes('/company/ceo'));
const missing=await fetch(base+'/this-page-does-not-exist');
assert.equal(missing.status,404);
console.log('PASS: 6 menus, '+routes.length+' pages, '+Object.keys(redirects).length+' permanent redirects, company anchors, home structure, sitemap, and 404.');
