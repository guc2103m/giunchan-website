import {migratedSlugs,isMigratedRoute,withoutMigratedCards} from '../lib/content-migrations.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import {escape,renderCard,renderArticle,renderBlocks,postUrl} from '../lib/content-render.mjs';
import {publicCMSConfig} from '../lib/content-config.mjs';

const root=path.resolve(process.cwd(),'.cms-runtime');
function config(){const url=process.env.SUPABASE_URL||publicCMSConfig.url;const key=process.env.SUPABASE_PUBLISHABLE_KEY||publicCMSConfig.key;if(!/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(url))throw new Error('Invalid CMS URL');return {url,key};}
async function supabase(resource,options={}){const {url,key}=config();const r=await fetch(url+resource,{...options,headers:{apikey:key,...options.headers},signal:AbortSignal.timeout(10000)});if(!r.ok)throw new Error('CMS request failed: '+r.status);return r;}
async function readHTML(route){const filename=path.resolve(root,'.'+route,'index.html');if(!filename.startsWith(root+path.sep))return null;try{return await fs.readFile(filename,'utf8');}catch(error){if(error.code==='ENOENT')return null;throw error;}}
const xmlEscape=escape;
export function articleDocument(shell,post,assets,origin){const canonical=origin+postUrl(post);const schema={ '@context':'https://schema.org','@type':'Article',headline:post.title,description:post.summary,datePublished:post.published_at,dateModified:post.updated_at,author:{'@type':'Organization',name:post.author},mainEntityOfPage:canonical};
 const head=`<title>${escape(post.seo_title||post.title)} | 기운찬</title><meta name="description" content="${escape(post.seo_description||post.summary)}"><link rel="canonical" href="${escape(canonical)}"><meta property="og:type" content="article"><meta property="og:title" content="${escape(post.title)}"><meta property="og:description" content="${escape(post.summary)}"><meta property="og:url" content="${escape(canonical)}"><script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script><link rel="stylesheet" href="/cms.css">`;
 return shell.replace(/<title>[\s\S]*?<\/title>/g,'').replace(/<meta\s+(?:name="description"|property="og:[^"]+")[^>]*>/g,'').replace(/<link\s+rel="canonical"[^>]*>/g,'').replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/g,'').replace('</head>',head+'</head>').replace(/<main id="main">[\s\S]*?<\/main>/,`<main id="main">${renderArticle(post,assets)}</main>`);}
export default async function handler(req,res){const u=new URL(req.url,'http://local');let route=((typeof req.query?.route==='string'?req.query.route:null)||u.searchParams.get('route')||u.pathname).replace(/\/+/g,'/');if(route!=='/sitemap.xml'&&!route.endsWith('/'))route+='/';const action=u.searchParams.get('action');res.setHeader('X-CMS-Status','ok');res.setHeader('X-CMS-Route',encodeURIComponent(route));res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 if(req.method!=='GET'){res.writeHead(405,{Allow:'GET'});return res.end('Method not allowed');}
 try{
  if(action==='config'){const c=config();res.setHeader('Content-Type','application/json');const reservedSlugs=JSON.parse(await fs.readFile(path.join(root,'cms-reserved.json'),'utf8'));return res.end(JSON.stringify({...c,reservedSlugs,migratedSlugs}));}
  if(action==='asset'){
   const object=u.searchParams.get('path');if(!object||!/^[-a-zA-Z0-9/_.]+$/.test(object)||object.includes('..')){res.writeHead(400);return res.end('Invalid file');}
   const r=await supabase('/storage/v1/object/authenticated/content-assets/'+object.split('/').map(encodeURIComponent).join('/'));
   const mime=r.headers.get('content-type')?.split(';')[0];if(!['image/jpeg','image/png','image/webp','image/avif','application/pdf'].includes(mime)){res.writeHead(415);return res.end();}
   res.setHeader('Content-Type',mime);if(mime==='application/pdf')res.setHeader('Content-Disposition','inline');return res.end(Buffer.from(await r.arrayBuffer()));
  }
  if(route==='/sitemap.xml'){
   let base=await fs.readFile(path.join(root,'sitemap.xml'),'utf8');base=base.replace(/<url>[\s\S]*?<\/url>/g,item=>migratedSlugs.some(slug=>item.includes('/insights/'+slug+'/'))?'':item);const posts=await (await supabase('/rest/v1/posts?select=slug,category,updated_at&status=eq.published&published_at=lte.'+encodeURIComponent(new Date().toISOString())+'&limit=1000')).json();const origin=process.env.SITE_ORIGIN||'https://www.guc.co.kr';const additions=posts.map(p=>`<url><loc>${xmlEscape(origin+postUrl(p))}</loc><lastmod>${xmlEscape(p.updated_at)}</lastmod></url>`).filter(s=>!base.includes(s.match(/<loc>(.*?)<\/loc>/)[1])).join('');res.setHeader('Content-Type','application/xml');return res.end(base.replace('</urlset>',additions+'</urlset>'));
  }
  if(!/^\/(insights|newsroom)(\/[-a-z0-9]+)*\/$/.test(route)){res.writeHead(404);return res.end('Not found');}
  const isList=route==='/insights/'||route==='/newsroom/';const existing=await readHTML(route);
  if(isList){const filter=route==='/newsroom/'?'eq.newsroom':'in.(research-insight,research-data)';const posts=await (await supabase('/rest/v1/posts?select=*&category='+filter+'&status=eq.published&published_at=lte.'+encodeURIComponent(new Date().toISOString())+'&order=published_at.desc&limit=1000')).json();let html=route==='/insights/'?withoutMigratedCards(existing||''):existing;if(!html)throw new Error('Missing page shell');if(posts.length){if(route==='/insights/')html=html.replace('<div class="insight-grid" id="article-list">','<div class="insight-grid" id="article-list">'+posts.map(p=>renderCard(p)).join(''));else html=html.replace(/(<header class="newsroom-heading">[\s\S]*?<\/header>)/,`$1<section aria-label="최신 게시물"><div class="insight-grid">${posts.map(p=>renderCard(p)).join('')}</div></section>`);}html=html.replace('</head>','<link rel="stylesheet" href="/cms.css"></head>');res.setHeader('Content-Type','text/html; charset=utf-8');return res.end(html);}
  // Existing editorial pages keep their original HTML until their migration is reviewed.
  if(existing&&!isMigratedRoute(route)){res.setHeader('Content-Type','text/html; charset=utf-8');return res.end(existing);}
  const slug=route.split('/').filter(Boolean).at(-1);const category=route.startsWith('/insights/press/')||route.startsWith('/newsroom/')?'eq.newsroom':'in.(research-insight,research-data)';const posts=await (await supabase('/rest/v1/posts?slug=eq.'+encodeURIComponent(slug)+'&category='+category+'&status=eq.published&published_at=lte.'+encodeURIComponent(new Date().toISOString()))).json();if(!posts.length){res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});return res.end(await fs.readFile(path.join(root,'404.html'),'utf8'));}const post=posts[0];const assets=await (await supabase('/rest/v1/post_assets?post_id=eq.'+post.id)).json();if(isMigratedRoute(route)){if(post.details?.migration?.slug!==post.slug)throw new Error('Migration marker mismatch');res.setHeader('Content-Type','text/html; charset=utf-8');const body='<div class="container article-wrap reading"><article class="individual-article mushroom-insight">'+renderBlocks(post.content?.blocks)+'</article></div>';return res.end(existing.replace(/<main id="main">[\s\S]*?<\/main>/,()=>'<main id="main">'+body+'</main>'));}const shell=await readHTML('/insights/');const origin=process.env.SITE_ORIGIN||'https://www.guc.co.kr';res.setHeader('Content-Type','text/html; charset=utf-8');return res.end(articleDocument(shell,post,assets,origin));
 }catch(error){
  console.error('[content] request failed',JSON.stringify({route,action:action||null,name:error.name,message:error.message}));
  res.setHeader('X-CMS-Status','degraded');
  // An unavailable CMS must not remove existing company content.
  let fallback=(action||isMigratedRoute(route))?null:route==='/sitemap.xml'?await fs.readFile(path.join(root,'sitemap.xml'),'utf8').catch(()=>null):await readHTML(route);
  if(route==='/insights/'&&fallback)fallback=withoutMigratedCards(fallback);
  if(fallback){res.setHeader('Content-Type',route==='/sitemap.xml'?'application/xml':'text/html; charset=utf-8');return res.end(fallback);}
  res.writeHead(action==='asset'?404:503,{'Content-Type':'text/plain; charset=utf-8'});return res.end(action==='asset'?'File unavailable':'콘텐츠 연결을 확인해 주세요.');
 }
}
