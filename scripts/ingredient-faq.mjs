// Facts retained from the existing ingredient pages; supply terms remain subject to consultation.
export const ingredientFAQs = [
 ['원료 형태는 어떻게 선택하나요?', 'GMK® 분태·분말은 건식 제품과 차류 등에, GMK® 추출액은 액상차·음료·소스 등에, GMK® 추출물은 분말·고형 제품과 연구 목적에 적용을 검토합니다. 원료의 형태와 적용 가능 여부는 제품 기획 및 제조 조건에 따라 달라질 수 있습니다.'],
 ['GMK® 분말 원료 적용 시 어떤 조건을 확인하나요?', '입도, 수분, 색·맛, 배합 조건, 가열 공정, 포장과 보관 조건을 함께 확인합니다.'],
 ['GMK® 추출액을 음료 등 액상 제품에 적용할 때 무엇을 확인하나요?', '고형분·농도, 색·맛, 침전, 살균 공정, 포장·보관 조건을 함께 확인합니다.'],
 ['최소주문량과 포장단위가 정해져 있나요?', '원료 형태와 공급조건에 따라 협의합니다. 필요한 수량과 사용 목적을 남겨주세요.'],
 ['샘플 제공 여부와 납기는 어떻게 확인하나요?', '샘플 제공 여부 및 납기는 상담을 통해 안내합니다.'],
 ['제품개발도 함께 진행할 수 있나요?', '기획·시제품 검토부터 제조 협력까지 필요한 범위를 상담할 수 있습니다.'],
 ['개발비와 샘플 비용은 어떻게 되나요?', '요청 내용과 제공 범위를 확인한 뒤 비용과 진행조건을 안내합니다.'],
];
export const ingredientFAQBlocks = ingredientFAQs.flatMap(([question,answer]) => [
 {type:'paragraph',text:'Q. '+question}, {type:'paragraph',text:'A. '+answer},
]);
