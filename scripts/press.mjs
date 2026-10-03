import {newsroomCards,newsroomArticle,staticNewsroomPost} from '../lib/newsroom.mjs';
const e=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export const newsroomDescription='기운찬의 연구개발, GMK® 소재, 기업 활동과 사회공헌 관련 주요 Media 자료를 확인하세요.';
export const pressPath=p=>`/insights/press/${p.slug}/`;
export const sortPress=posts=>posts.map((p,i)=>({...p,_order:i})).sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt)||a._order-b._order);
export const articleTitle=p=>p.originalTitle||p.title;
const intro=p=>p.newsroomSummary||p.summary;
const notice='이 기사의 저작권은 해당 언론사에 있습니다. 전체 내용은 원문 기사에서 확인해 주세요.';
export function insightsContent(researchCards){return `<section class="section" data-content-id="N01"><div class="container"><section id="research-panel" aria-labelledby="research"><header class="insights-intro"><p class="section-kicker">RESEARCH INSIGHTS</p><h2 id="research" class="research-heading">연구자료</h2><p>버섯과 균사체, GMK<sup>®</sup> 소재와 식품에 관한 이야기를 이해하기 쉽게 정리합니다.</p></header><div class="insight-grid" id="article-list">${researchCards}</div><nav class="research-pagination" aria-label="연구자료 페이지" hidden></nav><p class="research-page-status" aria-live="polite"></p><div class="insights-admin-access"><a href="/admin/">관리자 로그인</a></div></section></div></section>`;}
export function newsroomContent(posts){return `<section class="section media-list-section"><div class="container"><header class="insights-intro"><p class="section-kicker">Media forum</p><h2 class="research-heading">미디어자료</h2><p>기운찬의 연구개발, GMK<sup>®</sup> 소재, 기업 활동과 사회공헌 관련 주요 Media 자료를 확인하세요.</p></header><div class="newsroom-grid" id="newsroom-list"><!--CMS_NEWSROOM_CARDS_START-->${newsroomCards(posts.map(staticNewsroomPost))}<!--CMS_NEWSROOM_CARDS_END--></div></div></section>`;}
export function pressDetail(p){
 return newsroomArticle(staticNewsroomPost(p));
}
export function pressMetadata(){return '';}
