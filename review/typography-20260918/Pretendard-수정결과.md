# Pretendard 타이포그래피 수정 결과 — 2026-09-18

## 적용 위치와 보존
- 최신 작업본: `G:\ChatGPT\홈페이지개편\site`
- 수정 전 파일: `G:\ChatGPT\홈페이지개편\backup-typography-20260918`
- 문구·숫자·메타데이터·이미지·링크·콘텐츠 순서 유지. 생성 HTML은 공식 명칭의 줄바꿈 방지 span을 제거하면 수정 전과 정확히 일치.
- 기존 CSS의 레이아웃·여백·그리드·이미지·색상 선언 유지. 새 명칭 span이 화살표·통계용 span 선택자에 걸리지 않도록 기존 선택자에 `:not(.no-break)`만 추가.
- 글꼴에 따른 자연스러운 문장 줄바꿈/콘텐츠 높이는 달라질 수 있음.

## 수정 파일
- `dist/style.css`: 공통 로컬 폰트, 제목/본문/메뉴/버튼 기준, 명칭 줄바꿈 방지
- `dist/visual.css`: 중복 기본 서체·행간·강제 스무딩·제목 자간 제거, 작은 설명 가독성
- `dist/dodoon-editorial.css`: Noto Sans KR 별도 로딩 제거 및 공통 제목 기준 상속
- `dist/image-refresh.css`: 히어로 제목 공통 기준, 모바일 설명16px
- `dist/patent-gallery.css`: 모달 제목 공통 기준, 작은 설명14px
- `scripts/typography.mjs`: 실제 본문/헤더/푸터의 공식 명칭만 줄바꿈 방지
- `scripts/build.mjs`: 위 처리 연결. 메타데이터와 HTML 속성은 처리 대상에서 제외
- `scripts/serve.mjs`: WOFF2 응답 형식 `font/woff2`
- 생성된 페이지 HTML(31개 경로와 기존 리다이렉트/404)
- `dist/assets/fonts/PretendardVariable.woff2`, `Pretendard-LICENSE.txt`, `Pretendard-SOURCE.md`

## 공식 폰트
- Pretendard v1.3.9, 원본 WOFF2 2,057,688 bytes
- 공식 출처: https://github.com/orioncactus/pretendard/tree/v1.3.9
- SIL Open Font License1.1, 원본 라이선스 동봉
- 기본 스택: `"Pretendard Variable", Pretendard, "Noto Sans KR", sans-serif`
- `font-weight:100 900`, `font-display:swap`, `font-synthesis:none`
- 추가 preload 없음. 한 페이지에서 동일한 WOFF2 한 번만 요청. 기존 Noto TTF 자산은 보존하되 실제 사용 페이지에서는 요청하지 않음.

## 기준 전후
|대상|이전|이후|
|---|---|---|
|일반 서체|Malgun Gothic / Apple SD Gothic Neo|Pretendard Variable 로컬 폰트|
|도두On|Noto Sans KR 별도 TTF|공통 Pretendard Variable|
|본문|400, 최종 행간1.85, 자간 normal|400, 행간1.75, 자간-.005em|
|H1|700, 자간-.055em(일부-.065em/- .035em)|700, 1.28, -.025em|
|H2|700, 자간-.055em(브랜드-.035em)|700, 1.35, -.02em|
|H3|기본700, 자간-.055em|600, 1.45, -.015em|
|메뉴·CTA|주로700|600, -.01em (기존 하위 메뉴500 유지)|
|영문 공통 라벨|700, .16em|600, .12em|

## 크기 변경
- 제목 font-size 및 clamp는 모두 유지.
- 모바일 서브 히어로 설명:15→16px, 본문 최소 크기 확보.
- 기존12~13px 사진 캡션·푸터/상태/도식의 작은 설명·특허 모달 설명:14px. 문서의 작은 설명 최소14px 기준 적용.
- 영문 장식 라벨과 단계 숫자/상표 기호의 작은 크기는 유지.
- 상세한 변경 위치·전후 값은 `declaration-changes.json` 참조.

## 렌더링 정리
- `-webkit-font-smoothing:antialiased` 제거, 운영체제 기본 렌더링 사용.
- 과도한 음수 자간 제거. 텍스트 scale/zoom/색상 그림자 추가 없음.
- 기존 transform은 이미지 확대, 화살표 회전, 캡션 위치 정렬에 사용됨. 텍스트 크기 확대용 transform 없음. 기존 애니메이션은 변경하지 않음.

## 검증 결과
- 빌드31개 경로, 정적 링크/앵커 검사 문제0개.
- 순수 JavaScript 프로젝트로 별도 TypeScript 설정/타입 검사 스크립트 없음. 수정 JS는 `node --check` 구문 검사.
- 내장 Chromium에서18개 주요 페이지 ×7개 너비(1920/1440/1280/1024/768/390/360) =126회 실제 iframe 렌더링 검사.
- 회사소개/연혁/지속가능/연구현황/GMK/연구근거/특허/사업개요/원료/제품화/도두On/IR/인사이트 목록 및2개 상세/문의/개인정보/메인 검사.
- 가로 넘침0, 검사 대상 제목·문단·표·CTA 내부 넘침0, CTA 줄갈라짐0, 계산된 서체 불일치0.
- 18페이지 모두 FontFaceSet 상태loaded, 400/500/600/700 각각 로드된 실제 폰트1개.
- 폰트 요청 HTTP200, `font/woff2`. 로컬 최초 검사 요청11~154ms, 한 페이지당1건. 외부 CDN 요청 없음. 폰트 디코딩/콘솔 오류 관찰 없음.
- 모바일 메뉴/하위메뉴 펼침, 특허증 모달 열기/닫기 확인. 이미지·기능 코드 유지.
- 회사소개·도두On 데스크톱1440/모바일390 실화면 캡처. PNG 내용 너비는 스크롤바 제외1425/375px.

## 검증 제한 — 완료로 표시하지 않은 항목
- Chrome/Edge를 각각 연결하려 했으나 이 환경에는 내장 브라우저만 제공되어 별도 Chrome·Edge·Safari 검증 불가.
- 내장 브라우저 확대 단축키가 실제 확대율을 바꾸지 않아125% 확대 검증 미완료.100% 검증만 인정.
- 네트워크 차단 시 fallback 실험과 느린 실제 인터넷 환경의 CLS/초기 로딩 측정은 미완료. fallback 선언과 font-display:swap은 적용됨.
- 따라서 문서의 모든 브라우저별 완료 조건을 충족했다고 주장하지 않음.

## 캡처
- company-1440.png / company-390.png
- dodoon-1440.png / dodoon-390.png
- browser-results.json: 페이지별 실제 폰트 요청과126개 검사 기록
