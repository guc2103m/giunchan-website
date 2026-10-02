// Reviewed migrations only. A missing/unpublished CMS row must never fall back to HTML.
export const migratedSlugs=['are-mushrooms-plants','food-label-guide','gmk-material','what-is-gmk','human-study-and-approval'];
export const isMigratedRoute=route=>migratedSlugs.some(slug=>route===`/insights/${slug}/`);
export function withoutMigratedCards(html){return html.replace(/<article\b[^>]*class="insight-card"[^>]*>[\s\S]*?<\/article>/g,card=>migratedSlugs.some(slug=>card.includes(`href="/insights/${slug}/"`))?'':card);}

export const undatedMigratedSlugs=migratedSlugs.filter(s=>s!=='are-mushrooms-plants');
export const publicDateFilter=()=> 'or=(published_at.lte.'+encodeURIComponent(new Date().toISOString())+',and(published_at.is.null,slug.in.('+undatedMigratedSlugs.join(',')+')))';
