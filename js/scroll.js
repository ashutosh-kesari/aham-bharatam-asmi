/* ════════════════════════════════════════
   scroll.js — Smart scroll engine
   Works with fixed-position page system
════════════════════════════════════════ */
(function () {

  function getActivePage() {
    return document.querySelector('.pg.act');
  }

  /* Reset scroll on page switch */
  window.resetScroll = () => {
    const pg = getActivePage();
    if (pg) pg.scrollTop = 0;
  };

  /* Nav solid on scroll — watch active page */
  function updateNavSolid() {
    const pg = getActivePage();
    const scrolled = pg ? pg.scrollTop > 10 : false;
    const nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('solid', scrolled);
  }

  /* Delegate scroll listening to active page */
  document.addEventListener('scroll', updateNavSolid, true);

  /* Also handle wheel events smoothly */
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  if (!isTouch) {
    document.addEventListener('wheel', e => {
      if (e.ctrlKey) return;
      const pg = getActivePage();
      if (!pg) return;
      e.preventDefault();
      pg.scrollTop += e.deltaY * 0.45;
    }, { passive: false });
  }

})();
