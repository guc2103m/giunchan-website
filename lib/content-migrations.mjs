// Reviewed migrations only. A missing/unpublished CMS row must never fall back to HTML.
export const researchMigratedSlugs=['are-mushrooms-plants','food-label-guide','gmk-material','what-is-gmk','human-study-and-approval'];
export const newsroomMigratedSlugs=["gmk-human-study-complete-2026","gmk-cell-study-2025","gmk-human-application-plan","gmk-preclinical-neuro-study","cheonan-disabled-sports-support","gmk-immune-animal-study","gmk-us-patent","gmk-oncology-preclinical-study","gmk-production-scale-up","national-disabled-team-support","disabled-parents-association-donation","giunchan-powder-product-archive","cheonan-city-product-donation","school-meal-product-archive","chungnam-rural-development-award","food-startup-contest-2016"];
export const migratedSlugs=[...researchMigratedSlugs,...newsroomMigratedSlugs];
export const migratedRoutes=[...researchMigratedSlugs.map(s=>`/insights/${s}/`),...newsroomMigratedSlugs.flatMap(s=>[`/insights/press/${s}/`,`/newsroom/${s}/`])];
export const isMigratedRoute=route=>migratedRoutes.includes(route);
export function withoutMigratedCards(html){return html.replace(/<article\b[^>]*class="insight-card"[^>]*>[\s\S]*?<\/article>/g,card=>migratedSlugs.some(slug=>card.includes(`href="/insights/${slug}/"`))?'':card);}

export const undatedMigratedSlugs=researchMigratedSlugs.filter(s=>s!=='are-mushrooms-plants');
export const publicDateFilter=()=> 'or=(published_at.lte.'+encodeURIComponent(new Date().toISOString())+',and(published_at.is.null,slug.in.('+undatedMigratedSlugs.join(',')+')))';
