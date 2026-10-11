import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeLineEndings,sha256} from './test-text-integrity.mjs';

const sameText=(a,b)=>normalizeLineEndings(Buffer.from(a)).equals(normalizeLineEndings(Buffer.from(b)));

test('text integrity normalizes only CRLF pairs',()=>{
 const lf='one\ntwo\n';const crlf='one\r\ntwo\r\n';
 assert.ok(sameText(lf,crlf));
 assert.ok(!sameText(lf,'one\nTWO\n'));
 assert.ok(!sameText('<p>one</p>','<div>one</div>'));
 assert.ok(!sameText('{"value":1}','{"value":2}'));
});

test('raw-byte snapshot digest continues to reject any byte mutation',()=>{
 const source=Buffer.from([0x7b,0x0a,0x7d]);const expected=sha256(source);
 assert.equal(sha256(source),expected);
 assert.notEqual(sha256(Buffer.from([0x7b,0x0a,0x20,0x7d])),expected);
});
