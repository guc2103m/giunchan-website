import fs from 'node:fs';
const blocks=JSON.parse(fs.readFileSync(new URL('../content/individual-approval.json',import.meta.url),'utf8'));
const links=JSON.parse(fs.readFileSync(new URL('../content/individual-approval-links.json',import.meta.url),'utf8'));
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function individualArticle(){
 let html='<article class="individual-article" id="N03" data-content-id="N03"><nav class="article-toc" aria-label="글 목차"><h2>목차</h2><ol>'+blocks.slice(3,9).map((b,i)=>`<li><a href="#ingredient-section-${i+1}">${e(b.text.replace(/^\d+\. /,''))}</a></li>`).join('')+'</ol></nav>';
 for(let i=9;i<blocks.length;i++){
  const b=blocks[i],t=b.text;
  if(b.type==='table'){html+='<div class="table-wrap"><table><caption>고시형 원료와 개별인정형 원료 비교</caption>'+b.rows.map((r,j)=>'<tr>'+r.map(c=>`<${j?'td':'th scope="col"'}>${e(c)}</${j?'td':'th'}>`).join('')+'</tr>').join('')+'</table></div>';continue;}
  if(/^\d+\. /.test(t)){html+=`<h2 id="ingredient-section-${t[0]}">${e(t)}</h2>`;}
  else if(t.startsWith('Q.')){html+=`<details open><summary>${e(t)}</summary><p>${e(blocks[++i].text)}</p></details>`;}
  else if(i===20||i===30){const count=i===20?5:3;html+=`<ol class="${count===3?'article-process':'article-checks'}">`+blocks.slice(i,i+count).map(v=>`<li>${e(v.text)}</li>`).join('')+'</ol>';i+=count-1;}
  else if(t==='한눈에 정리하면'||t==='참고 자료'){html+=`<h2>${e(t)}</h2>`;}
  else if(t.startsWith('국가법령정보센터')||t.startsWith('식품안전나라')){html+=`<p><a class="text-link" href="${e(links[t.startsWith('국가')?0:1])}" target="_blank" rel="noopener noreferrer">${e(t)} ↗</a></p>`;}
  else html+=`<p class="${t.startsWith('※')?'article-notice':t.startsWith('작성')?'article-byline':''}">${e(t).replaceAll('\n','<br>')}</p>`;
 }
 return html+'<a class="text-link" href="/insights/">인사이트 목록으로 →</a></article>';
}
