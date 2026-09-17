// User-approved home-page copy and trademark presentation overrides.
export function formatHome(body){
  return body.split(/(<[^>]*>)/g).map((part,index)=>index%2?part:part
    .replaceAll('함께 접종','동시 접종')
    .replaceAll('GMK®','GMK<sup class="registered-mark">®</sup>')).join('');
}
