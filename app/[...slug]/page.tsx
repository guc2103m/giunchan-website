import { SitePage } from '@/components/site-page';
import { pages, products, insights, siteOrigin } from '@/lib/site-data';
import type { Metadata } from 'next';

export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{
  const {slug}=await params; const path='/'+slug.join('/');
  if(path==='/company'){
    const title='회사소개 | 주식회사 기운찬 - 설립·연혁·기업부설연구소';
    const description='주식회사 기운찬은 2015년 충남 천안에서 설립된 천연물 바이오소재 전문기업입니다. 다양한 버섯과 버섯균사체를 연구하고 복합배양·발효기술을 기반으로 GMK® 원료와 제품을 개발합니다.';
    const url='https://www.guc.co.kr/company';
    const image='https://www.guc.co.kr/assets/giunchan-rnd-team.jpg';
    return {title,description,alternates:{canonical:url},openGraph:{title,description,url,type:'website',images:[{url:image,width:1920,height:1080,alt:'주식회사 기운찬 기업부설연구소 연구진'}]},twitter:{card:'summary_large_image',title,description,images:[image]}};
  }
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
  const path=`/${slug.join('/')}`;
  const companyJsonLd=path==='/company'?{
    '@context':'https://schema.org','@graph':[
      {'@type':'AboutPage','@id':'https://www.guc.co.kr/company#webpage',url:'https://www.guc.co.kr/company',name:'회사소개 | 주식회사 기운찬',about:{'@id':'https://www.guc.co.kr/#organization'}},
      {'@type':'Organization','@id':'https://www.guc.co.kr/#organization',name:'주식회사 기운찬',alternateName:'Giunchan Co., Ltd.',url:'https://www.guc.co.kr/',foundingDate:'2015',taxID:'289-81-00204',email:'guc2203@guc.co.kr',telephone:'+82-41-579-2203',address:{'@type':'PostalAddress',streetAddress:'충절로 252, 2F',addressLocality:'천안시 동남구',addressRegion:'충청남도',addressCountry:'KR'},employee:{'@type':'Person',name:'박종례',jobTitle:'대표'}}
    ]}:null;
  return <>{companyJsonLd&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(companyJsonLd)}}/>}<SitePage path={path} /></>;
}
