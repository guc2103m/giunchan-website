import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {test} from 'node:test';
import {noteDetail} from './note-detail.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await fs.readFile(path.join(root, 'content/note-image-overrides.json'), 'utf8'));
const posts = JSON.parse(await fs.readFile(path.join(root, 'content/gmk-notes.json'), 'utf8'));
const post = posts.find(item => item.slug === manifest.slug);

test('chaga post restores exactly its five locally stored body photos in source order', async () => {
  assert.ok(post, 'the target blog article exists');
  assert.equal(post.id, manifest.sourceId);
  assert.equal(post.blocks.filter(block => block.type === 'image').length, 5);
  assert.equal(manifest.images.length, 5);

  const imageAssets = [];
  for (const image of manifest.images) {
    const sourcePath = path.join(root, image.original);
    assert.ok((await fs.stat(sourcePath)).isFile(), `${image.original} is preserved locally`);
    const base = path.basename(image.original, path.extname(image.original));
    imageAssets.push({
      width: 773,
      height: base === '01-chaga-main' ? 514 : 577,
      alt: image.alt,
      caption: image.caption,
      body: {path: `/assets/optimized/note/${manifest.slug}/${base}-1600.webp`},
    });
  }

  const html = noteDetail(post, {slug: manifest.slug, images: imageAssets});
  const renderedBodyImages = [...html.matchAll(/<img src="([^\"]+)"/g)].map(match => match[1]);
  assert.deepEqual(renderedBodyImages, [imageAssets[0].body.path, ...imageAssets.map(asset => asset.body.path)]);
  assert.ok(html.includes(`href="${post.url.replaceAll('&', '&amp;')}"`), 'the original Naver article link remains');
  assert.ok(html.includes('← GMK 연구노트 목록으로'));
  for (const asset of imageAssets) {
    assert.ok(html.includes(`alt="${asset.alt}"`));
    assert.ok(html.includes(`<figcaption>${asset.caption}</figcaption>`));
  }
  assert.ok(!html.includes('flow-content.google'), 'expired temporary image URLs are absent');
});

test('the generated preview image variants reduce transfer size', async () => {
  for (const image of manifest.images) {
    const base = path.basename(image.original, path.extname(image.original));
    const source = await fs.stat(path.join(root, image.original));
    const variantPath = path.join(root, 'dist/assets/optimized/note', manifest.slug, `${base}-1600.webp`);
    const variant = await fs.stat(variantPath);
    assert.ok(variant.isFile());
    assert.ok(variant.size < source.size, `${base}: WebP is smaller than the original JPEG`);
  }
});
