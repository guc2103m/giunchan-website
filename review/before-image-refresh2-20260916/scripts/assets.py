from pathlib import Path
from PIL import Image
import json
ROOT=Path(__file__).resolve().parents[1]
SRC=ROOT.parent/'기운찬_개발인계_20260910/private-reference/assets'
mapping={'forest':'홈페이지메인_1920X900/1.jpg','research':'홈페이지메인_1920X900/2.jpg','culture':'홈페이지메인_1920X900/3.jpg','mycelium':'홈페이지메인_1920X900/4.jpg','nature':'홈페이지메인_1920X900/9.jpg','brand':'홈페이지서브_1920X620/브랜드1.png','gift':'제품이미지_1600X1600/1.png','concentrate':'제품이미지_1600X1600/2.png','immun':'제품이미지_1600X1600/3.png','tea':'제품이미지_1600X1600/4.png','spoon':'제품이미지_1600X1600/5.png','jelly':'제품이미지_1600X1600/6.png','drink':'제품이미지_1600X1600/7.png','bon':'제품이미지_1600X1600/8.png'}
mapping.update({'lab':'홈페이지메인_1920X900/10.jpg','petri':'홈페이지서브_1920X620/18.jpg','microscope':'홈페이지서브_1920X620/17.jpg','science':'홈페이지서브_1920X620/22.jpg','powder':'홈페이지메인_1920X900/7.jpg','brand-drink':'홈페이지서브_1920X620/브랜드2.png'})
for name,rel in mapping.items():
    im=Image.open(SRC/rel).convert('RGB'); im.thumbnail((1920,1200))
    im.save(ROOT/f'dist/assets/{name}.webp',quality=88)
im=Image.open(SRC/'기운찬회사로고.png').convert('RGBA')
im=im.crop(im.getbbox()); im.thumbnail((560,180)); im.save(ROOT/'dist/assets/logo.png')
im=Image.open(SRC/'도두On로고.png').convert('RGB');im.thumbnail((320,320));im.save(ROOT/'dist/assets/dodoon.webp',quality=90)
(ROOT/'review/asset-map.json').write_text(json.dumps(mapping,ensure_ascii=False,indent=2),encoding='utf-8')
print(f'{len(mapping)+2} optimized assets created. Original files preserved.')
