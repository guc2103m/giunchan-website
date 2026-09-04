import type { MetadataRoute } from 'next';
import { pages, products, insights, siteOrigin } from '@/lib/site-data';
export default function sitemap():MetadataRoute.Sitemap{const paths=['/',...Object.keys(pages),...products.map(x=>`/brands/dodoon/products/${x.slug}`),...insights.map(x=>x.href)];return [...new Set(paths)].map(url=>({url:`${siteOrigin}${url}`,lastModified:new Date('2026-09-04'),changeFrequency:url==='/'?'weekly':'monthly',priority:url==='/'?1:.7}))}

