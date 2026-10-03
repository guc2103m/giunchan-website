import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export async function buildNoteAssets(root) {
  const manifest = JSON.parse(await fs.readFile(path.join(root, 'content/note-image-overrides.json'), 'utf8'));
  const output = [];
  for (const image of manifest.images) {
    const sourcePath = path.join(root, image.original);
    const metadata = await sharp(sourcePath).metadata();
    if (!metadata.width || !metadata.height) throw new Error(`Invalid note image: ${image.original}`);
    const name = path.basename(image.original, path.extname(image.original));
    const variants = {};
    for (const [variant, maxWidth] of [['thumb', 800], ['body', 1600]]) {
      const { data, info } = await sharp(sourcePath)
        .rotate()
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality: 86, smartSubsample: true })
        .toBuffer({ resolveWithObject: true });
      const relative = `/assets/optimized/note/${manifest.slug}/${name}-${maxWidth}.webp`;
      const destination = path.join(root, 'dist', relative.slice(1));
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.writeFile(destination, data);
      variants[variant] = { path: relative, width: info.width, height: info.height, bytes: data.length };
    }
    const sourceCopy = `/assets/blog/${manifest.slug}/${path.basename(image.original)}`;
    const sourceDestination = path.join(root, 'dist', sourceCopy.slice(1));
    await fs.mkdir(path.dirname(sourceDestination), { recursive: true });
    await fs.copyFile(sourcePath, sourceDestination);
    output.push({
      original: image.original,
      source: sourceCopy,
      width: metadata.width,
      height: metadata.height,
      originalBytes: (await fs.stat(sourcePath)).size,
      alt: image.alt,
      caption: image.caption,
      ...variants,
    });
  }
  return { slug: manifest.slug, cardImage: manifest.cardImage, images: output };
}
