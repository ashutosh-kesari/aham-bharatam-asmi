# Images — BHARATAM ASMI

## Current State
The website uses emoji icons as placeholders.

## Folder Structure

```
images/
├── hero/
│   ├── ashoka.jpg          ← Hero card A (Dynasties)  — 260×110px
│   └── haldighati.jpg      ← Hero card B (Battles)    — 260×110px
│
├── dynasties/
│   ├── indus.jpg
│   ├── maurya.jpg
│   ├── gupta.jpg
│   ├── chola.jpg
│   └── ...                 ← One per dynasty (280×140px recommended)
│
├── battles/
│   ├── ten-kings.jpg
│   ├── hydaspes.jpg
│   ├── kalinga.jpg
│   └── ...                 ← One per battle (320×140px recommended)
│
└── monuments/
    ├── sanchi-stupa.jpg
    ├── brihadeeswara.jpg
    ├── taj-mahal.jpg
    └── ...
```

## How to Add Images to Hero Cards

In `index.html`, replace the emoji in `.h-card-ico`:

```html
<!-- Before -->
<div class="h-card-ico ico-d">👑</div>

<!-- After -->
<div class="h-card-ico ico-d">
  <img src="images/hero/ashoka.jpg" alt="Ashoka the Great"
       style="width:100%;height:100%;object-fit:cover;opacity:0.7;" />
</div>
```

## How to Add Images to Dynasty Cards

In `js/render.js`, modify the dynasty card template to include an image:

```javascript
// Add above dc-per div:
${d.img ? `<div class="dc-img"><img src="images/dynasties/${d.img}" alt="${d.name}"></div>` : ''}
```

Then add an `img` field to each dynasty in `js/data.js`:
```javascript
{ id: 'maurya', img: 'maurya.jpg', period: '322 – 185 BCE', ... }
```

## Recommended Image Sources
- **Wikipedia Commons** — Public domain historical images
- **Archaeological Survey of India** — Temple and monument photos
- **Wikimedia** — search by dynasty/battle name
- **AI generation** (Midjourney / DALL-E) — for illustrated cinematic portraits

## Image Style Guide
- Dark, cinematic tone (match the website's mood)
- Desaturate slightly and add warm gold tint via CSS filter:
  `filter: sepia(0.3) brightness(0.75) contrast(1.1)`
- Aspect ratio: landscape for cards, square for timeline portraits
