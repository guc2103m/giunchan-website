import sharp from 'sharp';
import {publicCMSConfig} from '../lib/content-config.mjs';
import {validateTree,referencedAssets,seoulDate} from '../lib/content-document.mjs';
import {migratedSlugs} from '../lib/content-migrations.mjs';
const json=(res,status,value)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(value));};
async function body(req){if(req.body)return typeof req.body==='string'?JSON.parse(req.body):req.body;let s='';for await(const chunk of req){s+=chunk;if(s.length>3500000)throw new Error('본문 용량 초과');}return JSON.parse(s);}
export default async function handler(req,res){
 if(req.method!=='POST')return json(res,405,{error:'POST required'});
 try{
  const authorization=req.headers.authorization;if(!/^Bearer [\w.-]+$/.test(authorization||''))return json(res,401,{error:'로그인해 주세요.'});
  const url=process.env.SUPABASE_URL||publicCMSConfig.url,key=process.env.SUPABASE_PUBLISHABLE_KEY||publicCMSConfig.key;
  const request=async(resource,options={})=>{const r=await fetch(url+resource,{...options,headers:{apikey:key,Authorization:authorization,...options.headers},signal:AbortSignal.timeout(25000)});if(!r.ok)throw new Error('저장소 요청 실패 ('+r.status+')');return r;};
  const user=await(await request('/auth/v1/user')).json();const admins=await(await request('/rest/v1/content_admins?user_id=eq.'+user.id)).json();if(!admins.length)return json(res,403,{error:'관리자 권한이 없습니다.'});
  const input=await body(req);
  if(input.action==='optimize'){
   const object=input.path;if(!/^[a-f0-9-]{36}\/[a-zA-Z0-9_.-]+$/.test(object||''))throw new Error('잘못된 원본 경로');
   const assets=await(await request('/rest/v1/post_assets?storage_path=eq.'+encodeURIComponent(object))).json();if(!assets.length||assets[0].kind!=='image')throw new Error('이미지 원본을 찾지 못했습니다.');
   const original=Buffer.from(await(await request('/storage/v1/object/authenticated/content-assets/'+object)).arrayBuffer());
   if(original.length>20*1024*1024)throw new Error('원본은 20MB 이하로 올려 주세요.');
   const meta=await sharp(original,{limitInputPixels:60000000}).metadata();if(meta.pages>1)throw new Error('움직이는 이미지는 정지 이미지로 변환하지 않습니다.');
   const result={original:{path:object,width:meta.width,height:meta.height,bytes:original.length}};
   for(const [name,width] of [['thumb',800],['body',1600]]){
    const {data,info}=await sharp(original,{limitInputPixels:60000000}).rotate().resize({width,withoutEnlargement:true}).webp({quality:90,smartSubsample:true}).toBuffer({resolveWithObject:true});
    const file=object+'.'+name+'-v1.webp';
    await request('/storage/v1/object/content-assets/'+file,{method:'POST',headers:{'Content-Type':'image/webp','cache-control':'max-age=31536000','x-upsert':'true'},body:data});
    const exists=await(await request('/rest/v1/post_assets?storage_path=eq.'+encodeURIComponent(file))).json();
    if(!exists.length)await request('/rest/v1/post_assets',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({post_id:assets[0].post_id,storage_path:file,original_name:assets[0].original_name+' ('+name+')',kind:'image'})});
    const check=await request('/storage/v1/object/authenticated/content-assets/'+file);if(Number(check.headers.get('content-length'))===0)throw new Error('파생 이미지 확인 실패');
    result[name]={path:file,width:info.width,height:info.height,bytes:data.length};
   }
   return json(res,200,result);
  }
  if(input.action!=='save')throw new Error('잘못된 요청');
  const p=input.post;if(!p||!Array.isArray(p.content?.blocks))throw new Error('본문 확인 필요');
  const tree=p.content.blocks.filter(b=>['element','text'].includes(b.type));validateTree(tree);
  if(p.content.blocks.some(b=>!['element','text','paragraph','heading','image','gallery','table','link','faq'].includes(b.type)))throw new Error('지원하지 않는 블록');
  if(!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)||!['draft','published','archived'].includes(p.status))throw new Error('글 주소 또는 상태 확인 필요');
  let old;if(input.id){old=(await(await request('/rest/v1/posts?id=eq.'+encodeURIComponent(input.id))).json())[0];if(!old)throw new Error('기존 글이 없습니다.');if(old.updated_at!==input.updated_at)throw new Error('다른 창에서 변경되었습니다. 다시 열어 주세요.');if(old.details?.ever_published&&old.slug!==p.slug)throw new Error('기존 글 주소는 유지해 주세요.');
   if(seoulDate(old.published_at)===seoulDate(p.published_at))p.published_at=old.published_at;
   // The migration marker is server-owned; editing cannot claim a static route.
   p.details={...p.details,migration:old.details?.migration};
  }else if(migratedSlugs.includes(p.slug))throw new Error('기존 글 주소와 겹칩니다.');
  p.content.asset_paths=referencedAssets(p.content.blocks,p.thumbnail_path,p.details?.image_variants);
  const allowed=['title','slug','category','summary','author','thumbnail_path','thumbnail_alt','published_at','status','content','seo_title','seo_description','tags','details'];
  const data=Object.fromEntries(allowed.filter(k=>p[k]!==undefined).map(k=>[k,p[k]]));
  const result=await(await request('/rest/v1/posts'+(old?'?id=eq.'+old.id+'&updated_at=eq.'+encodeURIComponent(old.updated_at):''),{method:old?'PATCH':'POST',headers:{'Content-Type':'application/json',Prefer:'return=representation'},body:JSON.stringify(data)})).json();
  if(!result.length)throw new Error('다른 창에서 변경되었습니다. 다시 열어 주세요.');return json(res,200,result);
 }catch(e){console.error('[editor]',e.message);return json(res,400,{error:e.message});}
}
