# Blog, research and newsroom update (2026-10-03)

Branch: `codex/supabase-content-admin`
Base before this change: `cf31e2ef7da8c4351a8adce84614b350fcf3d52f`
Production and `main`: unchanged.

## Changes

- Blog listing no longer has its search field or implementation-status copy. Topic tabs filter the available RSS set by visible title/description keywords; the original RSS category does not provide the requested five-way taxonomy, so only `전체` reflects an actual RSS category. Each item now has an internal detail route; the Naver source remains in the detail footer.
- Blog cards use a shared image frame. Four diagram/text-heavy entries use `contain` on a neutral background; photos use the existing crop with focal positioning. Dimensions and responsive source hints reduce layout shift. The preserved `hyphae-mycelium-mushrooms` RSS entry had only a short description, so its independently edited detail uses a separately stored editorial JSON. It has three relevant original Naver images and two source-grounded FAQ items. A short embedded video was excluded because no transcript/captions or reliably verifiable spoken content were available. No image was edited or synthesized.
- Research keeps its existing bookcase hero and now has the requested `RESEARCH INSIGHTS` / title / description sequence.
- Newsroom reuses the bookcase hero with the requested copy; its static shell contains a single date-sorted image-and-title grid. The CMS-backed public route uses the same card renderer. No year headings or card summaries are shown.
- Existing 16 newsroom records, database content, original files, URLs, publication dates, sources and status were not modified. Details now show the existing cover, date, outlet, known reporter and separately identified website author, current stored summary (or a verified editorial summary), source button and list return. Reporter and caption fields were absent in the source for multiple entries, so none were invented. Six articles have source-verified expanded summaries in `content/newsroom-editorial.json`; the remaining ten retain their already stored summaries because their full article text could not be verified in this pass.
- Original blog and newsroom snapshots plus a hash manifest are in `content/cms-migrations/gmk-note-review-20261003/`. The original static article files remain in place. The new blog editorial content is separate from the RSS snapshot.

## Article-source coverage

Source-checked and expanded: 2026 human application study; 2025 cell study; 2023 cell/animal preclinical study; 2022 animal immune study; 2022 US patent report; 2021 production scale-up report. Study stage wording is kept specific; article headlines are not expanded into new efficacy claims.

Existing summaries retained without expansion: the other ten newsroom entries. The preserved migration inventory contains all 16 article titles, dates, publishers, original URLs and thumbnails. Original ALT/captions were blank where the source did not provide them; the public renderer supplies a title-based accessible ALT without altering stored source data.

Blog inventory: 12 RSS cards. Eleven already had locally retained full-body source blocks; the “균사·균사체·버섯, 어디가 다를까요?” item had only an RSS excerpt in the saved feed and no retained full-body block. Its detail was reconstructed from the live original Naver article, with its body copy stored separately under `content/note-edits/`. The 24-second video was omitted; narration could not be verified. This source was not imported into Supabase.

## Validation

- `node scripts/build.mjs`: passed; generated 67 local draft pages and tracked 94 content IDs.
- `node --test scripts/blog-newsroom-improvements.test.mjs scripts/newsroom.test.mjs scripts/newsroom-cms.test.mjs`: 28/28 passed.
- Local static browser check: newsroom desktop shows the requested hero and 16 image/title cards in a 3-column grid; blog static listing shell shows the five topic tabs and no search UI. Screenshot inspection confirms the visible newsroom hero and first row of images. CSS defines 2-column tablet, 1-column mobile for blog cards; newsroom uses the site's responsive card breakpoints.
- The local dynamic server could not reach Supabase because this workspace has no local CMS runtime credentials; as designed, it showed the safe load-failure state. A fresh Preview is needed to verify the new code against the live public CMS route. Existing Preview admin edit/save/reopen testing is recorded in `review/newsroom-migration-report.txt`; its test-only record is now confirmed `archived` in Supabase and remains unpublished.

## Remaining limits

- Preview deployment and live public-route checks have not yet completed.
- A live mobile viewport screenshot and current Preview checks remain pending.
- The ten newsroom items above could not be expanded without verified full article text; their stored summaries remain intact.
- For the one RSS-only blog entry, the saved feed itself did not contain a full source body. The separate editorial file records the page-based reconstruction; no video narration was used.
