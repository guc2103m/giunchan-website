// Reviewed migrations only. A missing/unpublished CMS row must never fall back to HTML.
export const migratedSlugs=['are-mushrooms-plants'];
export const isMigratedRoute=route=>migratedSlugs.some(slug=>route===`/insights/${slug}/`);
export function withoutMigratedCards(html){return html.replace(/<article\b[^>]*class="insight-card"[^>]*>[\s\S]*?<\/article>/g,card=>migratedSlugs.some(slug=>card.includes(`href="/insights/${slug}/"`))?'':card);}
