# 뉴스룸 개편 검수 — 2026-09-22

## 범위와 데이터

실제 기존 데이터는 15건이 아닌 16개 상세 항목이며 16개 모두 유지했습니다. 2026년 항목은 중앙일보/뉴스파고 두 보도를 묶으므로 언론사 원문 URL은 총 17개입니다. 논문 링크 2개도 유지했습니다.

기사 제목은 기존 데이터의 originalTitle을 그대로 표시하며, 2026년 통합 항목은 사용자 지정 제목을 사용합니다. 언론사 제목을 회사의 새 효능 주장으로 재작성하지 않았습니다. 소개는 기존 자체 요약의 핵심 1문장만 사용합니다. 기사 본문/이미지/캡처/로고는 뉴스룸에 삽입하지 않습니다.

- /newsroom/: 연도 구분, 날짜 내림차순. 동률은 원래 배열 순서 유지.
- 상단 PC/모바일 주메뉴 및 푸터에 독립 뉴스룸 추가.
- 인사이트의 언론보도 탭/목록 제거, 연구자료 4건 및 9개 단위 페이지 기능 보존.
- 기존 /insights/#press 및 ?category=press 진입은 JS로 /newsroom/ 이동.
- 기존 /insights/press/[slug]/를 유지하며 간결한 새 상세 적용(200). 주소 삭제 없음.
- 이미 존재하던 /newsroom/[slug]/ 별칭도 같은 상세 화면 제공. canonical은 기존 /insights/press/[slug]/를 가리킴.
- 회사가 언론기사 작성자로 표시되던 NewsArticle 구조화 데이터 제거.
- 보도자료/기존 기운찬 게시물 문자열은 생성 HTML 전체에서 제거.

## 날짜 정정

- 2026년 통합 보도: 기존 사이트 게시일 2026-09-06 대신 실제 첫 보도일 2026-08-26 사용. 중앙일보 8/26, 뉴스파고 8/27 각각 독립 원문 버튼에 명시. 두 날짜 원문 확인.
- 뉴시스: 기존 등록일 2016-09-19 → 원문 표시일 2016-10-19. 사용자 승인 후 정정.
- 다른 날짜/언론사/원문 URL은 유지.

## 원문 링크 검증

기존 URL 총 17개 중 16개는 HTTP 200 및 기운찬 기사 존재 확인. 메디컬투데이는 언론사 내부 새 주소로 이동하나 기존 URL은 보존. 매일경제는 자동 HTTP 요청이 403이었으나 브라우저에서 기존 URL이 https://www.mk.co.kr/news/special-edition/9284827 로 이동하고 해당 기사 제목·2020.04.07 날짜를 표시함을 확인. URL 교체 없음.

## 검증 결과

- node scripts/build.mjs: 66개 경로 생성
- node scripts/check.mjs: issues=[]
- node --test scripts/newsroom.test.mjs: 3개 테스트 통과
- 항목 수/원문 보존/연대순/같은 날짜 등록순 테스트
- 16개 기존 상세와 16개 별칭의 동일 내용 및 외부 링크 target=_blank 검증
- 연구자료 4건과 기타 페이지 main 본문을 이전 커밋 6038966과 비교: 동일
- 모든 생성 페이지에서 보도자료, 기존 기운찬 게시물 제거 확인
- PC 1440px, 모바일 390px: 뉴스룸 목록/상세 가로 넘침 없음
- PC/모바일 독립 메뉴 표시, 최신 보도의 두 원문 버튼 및 이미지 0개 확인
- JavaScript 프로젝트로 별도 TypeScript 검사 없음
- 운영 배포하지 않음. Vercel Preview만 제공.

## 변경 파일

- scripts/build.mjs: 메뉴/푸터/경로/메타/사이트맵 생성
- scripts/press.mjs: 연구자료 목록/뉴스룸 목록/간결한 상세 렌더러
- content/press-releases.json: 자체 소개문과 승인된 날짜/2026년 정보
- dist/newsroom.css: 뉴스룸 전용 스타일
- dist/press.css, dist/press.js: 연구자료 페이지 기능 유지, 언론보도 탭 로직 제거
- scripts/newsroom.test.mjs: 마이그레이션 및 보존 검증
- dist/newsroom/index.html: 새 목록
- dist/insights/press/*/index.html, dist/newsroom/*/index.html: 상세 재생성
- dist/insights/index.html, dist/sitemap.xml, review/routes.json, review/static-check.json
- 기타 생성 HTML은 공통 헤더/푸터 메뉴만 갱신. 본문 변경 없음.

## 후속 수정
사용자 요청에 따라 2026 → 2016 최신순으로 변경. 같은 날짜 등록 순서는 유지. 목록 16개 항목 앞에 기존 /assets/logo.png를 활용한 회사 공통 썸네일 추가. 상세에는 기사 이미지 미사용 유지.

## 2026-09-22: Larger thumbnails and load more
- Desktop thumbnail: 320 x 200px (4x previous area); mobile: 200 x 125px.
- Compact year heading above thumbnails; latest-first order retained.
- Initially 5 records; Load more reveals 5 at a time (5/10/15/16).
- Desktop/mobile verified; no mobile horizontal overflow. Build/check and 3 newsroom tests passed.
- Preview: https://giunchan-website-8pj2zizq2-guc2103m-7777.vercel.app/newsroom/
- Production unchanged.

