(() => {
const toggle = document.querySelector('#gmk-case-toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') !== 'true';
    document.querySelectorAll('#gmk-case-grid [data-additional-case]').forEach(card => { card.hidden = !expanded; });
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.textContent = expanded ? '제품화 사례 접기' : '제품화 사례 더보기';
  });
}
})();
