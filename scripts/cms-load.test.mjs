import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {validateTree} from '../lib/content-document.mjs';
import {safeStyle,isSafeStyle,renderTree} from '../lib/content-tree.mjs';
const posts=JSON.parse(fs.readFileSync(new URL('../content/cms-migrations/editor-load-before.json',import.meta.url)));
test('all six current published documents validate without mutating original blocks',()=>{
 assert.equal(posts.length,6);
 for(const p of posts){const before=JSON.stringify(p.content.blocks);validateTree(p.content.blocks.filter(b=>['element','text'].includes(b.type)));assert.equal(JSON.stringify(p.content.blocks),before,p.slug);}
});
test('legacy image ratio remains represented, including safe whitespace and trailing semicolons',()=>{
 for(const style of ['aspect-ratio:1672 / 941',' aspect-ratio: 1672 / 941; ','color: #20362d; font-weight: 700;'])assert.equal(isSafeStyle(style),true,style);
 assert.match(renderTree({type:'element',tag:'img',attrs:{style:'aspect-ratio:1672 / 941'}}),/aspect-ratio:1672 \/ 941/);
});
test('executable CSS, unsupported properties and unsafe links remain blocked',()=>{
 for(const style of ['aspect-ratio:expression(alert(1))','aspect-ratio:1/0','background-image:url(javascript:alert(1))','color:red;position:fixed','color:red;behavior:evil']){
  assert.equal(isSafeStyle(style),false,style);
  assert.throws(()=>validateTree([{type:'element',tag:'p',attrs:{style},children:[]}]));
 }
 assert.throws(()=>validateTree([{type:'element',tag:'a',attrs:{href:'javascript:alert(1)'},children:[]} ]));
 assert.equal(safeStyle('aspect-ratio:1672 / 941'),'aspect-ratio:1672 / 941');
});
