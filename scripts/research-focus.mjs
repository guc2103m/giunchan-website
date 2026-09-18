import {icon} from './visuals.mjs';

const stages = [
  {en:'In Vitro',ko:'세포시험',sub:'CELL-BASED STUDY',icon:'culture',items:['ROS 활성산소 억제','Aβ 응집 차단','신경세포 생존 증가']},
  {en:'In Vivo',ko:'동물시험',sub:'ANIMAL STUDY',icon:'flask',items:['Y-maze 공간기억 증가','GFAP/Iba-1 억제','타우 독성 완화']},
  {en:'Human',ko:'인체적용시험',sub:'HUMAN STUDY',icon:'partners',items:['175명 대상','16주 무작위배정 대조시험','인지기능 관련 지표 평가','인체적용시험 완료']},
  {en:'MFDS Recognition Process',ko:'개별인정형 원료 인정 절차',sub:'REGULATORY PROCESS',icon:'document',items:['인체적용시험 완료','관련 연구자료 정리','인정 절차 진행']}
];
const arrow = '<svg class="focus-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h17m-6-6 6 6-6 6"/></svg>';
export function researchFocus() {
  return `<section class="article-section visual-section" id="R03" data-content-id="R03" aria-labelledby="research-focus-title">
    <div class="section-kicker">CURRENT R&amp;D FOCUS</div>
    <h2 id="research-focus-title">현재 기운찬 중점 연구현황</h2>
    <p class="focus-intro">기운찬은 세포시험과 동물시험에서 확인한 연구 결과를 인체적용시험으로 확장했으며, 현재 식약처 개별인정형 원료 인정을 위한 절차를 수행하고 있습니다.</p>
    <ol class="focus-stages" aria-label="4단계 연구 흐름">${stages.map((s,i)=>`<li class="focus-stage${i===3?' is-current':''}"${i===3?' aria-current="step"':''}>
      <div class="focus-stage-top"><span>STAGE 0${i+1}</span><span class="focus-status">${i<3?icon('check'):icon('clock')}${i<3?'COMPLETED':'IN PROGRESS'}</span></div>
      <div class="focus-symbol">${icon(s.icon)}</div>
      <div class="focus-title"><h3><span lang="en">${s.en}</span><span>${s.ko}</span></h3><div class="focus-subtitle" lang="en">${s.sub}</div></div>
      <div class="focus-details">${i===3?'<p class="focus-current">현재 진행 중</p><p class="focus-description">식약처 ‘개별인정형 원료 인정’을 위한 절차를 수행하고 있습니다.</p>':''}<ul>${s.items.map(t=>`<li>${t}</li>`).join('')}</ul></div>
      ${i<3?arrow:''}
    </li>`).join('')}</ol>
    <div class="focus-continuity">${icon('network')}<strong lang="en">RESEARCH CONTINUITY</strong><p>세포시험과 동물시험에서 인체적용시험으로 연구를 확장했으며, 현재 식약처 개별인정형 원료 인정을 위한 절차를 이어가고 있습니다.</p></div>
    <div class="actions"><a class="button outline" href="/rnd/evidence/"><span class="button-label">인체적용시험 요약</span><span aria-hidden="true">↗</span></a></div>
  </section>`;
}
