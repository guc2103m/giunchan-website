import { SitePage } from '@/components/site-page';
import { pages, products, insights, siteOrigin } from '@/lib/site-data';
import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { findContent, publishedInsights, publishedNews } from '@/lib/content-data';
import { publicProductFacts } from '@/lib/facts/products';

export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{
  const {slug}=await params; const path='/'+slug.join('/');
  const content=findContent(path);
  if(path==='/insight'||path==='/newsroom'||content){
    const isInsight=path.startsWith('/insight');
    const title=content?content.title:(isInsight?'인사이트 | 기운찬 GMK®·버섯균사체 지식 아카이브':'뉴스룸 | 기운찬 연구·특허·제품·사업 소식');
    const description=content?content.summary:(isInsight?'GMK®, 버섯균사체, 원료 형태, 복합배양과 연구방법을 질문 중심으로 쉽고 정확하게 설명하는 기운찬 인사이트입니다.':'주식회사 기운찬의 연구성과, 특허, 제품과 브랜드, 사업협력 및 사회공헌 소식을 공식 기록으로 전합니다.');
    const url=siteOrigin+path;const image=siteOrigin+(content?.thumbnail||(isInsight?'/assets/heroes/insight-desktop.jpg':'/assets/heroes/news-desktop.jpg'));
    return {title,description,alternates:{canonical:url},openGraph:{title,description,url,type:content?'article':'website',images:[{url:image,alt:content?.thumbnailAlt||title}],...(content?{publishedTime:content.publishedAt,modifiedTime:content.updatedAt}: {})},twitter:{card:'summary_large_image',title,description,images:[image]}};
  }
  if(path==='/brands'){
    const title='도두On 브랜드·제품 | 기운찬 GMK® 소비자 제품';
    const description='도두On은 주식회사 기운찬의 소비자 브랜드입니다. 기운찬, 기운찬이뮨MK, 마시면기운차, 똑똑젤리 등 현재 판매 제품과 공식 구매정보를 확인하세요.';
    const url=siteOrigin+'/brands';const image=siteOrigin+'/assets/product-premium.webp';
    return {title,description,alternates:{canonical:url},openGraph:{title,description,url,type:'website',images:[{url:image,alt:'도두On 브랜드 제품'}]},twitter:{card:'summary_large_image',title,description,images:[image]}};
  }
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
    '/technology/clinical-study':{title:'GMK® 관련 원료 인체적용시험 | 기운찬',description:'GMK® 관련 원료의 인체적용시험 완료와 식품의약품안전처 개별인정형 원료 인정 절차의 현재 공개 상태를 안내합니다.'}
  };
  if(technologyMeta[path]){const meta=technologyMeta[path];const url='https://www.guc.co.kr'+path;const image='https://www.guc.co.kr'+(path==='/technology/publications'?'/assets/heroes/papers-desktop.jpg':path==='/technology/clinical-study'?'/assets/heroes/clinical-study-24-desktop.jpg':path==='/technology/patents'?'/assets/heroes/patents-desktop.jpg':'/assets/heroes/technology-desktop-upright.jpg');return {...meta,alternates:{canonical:url},openGraph:{...meta,url,type:'website',images:[image]},twitter:{card:'summary_large_image',...meta,images:[image]}};}
  if(path==='/company'){
    const title='회사소개 | 주식회사 기운찬 - 설립·연혁·기업부설연구소';
    const description='주식회사 기운찬은 2015년 충남 천안에서 설립된 천연물 바이오소재 전문기업입니다. 버섯균사체 기반 바이오소재를 연구·개발하고 원료와 제품으로 사업화합니다.';
    const url='https://www.guc.co.kr/company';
    const image='https://www.guc.co.kr/assets/giunchan-rnd-team.jpg';
    const socialTitle='회사소개 | 주식회사 기운찬';
    const socialDescription='버섯균사체 기반 바이오소재 연구에서 특허·학술연구·인체적용시험과 원료·제품 사업화를 이어온 기운찬을 소개합니다.';
    return {title,description,alternates:{canonical:url},openGraph:{title:socialTitle,description:socialDescription,url,type:'website',images:[{url:image,width:1920,height:1080,alt:'주식회사 기운찬 기업부설연구소 연구진'}]},twitter:{card:'summary_large_image',title:socialTitle,description:socialDescription,images:[image]}};
  }
  const info=pages[path]; const product=products.find(x=>path==='/brands/dodoon/products/'+x.slug); const insight=insights.find(x=>x.href===path);
  const title=(info?.title||product?.name||insight?.title||'홈페이지 안내').replace(/\n/g,' ');
  const description=info?.lead||product?.summary||insight?.desc;
  const url=siteOrigin+path;const image=siteOrigin+(info?.image||product?.image||insight?.image||'/assets/heroes/home-desktop.jpg');
  return {title,description,alternates:{canonical:url},openGraph:{title,description,url,type:'website',images:[{url:image,alt:title}]},twitter:{card:'summary_large_image',title,description,images:[image]}};
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path=`/${slug.join('/')}`;
  if(path==='/insight/gmk'||path==='/insight/gmk/what-is-gmk')permanentRedirect('/insight/what-is-gmk');
  if(path==='/insight/mycelia'||path==='/insight/mycelia/mushroom-and-mycelia')permanentRedirect('/insight/mushroom-and-mycelia');
  if(path==='/newsroom/news'||path==='/newsroom/issues'||path==='/newsroom/press'||path==='/newsroom/media'||path==='/newsroom/notice')permanentRedirect('/newsroom');
  if(path==='/brands/dodoon')permanentRedirect('/brands');
  if(path.startsWith('/brands/dodoon/products/')){
    const oldSlug=path.split('/').at(-1)||'';
    const mapped:Record<string,string>={gmk:'immune-mk',liquid:'giunchan-drink',gift:'premium-gift','giunchan-bon':'premium-gift','grape-jelly':'smart-jelly'};
    if(mapped[oldSlug])permanentRedirect('/brands/dodoon/products/'+mapped[oldSlug]);
  }
  const companyJsonLd=path==='/company'?{
    '@context':'https://schema.org','@graph':[
      {'@type':'AboutPage','@id':'https://www.guc.co.kr/company#webpage',url:'https://www.guc.co.kr/company',name:'회사소개 | 주식회사 기운찬',description:'주식회사 기운찬은 2015년 충남 천안에서 설립된 천연물 바이오소재 전문기업입니다.',mainEntity:{'@id':'https://www.guc.co.kr/#organization'},isPartOf:{'@id':'https://www.guc.co.kr/#website'},inLanguage:'ko-KR'},
      {'@type':'Organization','@id':'https://www.guc.co.kr/#organization',name:'주식회사 기운찬',alternateName:'Giunchan Co., Ltd.',legalName:'주식회사 기운찬',url:'https://www.guc.co.kr/',logo:'https://www.guc.co.kr/assets/giunchan-logo-trimmed.png',description:'버섯균사체 기반 바이오소재를 연구·개발하고 원료와 제품으로 사업화하는 천연물 바이오소재 전문기업입니다.',foundingDate:'2015-10-12',email:'guc2203@guc.co.kr',telephone:'+82-41-579-2203',address:{'@type':'PostalAddress',streetAddress:'충절로 252, 2F',addressLocality:'천안시 동남구',addressRegion:'충청남도',addressCountry:'KR'},employee:{'@type':'Person',name:'박종례',jobTitle:'대표'}}
    ]}:null;
  const techPaths=['/technology','/technology/patents','/technology/publications','/technology/clinical-study'];
  const techJsonLd=techPaths.includes(path)?{'@context':'https://schema.org','@graph':[
    {'@type':path==='/technology/clinical-study'?'WebPage':'CollectionPage','@id':'https://www.guc.co.kr'+path+'#webpage',url:'https://www.guc.co.kr'+path,name:pages[path]?.title.replace(/\n/g,' '),dateModified:'2026-09-06',isPartOf:{'@id':'https://www.guc.co.kr/#website'},inLanguage:'ko-KR',about:[{'@type':'Thing',name:'GMK®'},{'@type':'Thing',name:'GMK® 추출물'},{'@type':'Thing',name:'복합버섯균사체 연구'}],...(path==='/technology'?{hasPart:['/technology/patents','/technology/publications','/technology/clinical-study'].map(p=>({'@id':'https://www.guc.co.kr'+p+'#webpage'}))}:{})},
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
    {'@type':'WebPage','@id':siteOrigin+path+'#webpage',url:siteOrigin+path,name:pages[path]?.title.replace(/\n/g,' '),dateModified:'2026-09-06',about:{'@id':siteOrigin+'/#organization'},isPartOf:{'@id':siteOrigin+'/#website'},inLanguage:'ko-KR'},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'HOME',item:siteOrigin+'/'},{'@type':'ListItem',position:2,name:'BUSINESS',item:siteOrigin+'/business'},...(path==='/business'?[]:[{'@type':'ListItem',position:3,name:pages[path]?.title.replace(/\n/g,' '),item:siteOrigin+path}])]},
    {'@type':'ItemList',itemListElement:serviceNames.map((name,position)=>({'@type':'ListItem',position:position+1,item:{'@type':'Service',name,provider:{'@id':siteOrigin+'/#organization'},areaServed:'KR'}}))},
    {'@type':'FAQPage',mainEntity:businessFaqs[path].map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))}
  ]}:null;
  const brandProductNames=['기운찬','똑똑젤리','기운찬이뮨MK','마시면기운차','기운차 진액','버섯마시면기운차 15포','버섯마시면기운차 30포','버섯한스푼 3종'];
  const brandProductSlugs=['premium-gift','grape-jelly','immune-mk','giunchan-drink','giuncha-extract','mushroom-tea','mushroom-tea-gift','mushroom-spoon'];
  const brandFaqs=[['도두On은 어떤 브랜드인가요?','도두On은 주식회사 기운찬이 운영하는 소비자 브랜드입니다. 기운찬이 연구·개발한 GMK® 원료를 일상의 제품으로 연결합니다.'],['GMK®는 제품 이름인가요?','GMK®는 완제품명이 아니라 기운찬이 개발한 복합버섯균사체 원료 브랜드입니다.'],['제품 포장에 도두On 로고가 없는 제품도 있나요?','일부 기존 제품은 도두On 브랜드 체계가 정립되기 전에 개발돼 현재 패키지에 도두On 로고가 표시되지 않을 수 있습니다.']];
  const brandsJsonLd=path==='/brands'?{'@context':'https://schema.org','@graph':[
    {'@type':'WebPage','@id':siteOrigin+'/brands#webpage',url:siteOrigin+'/brands',name:'도두On 브랜드·제품',description:'기운찬이 연구·개발한 GMK® 원료를 활용한 도두On 소비자 브랜드와 전체 제품 안내',inLanguage:'ko-KR',about:{'@id':siteOrigin+'/brands#brand'}},
    {'@type':'Brand','@id':siteOrigin+'/brands#brand',name:'도두On',alternateName:'dodoon',description:'주식회사 기운찬이 운영하는 GMK® 원료 기반 소비자 브랜드',logo:siteOrigin+'/assets/dodoon-official-logo.jpg'},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'HOME',item:siteOrigin+'/'},{'@type':'ListItem',position:2,name:'BRANDS',item:siteOrigin+'/brands'}]},
    {'@type':'ItemList',numberOfItems:brandProductNames.length,itemListElement:brandProductNames.map((name,i)=>({'@type':'ListItem',position:i+1,item:{'@type':'Product',name,brand:{'@id':siteOrigin+'/brands#brand'},url:siteOrigin+'/brands#'+brandProductSlugs[i]}}))},
    {'@type':'FAQPage',mainEntity:brandFaqs.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))}
  ]}:null;
  const productFact=publicProductFacts.find(x=>path==='/brands/dodoon/products/'+x.slug);
  const productJsonLd=productFact?{'@context':'https://schema.org','@graph':[
    {'@type':'Product','@id':siteOrigin+path+'#product',name:productFact.name,description:productFact.summary,image:siteOrigin+productFact.image,category:productFact.foodType,brand:{'@type':'Brand',name:'도두On'},manufacturer:{'@type':'Organization',name:productFact.manufacturer||'주식회사 기운찬'},url:siteOrigin+path},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'HOME',item:siteOrigin+'/'},{'@type':'ListItem',position:2,name:'BRANDS',item:siteOrigin+'/brands'},{'@type':'ListItem',position:3,name:'도두On 제품',item:siteOrigin+'/brands/dodoon/products'},{'@type':'ListItem',position:4,name:productFact.name,item:siteOrigin+path}]}
  ]}:null;
  const contentEntry=findContent(path);const contentList=path==='/insight'?publishedInsights:path==='/newsroom'?publishedNews:null;
  const contentJsonLd=contentEntry?{'@context':'https://schema.org','@graph':[
    {'@type':contentEntry.contentType==='insight'?'Article':'NewsArticle','@id':siteOrigin+path+'#article',headline:contentEntry.title,description:contentEntry.summary,image:siteOrigin+contentEntry.thumbnail,datePublished:contentEntry.publishedAt,dateModified:contentEntry.updatedAt,author:{'@id':siteOrigin+'/#organization'},publisher:{'@id':siteOrigin+'/#organization'},mainEntityOfPage:{'@id':siteOrigin+path+'#webpage'},inLanguage:'ko-KR',...(contentEntry.sourceLinks.length?{isBasedOn:contentEntry.sourceLinks.map(x=>x.url)}:{})},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'HOME',item:siteOrigin+'/'},{'@type':'ListItem',position:2,name:contentEntry.contentType==='insight'?'INSIGHT':'NEWSROOM',item:siteOrigin+'/'+contentEntry.contentType},{'@type':'ListItem',position:3,name:contentEntry.title,item:siteOrigin+path}]}
  ]}:contentList?{'@context':'https://schema.org','@graph':[
    {'@type':'CollectionPage','@id':siteOrigin+path+'#webpage',url:siteOrigin+path,name:path==='/insight'?'기운찬 인사이트':'기운찬 뉴스룸',isPartOf:{'@id':siteOrigin+'/#website'},inLanguage:'ko-KR'},
    {'@type':'ItemList',numberOfItems:contentList.length,itemListElement:contentList.map((x,i)=>({'@type':'ListItem',position:i+1,url:`${siteOrigin}/${x.contentType}/${x.slug}`,name:x.title}))},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'HOME',item:siteOrigin+'/'},{'@type':'ListItem',position:2,name:path==='/insight'?'INSIGHT':'NEWSROOM',item:siteOrigin+path}]}
  ]}:null;
  return <>{companyJsonLd&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(companyJsonLd)}}/>}{techJsonLd&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(techJsonLd)}}/>}{businessJsonLd&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(businessJsonLd)}}/>}{brandsJsonLd&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(brandsJsonLd)}}/>}{productJsonLd&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(productJsonLd)}}/>}{contentJsonLd&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(contentJsonLd)}}/>}<SitePage path={path} /></>;
}
