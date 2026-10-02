import fs from 'node:fs';
import path from 'node:path';
// Original assets remain immutable. Apply only vetted derivative URL substitutions.
export function optimizeMediaReferences(root){
 const dist=path.join(root,'dist');
 const entries=JSON.parse(fs.readFileSync(path.join(root,'content/media-optimized.json'),'utf8'));
 for(const item of entries){if(!fs.existsSync(path.join(dist,item.target)))throw new Error(`Missing optimized asset: ${item.target}`);}
 function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory()){walk(p);continue;}if(!/\.(html|css|js)$/.test(e.name))continue;
 const original=fs.readFileSync(p,'utf8');let text=original;
 for(const {source,target} of entries){text=text.replaceAll(source,target);text=text.replaceAll(encodeURI(source),encodeURI(target));}
 // Keep explicit original-download links pointing to the unchanged original.
 for(const {source,target} of entries){if(source.endsWith('.mp4'))text=text.replaceAll(`href="${target}"`,`href="${source}"`);}
 // A hero displayed immediately must not wait for lazy-load scheduling.
 if(e.name.endsWith('.html'))text=text.replace(/(<section\b[^>]*class="[^"]*sub-hero[^"]*"[^>]*>[\s\S]*?)(<img\b[^>]*>)/g,(_,prefix,img)=>prefix+img.replace(/loading="lazy"/,'loading="eager"').replace(/(?<!fetchpriority="high")>$/,(img.includes('fetchpriority=')?'':' fetchpriority="high"')+'>'));
 if(text!==original)fs.writeFileSync(p,text);
 }}walk(dist);
}
