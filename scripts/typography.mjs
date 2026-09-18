// Keep official names together without changing their visible text.
export function keepOfficialNames(html){
 return html.split(/(<[^>]*>)/g).map((part,index)=>index%2?part:part.replace(/GMK®(?: ?추출물)?|도두On|Giunchan Co\., Ltd\./g, token=>`<span class="no-break">${token}</span>`)).join('').replace(/GMK(<sup class="registered-mark">®<\/sup>)( ?추출물)?/g,'<span class="no-break">GMK$1$2</span>');
}
