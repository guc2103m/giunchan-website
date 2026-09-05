import {publicProductFacts} from './facts/products';
export const siteOrigin=(process.env.NEXT_PUBLIC_SITE_URL||'https://www.guc.co.kr').replace(/\/$/,'');
export const allowIndexing=process.env.NEXT_PUBLIC_INDEX_SITE==='true';
export const contactHref='/company#contact';
export const companyDefinition='주식회사 기운찬은 버섯균사체 기반의 바이오소재를 연구·개발하고, 이를 원료와 제품으로 사업화하는 천연물 바이오소재 전문기업입니다.';
const children=(items:string[][])=>items.map(([label,href])=>({label,href}));
export const nav=[
 {label:'COMPANY',href:'/company',children:[]},
 {label:'TECHNOLOGY',href:'/technology',children:children([['연구성과','/technology'],['특허','/technology/patents'],['연구논문','/technology/publications'],['인체적용시험','/technology/clinical-study']])},
 {label:'BUSINESS',href:'/business',children:children([['GMK® 원료사업','/business/ingredient'],['제품개발 및 공동개발','/business/product-development']])},
 {label:'BRANDS',href:'/brands',children:[]},
 {label:'INSIGHT',href:'/insight',children:[]},
 {label:'NEWSROOM',href:'/newsroom',children:[]},
];
export const inquiryTypes=['GMK® 원료 공급','GMK 추출액','GMK 추출물','원료 샘플','NDA 및 기술자료','제품개발','OEM·ODM 협력','완제품 납품','해외 원료공급','완제품 수출','해외 유통협력','공동연구','기타'];
export const inquiryHref=(type:string)=>'/company?inquiry='+encodeURIComponent(type)+'#contact';
export const stats=[
 {value:'10',label:'국내외 특허',note:'국내 9건 · 미국 1건',href:'/technology/patents'},
 {value:'4',label:'SCIE급 논문',note:'10년 이상 축적해 온 연구',href:'/technology/publications'},
 {value:'완료',label:'인체적용시험',note:'세부 결과 비공개',href:'/technology/clinical-study'},
];
export const products=publicProductFacts.map(item=>({slug:item.slug,name:item.name,type:item.foodType,summary:item.summary,image:item.image,production:item.manufacturer==='㈜기운찬'?'자체 생산':undefined}));
export const insights=[
 {category:'GMK®',title:'GMK®는 무엇인가요?',desc:'기운찬의 핵심 바이오소재 GMK®와 완제품의 차이를 간결하게 설명합니다.',date:'2026-09-05',linkLabel:'GMK® 설명 읽기',image:'/assets/culture-brown.webp',href:'/insight/what-is-gmk'},
 {category:'버섯균사체',title:'버섯과 균사체는 어떻게 다를까요?',desc:'균사체와 자실체의 차이, 생활사 속 역할을 쉽고 정확하게 살펴봅니다.',date:'2026-09-05',linkLabel:'버섯균사체 설명 읽기',image:'/assets/tree-mycelia.webp',href:'/insight/mushroom-and-mycelia'},
];
export const news=[
 {date:'2025.06.30',source:'한국경제',title:'건양대·기운찬, GMK 신경세포 관련 공동연구 발표',href:'https://www.guc.co.kr/forum/view/355080',summary:'건양대학교 의과대학과 기운찬의 공동연구가 Cells에 발표됐다는 소식입니다.',meaning:'기운찬의 연구소재에 대한 전임상 연구 기록입니다. 세포 연구 결과를 사람의 질병 예방·치료 효과나 판매제품의 효능으로 해석하지 않습니다.'},
 {date:'2024.08.06',source:'굿모닝충청',title:'기운찬, GMK® 관련 원료 인체적용시험 추진 소식',href:'https://www.guc.co.kr/forum/view/355078',summary:'GMK® 관련 원료의 인체적용시험 추진 계획을 다룬 당시 보도입니다.',meaning:'시험 추진 시점의 기록입니다. 현재는 인체적용시험을 완료하고 식약처 개별인정형 원료 인정 절차를 진행하고 있습니다.'},
 {date:'2023.09.19',source:'아시아투데이',title:'기운찬·건양대 연구팀, GMK 전임상 연구 발표',href:'https://www.guc.co.kr/forum/view/355077',summary:'기운찬과 건양대학교 의과대학 연구팀의 공동연구 성과를 소개한 보도입니다.',meaning:'연구소재의 가능성을 검토한 전임상 연구입니다. 사람에게 동일한 효과가 확인됐다는 의미는 아닙니다.'},
 {date:'2022.09.22',source:'충남일보',title:'천안시장애인체육회 선수단에 건강식품 지원',href:'https://www.guc.co.kr/forum/view/355076',summary:'기운찬이 충청남도 장애인체육대회에 출전하는 천안시 선수단을 후원했습니다.',meaning:'지역사회와 체육활동을 지원한 기운찬의 사회공헌 기록입니다.'},
 {date:'2022.08.18',source:'메디컬투데이',title:'GMK 복합배양 원천기술 미국 특허등록 결정',href:'https://www.guc.co.kr/forum/view/355069',summary:'GMK 관련 원천기술의 미국 특허등록 결정 소식을 전한 보도입니다.',meaning:'기술의 지식재산권에 관한 기록으로 제품의 기능성 승인이나 효능 보증을 의미하지 않습니다.'},
 {date:'2021.03.09',source:'에이블뉴스',title:'장애인국가대표 선수단에 건강기능식품 후원',href:'https://www.guc.co.kr/forum/view/355065',summary:'기운찬이 대한장애인체육회에 선수단을 위한 건강기능식품을 후원했습니다.',meaning:'건강한 일상과 스포츠를 응원하는 기업의 사회공헌 활동입니다.'},
];
export type PageInfo={section:string;title:string;lead:string;image:string};
const p=(section:string,title:string,lead:string,image:string):PageInfo=>({section,title,lead,image});
export const pages:Record<string,PageInfo>={
 '/company':p('COMPANY','자연의 가능성을 연구하고\n산업과 일상의 가치로 연결합니다',companyDefinition,'/assets/research-mushroom-spectrum.jpg'),
 '/technology':p('TECHNOLOGY','복합버섯균사체의 가능성을\n과학적 근거로 확인합니다','기운찬의 GMK® 연구체계와 공개된 특허·전임상 논문·인체적용시험 진행 현황을 안내합니다.','/assets/field-research.webp'),
 '/technology/patents':p('TECHNOLOGY · PATENTS','GMK® 기술을 뒷받침하는\n지식재산권','공식 자료를 기준으로 GMK® 복합배양 및 활용과 관련된 특허 권리 현황을 안내합니다.','/assets/microscope.webp'),
 '/technology/publications':p('TECHNOLOGY · PUBLICATIONS','복합버섯균사체 및 관련 추출물\n연구논문','세포·동물 전임상 연구로 발표된 국제학술지 논문 4편의 서지정보와 DOI 원문을 안내합니다.','/assets/research-dish.webp'),
 '/technology/clinical-study':p('TECHNOLOGY · CLINICAL STUDY','GMK® 관련 원료\n인체적용시험','인체적용시험 완료와 식약처 개별인정형 원료 인정 절차의 현재 공개 상태를 안내합니다.','/assets/quality-lab.webp'),
 '/business':p('BUSINESS','연구한 소재를 기업의 제품과\n소비자의 일상으로 연결합니다','기운찬은 GMK®를 비롯한 복합버섯균사체 소재를 연구하고, 기업용 원료 공급부터 식품·음료 적용, 공동 제품개발, 생산 연계와 완제품 납품까지 지원합니다.','/assets/ingredient-plates.webp'),
 '/business/ingredient':p('B2B INGREDIENT','기업의 제품 목적에 맞는\nGMK® 원료 협력','GMK®와 파생 원료의 차이, 일반적인 적용 범위와 기업용 원료 협력 절차를 안내합니다.','/assets/ingredient-forest.webp'),
 '/business/product-development':p('PRODUCT DEVELOPMENT','연구 소재의 특성을 이해하는\n제품개발','기운찬은 원료의 맛·향·색과 가공 특성, 소비자의 섭취 편의성을 함께 고려해 식품과 음료를 기획하고 개발합니다.','/assets/product-pouches.webp'),
 '/brands':p('DODOON BRAND','매일, 건강을 돋우다','도두On은 기운찬이 연구·개발한 GMK® 원료를 일상의 제품으로 연결하는 소비자 브랜드입니다.','/assets/product-premium.webp'),
 '/brands/dodoon':p('BRANDS · 도두On','매일의 건강을 돋우다.\n기운을 다시 세우는 하루.','‘돋우다’에서 시작된 이름, 따뜻함을 담은 도두On','/assets/product-premium.webp'),
 '/brands/dodoon/products':p('BRANDS · PRODUCTS','도두On 제품','기운찬의 제품과 공식 구매 안내를 확인하세요.','/assets/product-pouches.webp'),
 '/insight':p('INSIGHT','GMK®와 버섯균사체를\n정확하게 이해하는 출발점','핵심 용어와 개념을 쉽고 명확하게 설명합니다.','/assets/tree-mycelia.webp'),
 '/insight/gmk':p('INSIGHT · GMK®','GMK®','기운찬의 핵심 바이오소재와 관련 용어를 알아봅니다.','/assets/gmk-landscape-dark.webp'),
 '/insight/mycelia':p('INSIGHT · MYCELIA','버섯균사체','균사체의 기본 개념과 자실체의 차이를 알아봅니다.','/assets/culture-white.webp'),
 '/newsroom':p('NEWSROOM','기운찬의 소식과\n산업의 변화를 전합니다','기운찬 뉴스 / 산업·연구 이슈','/assets/lab-extract.webp'),
 '/newsroom/news':p('NEWSROOM · COMPANY NEWS','기운찬 뉴스','연구·사업·사회공헌의 주요 기록','/assets/field-research.webp'),
 '/newsroom/issues':p('NEWSROOM · INDUSTRY','산업·연구 이슈','버섯균사체와 천연물 바이오소재 산업의 흐름','/assets/microscope.webp'),
};
export const redirects:Record<string,string>={
 '/company/ceo':'/company#ceo','/company/philosophy':'/company#about','/company/history':'/company#information','/company/esg':'/company#about',
 '/contact':'/company#contact','/contact/location':'/company#location',
 '/technology/gmk':'/insight/gmk','/technology/competitiveness':'/technology','/technology/research':'/technology','/technology/faq':'/insight/gmk#faq',
 '/business/applications':'/business/ingredient','/business/quality':'/business/ingredient','/business/global':'/business/ingredient','/business/co-development':'/business/product-development',
 '/insight/research':'/technology','/insight/business-esg':'/newsroom/issues','/insight/story':'/newsroom/news','/insight/research/reading-clinical-study':'/technology/clinical-study',
 '/newsroom/press':'/newsroom/news','/newsroom/media':'/newsroom/news','/newsroom/notice':'/newsroom/news',
 '/brands/dodoon/products/gmk':'/brands/dodoon/products/immune-mk','/brands/dodoon/products/liquid':'/brands/dodoon/products/giunchan-drink','/brands/dodoon/products/gift':'/brands/dodoon/products/premium-gift','/brands/dodoon/products/grape-jelly':'/brands/dodoon/products/smart-jelly',
};

