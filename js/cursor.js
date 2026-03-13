/* ════════════════════════════════════════
   cursor.js — Custom gold cursor
════════════════════════════════════════ */
(function () {
  const dot  = document.getElementById('cdot');
  const ring = document.getElementById('cring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  function loop() {
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';

    // Lerp ring for smooth lag
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';

    requestAnimationFrame(loop);
  }
  loop();

  // Expand ring on clickable hover
  document.addEventListener('mouseover', e => {
    const el = e.target.closest('a, button, [data-page], .dc, .bc, .rel-c');
    if (el) {
      ring.style.width        = '46px';
      ring.style.height       = '46px';
      ring.style.borderColor  = 'rgba(200,148,42,0.75)';
    } else {
      ring.style.width        = '32px';
      ring.style.height       = '32px';
      ring.style.borderColor  = 'rgba(200,148,42,0.4)';
    }
  });
})();
