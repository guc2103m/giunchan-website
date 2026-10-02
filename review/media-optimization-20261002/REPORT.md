# 미디어 최적화 결과 — 2026-10-02

기준: integration/production-sync-2026-10-02, d9f6b54. main/push/deploy 미실행.

## 결과
- 이미지 87개: 원본과 RGBA 픽셀 동일한 무손실 WebP, 크기·투명도 보존.
- 영상 1개: 81,681,916 → 28,819,694 bytes (64.72% 감소), 1080×1920 → 720×1280, 69.99초/30fps 유지. H.264 약 9,137 → 3,090 kb/s. AAC 195 kb/s 오디오 스트림 복사. faststart 적용.
- 영상 전체 디코드 PASS, 브라우저 720×1280/69.985초 로드 및 실제 재생 시간 증가 확인.
- 영상 SSIM(원본을 같은 720×1280으로 축소 후 비교): ['All:0.991758']
- 원본 572개 파일 SHA256 보존 확인. 원본은 기존 위치에 유지. 파생본만 dist/assets/optimized/에 생성.
- 참조되는 이미지 고유 파일 총량: 154,870,120 → 113,139,219 bytes (26.95% 감소).
- 임베디드 영상 고유 파일 총량: 83,091,232 → 30,229,010 bytes (63.62% 감소).
- 위 수치는 전체 페이지의 고유 참조 리소스 합이며 한 페이지 전송량이 아님. 원본 보존으로 저장소/배포 디스크 총량은 증가함. 원본 영상 열기 링크는 원본 유지.

## 코드 및 보존
- content/media-optimized.json: 원본/파생본 경로와 전후 용량 매핑.
- scripts/media-optimization.mjs: 빌드 후 HTML/CSS/JS 미디어 URL 치환.
- scripts/build.mjs: 위 처리 호출.
- 기존 width/height, object-fit, 영상 controls/playsinline/preload=metadata/autoplay/muted/loop 유지. 기존 poster 유지; 본문 영상에 임의 poster 추가하지 않음.
- sub-hero 첫 이미지의 lazy를 eager로 변경하고 fetchpriority=high 적용. 나머지 lazy 정책 유지.
- 미디어 URL 및 loading/fetchpriority 이외의 기존 HTML/CSS/JS/robots/sitemap 변경 없음 확인.

## 검증
- build PASS / 67개 route checker PASS / SEO-contact-mushroom 테스트 7개 PASS.
- 이미지 픽셀·알파·해상도 비교 PASS / 전체 영상 디코드 PASS / 브라우저 재생 PASS.
- 브라우저 기본 976px 화면 가로 넘침 없음. 390/1280 뷰포트 재검수 도구 시간초과로 미완료. 모바일 실기 및 전체 페이지 육안 확인은 다음 단계.
- Lighthouse/CWV 미측정.

## 가장 큰 실사용 10개 원본 전후
| 파일 | 원본 bytes | 적용 bytes | 감소율 |
|---|---:|---:|---:|
| dist/assets/insights/are-mushrooms-plants/버섯균사체.mp4 | 81681916 | 28819694 | 64.72% |
| dist/assets/co-cultivation-original.gif | 13101013 | 13101013 | 0.00% |
| dist/assets/mixed-mushroom-mycelia-main.png | 5436337 | 1907394 | 64.91% |
| dist/assets/insight-mycelium-cross-section.png | 3415592 | 2545448 | 25.48% |
| dist/assets/insights/are-mushrooms-plants/추천3.png | 3325188 | 2453756 | 26.21% |
| dist/assets/insights/are-mushrooms-plants/버섯은식물일까_썸네일.png | 2674031 | 1938266 | 27.52% |
| dist/assets/dodoon-macro-20260916.png | 2662411 | 1848268 | 30.58% |
| dist/assets/insights/are-mushrooms-plants/추천1 균사와 균사체.png | 2480044 | 1726890 | 30.37% |
| dist/assets/insights/are-mushrooms-plants/추천4 연구소균사체.png | 2421833 | 1046308 | 56.80% |
| dist/assets/local-agriculture.png | 2418670 | 1649414 | 31.80% |

## 상세 내역
inventory.csv / inventory.json: 프로젝트 미디어 572개 전수 목록(공개 페이지에서 확인된 참조 196개), 해상도·용량·페이지·우선순위·원본 해시.
before-after.json: 파생본 전체 전후 비교. unused-large.json: 미사용/보관 후보, 자동 삭제 없음.
주요 보관 후보: 이전 review 백업 GIF 13.1MB, 원격 보관 product-giuncha-extract.png 8.3MB 등.
최적화 채택하지 않은 생성 후보는 프로젝트 밖 media-optimization-rejected-20261002에 보존.
