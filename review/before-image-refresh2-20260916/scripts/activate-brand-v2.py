from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[1]
source=Path('C:/Users/coqqu/.codex/generated_images/01a0851c-6926-7a90-81f8-d2bdbacd9731')
for name,target in [('exec-071cf763-40ee-414b-8ba0-3ccabf384581.png','dodoon-hyphae'),('exec-6cfe9f41-b936-49e4-b4dd-8be7a320d01d.png','dodoon-liquid-culture')]:
 Image.open(source/name).convert('RGB').save(root/'dist/assets'/f'{target}.webp',quality=90)
p=root/'scripts/build.mjs';s=p.read_text(encoding='utf-8').replace("from './brand-story.mjs'", "from './brand-story-v2.mjs'").replace('href="/brand-story.css"','href="/brand-story-v2.css"')
needle="write(brandUrl,'도두On 브랜드·제품',brandStory(productCards(),renderBlocks(publicBlocks('P09').filter(b=>b.type==='table'))),'brand-page');"
replacement="""write(brandUrl,'도두On 브랜드·제품',brandStory(),'brand-page');
write('/products/','도두On 제품',subhero('도두On 제품에 담긴 GMK®','DODOON','도두On의 제품에는 제품의 특성에 맞게 기운찬의 복합버섯균사체 소재 GMK® 또는 GMK® 추출물이 담깁니다.','gift')+`<section class="section"><div class="container" id="products">${productCards()}<details><summary>제품 비교·구매 안내</summary>${renderBlocks(publicBlocks('P09').filter(b=>b.type==='table'))}<p>제품의 구성과 판매정보는 공식 판매처에서 확인하실 수 있습니다.</p>${link('제품 구성·구매 문의','/contact/?type=consumer')}</details></div></section>`);
"""
assert needle in s
s=s.replace(needle,replacement).replace("const routeUrls=['/',", "const routeUrls=['/products/','/',")
# Keep existing incoming #products links valid while forwarding them to the preserved list.
s=s.replace("brandStory(),'brand-page'", "brandStory()+'<script>if(location.hash===\"#products\")location.replace(\"/products/\");</script>','brand-page'")
p.write_text(s,encoding='utf-8')
