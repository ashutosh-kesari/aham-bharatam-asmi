/* ════════════════════════════════════════
   particles.js — Canvas particle system
   Gold + saffron rising dust particles
════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('cvs');
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];
  const COUNT = 90;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  function make() {
    const gold = Math.random() > 0.32;
    return {
      x:    Math.random() * W,
      y:    H + 10,
      r:    Math.random() * 1.3 + 0.28,
      dx:   (Math.random() - 0.5) * 0.3,
      dy:   -(Math.random() * 0.46 + 0.14),
      ma:   Math.random() * 0.42 + 0.07,
      life: 0,
      ml:   Math.random() * 420 + 180,
      col:  gold ? [200, 148, 42] : [224, 115, 24],
    };
  }

  // Scatter initial positions
  for (let i = 0; i < COUNT; i++) {
    const p = make();
    p.y    = Math.random() * H;
    p.life = Math.floor(Math.random() * p.ml);
    pts.push(p);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < pts.length; i++) {
      const p  = pts[i];
      const pr = p.life / p.ml;
      const a  = pr < 0.1  ? p.ma * (pr / 0.1)
               : pr > 0.82 ? p.ma * ((1 - pr) / 0.18)
               : p.ma;

      ctx.globalAlpha = a;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${p.col[0]},${p.col[1]},${p.col[2]})`;
      ctx.fill();

      p.x    += p.dx;
      p.y    += p.dy;
      p.life += 1;

      if (p.life >= p.ml || p.y < -8) pts[i] = make();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();
