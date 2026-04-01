/* ════════════════════════════════════════
   render.js — DOM rendering functions
   Dynasties, Battles, Chronology, Detail,
   History & Power articles
════════════════════════════════════════ */

/* ── Intersection Observer for card fade-in ── */
const cardIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('vis');
      cardIO.unobserve(e.target);
    }
  });
}, { threshold: 0.06 });

function observeCards() {
  document.querySelectorAll('.dc:not(.vis), .bc:not(.vis), .hp-card:not(.vis)').forEach(el => cardIO.observe(el));
}

/* ── Timeline IO ── */
const tlIO = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); tlIO.unobserve(e.target); } });
}, { threshold: 0.08 });


/* ════════════════════════════════════════
   HISTORY & POWER — Articles data
════════════════════════════════════════ */
const ARTICLES = [
  {
    id: 'alexander',
    cat: 'Invasion & Resistance',
    title: "Alexander's Invasion of India",
    subtitle: "326 BCE — The Limits of a Conqueror",
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Battle_of_the_Hydaspes_-_Plan.png/800px-Battle_of_the_Hydaspes_-_Plan.png',
    imgAlt: 'Map of Alexander\'s Indian Campaign',
    excerpt: 'In 326 BCE, Alexander the Great crossed the Hindu Kush and reached the banks of the Jhelum — and met his match in the warrior-king Porus.',
    body: [
      { type: 'p', text: 'In the spring of 326 BCE, Alexander III of Macedon led his battle-hardened army across the Hindu Kush mountains and into the northwestern frontier of the Indian subcontinent. Having already conquered Persia, Egypt, and Central Asia, Alexander harboured ambitions of reaching the farthest ends of the known world. India, to the Greeks, was a land of mythical wealth and uncharted wonder.' },
      { type: 'h3', text: 'The Crossing of the Hydaspes' },
      { type: 'p', text: 'At the Jhelum River — known to the Greeks as the Hydaspes — Alexander encountered the most formidable resistance of his campaign. King Porus of the Pauravas awaited him with a force of 50,000 soldiers and 200 war elephants. The sight of these enormous beasts, which the Macedonians had rarely faced before, unnerved even Alexander\'s veteran cavalry.' },
      { type: 'img', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Battle_of_the_Hydaspes.jpg/800px-Battle_of_the_Hydaspes.jpg', alt: 'Battle of the Hydaspes', caption: 'A 19th-century depiction of the Battle of the Hydaspes' },
      { type: 'p', text: 'Alexander\'s genius lay in his crossing strategy. Under cover of darkness and a raging thunderstorm, he led a strike force across the swollen river at a hidden ford, attacking Porus\'s flank at dawn. Despite this tactical brilliance, the battle was Alexander\'s bloodiest in India. King Porus fought valiantly — wounded by multiple arrows, he continued to direct his forces from atop his elephant until the very end.' },
      { type: 'quote', text: '"How would you like to be treated?" Alexander asked the captured Porus. "As a king," Porus replied. Impressed by his courage, Alexander restored his kingdom and made him an ally.' },
      { type: 'h3', text: 'The Limit of Empire' },
      { type: 'p', text: 'Though victorious, Alexander\'s army refused to march further east. His soldiers had been campaigning for eight gruelling years. Word had reached them of far mightier kingdoms beyond the Beas River — including the Nanda Empire of Magadha, whose armies reportedly numbered in the hundreds of thousands. The Macedonian veterans refused further advances, and Alexander was forced to turn back. He never conquered India\'s heartland.' },
      { type: 'p', text: 'Alexander\'s brief incursion had a lasting, unexpected consequence: it destabilized the northwestern frontier and created a power vacuum that a young man named Chandragupta Maurya would soon fill — forging India\'s first great pan-Indian empire within just a few years of Alexander\'s withdrawal.' },
    ]
  },
  {
    id: 'maurya-birth',
    cat: 'Empire & Legacy',
    title: "The Birth of the Mauryan Empire",
    subtitle: "322 BCE — Chandragupta and the Vision of Chanakya",
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Maurya_Empire%2C_c.250_BCE.png/800px-Maurya_Empire%2C_c.250_BCE.png',
    imgAlt: 'Map of the Mauryan Empire at its height',
    excerpt: 'A young exile with nothing but ambition, guided by the most brilliant strategic mind of the ancient world — how Chandragupta Maurya built India\'s first empire.',
    body: [
      { type: 'p', text: 'In 322 BCE, a young man of obscure origins walked into the court of the philosopher-strategist Chanakya and changed Indian history forever. Chandragupta Maurya, possibly of humble Moriya clan origins, had been expelled from the powerful Nanda court after speaking too boldly. He carried within him a burning ambition and a memory of Alexander\'s invading army — which had shown him that even the mightiest empire could be challenged.' },
      { type: 'h3', text: 'The Kingmaker and the King' },
      { type: 'p', text: 'Chanakya, also known as Kautilya, was the greatest political mind of his age. A scholar of Takshashila, he had been humiliated by the Nanda court and vowed its destruction. Recognizing extraordinary potential in the young Chandragupta, he became his mentor, strategist, and the architect of what would become the most powerful empire the subcontinent had ever seen.' },
      { type: 'img', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Chanakya_artistic_depiction.jpg/400px-Chanakya_artistic_depiction.jpg', alt: 'Artistic depiction of Chanakya', caption: 'Artistic depiction of the philosopher-strategist Chanakya (Kautilya)' },
      { type: 'p', text: 'Together, they studied the weaknesses of the Nanda Empire — its oppressive taxation, resentful population, and corrupt administration. Chanakya\'s treatise, the Arthashastra, laid out principles of statecraft, economics, and military strategy that remain startling in their sophistication. It described everything from spy networks and diplomatic protocol to agricultural policy and market regulation.' },
      { type: 'h3', text: 'The Fall of the Nandas' },
      { type: 'p', text: 'Chandragupta began by recruiting and training an army from the northwestern frontier, comprising forest tribes, local chieftains, and veterans from Alexander\'s disbanded forces. His campaign against the Nanda Empire was methodical: he began in the periphery rather than attacking the heavily defended capital, slowly expanding his base of power. Around 322 BCE, Chandragupta captured Pataliputra, the great Nanda capital on the Ganges, ending 100 years of Nanda rule.' },
      { type: 'quote', text: '"A king should always be active. In the happiness of his subjects lies his happiness; in their welfare his welfare." — Chanakya, Arthashastra' },
      { type: 'p', text: 'Chandragupta then turned westward, sweeping into the northwestern territories left unstable by Alexander\'s withdrawal. By 305 BCE, he had defeated Seleucus Nicator — one of Alexander\'s most powerful successors — and secured a vast territory including modern Afghanistan and Balochistan. India had its first true pan-Indian empire, stretching from the Bay of Bengal to the Hindu Kush mountains.' },
    ]
  },
  {
    id: 'silk-road-india',
    cat: 'Trade & Civilization',
    title: "India and the Silk Road",
    subtitle: "The Subcontinent at the Crossroads of the Ancient World",
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Silk_Road_in_the_2nd_century.jpg/800px-Silk_Road_in_the_2nd_century.jpg',
    imgAlt: 'Map of the ancient Silk Road',
    excerpt: 'For over a millennium, Indian merchants, pilgrims, and ideas traveled along the great Silk Road — carrying cotton, spices, and Buddhist thought to the far corners of the ancient world.',
    body: [
      { type: 'p', text: 'Long before the term "Silk Road" was coined, Indian merchants were among the most active participants in the great network of trade routes that connected the Mediterranean to China. Indian textiles — especially fine muslin from Bengal and cotton from the Deccan — were so prized in Rome that the Emperor Tiberius complained of gold draining out of the Empire to pay for Indian luxuries.' },
      { type: 'h3', text: 'The Ports of Ancient India' },
      { type: 'p', text: 'India\'s extensive coastline made it the natural hub of maritime trade. Ports like Barygaza (modern Bharuch), Muzirikon the Malabar coast, and Arikamedu in Tamil Nadu were thriving international entrepots. Roman amphorae, Greek coins, and Chinese ceramics have all been discovered at these archaeological sites, testifying to the extraordinary cosmopolitanism of ancient Indian trade.' },
      { type: 'p', text: 'The Periplus of the Erythraean Sea, a Greek merchant\'s guide from around 40 CE, provides a vivid account of Indian ports — describing the goods available, local rulers, harbour conditions, and the best seasons for sailing. It reveals a sophisticated, well-organized trade network that had been operating for centuries.' },
      { type: 'h3', text: 'Ideas as Cargo' },
      { type: 'p', text: 'Trade carried more than goods. The Silk Road was the great highway of ideas. Buddhist missionaries traveled with merchants into Central Asia, China, Korea, and Japan. Mathematical concepts — including the decimal system and the concept of zero, developed in India — traveled westward and transformed the intellectual landscape of the Islamic world and eventually medieval Europe. Indian astronomical knowledge influenced Greek science, while Greek artistic traditions transformed Buddhist iconography into some of its most beautiful forms.' },
    ]
  }
];


/* ════════════════════════════════════════
   Render History & Power article grid
════════════════════════════════════════ */
function renderHistory() {
  const grid = document.getElementById('hp-grid');
  if (!grid) return;
  grid.innerHTML = ARTICLES.map((a, i) => `
    <div class="hp-card" data-article="${a.id}"
         style="transition-delay:${(i * 0.08).toFixed(2)}s">
      <div class="hp-card-img-wrap">
        <img class="hp-card-img" src="${a.img}" alt="${a.imgAlt}"
             onerror="this.style.display='none';this.parentElement.style.background='rgba(30,20,5,.8)'" />
      </div>
      <div class="hp-card-body">
        <div class="hp-card-cat">${a.cat}</div>
        <div class="hp-card-title">${a.title}</div>
        <div class="hp-card-excerpt">${a.excerpt}</div>
        <div class="hp-card-cta">Read Article →</div>
      </div>
    </div>
  `).join('');
}


/* ════════════════════════════════════════
   Show article detail
════════════════════════════════════════ */
function showArticle(id) {
  const a = ARTICLES.find(x => x.id === id);
  if (!a) return;

  function renderBodyBlock(b) {
    if (b.type === 'p')     return `<p>${b.text}</p>`;
    if (b.type === 'h3')    return `<h3>${b.text}</h3>`;
    if (b.type === 'quote') return `<div class="art-blockquote"><p>${b.text}</p></div>`;
    if (b.type === 'img')   return `
      <div class="art-img-wrap">
        <img src="${b.src}" alt="${b.alt}"
             onerror="this.parentElement.style.display='none'" />
        <div class="art-img-caption">${b.caption}</div>
      </div>`;
    return '';
  }

  document.getElementById('art-content').innerHTML = `
    <button class="art-back" id="bk-history">← Back to History &amp; Power</button>
    <div class="art-cat">${a.cat}</div>
    <div class="art-title">${a.title}</div>
    <div class="art-meta">${a.subtitle}</div>
    <img class="art-hero" src="${a.img}" alt="${a.imgAlt}"
         onerror="this.style.display='none'" />
    <div class="art-sep">
      <div class="art-sep-ln"></div><div class="art-sep-dia"></div><div class="art-sep-ln"></div>
    </div>
    <div class="art-body">
      ${a.body.map(renderBodyBlock).join('')}
    </div>
    <div class="art-sep" style="margin-top:40px">
      <div class="art-sep-ln"></div><div class="art-sep-dia"></div><div class="art-sep-ln"></div>
    </div>
    <div style="text-align:center;padding:20px 0 10px">
      <button class="art-back" id="bk-history2">← Back to History &amp; Power</button>
    </div>
  `;
  gotoPage('article');
}


/* ════════════════════════════════════════
   Render all dynasty grids
════════════════════════════════════════ */
function renderDynasties() {
  Object.entries(DYN).forEach(([era, list]) => {
    const grid = document.getElementById('gr-' + era);
    if (!grid) return;
    grid.innerHTML = list.map((d, i) => `
      <div class="dc" style="transition:opacity .45s ease ${(i * 0.055).toFixed(2)}s, transform .45s ease ${(i * 0.055).toFixed(2)}s, border-color .32s, box-shadow .32s"
           data-dynasty="${d.id}">
        <div class="dc-per">${d.period}</div>
        <div class="dc-nm">${d.name}</div>
        <div class="dc-fn">Founder: <em>${d.founder}</em></div>
        <div class="dc-sg">${d.sig}</div>
        <button class="dc-bt" data-dynasty="${d.id}">Explore Chronology →</button>
      </div>
    `).join('');
  });
}


/* ════════════════════════════════════════
   Render battle grid
════════════════════════════════════════ */
function renderBattles() {
  const grid = document.getElementById('bt-grid');
  if (!grid) return;
  grid.innerHTML = BATTLES.map((b, i) => `
    <div class="bc" style="transition:opacity .45s ease ${(i * 0.055).toFixed(2)}s, transform .45s ease ${(i * 0.055).toFixed(2)}s, border-color .32s, box-shadow .32s"
         data-battle="${b.id}">
      <div class="bc-yr">${b.year}</div>
      <div class="bc-nm">${b.icon} ${b.name}</div>
      <div class="bc-bt">Between: <strong>${b.between}</strong></div>
      <div class="bc-sm">${b.summary}</div>
      <button class="bc-bt2" data-battle="${b.id}">View Details →</button>
    </div>
  `).join('');
}


/* ════════════════════════════════════════
   Show chronology for a dynasty
   + "See Other Dynasties" section
════════════════════════════════════════ */
function showChronology(id) {
  const all = [...DYN.ancient, ...DYN.medieval, ...DYN.modern];
  const d   = all.find(x => x.id === id);
  if (!d) return;

  document.getElementById('chr-ttl').textContent = d.name;
  document.getElementById('chr-per').textContent = d.period;

  function stars(n) { return '★'.repeat(n) + '☆'.repeat(5 - n); }

  document.getElementById('tl-ents').innerHTML = d.rulers.map((r, i) => `
    <div class="tl-e" style="transition-delay:${(i * 0.07).toFixed(2)}s">
      <div class="tl-dot"></div>
      <div class="tl-c">
        <div class="tl-nm">${r.name}</div>
        <div class="tl-rn">${r.reign}</div>
        <div class="tl-dc">${r.desc}</div>
        <div class="tl-st">${stars(r.stars)}</div>
      </div>
      <div class="tl-sp"></div>
    </div>
  `).join('');

  // Other Dynasties section
  const others = all.filter(x => x.id !== id);
  document.getElementById('other-dynasties-wrap').innerHTML = `
    <div class="other-dyn-head">Explore Other Dynasties</div>
    <div class="other-dyn-sub">Continue your journey through the chronicles of Bharat</div>
    <div class="other-dyn-grid">
      ${others.map(o => `
        <div class="other-dyn-card" data-dynasty="${o.id}">
          <div class="odc-per">${o.period}</div>
          <div class="odc-nm">${o.name}</div>
        </div>
      `).join('')}
    </div>
  `;

  gotoPage('chronology');

  setTimeout(() => {
    document.querySelectorAll('.tl-e').forEach(el => tlIO.observe(el));
  }, 80);
}


/* ════════════════════════════════════════
   Battle image mapping — using local image
   (replace with battle-specific images later)
════════════════════════════════════════ */
const BATTLE_IMAGES = {
  tenKings:   'images/battle-default.png',
  hydaspes:   'images/battle-default.png',
  kalinga:    'images/battle-default.png',
  tarain2:    'images/battle-default.png',
  panipat1:   'images/battle-default.png',
  talikota:   'images/battle-default.png',
  haldighati: 'images/battle-default.png',
  panipat3:   'images/battle-default.png',
};


/* ════════════════════════════════════════
   Show battle detail
════════════════════════════════════════ */
function showBattleDetail(id) {
  const b = BATTLES.find(x => x.id === id);
  if (!b) return;

  // Set battle image on left panel
  const imgEl = document.getElementById('bd-battle-img');
  const battleImg = BATTLE_IMAGES[id];
  if (imgEl && battleImg) {
    imgEl.src = battleImg;
    imgEl.alt = b.name;
    imgEl.style.display = 'block';
    imgEl.onerror = function() { this.style.display = 'none'; };
  } else if (imgEl) {
    imgEl.style.display = 'none';
  }

  document.getElementById('bd-ico').textContent = b.icon;
  document.getElementById('bd-vnm').textContent = b.name;
  document.getElementById('bd-vyr').textContent = b.year;

  const relHTML = (b.d.rel && b.d.rel.length)
    ? `<div class="bd-sh">Related Battles</div>
       <div class="rel-grid">
         ${b.d.rel.map(r => `
           <div class="rel-c" data-battle="${r.id}">
             <div class="rel-yr">${r.year}</div>
             <div class="rel-nm">${r.name}</div>
           </div>
         `).join('')}
       </div>`
    : '';

  document.getElementById('bd-info').innerHTML = `
    <button class="bk-btn" id="bk-battles" style="margin:28px 0 22px;">← Back to Battles</button>
    <div class="bd-ttl">${b.name}</div>
    <div class="bd-yl">${b.year}</div>
    <div class="bd-meta">
      <div class="bmi"><div class="bmi-lb">Date</div><div class="bmi-vl">${b.d.date}</div></div>
      <div class="bmi"><div class="bmi-lb">Location</div><div class="bmi-vl">${b.d.loc}</div></div>
      <div class="bmi"><div class="bmi-lb">Outcome</div><div class="bmi-vl">${b.d.out}</div></div>
    </div>
    <div class="bd-sh">Commanders</div>   <div class="bd-sb">${b.d.cmd}</div>
    <div class="bd-sh">Forces Engaged</div><div class="bd-sb">${b.d.str}</div>
    <div class="bd-sh">Strategy</div>     <div class="bd-sb">${b.d.strat}</div>
    <div class="bd-sh">Turning Point</div><div class="bd-sb">${b.d.turn}</div>
    <div class="bd-sh">Casualties</div>   <div class="bd-sb">${b.d.cas}</div>
    <div class="bd-sh">Historical Significance</div><div class="bd-sb">${b.d.sig}</div>
    ${relHTML}
  `;

  gotoPage('bdetail');
}
