from pathlib import Path
import shutil
root=Path(__file__).resolve().parents[1]
src=Path('C:/Users/coqqu/Downloads/ChatGPT Image 2026년 9월 10일 오후 02_48_39.png')
shutil.copy2(src,root/'dist/assets/gmk-applications.png')
p=root/'scripts/build.mjs'
s=p.read_text(encoding='utf-8')
start=s.index("${infographic('culture')}<div class=\"status-row\">")
end=s.index("`,'soft')+",start)
s=s[:start]+'''<figure class="gmk-applications"><img src="/assets/gmk-applications.png" width="2169" height="725" loading="lazy" alt="현재 활용: 식품 원료·제품. 진행 중: 건강기능식품 원료 인정 절차. 향후 검토: 제약·화장품·동물사료."></figure>'''+s[end:]
p.write_text(s,encoding='utf-8')
print('Home production diagram and status text replaced with supplied image.')
