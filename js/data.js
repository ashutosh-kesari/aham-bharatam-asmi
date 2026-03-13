/* ════════════════════════════════════════
   data.js — All historical data
   Dynasties, Battles, Did-You-Know facts
════════════════════════════════════════ */

const DYN = {
  ancient: [
    {
      id: 'indus', period: 'c. 3300 – 1300 BCE',
      name: 'Indus Valley Civilization', founder: 'Ashutosh Kesari — Urban Origins',
      sig: 'The world\'s first urban civilization with planned cities, advanced drainage, and a yet-undeciphered script.',
      rulers: [
        { name: 'Urban Phase (Harappa)',    reign: '2600–1900 BCE', desc: 'Peak urban development. Cities like Harappa and Mohenjo-daro had advanced drainage, standardized weights, and multi-story structures.', stars: 5 },
        { name: 'Transitional Phase',       reign: '1900–1700 BCE', desc: 'Climate shifts caused gradual dispersal eastward toward the Gangetic plains. Trade networks contracted.',                                   stars: 3 },
        { name: 'Late Harappan Phase',      reign: '1700–1300 BCE', desc: 'Smaller settlements flourished in the east. Contact with Central Asian cultures grew as great urban centres declined.',                   stars: 2 },
      ]
    },
    {
      id: 'maurya', period: '322 – 185 BCE',
      name: 'Mauryan Empire', founder: 'Chandragupta Maurya',
      sig: 'The first pan-Indian empire. Under Ashoka, Buddhism and Dharma spread across Asia through rock-carved edicts of compassion.',
      rulers: [
        { name: 'Chandragupta Maurya', reign: '322–298 BCE', desc: 'Overthrew the Nanda dynasty with Chanakya\'s guidance. Unified northern India and repelled the Seleucid invasion. First superpower of the subcontinent.', stars: 5 },
        { name: 'Bindusara',           reign: '298–272 BCE', desc: 'Expanded southward into the Deccan. Known as "Amitraghata" (Slayer of Foes). Maintained ties with Seleucid and Ptolemaic empires.',                     stars: 3 },
        { name: 'Ashoka the Great',    reign: '268–232 BCE', desc: 'After the horror of Kalinga, renounced war and embraced Dharma. His rock edicts span from Afghanistan to Sri Lanka — a moral revolution in stone.',       stars: 5 },
        { name: 'Dasharatha',          reign: '232–224 BCE', desc: 'Continued Buddhist patronage; donated the Barabar caves to Ajivika monks.',                                                                                   stars: 2 },
        { name: 'Brihadratha',         reign: '187–185 BCE', desc: 'Last Mauryan emperor. Assassinated by his general Pushyamitra Shunga — ending 137 years of Mauryan rule.',                                                   stars: 1 },
      ]
    },
    {
      id: 'gupta', period: '320 – 550 CE',
      name: 'Gupta Empire', founder: 'Sri Gupta',
      sig: 'India\'s Golden Age — Aryabhata computed π, Kalidasa wrote immortal poetry, and Nalanda University drew scholars from across Asia.',
      rulers: [
        { name: 'Sri Gupta',                          reign: 'c. 240–280 CE', desc: 'Founded the Gupta lineage in Magadha. A humble start — his successors would build one of history\'s greatest empires.', stars: 3 },
        { name: 'Chandragupta I',                     reign: '320–335 CE',   desc: 'Elevated the dynasty through a strategic alliance with the powerful Lichchhavi clan. Declared himself Maharajadhiraja.',         stars: 4 },
        { name: 'Samudragupta',                       reign: '335–375 CE',   desc: 'The "Napoleon of India" — subjugated over 20 kings and never lost a battle. A poet, musician, and warrior of extraordinary genius.', stars: 5 },
        { name: 'Chandragupta II (Vikramaditya)',      reign: '380–415 CE',   desc: 'India\'s true Golden Age. Patronized Kalidasa, Aryabhata, Varahamihira. The Iron Pillar of Delhi stands rust-free after 1,650 years.', stars: 5 },
        { name: 'Kumaragupta I',                      reign: '415–455 CE',   desc: 'Founded Nalanda University — one of history\'s greatest centres of learning, drawing students from China, Korea, and Tibet.',            stars: 4 },
        { name: 'Skandagupta',                        reign: '455–467 CE',   desc: 'Heroically repelled the devastating Huna (Hun) invasions. The last great Gupta emperor before the empire\'s fragmentation.',             stars: 4 },
      ]
    },
    {
      id: 'kushan', period: '30 – 375 CE',
      name: 'Kushan Empire', founder: 'Kujula Kadphises',
      sig: 'Masters of the Silk Road — bridged Rome, India, and China while spreading Buddhism to Central Asia.',
      rulers: [
        { name: 'Kujula Kadphises', reign: '30–80 CE',    desc: 'Unified the Yuezhi tribes and founded the empire. Controlled the most lucrative trade routes between Rome and China.',                                          stars: 4 },
        { name: 'Vima Kadphises',   reign: '80–127 CE',   desc: 'Invaded northern India and issued India\'s first gold coins. Worshipped Shiva on his coinage.',                                                                  stars: 4 },
        { name: 'Kanishka the Great', reign: '127–150 CE', desc: 'Greatest Kushan ruler. Hosted the Fourth Buddhist Council. Buddhist art and culture spread across the Silk Road from Afghanistan to China.',                    stars: 5 },
        { name: 'Huvishka',         reign: '150–190 CE',  desc: 'His extraordinary coins show Hindu, Buddhist, Zoroastrian, and Greek deities — a testament to Kushan cosmopolitanism.',                                         stars: 3 },
      ]
    },
  ],
  medieval: [
    {
      id: 'chola', period: 'c. 300 BCE – 1279 CE',
      name: 'Chola Dynasty', founder: 'Vijayalaya Chola (Imperial)',
      sig: 'Masters of maritime trade; built the breathtaking Brihadeeswara Temple and sent navies across Southeast Asia.',
      rulers: [
        { name: 'Vijayalaya Chola',       reign: '848–871 CE',   desc: 'Founded the Imperial Chola line by capturing Thanjavur. Set the stage for the south\'s greatest empire.',                                              stars: 4 },
        { name: 'Aditya I',               reign: '871–907 CE',   desc: 'Defeated the Pallava king Aparajita and expanded northward. Built numerous Shiva temples along the Kaveri.',                                            stars: 4 },
        { name: 'Parantaka I',            reign: '907–955 CE',   desc: 'Conquered Madurai and invaded Sri Lanka. Generous patron of temple construction across Tamil Nadu.',                                                    stars: 3 },
        { name: 'Rajaraja I the Great',   reign: '985–1014 CE',  desc: 'Built the magnificent Brihadeeswara Temple — a UNESCO World Heritage Site. Naval expeditions to the Maldives and Sri Lanka.',                          stars: 5 },
        { name: 'Rajendra Chola I',       reign: '1012–1044 CE', desc: 'Led naval campaigns to Southeast Asia, defeating Srivijaya. Founded Gangaikonda Cholapuram — the zenith of Chola maritime power.',                     stars: 5 },
        { name: 'Kulottunga I',           reign: '1070–1120 CE', desc: 'United the Chola and Chalukya lines. Administrative reforms and trade revival brought remarkable prosperity.',                                          stars: 4 },
      ]
    },
    {
      id: 'chalukya', period: '543 – 753 CE',
      name: 'Chalukya Dynasty (Badami)', founder: 'Pulakeshin I',
      sig: 'The dynasty that stopped Harsha\'s pan-Indian conquest — proud defenders of the Deccan\'s independence.',
      rulers: [
        { name: 'Pulakeshin I',    reign: '543–566', desc: 'Founded the kingdom at Badami. A powerful chieftain who united the Deccan and commissioned magnificent rock-cut temples.',              stars: 4 },
        { name: 'Pulakeshin II',   reign: '610–642', desc: 'Greatest Chalukya king. Halted Harsha\'s southward march at the Narmada river — Harsha\'s only major battlefield defeat.',             stars: 5 },
        { name: 'Vikramaditya I',  reign: '655–680', desc: 'Recovered Vatapi from the Pallavas after his father\'s defeat. Restored Chalukya prestige.',                                           stars: 3 },
        { name: 'Vikramaditya II', reign: '733–745', desc: 'Captured Kanchi three times. Commissioned the Pattadakal temples — a UNESCO World Heritage Site of Dravidian architecture.',           stars: 4 },
      ]
    },
    {
      id: 'pallava', period: '275 – 897 CE',
      name: 'Pallava Dynasty', founder: 'Simhavarman I',
      sig: 'Architects of Dravidian temple art — their Shore Temple at Mahabalipuram has withstood 1,300 years of sea wind.',
      rulers: [
        { name: 'Simhavarman I',                    reign: 'c. 275 CE', desc: 'Earliest known Pallava king. Established the dynasty in the coastal Tamil region.',                                                         stars: 3 },
        { name: 'Mahendravarman I',                 reign: '580–630',   desc: 'Brilliant playwright and patron of the arts. Pioneered rock-cut temple architecture — the beginning of Dravidian stone temples.',             stars: 4 },
        { name: 'Narasimhavarman I (Mahamalla)',     reign: '630–668',   desc: 'Defeated and slew Pulakeshin II. Built the Shore Temple and the five magnificent rathas at Mahabalipuram.',                                  stars: 5 },
        { name: 'Rajasimha (Narasimhavarman II)',    reign: '690–728',   desc: 'Built the iconic Shore Temple. Sent diplomatic missions to China and commissioned the Kailasanatha Temple at Kanchipuram.',                  stars: 4 },
      ]
    },
    {
      id: 'rashtrakuta', period: '753 – 982 CE',
      name: 'Rashtrakuta Dynasty', founder: 'Dantidurga',
      sig: 'They carved an entire temple from a single mountain — the Kailasa at Ellora, the world\'s largest monolithic structure.',
      rulers: [
        { name: 'Dantidurga',     reign: '735–756', desc: 'Overthrew the Chalukyas and founded the dynasty. Performed the Hiranyagarbha ceremony to claim sovereign status.',                    stars: 4 },
        { name: 'Krishna I',      reign: '756–773', desc: 'Commissioned the Kailasa Temple at Ellora — carved top-down from a single mountain rock. An estimated 200,000 tonnes of stone removed.', stars: 5 },
        { name: 'Dhruva Dharavarsha', reign: '780–793', desc: 'Campaigned to the Gangetic plains. Established the Rashtrakutas as a truly pan-Indian power.',                                    stars: 4 },
        { name: 'Amoghavarsha I', reign: '814–878', desc: 'Ruled for 64 years. Poet, scholar, and just ruler. Wrote Kavirajamarga — the earliest surviving Kannada literary text.',              stars: 5 },
      ]
    },
  ],
  modern: [
    {
      id: 'vijayanagara', period: '1336 – 1646 CE',
      name: 'Vijayanagara Empire', founder: 'Harihara I & Bukka I',
      sig: 'The last great Hindu empire — Hampi\'s ruins still whisper of a city wealthier than Rome at its medieval peak.',
      rulers: [
        { name: 'Harihara I',       reign: '1336–1356', desc: 'Co-founded the empire on the banks of the Tungabhadra. Established the magnificent city of Vijayanagara.',                          stars: 4 },
        { name: 'Bukka Raya I',     reign: '1356–1377', desc: 'Expanded and defended the empire against the Bahmani Sultanate. A generous patron of Telugu and Kannada literature.',                stars: 4 },
        { name: 'Devaraya II',      reign: '1424–1446', desc: 'Reformed the military by recruiting Muslim cavalry. Called "the greatest king of medieval South India" by foreign visitors.',         stars: 4 },
        { name: 'Krishnadevaraya',  reign: '1509–1529', desc: 'Greatest Vijayanagara king — poet, warrior, administrator. His court hosted the Ashtadiggajas (eight literary giants).',             stars: 5 },
        { name: 'Aliya Rama Raya',  reign: '1542–1565', desc: 'Powerful regent whose capture and execution at Talikota caused the catastrophic sack of magnificent Hampi.',                         stars: 3 },
      ]
    },
    {
      id: 'mughal', period: '1526 – 1857 CE',
      name: 'Mughal Empire', founder: 'Babur',
      sig: 'Built the Taj Mahal and the Red Fort; unified the subcontinent — the world\'s largest economy for over two centuries.',
      rulers: [
        { name: 'Babur',              reign: '1526–1530',        desc: 'First Mughal emperor. Defeated Ibrahim Lodi at Panipat using artillery for the first time in India. Poet and memoirist.',   stars: 5 },
        { name: 'Humayun',            reign: '1530–40, 1555–56', desc: 'Lost the empire to Sher Shah Suri and lived in Persian exile for 15 years. Reclaimed Delhi but died in an accident shortly after.', stars: 3 },
        { name: 'Akbar the Great',    reign: '1556–1605',        desc: 'India\'s greatest ruler. Religious tolerance, administrative genius, military mastery, and patron of the arts.',               stars: 5 },
        { name: 'Jahangir',           reign: '1605–1627',        desc: 'Patron of miniature painting and author of the Tuzuk-i-Jahangiri. A figure of great culture and personal contradictions.',    stars: 3 },
        { name: 'Shah Jahan',         reign: '1628–1658',        desc: 'Built the Taj Mahal as an eternal monument to love. His architectural patronage remains unparalleled in world history.',      stars: 5 },
        { name: 'Aurangzeb',          reign: '1658–1707',        desc: 'Extended the empire to its greatest territorial extent. His polarizing policies seeded the resistance that fragmented the empire.', stars: 4 },
        { name: 'Bahadur Shah Zafar', reign: '1837–1857',        desc: 'Last Mughal emperor and gifted Urdu poet. Became the reluctant symbol of the 1857 revolt. Exiled to Rangoon.',                stars: 3 },
      ]
    },
    {
      id: 'maratha', period: '1674 – 1818 CE',
      name: 'Maratha Empire', founder: 'Chhatrapati Shivaji Maharaj',
      sig: 'Never broken in spirit — Shivaji\'s guerrilla warfare and naval mastery redefined Indian resistance forever.',
      rulers: [
        { name: 'Shivaji Maharaj',       reign: '1674–1680', desc: 'Founded the empire through brilliant guerrilla warfare. Created Swarajya (self-rule), a powerful navy, and Hindavi culture.',   stars: 5 },
        { name: 'Sambhaji Maharaj',      reign: '1680–1689', desc: 'Continued fierce resistance against Aurangzeb\'s massive campaigns. Captured and executed — an immortal Maratha martyr.',        stars: 4 },
        { name: 'Shahu I',               reign: '1707–1749', desc: 'Consolidated power after Aurangzeb\'s death. Under the brilliant Peshwas, the Maratha confederacy reached its zenith.',          stars: 4 },
        { name: 'Bajirao I (Peshwa)',    reign: '1720–1740', desc: 'Never lost a battle — 41 engagements, all victories. Expanded Maratha power from the Deccan to the banks of the Sindhu.',        stars: 5 },
        { name: 'Vishwasrao (Peshwa)',   reign: '1761',      desc: 'Died at the Third Battle of Panipat, shattering Maratha morale and ending all hopes of northward expansion.',                    stars: 3 },
      ]
    },
    {
      id: 'sikh', period: '1799 – 1849 CE',
      name: 'Sikh Empire', founder: 'Maharaja Ranjit Singh',
      sig: 'The Lion of Punjab — never lost a battle, created South Asia\'s first secular kingdom, and held the Kohinoor diamond.',
      rulers: [
        { name: 'Maharaja Ranjit Singh', reign: '1799–1839', desc: 'Unified the Sikh misls into a formidable empire. Never lost a battle. Created South Asia\'s first secular state and held the Kohinoor.', stars: 5 },
        { name: 'Kharak Singh',          reign: '1839–1840', desc: 'Brief reign marked by court intrigue and power struggles. The empire began a dangerous internal fragmentation.',                           stars: 2 },
        { name: 'Sher Singh',            reign: '1840–1843', desc: 'Temporarily stabilized the court, then was assassinated. Rapid decline followed.',                                                         stars: 2 },
        { name: 'Duleep Singh',          reign: '1843–1849', desc: 'Last Maharaja, deposed at age 10. The Kohinoor was surrendered to Queen Victoria. He spent his life seeking its return.',                  stars: 2 },
      ]
    },
  ]
};

/* ════════════════════════════════════════
   BATTLES DATA
════════════════════════════════════════ */
const BATTLES = [
  {
    id: 'tenKings', icon: '🏹', year: 'c. 1500 BCE',
    name: 'Battle of the Ten Kings',
    between: 'Bharata tribe (King Sudas) vs. Confederation of Ten Tribes',
    summary: 'One of humanity\'s oldest recorded battles, immortalized in the Rigveda. King Sudas channeled the Ravi river to flood and destroy a coalition army ten times his size.',
    d: {
      date: 'c. 1500 BCE', loc: 'Ravi River, Punjab', out: 'Decisive victory for King Sudas',
      cmd: 'King Sudas of the Bharata tribe vs. Coalition of Puru, Yadu, Turvasha & 7 allied tribes',
      str: 'Bharata: small elite force | Coalition: ten tribes united',
      strat: 'Sudas, guided by Rishi Vishwamitra, strategically altered the course of the Ravi river mid-battle, flooding the enemy formation.',
      turn: 'The sudden flooding of the battlefield trapped and decimated the coalition forces. The ten kings could not regroup.',
      cas: 'Unknown — Bronze Age scale',
      sig: 'Establishes the political dominance of the Bharata tribe — giving India its ancient name, Bharatavarsha. Immortalized in Mandala 7 of the Rigveda, it is the oldest recorded battle in South Asia.',
      rel: [{ id: 'kalinga', year: '261 BCE', name: 'Kalinga War' }]
    }
  },
  {
    id: 'hydaspes', icon: '🐘', year: '326 BCE',
    name: 'Battle of the Hydaspes',
    between: 'Alexander the Great (Macedon) vs. King Porus (Pauravas)',
    summary: 'Alexander\'s hardest victory. King Porus and his war elephants so impressed Alexander that India\'s eastern frontier remained unconquered — and the Macedonian army refused to march further.',
    d: {
      date: 'May 326 BCE', loc: 'Jhelum River (Hydaspes), Punjab', out: 'Macedonian tactical victory; Porus reinstated as vassal king',
      cmd: 'Alexander III of Macedon vs. Raja Porus of the Pauravas',
      str: 'Macedonians: ~41,000 | Pauravas: ~50,000 + 200 war elephants + 300 chariots',
      strat: 'Alexander crossed the flooded Jhelum at night in a daring flanking maneuver, attacking Porus\'s exposed flank at dawn.',
      turn: 'Macedonian cavalry maddened Porus\'s war elephants, which turned inward, trampling their own infantry. Porus fought until wounded by multiple arrows.',
      cas: 'Macedonians: ~1,200 killed | Pauravas: ~23,000 killed',
      sig: 'After this battle, Alexander\'s troops refused to march east — India was never conquered. Porus was reinstated as an ally-king. The battle permanently fixed the Macedonian eastern frontier.',
      rel: [{ id: 'tenKings', year: 'c.1500 BCE', name: 'Battle of Ten Kings' }, { id: 'tarain2', year: '1192 CE', name: 'Second Battle of Tarain' }]
    }
  },
  {
    id: 'kalinga', icon: '☸️', year: '261 BCE',
    name: 'Kalinga War',
    between: 'Mauryan Empire (Emperor Ashoka) vs. Kalinga Kingdom',
    summary: 'The war that changed an emperor\'s soul. From the carnage of 100,000 dead, Ashoka chose Dharma over conquest — one of history\'s most extraordinary moral transformations.',
    d: {
      date: '261 BCE', loc: 'Dhauli Hills, Kalinga (modern Odisha)', out: 'Decisive Mauryan victory. Kalinga annexed.',
      cmd: 'Emperor Ashoka (Priyadarshi) vs. Kalinga King (name unrecorded)',
      str: 'Mauryan: ~400,000 troops | Kalinga: ~60,000 infantry + 1,700 cavalry + 700 war elephants',
      strat: 'Ashoka deployed the full might of the world\'s largest standing army against Kalinga\'s determined defense of independence.',
      turn: 'The fall of Dhauli hill-fort. Ashoka surveyed the aftermath and was shattered by the scale of human suffering — rivers running with blood.',
      cas: '~100,000 Kalingans killed, ~150,000 deported; tens of thousands more from famine and disease',
      sig: 'Ashoka\'s transformation from conqueror to Dhamma-king is one of history\'s most remarkable moral conversions. His rock edicts from Afghanistan to Sri Lanka proclaim non-violence and welfare. His legacy shaped Buddhism\'s spread across Asia.',
      rel: [{ id: 'tenKings', year: 'c.1500 BCE', name: 'Battle of Ten Kings' }, { id: 'panipat1', year: '1526 CE', name: 'First Battle of Panipat' }]
    }
  },
  {
    id: 'tarain2', icon: '🗡️', year: '1192 CE',
    name: 'Second Battle of Tarain',
    between: 'Ghurid Sultanate (Muhammad of Ghor) vs. Rajput Confederacy (Prithviraj Chauhan III)',
    summary: 'Prithviraj had spared Muhammad of Ghor after his first victory. Muhammad returned with a new strategy. This defeat opened the gates of Hindustan to 320 years of Sultanate rule.',
    d: {
      date: '1192 CE', loc: 'Tarain (Taraori), near Karnal, Haryana', out: 'Decisive Ghurid victory. Prithviraj captured and executed.',
      cmd: 'Muhammad of Ghor & Qutb al-Din Aibak vs. Prithviraj Chauhan III of Ajmer-Delhi',
      str: 'Ghurids: ~120,000 mobile cavalry + Afghan infantry | Rajput Confederacy: ~300,000 infantry + elephant corps',
      strat: 'Muhammad deployed five rotating cavalry divisions, keeping fresh horses in reserve to exhaust the slower Rajput elephant-heavy formations. A pre-dawn assault struck before the Rajputs could prepare.',
      turn: 'The dawn surprise assault caused total formation collapse. The elephant corps, slow and without cavalry support, was systematically destroyed.',
      cas: 'Massive losses on both sides; Prithviraj Chauhan III captured and later executed',
      sig: 'This battle ended centuries of Rajput dominance in northern India. The Delhi Sultanate that followed would rule for 320 years. One of the most consequential military defeats in Indian history.',
      rel: [{ id: 'panipat1', year: '1526', name: 'First Battle of Panipat' }, { id: 'haldighati', year: '1576', name: 'Battle of Haldighati' }]
    }
  },
  {
    id: 'panipat1', icon: '💥', year: '1526 CE',
    name: 'First Battle of Panipat',
    between: 'Mughal Empire (Babur) vs. Delhi Sultanate (Ibrahim Lodi)',
    summary: 'Artillery meets war elephants for the first time in India. Babur\'s 12,000 shattered Ibrahim Lodi\'s 100,000-strong army in a single morning, ending 320 years of the Delhi Sultanate.',
    d: {
      date: 'April 21, 1526', loc: 'Panipat, Haryana', out: 'Decisive Mughal victory. Delhi Sultanate ended. Mughal Empire founded.',
      cmd: 'Zahiruddin Muhammad Babur vs. Ibrahim Lodi (who died fighting in the field)',
      str: 'Mughal: ~12,000 soldiers + 20 field artillery pieces | Lodi: ~100,000 troops + 1,000 war elephants',
      strat: 'Babur used the "Tulughma" (flanking encirclement) with central artillery — India\'s first use of field guns in battle.',
      turn: 'Artillery fire panicked Ibrahim\'s war elephants, which stampeded back through their own ranks. Mughal cavalry then executed perfect flanking encirclement.',
      cas: 'Ibrahim Lodi killed in battle. ~20,000 Lodi casualties. Mughal losses minimal.',
      sig: 'Founded the Mughal Empire that ruled India for 330 years and built the Taj Mahal and Red Fort. Permanently introduced gunpowder artillery as the decisive weapon in South Asian warfare.',
      rel: [{ id: 'tarain2', year: '1192', name: 'Second Battle of Tarain' }, { id: 'panipat3', year: '1761', name: 'Third Battle of Panipat' }]
    }
  },
  {
    id: 'talikota', icon: '🔥', year: '1565 CE',
    name: 'Battle of Talikota',
    between: 'Vijayanagara Empire vs. Alliance of Four Deccan Sultanates',
    summary: 'The fall of Hampi — one of medieval Asia\'s greatest cities was looted for months. A mid-battle betrayal turned certain victory into the most catastrophic defeat in South Indian history.',
    d: {
      date: 'January 23, 1565', loc: 'Rakshasi-Tangadi near Talikota, Karnataka', out: 'Decisive Sultanate victory. Hampi sacked and destroyed.',
      cmd: 'Aliya Rama Raya vs. Ali Adil Shah I (Bijapur) + Hussain Nizam Shah (Ahmadnagar) + Ibrahim Qutb Shah (Golconda) + Ali Barid Shah (Bidar)',
      str: 'Vijayanagara: ~900,000 | Allied Sultans: ~650,000',
      strat: 'The allied sultans coordinated simultaneous attacks on multiple fronts, exploiting their artillery advantage and secretly recruiting two of Rama Raya\'s own Muslim commanders.',
      turn: 'Mid-battle, two Muslim commanders in Rama Raya\'s service suddenly switched sides. Rama Raya was captured on his palanquin and immediately beheaded — causing instantaneous panic and collapse.',
      cas: 'Rama Raya executed on the field; tens of thousands killed in battle and during months of looting',
      sig: 'The fall of Hampi ended the last great Hindu empire of the south. What once rivaled Rome in wealth became haunting ruins — now a UNESCO World Heritage Site.',
      rel: [{ id: 'haldighati', year: '1576', name: 'Battle of Haldighati' }, { id: 'panipat3', year: '1761', name: 'Third Battle of Panipat' }]
    }
  },
  {
    id: 'haldighati', icon: '🦁', year: '1576 CE',
    name: 'Battle of Haldighati',
    between: 'Mughal Empire (Man Singh I) vs. Mewar Kingdom (Maharana Pratap Singh)',
    summary: 'Though outnumbered 3:1 in a narrow mountain pass, Maharana Pratap never surrendered — not then, not ever. His horse Chetak became immortal. The flame of Mewar was never extinguished.',
    d: {
      date: 'June 18, 1576', loc: 'Haldighati Pass, Rajasthan', out: 'Tactical Mughal victory; Pratap escaped and recovered most of Mewar before his death.',
      cmd: 'Man Singh I of Amber (Mughal general) vs. Maharana Pratap Singh I of Mewar',
      str: 'Mughal: ~10,000 cavalry + artillery | Mewar: ~3,000 cavalry + 400 Bhil tribal archers',
      strat: 'Pratap launched a powerful cavalry charge to break the Mughal formation in the narrow pass, where Mughal numerical advantage couldn\'t fully deploy.',
      turn: 'Mughal reinforcements encircled the field. Pratap\'s legendary horse Chetak, fatally wounded, carried the Maharana to safety before collapsing and dying.',
      cas: '~500 Mewari soldiers, ~350 Mughal soldiers',
      sig: 'Maharana Pratap never accepted Mughal suzerainty. Operating from the Aravalli hills, he recovered nearly all of Mewar within his lifetime. The eternal symbol of Rajput valor.',
      rel: [{ id: 'talikota', year: '1565', name: 'Battle of Talikota' }, { id: 'panipat3', year: '1761', name: 'Third Battle of Panipat' }]
    }
  },
  {
    id: 'panipat3', icon: '⚡', year: '1761 CE',
    name: 'Third Battle of Panipat',
    between: 'Afghan Durrani Empire (Ahmad Shah Durrani) vs. Maratha Empire (Sadashivrao Bhau)',
    summary: 'The bloodiest battle of the 18th century. 50,000 Maratha soldiers fell in a single day — along with an entire generation of leaders. The dream of a Maratha-ruled India died at Panipat.',
    d: {
      date: 'January 14, 1761', loc: 'Panipat, Haryana', out: 'Decisive Durrani victory. Maratha northern expansion permanently broken.',
      cmd: 'Ahmad Shah Durrani & Najib-ud-Daula vs. Sadashivrao Bhau & Vishwasrao (Peshwa\'s son)',
      str: 'Durrani + Rohilla: ~60,000 cavalry + camel artillery | Maratha: ~45,000 army + ~200,000 civilian pilgrims',
      strat: 'Durrani used combined-arms: Afghan cavalry, Rohilla infantry, devastating camel-mounted swivel guns. The Marathas, burdened by 200,000 pilgrims, were strategically immobilized.',
      turn: 'Vishwasrao (heir apparent) was killed by a stray bullet. Sadashivrao Bhau charged into the thickest fighting to avenge him — and was killed. Total collapse followed.',
      cas: '~50,000–75,000 Maratha soldiers killed; thousands of civilian pilgrims massacred in the aftermath',
      sig: 'Shattered Maratha hegemony and opened the path for British supremacy. The Peshwa died of grief upon hearing the news. A civilizational turning point — the last indigenous power capable of uniting India was broken.',
      rel: [{ id: 'panipat1', year: '1526', name: 'First Battle of Panipat' }, { id: 'haldighati', year: '1576', name: 'Battle of Haldighati' }]
    }
  }
];

/* ════════════════════════════════════════
   DID YOU KNOW FACTS
════════════════════════════════════════ */
const DYKS = [
  'The Great Bath of Mohenjo-daro, built in 2500 BCE, had a waterproof bitumen lining. Modern engineers still marvel at its construction techniques.',
  'Chandragupta Maurya\'s minister Chanakya wrote the Arthashastra — a treatise on statecraft predating Machiavelli\'s "The Prince" by 1,800 years.',
  'Aryabhata calculated π to 4 decimal places (3.1416) in 499 CE — and first proposed that the Earth rotates on its own axis.',
  'The Iron Pillar of Delhi (c. 375 CE) has stood for 1,650 years without rusting — a metallurgical feat not replicated until the 20th century.',
  'Rajendra Chola I\'s 1025 CE naval campaign reached Thailand, Malaysia, and Indonesia — the only Indian empire to project power into Southeast Asia.',
  'Maharana Pratap\'s horse Chetak, mortally wounded, carried the Maharana to safety and crossed a stream before collapsing — achieving immortality in Rajasthani ballads.',
  'At its height in 1700 CE, the Mughal Empire produced approximately 25% of total world GDP — more than the entirety of Europe combined.',
  'The Kailasa Temple at Ellora was carved top-down from a single mountain rock. An estimated 200,000 tonnes of stone were removed with no mortar, no foundation.',
  'Bajirao I (Maratha Peshwa) fought 41 battles and never lost a single one — a military record unmatched in Indian history.',
  'The Nalanda University library was so vast it reportedly burned for three months when destroyed in 1193 CE.',
];
