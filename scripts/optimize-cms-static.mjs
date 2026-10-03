import fs from 'node:fs/promises';import sharp from 'sharp';import crypto from 'node:crypto';
const posts=JSON.parse(await fs.readFile('content/cms-migrations/rich-editor-before.json','utf8'));
const paths=new Set();for(const p of posts){if(p.thumbnail_path?.startsWith('/assets/'))paths.add(p.thumbnail_path);const visit=n=>{if(n.tag==='img'&&n.attrs?.src?.startsWith('/assets/'))paths.add(n.attrs.src);(n.children||[]).forEach(visit);};p.content.blocks.forEach(visit);}
const result={},report=[];await fs.mkdir('dist/assets/optimized/cms',{recursive:true});
for(const path of paths){const original=await fs.readFile('dist'+path);const meta=await sharp(original).metadata();const hash=crypto.createHash('sha256').update(original).digest('hex').slice(0,16);const variants={original:{path,width:meta.width,height:meta.height,bytes:original.length}};
 for(const [name,width] of [['thumb',800],['body',1600]]){const {data,info}=await sharp(original).rotate().resize({width,withoutEnlargement:true}).webp({quality:90,smartSubsample:true}).toBuffer({resolveWithObject:true});const dest='/assets/optimized/cms/'+hash+'-'+width+'.webp';await fs.writeFile('dist'+dest,data);variants[name]={path:dest,width:info.width,height:info.height,bytes:data.length};}
 result[path]=variants;report.push(variants);
}
await fs.writeFile('lib/static-image-variants.mjs','export const staticImageVariants='+JSON.stringify(result)+';\n');await fs.writeFile('review/cms-static-image-comparison.json',JSON.stringify(report,null,2));console.log('Optimized '+paths.size+' images, originals preserved');
