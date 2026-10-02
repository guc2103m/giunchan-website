"""One-time, non-network backup/extraction. Never overwrite an existing backup."""
import json, re, shutil
from pathlib import Path
from html.parser import HTMLParser

class Tree(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root={'children':[]}; self.stack=[self.root]
    def handle_starttag(self,tag,attrs):
        n={'type':'element','tag':tag,'attrs':dict((k,v or '') for k,v in attrs),'children':[]}
        self.stack[-1]['children'].append(n)
        if tag not in ['img','br','source','meta','link','input','hr','wbr']: self.stack.append(n)
    def handle_endtag(self,tag):
        for i in range(len(self.stack)-1,0,-1):
            if self.stack[i].get('tag')==tag:
                self.stack=self.stack[:i]; break
    def handle_data(self,text): self.stack[-1]['children'].append({'type':'text','text':text})

def nodes(n):
    yield n
    for child in n.get('children',[]): yield from nodes(child)
def text(n): return n.get('text','')+''.join(text(c) for c in n.get('children',[]))

slugs=['food-label-guide','gmk-material','what-is-gmk','human-study-and-approval']
listing=Tree(); listing.feed(Path('dist/insights/index.html').read_text(encoding='utf-8'))
for slug in slugs:
    folder=Path('content/cms-migrations')/slug
    if folder.exists(): raise RuntimeError('Backup already exists: '+slug)
    folder.mkdir(parents=True)
    html=Path('dist/insights')/slug/'index.html'
    shutil.copyfile(html,folder/'original.html')
    page=Tree(); page.feed(html.read_text(encoding='utf-8')); allnodes=list(nodes(page.root))
    main=next(n for n in allnodes if n.get('tag')=='main')
    card=next(n for n in nodes(listing.root) if n.get('tag')=='article' and any(x.get('attrs',{}).get('href')=='/insights/'+slug+'/' for x in nodes(n)))
    headline=next(n for n in nodes(main) if n.get('tag')=='h1')
    img=next(n for n in nodes(card) if n.get('tag')=='img')
    dates=[n for n in allnodes if n.get('tag')=='time' or n.get('attrs',{}).get('property')=='article:published_time']
    if dates or re.search(r'"datePublished"',html.read_text(encoding='utf-8')): raise RuntimeError('Review source date first: '+slug)
    post={'title':text(headline),'slug':slug,'category':'research-data','status':'published','published_at':None,
          'summary':text(next(n for n in nodes(card) if n.get('tag')=='p')),'author':'주식회사 기운찬',
          'thumbnail_path':img['attrs']['src'],'thumbnail_alt':img['attrs'].get('alt',''),
          'seo_title':text(next(n for n in allnodes if n.get('tag')=='title')),
          'seo_description':next(n['attrs']['content'] for n in allnodes if n.get('attrs',{}).get('name')=='description'),
          'content':{'blocks':main['children']},
          'details':{'ever_published':True,'migration':{'source':'static','version':2,'slug':slug,'layout':'main','date_unknown':True},
                     'card_title':text(next(n for n in nodes(card) if n.get('tag')=='h3'))}}
    (folder/'post.json').write_text(json.dumps(post,ensure_ascii=False,indent=2),encoding='utf-8')
    (folder/'db-before.json').write_text('[]\n',encoding='utf-8')
    inventory={k:sum(n.get('tag')==k for n in nodes(main)) for k in ['img','video','table','caption','a','sup','details','h1','h2','h3']}
    inventory['text']=text(main)
    (folder/'inventory.json').write_text(json.dumps(inventory,ensure_ascii=False,indent=2),encoding='utf-8')
    print(slug,{k:v for k,v in inventory.items() if k!='text'})
