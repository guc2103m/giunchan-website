const image=(name,alt)=>`<img src="/assets/study-${name}.png" width="72" height="72" alt="${alt}" loading="lazy" decoding="async">`;
export function humanStudy(actions){
 const cards=[
  [image('participants','시험 참여 대상자를 나타내는 사람 아이콘'),'시험 대상','성인 175명(시험군 88명, 대조군 87명). K-MMSE 20~23점, 만 55세 이상 85세 미만'],
  ['', '시험 기관','김천의료원, 고려대학교 구로병원'],
  [image('randomization','시험군과 대조군으로 무작위배정하는 아이콘'),'시험 방식','다기관, 무작위배정, 이중눈가림, 위약대조, 평행설계'],
  [image('intake','시험 소재 섭취를 나타내는 캡슐 아이콘'),'시험 소재와 섭취','GMK® 추출물, 1일 1,200 mg, 16주']
 ];
 const visits=[['Screening','V1','대상자 선정, 동의서 작성, 인구학적 조사, 선정·제외 기준 확인'],['Week 0','V2, Baseline','무작위배정 및 섭취 시작, K-MMSE 사전 검사, 활력징후·혈액검사'],['Week 8','V3','복약 순응도, 이상반응 및 병용약물 확인'],['Week 16','V4, End','K-MMSE 사후 검사, 이차 유효성 및 안전성 최종 평가']];
 return `<section id="RE04" class="article-section study-summary" data-content-id="RE04" aria-labelledby="study-title">
 <div class="section-kicker">RESEARCH EVIDENCE</div>
 <h2 id="study-title">GMK® 추출물 인체적용시험 연구 결과 요약</h2>
 <p class="study-subtitle">개별인정형 원료 인정 절차를 위한 연구자료</p>
 <div class="study-purpose"><h3>연구 목적</h3><p>경미한 인지기능 저하를 호소하는 대상자에서 16주간 GMK® 추출물 섭취가 K-MMSE 기반 인지기능 지표에 미치는 영향과 섭취 기간의 안전성을 평가했습니다.</p></div>
 <div class="study-design">${cards.map(([im,title,desc])=>`<article class="study-card">${im}<div><h3>${title}</h3><p>${desc}</p></div></article>`).join('')}</div>
 <div class="study-schedule"><div class="study-heading">${image('schedule','네 차례 방문 일정을 나타내는 달력 아이콘')}<h3>시험 일정</h3></div>
 <ol class="study-visits">${visits.map(([week,visit,desc])=>`<li><span class="study-node" aria-hidden="true"></span><h4>${week}<span>${visit}</span></h4><p>${desc}</p></li>`).join('')}</ol></div>
 <div class="study-measure study-heading">${image('cognition','인지기능 측정을 나타내는 뇌 아이콘')}<div><h3>측정 지표</h3><p><strong>K-MMSE(Korean version of the Mini-Mental State Examination) 총점</strong></p><p>시험군과 대조군의 16주 시점 점수를 Modified ITT 분석으로 비교했습니다.</p></div></div>
 <div class="study-results"><article><h3>K-MMSE</h3><p>16주 시점 K-MMSE 총점은 시험군이 대조군보다 통계적으로 높게 나타났습니다(<strong class="study-significance">p &lt; 0.05</strong>).</p></article><article><div class="study-heading">${image('safety','중대한 이상반응 관찰을 나타내는 방패 아이콘')}<h3>안전성</h3></div><p>16주 섭취 기간 중 중대한 이상반응은 보고되지 않았습니다(SAE = 0).</p></article></div>
 <p class="study-note">본 내용은 해당 인체적용시험의 결과 요약입니다. GMK® 추출물은 건강기능식품 개별인정형 원료 인정 절차가 진행 중이며, 이 연구 결과가 원료의 기능성 인정이나 제품 효능을 의미하지는 않습니다.</p>
 <div class="actions">${actions}</div></section>`;
}
