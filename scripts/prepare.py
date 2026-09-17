from pathlib import Path
import zipfile, xml.etree.ElementTree as ET, json, re
from PIL import Image, ImageOps, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[1]
REF=ROOT.parent/'기운찬_개발인계_20260910/private-reference'
NS={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
with zipfile.ZipFile(next((REF/'scenario').glob('*.docx'))) as z:
    body=ET.fromstring(z.read('word/document.xml')).find('w:body',NS)
def txt(e): return ''.join(e.itertext()) if False else ''.join(n.text or '' for n in e.findall('.//w:t',NS))
sections={}; current=None; lines=[]
for node in body:
    if node.tag.endswith('}p'):
        t=txt(node).strip()
        if not t: continue
        lines.append(t)
        m=re.match(r'^([A-Z]+\d{2})\.\s*(.*)',t)
        if m:
            current=m[1];sections[current]={'id':current,'title':m[2],'blocks':[]}
        elif re.match(r'^[A-Z][A-Z ]+\s{2}',t): current=None
        elif current: sections[current]['blocks'].append({'type':'paragraph','text':t})
    elif node.tag.endswith('}tbl'):
        rows=[[txt(c) for c in row.findall('w:tc',NS)] for row in node.findall('w:tr',NS)]
        lines.extend(' | '.join(r) for r in rows)
        if current: sections[current]['blocks'].append({'type':'table','rows':rows})
(ROOT/'content/scenario.json').write_text(json.dumps(sections,ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'review/scenario-extracted.txt').write_text('\n'.join(lines),encoding='utf-8')
font=ImageFont.truetype('C:/Windows/Fonts/malgun.ttf',16)
for group,folder in [('products','제품이미지_1600X1600'),('main','홈페이지메인_1920X900'),('sub','홈페이지서브_1920X620')]:
    paths=sorted((REF/'assets'/folder).glob('*'))
    sheet=Image.new('RGB',(1000,((len(paths)+3)//4)*185),'#ececec');d=ImageDraw.Draw(sheet)
    for i,p in enumerate(paths):
        im=Image.open(p).convert('RGB');im.thumbnail((244,145))
        x=(i%4)*250;y=(i//4)*185
        sheet.paste(im,(x+(244-im.width)//2,y))
        d.text((x+5,y+148),p.stem[:18],font=font,fill='black')
    sheet.save(ROOT/f'review/{group}-sheet.jpg')
print(f'{len(sections)} sections extracted; tables preserved; three contact sheets ready.')
