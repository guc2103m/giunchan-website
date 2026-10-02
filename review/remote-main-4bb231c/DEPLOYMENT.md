# 주식회사 기운찬 홈페이지 배포 안내

## GitHub

1. 이 ZIP 파일을 압축 해제합니다.
2. GitHub에서 새 저장소를 만듭니다.
3. 압축을 푼 폴더의 전체 파일을 저장소에 업로드합니다.
4. `.env` 파일, `node_modules`, `dist`는 저장소에 올리지 않습니다.

## 로컬 실행

Node.js 22.13 이상과 pnpm이 필요합니다.

```bash
pnpm install
pnpm dev
```

## 빌드

```bash
pnpm build
```

## Vercel

Vercel에서 GitHub 저장소를 가져온 뒤 다음과 같이 설정합니다.

- Framework Preset: Other
- Install Command: `pnpm install`
- Build Command: `pnpm build`

현재 프로젝트는 Vinext/Vite 기반이며 빌드 결과에 서버 출력이 포함됩니다. Vercel 환경에서 자동 감지가 되지 않을 경우 표준 Next.js 런타임으로의 전환이 필요할 수 있습니다.

## 콘텐츠 교체

- 이미지: `public/assets`
- 메뉴·페이지·제품·콘텐츠 데이터: `lib/site-data.ts`
- 주요 레이아웃: `components/site-page.tsx`
- 공통 스타일: `app/globals.css`

주소, 연락처, 이메일, SNS, 제품 상세정보, 실제 뉴스 및 연구자료의 플레이스홀더는 운영 전 확인된 정보로 교체해 주세요.
