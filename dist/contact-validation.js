export const TYPES={ingredient:'GMK® 원료 문의',consumer:'제품·구매 문의',development:'제품 개발·제품화 상담',other:'기타 문의'};
export const LIMITS={company:100,name:80,phone:30,email:254,subject:150,message:5000};
export const FAILURE='문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 guc2203@guc.co.kr로 문의해 주세요.';
export function validate(input){
 const data={},errors={};
 for(const [key,max] of Object.entries(LIMITS)){
  const value=typeof input?.[key]==='string'?input[key].trim():'';
  data[key]=value;
  if(key!=='company'&&!value)errors[key]='필수 항목을 입력해 주세요.';
  else if(value.length>max)errors[key]=`${max}자 이내로 입력해 주세요.`;
  else if(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(value)||(key!=='message'&&/[\r\n]/.test(value)))errors[key]='허용되지 않는 문자가 포함되어 있습니다.';
 }
 data.type=typeof input?.type==='string'?input.type:'';
 if(!Object.hasOwn(TYPES,data.type))errors.type='문의 유형을 선택해 주세요.';
 if(data.email&&!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/.test(data.email))errors.email='올바른 이메일 주소를 입력해 주세요.';
 const digits=data.phone.replace(/\D/g,'');
 if(data.phone&&(!/^\+?[\d ()-]+$/.test(data.phone)||digits.length<9||digits.length>15))errors.phone='전화번호를 9~15자리 숫자로 입력해 주세요. +, 공백, 괄호, 하이픈을 사용할 수 있습니다.';
 data.consent=input?.consent===true;
 if(!data.consent)errors.consent='개인정보 수집·이용 동의가 필요합니다.';
 return {data,errors};
}
