import {execFileSync} from 'node:child_process';
import crypto from 'node:crypto';

// Preserve every byte except the platform-specific CRLF pair. No whitespace,
// markup, encoding, or JSON transformations are performed.
export function normalizeLineEndings(bytes){
 if(Buffer.isBuffer(bytes))return Buffer.from(bytes.toString('latin1').replace(/\r\n/g,'\n'),'latin1');
 return Buffer.from(String(bytes).replace(/\r\n/g,'\n'),'utf8');
}

export function gitBlob(path){
 return execFileSync('git',['show',`HEAD:${path}`],{maxBuffer:32*1024*1024});
}

export function sha256(bytes){return crypto.createHash('sha256').update(bytes).digest('hex');}

export function assertWorkingTextMatchesGitBlob(path,workingBytes){
 const expected=gitBlob(path);
 if(!normalizeLineEndings(workingBytes).equals(normalizeLineEndings(expected)))
  throw new Error(`${path} differs from its committed text beyond CRLF/LF line endings`);
 return expected;
}
