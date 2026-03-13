# BHARATAM ASMI – The Chronicles of India
### A Cinematic Interactive Historical Website

---

## 📁 Project Structure

```
bharatam-asmi/
│
├── index.html              ← Main HTML (all pages live here)
│
├── css/
│   ├── variables.css       ← Design tokens (colors, spacing)
│   ├── reset.css           ← Base reset, body, shared elements
│   ├── nav.css             ← Navigation bar
│   ├── home.css            ← Hero / Home page
│   ├── dynasties.css       ← Dynasties listing page
│   ├── chronology.css      ← Dynasty timeline page
│   ├── battles.css         ← Battles listing page
│   ├── battle-detail.css   ← Single battle detail page
│   └── components.css      ← Shared UI (DYK popup, etc.)
│
├── js/
│   ├── data.js             ← All historical data (dynasties, battles, facts)
│   ├── particles.js        ← Canvas gold particle system
│   ├── cursor.js           ← Custom gold cursor + lag ring
│   ├── scroll.js           ← Smooth lerp scroll engine
│   ├── sound.js            ← Web Audio API ambient music engine
│   ├── dyk.js              ← "Did You Know?" popup manager
│   ├── render.js           ← DOM rendering (cards, timeline, detail)
│   └── app.js              ← Main controller (navigation, events, init)
│
├── audio/
│   └── README_AUDIO.md     ← Instructions for adding real audio files
│
├── images/
│   └── README_IMAGES.md    ← Instructions for adding images
│
└── README.md               ← This file
```

---

## 🚀 How to Run

Simply open `index.html` in any modern browser. No build step required.

For best experience, use a local server:
```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .

# VS Code: use Live Server extension
```
Then visit: `http://localhost:8080`

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--gold` | `#c8942a` | Primary gold |
| `--gold-lt` | `#e8b84b` | Light gold, headings |
| `--gold-pl` | `#f5e0a0` | Pale gold, highlights |
| `--saffron` | `#e07318` | Accents, eyebrows |
| `--ember` | `#c04020` | Battle page red tones |
| `--bg` | `#070604` | Main background |
| `--text` | `#d8c8a0` | Body text |

---

## 🎵 Sound Engine

The ambient music is generated entirely via **Web Audio API** — no external files needed.

**Layers:**
- Tanpura-style drone (C2 + G2 + C3 + G3) with slow tremolo
- Veena-inspired pentatonic shimmer (Raag Bhairavi tones)
- Sub-bass mridangam thrum (C1)
- Sparse temple bell pings (every 8–18 seconds)
- Convolution reverb (synthetic impulse response)

To replace with real audio, see `audio/README_AUDIO.md`.

---

## 📄 Adding Content

All historical data lives in `js/data.js`:
- **DYN** object → Add new dynasties to `ancient`, `medieval`, or `modern` arrays
- **BATTLES** array → Add new battles
- **DYKS** array → Add new "Did You Know?" facts

---

## 🖼️ Adding Images

Replace emoji placeholders in `index.html` hero cards with `<img>` tags.
See `images/README_IMAGES.md` for recommended sizes and formats.

---

## ⚙️ Performance Notes

- Smooth scroll ease is `0.13` (in `js/scroll.js`, line 15) — increase for faster snap
- Particle count is `90` (in `js/particles.js`, line 11) — reduce for lower-end devices
- Card transition delay stagger is `0.055s` per card — adjust in `js/render.js`

---

## 🏛️ Pages

| Page | ID | Triggered By |
|------|-----|-------------|
| Home | `pg-home` | Logo / default |
| Dynasties | `pg-dynasties` | Left hero card |
| Chronology | `pg-chronology` | "Explore Chronology" on dynasty card |
| Battles | `pg-battles` | Right hero card |
| Battle Detail | `pg-bdetail` | "View Details" on battle card |

---

*BHARATAM ASMI — अस्मि — "I am Bharat"*
