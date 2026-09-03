import type { MetadataRoute } from 'next';
import { pages, products, insights } from '@/lib/site-data';
export default function sitemap():MetadataRoute.Sitemap{const base='https://www.giunchan.example';const paths=['/',...Object.keys(pages),...products.map(x=>`/brands/dodoon/products/${x.slug}`),...insights.map(x=>x.href)];return [...new Set(paths)].map(url=>({url:`${base}${url}`,lastModified:new Date('2026-09-03'),changeFrequency:url==='/'?'weekly':'monthly',priority:url==='/'?1:.7}))}

