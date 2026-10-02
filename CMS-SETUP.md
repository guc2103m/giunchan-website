# 기운찬 관리자 게시판 — 적용 전 검토본

기준 저장소: guc2103m/giunchan-website
기준 main 커밋: 7dfcd468b39531f3236c88da9589761455976f1d

## 구현 범위

- /admin/ 관리자 로그인, 썸네일 카드 목록, 작성·수정, 초안/공개/휴지통.
- 문단, 소제목, 이미지·캡션, 표, 출처 링크, FAQ, 공개용 PDF.
- Supabase에 게시한 새 글은 코드 재배포 없이 서버에서 표시.
- 연구 인사이트·연구자료는 기존 /insights/ 카드 목록에 추가.
- 뉴스룸은 기존 목록을 유지하며 새 글 카드 영역을 추가.
- 새 글의 제목·설명·canonical·Article 구조화 데이터와 sitemap을 서버에서 출력.
- 기존 URL과 본문은 그대로 제공. 기존 글은 아직 관리자 편집 대상으로 이전하지 않음.
- 별도 블로그 영역, 문의 DB, 예약 발행 스케줄러, 글 수정 이력은 이번 변경에 포함하지 않음.

## Supabase

프로젝트: ngxiztotgjhcpcphqzag (giunchan-website / 서울)
관리자 계정: guc2203@naver.com
posts, post_assets, content_admins 및 비공개 content-assets 버킷 구성 완료.
RLS는 공개 게시물에 실제 연결된 파일만 방문자가 읽도록 제한.
service_role 또는 secret 키를 사용하지 않음.

## Vercel 환경변수

- SUPABASE_URL: https://ngxiztotgjhcpcphqzag.supabase.co
- SUPABASE_PUBLISHABLE_KEY: Supabase Connect/API Keys의 publishable 키
- SITE_ORIGIN: https://www.guc.co.kr (실제 운영 도메인 확인 후 설정)

프로젝트의 공개용 publishable 연결 정보를 기본값으로 포함했습니다. Vercel 환경변수로 덮어쓸 수 있으며, 환경변수가 없더라도 이 프로젝트 연결이 작동합니다. 비밀 service_role 키는 포함하지 않습니다. 로컬은 .env.local로 덮어쓸 수 있습니다.
Vercel의 원래 buildCommand와 정적 HTML 출력 구조 유지.
새 public 렌더링 함수에 dist HTML·sitemap·예약 URL 목록 포함.
비밀 키와 사용자 비밀번호는 코드에 저장하지 않음.

## 검증과 배포

1. 최신 로컬 변경과 main을 비교하고 기존 콘텐츠가 더 최신이면 먼저 통합.
2. npm run build (원래 이미지·영상·폰트 자산이 있는 완전한 저장소에서 실행).
3. node --test scripts/cms.test.mjs
4. node --env-file=.env.local scripts/serve.mjs
5. Preview에서 사용자 본인이 실제 로그인 → 초안 → 이미지·PDF → 미리보기 → 게시 확인.
6. 비로그인 상태에서 초안·비공개 파일 접근이 거부되는지 확인.
7. 기존 콘텐츠 이전은 대표 글을 먼저 비교 검토한 뒤 별도 단계로 진행.
8. 사용자 승인 후 Production 적용.

현재 작업 공간에는 GitHub의 텍스트 소스만 내려받았으므로 원래 바이너리 미디어가 없으며, 전체 빌드의 미디어 검사는 이 공간에서 완료할 수 없음. 페이지 생성 및 CMS 전용 검증은 별도 수행.
실제 사용자 비밀번호 로그인, 파일 업로드, Vercel 함수 패키징은 Preview 확인 전 미검증.

## 사용

제목·글 주소·게시일 입력 → 대표 이미지/본문 추가 → 초안 저장 → 미리보기 → 게시하기.
파일 업로드 전 신규 글은 초안으로 먼저 저장. 기존 공개 글 업로드는 본문을 자동 발행하지 않음.
한 번 게시한 글은 주소를 고정. 공개 글을 초안으로 저장하면 비공개 전환.
PDF 첨부 제외는 해당 연결을 즉시 해제하므로 공개 글 작업 시 주의.
휴지통 글은 수정 화면에서 초안 저장으로 복구 가능. 영구 삭제 기능은 제공하지 않음.
기존 인사이트 글은 지금까지의 Codex 방식으로 유지되며 CMS 이전 후 관리자에서 편집 가능.

보안 점검에 남은 유출 비밀번호 보호 설정:
https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection
