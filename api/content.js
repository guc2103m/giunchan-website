import fs from 'node:fs/promises';
import path from 'node:path';
import {escape,renderCard,renderArticle,postUrl} from '../lib/content-render.mjs';

const root=path.resolve(process.cwd(),'dist');
function config(){const url=process.env.SUPABASE_URL;const key=process.env.SUPABASE_PUBLISHABLE_KEY;if(!url||!key)throw new Error('CMS configuration missing');if(!/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(url))throw new Error('Invalid CMS URL');return {url,key};}
async function supabase(resource,options={}){const {url,key}=config();const r=await fetch(url+resource,{...options,headers:{apikey:key,...options.headers},signal:AbortSignal.timeout(10000)});if(!r.ok)throw new Error('CMS request failed: '+r.status);return r;}
async function readHTML(route){const filename=path.resolve(root,'.'+route,'index.html');if(!filename.startsWith(root+path.sep))return null;try{return await fs.readFile(filename,'utf8');}catch{return null;}}
const xmlEscape=escape;
export function articleDocument(shell,post,assets,origin){const canonical=origin+postUrl(post);const schema={ '@context':'https://schema.org','@type':'Article',headline:post.title,description:post.summary,datePublished:post.published_at,dateModified:post.updated_at,author:{'@type':'Organization',name:post.author},mainEntityOfPage:canonical};
 const head=`<title>${escape(post.seo_title||post.title)} | 기운찬</title><meta name="description" content="${escape(post.seo_description||post.summary)}"><link rel="canonical" href="${escape(canonical)}"><meta property="og:type" content="article"><meta property="og:title" content="${escape(post.title)}"><meta property="og:description" content="${escape(post.summary)}"><meta property="og:url" content="${escape(canonical)}"><script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script><link rel="stylesheet" href="/cms.css">`;
 return shell.replace(/<title>[\s\S]*?<\/title>/g,'').replace(/<meta\s+(?:name="description"|property="og:[^"]+")[^>]*>/g,'').replace(/<link\s+rel="canonical"[^>]*>/g,'').replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/g,'').replace('</head>',head+'</head>').replace(/<main id="main">[\s\S]*?<\/main>/,`<main id="main">${renderArticle(post,assets)}</main>`);}
export default async function handler(req,res){const u=new URL(req.url,'http://local');let route=(u.searchParams.get('route')||u.pathname).replace(/\/+/g,'/');if(route!=='/sitemap.xml'&&!route.endsWith('/'))route+='/';const action=u.searchParams.get('action');res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 if(req.method!=='GET'){res.writeHead(405,{Allow:'GET'});return res.end('Method not allowed');}
 try{
  if(action==='config'){const c=config();res.setHeader('Content-Type','application/json');const reservedSlugs=JSON.parse(await fs.readFile(path.join(root,'cms-reserved.json'),'utf8'));return res.end(JSON.stringify({...c,reservedSlugs}));}
  if(action==='asset'){
   const object=u.searchParams.get('path');if(!object||!/^[-a-zA-Z0-9/_.]+$/.test(object)||object.includes('..')){res.writeHead(400);return res.end('Invalid file');}
   const r=await supabase('/storage/v1/object/authenticated/content-assets/'+object.split('/').map(encodeURIComponent).join('/'));
   const mime=r.headers.get('content-type')?.split(';')[0];if(!['image/jpeg','image/png','image/webp','image/avif','application/pdf'].includes(mime)){res.writeHead(415);return res.end();}
   res.setHeader('Content-Type',mime);if(mime==='application/pdf')res.setHeader('Content-Disposition','inline');return res.end(Buffer.from(await r.arrayBuffer()));
  }
  if(route==='/sitemap.xml'){
   const base=await fs.readFile(path.join(root,'sitemap.xml'),'utf8');const posts=await (await supabase('/rest/v1/posts?select=slug,category,updated_at&status=eq.published&published_at=lte.'+encodeURIComponent(new Date().toISOString())+'&limit=1000')).json();const origin=process.env.SITE_ORIGIN||'https://www.guc.co.kr';const additions=posts.map(p=>`<url><loc>${xmlEscape(origin+postUrl(p))}</loc><lastmod>${xmlEscape(p.updated_at)}</lastmod></url>`).filter(s=>!base.includes(s.match(/<loc>(.*?)<\/loc>/)[1])).join('');res.setHeader('Content-Type','application/xml');return res.end(base.replace('</urlset>',additions+'</urlset>'));
  }
  if(!/^\/(insights|newsroom)(\/[-a-z0-9]+)*\/$/.test(route)){res.writeHead(404);return res.end('Not found');}
  const isList=route==='/insights/'||route==='/newsroom/';const existing=await readHTML(route);
  if(isList){const filter=route==='/newsroom/'?'eq.newsroom':'in.(research-insight,research-data)';const posts=await (await supabase('/rest/v1/posts?select=*&category='+filter+'&status=eq.published&published_at=lte.'+encodeURIComponent(new Date().toISOString())+'&order=published_at.desc&limit=1000')).json();let html=existing;if(!html)throw new Error('Missing page shell');if(posts.length){if(route==='/insights/')html=html.replace('<div class="insight-grid" id="article-list">','<div class="insight-grid" id="article-list">'+posts.map(renderCard).join(''));else html=html.replace(/(<header class="newsroom-heading">[\s\S]*?<\/header>)/,`$1<section aria-label="최신 게시물"><div class="insight-grid">${posts.map(renderCard).join('')}</div></section>`);}html=html.replace('</head>','<link rel="stylesheet" href="/cms.css"></head>');res.setHeader('Content-Type','text/html; charset=utf-8');return res.end(html);}
  // Existing editorial pages keep their original HTML until their migration is reviewed.
  if(existing){res.setHeader('Content-Type','text/html; charset=utf-8');return res.end(existing);}
  const slug=route.split('/').filter(Boolean).at(-1);const category=route.startsWith('/insights/press/')||route.startsWith('/newsroom/')?'eq.newsroom':'in.(research-insight,research-data)';const posts=await (await supabase('/rest/v1/posts?slug=eq.'+encodeURIComponent(slug)+'&category='+category+'&status=eq.published&published_at=lte.'+encodeURIComponent(new Date().toISOString()))).json();if(!posts.length){res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});return res.end(await fs.readFile(path.join(root,'404.html'),'utf8'));}const post=posts[0];const assets=await (await supabase('/rest/v1/post_assets?post_id=eq.'+post.id)).json();const shell=await readHTML('/insights/');const origin=process.env.SITE_ORIGIN||'https://www.guc.co.kr';res.setHeader('Content-Type','text/html; charset=utf-8');return res.end(articleDocument(shell,post,assets,origin));
 }catch{
  // An unavailable CMS must not remove existing company content.
  const fallback=action?null:route==='/sitemap.xml'?await fs.readFile(path.join(root,'sitemap.xml'),'utf8').catch(()=>null):await readHTML(route);
  if(fallback){res.setHeader('Content-Type',route==='/sitemap.xml'?'application/xml':'text/html; charset=utf-8');return res.end(fallback);}
  res.writeHead(action==='asset'?404:503,{'Content-Type':'text/plain; charset=utf-8'});return res.end(action==='asset'?'File unavailable':'콘텐츠 연결을 확인해 주세요.');
 }
}
