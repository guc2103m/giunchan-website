import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import handler from '../api/contact.js';
let sequence=0;
const valid=()=>({type:'ingredient',company:'테스트 회사',name:'테스트',phone:'010-1234-5678',email:'test@example.com',subject:'문의 테스트',message:'<script>alert(1)</script>',consent:true,openedAt:Date.now()-5000,submittedAt:new Date().toISOString(),requestId:randomUUID(),website:''});
async function send(body,options={}){const req={method:'POST',headers:{origin:'http://localhost:4173','content-type':'application/json',...options.headers},socket:{remoteAddress:options.ip||String(++sequence)},body};let result;const res={setHeader(){},end(text){result={status:this.statusCode,body:JSON.parse(text)};}};await handler(req,res);return result;}
test('contact validation, delivery outcomes and abuse protection',async()=>{
 const originalFetch=global.fetch,originalEnv={...process.env};
 delete process.env.VERCEL;delete process.env.VERCEL_ENV;delete process.env.RESEND_API_KEY;
 try{
 assert.equal((await send(valid())).status,503);
 for(const field of ['name','phone','email','subject','message','type']){const data=valid();data[field]='';const r=await send(data);assert.equal(r.status,400);assert.ok(r.body.errors[field]);}
 assert.equal((await send({...valid(),consent:false})).status,400);
 assert.equal((await send({...valid(),email:'invalid',phone:'abc'})).status,400);
 assert.equal((await send({...valid(),subject:'x'.repeat(151)})).status,400);
 assert.equal((await send({...valid(),website:'bot'})).status,400);
 assert.equal((await send({...valid(),openedAt:Date.now()})).status,400);
 assert.equal((await send(valid(),{headers:{origin:'https://attacker.invalid'}})).status,403);
 assert.equal((await send('x'.repeat(24001))).status,413);
 assert.equal((await send('{broken')).status,400);
 process.env.RESEND_API_KEY='test-only';process.env.CONTACT_FROM_EMAIL='test@example.com';process.env.CONTACT_TO_EMAIL='guc2203@guc.co.kr';
 let captured;
 global.fetch=async(url,options)=>{captured=JSON.parse(options.body);return {ok:true,json:async()=>({id:'mock-id'})};};
 const success=await send(valid());assert.equal(success.status,200);assert.equal(success.body.ok,true);assert.equal(captured.reply_to,'test@example.com');assert.deepEqual(captured.to,['guc2203@guc.co.kr']);assert.ok(captured.subject.includes('GMK® 원료 문의'));assert.ok(captured.html.includes('&lt;script&gt;'));assert.ok(!captured.html.includes('<script>'));
 global.fetch=async()=>({ok:false,json:async()=>({message:'private provider detail'})});
 const failed=await send(valid());assert.equal(failed.status,502);assert.equal(failed.body.ok,false);assert.ok(!JSON.stringify(failed).includes('private provider'));
 global.fetch=async()=>{throw Error('network');};assert.equal((await send(valid())).status,502);
 let release;global.fetch=()=>new Promise(resolve=>{release=()=>resolve({ok:true,json:async()=>({id:'mock'})});});
 const same=valid(),pending=send(same);await new Promise(resolve=>setImmediate(resolve));assert.equal((await send(same)).status,409);release();await pending;
 for(let i=0;i<5;i++)await send({...valid(),consent:false},{ip:'rate-test'});assert.equal((await send(valid(),{ip:'rate-test'})).status,429);
 }finally{global.fetch=originalFetch;for(const key of Object.keys(process.env))if(!(key in originalEnv))delete process.env[key];Object.assign(process.env,originalEnv);}
});
