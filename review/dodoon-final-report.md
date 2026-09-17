# 도두On 최종 문구·서체·GMK 수정 검수

작업 위치: G:\ChatGPT\홈페이지개편\site
페이지: http://127.0.0.1:4173/business/brands/

## 반영 내용
- 기존 7개 섹션 순서, 공통 헤더·푸터, 기존 이미지 배치 유지.
- 히어로, 균사, 연결/확장, 가치, GMK, 브랜드 의미, 최종 CTA에 요청문 원문을 적용.
- GMK의 기존 4열 사진 카드·버섯별 이름/설명·종류 및 개수 표현 제거.
- GMK 공식 가로 이미지 한 장으로 교체. 첨부 원본 그대로 복사했으며 색·내용·비율 변경 없음.
- 도두On 및 GMK®에 줄바꿈 방지 적용.
- 마지막 실제 제품 사진 보존, 제품/문구 영역 55:45, 배경색 연결, 도두On 브랜드명 추가.

## 서체
본문 전체: Noto Sans KR 한 가지 폰트 패밀리.
- H1, 섹션 제목, 마지막 슬로건: 700
- 영문 라벨, 캡션, 이름 의미 큰 글자, GMK 강조 문장, CTA 버튼: 600
- 일반 본문 및 단계 설명: 400
설치된 Noto Sans KR 가변 폰트를 프로젝트 assets/fonts에 포함했다. 네 화면 크기에서 웹폰트 로딩을 확인했고, 한자 溫이 해당 폰트에 포함되어 있다. 실제 DOM의 폰트 패밀리가 모두 일치하며 기울임·텍스트 그림자 없음.

## 수정/추가 파일
기존 파일 수정:
1. scripts/dodoon-editorial.mjs
2. dist/dodoon-editorial.css
3. dist/business/brands/index.html (빌드 결과)
빌드/정적 검사에서 review 내 검수 결과 파일이 갱신될 수 있다.

새 파일:
- dist/assets/dodoon-gmk-official-20260916.png
- dist/assets/fonts/NotoSansKR-VF.ttf
- dist/assets/fonts/OFL.txt
- dist/assets/fonts/NotoSansKR-LICENSE.txt
- review/dodoon-final-browser-check.json
- review/dodoon-final-related-text-locations.txt
- review/dodoon-final-report.md (이 문서)
- review/dodoon-final-desktop-1440.png
- review/dodoon-final-tablet-1024.png
- review/dodoon-final-tablet-768.png
- review/dodoon-final-mobile-390.png

## 공식 이미지
원본: C:\Users\coqqu\Downloads\여러가지벗서과 균사체이미지.png
저장/적용: G:\ChatGPT\홈페이지개편\site\dist\assets\dodoon-gmk-official-20260916.png
원본 크기 2171×724. 원본과 복사본의 SHA-256 일치:
12B687E86E6DB9F6CCF870F533B937CD486AA542797C5E5BAC7D8D495079E86B
표시는 width:100%, height:auto, object-fit:contain. 데스크톱 최대 1280px로 표시해 원본보다 확대하지 않는다. 모바일에도 주변 배양접시를 포함한 전체 구도를 유지한다.
alt: 연구실 배양접시에 놓인 다양한 버섯 소재와 중앙의 흰색 버섯균사체

## 검증 결과
- 1440/1024/768/390px 모두 가로 넘침 없음, 섹션 수 7.
- 1440/1024/768px H1은 2줄. 390px은 도두On을 분리하지 않고 3줄로 자연스럽게 배치.
- 4개 화면에서 동일 Noto Sans KR 웹폰트 로딩 확인.
- GMK 문구를 요청문과 공백 정규화 후 비교: 정확히 일치.
- 도두On HTML 전체에 특정 버섯명/세 가지 표현 없음.
- 기존 GMK 카드 0, 영상/source 0, 깨진 이미지 0.
- 제품 CTA가 /products/로 이동, 기존 제품 8개 확인.
- 브라우저 콘솔 오류 0.
- 31개 페이지 빌드 통과, 정적 링크 검사 문제 0, 변경 mjs Node 구문 검사 통과.
- 순수 JavaScript 프로젝트로 별도 TypeScript 설정/타입 검사 명령은 없다.
- 이전 파일 SHA-256 대조: 기존 dist 파일 중 도두On HTML과 전용 CSS만 변경. 다른 페이지와 공통 CSS 동일.
- 공통 헤더/푸터 HTML 동일. 제품 gift.webp 원본 해시 동일.

## 검색에서 발견된 다른 위치 (수정하지 않음)
- 공개 /rnd/ (dist/rnd/index.html): ‘연구의 세 가지 축’. GMK 구성 버섯 수를 의미하는 문장은 아님.
- scripts/brand-story.mjs 및 scripts/brand-story-v2.mjs: 이전 브랜드 렌더러에 특정 버섯명이 남아 있음. 현재 브랜드 페이지는 dodoon-editorial.mjs 사용.
- content/scenario.json 및 review/content-coverage.json: 보관 원고와 대응표에 이전 표현이 남아 있음. dist에 제공되는 공개 페이지 파일이 아님.
- review 내 과거 작업 보고서 및 백업에도 과거 표현이 보존되어 있음.
전체 검색 위치는 dodoon-final-related-text-locations.txt에 기록.

## 백업
review/before-final-copy-20260916/ 에 이번 수정 전 렌더러·전용 CSS·HTML 보관.
