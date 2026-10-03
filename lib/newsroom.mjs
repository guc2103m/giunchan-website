import {escape,assetUrl,postUrl,safeLink,optimizeImageHTML} from './content-render.mjs';
import {seoulDate} from './content-document.mjs';
import newsroomEditorial from '../content/newsroom-editorial.json' with {type:'json'};
import pressReleases from '../content/press-releases.json' with {type:'json'};
const titleText=value=>escape(value).replaceAll('GMK®','GMK<sup class="registered-mark">®</sup>');
// Publication date alone determines recency. Slug is a stable tie breaker, never updated_at.
export const sortNewsroom=posts=>[...posts].sort((a,b)=>(seoulDate(b.published_at)||'').localeCompare(seoulDate(a.published_at)||'')||a.slug.localeCompare(b.slug,'en'));
export function staticNewsroomPost(p){return {slug:p.slug,category:'newsroom',title:p.originalTitle||p.title,published_at:p.publishedAt?`${p.publishedAt}T00:00:00+09:00`:null,thumbnail_path:p.newsroomImage||null,thumbnail_alt:p.newsroomImageAlt||'',summary:p.newsroomSummary||p.summary||'',author:p.author||'주식회사 기운찬',details:{publisher:p.publisher||'',reporter:p.reporter||'',source_url:p.originalArticleUrl||'',source_links:p.sourceLinks||[]}};}
export function newsroomCard(post,index=0){
 const image=post.thumbnail_path?`<img src="${escape(assetUrl(post.thumbnail_path))}" alt="${escape(post.thumbnail_alt||post.title+' 기사 대표 이미지')}" width="800" height="450" loading="${index<3?'eager':'lazy'}" decoding="async" referrerpolicy="no-referrer" data-newsroom-image>`:'';
 return `<article class="newsroom-card"><a href="${escape(postUrl(post))}"><div class="newsroom-card-image">${optimizeImageHTML(image,post.details?.image_variants,true).replace('loading="eager"',`loading="${index<3?'eager':'lazy'}"`)}<span class="newsroom-placeholder" ${image?'hidden':''} aria-hidden="true">GIUNCHAN</span></div><h2>${titleText(post.title)}</h2></a></article>`;
}
export const newsroomCards=posts=>sortNewsroom(posts).map(newsroomCard).join('');
export function newsroomArticle(post){
 const d=post.details||{},editorial=newsroomEditorial[post.slug],source=safeLink(d.source_url);
 const paragraphs=editorial?.paragraphs?.length?editorial.paragraphs:[post.summary||''];
 const sourceRecord=pressReleases.find(p=>p.slug===post.slug),links=d.source_links||sourceRecord?.sourceLinks||[];
 const relatedLinks=links.filter(link=>safeLink(link.url)&&safeLink(link.url)!==source);
 const image=post.thumbnail_path?`<figure class="newsroom-detail-figure"><img src="${escape(assetUrl(post.thumbnail_path))}" alt="${escape(post.thumbnail_alt||post.title+' 기사 대표 이미지')}" loading="eager" fetchpriority="high" decoding="async" referrerpolicy="no-referrer">${d.image_caption?`<figcaption>${escape(d.image_caption)}</figcaption>`:''}</figure>`:`<div class="newsroom-detail-placeholder" role="img" aria-label="기사 대표 이미지 없음">대표 이미지 없음</div>`;
 const reporter=d.reporter?`<p class="newsroom-reporter">기사 기자: ${escape(d.reporter)}</p>`:'';
 const author=post.author?`<p class="newsroom-site-author">홈페이지 작성자: ${escape(post.author)}</p>`:'';
 return `<article class="newsroom-detail container cms-article"><header><p class="section-kicker">미디어자료</p><h1>${titleText(post.title)}</h1><p class="newsroom-publication">보도일자: ${post.published_at?`<time datetime="${escape(post.published_at)}">${escape(seoulDate(post.published_at))}</time>`:'확인 필요'}${d.publisher?' · 보도매체: '+escape(d.publisher):''}</p>${reporter}${author}</header>${image}<section class="newsroom-editorial-summary" aria-label="기사 핵심 요약">${paragraphs.map(text=>text?`<p>${escape(text)}</p>`:'').join('')}</section>${source?`<p class="newsroom-source-action"><a class="button" href="${escape(source)}" target="_blank" rel="noopener noreferrer">기사 원문 보기 ↗</a></p>`:''}${relatedLinks.length?`<nav class="newsroom-related-links" aria-label="관련 출처">${relatedLinks.map(link=>`<a href="${escape(safeLink(link.url))}" target="_blank" rel="noopener noreferrer">${escape(link.label||'관련 출처')} ↗</a>`).join('')}</nav>`:''}<p class="newsroom-copyright">이 기사의 저작권은 해당 언론사에 있습니다. 전체 내용은 원문 기사에서 확인해 주세요.</p><a class="text-link newsroom-back" href="/newsroom/">미디어자료 목록으로 돌아가기 →</a></article>`;
}
