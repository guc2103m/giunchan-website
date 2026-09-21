# Vercel 배포 완료 — 2026-09-18

대표 주소: https://giunchan-website.vercel.app
상태: production / READY
소스: D:\ChatGPT\홈페이지개편\site
설정: vercel.json 및 .vercelignore
빌드: node scripts/build.mjs
출력: dist
재배포: 이 site 폴더에서 vercel deploy --prod --yes

63개 페이지 빌드 및 로컬 링크 검사 통과.
홈, 브랜드, 제품화 지원, IR, 특허 페이지와 타임라인 PNG의 HTTP 200 확인.
새 환경에서도 빌드되도록 scripts/build.mjs에서 review 폴더를 생성하도록 수정.
기존 Sites 주소는 유지. 현재 sitemap.xml의 주소는 기존 Sites 기준으로 유지되어 있음.
.env.local 및 .vercel은 로컬 연결 정보이며 배포 소스 저장소에 커밋하지 않음.
