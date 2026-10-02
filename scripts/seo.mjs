// Official production identity must not inherit a preview/deployment hostname.
export const siteOrigin = 'https://www.guc.co.kr';
export const isPreview = Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production');
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const json = value => JSON.stringify(value).replaceAll('<', '\\u003c');

export function seoHead(route, title, description, body, extraHead = '') {
  if (route === '404' || /http-equiv="refresh"/i.test(body)) return '<meta name="robots" content="noindex,nofollow">';
  const graphs=[];
  const extra=extraHead.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,(_,raw)=>{const data=JSON.parse(raw);graphs.push(...(data['@graph']||[data]));return '';}).replace(/<link rel="canonical"[^>]*>/g,'');
  const commonKeys=new Set(['og:site_name','og:locale','og:type','og:title','og:description','og:url','og:image','twitter:card','twitter:title','twitter:description','twitter:image']);
  const preserved=extra.replace(/<meta (?:property|name)="([^"]+)"[^>]*>/g,(tag,key)=>commonKeys.has(key)?'':tag);
  const url = siteOrigin + route;
  // Use an existing local image with dimensions, falling back to the existing logo.
  const image = body.match(/<img\b[^>]*\bsrc="(\/assets\/[^"?]+)"/i)?.[1] || '/assets/logo.png';
  const imageUrl = siteOrigin + image;
  const organization = {'@type':'Organization','@id':siteOrigin+'/#organization',name:'주식회사 기운찬',url:siteOrigin+'/',logo:siteOrigin+'/assets/logo.png',telephone:'+82-41-579-2203',email:'guc2203@guc.co.kr'};
  const page = {'@type':'WebPage','@id':url+'#webpage',url,name:title,description,inLanguage:'ko-KR',isPartOf:{'@id':siteOrigin+'/#website'},about:{'@id':organization['@id']}};
  return `<link rel="icon" type="image/png" href="/assets/logo.png"><meta name="robots" content="${isPreview?'noindex,nofollow':'index,follow'}"><link rel="canonical" href="${escape(url)}"><meta property="og:site_name" content="주식회사 기운찬"><meta property="og:locale" content="ko_KR"><meta property="og:type" content="${graphs.some(x=>x['@type']==='Article')?'article':'website'}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${escape(url)}"><meta property="og:image" content="${escape(imageUrl)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${escape(imageUrl)}"><script type="application/ld+json">${json({'@context':'https://schema.org','@graph':[organization,{'@type':'WebSite','@id':siteOrigin+'/#website',url:siteOrigin+'/',name:'주식회사 기운찬',publisher:{'@id':organization['@id']}},page,...graphs]})}</script>${preserved}`;
}

export function robotsText() {
  return isPreview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteOrigin}/sitemap.xml\n`;
}
