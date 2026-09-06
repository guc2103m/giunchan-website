export type VerificationStatus = 'confirmed' | 'needsVerification';
export type DisclosureStatus = 'public' | 'limited' | 'embargoed' | 'confidential' | 'internalOnly';

export type GovernedFact = {
  verificationStatus: VerificationStatus;
  disclosureStatus: DisclosureStatus;
};

export const isPublicFact = <T extends GovernedFact>(fact: T) =>
  fact.verificationStatus === 'confirmed' && fact.disclosureStatus === 'public';

export const gmkDefinition =
  'GMK®는 주식회사 기운찬의 독자적인 복합배양 기술로 생산하는 복합버섯균사체 원료입니다.';

export const gmkResearchStatement =
  '기운찬은 GMK®의 생산기술과 활용 가능성에 관한 연구를 지속하고 있습니다.';

export const ingredientForms = [
  {
    name: 'GMK®',
    definition: '복합버섯균사체 배양물을 건조해 분태 또는 분말로 가공한 기본 원료',
    form: '분태·분말',
    use: '건식 제품과 차류 등 제품 목적에 따른 적용 검토',
    verificationStatus: 'confirmed',
    disclosureStatus: 'public',
  },
  {
    name: 'GMK® 추출액',
    definition: 'GMK®를 열수 추출한 액상 파생 원료',
    form: '액상',
    use: '액상차·음료·소스 등 제품 목적에 따른 적용 검토',
    verificationStatus: 'confirmed',
    disclosureStatus: 'public',
  },
  {
    name: 'GMK® 추출물',
    definition: 'GMK® 추출액을 농축·동결건조한 분말 파생 원료',
    form: '분말',
    use: '분말·고형 제품과 연구 목적에 따른 적용 검토',
    verificationStatus: 'confirmed',
    disclosureStatus: 'public',
  },
] as const satisfies readonly (GovernedFact & {
  name: string;
  definition: string;
  form: string;
  use: string;
})[];

export const publicIngredientForms = ingredientForms.filter(isPublicFact);

export const clinicalStudyPublic = {
  title: 'GMK® 관련 원료 인체적용시험',
  summary:
    '기운찬은 GMK® 관련 원료에 대한 인체적용시험을 완료했으며, 그 결과를 바탕으로 식품의약품안전처 개별인정형 원료 인정 절차를 진행하고 있습니다.',
  regulatoryStatus:
    '주식회사 기운찬은 GMK® 관련 원료의 인지기능 분야 건강기능식품 개별인정형 원료 인정을 신청해 관련 절차를 진행하고 있습니다.',
  caution:
    '현재 식품의약품안전처의 심사 절차가 진행 중이며, 개별인정형 원료로 인정이 완료된 상태는 아닙니다.',
  shortStatus: '식약처 개별인정형 원료 인정 절차 진행 중',
  material: 'GMK® 추출물',
  sites: ['고려대학교 구로병원', '김천의료원'],
  population: '주관적 인지저하를 호소하는 만 55세 이상 성인',
  duration: '16주',
  design: '무작위배정·이중눈가림·위약대조 인체적용시험',
  primaryOutcome: '한국어판 간이정신상태검사(K-MMSE) 총점',
  publicResult: '2026년 8월 언론보도에 따르면, 16주 시점의 한국어판 간이정신상태검사(K-MMSE) 총점에서 GMK® 추출물 섭취군과 위약군 사이에 통계적으로 유의한 차이가 나타났습니다(p<0.05). 시험 기간 중 중대한 이상반응은 보고되지 않았습니다.',
  reviewNotice: '현재 식품의약품안전처에 건강기능식품 개별인정형 원료 인정을 신청해 심사 절차를 진행하고 있습니다. 아직 기능성 인정이 완료된 상태는 아니며, 해당 연구결과가 개별 판매제품의 효능을 의미하지는 않습니다.',
  sources: [{label:'중앙일보 · 2026.08.26',url:'https://www.joongang.co.kr/article/25456430'},{label:'뉴스파고 · 2026.08.27',url:'https://www.newspago.com/newnews/print.php?uid=121969'}],
  verificationStatus: 'confirmed',
  disclosureStatus: 'public',
} as const satisfies GovernedFact & {
  title: string;
  summary: string;
  regulatoryStatus: string;
  caution: string;
  shortStatus: string;
  material: string; sites: readonly string[]; population: string; duration: string; design: string; primaryOutcome: string; publicResult: string; reviewNotice: string; sources: readonly {label:string;url:string}[];
};

export const researchDisclaimer =
  '연구성과는 각 연구에 사용된 시료와 연구조건에 관한 결과입니다. 사람의 질병 예방·치료 효과나 개별 판매제품의 효능을 의미하지 않습니다.';

export const publications = [
  {
    year: '2021',
    title:
      'Water Extract of Mixed Mushroom Mycelia Grown on a Solid Barley Medium Is Protective against Experimental Focal Cerebral Ischemia',
    journal: 'Current Issues in Molecular Biology',
    stage: '세포·동물 전임상 연구',
    doi: '10.3390/cimb43010030',
    summary: '세포와 동물모델에서 복합버섯균사체 관련 연구시료의 범위를 살펴본 전임상 연구입니다.',
    verificationStatus: 'confirmed',
    disclosureStatus: 'public',
  },
  {
    year: '2023',
    title: 'Mixed Medicinal Mushroom Mycelia Attenuates Alzheimer’s Disease Pathologies In Vitro and In Vivo',
    journal: 'Current Issues in Molecular Biology',
    stage: '세포·동물 전임상 연구',
    doi: '10.3390/cimb45080428',
    summary: '세포와 동물모델에서 복합버섯균사체 관련 연구시료의 범위를 살펴본 전임상 연구입니다.',
    verificationStatus: 'confirmed',
    disclosureStatus: 'public',
  },
  {
    year: '2025',
    title:
      'Neuroprotective Effect of Mixed Mushroom Mycelia Extract on Neurotoxicity and Neuroinflammation via Regulation of ROS-Induced Oxidative Stress in PC12 and BV2 Cells',
    journal: 'Cells',
    stage: '세포 전임상 연구',
    doi: '10.3390/cells14130977',
    summary: '세포모델에서 복합버섯균사체 추출물 관련 연구시료의 범위를 살펴본 전임상 연구입니다.',
    verificationStatus: 'confirmed',
    disclosureStatus: 'public',
  },
  {
    year: '2026',
    title:
      'A Water Extract of Mixed Mushroom Mycelia Mitigates Cognitive Deficit and Oxidative Stress After Global Cerebral Ischemia–Reperfusion Injury',
    journal: 'Current Issues in Molecular Biology',
    stage: '세포·동물 전임상 연구',
    doi: '10.3390/cimb48020151',
    summary: '세포와 동물모델에서 복합버섯균사체 관련 연구시료의 범위를 살펴본 전임상 연구입니다.',
    verificationStatus: 'confirmed',
    disclosureStatus: 'public',
  },
] as const satisfies readonly (GovernedFact & {
  year: string;
  title: string;
  journal: string;
  stage: string;
  doi: string;
  summary: string;
})[];

export const publicPublications = publications.filter(isPublicFact);

export type PatentRecord=GovernedFact&{country:string;number:string;registeredAt:string;owner:string;status:string;title:string;url:string};
export const patentRecords:PatentRecord[]=[
 {country:'대한민국',number:'10-1652035',registeredAt:'2016-08-23',owner:'주식회사 기운찬',status:'등록 완료',title:'차가버섯, 상황버섯 및 꽃송이버섯의 복합버섯 균사체의 생산방법',url:'https://patents.google.com/patent/KR101652035B1/ko',verificationStatus:'confirmed',disclosureStatus:'public'},
 {country:'대한민국',number:'10-1923408',registeredAt:'2018-11-23',owner:'주식회사 기운찬',status:'등록 완료',title:'차가버섯, 영지버섯 및 상황버섯 균사체의 복합배양방법',url:'https://patents.google.com/patent/KR101923408B1/ko',verificationStatus:'confirmed',disclosureStatus:'public'},
 {country:'대한민국',number:'10-2251825',registeredAt:'2021-05-07',owner:'주식회사 기운찬',status:'등록 완료',title:'간기능 개선활성을 갖는 버섯 복합균사체 조성물 및 이의 제조방법',url:'https://patents.google.com/patent/KR102251825B1/ko',verificationStatus:'confirmed',disclosureStatus:'public'},
 {country:'대한민국',number:'10-2271933',registeredAt:'2021-06-28',owner:'주식회사 기운찬',status:'등록 완료',title:'버섯복합배양균사체를 함유하는 혈당조절용 조성물의 제조방법',url:'https://patents.google.com/patent/KR102271933B1/ko',verificationStatus:'confirmed',disclosureStatus:'public'},
 {country:'대한민국',number:'10-2496029',registeredAt:'2023-02-01',owner:'주식회사 기운찬',status:'등록 완료',title:'신규 영지버섯 GUC211 및 이를 함유하는 항당뇨용 조성물',url:'https://patents.google.com/patent/KR102496029B1/ko',verificationStatus:'confirmed',disclosureStatus:'public'},
 {country:'대한민국',number:'10-2496034',registeredAt:'2023-02-01',owner:'주식회사 기운찬',status:'등록 완료',title:'신규 차가버섯 GUC111 및 이를 함유하는 항당뇨용 조성물',url:'https://patents.google.com/patent/KR102496034B1/ko',verificationStatus:'confirmed',disclosureStatus:'public'},
 {country:'대한민국',number:'10-2557645',registeredAt:'2023-07-17',owner:'주식회사 기운찬',status:'등록 완료',title:'복합버섯균사체를 함유하는 인지기능 또는 기억력 개선용 조성물',url:'https://patents.google.com/patent/KR102557645B1/ko',verificationStatus:'confirmed',disclosureStatus:'public'},
 {country:'대한민국',number:'10-2575704',registeredAt:'2023-09-01',owner:'주식회사 기운찬',status:'등록 완료',title:'복합버섯균사체를 함유하는 알츠하이머 개선용 조성물',url:'https://patents.google.com/patent/KR102575704B1/ko',verificationStatus:'confirmed',disclosureStatus:'public'},
 {country:'대한민국',number:'10-2844900',registeredAt:'2025-08-06',owner:'주식회사 기운찬',status:'등록 완료',title:'복합버섯균사체 효소처리물을 함유하는 인지기능 개선용 음료 및 이의 제조방법',url:'https://patents.google.com/patent/KR102844900B1/ko',verificationStatus:'confirmed',disclosureStatus:'public'},
 {country:'미국',number:'US 11,503,847 B2',registeredAt:'2022-11-22',owner:'GIUNCHAN CO., LTD.',status:'등록 완료',title:'Method for Co-Culturing Inonotus obliquus, Ganoderma lucidum, and Phellinus linteus Mycelia',url:'https://patents.google.com/patent/US11503847B2/en',verificationStatus:'confirmed',disclosureStatus:'public'},
];
export const publicPatentRecords=patentRecords.filter(isPublicFact);
export const ipRegistrationSummary = [
  { category: '특허', country: '대한민국', count: 9, status: '등록' },
  { category: '특허', country: '미국', count: 1, status: '등록' },
  { category: '상표', country: '대한민국', count: 6, status: '등록' },
  { category: '상표', country: '중국', count: 1, status: '등록' },
  { category: '디자인', country: '대한민국', count: 1, status: '등록' },
] as const;
export const patentPortfolio = {
  sourceAsOf: '2026-07-31',
  totalRecords: publicPatentRecords.length,
  domesticApplications: 0,
  domesticRegistrations: 9,
  overseasApplications: 0,
  overseasRegistrations: 1,
  registeredTotal: publicPatentRecords.length,
  summary: 'GMK® 복합배양 및 활용과 관련된 특허기술',
  verificationStatus: 'confirmed',
  disclosureStatus: 'public',
} as const satisfies GovernedFact & {
  sourceAsOf: string;
  totalRecords: number;
  domesticApplications: number;
  domesticRegistrations: number;
  overseasApplications: number;
  overseasRegistrations: number;
  registeredTotal: number;
  summary: string;
};
