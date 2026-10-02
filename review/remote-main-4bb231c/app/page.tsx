import type { Metadata } from 'next';
import { SitePage } from '@/components/site-page';

const title='주식회사 기운찬 | 복합버섯균사체 바이오소재 GMK® 전문기업';
const description='주식회사 기운찬은 버섯균사체 기반의 바이오소재를 연구·개발하고, 이를 원료와 제품으로 사업화하는 천연물 바이오소재 전문기업입니다.';
const socialImage='https://www.guc.co.kr/assets/heroes/home-desktop.jpg';
export const metadata:Metadata={title,description,alternates:{canonical:'https://www.guc.co.kr/'},openGraph:{title:'주식회사 기운찬 | GMK® 복합버섯균사체 바이오소재',description,type:'website',url:'https://www.guc.co.kr/',images:[{url:socialImage,width:1920,height:900,alt:'주식회사 기운찬'}]},twitter:{card:'summary_large_image',title:'주식회사 기운찬 | GMK® 복합버섯균사체 바이오소재',description,images:[socialImage]}};

const faq=[
 {q:'GMK®는 완제품인가요?',a:'GMK®는 소비자에게 직접 판매되는 완제품명이 아니라 기운찬의 연구와 기업용 원료사업에 활용되는 바이오소재 브랜드입니다. GMK 관련 소재가 적용된 소비자 제품은 별도의 브랜드와 제품명으로 판매됩니다.'},
 {q:'GMK®에는 어떤 연구 근거가 있나요?',a:'GMK® 관련 공개 근거로 국내외 특허와 국제학술지 전임상 논문이 있습니다. 관련 원료의 인체적용시험은 완료됐으며 세부 결과는 공개하지 않습니다.'},
 {q:'기업이 GMK® 원료를 공급받을 수 있나요?',a:'적용 목적, 제품 유형, 필요 규격과 수량을 확인한 후 원료 공급, 샘플 검토, 기술자료 제공과 공동개발 가능성을 협의할 수 있습니다.'},
 {q:'기운찬의 소비자 제품은 어디에서 확인할 수 있나요?',a:'도두On 제품 페이지와 기운찬 공식 쇼핑몰에서 제품별 특징과 구매 정보를 확인할 수 있습니다.'},
];
const faqJsonLd={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(item=>({'@type':'Question',name:item.q,acceptedAnswer:{'@type':'Answer',text:item.a}}))};
const homeJsonLd={'@context':'https://schema.org','@type':'WebPage','@id':'https://www.guc.co.kr/#webpage',url:'https://www.guc.co.kr/',name:title,description,isPartOf:{'@id':'https://www.guc.co.kr/#website'},about:{'@id':'https://www.guc.co.kr/#organization'},inLanguage:'ko-KR',dateModified:'2026-09-06'};

export default function Home() { return <><SitePage path="/"/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(homeJsonLd)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqJsonLd)}}/></>; }

