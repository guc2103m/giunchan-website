import type { MetadataRoute } from 'next';
import {allowIndexing,siteOrigin} from '@/lib/site-data';
export default function robots():MetadataRoute.Robots {
  const rules: MetadataRoute.Robots['rules'] = allowIndexing
    ? {userAgent:'*',allow:'/'}
    : [
        {userAgent:['OAI-SearchBot','ChatGPT-User'],allow:'/'},
        {userAgent:'*',disallow:'/'},
      ];

  return {rules,sitemap:siteOrigin+'/sitemap.xml'};
}

