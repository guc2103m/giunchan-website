import {icon} from './visuals.mjs';
const entries = [
 {year:'2015',label:'CELL STUDY',title:'복합버섯균사체 세포시험',desc:'복합버섯균사체 소재의 가능성을 확인하기 위한 세포 수준의 연구를 시작했습니다.',items:['연구 대상: 간암·위암·폐암·신장암'],tags:['연구'],symbol:'culture'},
 {year:'2016–2017',label:'CELL & ANIMAL STUDY',title:'혈관형성 및 대사 관련 연구',desc:'복합버섯균사체의 혈관형성과 대사 관련 연구를 세포시험과 동물시험으로 확장했습니다.',items:['혈관형성 관련 연구','대사 관련 세포시험','동물시험'],tags:['연구','제품화'],symbol:'flask'},
 {year:'2018',label:'LIVER RESEARCH',title:'간 기능 관련 연구',desc:'복합버섯균사체의 간 조직과 관련한 세포시험 및 동물시험을 진행했습니다.',items:[],tags:['연구'],symbol:'search',patent:'후속 성과 · 2021년 특허 획득',patentNote:'관련 특허 등록일: 2021.05.07'},
 {year:'2019',label:'SAFETY STUDY',title:'안전성 연구',desc:'복합버섯균사체 소재의 안전성을 확인하기 위한 시험을 진행했습니다.',items:['복귀돌연변이시험','소핵시험','염색체이상시험','단회투여독성시험','28일 반복투여독성시험','90일 반복투여독성시험'],tags:['안전성'],symbol:'shield'},
 {year:'2020–2025',label:'COGNITIVE RESEARCH',title:'인지기능 관련 연구',desc:'복합버섯균사체와 인지기능 관련 연구를 세포 및 동물 수준에서 지속했습니다.',items:['인지기능 관련 연구','알츠하이머 관련 병리 연구','세포 및 동물시험','학술논문 발표'],tags:['연구','학술논문'],symbol:'network',patent:'2023년 특허 획득',patentNote:'관련 특허 등록일: 2023.09.01',parallel:true},
 {year:'2024–2026',label:'HUMAN STUDY',title:'GMK® 추출물 인체적용시험',desc:'GMK® 추출물의 인지기능 관련 인체적용시험을 진행하고 완료했습니다.',items:['총 175명 · 16주','무작위배정 대조시험','김천의료원 · 고려대학교 구로병원'],tags:['인체적용시험 완료'],symbol:'partners'}
];
const escape=s=>s.replaceAll('&','&amp;');
export function researchTimeline(){return `<section id="research-timeline" class="article-section visual-section" aria-labelledby="research-timeline-title">
 <div class="section-kicker">10 YEARS OF R&amp;D</div><h2 id="research-timeline-title">10년의 연구 발자취</h2>
 <div class="rt-intro"><p>기운찬은 복합버섯균사체 소재의 가능성을 확인하기 위해 세포시험과 동물시험, 안전성 연구, 인체적용시험으로 연구 범위를 확장해 왔습니다.</p><p>연구 결과는 특허와 학술논문에 그치지 않고 실제 제품화로 이어지고 있습니다.</p></div>
 <div class="rt-achievement"><strong>12<span>건</span></strong><div><h3>정부 중소기업 R&amp;D 지원사업 성공적 완료</h3><p>지금까지 정부 중소기업 R&amp;D 지원사업 12건을 성공적으로 마무리했습니다.</p></div></div>
 <ol class="rt-flow" aria-label="연구 성과가 확장되는 흐름">${['정부 R&D 과제','세포·동물 연구','안전성 연구','특허 획득','학술논문','제품화','인체적용시험'].map(t=>`<li>${escape(t)}</li>`).join('')}</ol>
 <ol class="rt-timeline" aria-label="연도별 연구 발자취">${entries.map((e,i)=>`<li class="rt-entry${i===entries.length-1?' rt-recent':''}"><article class="rt-card"><div class="rt-year">${e.year}</div><div class="rt-label">${escape(e.label)}</div><div class="rt-heading">${icon(e.symbol)}<h3>${e.title}</h3></div><p>${e.desc}</p>${e.items.length?`<ul class="rt-details">${e.items.map(t=>`<li>${t}</li>`).join('')}</ul>`:''}<div class="rt-tags">${e.tags.map(t=>`<span>${t==='제품화'?icon('box'):icon('check')}${t}${t==='제품화'?'<small lang="en">PRODUCTIZATION</small>':''}</span>`).join('')}</div>${e.patent?`<div class="rt-patent">${icon('document')}<div><strong>${e.patent}</strong><small>${e.patentNote}</small></div></div>`:''}${e.parallel?`<aside class="rt-parallel" aria-labelledby="parallel-study-title"><div class="rt-label">PARALLEL RESEARCH · 병행 연구</div><div class="rt-year">2021</div><h3 id="parallel-study-title">폐 관련 세포·동물 연구</h3><div class="rt-label">RESPIRATORY RESEARCH</div><p>복합버섯균사체를 활용한 폐 관련 세포시험과 동물시험을 진행했습니다.</p><div class="rt-tags"><span>${icon('box')}제품화 <small lang="en">PRODUCTIZATION</small></span></div></aside>`:''}</article></li>`).join('')}</ol>
 <div class="rt-summary"><h3>연구에서 제품화까지</h3><p>기운찬은 복합버섯균사체 소재에 대한 연구를 세포시험과 동물시험, 안전성 연구와 인체적용시험으로 확장해 왔습니다. 축적된 연구 결과는 특허와 학술논문, 제품화로 이어지고 있습니다.</p></div>
 </section>`;}
