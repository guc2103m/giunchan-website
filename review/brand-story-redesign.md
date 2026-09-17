# 도두On 개편 결과

- 대상: /business/brands/ (2026-09-15)
- 수정: scripts/build.mjs — 해당 페이지에만 별도 CSS와 브랜드 렌더러 적용.
- 추가: scripts/brand-story.mjs, dist/brand-story.css, scripts/check-brand-story.cjs.
- 생성 결과: dist/business/brands/index.html. 공통 헤더·푸터 및 제품 카드 함수는 유지.
- 이전 BB01~BB08 앵커 및 products 앵커 유지. 자연 이야기 → 연구 → 브랜드 의미 → 제품으로 통합. 제품 비교는 접기·펼치기, 구매 문의와 연구·인사이트 링크는 제품 아래 배치.
- 사용 이미지: forest, petri, mycelium, company-nature, research, gift 및 기존 제품 카드 이미지. 모두 기존 프로젝트의 사용자 제공 이미지이며 새 생성·패키지 편집 없음. 원본 매핑은 scripts/assets.py 참조. company-nature는 사용자 제공 ‘자연에서 시작된 소재의 가능성.jpg’에서 가져온 기존 자산.
- 사진 대기: 차가·영지·상황 각각의 균사체 사진. 각각 1200×900px 권장. 종이 확인되지 않은 배양 사진이나 자실체를 대신 표시하지 않음.
- 목업 이미지가 이번 첨부에 없으므로 요청서의 구조·색상·레이아웃을 기준으로 구현.
- 기존 코그니칸 제품 사진 미확보 상태 유지. 공식 판매처 URL 미확정으로 기존 문의 경로 사용.
- PC 1440, 태블릿 820, 모바일 390 검수: 가로 넘침 없음, H1 1개, 섹션 9개, 제품 8개, 제품 링크·모바일 메뉴·접기 펼치기 정상, JS 콘솔 오류 없음.
- 순수 JavaScript 프로젝트로 별도 TypeScript 검사 없음. Node 구문 검사 및 30페이지 정적 링크 검사 통과.
- 외부 배포·GitHub 커밋 없음.
