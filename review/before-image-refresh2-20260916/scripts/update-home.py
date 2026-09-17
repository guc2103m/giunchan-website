from pathlib import Path
from PIL import Image
import shutil
root=Path(__file__).resolve().parents[1]
src=Path('C:/Users/coqqu/OneDrive/Desktop/홈페이지개편/차가, 상황, 영지버섯과 세가지 버섯의 복합버섯균사체 이미지1.png')
shutil.copy2(src,root/'content/gmk-material-original.png')
im=Image.open(src).convert('RGB')
im.save(root/'dist/assets/gmk-material.webp',quality=92)
p=root/'scripts/build.mjs'
s=p.read_text(encoding='utf-8')
assert 'import {formatHome}' not in s
s="import {formatHome} from './home-format.mjs';\n"+s
s=s.replace("function write(url,title,body,cl=''){let f=","function write(url,title,body,cl=''){if(url==='/')body=formatHome(body);let f=")
old="picture('research','배양된 균사체를 살펴보는 연구 이미지')"
assert old in s
s=s.replace(old,"picture('gmk-material','버섯과 곡물배지의 균사체를 표현한 이미지','gmk-material-image')",1)
p.write_text(s,encoding='utf-8')
print('Home edits applied; original image preserved.')
