const people=[
 ['이남욱','경영고문',['삼성전자 미주법인 대표','현) 베렉스 대표이사','현) 기운찬 경영고문'],[160,174,264,264]],
 ['장신환','경영고문',['원광대학교 교수','현) 기운찬 경영고문'],[795,157,265,265]],
 ['전용하','부대표',['전) 현대바이오 대표이사','전) iMAS 미국 대표이사','현) Global Marketing Association 대표','현) 기운찬 등기 이사'],[1392,158,260,260]],
 ['유영춘','기술고문',['일본 홋카이도대학 면역학 박사','건양대학교 의과대학 교수','건양대학교 의과대학원장','현) 기운찬 기술고문'],[159,492,265,265]],
 ['김기동','기술고문',['영국 University of Reading 생화학박사','IGC 인천글로벌캠퍼스 교수','현) Kapable F&C 대표','현) 기운찬 기술고문'],[795,492,265,265]],
 ['마루야마 히로유키','해외 투자·수출 고문',['일반사단법인 글로벌 기술자원 아카데미(GTRA) 이사장'],null]
];
export function companyPeople(){return `<style>
#C06 .company-people{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-bottom:48px}
#C06 .person-card{min-width:0;padding:28px;background:var(--white,#fff);border:1px solid var(--line);overflow-wrap:anywhere}
#C06 .person-portrait{display:block;width:190px;max-width:100%;height:auto;aspect-ratio:1;margin:0 auto 24px;border-radius:50%;overflow:hidden}
#C06 img.person-portrait{object-fit:cover;object-position:center 25%;filter:grayscale(1)}
#C06 .person-card h3{font-size:23px;line-height:1.45;margin:0 0 6px;color:var(--deep)}
#C06 .person-english{display:block;font-size:16px;font-weight:400}
#C06 .person-role{margin:0;color:var(--muted)}
#C06 .person-card ul{padding-left:20px;margin:20px 0 0;line-height:1.8}
#C06 .person-card li{margin:4px 0}
@media(max-width:1000px){#C06 .company-people{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:600px){#C06 .company-people{grid-template-columns:1fr;gap:20px}#C06 .person-card{padding:24px}}
#C06 .people-intro{margin:0 0 36px;max-width:850px;word-break:keep-all;overflow-wrap:anywhere}
#C06 .people-intro-lead{font-size:clamp(22px,2.2vw,28px);font-weight:600;line-height:1.5;color:var(--deep);margin:0 0 16px}
#C06 .people-intro-description{color:var(--muted);line-height:1.8;margin:0}
#C06 .people-bridge{margin:0 0 48px;padding:24px;text-align:center;background:var(--soft);color:var(--deep);font-size:clamp(18px,1.8vw,23px);font-weight:500;line-height:1.7;word-break:keep-all;overflow-wrap:anywhere}
@media(max-width:600px){#C06 .people-intro br,#C06 .people-bridge br{display:none}#C06 .people-bridge{padding:24px 16px}}
</style><div class="people-intro"><p class="people-intro-lead">기운찬이 지금까지 걸어올 수 있었던<br> 가장 큰 원동력은 사람입니다.</p><p class="people-intro-description">기운찬은 각 분야의 고문단과 리더, 연구진이 긴밀히 협력하며,<br> 자연의 가능성을 연구하는 기술과 과학을 함께 만들어가고 있습니다.</p></div><div class="company-people">${people.map(([name,role,bio,crop])=>`<article class="person-card">${crop?`<svg class="person-portrait" viewBox="${crop.join(' ')}" role="img" aria-label="${name} ${role} 사진"><image href="/assets/company-team-ir.jpg" width="2048" height="757" preserveAspectRatio="none"/></svg>`:`<img class="person-portrait" src="/assets/hiroyuki-maruyama.png" alt="마루야마 히로유키 해외 투자·수출 고문 사진" width="794" height="891" loading="lazy">`}<h3>${name}${!crop?'<span class="person-english" lang="en">(Hiroyuki Maruyama)</span>':''}</h3><p class="person-role">${role}</p><ul>${bio.map(s=>`<li>${s.replaceAll('&','&amp;')}</li>`).join('')}</ul></article>`).join('')}</div><p class="people-bridge">각기 다른 분야의 경험과 전문성은 연구 현장에서 쌓이는 관찰과 검증을 만나,<br> 기운찬의 다음 단계로 이어집니다.</p>`;}
