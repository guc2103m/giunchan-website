import type { MetadataRoute } from 'next';
import {allowIndexing,siteOrigin} from '@/lib/site-data';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',...(allowIndexing?{allow:'/'}:{disallow:'/'})},sitemap:siteOrigin+'/sitemap.xml'}}

