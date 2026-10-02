# Integration review — 2026-10-02

Status: NEEDS REVIEW before main/push. No production deployment.

Backup: backup/pre-sync-2026-10-02 (7ed7fe6).
Remote: origin/main (4bb231c). Histories have no common ancestor; no patch-equivalent commits were identified by --cherry-pick.

## Conflicts resolved individually
- package.json: retain local Node static build; remote next build would replace the approved site. Remote package preserved under review/remote-main-4bb231c/package.json.
- .openai/hosting.json: retain local static directory metadata; remote D1/R2 metadata is unrelated to the active Vercel static pipeline. Remote version archived.
- .gitignore: retain local secrets and generated review exclusions; append compatible remote build/cache/key exclusions. Do not import remote /dist/ ignore rule because dist is the active site's tracked assets.

## Remote changes (code reviewed)
- Next.js/React app, app/layout.tsx and CSS: alternate design, navigation, brand and page layouts. Preserve source in archive; do not replace approved local UI.
- components/site-client.tsx: contact form prevents submit, shows mailto; retain local validated Resend server API.
- app/robots.ts, app/layout.tsx, lib/site-data.ts: NEXT_PUBLIC_INDEX_SITE opt-in plus preview AI-crawler allowance; superseded by requested local VERCEL_ENV production/preview policy.
- next.config.ts/lib/site-data.ts: alternate /technology, /brands and singular /insight redirect family. Do not copy incompatible destinations into current routes.
- app/sitemap.ts: RSS paths and alternate content paths exist in remote architecture. RSS/content routing needs separate scope review before enabling.
- All remote-only source/assets are preserved byte-for-byte under review/remote-main-4bb231c and in the merge parent history. This directory is excluded from Vercel by the existing review exclusion. Remote features are not claimed to be ported.

## Local changes retained
Latest mushroom insight and media; Dodoon logos/name/menu; GMK wording; homepage latest article cards; company six-person cards and restored text; actual contact API; official-domain SEO, sitemap, robots, 33 redirects and tests.

## Outstanding decision
This merges histories and preserves the approved runtime. It does not activate the incompatible alternate Next.js application. Review whether any RSS/alternate route features should be ported before authorizing main/push. No DNS or deployment settings changed.

## Verification results
- Node build: PASS, 67 routes.
- SEO/contact/mushroom tests: 7/7 PASS; contact delivery mocked, no email sent.
- Route checker: 67 routes, zero issues.
- All 366 dist files match original backup output (text CRLF/LF normalized; binary exact). All 214 remote files match original Git blob hashes.
- git diff --check (unstaged): PASS.
- git diff --cached --check: existing blank-at-EOF warnings in preserved remote archive. No active website code whitespace errors. Preserved archival bytes intentionally; this is a review item, not a claim of clean cached whitespace validation.
- Main remains 09d7397. No push/deploy/DNS changes.
- Ignored .env.local/.vercel local credentials remain untouched in the original folder, intentionally not committed.
