/* ════════════════════════════════════════
   sound.js — Background music player
   
   Strategy:
   - Button shows ♫ (on) by default
   - Music starts on FIRST user interaction
     (tap, click, scroll, keydown)
   - If user manually turns off before that,
     we cancel the pending autostart
   - Fully respects browser autoplay policy
════════════════════════════════════════ */
(function () {
  const btn = document.getElementById('sbtn');
  let audio       = null;
  let soundOn     = true;   // intended state = ON
  let hasStarted  = false;  // has audio actually begun playing

  /* Show button as ON immediately — music will start on first interaction */
  btn.textContent = '♫';
  btn.classList.add('on');

  function getAudio() {
    if (!audio) {
      audio = new Audio('audio/bg-music.mp3');
      audio.loop   = true;
      audio.volume = 0;
    }
    return audio;
  }

  function fadeIn() {
    const a = getAudio();
    const steps = 50, duration = 3000, interval = duration / steps;
    let step = 0;
    clearInterval(a._fi);
    a._fi = setInterval(() => {
      step++;
      a.volume = Math.min(0.42, 0.42 * (step / steps));
      if (step >= steps) clearInterval(a._fi);
    }, interval);
  }

  function fadeOut(then) {
    const a = getAudio();
    const from = a.volume;
    const steps = 35, duration = 1600, interval = duration / steps;
    let step = 0;
    clearInterval(a._fi);
    a._fi = setInterval(() => {
      step++;
      a.volume = Math.max(0, from * (1 - step / steps));
      if (step >= steps) {
        clearInterval(a._fi);
        a.pause();
        if (then) then();
      }
    }, interval);
  }

  /* Called on first user interaction */
  function attemptPlay() {
    if (!soundOn || hasStarted) return;
    const a = getAudio();
    a.play().then(() => {
      hasStarted = true;
      fadeIn();
    }).catch(() => {
      /* Still blocked — silently ignore, user can tap music button directly */
    });
  }

  /* Listen for ANY user interaction to trigger autoplay */
  const EVENTS = ['click', 'touchstart', 'keydown', 'scroll', 'pointerdown'];
  function onInteract() {
    attemptPlay();
    /* Keep listening in case first event was something that didn't unlock audio */
  }
  EVENTS.forEach(ev => document.addEventListener(ev, onInteract, { passive: true }));

  /* Manual toggle button */
  window.toggleSound = function () {
    soundOn = !soundOn;

    if (soundOn) {
      /* Turn on */
      const a = getAudio();
      btn.textContent = '♫';
      btn.classList.add('on');
      if (!hasStarted) {
        /* Will start on next interaction — already listening */
        a.play().then(() => {
          hasStarted = true;
          fadeIn();
        }).catch(() => {});
      } else {
        a.play().then(() => fadeIn()).catch(() => {});
      }
    } else {
      /* Turn off */
      btn.textContent = '♪';
      btn.classList.remove('on');
      if (hasStarted) {
        fadeOut();
      }
    }
  };

  /* Pause/resume on tab visibility change */
  document.addEventListener('visibilitychange', () => {
    if (!audio || !hasStarted) return;
    if (document.hidden) {
      audio.pause();
    } else if (soundOn) {
      audio.play().catch(() => {});
    }
  });

})();
