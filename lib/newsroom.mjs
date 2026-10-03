import {escape,assetUrl,postUrl,renderBlocks,safeLink,optimizeImageHTML} from './content-render.mjs';
import {seoulDate} from './content-document.mjs';
const titleText=value=>escape(value).replaceAll('GMK®','GMK<sup class="registered-mark">®</sup>');
// Publication date alone determines recency. Slug is a stable tie breaker, never updated_at.
export const sortNewsroom=posts=>[...posts].sort((a,b)=>(seoulDate(b.published_at)||'').localeCompare(seoulDate(a.published_at)||'')||a.slug.localeCompare(b.slug,'en'));
export function staticNewsroomPost(p){return {slug:p.slug,category:'newsroom',title:p.originalTitle||p.title,published_at:p.publishedAt?`${p.publishedAt}T00:00:00+09:00`:null,thumbnail_path:p.newsroomImage||null,thumbnail_alt:p.newsroomImageAlt||'',details:{}};}
export function newsroomCard(post,index=0){
 const image=post.thumbnail_path?`<img src="${escape(assetUrl(post.thumbnail_path))}" alt="${escape(post.thumbnail_alt||post.title+' 기사 대표 이미지')}" width="800" height="450" loading="${index<3?'eager':'lazy'}" decoding="async" referrerpolicy="no-referrer" data-newsroom-image>`:'';
 return `<article class="newsroom-card"><a href="${escape(postUrl(post))}"><div class="newsroom-card-image">${optimizeImageHTML(image,post.details?.image_variants,true).replace('loading="eager"',`loading="${index<3?'eager':'lazy'}"`)}<span class="newsroom-placeholder" ${image?'hidden':''} aria-hidden="true">GIUNCHAN</span></div><h2>${titleText(post.title)}</h2></a></article>`;
}
export const newsroomCards=posts=>sortNewsroom(posts).map(newsroomCard).join('');
export function newsroomArticle(post){
 const d=post.details||{};let body=renderBlocks(post.content?.blocks);
 // The original source links remain editable; metadata changes update the primary source URL.
 if(d.migration?.source_url&&safeLink(d.source_url))body=body.replaceAll(`href="${escape(d.migration.source_url)}"`,`href="${escape(safeLink(d.source_url))}"`);
 const hasSource=d.source_url&&body.includes(`href="${escape(safeLink(d.source_url))}"`);
 return `<article class="newsroom-detail container cms-article"><header><p class="newsroom-publication">기사 발행일: ${post.published_at?`<time datetime="${escape(post.published_at)}">${escape(seoulDate(post.published_at))}</time>`:'확인 필요'}</p><h1>${titleText(post.title)}</h1><p class="newsroom-byline">${escape(d.publisher)}${d.reporter?' · '+escape(d.reporter)+' 기자':''}</p></header>${body}${safeLink(d.source_url)&&!hasSource?`<p><a class="button" href="${escape(safeLink(d.source_url))}" target="_blank" rel="noopener noreferrer">기사 원문 보기 ↗</a></p>`:''}<a class="text-link newsroom-back" href="/newsroom/">뉴스룸으로 돌아가기 →</a></article>`;
}
