// Only used on /business/development/. Image classifications come from verified product data.
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const forms = new Set(['분말스틱', '액상차', '침출차', '분말', '젤리', '캡슐', '진액', '기타 고형제품', '제형 확인 중', '코인육수 태블릿', '누룽지', '액상스틱', '버섯쌀', '씹어먹는 태블릿', '젤리스틱', '액상차(숙취제거음료)', '액상차(미네랄음료)']);

export function productizationPortfolio(products) {
  if (!products.length) throw new Error('Verified productization images are required.');
  for (const product of products) {
    if (!forms.has(product.form) || !product.src.startsWith('/assets/')) throw new Error('Invalid productization asset or form.');
  }
  return `<section id="gmk-productization" class="article-section visual-section" aria-labelledby="gmk-productization-heading">
    <div class="section-kicker">GMK PRODUCTIZATION</div>
    <h2 id="gmk-productization-heading">GMK® 제품화</h2>
    <p>기운찬은 GMK®를 다양한 식품 형태에 적용하며 제품화 가능성을 넓혀 왔습니다.</p>
    <p>제품의 목적과 섭취 방식에 따라 분말, 액상차, 침출차, 젤리, 캡슐 등 다양한 형태로 제품화할 수 있습니다.</p>
    <div class="gmk-case-grid" id="gmk-case-grid">${products.map((product, i) => `<figure class="gmk-case"${i >= 12 ? ' hidden data-additional-case' : ''}><div class="gmk-case-frame"><img src="${esc(product.src)}" alt="${product.form === '제형 확인 중' ? '제형 확인 중인 제품화 사례' : esc(product.form) + ' 제형 제품화 사례'}" width="${product.width}" height="${product.height}" loading="lazy" decoding="async"></div><figcaption>${esc(product.form).replace('(', '<wbr>(')}</figcaption></figure>`).join('')}</div>
    ${products.length > 12 ? '<div class="actions"><button class="button outline" id="gmk-case-toggle" type="button" aria-expanded="false" aria-controls="gmk-case-grid">제품화 사례 더보기</button></div>' : ''}
    <p class="gmk-case-note">제품 이미지는 GMK® 제품화 사례를 보여주기 위한 자료이며, 현재 판매 여부를 의미하지 않습니다.</p>
  </section>`;
}

export function productizationConsultation() {
  return `<section id="BD04" class="article-section visual-section dramatic-section" data-content-id="BD04" aria-labelledby="development-consultation-heading">
    <div class="section-kicker">PRODUCT DEVELOPMENT</div>
    <h2 id="development-consultation-heading">제품 아이디어를 실제 제품으로 연결해 보세요</h2>
    <p>목표 제품과 제형, 예상 수량과 일정을 바탕으로 제품화 가능성과 지원 범위를 함께 검토합니다.</p>
    <div class="actions"><a class="button outline-light" href="/contact/?type=development"><span class="button-label">제품화 상담하기</span><span aria-hidden="true">↗</span></a></div>
  </section>`;
}

// Preserve the six FAQ entries from the supplied legacy development page verbatim.
const faqs = [
  [
    "제품 아이디어만 있어도 상담할 수 있나요?",
    "가능합니다. 목표 소비자, 유통채널과 섭취 상황을 확인해 제품 콘셉트와 개발 방향부터 함께 검토합니다."
  ],
  [
    "배합과 시제품 개발도 가능한가요?",
    "원료의 맛·향·색과 목표 제형을 고려해 배합과 시제품을 검토합니다. 구체적인 범위와 횟수는 상담 후 협의합니다."
  ],
  [
    "관능평가와 표시사항 검토를 지원하나요?",
    "맛·향·색·식감과 섭취 편의성을 검토하고, 제품 유형과 사용 원료에 따른 표시정보 검토를 지원합니다. 최종 품목제조보고와 표시사항은 생산 제조사의 관련 기준에 따라 확정됩니다."
  ],
  [
    "제조사를 정하지 않은 상태에서도 상담할 수 있나요?",
    "가능합니다. 제품 유형과 생산설비 요건에 맞는 OEM·ODM 협력 제조사 연결을 검토할 수 있습니다."
  ],
  [
    "기운찬이 직접 생산하나요?",
    "버섯한스푼 시리즈 등 일부 제품은 기운찬이 자체 생산합니다. 그 밖의 제품은 유형과 생산설비 요건에 따라 전문 협력 제조사와 생산합니다."
  ],
  [
    "완제품 납품이 가능한가요?",
    "생산조건과 납기를 협의해 자체 생산 또는 OEM·ODM 협력 생산 후 완제품으로 공급할 수 있습니다."
  ]
];
export function productizationFAQ() {
  return `<section id="development-faq" class="article-section visual-section" aria-labelledby="development-faq-heading"><div class="section-kicker">FAQ</div><h2 id="development-faq-heading">자주 묻는 질문</h2>${faqs.map(([question, answer]) => `<details><summary>${esc(question)}</summary><p>${esc(answer)}</p></details>`).join('')}</section>`;
}
