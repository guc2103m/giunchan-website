import type { Metadata } from 'next';
import './globals.css';
import './final-layout.css';
import './brand-story.css';
import './hero-images.css';
import './design-system.css';
import './content-system.css';
import './natural-science.css';
import './company-page.css';
import {allowIndexing,siteOrigin} from '@/lib/site-data';

export const metadata: Metadata = {
  title: { default: '주식회사 기운찬 | 천연물 바이오소재 전문기업', template: '%s | 주식회사 기운찬' },
  description: '버섯균사체 복합배양·발효기술로 핵심 바이오소재 GMK®를 연구·개발하는 천연물 바이오소재 전문기업입니다.',
  metadataBase: new URL(siteOrigin),
  robots: { index: allowIndexing, follow: allowIndexing, googleBot:{index:allowIndexing,follow:allowIndexing} },
  openGraph: { title: '주식회사 기운찬', description: '자연의 가능성을 과학으로 증명하는 천연물 바이오소재 전문기업', type: 'website' },
};

const organization={
 '@context':'https://schema.org','@type':'Organization','@id':'https://www.guc.co.kr/#organization',name:'주식회사 기운찬',alternateName:'Giunchan Co., Ltd.',legalName:'주식회사 기운찬',url:'https://www.guc.co.kr/',logo:'https://www.guc.co.kr/assets/giunchan-logo-trimmed.png',description:'주식회사 기운찬은 버섯균사체 기반의 바이오소재를 연구·개발하고, 이를 원료와 제품으로 사업화하는 천연물 바이오소재 전문기업입니다.',foundingDate:'2015-10-12',telephone:'+82-41-579-2203',email:'guc2203@guc.co.kr',address:{'@type':'PostalAddress',addressCountry:'KR',addressRegion:'충청남도',addressLocality:'천안시',streetAddress:'동남구 충절로 252, 2F'},contactPoint:{'@type':'ContactPoint',telephone:'+82-41-579-2203',email:'guc2203@guc.co.kr',contactType:'business inquiries',areaServed:'KR',availableLanguage:['ko']}
};
const website={'@context':'https://schema.org','@type':'WebSite','@id':'https://www.guc.co.kr/#website',url:'https://www.guc.co.kr/',name:'주식회사 기운찬',publisher:{'@id':'https://www.guc.co.kr/#organization'},inLanguage:'ko-KR'};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([organization,website]) }} /></body>
    </html>
  );
}

