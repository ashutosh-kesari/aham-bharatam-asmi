/* ════════════════════════════════════════
   dyk.js — "Did You Know?" popup manager
════════════════════════════════════════ */
(function () {
  const popup  = document.getElementById('dyk');
  const textEl = document.getElementById('dyk-tx');
  const closeBtn = document.getElementById('dyk-close');
  let timer = null;
  let hideTimer = null;

  if (!popup || !textEl) return;

  /* Show a random fact after a delay */
  window.showDyk = function (delay = 2800) {
    clearTimeout(timer);
    clearTimeout(hideTimer);
    popup.classList.remove('on');

    timer = setTimeout(() => {
      textEl.textContent = DYKS[Math.floor(Math.random() * DYKS.length)];
      popup.classList.add('on');
      // Auto-hide after 8 s
      hideTimer = setTimeout(() => popup.classList.remove('on'), 8000);
    }, delay);
  };

  window.closeDyk = function () {
    clearTimeout(timer);
    clearTimeout(hideTimer);
    popup.classList.remove('on');
  };

  if (closeBtn) closeBtn.addEventListener('click', window.closeDyk);
})();
