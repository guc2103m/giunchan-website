# 도두On 본문 전면 재작성

기존 브랜드 CSS는 적용 중이었으나 1200px 공통 container와 반복되는 2열 구조가 시각적 변화 폭을 제한했다. 제목 크기에 대한 스타일 덮어쓰기는 없었다. 이번에는 brand-story-v2 렌더러와 스타일의 연결을 제거하고 dodoon-editorial.mjs / dodoon-editorial.css를 새로 작성했다. 다른 페이지의 공통 CSS와 HTML은 변경하지 않았다.

## 수치 비교 — 1440×1000

| 항목 | 이전 | 현재 |
|---|---:|---:|
| 히어로 제목 | 66px | 72px |
| 히어로 높이 | 880px | 916px |
| 일반 콘텐츠 폭 | 1200px | 1280px |
| 시작 장면 이미지 폭 | 약 622px | 약 835px, 좌측 끝 확장 |
| 주요 제목 | 46~52px | 약 47~58px |
| 일반 본문 | 19px | 20px |
| 주요 장면 여백 | 100~150px | 150~190px |

모바일은 제목 40px, 주요 제목 32~36px, 본문 17px, 기본 좌우 22px. 390px 화면 가로 넘침 없음.

## 재사용하지 않은 부분

본문에는 기존 container, split, 카드, 아이콘 함수가 없다. 새 구성은 가장자리 확장+겹침 패널, 풀폭 하단 정렬, 비대칭 세로 이미지, 중앙 대형 영상, 타이포그래피 전환, 세로 의미 연결, 화면 폭 제품 피날레다. 공통 헤더·푸터와 별도 제품 목록·제품 상세페이지는 보존했다.

## 이미지

- 히어로: dodoon-hyphae.webp — 이전 작업의 균사 개념 이미지, 재사용.
- 균사 시작: petri.webp — 기존 사용자 제공 배양 이미지.
- 연결과 확장: mycelium.webp — 기존 사용자 제공 나무·균사 이미지. 히어로와 다름.
- 기운찬의 시선: gmk-material.webp — 사용자 제공 소재 이미지.
- GMK: co-cultivation.mp4 / co-cultivation-poster.webp — 사용자 제공 복합배양 GIF에서 변환. 원본 GIF 보존. 무한 움직임 대신 재생 컨트롤 제공.
- 브랜드 의미: dodoon.webp — 기존 공식 로고 원본.
- 제품 피날레: gift.webp — 기존 패키지 원본 그대로 사용.
- 새로운 이미지 생성 없음. 노란색 생성 이미지, 화분 이미지, 연구원 이미지 제거.
- 연결 합성 원본이 없어 연구→일상은 요청서의 대안인 타이포그래피 장면 사용. 빈 이미지 영역 없음.

## 파일과 검수

수정: scripts/build.mjs (브랜드 렌더러/CSS 연결만 변경), 생성된 dist/business/brands/index.html.
추가: scripts/dodoon-editorial.mjs, dist/dodoon-editorial.css, scripts/measure-brand-before.cjs, scripts/check-dodoon-editorial.cjs 및 보고서·캡처.

실제 /business/brands/에서 1440·820·390px 확인. 8개 장면, H1 1개, 제품 카드 및 아이콘 없음. 제품 CTA와 8개 제품 목록 보존, 영상 재생 정상, 콘솔 오류 없음. 다른 기존 페이지 HTML 해시 변경 없음. 31페이지 빌드·정적 링크 검사 및 Node 구문 검사 통과. 순수 JS 프로젝트이므로 별도 TypeScript 검사 설정 없음.

최초 목업 이미지는 현재 첨부에 없어 직접 대조할 수 없다. 요청서의 레이아웃과 수치 기준으로 구현했고 수정 전후 전체 캡처를 제공한다. 커밋·외부 배포 없음.
