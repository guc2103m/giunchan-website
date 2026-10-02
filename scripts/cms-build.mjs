import fs from 'node:fs';
import path from 'node:path';
export function buildCMS(root){
 const dist=path.join(root,'dist');
 fs.copyFileSync(path.join(root,'lib/content-render.mjs'),path.join(dist,'cms-render.mjs'));
 fs.copyFileSync(path.join(root,'lib/content-config.mjs'),path.join(dist,'cms-config.mjs'));
 const slugs=[];
 for(const dir of ['insights','insights/press','newsroom'])for(const entry of fs.readdirSync(path.join(dist,dir),{withFileTypes:true}))if(entry.isDirectory()&&fs.existsSync(path.join(dist,dir,entry.name,'index.html')))slugs.push(entry.name);
 fs.writeFileSync(path.join(dist,'cms-reserved.json'),JSON.stringify([...new Set(slugs)]));
}
