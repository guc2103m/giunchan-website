const image=(src,alt,caption)=>`<figure class="article-visual"><img src="/assets/${src}" alt="${alt}" width="1536" height="1024" loading="lazy" decoding="async"><figcaption>${caption}</figcaption></figure>`;

export function myceliumArticle(){
 return `<article class="individual-article mycelium-article" id="N02" data-content-id="N02">
  <nav class="article-toc" aria-label="글 목차"><h2>목차</h2><ol>
   <li><a href="#mycelium-section-1">버섯균사체란?</a></li><li><a href="#mycelium-section-2">균사와 균사체는 무엇이 다를까요?</a></li><li><a href="#mycelium-section-3">균사체와 버섯은 어떻게 다를까요?</a></li><li><a href="#mycelium-section-4">균사체는 자연에서 어떤 역할을 할까요?</a></li><li><a href="#mycelium-section-5">버섯균사체는 어떻게 배양할까요?</a></li><li><a href="#mycelium-section-6">기운찬이 버섯균사체를 연구하는 이유</a></li><li><a href="#mycelium-section-7">자주 묻는 질문</a></li>
  </ol></nav>
  <p>우리가 흔히 ‘버섯’이라고 부르는 것은 버섯 생물 전체가 아니라 눈에 보이는 일부분입니다. 땅속이나 나무, 낙엽과 같은 기질 안에는 가느다란 실 모양의 균사가 넓게 퍼져 있습니다.</p>
  <p>이 균사들이 서로 연결되어 만들어진 것이 바로 ‘버섯균사체’입니다. 오늘은 버섯균사체가 무엇인지, 우리가 먹는 버섯과는 어떻게 다른지, 식품 소재로 활용하기 위해서는 어떤 연구가 필요한지 쉽게 알아보겠습니다.</p>
  ${image('insight-mycelium-hero.png','숲속 통나무와 땅속으로 이어지는 버섯균사체','눈에 보이는 버섯 아래에는 균사체가 넓게 이어져 있습니다.')}
  <h2 id="mycelium-section-1">1. 버섯균사체란?</h2>
  <p>버섯균사체는 가느다란 실 모양의 균사들이 자라고 서로 연결되면서 형성된 버섯의 영양기관입니다.</p>
  <p>쉽게 말하면 균사는 버섯을 이루는 하나하나의 가는 실이고, 균사체는 수많은 균사가 모여 만들어진 그물망 형태의 몸체입니다.</p>
  <p>흔히 균사체를 식물의 뿌리에 비유하지만 실제 뿌리는 아닙니다. 균사체는 주변의 유기물을 분해해 영양분을 흡수하고, 성장에 필요한 물질을 이동시키는 역할을 합니다.</p>
  <h2 id="mycelium-section-2">2. 균사와 균사체는 무엇이 다를까요?</h2>
  <div class="table-wrap"><table><caption>균사와 균사체의 차이</caption><tr><th scope="col">구분</th><th scope="col">의미</th></tr><tr><td>균사</td><td>버섯을 이루는 가느다란 실 모양의 구조</td></tr><tr><td>균사체</td><td>여러 균사가 가지를 뻗고 서로 연결되어 형성된 집합체</td></tr></table></div>
  <p>균사는 현미경으로 관찰할 수 있을 정도로 가늘지만, 균사가 계속 성장하고 모이면 흰 솜이나 얇은 그물처럼 보이는 균사체가 됩니다. 즉, 하나의 가는 실이 균사라면 수많은 균사가 연결된 전체 구조가 균사체입니다.</p>
  ${image('insight-hyphae-network.png','가느다란 균사가 연결되어 균사체 네트워크로 자라는 모습','하나의 균사가 가지를 뻗고 연결되며 균사체를 이룹니다.')}
  <h2 id="mycelium-section-3">3. 균사체와 버섯은 어떻게 다를까요?</h2>
  <p>우리가 식탁에서 만나는 버섯은 일반적으로 ‘자실체’라고 부릅니다. 자실체는 일정한 환경이 갖춰졌을 때 균사체로부터 형성되며, 포자를 만들어 퍼뜨리는 역할을 합니다.</p>
  <div class="table-wrap"><table><caption>균사체와 자실체의 차이</caption><tr><th scope="col">구분</th><th scope="col">균사체</th><th scope="col">자실체</th></tr><tr><td>형태</td><td>가느다란 균사가 연결된 그물망 구조</td><td>갓과 대처럼 눈에 보이는 버섯 형태</td></tr><tr><td>주요 위치</td><td>나무·토양·배지 등 기질의 내부와 표면</td><td>기질의 바깥으로 형성</td></tr><tr><td>주요 역할</td><td>영양분의 분해·흡수와 성장</td><td>포자의 형성과 확산</td></tr></table></div>
  <p>균사체와 자실체는 서로 다른 생물이 아니라 버섯의 생활사에서 나타나는 서로 다른 구조입니다. 모든 균류가 우리가 익숙하게 보는 큰 버섯 형태의 자실체를 만드는 것은 아니며, 종류와 생육 환경에 따라 성장 방식도 달라집니다.</p>
  ${image('insight-mycelium-cross-section.png','숲 위의 버섯 자실체와 땅속 균사체를 함께 보여 주는 단면','자실체는 눈에 보이고, 균사체는 기질 안팎에 그물처럼 퍼집니다.')}
  <h2 id="mycelium-section-4">4. 균사체는 자연에서 어떤 역할을 할까요?</h2>
  <p>균사체는 나무와 낙엽 등에 포함된 유기물을 분해하고 그 과정에서 필요한 영양분을 흡수합니다. 이러한 활동은 생태계 안에서 유기물이 다시 순환하는 데 중요한 역할을 합니다. 일부 균류는 식물의 뿌리와 관계를 맺고 서로 필요한 물질을 주고받기도 합니다.</p>
  <p>우리가 숲에서 발견하는 버섯 아래에는 눈에 잘 보이지 않는 균사체가 이미 넓게 자라고 있을 수 있습니다. 버섯의 생명 활동은 눈에 보이는 자실체가 나타나기 전부터 균사체에서 이어지고 있는 셈입니다.</p>
  <h2 id="mycelium-section-5">5. 버섯균사체는 어떻게 배양할까요?</h2>
  <p>버섯균사체는 적절한 영양원과 온도, 습도, 산소 등의 조건을 갖추면 인공적인 환경에서도 배양할 수 있습니다. 먼저 원하는 버섯 종에서 균사를 분리하고, 오염되지 않도록 관리하면서 배양합니다. 이후 연구 목적에 따라 액체배지나 곡물배지 등으로 옮겨 균사체를 성장시킵니다.</p>
  <ul class="article-checks"><li>버섯 종과 균주의 특성</li><li>배지의 종류와 영양 성분</li><li>배양 온도와 기간</li><li>수분과 산소 조건</li><li>미생물 오염 여부</li><li>배양 후 건조와 추출 방법</li></ul>
  <p>같은 종류의 버섯균사체라도 사용한 균주와 배지, 배양 조건, 가공 방법에 따라 원료의 특성이 달라질 수 있습니다. 따라서 식품 소재로 활용하려면 일정한 품질로 생산할 수 있는 표준화 과정이 중요합니다.</p>
  ${image('insight-mycelium-lab.png','연구실에서 배양 중인 버섯균사체','식품 소재화를 위해 균주와 배양 조건, 오염 여부를 세심하게 관리합니다.')}
  <h2 id="mycelium-section-6">6. 기운찬이 버섯균사체를 연구하는 이유</h2>
  <p>주식회사 기운찬은 여러 종류의 버섯균사체를 복합배양한 소재, <span class="no-break">GMK®</span>를 연구하고 있습니다.</p>
  <p><span class="no-break">GMK®</span>는 서로 다른 버섯균사체를 단순히 섞는 방식이 아니라, 정해진 조건에서 함께 배양하는 복합배양 기술을 바탕으로 개발한 소재입니다.</p>
  <p>기운찬은 균주의 특성과 배합 조건, 배양 온도와 기간, 배지, 건조 및 추출 공정 등을 체계적으로 관리하며 균사체 소재의 품질을 일정하게 유지하기 위한 연구를 이어가고 있습니다.</p>
  <p>또한 세포 및 동물 수준의 기반 연구와 인체적용시험을 통해 <span class="no-break">GMK® 추출물</span>의 안전성과 기능성을 과학적으로 확인하고 있습니다.</p>
  <p class="article-notice">※ 연구 결과는 사용된 원료와 제조공정, 섭취량 및 시험 조건에 따라 달라질 수 있습니다. 특정 버섯이나 모든 버섯균사체에 동일하게 적용되는 것은 아닙니다.</p>
  <h2 id="mycelium-section-7">7. 자주 묻는 질문</h2>
  <details open><summary>Q. 균사체는 버섯의 뿌리인가요?</summary><p>A. 정확히 말하면 뿌리는 아닙니다. 식물의 뿌리처럼 기질 속에서 영양분을 흡수하기 때문에 이해를 돕기 위해 ‘버섯의 뿌리’라고 표현하기도 하지만, 생물학적 구조는 다릅니다.</p></details>
  <details><summary>Q. 하얗게 보이는 것은 모두 버섯균사체인가요?</summary><p>A. 그렇지는 않습니다. 배지 표면의 흰색 물질은 균사체일 수도 있지만 다른 곰팡이나 미생물에 의한 오염일 가능성도 있습니다.</p></details>
  <details><summary>Q. 균사체와 자실체 중 어느 것이 더 좋은가요?</summary><p>A. 어느 한쪽이 무조건 더 좋다고 말하기는 어렵습니다. 원료를 평가할 때는 사용 부위뿐 아니라 제조공정과 품질 기준, 연구 자료를 함께 살펴봐야 합니다.</p></details>
  <details><summary>Q. 곡물배지로 키우면 모두 같은 균사체가 만들어지나요?</summary><p>A. 아닙니다. 같은 곡물배지를 사용하더라도 버섯의 종류와 균주, 접종량, 온도, 수분, 산소 및 배양 기간에 따라 성장 상태와 원료의 특성이 달라질 수 있습니다.</p></details>
  <h2>한눈에 정리하면</h2>
  <p>버섯균사체는 가느다란 실 모양의 균사들이 성장하고 서로 연결되어 만들어진 버섯의 영양기관입니다. 균사체는 주변의 유기물을 분해해 영양분을 흡수하며 성장합니다.</p>
  <p>버섯균사체를 식품 소재로 활용하려면 균주와 배지, 배양 조건, 건조 및 추출 공정을 표준화하고 안전성과 품질을 확인하는 과정이 필요합니다.</p>
  <p>주식회사 기운찬은 여러 종류의 버섯균사체를 복합배양한 <span class="no-break">GMK®</span>를 기반으로, 균사체 소재의 가능성을 과학적으로 연구하고 있습니다.</p>
  <h2>참고 자료</h2>
  <p><a class="text-link" href="https://www.ncbi.nlm.nih.gov/books/" target="_blank" rel="noopener noreferrer">NCBI Bookshelf · Basic Biology of Fungi ↗</a></p>
  <p><a class="text-link" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5968459/" target="_blank" rel="noopener noreferrer">Fungal Morphogenesis 학술 리뷰 ↗</a></p>
  <p class="article-byline">작성: 주식회사 기운찬 기업부설연구소<br>최종 업데이트: 2026년 9월 18일</p>
  <a class="text-link" href="/insights/">인사이트 목록으로 →</a>
 </article>`;
}
