from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET
import json
from PIL import Image

root = Path(__file__).resolve().parents[1]
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
with ZipFile('C:/Users/coqqu/Downloads/개별인정형_원료란_블로그원고.docx') as z:
    body = ET.fromstring(z.read('word/document.xml')).find('w:body', ns)
    blocks = []
    for el in body:
        if el.tag.endswith('}p'):
            text = ''.join('\n' if t.tag.endswith('}br') else (t.text or '') for t in el.iter() if t.tag.endswith('}t') or t.tag.endswith('}br'))
            if text.strip(): blocks.append({'type': 'paragraph', 'text': text.strip()})
        elif el.tag.endswith('}tbl'):
            blocks.append({'type': 'table', 'rows': [[''.join(t.text or '' for t in c.findall('.//w:t', ns)) for c in r.findall('w:tc', ns)] for r in el.findall('w:tr', ns)]})
    rels = z.read('word/_rels/document.xml.rels').decode()
    links = [r.attrib['Target'] for r in ET.fromstring(rels) if r.attrib.get('TargetMode') == 'External']
(root/'content/individual-approval-links.json').write_text(json.dumps(links, ensure_ascii=False), encoding='utf-8')
(root/'content/individual-approval.json').write_text(json.dumps(blocks, ensure_ascii=False, indent=2), encoding='utf-8')
for source, target in [('복합버섯균사체GMK.png','insight-gmk'),('개별인정형원료란.png','insight-individual-approval')]:
    Image.open(Path('C:/Users/coqqu/Downloads/썸네일이미지')/source).convert('RGB').save(root/'dist/assets'/f'{target}.webp', quality=90)
print('Imported article and two thumbnails.')
