from pathlib import Path
import sys,shutil,subprocess
from PIL import Image
root=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(root/'.tools'))
import imageio_ffmpeg
assets=root/'dist/assets'
source=Path('C:/Users/coqqu/Downloads/복합배양_원본.gif')
shutil.copy2(source,assets/'co-cultivation-original.gif')
with Image.open(source) as im:
 im.seek(0)
 im.convert('RGB').save(assets/'co-cultivation-poster.webp',quality=92)
subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-y','-i',str(source),'-an','-c:v','libx264','-crf','23','-pix_fmt','yuv420p','-vf','scale=trunc(iw/2)*2:trunc(ih/2)*2','-movflags','+faststart',str(assets/'co-cultivation.mp4')],check=True,capture_output=True)
p=root/'scripts/visuals.mjs';s=p.read_text(encoding='utf-8')
s=s.replace("${photo('petri','함께 자라나는 배양 소재')}",'''<figure class="editorial-photo culture-animation"><video autoplay loop muted playsinline preload="metadata" poster="/assets/co-cultivation-poster.webp" width="600" height="338" aria-label="서로 다른 버섯균사체가 함께 성장하고 확장되는 복합배양 개념 영상"><source src="/assets/co-cultivation.mp4" type="video/mp4"><img src="/assets/co-cultivation-original.gif" alt="서로 다른 버섯균사체가 함께 성장하고 확장되는 복합배양 개념 영상"></video><figcaption>복합배양 과정을 이해하기 쉽게 표현한 시각자료</figcaption></figure>''')
p.write_text(s,encoding='utf-8')
with (root/'dist/visual.css').open('a',encoding='utf-8') as f:
 f.write('\n#RG02 .culture-animation video{display:block;width:100%;height:340px;object-fit:contain;background:#f4f7f3}@media(max-width:700px){#RG02 .culture-animation video{height:260px}}\n')
p=root/'scripts/serve.mjs';s=p.read_text(encoding='utf-8').replace("'.png':'image/png'","'.mp4':'video/mp4','.gif':'image/gif','.png':'image/png'");p.write_text(s,encoding='utf-8')
print('GIF bytes:',source.stat().st_size,'MP4 bytes:',(assets/'co-cultivation.mp4').stat().st_size)
