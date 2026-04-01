/* ════════════════════════════════════════
   app.js — Main application controller
   Uses History API so the browser/phone
   back button navigates between pages
   instead of closing the app.
════════════════════════════════════════ */

/* ── Internal page switch (no history push) ── */
function _showPage(name) {
  document.querySelectorAll('.pg').forEach(p => p.classList.remove('act'));
  const el = document.getElementById('pg-' + name);
  if (el) {
    el.classList.add('act');
    el.scrollTop = 0;
  }
  if (name !== 'home' && window.showDyk) window.showDyk();
  setTimeout(observeCards, 80);

  /* Highlight active nav link */
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('nav-active', a.dataset.page === name);
  });

  /* Show/hide home button — hide on home page */
  const homeBtn = document.getElementById('home-btn');
  if (homeBtn) homeBtn.style.opacity = name === 'home' ? '0' : '1';
}

/* ── Public gotoPage — pushes to browser history ── */
function gotoPage(name, skipPush) {
  /* Don't push duplicate state */
  if (!skipPush) {
    const current = history.state && history.state.page;
    if (current !== name) {
      history.pushState({ page: name }, '', '#' + name);
    }
  }
  _showPage(name);
}

/* ── Handle browser back / forward buttons ── */
window.addEventListener('popstate', e => {
  const page = (e.state && e.state.page) || 'home';
  _showPage(page); /* skipPush = true — we're responding to history, not creating it */
});

/* ── Single delegated click listener ── */
document.addEventListener('click', e => {
  const page    = e.target.closest('[data-page]');
  const dyn     = e.target.closest('[data-dynasty]');
  const battle  = e.target.closest('[data-battle]');
  const article = e.target.closest('[data-article]');
  const bkDyn   = e.target.closest('#bk-dynasties');
  const bkBat   = e.target.closest('#bk-battles');
  const bkHist  = e.target.closest('#bk-history, #bk-history2');

  if (bkHist)   { history.back(); return; }
  if (bkDyn)    { history.back(); return; }
  if (bkBat)    { history.back(); return; }
  if (article)  { showArticle(article.dataset.article); return; }
  if (page)     { gotoPage(page.dataset.page); return; }
  if (dyn)      { showChronology(dyn.dataset.dynasty); return; }
  if (battle)   { showBattleDetail(battle.dataset.battle); return; }
});

/* ── Hero animation is handled by intro-splash script ── */

/* ── Init ── */
window.addEventListener('DOMContentLoaded', () => {
  renderDynasties();
  renderBattles();
  renderHistory();
  // animateHero is called by the intro splash when it finishes
  setTimeout(observeCards, 120);

  /* Seed the initial history state */
  history.replaceState({ page: 'home' }, '', '#home');

  /* If the page was loaded with a hash, navigate to it */
  const hash = location.hash.replace('#', '');
  if (hash && hash !== 'home' && document.getElementById('pg-' + hash)) {
    gotoPage(hash);
  }

  /* Hide home button on load */
  const homeBtn = document.getElementById('home-btn');
  if (homeBtn) homeBtn.style.opacity = '0';
});
