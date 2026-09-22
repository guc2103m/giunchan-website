import {createHash,createHmac,randomBytes} from 'node:crypto';
import {TYPES,validate,FAILURE} from '../dist/contact-validation.js';
export const config={maxDuration:30};
const salt=randomBytes(32),buckets=new Map(),inflight=new Set();
const hash=value=>createHmac('sha256',salt).update(value).digest('hex');
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function limited(ip){
 const now=Date.now();for(const [key,v] of buckets)if(v.until<=now)buckets.delete(key);
 const key=hash(ip),v=buckets.get(key)||{count:0,until:now+600000};
 if(!buckets.has(key)&&buckets.size>=5000)return true;
 v.count++;buckets.set(key,v);return v.count>5;
}
export function makeEmail(data,submittedAt,env){
 const fields=[['접수 일시',new Date(submittedAt).toLocaleString('ko-KR',{timeZone:'Asia/Seoul'})+' (KST)'],['문의 유형',TYPES[data.type]],['회사명',data.company||'미입력'],['담당자명 또는 성명',data.name],['전화번호',data.phone],['이메일',data.email],['문의 제목',data.subject],['문의 내용',data.message],['개인정보 수집·이용 동의','동의함']];
 return {from:env.CONTACT_FROM_EMAIL,to:[env.CONTACT_TO_EMAIL],reply_to:data.email,subject:`[기운찬 홈페이지 문의] ${TYPES[data.type]} | ${data.company||data.name}`,text:fields.map(([k,v])=>`${k}: ${v}`).join('\n\n'),html:'<h2>기운찬 홈페이지 문의</h2><table>'+fields.map(([k,v])=>`<tr><th style="text-align:left;vertical-align:top;padding:10px">${k}</th><td style="padding:10px;white-space:pre-wrap">${escape(v)}</td></tr>`).join('')+'</table>'};
}
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('X-Content-Type-Options','nosniff');
 const reply=(status,body)=>{res.statusCode=status;res.end(JSON.stringify(body));};
 if(req.method!=='POST'){res.setHeader('Allow','POST');return reply(405,{ok:false,message:FAILURE});}
 // Compare to trusted deployment names, never a caller-supplied Host header.
 const allowed=['https://giunchan-website.vercel.app',...['VERCEL_URL','VERCEL_PROJECT_PRODUCTION_URL'].map(k=>process.env[k]?`https://${process.env[k]}`:null)];
 if(!process.env.VERCEL)allowed.push('http://127.0.0.1:4173','http://localhost:4173');
 if(!allowed.includes(req.headers.origin))return reply(403,{ok:false,message:FAILURE});
 if(!/^application\/json(?:;|$)/i.test(req.headers['content-type']||''))return reply(415,{ok:false,message:FAILURE});
 const ip=process.env.VERCEL?String(req.headers['x-vercel-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0]:req.socket?.remoteAddress||'local';
 if(limited(ip)){res.setHeader('Retry-After','600');return reply(429,{ok:false,message:FAILURE});}
 let input;
 try{
  if(Number(req.headers['content-length'])>24000)return reply(413,{ok:false,message:FAILURE});
  if(req.body!==undefined){const raw=typeof req.body==='string'?req.body:JSON.stringify(req.body);if(Buffer.byteLength(raw)>24000)return reply(413,{ok:false,message:FAILURE});input=JSON.parse(raw);}
  else{let raw='';for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>24000)return reply(413,{ok:false,message:FAILURE});}input=JSON.parse(raw);}
 }catch{return reply(400,{ok:false,message:FAILURE});}
 if(!input||Array.isArray(input)||typeof input!=='object')return reply(400,{ok:false,message:FAILURE});
 const {data,errors}=validate(input);
 if(Object.keys(errors).length)return reply(400,{ok:false,message:FAILURE,errors});
 const now=Date.now(),submitted=Date.parse(input.submittedAt);
 if(input.website||!Number.isFinite(input.openedAt)||now-input.openedAt<2000||now-input.openedAt>86400000||!Number.isFinite(submitted)||Math.abs(now-submitted)>86400000||typeof input.requestId!=='string'||!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(input.requestId))return reply(400,{ok:false,message:FAILURE});
 const env=process.env;
 if(!env.RESEND_API_KEY||!env.CONTACT_FROM_EMAIL||!env.CONTACT_TO_EMAIL)return reply(503,{ok:false,message:FAILURE});
 if(env.VERCEL_ENV==='production'&&env.CONTACT_TO_EMAIL!=='guc2203@guc.co.kr')return reply(503,{ok:false,message:FAILURE});
 const key=createHash('sha256').update(input.requestId).digest('hex');
 if(inflight.has(key))return reply(409,{ok:false,message:FAILURE});
 inflight.add(key);
 try{
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`contact-${key}`},body:JSON.stringify(makeEmail(data,input.submittedAt,env)),signal:AbortSignal.timeout(15000)});
  const result=await response.json();
  if(!response.ok||typeof result.id!=='string'||!result.id)return reply(502,{ok:false,message:FAILURE});
  return reply(200,{ok:true});
 }catch{return reply(502,{ok:false,message:FAILURE});}
 finally{inflight.delete(key);}
}
