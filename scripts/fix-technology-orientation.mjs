import { readFileSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';

// Correct only the EXIF display flag; preserve all compressed image pixels.
const input = new URL('../public/assets/heroes/technology-desktop.jpg', import.meta.url);
const output = new URL('../public/assets/heroes/technology-desktop-upright.jpg', import.meta.url);
const original = readFileSync(input);
const corrected = Buffer.from(original);
const exif = corrected.indexOf(Buffer.from('Exif\0\0'));
assert(exif > 0, 'Expected EXIF metadata');
const tiff = exif + 6;
const little = corrected.toString('ascii', tiff, tiff + 2) === 'II';
const u16 = offset => little ? corrected.readUInt16LE(offset) : corrected.readUInt16BE(offset);
const u32 = offset => little ? corrected.readUInt32LE(offset) : corrected.readUInt32BE(offset);
assert.equal(u16(tiff + 2), 42);
const directory = tiff + u32(tiff + 4);
let fixed = false;
for (let i = 0; i < u16(directory); i++) {
  const entry = directory + 2 + i * 12;
  if (u16(entry) !== 0x112) continue;
  assert.equal(u16(entry + 2), 3);
  assert.equal(u32(entry + 4), 1);
  assert.equal(u16(entry + 8), 8);
  if (little) corrected.writeUInt16LE(1, entry + 8);
  else corrected.writeUInt16BE(1, entry + 8);
  fixed = true;
}
assert(fixed, 'Expected orientation tag');
assert.equal(original.reduce((count, byte, i) => count + Number(byte !== corrected[i]), 0), 1);
writeFileSync(output, corrected, { flag: 'wx' });
console.log('Orientation 8 -> 1; exactly one metadata byte changed, compressed pixels unchanged.');
