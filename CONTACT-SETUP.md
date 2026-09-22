# 문의 접수 설정 및 검증 (2026-09-22)

## 구현 구조

기존 정적 사이트 + Vercel Node 서버리스 `api/contact.js` + Resend HTTPS API. 문의 DB, Sheets, Notion 저장 없음. Resend와 수신 메일함에서는 이메일 처리에 필요한 데이터가 처리되므로 서비스의 보관 정책도 확인하세요. 회사 담당자가 문의 처리 완료 후 1년이 지난 이메일을 삭제해야 합니다.

- ingredient: GMK® 원료 문의
- consumer: 제품·구매 문의
- development: 제품 개발·제품화 상담
- 나머지/미지정: 기타 문의

## Vercel 설정

Vercel → guc2103m-7777 계정의 giunchan-website 프로젝트 → Settings → Environment Variables.

| 이름 | 값 |
|---|---|
| RESEND_API_KEY | Resend에서 발급한 발송용 키. Secret/Sensitive로 등록 |
| CONTACT_TO_EMAIL | Production은 guc2203@guc.co.kr |
| CONTACT_FROM_EMAIL | Resend에서 인증 완료한 도메인의 발신 주소. 회사가 주소를 결정한 후 등록 |

Preview/Development/Production 범위는 각각 설정합니다. 변경 후 다시 배포해야 적용됩니다. 키를 채팅, 소스코드, 공개 저장소에 넣지 마세요. 현재 확인 시 프로젝트 환경변수는 없었습니다.

## 도메인 인증 전 테스트

Resend 가입 계정에서 발급한 API 키를 Development 또는 Preview에만 등록합니다. Resend 테스트 발신 주소 `onboarding@resend.dev`를 CONTACT_FROM_EMAIL에 넣고, CONTACT_TO_EMAIL에는 Resend 가입 계정 본인의 이메일을 사용합니다. resend.dev 발신은 임의의 회사 수신 주소에 보낼 수 없습니다. Production은 코드에서 회사 수신 주소를 강제하므로 이 테스트는 로컬/Preview에서만 진행합니다.

## 도메인 인증 후 운영

1. Resend Dashboard → Domains → Add Domain에서 guc.co.kr 또는 회사가 승인한 발송 전용 하위 도메인을 추가합니다.
2. DNS 관리업체에서 Resend 화면에 표시된 정확한 SPF/DKIM 레코드와 필요 레코드를 입력합니다. 기존 회사 이메일 수신용 MX를 임의로 교체하지 마세요. 동일 호스트의 SPF 중복도 피합니다.
3. Resend에서 Verified 상태를 확인합니다. 현재 인증 상태는 아직 확인되지 않았습니다.
4. 인증된 도메인의 발신 주소를 회사가 확정한 뒤 CONTACT_FROM_EMAIL에 등록합니다.
5. Production CONTACT_TO_EMAIL=guc2203@guc.co.kr 및 키를 등록하고 재배포합니다.
6. 테스트 문의를 제출하고 Resend delivery 이벤트와 회사 수신함/스팸함을 모두 확인합니다. 수신 메일에서 답장을 눌러 입력한 테스트 이메일이 받는 사람인지 확인합니다.

API의 성공 응답은 Resend가 발송 요청을 접수했다는 뜻이며 최종 수신함 도착 보장은 아닙니다. 현재 실제 수신 및 실제 Reply-To 확인은 미완료입니다.

## 로컬 실행과 검증

사이트 폴더에서 Node 20 이상으로:

```powershell
node scripts/build.mjs
node scripts/check.mjs
node --test scripts/contact.test.mjs
node scripts/serve.mjs
```

http://127.0.0.1:4173/contact/?type=ingredient 를 엽니다. 이메일 테스트를 할 때만 Git에서 제외된 `.env.local`에 위 세 변수를 저장하고 `node --env-file=.env.local scripts/serve.mjs`로 실행합니다. 이미 4173 서버가 켜져 있으면 먼저 해당 서버를 종료합니다.

빈 필드, 잘못된 이메일/전화, 미동의 상태는 제출 차단. 키 미등록 시 실패 메시지. 테스트 성공 시 입력 초기화 및 10초 버튼 비활성화. 전송 중 연속 클릭 차단. 같은 실패 건 재시도는 동일 Idempotency-Key 사용(Resend 24시간 보장 범위).

## 보안 및 운영 한계

서버 필수 검증, 길이 제한, HTML 이스케이프, Origin 검사, 허니팟, 2초 최소 작성 시간, 24KB 요청 제한, 서버 인스턴스별 해시된 IP당 10분/5회 제한. IP 원문/문의 내용을 로그로 기록하지 않습니다. 키는 서버에서만 읽습니다.

요청 횟수 제한은 DB 없는 인메모리 방식으로 콜드 스타트·서버 인스턴스 사이에 공유되지 않습니다. 공개 운영 전 Vercel 프로젝트 Firewall에서 POST /api/contact 및 /api/contact/에 대한 IP 기반 Rate Limit 규칙을 추가하면 분산 요청에도 적용할 수 있습니다. 요금제/사용 가능한 규칙 범위는 대시보드에서 확인하고 유료 기능은 별도 승인 후 적용하세요.

## 검증 기록

- 정적 빌드 65개 페이지 및 기존 사이트 검사 통과
- Node 테스트: 필수/동의/형식/길이/허니팟/Origin/본문 크기/파싱/키 누락/발송 실패/네트워크 오류/동시 중복/횟수 제한 통과
- 모의 성공: 수신 주소, Reply-To, 이메일 제목, HTML 스크립트 이스케이프 확인
- 로컬 브라우저: 원료 유형 자동 선택, 필수 오류, 실제 설정 누락 실패 문구 확인
- PC 1440px, 모바일 375px 폼 가로 넘침 없음
- 실제 메일 발송: 미실행. RESEND_API_KEY 및 인증된 CONTACT_FROM_EMAIL 설정 필요

## 수정 파일

api/contact.js, scripts/contact-form.mjs, scripts/contact.test.mjs, scripts/build.mjs, scripts/ingredient-forms.mjs, scripts/serve.mjs, dist/app.js, dist/contact.js, dist/contact-validation.js, dist/contact.css, dist/contact/index.html, dist/privacy/index.html, dist/business/ingredients/index.html, CONTACT-SETUP.md.

## 공식 문서

- https://resend.com/docs/api-reference/emails/send-email
- https://resend.com/docs/dashboard/domains/introduction
- https://resend.com/docs/knowledge-base/403-error-resend-dev-domain
- https://resend.com/docs/dashboard/emails/idempotency-keys
- https://vercel.com/kb/guide/add-rate-limiting-vercel

Vercel 미리보기 빌드 READY. 배포 API 검증: 빈 필수 항목 400, 정상 형식 + 환경변수 누락 503 확인. 운영 배포는 실제 발송 설정/수신 검증 이후 진행합니다. 문의 API는 프로젝트 trailingSlash 규칙에 맞게 /api/contact/로 요청합니다. JavaScript 프로젝트이므로 별도 TypeScript 검사는 없고 node --check 구문 검사를 통과했습니다.
