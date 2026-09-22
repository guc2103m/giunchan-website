import contactHandler from '../api/contact.js';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const types={'.woff2':'font/woff2','.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mp4':'video/mp4','.gif':'image/gif','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
http.createServer((req,res)=>{
 let url;try{url=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);return res.end();}
 if(url==='/api/contact'||url==='/api/contact/'){contactHandler(req,res).catch(()=>{if(!res.writableEnded){res.writeHead(500);res.end('{"ok":false}');}});return;}
 if(url==='/rnd/quality/'||url==='/rnd/quality'){res.writeHead(308,{'Location':'/business/development/'});return res.end();}
 let file=path.resolve(root,'.'+url);
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);return res.end();}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 let status=200;if(!fs.existsSync(file)){file=path.join(root,'404.html');status=404;}
 if(!fs.existsSync(file)){res.writeHead(404);return res.end('Not found');}
 res.writeHead(status,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow'});
 fs.createReadStream(file).pipe(res);
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
