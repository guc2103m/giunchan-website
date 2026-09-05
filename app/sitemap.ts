import type { MetadataRoute } from 'next';
import { pages, products, siteOrigin } from '@/lib/site-data';
import {allPublished} from '@/lib/content-data';
export default function sitemap():MetadataRoute.Sitemap{const oldContent=new Set(['/insight/gmk','/insight/mycelia','/newsroom/news','/newsroom/issues','/brands/dodoon']);const paths=['/',...Object.keys(pages).filter(x=>!oldContent.has(x)),...products.map(x=>`/brands/dodoon/products/${x.slug}`),...allPublished.map(x=>`/${x.contentType}/${x.slug}`),'/insight/rss.xml','/newsroom/rss.xml'];return [...new Set(paths)].map(url=>({url:`${siteOrigin}${url}`,lastModified:new Date(allPublished.find(x=>`/${x.contentType}/${x.slug}`===url)?.updatedAt||'2026-09-06'),changeFrequency:url==='/'?'weekly':'monthly',priority:url==='/'?1:.7}))}

