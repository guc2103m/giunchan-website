import notePosts from '../content/gmk-notes.json' with {type:'json'};
import https from 'node:https';
import {XMLParser, XMLValidator} from 'fast-xml-parser';
import {decodeHTML} from 'entities';

const RSS_URL='https://rss.blog.naver.com/guc5792203.xml';
export const FAILURE='현재 연구노트를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.';
const TTL=3600000;
const parser=new XMLParser({ignoreAttributes:false,parseTagValue:false,processEntities:false,isArray:name=>name==='item'||name==='category'});
export function plain(value){
 return decodeHTML(String(value??'')).replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
}
function safeUrl(value,image=false){
 try{const u=new URL(decodeHTML(String(value)));if(!['https:','http:'].includes(u.protocol))return null;
 if(image){if(!/(^|\.)(pstatic\.net|naver\.net|naver\.com)$/.test(u.hostname))return null;}
 else if(!['blog.naver.com','m.blog.naver.com'].includes(u.hostname)||!u.pathname.startsWith('/guc5792203/'))return null;
 u.protocol='https:';return u.href;
 }catch{return null;}
}
export function parseFeed(xml){
 if(/<!DOCTYPE|<!ENTITY/i.test(xml)||XMLValidator.validate(xml)!==true)throw new Error('Invalid RSS XML');
 const feed=parser.parse(xml)?.rss?.channel;
 if(!feed)throw new Error('RSS channel missing');
 const rows=feed.item||[];
 const fields=[...new Set(rows.flatMap(item=>Object.keys(item)))];
 const posts=rows.map(item=>{
  const html=String(item.description||'');
  const image=html.match(/<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/i)?.[1];
  const date=new Date(item.pubDate);
  return {title:plain(item.title),url:safeUrl(item.link),date:Number.isNaN(date.getTime())?null:date.toISOString(),description:plain(html),categories:(item.category||[]).map(plain).filter(Boolean),image:image?safeUrl(image,true):null};
 }).filter(p=>p.title&&p.url);
 const identified=posts.some(p=>p.categories.includes('GMK연구노트'));
 // TODO: GMK연구노트 카테고리 필터링 필요 — RSS가 식별 가능한 category를 제공하지 않는 경우 전체 글을 유지한다.
 const selected=identified?posts.filter(p=>p.categories.includes('GMK연구노트')):posts;
 return {posts:selected.map(p=>{const id=new URL(p.url).pathname.split('/').pop(),saved=notePosts.find(n=>n.id===id),editorial=saved?.slug==='hyphae-mycelium-mushrooms';const ready=saved?.status==='ready'||editorial;return {...p,title:saved?.title||p.title,id,slug:saved?.slug,detailUrl:ready?'/gmk-note/'+saved.slug+'/':null,importStatus:ready?'ready':'pending'};}),sourceCount:rows.length,fields,categoryIdentified:identified,filterMode:identified?'category':'all',fetchedAt:new Date().toISOString()};
}
export function fetchRss(){
 // node:https uses HTTPS with HTTP/1.1; fixed URL prevents arbitrary proxy requests.
 return new Promise((resolve,reject)=>{
  const req=https.get(RSS_URL,{headers:{Accept:'application/rss+xml, application/xml', 'User-Agent':'Giunchan-RSS-Preview/1.0'}},res=>{
   if(res.statusCode!==200){res.resume();reject(new Error(`RSS HTTP ${res.statusCode}`));return;}
   const chunks=[];let length=0;
   res.on('data',chunk=>{length+=chunk.length;if(length>2*1024*1024)req.destroy(new Error('RSS response too large'));else chunks.push(chunk);});
   res.on('end',()=>resolve(Buffer.concat(chunks).toString('utf8')));res.on('error',reject);
  });
  const timer=setTimeout(()=>req.destroy(new Error('RSS timeout')),10000);
  req.on('close',()=>clearTimeout(timer));req.on('error',reject);
 });
}
export function createHandler(load=fetchRss,now=Date.now){
 let cache=null,expires=0,pending=null;
 return async function handler(req,res){
  res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method!=='GET'){res.setHeader('Allow','GET');res.statusCode=405;res.end(JSON.stringify({message:'Method not allowed'}));return;}
  try{
   if(!cache||now()>=expires){
    if(!pending)pending=load().then(parseFeed).then(data=>{cache=data;expires=now()+TTL;return data;}).finally(()=>{pending=null;});
    await pending;
   }
   res.setHeader('Cache-Control','public, max-age=60, s-maxage=3600');res.statusCode=200;res.end(JSON.stringify(cache));
  }catch(error){
   if(process.env.NODE_ENV!=='production')console.error('[naver-blog]',error);
   res.setHeader('Cache-Control','no-store');res.statusCode=502;res.end(JSON.stringify({message:FAILURE}));
  }
 };
}
export default createHandler();
