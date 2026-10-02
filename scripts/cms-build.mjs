import {migratedSlugs} from '../lib/content-migrations.mjs';
import fs from 'node:fs';
import path from 'node:path';
export function buildCMS(root){
 const dist=path.join(root,'dist');
 fs.copyFileSync(path.join(root,'lib/content-render.mjs'),path.join(dist,'cms-render.mjs'));
 fs.copyFileSync(path.join(root,'lib/content-config.mjs'),path.join(dist,'cms-config.mjs'));
 fs.copyFileSync(path.join(root,'lib/content-tree.mjs'),path.join(dist,'content-tree.mjs'));
 const slugs=[];
 for(const dir of ['insights','insights/press','newsroom'])for(const entry of fs.readdirSync(path.join(dist,dir),{withFileTypes:true}))if(entry.isDirectory()&&fs.existsSync(path.join(dist,dir,entry.name,'index.html')))slugs.push(entry.name);
 fs.writeFileSync(path.join(dist,'cms-reserved.json'),JSON.stringify([...new Set(slugs)]));
 // Keep server templates separate from public media so file tracing cannot bundle all assets.
 const runtime=path.join(root,'.cms-runtime');
 fs.mkdirSync(runtime,{recursive:true});
 function copyHTML(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  const source=path.join(dir,entry.name);if(entry.isDirectory())copyHTML(source);
  else if(entry.name.endsWith('.html')){const target=path.join(runtime,path.relative(dist,source));fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(source,target);}
 }}
 for(const dir of ['insights','newsroom'])copyHTML(path.join(dist,dir));
 for(const name of ['404.html','sitemap.xml','cms-reserved.json'])fs.copyFileSync(path.join(dist,name),path.join(runtime,name));
 // Vercel serves matching static files before rewrites. Keep list templates in the
 // runtime bundle, but omit public list index files on Vercel so requests reach SSR.
 if(process.env.VERCEL){for(const file of ['insights/index.html','newsroom/index.html','sitemap.xml',...migratedSlugs.map(slug=>`insights/${slug}/index.html`)])fs.unlinkSync(path.join(dist,file));}
}
