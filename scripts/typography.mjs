// Keep official names together and render registered marks as superscripts.
// Native form controls and non-rendered code must remain plain text.
export function keepOfficialNames(html){
 return html.split(/(<(?:script|style|select|textarea)\b[^>]*>[\s\S]*?<\/(?:script|style|select|textarea)>)/gi).map((chunk,index)=>{
  if(index%2)return chunk;
  chunk=chunk.replace(/GMK(<sup class="registered-mark">®<\/sup>)( ?추출물)?/g,'<span class="no-break">GMK$1$2</span>');
  return chunk.split(/(<[^>]*>)/g).map((part,i)=>i%2?part:part.replace(/GMK®(?: ?추출물)?|도두On|Giunchan Co\., Ltd\./g,token=>`<span class="no-break">${token.replace('GMK®','GMK<sup class="registered-mark">®</sup>')}</span>`)).join('').replace(/GMK(<sup class="registered-mark">®<\/sup>)( ?추출물)?/g,'GMK$1$2');
 }).join('');
}
