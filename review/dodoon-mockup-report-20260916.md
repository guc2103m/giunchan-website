# 도두On 목업 기준 재구현 — 2026-09-16

## 작업 위치
G:\ChatGPT\홈페이지개편\site
서버: http://127.0.0.1:4173/business/brands/
서버 프로세스의 실행 파일 및 스크립트가 모두 G: 경로임을 확인했다.

## 구현
요청된 7개 영역만 실제 HTML/CSS로 구현했다. 공통 헤더·푸터·메뉴는 보존했다. 도두On 본문에서 GIF/영상, 독립 기술 소개 및 연구에서 일상으로 섹션을 제거했다. 기존 미디어 파일은 다른 페이지와 원본 보존을 위해 삭제하지 않았으며 도두On HTML에서 참조하지 않는다.
PC: 1280px 본문, GMK 정지 이미지 4열, 이름 의미 3열, 제품 CTA 58:42 배치.
모바일: 390px 검수, 분할 영역 1열, GMK 2열, 이름 의미 세로 배치.

## 변경 파일 (site 기준)
- scripts/dodoon-editorial.mjs — 7개 영역의 마크업/문구
- dist/dodoon-editorial.css — 도두On 전용 스타일
- dist/business/brands/index.html — 빌드 결과
- review/static-check.json 및 빌드가 갱신한 원고 대응/URL 검수 기록
- dist/assets/dodoon-*-20260916.png — 새 설명용 이미지 6개
- review/dodoon-image-prompts-20260916.json — 생성 프롬프트 원문
- review/dodoon-mockup-browser-check.json — 브라우저 검사
- review/dodoon-mockup-desktop-1440.png, dodoon-mockup-mobile-390.png, dodoon-mockup-comparison.png

## 사용 이미지 전체
| 영역 | 파일 (dist/assets/) | 출처/차이 |
|---|---|---|
| 히어로 | dodoon-hero-20260916.png | 내장 imagegen으로 생성한 설명용 숲/균사 이미지 |
| 균사 시작 | dodoon-macro-20260916.png | 내장 imagegen 생성 균사 매크로 |
| 연결·확장 | mycelium.webp | 기존 고목/균사/버섯 이미지 재사용. 목업의 사진과는 다름 |
| 보이지 않는 가치 | dodoon-mushroom-20260916.png | 내장 imagegen 생성 숲속 버섯 |
| GMK 1 | dodoon-chaga-20260916.png | 내장 imagegen 생성 차가버섯 설명용 이미지 |
| GMK 2 | dodoon-reishi-20260916.png | 내장 imagegen 생성 영지버섯 자실체 설명용 이미지 |
| GMK 3 | dodoon-sanghwang-20260916.png | 내장 imagegen 생성 상황버섯 자실체 설명용 이미지 |
| GMK 4 | petri.webp | 기존 배양 접시 정지 이미지. 실제 GMK 연구기록으로 주장하지 않음 |
| 제품 CTA | gift.webp | 기존 선물세트 원본. 패키지/문구/색상/형태 보존, contain 표시 |

## 원본 부족 및 목업과의 차이
사용자가 새 설명용 이미지 생성을 승인해 숲/매크로/단독 버섯 이미지를 생성했다. 실제 촬영 및 회사 연구 증거 사진이 아니다. 자실체 이미지는 균사체라고 표기하지 않았다.
목업 속 사진 원본과 동일한 사진은 아니며, 연결·확장 및 GMK 연구 정지 사진은 적합한 기존 이미지로 구성했다.
CTA는 목업의 무지 용기 대신 지시대로 실제 선물세트 원본 사진을 사용했다. 원본 배경과 패키지를 변형하지 않아 목업의 창가·나무 받침 장면과 차이가 있다.
목업과 페이지를 동일 폭으로 나란히 비교했다. 1440px에서 히어로 710px, 연결 550px, 이름 의미 390px, CTA 570px로 요청 수치 범위에 맞췄다. 사이트 공통 헤더/푸터는 목업과 다르며 의도된 보존 사항이다.

## 검증
- 31개 페이지 빌드 성공, 정적 링크 검사 문제 0.
- 순수 JavaScript 프로젝트로 TypeScript 검사 설정 없음. 변경 mjs의 node --check 통과.
- 1440px/390px 가로 넘침 없음, 본문 7개 섹션, H1 1개, video 0.
- GMK 4열/모바일 2열 및 이름 의미 PC 3열/모바일 1열 확인.
- 제품 CTA가 /products/로 이동하며 기존 제품 8개 확인.
- 모바일 메뉴 열기/닫기 정상, 브라우저 console error 0.
- 변경 전 dist 파일 해시와 비교: 기존 파일 중 브랜드 HTML 및 전용 CSS만 변경. 다른 페이지와 공통 CSS 동일.
- 이번 작업은 로컬 구현이며 공개 배포 없음.

## 백업
review/before-mockup-20260916/ 에 변경 전 렌더러, 전용 CSS, HTML을 보관했다.
