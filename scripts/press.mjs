import {newsroomCards,staticNewsroomPost} from '../lib/newsroom.mjs';
const e=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export const newsroomDescription='기운찬의 연구개발, GMK® 소재, 기업 활동과 사회공헌 관련 주요 언론보도를 확인하세요.';
export const pressPath=p=>`/insights/press/${p.slug}/`;
export const sortPress=posts=>posts.map((p,i)=>({...p,_order:i})).sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt)||a._order-b._order);
export const articleTitle=p=>p.originalTitle||p.title;
const intro=p=>p.newsroomSummary||p.summary;
const notice='이 기사의 저작권은 해당 언론사에 있습니다. 전체 내용은 원문 기사에서 확인해 주세요.';
export function insightsContent(researchCards){return `<section class="section" data-content-id="N01"><div class="container"><section id="research-panel" aria-labelledby="research"><h2 id="research" class="research-heading">연구자료</h2><div class="insight-grid" id="article-list">${researchCards}</div><nav class="research-pagination" aria-label="연구자료 페이지" hidden></nav><p class="research-page-status" aria-live="polite"></p><div class="insights-admin-access"><a href="/admin/">관리자 로그인</a></div></section></div></section>`;}
export function newsroomContent(posts){return `<div class="newsroom container"><header class="newsroom-heading"><div class="eyebrow">NEWSROOM</div><h1>뉴스룸</h1><p>${newsroomDescription}</p></header><div class="newsroom-grid" id="newsroom-list">${newsroomCards(posts.map(staticNewsroomPost))}</div></div>`;}
export function pressDetail(p){
 const links=[...(p.sourceLinks||[])];if(p.originalArticleUrl&&!links.some(l=>l.url===p.originalArticleUrl))links.push({label:p.publisher,url:p.originalArticleUrl});
 const papers=links.filter(l=>new URL(l.url).hostname==='doi.org');
 const articles=links.filter(l=>new URL(l.url).hostname!=='doi.org'&&!new URL(l.url).hostname.endsWith('guc.co.kr'));
 return `<article class="newsroom-detail container"><header><time datetime="${e(p.publishedAt)}">${e(p.publishedAt.replaceAll('-','.'))}</time><h1>${e(articleTitle(p))}</h1><p class="newsroom-byline">${e(p.publisher)}${p.reporter?` · ${e(p.reporter)} 기자`:''}</p></header><p class="newsroom-intro">${e(intro(p))}</p><div class="newsroom-links">${articles.map(l=>`<div>${articles.length>1?`<p>${e(l.label)}</p>`:''}<a class="button" href="${e(l.url)}" target="_blank" rel="noopener noreferrer" aria-label="${e(l.label)} 언론사 원문 기사 보기">언론사 원문 기사 보기 ↗</a></div>`).join('')}${papers.map(l=>`<a class="button outline" href="${e(l.url)}" target="_blank" rel="noopener noreferrer">관련 논문 보기 ↗</a>`).join('')}</div><p class="newsroom-copyright">${notice}</p><a class="text-link newsroom-back" href="/newsroom/">뉴스룸으로 돌아가기 →</a></article>`;
}
export function pressMetadata(){return '';}
