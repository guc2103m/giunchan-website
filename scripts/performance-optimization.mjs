import fs from 'node:fs';
import path from 'node:path';

// Change transfer size only: retain original src, crop, alt text and SEO image URLs.
export function optimizePerformance(root) {
  const dist = path.join(root, 'dist');
  const entries = JSON.parse(fs.readFileSync(path.join(root, 'content/responsive-media.json'), 'utf8'));
  const fonts = JSON.parse(fs.readFileSync(path.join(root, 'content/performance-fonts.json'), 'utf8'));
  const routes = {dodoon:'business/brands/index.html', mushroom:'insights/are-mushrooms-plants/index.html', rnd:'rnd/gmk/index.html'};
  for (const item of entries) {
    for (const variant of item.variants) {
      if (!fs.existsSync(path.join(dist, variant.url))) throw new Error(`Missing responsive asset: ${variant.url}`);
    }
    const file = path.join(dist, routes[item.name]);
    const srcset = item.variants.map(v => `${v.url} ${v.width}w`).join(', ');
    let matches = 0;
    let html = fs.readFileSync(file, 'utf8').replace(/<img\b[^>]*>/g, tag => {
      if (!tag.includes(`src="${item.source}"`)) return tag;
      matches++;
      if (item.name === 'mushroom' && !tag.includes('style=')) tag = tag.replace(/>$/, ' style="aspect-ratio:1672 / 941">');
      return tag.replace(/\s(?:srcset|sizes)="[^"]*"/g, '').replace(/>$/, ` srcset="${srcset}" sizes="${item.sizes}">`);
    });
    if (matches !== 1) throw new Error(`Expected one LCP image for ${item.name}, found ${matches}`);
    const font = fonts[item.name];
    if (!fs.existsSync(path.join(dist, font.url))) throw new Error(`Missing page font: ${font.url}`);
    html = html.replace(/<link rel="preload" href="\/assets\/fonts\/subsets\/[^"]+" as="font" type="font\/woff2" crossorigin>/g, '').replace(/<style data-performance-font>[\s\S]*?<\/style>/g, '');
    const preload = `<link rel="preload" href="${font.url}" as="font" type="font/woff2" crossorigin>`;
    html = html.replace('<link rel="stylesheet" href="/style.css">', preload + '<link rel="stylesheet" href="/style.css">' + `<style data-performance-font>${font.css}</style>`);
    fs.writeFileSync(file, html);
  }
  const file = path.join(dist, 'style.css');
  const start = '/* PRETENDARD_UNICODE_START */';
  const end = '/* PRETENDARD_UNICODE_END */';
  const rules = fs.readFileSync(path.join(root, 'content/pretendard-subsets.css'), 'utf8').trim();
  const replacement = `${start}\n${rules}\n${end}`;
  let css = fs.readFileSync(file, 'utf8');
  if (css.includes(start)) css = css.slice(0, css.indexOf(start)) + replacement + css.slice(css.indexOf(end) + end.length);
  else {
    const original = /@font-face\{font-family:"Pretendard Variable";src:url\("\/assets\/fonts\/PretendardVariable\.woff2"\)[^}]*\}/;
    if (!original.test(css)) throw new Error('Original Pretendard font-face not found');
    css = css.replace(original, replacement);
  }
  fs.writeFileSync(file, css);
}
