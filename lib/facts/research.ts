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
  verificationStatus: 'confirmed',
  disclosureStatus: 'public',
} as const satisfies GovernedFact & {
  title: string;
  summary: string;
  regulatoryStatus: string;
  caution: string;
  shortStatus: string;
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

export const patentPortfolio = {
  sourceAsOf: '2025-12-31',
  totalRecords: 18,
  domesticApplications: 2,
  domesticRegistrations: 9,
  overseasApplications: 6,
  overseasRegistrations: 1,
  registeredTotal: 10,
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
