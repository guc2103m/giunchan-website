import type { Metadata } from 'next';
import './globals.css';
import './final-layout.css';
import './brand-story.css';
import './hero-images.css';

export const metadata: Metadata = {
  title: { default: '주식회사 기운찬 | 천연물 바이오소재 전문기업', template: '%s | 주식회사 기운찬' },
  description: '버섯균사체 복합배양·발효기술로 핵심 바이오소재 GMK®를 연구·개발하는 천연물 바이오소재 전문기업입니다.',
  metadataBase: new URL('https://giunchan-website.vercel.app'),
  openGraph: { title: '주식회사 기운찬', description: '자연의 가능성을 과학으로 증명하는 천연물 바이오소재 전문기업', type: 'website' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context':'https://schema.org','@type':'Organization',name:'주식회사 기운찬',alternateName:'Giunchan Co., Ltd.',foundingDate:'2015',address:{'@type':'PostalAddress',addressRegion:'충청남도',addressLocality:'천안시',addressCountry:'KR'} }) }} /></body>
    </html>
  );
}

