from pathlib import Path
import json,re,html,sys
from html.parser import HTMLParser
root=Path(__file__).resolve().parents[1]
class Text(HTMLParser):
    def __init__(self): super().__init__();self.out=[]
    def handle_data(self,data):self.out.append(data)
def norm(s):return ''.join(c for c in html.unescape(s) if c.isalnum()).lower()
raw=json.loads((root/'content/scenario.json').read_text(encoding='utf-8'))
coverage=json.loads((root/'review/content-coverage.json').read_text(encoding='utf-8'))
sys.stdout.reconfigure(encoding='utf-8')
issues=[];presentation_changes=[]
for item in coverage:
    if not item['urls'] or item['id'].startswith(('E','CT')) or item['id'] in ['P09','N01']:continue
    for url in item['urls']:
        parser=Text();parser.feed((root/'dist'/url.strip('/')/'index.html').read_text(encoding='utf-8'));page=norm(' '.join(parser.out))
        for block in raw[item['id']]['blocks']:
            if block['type']=='table':parts=[cell for row in block['rows'] for cell in row]
            else:parts=[block['text']]
            for text in parts:
                if re.match(r'^(화면\s*[:：]|버튼\s*[:：]|편집 메모|출처 메모|※)',text) or 'https://doi.org/' in text or text=='브랜드 로고와 핵심 메시지를 중심으로 구성합니다.':continue
                if norm(text) not in page:
                    if item['id']=='H02' and text.startswith('2015 설립'):
                        presentation_changes.append({'id':'H02','reason':'성과 수치를 네 개 카드의 숫자·라벨로 분리 배치'})
                    elif text.startswith('논문명:') and norm(text[4:]) in page:
                        presentation_changes.append({'id':item['id'],'reason':'논문명을 카드 제목으로 표시하며 논문명 접두어 생략; 제목 원문 유지'})
                    else:issues.append({'id':item['id'],'url':url,'text':text})
(root/'review/content-audit.json').write_text(json.dumps(issues,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(issues,ensure_ascii=False,indent=2))
(root/'review/presentation-changes.json').write_text(json.dumps(presentation_changes,ensure_ascii=False,indent=2),encoding='utf-8')
