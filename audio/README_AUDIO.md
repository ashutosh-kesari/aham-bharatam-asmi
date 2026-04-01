# Audio Files — BHARATAM ASMI

## Current State
The website uses **Web Audio API** to generate ambient music procedurally.
No audio files are needed to run the site.

## To Add Real Audio Files

If you want to replace the generated sound with real recordings,
place your files here in this `/audio/` folder and edit `js/sound.js`.

### Recommended files:

| File | Description | Format |
|------|-------------|--------|
| `ambient-loop.mp3` | Main ambient background loop (looped) | MP3 / OGG |
| `bell.mp3` | Temple bell single ping | MP3 / OGG |
| `veena.mp3` | Short veena melody loop | MP3 / OGG |

### How to swap in real audio (in `js/sound.js`):

```javascript
// Replace buildGraph() with:
const audio = new Audio('audio/ambient-loop.mp3');
audio.loop   = true;
audio.volume = 0.20;

window.toggleSound = function () {
  soundOn = !soundOn;
  if (soundOn) { audio.play(); }
  else          { audio.pause(); }
};
```

### Free Historical/Ambient Music Resources:
- **Freesound.org** — search "veena ambient", "temple bells", "Indian drone"
- **Pixabay Music** — royalty-free, search "Indian classical", "meditative"
- **YouTube Audio Library** — filter by mood "Calm", instrument "World"
- **Incompetech** — Kevin MacLeod's royalty-free compositions

### Recommended YouTube searches for inspiration:
- "Raga Bhairavi Alap veena"
- "Indian classical ambient music"
- "Temple soundscape India"
- "Carnatic drone music"
