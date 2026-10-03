import {renderTree,safeEditorialURL} from './content-tree.mjs';
import {staticImageVariants} from './static-image-variants.mjs';
import {seoulDate} from './content-document.mjs';
export const categories={'research-insight':'연구 인사이트','research-data':'연구자료',newsroom:'미디어자료'};
export const escape=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
export function safeLink(value){try{const u=new URL(value);return ['http:','https:'].includes(u.protocol)?u.href:'';}catch{return '';}}
export const assetUrl=path=>/^https?:\/\//.test(path||'')?safeLink(path):path?.startsWith('/assets/')?safeEditorialURL(path):'/api/content?action=asset&path='+encodeURIComponent(path);
export const postUrl=post=>post.category==='newsroom'?`/insights/press/${post.slug}/`:`/insights/${post.slug}/`;
export function renderBlocks(blocks=[]){return blocks.map(b=>{
 if(b.type==='element'||b.type==='text')return renderTree(b);
 const text=escape(b.text);
 if(b.type==='heading')return `<h2>${text}</h2>`;
 if(b.type==='paragraph')return `<p>${text.replaceAll('\n','<br>')}</p>`;
 if(b.type==='image'&&b.path)return `<figure><img src="${escape(assetUrl(b.path))}" alt="${escape(b.alt)}" loading="lazy"><figcaption>${escape(b.caption)}</figcaption></figure>`;
 if(b.type==='gallery'&&Array.isArray(b.images))return `<div class="cms-gallery">${b.images.slice(0,3).filter(x=>x.path).map(x=>`<figure><img src="${escape(assetUrl(x.path))}" alt="${escape(x.alt)}" loading="lazy"><figcaption>${escape(x.caption)}</figcaption></figure>`).join('')}</div>`;
 if(b.type==='table'&&Array.isArray(b.rows))return `<div class="table-wrap"><table>${b.rows.map((r,i)=>`<tr>${r.map(c=>`<${i?'td':'th'}>${escape(c)}</${i?'td':'th'}>`).join('')}</tr>`).join('')}</table></div>`;
 if(b.type==='link'&&safeLink(b.url))return `<p><a href="${escape(safeLink(b.url))}" target="_blank" rel="noopener noreferrer">${text||escape(b.url)} ↗</a></p>`;
 if(b.type==='faq')return `<details><summary>${escape(b.question)}</summary><p>${escape(b.answer).replaceAll('\n','<br>')}</p></details>`;
 return '';
 }).join('');}
const cardText=value=>escape(value).replaceAll('GMK®','<span class="no-break">GMK<sup class="registered-mark">®</sup></span>');
export function renderCard(post,imageHTML=''){return `<article class="insight-card" data-category="research"><a href="${escape(postUrl(post))}">${imageHTML||(post.thumbnail_path?`<img src="${escape(assetUrl(post.thumbnail_path))}" alt="${escape(post.thumbnail_alt)}" width="960" height="540" loading="lazy">`:'<div class="cms-no-image">GIUNCHAN</div>')}<div class="insight-card-body"><span class="eyebrow">${escape(categories[post.category])}</span><h3>${cardText(post.details?.card_title||post.title)}</h3><p>${cardText(post.summary)}</p><div class="insight-card-footer"><span class="text-link">자세히 보기 →</span><span class="insight-card-date">${post.published_at?`<time datetime="${escape(post.published_at)}">${escape(new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul'}).format(new Date(post.published_at)))}</time>`:''}</span></div></div></a></article>`;}
export function renderArticle(post,assets=[]){const d=post.details||{};return `<div class="container article-wrap reading cms-article"><article><header><span class="eyebrow">${escape(categories[post.category])}</span><h1>${escape(post.title)}</h1><p class="cms-summary">${escape(post.summary)}</p><p>${escape(post.author)} · <time datetime="${escape(post.published_at)}">${escape(seoulDate(post.published_at))}</time></p></header>${post.thumbnail_path?`<img class="cms-cover" src="${escape(assetUrl(post.thumbnail_path))}" alt="${escape(post.thumbnail_alt)}">`:''}${d.publisher?`<p>출처: ${escape(d.publisher)}</p>`:''}${renderBlocks(post.content?.blocks)}${safeLink(d.source_url)?`<p><a class="button outline" href="${escape(safeLink(d.source_url))}" target="_blank" rel="noopener noreferrer">원문 보기 ↗</a></p>`:''}${d.journal?`<p>${escape(d.journal)} ${escape(d.year)}</p>`:''}${assets.filter(a=>a.kind==='pdf'&&(d.attachments||[]).includes(a.storage_path)).map(a=>`<p><a href="${escape(assetUrl(a.storage_path))}" target="_blank" rel="noopener noreferrer">${escape(a.original_name)} 다운로드 ↗</a></p>`).join('')}<p><a class="text-link" href="${post.category==='newsroom'?'/newsroom/':'/insights/'}">목록으로 돌아가기 →</a></p></article></div>`;}

export function optimizeImageHTML(html,variants={},card=false){
 return html.replace(/<img\b[^>]*>/g,tag=>{
  const match=tag.match(/\bsrc="([^"]+)"/);if(!match)return tag;
  const src=match[1].replaceAll('&amp;','&');let original=src;
  try{const u=new URL(src,'https://local');if(u.pathname==='/api/content')original=u.searchParams.get('path');}catch{}
  const variant=variants[original]||staticImageVariants[original];if(!variant?.body||!variant?.thumb)return card?tag.replace('loading="lazy"','loading="eager"'):tag;
  const selected=card?variant.thumb:variant.body;
  tag=tag.replace(/\s(?:src|srcset|sizes|width|height|loading|decoding)="[^"]*"/g,'');
  const url=v=>escape(assetUrl(v.path));
  return tag.replace(/>$/,` src="${url(selected)}" srcset="${url(variant.thumb)} ${variant.thumb.width}w${variant.body.width>variant.thumb.width?`, ${url(variant.body)} ${variant.body.width}w`:''}" sizes="${card?'(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw':'(max-width: 900px) 100vw, 900px'}" width="${selected.width}" height="${selected.height}" loading="${card?'eager':'lazy'}" decoding="async">`);
 });
}
