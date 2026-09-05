import { SitePage } from '@/components/site-page';
import { pages, products, insights, siteOrigin } from '@/lib/site-data';
import type { Metadata } from 'next';

export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{
  const {slug}=await params; const path='/'+slug.join('/');
  const businessMeta:Record<string,{title:string;description:string}>= {
    '/business':{title:'사업영역 | 기운찬 GMK® 원료공급·제품개발',description:'기운찬의 GMK® 원료 공급, 식품·음료 제품개발, 자체·OEM·ODM 협력 생산, 완제품 납품과 해외사업 협력을 소개합니다.'},
    '/business/ingredient':{title:'GMK® 원료사업 | 기업용 복합버섯균사체 원료',description:'기업용 GMK®, GMK 추출액과 GMK 추출물의 차이, 적용 분야, 공급조건, 샘플 및 기술자료 문의 방법을 안내합니다.'},
    '/business/product-development':{title:'제품개발 | 식품·음료 공동개발 및 완제품 납품',description:'기운찬의 제품기획, 배합·시제품, 관능평가, 표시사항 검토, 제조사 연결, 생산과 완제품 납품 과정을 안내합니다.'}
  };
  if(businessMeta[path]){const meta=businessMeta[path];const url=siteOrigin+path;return {...meta,alternates:{canonical:url},openGraph:{...meta,url,type:'website'},twitter:{card:'summary_large_image',...meta}};}
  const technologyMeta:Record<string,{title:string;description:string}>={
    '/technology':{title:'기술·연구개발 | 기운찬 GMK®·GMK 추출물 연구',description:'기운찬은 다양한 버섯과 버섯균사체를 연구하고 정부 R&D와 산학협력을 통해 GMK® 및 GMK 추출물의 특허·전임상 연구·국제학술지 논문·인체적용시험 근거를 축적합니다.'},
    '/technology/patents':{title:'특허 | 기운찬 GMK® 국내외 지식재산권',description:'기운찬의 GMK® 생산 및 활용기술 관련 국내 특허 9건과 미국 특허 1건의 공식 명칭, 등록정보와 기술분야를 안내합니다.'},
    '/technology/publications':{title:'연구논문 | 기운찬 GMK·GMK 추출물 SCIE 논문',description:'GMK 및 GMK 추출물을 활용한 세포·동물모델 연구와 SCIE급 국제학술지 논문 4편의 서지정보, DOI와 연구 해석 범위를 안내합니다.'},
    '/technology/clinical-study':{title:'GMK 추출물 인체적용시험 | 기운찬',description:'GMK 추출물을 사용해 경도인지장애자 175명을 대상으로 진행한 다기관·무작위배정·이중눈가림·위약대조 인체적용시험의 설계와 공개 결과를 안내합니다.'}
  };
  if(technologyMeta[path]){const meta=technologyMeta[path];const url='https://www.guc.co.kr'+path;const image='https://www.guc.co.kr'+(path==='/technology/publications'?'/assets/heroes/papers-desktop.jpg':path==='/technology/clinical-study'?'/assets/heroes/clinical-study-24-desktop.jpg':path==='/technology/patents'?'/assets/heroes/patents-desktop.jpg':'/assets/heroes/technology-desktop-upright.jpg');return {...meta,alternates:{canonical:url},openGraph:{...meta,url,type:'website',images:[image]},twitter:{card:'summary_large_image',...meta,images:[image]}};}
  if(path==='/company'){
    const title='회사소개 | 주식회사 기운찬 - 설립·연혁·기업부설연구소';
    const description='주식회사 기운찬은 2015년 충남 천안에서 설립된 천연물 바이오소재 전문기업입니다. 다양한 버섯과 버섯균사체를 연구하고 복합배양·발효기술을 기반으로 GMK® 원료와 제품을 개발합니다.';
    const url='https://www.guc.co.kr/company';
    const image='https://www.guc.co.kr/assets/giunchan-rnd-team.jpg';
    const socialTitle='회사소개 | 주식회사 기운찬';
    const socialDescription='다양한 버섯과 버섯균사체 연구에서 시작해 특허·학술연구·인체적용시험과 원료·제품 사업화를 이어온 기운찬을 소개합니다.';
    return {title,description,alternates:{canonical:url},openGraph:{title:socialTitle,description:socialDescription,url,type:'website',images:[{url:image,width:1920,height:1080,alt:'주식회사 기운찬 기업부설연구소 연구진'}]},twitter:{card:'summary_large_image',title:socialTitle,description:socialDescription,images:[image]}};
  }
  const info=pages[path]; const product=products.find(x=>path==='/brands/dodoon/products/'+x.slug); const insight=insights.find(x=>x.href===path);
  const title=(info?.title||product?.name||insight?.title||'홈페이지 안내').replace(/\n/g,' ');
  const description=info?.lead||product?.summary||insight?.desc;
  return {title,description,alternates:{canonical:siteOrigin+path},openGraph:{title,description,url:siteOrigin+path}};
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path=`/${slug.join('/')}`;
  const companyJsonLd=path==='/company'?{
    '@context':'https://schema.org','@graph':[
      {'@type':'AboutPage','@id':'https://www.guc.co.kr/company#webpage',url:'https://www.guc.co.kr/company',name:'회사소개 | 주식회사 기운찬',description:'주식회사 기운찬은 2015년 충남 천안에서 설립된 천연물 바이오소재 전문기업입니다.',mainEntity:{'@id':'https://www.guc.co.kr/#organization'},isPartOf:{'@id':'https://www.guc.co.kr/#website'},inLanguage:'ko-KR'},
      {'@type':'Organization','@id':'https://www.guc.co.kr/#organization',name:'주식회사 기운찬',alternateName:'Giunchan Co., Ltd.',legalName:'주식회사 기운찬',url:'https://www.guc.co.kr/',logo:'https://www.guc.co.kr/assets/giunchan-logo-trimmed.png',description:'다양한 버섯과 버섯균사체를 연구하고 복합배양·발효기술을 기반으로 GMK® 원료와 제품을 개발하는 천연물 바이오소재 전문기업입니다.',foundingDate:'2015-10-12',taxID:'289-81-00204',email:'guc2203@guc.co.kr',telephone:'+82-41-579-2203',address:{'@type':'PostalAddress',streetAddress:'충절로 252, 2F',addressLocality:'천안시 동남구',addressRegion:'충청남도',addressCountry:'KR'},employee:{'@type':'Person',name:'박종례',jobTitle:'대표'}}
    ]}:null;
  const techPaths=['/technology','/technology/patents','/technology/publications','/technology/clinical-study'];
  const techJsonLd=techPaths.includes(path)?{'@context':'https://schema.org','@graph':[
    {'@type':path==='/technology/clinical-study'?'WebPage':'CollectionPage','@id':'https://www.guc.co.kr'+path+'#webpage',url:'https://www.guc.co.kr'+path,name:pages[path]?.title.replace(/\n/g,' '),dateModified:'2026-09-05',isPartOf:{'@id':'https://www.guc.co.kr/#website'},inLanguage:'ko-KR',about:[{'@type':'Thing',name:'GMK®'},{'@type':'Thing',name:'GMK 추출물'},{'@type':'Thing',name:'복합버섯균사체 연구'}],...(path==='/technology'?{hasPart:['/technology/patents','/technology/publications','/technology/clinical-study'].map(p=>({'@id':'https://www.guc.co.kr'+p+'#webpage'}))}:{})},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'HOME',item:'https://www.guc.co.kr/'},{'@type':'ListItem',position:2,name:'TECHNOLOGY',item:'https://www.guc.co.kr/technology'},...(path==='/technology'?[]:[{'@type':'ListItem',position:3,name:pages[path]?.title.replace(/\n/g,' '),item:'https://www.guc.co.kr'+path}])]},
    ...(path==='/technology/publications'?[{'@type':'ItemList',itemListElement:[
      ['2021','Water Extract of Mixed Mushroom Mycelia Grown on a Solid Barley Medium Is Protective against Experimental Focal Cerebral Ischemia','10.3390/cimb43010030'],['2023','Mixed Medicinal Mushroom Mycelia Attenuates Alzheimer’s Disease Pathologies In Vitro and In Vivo','10.3390/cimb45080428'],['2025','Neuroprotective Effect of Mixed Mushroom Mycelia Extract on Neurotoxicity and Neuroinflammation via Regulation of ROS-Induced Oxidative Stress in PC12 and BV2 Cells','10.3390/cells14130977'],['2026','A Water Extract of Mixed Mushroom Mycelia Mitigates Cognitive Deficit and Oxidative Stress After Global Cerebral Ischemia–Reperfusion Injury','10.3390/cimb48020151']].map(([year,headline,doi],i)=>({'@type':'ListItem',position:i+1,item:{'@type':'ScholarlyArticle',headline,datePublished:year,identifier:'https://doi.org/'+doi,url:'https://doi.org/'+doi,sameAs:'https://doi.org/'+doi}}))}]:[])
  ]}:null;
  const businessPaths=['/business','/business/ingredient','/business/product-development'];
  const businessFaqs:Record<string,[string,string][]>= {
    '/business':[['기운찬은 어떤 사업을 하나요?','기운찬은 GMK® 원료 공급, 제품기획, 배합·시제품, 관능평가, 제조사 연결과 완제품 납품을 지원합니다. 자체 브랜드 제품 판매와 해외 원료·완제품 협력 상담도 진행합니다.'],['자체 생산과 OEM·ODM 생산이 모두 가능한가요?','버섯한스푼 시리즈 등 일부 제품은 자체 생산합니다. 제품 유형과 설비 요건에 따라 전문 OEM·ODM 협력 제조사와 함께 생산합니다.']],
    '/business/ingredient':[['GMK® 원료는 기업이 구매할 수 있나요?','GMK®, GMK 추출액과 GMK 추출물은 기업에 공급 가능합니다. 사용 목적과 예상 수량을 확인한 후 공급조건을 협의합니다.'],['원료 샘플을 요청할 수 있나요?','상담 후 원료 샘플 제공 조건과 범위를 안내합니다. 비용과 수량 등 구체적인 조건은 홈페이지에 고정하지 않고 개별 협의합니다.']],
    '/business/product-development':[['제품 아이디어만 있어도 상담할 수 있나요?','가능합니다. 목표 소비자, 유통채널과 섭취 상황을 확인해 제품 콘셉트와 개발 방향부터 함께 검토합니다.'],['완제품 납품이 가능한가요?','생산조건과 납기를 협의해 자체 생산 또는 OEM·ODM 협력 생산 후 완제품으로 공급할 수 있습니다.']]
  };
  const serviceNames=path==='/business'?['GMK® 원료 공급','제품개발 및 공동개발','자체 제품 및 브랜드','해외사업 협력']:path==='/business/ingredient'?['GMK® 원료 공급','GMK 추출액 공급','GMK 추출물 공급']:['제품기획','배합 및 시제품','관능평가','제조사 연결','완제품 납품'];
  const businessJsonLd=businessPaths.includes(path)?{'@context':'https://schema.org','@graph':[
    {'@type':'WebPage','@id':siteOrigin+path+'#webpage',url:siteOrigin+path,name:pages[path]?.title.replace(/\n/g,' '),dateModified:'2026-09-05',about:{'@id':siteOrigin+'/#organization'},isPartOf:{'@id':siteOrigin+'/#website'},inLanguage:'ko-KR'},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'HOME',item:siteOrigin+'/'},{'@type':'ListItem',position:2,name:'BUSINESS',item:siteOrigin+'/business'},...(path==='/business'?[]:[{'@type':'ListItem',position:3,name:pages[path]?.title.replace(/\n/g,' '),item:siteOrigin+path}])]},
    {'@type':'ItemList',itemListElement:serviceNames.map((name,position)=>({'@type':'ListItem',position:position+1,item:{'@type':'Service',name,provider:{'@id':siteOrigin+'/#organization'},areaServed:'KR'}}))},
    {'@type':'FAQPage',mainEntity:businessFaqs[path].map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))}
  ]}:null;
  return <>{companyJsonLd&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(companyJsonLd)}}/>}{techJsonLd&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(techJsonLd)}}/>}{businessJsonLd&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(businessJsonLd)}}/>}<SitePage path={path} /></>;
}
