import { SitePage } from '@/components/site-page';
import { pages, products, insights, siteOrigin } from '@/lib/site-data';
import type { Metadata } from 'next';

export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{
  const {slug}=await params; const path='/'+slug.join('/');
  const info=pages[path]; const product=products.find(x=>path==='/brands/dodoon/products/'+x.slug); const insight=insights.find(x=>x.href===path);
  const title=(info?.title||product?.name||insight?.title||'홈페이지 안내').replace(/\n/g,' ');
  const description=info?.lead||product?.summary||insight?.desc;
  return {title,description,alternates:{canonical:siteOrigin+path},openGraph:{title,description,url:siteOrigin+path}};
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return <SitePage path={`/${slug.join('/')}`} />;
}
