export const siteOrigin='https://www.guc.co.kr';
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
 {value:'175',label:'인체적용시험 대상자',note:'회사 공개자료 기준 · 시험 완료',href:'/technology/clinical-study'},
];
export const products=[
 {slug:'grape-jelly',name:'똑똑젤리',type:'젤리',summary:'휴대하기 쉬운 스틱형 젤리 제품',image:'/assets/product-grape.webp'},
 {slug:'immune-mk',name:'기운찬 이뮨·MK',type:'건강기능식품',summary:'비타민C·아연·셀렌·비타민D·비타민B군을 담은 제품',image:'/assets/product-gmk.webp'},
 {slug:'giunchan-drink',name:'마시면 기운차',type:'음료',summary:'병 포장으로 일상에서 간편하게 즐기는 음료',image:'/assets/product-liquid.webp'},
 {slug:'premium-gift',name:'기운찬 프리미엄 선물세트',type:'선물세트',summary:'선물하기 좋도록 정성스럽게 구성한 제품',image:'/assets/product-gift.webp'},
 {slug:'giuncha-extract',name:'기운차 진액',type:'액상차',summary:'병에 담아 간편하게 이용할 수 있는 진액 제품',image:'/assets/product-giuncha-extract.png'},
 {slug:'mushroom-tea',name:'버섯마시면기운차',type:'침출차',summary:'발효차를 티백으로 간편하게 우려 마시는 제품',image:'/assets/product-mushroom-tea.jpg'},
 {slug:'mushroom-tea-gift',name:'버섯마시면기운차 선물세트',type:'선물세트',summary:'버섯차를 세 병에 나누어 담은 선물세트',image:'/assets/product-mushroom-tea-gift.jpg'},
 {slug:'mushroom-spoon',name:'버섯한스푼 3종',type:'기타가공품',summary:'밥과 요리에 더해 사용할 수 있는 세 가지 분말 제품',image:'/assets/product-mushroom-spoon.jpg',production:'자체 생산'},
];
export const insights=[
 {category:'GMK®',title:'GMK®는 무엇인가요?',desc:'기운찬의 핵심 바이오소재 GMK®와 완제품의 차이를 간결하게 설명합니다.',date:'2026-09-05',linkLabel:'GMK® 설명 읽기',image:'/assets/culture-brown.webp',href:'/insight/what-is-gmk'},
 {category:'버섯균사체',title:'버섯과 균사체는 어떻게 다를까요?',desc:'균사체와 자실체의 차이, 생활사 속 역할을 쉽고 정확하게 살펴봅니다.',date:'2026-09-05',linkLabel:'버섯균사체 설명 읽기',image:'/assets/tree-mycelia.webp',href:'/insight/mushroom-and-mycelia'},
];
export const news=[
 {date:'2025.06.30',source:'한국경제',title:'건양대·기운찬, GMK 신경세포 관련 공동연구 발표',href:'https://www.guc.co.kr/forum/view/355080',summary:'건양대학교 의과대학과 기운찬의 공동연구가 Cells에 발표됐다는 소식입니다.',meaning:'기운찬의 연구소재에 대한 전임상 연구 기록입니다. 세포 연구 결과를 사람의 질병 예방·치료 효과나 판매제품의 효능으로 해석하지 않습니다.'},
 {date:'2024.08.06',source:'굿모닝충청',title:'기운찬, GMK W20 인체적용시험 추진 소식',href:'https://www.guc.co.kr/forum/view/355078',summary:'GMK W20의 연구 진행과 인체적용시험 추진 계획을 다룬 당시 보도입니다.',meaning:'시험 추진 시점의 기록이며 현재 진행 단계와 구분해야 합니다. 최신 회사 공개자료는 175명 대상 시험 완료를 안내합니다.'},
 {date:'2023.09.19',source:'아시아투데이',title:'기운찬·건양대 연구팀, GMK 전임상 연구 발표',href:'https://www.guc.co.kr/forum/view/355077',summary:'기운찬과 건양대학교 의과대학 연구팀의 공동연구 성과를 소개한 보도입니다.',meaning:'연구소재의 가능성을 검토한 전임상 연구입니다. 사람에게 동일한 효과가 확인됐다는 의미는 아닙니다.'},
 {date:'2022.09.22',source:'충남일보',title:'천안시장애인체육회 선수단에 건강식품 지원',href:'https://www.guc.co.kr/forum/view/355076',summary:'기운찬이 충청남도 장애인체육대회에 출전하는 천안시 선수단을 후원했습니다.',meaning:'지역사회와 체육활동을 지원한 기운찬의 사회공헌 기록입니다.'},
 {date:'2022.08.18',source:'메디컬투데이',title:'GMK 복합배양 원천기술 미국 특허등록 결정',href:'https://www.guc.co.kr/forum/view/355069',summary:'GMK 관련 원천기술의 미국 특허등록 결정 소식을 전한 보도입니다.',meaning:'기술의 지식재산권에 관한 기록으로 제품의 기능성 승인이나 효능 보증을 의미하지 않습니다.'},
 {date:'2021.03.09',source:'에이블뉴스',title:'장애인국가대표 선수단에 건강기능식품 후원',href:'https://www.guc.co.kr/forum/view/355065',summary:'기운찬이 대한장애인체육회에 선수단을 위한 건강기능식품을 후원했습니다.',meaning:'건강한 일상과 스포츠를 응원하는 기업의 사회공헌 활동입니다.'},
];
export type PageInfo={section:string;title:string;lead:string;image:string};
const p=(section:string,title:string,lead:string,image:string):PageInfo=>({section,title,lead,image});
export const pages:Record<string,PageInfo>={
 '/company':p('COMPANY','자연의 가능성을 연구하고\n산업과 일상의 가치로 연결합니다','주식회사 기운찬은 다양한 버섯과 버섯균사체의 가능성을 연구하고, 복합배양·발효기술을 바탕으로 자연 유래 바이오소재를 개발하는 식품바이오 기업입니다.','/assets/research-mushroom-spectrum.jpg'),
 '/technology':p('TECHNOLOGY','복합버섯균사체의 가능성을\n과학적 근거로 확인합니다','기운찬은 다양한 버섯과 버섯균사체를 연구하고, 복합배양·발효기술을 기반으로 개발한 GMK®와 GMK 추출물의 특성과 활용 가능성을 단계적으로 확인해 왔습니다.','/assets/field-research.webp'),
 '/technology/patents':p('TECHNOLOGY · PATENTS','GMK® 기술을 뒷받침하는\n지식재산권','국내 특허 9건과 미국 특허 1건으로 축적한 생산 및 활용기술을 안내합니다.','/assets/microscope.webp'),
 '/technology/publications':p('TECHNOLOGY · PUBLICATIONS','GMK 및 GMK 추출물\n연구논문','세포·동물모델에서 수행한 SCIE급 국제학술지 논문 4편과 원문을 안내합니다.','/assets/research-dish.webp'),
 '/technology/clinical-study':p('TECHNOLOGY · CLINICAL STUDY','GMK 추출물\n인체적용시험','GMK 추출물을 사용해 경도인지장애자 175명을 대상으로 진행한 다기관·무작위배정·이중눈가림·위약대조 인체적용시험의 설계와 공개 가능한 결과를 안내합니다.','/assets/quality-lab.webp'),
 '/business':p('BUSINESS','연구한 소재를 기업의 제품과\n소비자의 일상으로 연결합니다','기운찬은 GMK®를 비롯한 복합버섯균사체 소재를 연구하고, 기업용 원료 공급부터 식품·음료 적용, 공동 제품개발, 생산 연계와 완제품 납품까지 지원합니다.','/assets/ingredient-plates.webp'),
 '/business/ingredient':p('B2B INGREDIENT','기업의 제품 목적에 맞는\nGMK® 원료 협력','기운찬은 GMK®, GMK 추출액과 GMK 추출물을 기업의 제품기획, 식품·음료 적용 및 연구 목적에 맞게 공급하고 협력합니다.','/assets/ingredient-forest.webp'),
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
 '/brands/dodoon/products/gmk':'/brands/dodoon/products/immune-mk','/brands/dodoon/products/liquid':'/brands/dodoon/products/giunchan-drink','/brands/dodoon/products/gift':'/brands/dodoon/products/premium-gift',
};

