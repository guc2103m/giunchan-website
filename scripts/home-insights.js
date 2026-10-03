(() => {
  const grid = document.getElementById('home-insight-cards');
  const status = document.getElementById('home-insight-status');
  if (!grid || !status) return;

  fetch('/api/content?action=home-insights', { headers: { Accept: 'application/json' } })
    .then(response => {
      if (!response.ok) throw new Error(`CMS request failed: ${response.status}`);
      return response.json();
    })
    .then(({ html, count }) => {
      grid.innerHTML = html || '';
      grid.setAttribute('aria-busy', 'false');
      status.hidden = count > 0;
      if (!count) status.textContent = '새로운 연구자료가 없습니다.';
    })
    .catch(error => {
      grid.replaceChildren();
      grid.setAttribute('aria-busy', 'false');
      status.hidden = false;
      status.textContent = '현재 연구자료를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.';
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        console.error('[home insights] CMS request failed', error);
      }
    });
})();
