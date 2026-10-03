const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function inline(nodes){return (nodes||[]).map(n=>n.type==='text'?esc(n.text):n.type==='break'?'<br>':n.type==='link'?`<a href="${esc(n.url)}" target="_blank" rel="noopener noreferrer">${inline(n.children)}</a>`:n.type==='strong'||n.type==='em'?`<${n.type}>${inline(n.children)}</${n.type}>`:'').join('');}
function image(url,alt){return `<figure class="note-figure"><img src="${esc(url)}" alt="${esc(alt)}" loading="lazy" referrerpolicy="no-referrer"><figcaption hidden>원문 이미지를 불러오지 못했습니다. 하단 네이버 원문에서 확인해 주세요.</figcaption></figure>`;}
export function noteSummary(post){
 const text=n=>n.type==='text'?n.text:n.type==='break'?' ':(n.children||[]).map(text).join('');
 const first=post.blocks.filter(b=>b.type==='paragraph').map(text).map(t=>t.replace(/\s+/g,' ').trim()).find(t=>t.length>=35)||post.description;
 return first.length<=220?first:(first.match(/^[\s\S]{35,220}?[.!?](?=\s|$)/)?.[0]||first.slice(0,200)+'…');
}
export function noteDetail(post){
 const first=post.blocks.find(b=>b.type==='image');
 return `<article class="container note-detail"><header><p class="section-kicker">${esc(post.categories.join(' · '))}</p><h1>${esc(post.title)}</h1><p class="note-lead">${esc(noteSummary(post))}</p><time datetime="${esc(post.date)}">${new Date(post.date).toLocaleDateString('ko-KR',{timeZone:'Asia/Seoul',year:'numeric',month:'long',day:'numeric'})}</time></header>${image(post.image||first?.url,post.title+' 대표 이미지')}<div class="note-body">${post.blocks.map((b,i)=>b.type==='paragraph'?`<p>${inline(b.children)}</p>`:b.type==='image'?image(b.url,b.alt||`${post.title} 본문 이미지 ${post.blocks.slice(0,i+1).filter(x=>x.type==='image').length}`):b.type==='rule'?'<hr>':b.type==='table'?`<div class="note-table"><table>${b.rows.map(row=>`<tr>${row.map(c=>`<td colspan="${c.colspan}" rowspan="${c.rowspan}">${inline(c.children)}</td>`).join('')}</tr>`).join('')}</table></div>`:'').join('')}</div><footer class="note-source"><p>이 글은 기운찬 네이버 블로그 GMK연구노트의 기존 콘텐츠를 바탕으로 구성했습니다.</p><a class="text-link" href="${esc(post.url)}" target="_blank" rel="noopener noreferrer">네이버 블로그 원문 보기 →</a><a class="text-link" href="/gmk-note/">← GMK 연구노트 목록으로</a></footer></article>`;
}
