import {newsroomCards,newsroomArticle,staticNewsroomPost} from '../lib/newsroom.mjs';
import pressPosts from '../content/press-releases.json' with {type:'json'};
import {migratedSlugs,newsroomMigratedSlugs,migratedRoutes,isMigratedRoute,withoutMigratedCards,publicDateFilter} from '../lib/content-migrations.mjs';
import {seoulDate} from '../lib/content-document.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import {escape,renderCard,renderArticle,renderBlocks,postUrl,optimizeImageHTML} from '../lib/content-render.mjs';
import {publicCMSConfig} from '../lib/content-config.mjs';

const root=path.resolve(process.cwd(),'.cms-runtime');
function config(){const url=process.env.SUPABASE_URL||publicCMSConfig.url;const key=process.env.SUPABASE_PUBLISHABLE_KEY||publicCMSConfig.key;if(!/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(url))throw new Error('Invalid CMS URL');return {url,key};}
async function supabase(resource,options={}){const {url,key}=config();const r=await fetch(url+resource,{...options,headers:{apikey:key,...options.headers},signal:AbortSignal.timeout(10000)});if(!r.ok)throw new Error('CMS request failed: '+r.status);return r;}
async function readHTML(route){const filename=path.resolve(root,'.'+route,'index.html');if(!filename.startsWith(root+path.sep))return null;try{return await fs.readFile(filename,'utf8');}catch(error){if(error.code==='ENOENT')return null;throw error;}}
const xmlEscape=escape;
export function articleDocument(shell,post,assets,origin){const canonical=origin+postUrl(post);const schema={ '@context':'https://schema.org','@type':'Article',headline:post.title,description:post.summary,datePublished:post.published_at,dateModified:post.updated_at,author:{'@type':'Organization',name:post.author},mainEntityOfPage:canonical};
 const head=`<title>${escape(post.seo_title||post.title)} | 기운찬</title><meta name="description" content="${escape(post.seo_description||post.summary)}"><link rel="canonical" href="${escape(canonical)}"><meta property="og:type" content="article"><meta property="og:title" content="${escape(post.title)}"><meta property="og:description" content="${escape(post.summary)}"><meta property="og:url" content="${escape(canonical)}"><script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script><link rel="stylesheet" href="/cms.css">`;
 return shell.replace(/<title>[\s\S]*?<\/title>/g,'').replace(/<meta\s+(?:name="description"|property="og:[^"]+")[^>]*>/g,'').replace(/<link\s+rel="canonical"[^>]*>/g,'').replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/g,'').replace('</head>',head+'</head>').replace(/<main id="main">[\s\S]*?<\/main>/,`<main id="main">${optimizeImageHTML(post.category==='newsroom'?newsroomArticle(post):renderArticle(post,assets),post.details?.image_variants)}</main>`);}
export default async function handler(req,res){const u=new URL(req.url,'http://local');let route=((typeof req.query?.route==='string'?req.query.route:null)||u.searchParams.get('route')||u.pathname).replace(/\/+/g,'/');if(route!=='/sitemap.xml'&&!route.endsWith('/'))route+='/';const action=u.searchParams.get('action');res.setHeader('X-CMS-Status','ok');res.setHeader('X-CMS-Route',encodeURIComponent(route));res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 if(req.method!=='GET'){res.writeHead(405,{Allow:'GET'});return res.end('Method not allowed');}
 try{
  if(action==='config'){const c=config();res.setHeader('Content-Type','application/json');const reservedSlugs=JSON.parse(await fs.readFile(path.join(root,'cms-reserved.json'),'utf8'));return res.end(JSON.stringify({...c,reservedSlugs,migratedSlugs}));}
  if(action==='asset'){
   const object=u.searchParams.get('path');if(!object||!/^[-a-zA-Z0-9/_.]+$/.test(object)||object.includes('..')){res.writeHead(400);return res.end('Invalid file');}
   const r=await supabase('/storage/v1/object/authenticated/content-assets/'+object.split('/').map(encodeURIComponent).join('/'));
   const mime=r.headers.get('content-type')?.split(';')[0];if(!['image/jpeg','image/png','image/webp','image/avif','application/pdf'].includes(mime)){res.writeHead(415);return res.end();}
   res.setHeader('Cache-Control','private, no-cache');const etag=r.headers.get('etag');if(etag)res.setHeader('ETag',etag);if(etag&&req.headers?.['if-none-match']===etag){res.writeHead(304);return res.end();}res.setHeader('Content-Type',mime);if(mime==='application/pdf')res.setHeader('Content-Disposition','inline');return res.end(Buffer.from(await r.arrayBuffer()));
  }
  if(route==='/sitemap.xml'){
   let base=await fs.readFile(path.join(root,'sitemap.xml'),'utf8');base=base.replace(/<url>[\s\S]*?<\/url>/g,item=>migratedRoutes.some(route=>item.includes(route))?'':item);const posts=await (await supabase('/rest/v1/posts?select=slug,category,updated_at&status=eq.published&'+publicDateFilter()+'&limit=1000')).json();const origin=process.env.SITE_ORIGIN||'https://www.guc.co.kr';const additions=posts.map(p=>`<url><loc>${xmlEscape(origin+postUrl(p))}</loc><lastmod>${xmlEscape(p.updated_at)}</lastmod></url>`).filter(s=>!base.includes(s.match(/<loc>(.*?)<\/loc>/)[1])).join('');res.setHeader('Content-Type','application/xml');return res.end(base.replace('</urlset>',additions+'</urlset>'));
  }
  if(!/^\/(insights|newsroom)(\/[-a-z0-9]+)*\/$/.test(route)){res.writeHead(404);return res.end('Not found');}
  const isList=route==='/insights/'||route==='/newsroom/';const existing=await readHTML(route);
  if(isList){
   const filter=route==='/newsroom/'?'eq.newsroom':'in.(research-insight,research-data)';
   const posts=await(await supabase('/rest/v1/posts?select=*&category='+filter+'&status=eq.published&'+publicDateFilter()+'&order=published_at.desc.nullslast,slug.asc&limit=1000')).json();
   let html=route==='/insights/'?withoutMigratedCards(existing||''):existing;if(!html)throw new Error('Missing page shell');
   if(route==='/newsroom/'){
    const fallback=pressPosts.filter(p=>!newsroomMigratedSlugs.includes(p.slug)&&!posts.some(row=>row.slug===p.slug)).map(staticNewsroomPost);
    html=html.replace(/(<div class="newsroom-grid" id="newsroom-list">)[\s\S]*?(<\/div><\/div><\/main>)/,(_,open,close)=>open+newsroomCards([...fallback,...posts])+close);
   }else html=html.replace('<div class="insight-grid" id="article-list">','<div class="insight-grid" id="article-list">'+posts.map(p=>optimizeImageHTML(renderCard(p),p.details?.image_variants,true)).join(''));
   html=html.replace('</head>','<link rel="stylesheet" href="/cms.css"></head>');res.setHeader('Content-Type','text/html; charset=utf-8');return res.end(html);
  }
  // Existing editorial pages keep their original HTML until their migration is reviewed.
  if(existing&&!isMigratedRoute(route)){res.setHeader('Content-Type','text/html; charset=utf-8');return res.end(existing);}
  const slug=route.split('/').filter(Boolean).at(-1);const category=route.startsWith('/insights/press/')||route.startsWith('/newsroom/')?'eq.newsroom':'in.(research-insight,research-data)';const posts=await (await supabase('/rest/v1/posts?slug=eq.'+encodeURIComponent(slug)+'&category='+category+'&status=eq.published&'+publicDateFilter())).json();if(!posts.length){res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});return res.end(await fs.readFile(path.join(root,'404.html'),'utf8'));}const post=posts[0];const assets=await (await supabase('/rest/v1/post_assets?post_id=eq.'+post.id)).json();if(isMigratedRoute(route)){if(post.details?.migration?.slug!==post.slug)throw new Error('Migration marker mismatch');res.setHeader('Content-Type','text/html; charset=utf-8');const body=post.details.migration.layout==='newsroom'?newsroomArticle(post):post.details.migration.layout==='main'?renderBlocks(post.content?.blocks):'<div class="container article-wrap reading"><article class="individual-article mushroom-insight">'+renderBlocks(post.content?.blocks)+'</article></div>';return res.end(existing.replace('</head>',(post.category==='newsroom'?'<link rel="stylesheet" href="/cms.css">':'')+'<link rel="stylesheet" href="/cms-editorial.css"></head>').replace(/<main id="main">[\s\S]*?<\/main>/,()=>'<main id="main">'+optimizeImageHTML(post.details.migration.date_unknown&&post.published_at?body.replace(/<\/h1>/,'</h1><p class="cms-publication">최초 게시일: '+escape(seoulDate(post.published_at))+'</p>'):body,post.details?.image_variants)+'</main>'));}const shell=await readHTML('/insights/');const origin=process.env.SITE_ORIGIN||'https://www.guc.co.kr';res.setHeader('Content-Type','text/html; charset=utf-8');return res.end(articleDocument(shell,post,assets,origin));
 }catch(error){
  console.error('[content] request failed',JSON.stringify({route,action:action||null,name:error.name,message:error.message}));
  res.setHeader('X-CMS-Status','degraded');
  // An unavailable CMS must not remove existing company content.
  let fallback=(action||isMigratedRoute(route))?null:route==='/sitemap.xml'?await fs.readFile(path.join(root,'sitemap.xml'),'utf8').catch(()=>null):await readHTML(route);
  if(route==='/newsroom/'&&fallback)fallback=fallback.replace(/(<div class="newsroom-grid" id="newsroom-list">)[\s\S]*?(<\/div><\/div><\/main>)/,(_,open,close)=>open+'<p role="status">현재 뉴스를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.</p>'+close);
  if(route==='/sitemap.xml'&&fallback)fallback=fallback.replace(/<url>[\s\S]*?<\/url>/g,item=>migratedRoutes.some(route=>item.includes(route))?'':item);
  if(route==='/insights/'&&fallback)fallback=withoutMigratedCards(fallback);
  if(fallback){res.setHeader('Content-Type',route==='/sitemap.xml'?'application/xml':'text/html; charset=utf-8');return res.end(fallback);}
  res.writeHead(action==='asset'?404:503,{'Content-Type':'text/plain; charset=utf-8'});return res.end(action==='asset'?'File unavailable':'콘텐츠 연결을 확인해 주세요.');
 }
}
