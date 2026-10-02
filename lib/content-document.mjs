import {tags,attrs,safeStyle,safeEditorialURL} from './content-tree.mjs';
// v2 retains the existing structured tree; no arbitrary HTML is persisted.
export function validateTree(nodes){
 let count=0;
 function visit(n,depth=0){
  if(++count>30000||depth>60)throw new Error('본문이 너무 복잡합니다.');
  if(n.type==='text'){if(typeof n.text!=='string')throw new Error('잘못된 본문');return;}
  if(n.type!=='element'||!tags.has(n.tag))throw new Error('지원하지 않는 본문 요소가 있습니다. 원문은 변경되지 않았습니다.');
  for(const [k,v] of Object.entries(n.attrs||{})){
   if(!attrs.has(k))throw new Error('허용하지 않는 본문 속성: '+k);
   if(['src','href','poster'].includes(k)&&!safeEditorialURL(v))throw new Error('안전하지 않은 링크 또는 이미지 주소');
   if(k==='style'&&safeStyle(v)!==v)throw new Error('지원하지 않는 글자 서식입니다.');
   if(k==='srcset'&&!String(v).split(',').every(x=>safeEditorialURL(x.trim().split(/\s+/)[0])))throw new Error('안전하지 않은 이미지 주소');
  }
  if((n.attrs?.class||'').split(/\s+/).includes('cms-gallery')){let images=0;const total=c=>{if(c.tag==='img')images++;(c.children||[]).forEach(total);};total(n);if(images>3)throw new Error('이미지 모음은 최대 3장입니다.');}
  for(const c of n.children||[])visit(c,depth+1);
 }
 nodes.forEach(n=>visit(n));return nodes;
}
export function referencedAssets(blocks,thumbnail,variants={}){
 const paths=new Set();
 const add=p=>{if(typeof p==='string'&&/^[a-f0-9-]{36}\/[a-zA-Z0-9_.-]+$/.test(p))paths.add(p);};
 const walk=n=>{add(n.path);if(n.attrs?.src){try{const u=new URL(n.attrs.src,'https://local');if(u.pathname==='/api/content')add(u.searchParams.get('path'));}catch{}}
  for(const c of n.children||[])walk(c);for(const c of n.images||[])walk(c);
 };blocks.forEach(walk);add(thumbnail);
 for(const p of [...paths])for(const v of Object.values(variants[p]||{}))if(v&&typeof v==='object')add(v.path);
 return [...paths];
}
export const seoulDate=value=>value?new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul'}).format(new Date(value)):'';
