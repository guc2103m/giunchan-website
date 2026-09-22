import {TYPES,validate,FAILURE} from './contact-validation.js';
const form=document.querySelector('.contact-form');
const params=new URLSearchParams(location.search);
const requested=params.get('type');
const initialType=Object.hasOwn(TYPES,requested)?requested:'other';
form.elements.type.value=initialType;
const interest=params.get('material')||params.get('product');
if(interest&&/^[a-z0-9-]{1,80}$/i.test(interest))form.elements.subject.value=`${interest} 문의`;
const button=form.querySelector('button[type=submit]'),result=form.querySelector('.result');
let pending=false,attempt=null,openedAt=Date.now();
function errors(fields){
 for(const key of ['type','company','name','phone','email','subject','message','consent']){
  const input=form.elements[key],message=fields[key]||'';
  document.getElementById(`error-${key}`).textContent=message;
  input.setAttribute('aria-invalid',String(Boolean(message)));
 }
}
form.addEventListener('input',e=>{if(e.target.name){const el=document.getElementById(`error-${e.target.name}`);if(el)el.textContent='';e.target.removeAttribute('aria-invalid');}});
form.addEventListener('submit',async e=>{
 e.preventDefault();if(pending)return;
 const input=Object.fromEntries(new FormData(form));input.consent=form.elements.consent.checked;
 const {data,errors:invalid}=validate(input);errors(invalid);result.textContent='';
 if(Object.keys(invalid).length){form.elements[Object.keys(invalid)[0]].focus();return;}
 const fingerprint=JSON.stringify(data);
 if(!attempt||attempt.fingerprint!==fingerprint)attempt={fingerprint,requestId:crypto.randomUUID(),submittedAt:new Date().toISOString()};
 pending=true;button.disabled=true;button.textContent='전송 중입니다…';form.setAttribute('aria-busy','true');
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),22000);
 let success=false;
 try{
  const response=await fetch('/api/contact/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,website:input.website||'',openedAt,requestId:attempt.requestId,submittedAt:attempt.submittedAt}),signal:controller.signal});
  const reply=await response.json();
  if(!response.ok||reply.ok!==true){if(reply.errors)errors(reply.errors);throw new Error('send_failed');}
  success=true;form.reset();form.elements.type.value=initialType;attempt=null;openedAt=Date.now();
  result.classList.remove('error');result.textContent='문의가 정상적으로 접수되었습니다. 확인 후 담당자가 연락드리겠습니다.';
 }catch{result.classList.add('error');result.textContent=FAILURE;}
 finally{clearTimeout(timer);form.removeAttribute('aria-busy');setTimeout(()=>{pending=false;button.disabled=false;button.textContent='문의 보내기';},success?10000:1000);}
});
