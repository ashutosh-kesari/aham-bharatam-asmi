// Comprehensive Indian Dynasties Data
// Organized by Era based on Wikipedia: List of Indian Monarchs

export const COMPREHENSIVE_DYNASTIES = {
  ancient: [
    // Vedic & Early Kingdoms
    {
      id: 'magadha-early',
      name: 'Kingdom of Magadha',
      period: 'c. 1200 – 322 BCE',
      founder: 'Unknown',
      sig: 'One of the most powerful kingdoms in ancient India, eventually leading to the Mauryan Empire.',
      rulers: [
        { name: 'Brihadratha', reign: 'c. 1200 BCE', desc: 'Early legendary king of Magadha', stars: 2 },
        { name: 'Jarashanda', reign: 'c. 600 BCE', desc: 'Known from Panini\'s writings', stars: 2 },
        { name: 'Mahapadma Nanda', reign: 'c. 362–345 BCE', desc: 'First ruler of Nanda dynasty, expanded Magadha significantly', stars: 4 },
        { name: 'Dhana Nanda', reign: 'c. 345–322 BCE', desc: 'Last Nanda ruler, overthrown by Chandragupta Maurya', stars: 3 }
      ]
    },
    {
      id: 'kuru',
      name: 'Kuru Kingdom',
      period: 'c. 1200 – 345 BCE',
      founder: 'King Kuru',
      sig: 'A central Indian kingdom mentioned in the Mahabharata, known for establishing religious traditions.',
      rulers: [
        { name: 'King Kuru', reign: 'c. 1200 BCE', desc: 'Legendary founder, eponymous ancestor of Kurus', stars: 3 },
        { name: 'King Parikshit', reign: 'c. 900 BCE', desc: 'Righteous king, grandson of Arjuna', stars: 3 },
        { name: 'King Kshemaka', reign: 'c. 500 BCE', desc: 'Last pre-Mahabharata king', stars: 2 }
      ]
    },
    {
      id: 'kosala',
      name: 'Kosala Kingdom',
      period: 'c. 1100 – 345 BCE',
      founder: 'King Ikshvaku',
      sig: 'Ancient kingdom in present-day Uttar Pradesh, birthplace of Buddha.',
      rulers: [
        { name: 'King Ikshvaku', reign: 'c. 1100 BCE', desc: 'Legendary founder of Solar dynasty', stars: 3 },
        { name: 'King Dasharatha', reign: 'c. 900 BCE', desc: 'Father of Rama in Ramayana', stars: 4 },
        { name: 'King Rama', reign: 'c. 870–800 BCE', desc: 'Avatar of Vishnu, hero of Ramayana', stars: 5 },
        { name: 'King Prasenajit', reign: 'c. 600–500 BCE', desc: 'Historical king, contemporary of Buddha', stars: 3 }
      ]
    },
    {
      id: 'vatsa',
      name: 'Vatsa Kingdom',
      period: 'c. 1100 – 300 BCE',
      founder: 'King Vatsa',
      sig: 'A powerful kingdom in the Ganges valley, known for wealth and learning.',
      rulers: [
        { name: 'King Udayana', reign: 'c. 600 BCE', desc: 'Famous king, patron of arts, friend of Buddha', stars: 4 },
        { name: 'King Varttika', reign: 'c. 500–400 BCE', desc: 'Son of Udayana, patron of philosophers', stars: 3 }
      ]
    },
    {
      id: 'avanti',
      name: 'Kingdom of Avanti',
      period: 'c. 1100 – 400 BCE',
      founder: 'King Chakra',
      sig: 'Major western Indian kingdom, one of the great Mahajanapadas.',
      rulers: [
        { name: 'King Pradyota', reign: 'c. 800 BCE', desc: 'Early powerful ruler', stars: 3 },
        { name: 'King Chandapradyota', reign: 'c. 600–540 BCE', desc: 'Contemporary of Buddha', stars: 3 }
      ]
    },
    {
      id: 'panchala',
      name: 'Panchala Kingdom',
      period: 'c. 1100 BCE – 350 CE',
      founder: 'King Panchala',
      sig: 'Powerful kingdom in upper Ganges region, famous for its rivers and trade.',
      rulers: [
        { name: 'King Panchala', reign: 'c. 1100 BCE', desc: 'Eponymous founder', stars: 3 },
        { name: 'King Draupada', reign: 'c. 900 BCE', desc: 'King featured in Mahabharata', stars: 4 }
      ]
    },
    {
      id: 'matsya',
      name: 'Matsya Kingdom',
      period: 'c. 1100 – 500 BCE',
      founder: 'King Matsya',
      sig: 'Ancient kingdom in the Vedas, later associated with the fish avatar of Vishnu.',
      rulers: [
        { name: 'King Virata', reign: 'c. 700 BCE', desc: 'King who sheltered Pandavas in exile', stars: 3 }
      ]
    },
    // Now adding the ones we already had plus many more
    {
      id: 'maurya',
      name: 'Mauryan Empire',
      period: '322 – 185 BCE',
      founder: 'Chandragupta Maurya',
      sig: 'The first pan-Indian empire. Under Ashoka, Buddhism and Dharma spread across Asia through rock-carved edicts of compassion.',
      rulers: [
        { name: 'Chandragupta Maurya', reign: '322–298 BCE', desc: 'Overthrew the Nanda dynasty with Chanakya\'s guidance. Unified northern India and repelled the Seleucid invasion. First superpower of the subcontinent.', stars: 5 },
        { name: 'Bindusara', reign: '298–272 BCE', desc: 'Expanded southward into the Deccan. Known as "Amitraghata" (Slayer of Foes). Maintained ties with Seleucid and Ptolemaic empires.', stars: 3 },
        { name: 'Ashoka the Great', reign: '268–232 BCE', desc: 'After the horror of Kalinga, renounced war and embraced Dharma. His rock edicts span from Afghanistan to Sri Lanka — a moral revolution in stone.', stars: 5 },
        { name: 'Dasharatha', reign: '232–224 BCE', desc: 'Continued Buddhist patronage; donated the Barabar caves to Ajivika monks.', stars: 2 },
        { name: 'Samprati', reign: '224–215 BCE', desc: 'Jain ruler who spread Jainism across India', stars: 3 },
        { name: 'Salisuka', reign: '215–202 BCE', desc: 'Period of decline began', stars: 2 },
        { name: 'Brihadratha', reign: '187–185 BCE', desc: 'Last Mauryan emperor. Assassinated by his general Pushyamitra Shunga — ending 137 years of Mauryan rule.', stars: 1 }
      ]
    },
    {
      id: 'shunga',
      name: 'Shunga Empire',
      period: '185 – 73 BCE',
      founder: 'Pushyamitra Shunga',
      sig: 'Founded after the fall of Mauryan Empire, patron of arts and Buddhism.',
      rulers: [
        { name: 'Pushyamitra Shunga', reign: '185–151 BCE', desc: 'General who assassinated last Mauryan emperor, founded the empire', stars: 4 },
        { name: ' Agnimitra', reign: '151–142 BCE', desc: 'Succeeded Pushyamitra, expanded kingdom', stars: 3 },
        { name: 'Vasumitra', reign: '142–141 BCE', desc: 'Defeated Indo-Greek king Demetrius', stars: 3 },
        { name: 'Bhagadatta', reign: 'c. 110 BCE', desc: 'Ancient king mentioned in Mahabharata', stars: 2 }
      ]
    },
    {
      id: 'kanva',
      name: 'Kanva Dynasty',
      period: '73 – 30 BCE',
      founder: 'Vasudeva Kanva',
      sig: 'Short-lived dynasty that succeeded the Shunga Empire.',
      rulers: [
        { name: 'Vasudeva Kanva', reign: '73–66 BCE', desc: 'Founded the dynasty', stars: 2 },
        { name: 'Bhumimitra', reign: '66–47 BCE', desc: 'Ruled for 19 years', stars: 2 },
        { name: 'Narayana', reign: '47–31 BCE', desc: 'Last Kanva ruler', stars: 2 }
      ]
    },
    {
      id: 'satavahana',
      name: 'Satavahana Dynasty',
      period: '228 BCE – 224 CE',
      founder: 'Simuka',
      sig: 'Ancient Indian dynasty from Deccan, known for trade and patronage of Buddhism.',
      rulers: [
        { name: 'Simuka', reign: '228–205 BCE', desc: 'Founded the Satavahana dynasty', stars: 3 },
        { name: 'Satakarni I', reign: '205–180 BCE', desc: 'Great conqueror, expanded empire', stars: 4 },
        { name: 'Pulumavi I', reign: 'c. 130–113 BCE', desc: 'Known from inscriptions', stars: 3 },
        { name: 'Gautamiputra Satakarni', reign: 'c. 106–130 CE', desc: 'Renowned ruler who defeated Shakas', stars: 5 },
        { name: 'Vashishtiputra Pulumavi II', reign: 'c. 130–154 CE', desc: 'Post-Gautamiputra ruler', stars: 3 }
      ]
    },
    {
      id: 'gupta',
      name: 'Gupta Empire',
      period: '320 – 550 CE',
      founder: 'Sri Gupta',
      sig: 'India\'s Golden Age — Aryabhata computed π, Kalidasa wrote immortal poetry, and Nalanda University drew scholars from across Asia.',
      rulers: [
        { name: 'Sri Gupta', reign: 'c. 240–280 CE', desc: 'Founded the Gupta lineage in Magadha. A humble start — his successors would build one of history\'s greatest empires.', stars: 3 },
        { name: 'Chandragupta I', reign: '320–335 CE', desc: 'Elevated the dynasty through a strategic alliance with the powerful Lichchhavi clan. Declared himself Maharajadhiraja.', stars: 4 },
        { name: 'Samudragupta', reign: '335–375 CE', desc: 'The "Napoleon of India" — subjugated over 20 kings and never lost a battle. A poet, musician, and warrior of extraordinary genius.', stars: 5 },
        { name: 'Chandragupta II (Vikramaditya)', reign: '380–415 CE', desc: 'India\'s true Golden Age. Patronized Kalidasa, Aryabhata, Varahamihira. The Iron Pillar of Delhi stands rust-free after 1,650 years.', stars: 5 },
        { name: 'Kumaragupta I', reign: '415–455 CE', desc: 'Founded Nalanda University — one of history\'s greatest centres of learning, drawing students from China, Korea, and Tibet.', stars: 4 },
        { name: 'Skandagupta', reign: '455–467 CE', desc: 'Heroically repelled the devastating Huna (Hun) invasions. The last great Gupta emperor before the empire\'s fragmentation.', stars: 4 },
        { name: 'Vishnugupta', reign: '467–543 CE', desc: 'Last Gupta emperor, ruled during decline', stars: 2 }
      ]
    },
    {
      id: 'kushan',
      name: 'Kushan Empire',
      period: '30 – 375 CE',
      founder: 'Kujula Kadphises',
      sig: 'Masters of the Silk Road — bridged Rome, India, and China while spreading Buddhism to Central Asia.',
      rulers: [
        { name: 'Kujula Kadphises', reign: '30–80 CE', desc: 'Unified the Yuezhi tribes and founded the empire. Controlled the most lucrative trade routes between Rome and China.', stars: 4 },
        { name: 'Vima Kadphises', reign: '80–127 CE', desc: 'Invaded northern India and issued India\'s first gold coins. Worshipped Shiva on his coinage.', stars: 4 },
        { name: 'Kanishka the Great', reign: '127–150 CE', desc: 'Greatest Kushan ruler. Hosted the Fourth Buddhist Council. Buddhist art and culture spread across the Silk Road from Afghanistan to China.', stars: 5 },
        { name: 'Huvishka', reign: '150–190 CE', desc: 'His extraordinary coins show Hindu, Buddhist, Zoroastrian, and Greek deities — a testament to Kushan cosmopolitanism.', stars: 3 },
        { name: 'Vasudeva I', reign: '190–225 CE', desc: 'Last great Kushan emperor, shifted focus to Hinduism', stars: 3 }
      ]
    },
    {
      id: 'kashmir-early',
      name: 'Karkota Dynasty',
      period: '625 – 855 CE',
      founder: 'Durlabhvardhana',
      sig: 'Golden age of Kashmir, saw construction of famous temples.',
      rulers: [
        { name: 'Durlabhvardhana', reign: '625–633 CE', desc: 'Founded the Karkota dynasty', stars: 3 },
        { name: 'Lalitaditya Muktapida', reign: '724–760 CE', desc: 'Most powerful Karkota ruler, expanded empire', stars: 5 },
        { name: 'Jayashri', reign: 'c. 770–780 CE', desc: 'Patron of arts and architecture', stars: 3 }
      ]
    }
  ],
  
  medieval: [
    // South Indian Dynasties
    {
      id: 'chola',
      name: 'Chola Dynasty',
      period: 'c. 300 BCE – 1279 CE',
      founder: 'Vijayalaya Chola (Imperial)',
      sig: 'Masters of maritime trade; built the breathtaking Brihadeeswara Temple and sent navies across Southeast Asia.',
      rulers: [
        { name: 'Vijayalaya Chola', reign: '848–871 CE', desc: 'Founded the Imperial Chola line by capturing Thanjavur. Set the stage for the south\'s greatest empire.', stars: 4 },
        { name: 'Aditya I', reign: '871–907 CE', desc: 'Defeated the Pallava king Aparajita and expanded northward. Built numerous Shiva temples along the Kaveri.', stars: 4 },
        { name: 'Parantaka I', reign: '907–955 CE', desc: 'Conquered Madurai and invaded Sri Lanka. Generous patron of temple construction across Tamil Nadu.', stars: 3 },
        { name: 'Rajaraja I the Great', reign: '985–1014 CE', desc: 'Built the magnificent Brihadeeswara Temple — a UNESCO World Heritage Site. Naval expeditions to the Maldives and Sri Lanka.', stars: 5 },
        { name: 'Rajendra Chola I', reign: '1012–1044 CE', desc: 'Led naval campaigns to Southeast Asia, defeating Srivijaya. Founded Gangaikonda Cholapuram — the zenith of Chola maritime power.', stars: 5 },
        { name: 'Rajadhiraja Chola I', reign: '1044–1054 CE', desc: 'Continued expansion, defeated Western Chalukyas', stars: 4 },
        { name: 'Rajendra Chola II', reign: '1054–1067 CE', desc: 'Known for building irrigation tanks', stars: 3 },
        { name: 'Kulottunga I', reign: '1070–1120 CE', desc: 'United the Chola and Chalukya lines. Administrative reforms and trade revival brought remarkable prosperity.', stars: 4 },
        { name: 'Vikrama Chola', reign: '1120–1135 CE', desc: 'Patron of literature', stars: 3 },
        { name: 'Kulottunga II', reign: '1135–1150 CE', desc: 'Last major Chola ruler', stars: 3 },
        { name: 'Rajaraja III', reign: '1216–1256 CE', desc: 'Weak ruler, kingdom declined', stars: 2 },
        { name: 'Rajendra Chola III', reign: '1246–1279 CE', desc: 'Last Chola emperor, kingdom merged with Pandya', stars: 1 }
      ]
    },
    {
      id: 'pandya',
      name: 'Pandya Dynasty',
      period: 'c. 600 BCE – 1650 CE',
      founder: 'Earliest Pandyas',
      sig: 'Ancient Tamil dynasty known for poetry, trade, and maritime power in southern India.',
      rulers: [
        { name: 'Nedunjeliyan I', reign: 'c. 200 BCE', desc: 'Early Pandya king, mentioned in Tamil literature', stars: 3 },
        { name: 'Mudukannadi', reign: 'c. 125 CE', desc: 'Known from inscriptions', stars: 2 },
        { name: 'Maravarman Avani Alagiyan', reign: 'c. 270–310 CE', desc: 'Early medieval Pandya ruler', stars: 2 },
        { name: 'Srivallabha', reign: 'c. 815–862 CE', desc: 'Pandya ruler during early medieval period', stars: 3 },
        { name: 'Maravarman Sundara Pandyan I', reign: '1234–1251 CE', desc: 'Revived Pandya power briefly', stars: 3 },
        { name: 'Jatavarman Sundara Pandyan', reign: '1251–1268 CE', desc: 'Conquered entire Tamil region', stars: 4 }
      ]
    },
    {
      id: 'chera',
      name: 'Chera Dynasty',
      period: 'c. 600 BCE – 1530 CE',
      founder: 'Early Cheras',
      sig: 'Ancient Tamil dynasty controlling the Kerala region, famous for spice trade.',
      rulers: [
        { name: 'Perumkadimal', reign: 'c. 400 BCE', desc: 'Early Chera king', stars: 2 },
        { name: 'Kadalul Kottiyur Narmadicheral', reign: 'c. 200 BCE', desc: 'Famous poet-king', stars: 3 },
        { name: 'Puzhiyadu', reign: 'c. 110 CE', desc: 'Known from inscriptions', stars: 2 },
        { name: 'Konguvarma', reign: 'c. 890 CE', desc: 'Revived Chera power', stars: 3 },
        { name: 'Ramaswathanka', reign: 'c. 1060 CE', desc: 'Last notable Chera ruler', stars: 2 }
      ]
    },
    {
      id: 'pallava',
      name: 'Pallava Dynasty',
      period: '275 – 897 CE',
      founder: 'Simhavarman I',
      sig: 'Architects of Dravidian temple art — their Shore Temple at Mahabalipuram has withstood 1,300 years of sea wind.',
      rulers: [
        { name: 'Simhavarman I', reign: 'c. 275 CE', desc: 'Earliest known Pallava king. Established the dynasty in the coastal Tamil region.', stars: 3 },
        { name: 'Mahendravarman I', reign: '580–630', desc: 'Brilliant playwright and patron of the arts. Pioneered rock-cut temple architecture — the beginning of Dravidian stone temples.', stars: 4 },
        { name: 'Narasimhavarman I (Mahamalla)', reign: '630–668', desc: 'Defeated and slew Pulakeshin II. Built the Shore Temple and the five magnificent rathas at Mahabalipuram.', stars: 5 },
        { name: 'Paramesvaravarman I', reign: '668–670', desc: 'Short reign but continued building', stars: 3 },
        { name: 'Narasimhavarman II (Rajasimha)', reign: '690–728', desc: 'Built the iconic Shore Temple. Sent diplomatic missions to China and commissioned the Kailasanatha Temple at Kanchipuram.', stars: 4 },
        { name: 'Nandivarman II', reign: '731–796', desc: 'Last major Pallava ruler', stars: 3 }
      ]
    },
    {
      id: 'chalukya',
      name: 'Chalukya Dynasty (Badami)',
      period: '543 – 753 CE',
      founder: 'Pulakeshin I',
      sig: 'The dynasty that stopped Harsha\'s pan-Indian conquest — proud defenders of the Deccan\'s independence.',
      rulers: [
        { name: 'Pulakeshin I', reign: '543–566', desc: 'Founded the kingdom at Badami. A powerful chieftain who united the Deccan and commissioned magnificent rock-cut temples.', stars: 4 },
        { name: 'Pulakeshin II', reign: '610–642', desc: 'Greatest Chalukya king. Halted Harsha\'s southward march at the Narmada river — Harsha\'s only major battlefield defeat.', stars: 5 },
        { name: 'Vikramaditya I', reign: '655–680', desc: 'Recovered Vatapi from the Pallavas after his father\'s defeat. Restored Chalukya prestige.', stars: 3 },
        { name: 'Vikramaditya II', reign: '733–745', desc: 'Captured Kanchi three times. Commissioned the Pattadakal temples — a UNESCO World Heritage Site of Dravidian architecture.', stars: 4 }
      ]
    },
    {
      id: 'rashtrakuta',
      name: 'Rashtrakuta Dynasty',
      period: '753 – 982 CE',
      founder: 'Dantidurga',
      sig: 'They carved an entire temple from a single mountain — the Kailasa at Ellora, the world\'s largest monolithic structure.',
      rulers: [
        { name: 'Dantidurga', reign: '735–756', desc: 'Overthrew the Chalukyas and founded the dynasty. Performed the Hiranyagarbha ceremony to claim sovereign status.', stars: 4 },
        { name: 'Krishna I', reign: '756–773', desc: 'Commissioned the Kailasa Temple at Ellora — carved top-down from a single mountain rock. An estimated 200,000 tonnes of stone removed.', stars: 5 },
        { name: 'Dhruva Dharavarsha', reign: '780–793', desc: 'Campaigned to the Gangetic plains. Established the Rashtrakutas as a truly pan-Indian power.', stars: 4 },
        { name: 'Govinda III', reign: '793–814', desc: 'Extended empire significantly', stars: 4 },
        { name: 'Amoghavarsha I', reign: '814–878', desc: 'Ruled for 64 years. Poet, scholar, and just ruler. Wrote Kavirajamarga — the earliest surviving Kannada literary text.', stars: 5 },
        { name: 'Krishna II', reign: '878–914', desc: 'Later ruler during decline', stars: 2 }
      ]
    },
    {
      id: 'western-chalukya',
      name: 'Western Chalukya Dynasty',
      period: '973 – 1188 CE',
      founder: 'Tailapa II',
      sig: 'Known for elaborate temple architecture in Karnataka.',
      rulers: [
        { name: 'Tailapa II', reign: '973–997', desc: 'Restored Chalukya power in Karnataka', stars: 3 },
        { name: 'Satyashraya', reign: '997–1008', desc: 'Continued expansion', stars: 3 },
        { name: 'Jayasimha II', reign: '1025–1045', desc: 'Defeated Cholas', stars: 4 },
        { name: 'Someshvara I', reign: '1045–1068', desc: 'Patron of literature', stars: 3 },
        { name: 'Vikramaditya VI', reign: '1076–1126', desc: 'Most powerful Western Chalukya ruler', stars: 5 },
        { name: 'Jagadekamalla II', reign: '1138–1150', desc: 'Last powerful ruler', stars: 3 }
      ]
    },
    {
      id: 'hoysala',
      name: 'Hoysala Empire',
      period: '1000 – 1343 CE',
      founder: 'Vishnuvardhana',
      sig: 'Famous for intricate temple architecture in Karnataka, especially Belur and Halebidu.',
      rulers: [
        { name: 'Vishnuvardhana', reign: '1108–1152 CE', desc: 'Founded the Hoysala Empire, converted from Jainism to Hinduism', stars: 4 },
        { name: 'Nripa Singha II', reign: '1152–1173 CE', desc: 'Consolidated the kingdom', stars: 3 },
        { name: 'Ballala I', reign: '1173–1220 CE', desc: 'Expanded the empire significantly', stars: 4 },
        { name: 'Nripa Singha II', reign: '1220–1235 CE', desc: 'Patron of arts', stars: 3 },
        { name: 'Someshvara III', reign: '1235–1263 CE', desc: 'Last major Hoysala ruler', stars: 3 },
        { name: 'Ballala III', reign: '1292–1343 CE', desc: 'Last Hoysala king, killed by Delhi Sultanate', stars: 2 }
      ]
    },
    {
      id: 'kakatiya',
      name: 'Kakatiya Dynasty',
      period: '1083 – 1323 CE',
      founder: 'Prola',
      sig: 'Gateway kingdom of Deccan, known for Warangal Fort and massive gates.',
      rulers: [
        { name: 'Prola', reign: '1083–1108 CE', desc: 'Founded the Kakatiya power', stars: 3 },
        { name: 'Ganapati Deva', reign: '1199–1262 CE', desc: 'Greatest Kakatiya ruler, expanded kingdom', stars: 5 },
        { name: 'Rudrama Devi', reign: '1263–1289 CE', desc: 'Female ruler, one of the few in Indian history', stars: 5 },
        { name: 'Pratapa Rudra', reign: '1289–1323 CE', desc: 'Last independent Kakatiya king', stars: 3 }
      ]
    },
    {
      id: 'eastern-gana',
      name: 'Eastern Ganga Dynasty',
      period: '493 – 1947 CE',
      founder: 'Anantavarman Chodaganga',
      sig: 'Ruled Kalinga (Odisha) for centuries, built famous Sun Temple at Konark.',
      rulers: [
        { name: 'Anantavarman Chodaganga', reign: '1078–1147 CE', desc: 'Founded the dynasty, built Jagannath Temple', stars: 4 },
        { name: 'Narasimhadeva I', reign: '1234–1264 CE', desc: 'Greatest Eastern Ganga ruler, built Konark Sun Temple', stars: 5 },
        { name: 'Bhanudeva I', reign: '1264–1279 CE', desc: 'Continued patronage', stars: 3 },
        { name: 'Narasimhadeva IV', reign: '1379–1425 CE', desc: 'Later powerful ruler', stars: 3 }
      ]
    },
    {
      id: 'pala',
      name: 'Pala Dynasty',
      period: '750 – 1174 CE',
      founder: 'Gopala',
      sig: 'Buddhist dynasty that ruled Bengal and Bihar, great patrons of Nalanda University.',
      rulers: [
        { name: 'Gopala', reign: '750–770 CE', desc: 'Founded the Pala Empire', stars: 3 },
        { name: 'Dharmapala', reign: '770–810 CE', desc: 'Expanded empire, patronized Buddhism', stars: 4 },
        { name: 'Devapala', reign: '810–850 CE', desc: 'Most powerful Pala king, extended influence', stars: 5 },
        { name: 'Mahendrapala', reign: '850–854 CE', desc: 'Short reign', stars: 2 },
        { name: 'Shurapala II', reign: '854–860 CE', desc: 'Weak ruler', stars: 2 },
        { name: 'Vigrahapala II', reign: '860–893 CE', desc: 'Restored stability', stars: 3 },
        { name: 'Gopala III', reign: '894–927 CE', desc: 'Later Pala ruler', stars: 3 },
        { name: 'Nayapala', reign: '927–960 CE', desc: 'Invaded Bengal', stars: 3 },
        { name: 'Vigrahapala III', reign: '960–988 CE', desc: 'Decline began', stars: 2 },
        { name: 'Mahipala I', reign: '988–1038 CE', desc: 'Revived Pala power', stars: 4 },
        { name: 'Nayapala II', reign: '1038–1055 CE', desc: 'Last strong ruler', stars: 3 },
        { name: 'Gopala IV', reign: '1055–1075 CE', desc: 'Weak ruler', stars: 2 },
        { name: 'Ramapala', reign: '1075–1130 CE', desc: 'Last major Pala king, suppressed rebellions', stars: 3 },
        { name: 'Kumarapala', reign: '1130–1145 CE', desc: 'Final Pala ruler', stars: 2 }
      ]
    },
    {
      id: 'sena',
      name: 'Sena Dynasty',
      period: '1070 – 1230 CE',
      founder: 'Sena',
      sig: 'Bengal dynasty that succeeded the Palas, known for administrative reforms.',
      rulers: [
        { name: 'Sena', reign: '1070–1095 CE', desc: 'Founder of the dynasty', stars: 3 },
        { name: 'Vijay Sen', reign: '1095–1155 CE', desc: 'Expanded the kingdom', stars: 4 },
        { name: 'Ballal Sen', reign: '1155–1179 CE', desc: 'Famous for legal code, introduced演', stars: 4 },
        { name: 'Lakshman Sen', reign: '1179–1206 CE', desc: 'Last powerful Sena king, lost to Turks', stars: 3 },
        { name: 'Vishvarup Sen', reign: '1206–1225 CE', desc: 'Last Sena ruler', stars: 2 }
      ]
    },
    {
      id: 'paramara',
      name: 'Paramara Dynasty',
      period: '800 – 1305 CE',
      founder: 'Upendra',
      sig: 'Ruled Malwa region, famous for cultural achievements and Jain temples.',
      rulers: [
        { name: 'Upendra', reign: 'c. 800–830 CE', desc: 'Founded the dynasty', stars: 2 },
        { name: 'Bhoja', reign: 'c. 1010–1055 CE', desc: 'Greatest Paramara king, patron of arts, writer', stars: 5 },
        { name: 'Jayasimha', reign: 'c. 1055–1070 CE', desc: 'Son of Bhoja', stars: 3 },
        { name: 'Naravarman', reign: 'c. 1104–1133 CE', desc: 'Patron of musicians', stars: 3 },
        { name: 'Yajna Sen', reign: 'c. 1133–1143 CE', desc: 'Later ruler', stars: 2 },
        { name: 'Jaitugideva', reign: 'c. 1173–1210 CE', desc: 'Faced Muslim invasions', stars: 2 }
      ]
    },
    {
      id: 'chandela',
      name: 'Candela Dynasty',
      period: '831 – 1315 CE',
      founder: 'Nannuka',
      sig: 'Ruled Jejak region, famous for Khajuraho temples.',
      rulers: [
        { name: 'Nannuka', reign: 'c. 831–845 CE', desc: 'Founded the dynasty', stars: 2 },
        { name: 'Vijayanka', reign: 'c. 885–905 CE', desc: 'Early powerful ruler', stars: 3 },
        { name: 'Dhangadeva', reign: 'c. 950–1008 CE', desc: 'Great patron of temple building', stars: 4 },
        { name: 'Ganda', reign: 'c. 1000–1018 CE', desc: 'Famous for Khajuraho temples', stars: 4 },
        { name: 'Vidyadhara', reign: 'c. 1018–1043 CE', desc: 'Most powerful Chandela king', stars: 5 },
        { name: 'Kirtivarman', reign: 'c. 1043–1070 CE', desc: 'Later ruler', stars: 3 },
        { name: 'Jayashakti', reign: 'c. 1110–1135 CE', desc: 'Decline period', stars: 2 }
      ]
    },
    {
      id: 'kalachuri-tripuri',
      name: 'Kalachuri of Tripuri',
      period: '675 – 1212 CE',
      founder: 'Kokkala I',
      sig: 'Ruled central India, known for contribution to art and architecture.',
      rulers: [
        { name: 'Kokkala I', reign: 'c. 675–730 CE', desc: 'Founded the dynasty', stars: 2 },
        { name: 'Buddhadeva', reign: 'c. 830–850 CE', desc: 'Early powerful ruler', stars: 3 },
        { name: 'Lakshmanaraja', reign: 'c. 900–930 CE', desc: 'Great patron of arts', stars: 3 },
        { name: 'Gangeyadeva', reign: 'c. 1015–1041 CE', desc: 'Most powerful Kalachuri ruler', stars: 4 },
        { name: 'Karnadeva', reign: 'c. 1041–1072 CE', desc: 'Later ruler', stars: 3 }
      ]
    },
    {
      id: 'chalukya-kalyani',
      name: 'Western Chalukyas of Kalyani',
      period: '973 – 1188 CE',
      founder: 'Tailapa II',
      sig: 'Deccan dynasty known for rich temple architecture.',
      rulers: [
        { name: 'Tailapa II', reign: '973–997 CE', desc: 'Founded the empire', stars: 3 },
        { name: 'Satyaeshwara', reign: '997–1008 CE', desc: 'Short reign', stars: 2 },
        { name: 'Krishna II', reign: '1008–1029 CE', desc: 'Consolidated kingdom', stars: 3 },
        { name: 'Jayasimha II', reign: '1029–1045 CE', desc: 'Military campaigns', stars: 3 },
        { name: 'Someshvara I', reign: '1045–1068 CE', desc: 'Patron of arts', stars: 3 },
        { name: 'Vikramaditya VI', reign: '1076–1127 CE', desc: 'Greatest Western Chalukya', stars: 5 },
        { name: 'Jagadekamalla II', reign: '1128–1138 CE', desc: 'Later powerful ruler', stars: 3 },
        { name: 'Tailapa III', reign: '1149–1163 CE', desc: 'Final ruler', stars: 2 }
      ]
    },
    {
      id: 'yadava',
      name: 'Seuna (Yadava) Dynasty',
      period: '850 – 1334 CE',
      founder: 'Seunachandra',
      sig: 'Maratha dynasty that ruled Deccan before Delhi Sultanate.',
      rulers: [
        { name: 'Seunachandra', reign: 'c. 850–880 CE', desc: 'Founded the dynasty', stars: 2 },
        { name: 'Dridhapraharaja', reign: 'c. 880–920 CE', desc: 'Early ruler', stars: 2 },
        { name: 'Bhillama V', reign: 'c. 1175–1190 CE', desc: 'Established Vidyadhar as capital', stars: 3 },
        { name: 'Krishna', reign: '1210–1243 CE', desc: 'Expanded the kingdom', stars: 4 },
        { name: 'Mahadeva', reign: '1260–1271 CE', desc: 'Famous patron of music', stars: 4 },
        { name: 'Ramachandra', reign: '1271–1309 CE', desc: 'Last powerful Yadava ruler', stars: 3 },
        { name: 'Mahammad Tughlaq', reign: '1309–1311 CE', desc: 'Renamed in honor of Delhi Sultan', stars: 1 }
      ]
    },
    {
      id: 'delhi-early',
      name: 'Tomar Dynasty',
      period: '736 – 1151 CE',
      founder: 'Tomar',
      sig: 'Early Delhi rulers, built Tomar Fort.',
      rulers: [
        { name: 'Tomar', reign: 'c. 736–800 CE', desc: 'Legendary founder', stars: 2 },
        { name: 'Ganga', reign: 'c. 800–850 CE', desc: 'Early ruler', stars: 2 },
        { name: 'Anangpal Tomar I', reign: 'c. 900–950 CE', desc: 'Built first Delhi Fort', stars: 3 },
        { name: 'Anangpal Tomar II', reign: 'c. 1100–1151 CE', desc: 'Consolidated Delhi', stars: 3 }
      ]
    },
    {
      id: 'chauhan',
      name: 'Chauhan (Chahamanas)',
      period: '551 – 1315 CE',
      founder: 'Chahamana',
      sig: 'Rajput dynasty that ruled Delhi and Ajmer, famous for Prithviraj Chauhan.',
      rulers: [
        { name: 'Chahamana', reign: 'c. 551–584 CE', desc: 'Eponymous founder', stars: 2 },
        { name: 'Simharaja', reign: 'c. 700–730 CE', desc: 'Early ruler', stars: 2 },
        { name: 'Gurjaraja', reign: 'c. 730–780 CE', desc: 'Consolidated power', stars: 3 },
        { name: 'Chakrapa', reign: 'c. 900–940 CE', desc: 'Early medieval ruler', stars: 2 },
        { name: 'Durlabhaja', reign: 'c. 940–980 CE', desc: 'Expanded territory', stars: 3 },
        { name: 'Vigraharaja IV', reign: 'c. 1150–1164 CE', desc: 'Defeated Ghaznavid invaders', stars: 3 },
        { name: 'Prithviraja III', reign: '1168–1192 CE', desc: 'Famous king, defeated Muhammad Ghori, last Hindu ruler of Delhi', stars: 5 },
        { name: 'Pithipala', reign: '1192–1193 CE', desc: 'Last Chauhan of Delhi', stars: 1 }
      ]
    }
  ],
  
  modern: [
    {
      id: 'vijayanagara',
      name: 'Vijayanagara Empire',
      period: '1336 – 1646 CE',
      founder: 'Harihara I & Bukka I',
      sig: 'The last great Hindu empire — Hampi\'s ruins still whisper of a city wealthier than Rome at its medieval peak.',
      rulers: [
        { name: 'Harihara I', reign: '1336–1356', desc: 'Co-founded the empire on the banks of the Tungabhadra. Established the magnificent city of Vijayanagara.', stars: 4 },
        { name: 'Bukka Raya I', reign: '1356–1377', desc: 'Expanded and defended the empire against the Bahmani Sultanate. A generous patron of Telugu and Kannada literature.', stars: 4 },
        { name: 'Devaraya I', reign: '1377–1404', desc: 'Consolidated the empire', stars: 4 },
        { name: 'Devaraya II', reign: '1424–1446', desc: 'Reformed the military by recruiting Muslim cavalry. Called "the greatest king of medieval South India" by foreign visitors.', stars: 4 },
        { name: 'Krishnadevaraya', reign: '1509–1529', desc: 'Greatest Vijayanagara king — poet, warrior, administrator. His court hosted the Ashtadiggajas (eight literary giants).', stars: 5 },
        { name: 'Achyuta Deva Raya', reign: '1529–1542', desc: 'Weaker successor', stars: 2 },
        { name: 'Sadashiva Raya', reign: '1542–1565', desc: 'Ruled during decline', stars: 2 },
        { name: 'Aliya Rama Raya', reign: '1542–1565', desc: 'Powerful regent whose capture and execution at Talikota caused the catastrophic sack of magnificent Hampi.', stars: 3 },
        { name: 'Venkatapati Raya', reign: '1585–1614', desc: 'Last major Vijayanagara ruler', stars: 3 }
      ]
    },
    {
      id: 'bahmani',
      name: 'Bahmani Sultanate',
      period: '1347 – 1527 CE',
      founder: 'Ala-ud-Din Bahman Shah',
      sig: 'First Muslim kingdom in Deccan, rival to Vijayanagara.',
      rulers: [
        { name: 'Ala-ud-Din Bahman Shah', reign: '1347–1358', desc: 'Founded the Bahmani Sultanate', stars: 4 },
        { name: 'Muhammad Shah I', reign: '1358–1373', desc: 'Consolidated the kingdom', stars: 3 },
        { name: 'Daud Shah', reign: '1373–1378', desc: 'Short reign', stars: 2 },
        { name: 'Mahmud Gawan', reign: '1463–1481', desc: 'Greatest Bahmani minister, reformed administration', stars: 5 },
        { name: 'Quli Qutb Shah', reign: '1478–1487', desc: 'Last Bahmani ruler', stars: 2 }
      ]
    },
    {
      id: 'qutb-shahi',
      name: 'Qutb Shahi Dynasty',
      period: '1512 – 1687 CE',
      founder: 'Quli Qutb Shah',
      sig: 'Ruled Golconda, famous for Hyderabad and Charminar.',
      rulers: [
        { name: 'Quli Qutb Shah', reign: '1512–1543', desc: 'Founded the dynasty, built Hyderabad', stars: 4 },
        { name: 'Jamsheed Qutb Shah', reign: '1543–1550', desc: 'Short reign', stars: 2 },
        { name: 'Ibrahim Qutb Shah', reign: '1550–1580', desc: 'Patron of arts, introduced Urdu to court', stars: 4 },
        { name: 'Muhammad Qutb Shah', reign: '1612–1626', desc: 'Last Qutb Shahi ruler of Golconda', stars: 3 }
      ]
    },
    {
      id: 'adil-shahi',
      name: 'Adil Shahi Dynasty',
      period: '1490 – 1686 CE',
      founder: 'Yusuf Adil Shah',
      sig: 'Ruled Bijapur, famous for Gol Gumbaz and architectural achievements.',
      rulers: [
        { name: 'Yusuf Adil Shah', reign: '1490–1510', desc: 'Founder of the dynasty', stars: 3 },
        { name: 'Ismail Adil Shah', reign: '1510–1534', desc: 'Consolidated kingdom', stars: 3 },
        { name: 'Mallu Adil Shah', reign: '1534–1565', desc: 'Weaker ruler', stars: 2 },
        { name: 'Ali Adil Shah I', reign: '1554–1577', desc: 'Patron of arts', stars: 3 },
        { name: 'Ibrahim Adil Shah II', reign: '1577–1627', desc: 'Greatest Adil Shahi ruler', stars: 5 },
        { name: 'Muhammad Adil Shah', reign: '1627–1656', desc: 'Built Gol Gumbaz', stars: 4 },
        { name: 'Sikandar Adil Shah', reign: '1672–1686', desc: 'Last Adil Shahi ruler', stars: 1 }
      ]
    },
    {
      id: 'imad-shahi',
      name: 'Imad Shahi Dynasty',
      period: '1489 – 1565 CE',
      founder: 'Mahmud Gawan',
      sig: 'Small but stable kingdom in Deccan.',
      rulers: [
        { name: 'Mahmud Gawan', reign: '1489–1518', desc: 'Founded the dynasty', stars: 3 },
        { name: 'Ala-ud-Din Imad Shah', reign: '1531–1562', desc: 'Most powerful Imad Shahi ruler', stars: 3 },
        { name: 'Burhan Imad Shah', reign: '1562–1565', desc: 'Last Imad Shahi ruler', stars: 1 }
      ]
    },
    {
      id: 'nizam-ul-mulk',
      name: 'Nizam Shahi Dynasty',
      period: '1494 – 1636 CE',
      founder: 'Ahmad Nizam Shah I',
      sig: 'Ruled Ahmadnagar in Deccan.',
      rulers: [
        { name: 'Ahmad Nizam Shah I', reign: '1494–1508', desc: 'Founded the dynasty', stars: 3 },
        { name: 'Nizam-ul-Mulk', reign: '1508–1559', desc: 'Greatest Nizam Shahi ruler', stars: 4 },
        { name: 'Murtaza Nizam Shah II', reign: '1600–1609', desc: 'Last independent ruler', stars: 2 }
      ]
    },
    {
      id: 'mughal',
      name: 'Mughal Empire',
      period: '1526 – 1857 CE',
      founder: 'Babur',
      sig: 'Built the Taj Mahal and the Red Fort; unified the subcontinent — the world\'s largest economy for over two centuries.',
      rulers: [
        { name: 'Babur', reign: '1526–1530', desc: 'First Mughal emperor. Defeated Ibrahim Lodi at Panipat using artillery for the first time in India. Poet and memoirist.', stars: 5 },
        { name: 'Humayun', reign: '1530–40, 1555–56', desc: 'Lost the empire to Sher Shah Suri and lived in Persian exile for 15 years. Reclaimed Delhi but died in an accident shortly after.', stars: 3 },
        { name: 'Akbar the Great', reign: '1556–1605', desc: 'India\'s greatest ruler. Religious tolerance, administrative genius, military mastery, and patron of the arts.', stars: 5 },
        { name: 'Jahangir', reign: '1605–1627', desc: 'Patron of miniature painting and author of the Tuzuk-i-Jahangiri. A figure of great culture and personal contradictions.', stars: 3 },
        { name: 'Shah Jahan', reign: '1628–1658', desc: 'Built the Taj Mahal as an eternal monument to love. His architectural patronage remains unparalleled in world history.', stars: 5 },
        { name: 'Aurangzeb', reign: '1658–1707', desc: 'Extended the empire to its greatest territorial extent. His polarizing policies seeded the resistance that fragmented the empire.', stars: 4 },
        { name: 'Bahadur Shah I (Shah Alam I)', reign: '1707–1712', desc: 'First Mughal emperor after Aurangzeb, tried to reconcile with Rajputs', stars: 3 },
        { name: 'Jahandar Shah', reign: '1712–1713', desc: 'Short reign, killed by nephew', stars: 1 },
        { name: 'Farrukhsiyar', reign: '1713–1719', desc: 'Puppet emperor', stars: 1 },
        { name: 'Muhammad Shah', reign: '1719–1748', desc: 'Empire began fragmentation', stars: 2 },
        { name: 'Ahmed Shah', reign: '1748–1754', desc: 'Weak ruler', stars: 1 },
        { name: 'Alamgir II', reign: '1754–1759', desc: 'Puppet emperor', stars: 1 },
        { name: 'Shah Jahan III', reign: '1759–1760', desc: 'Brief restoration', stars: 1 },
        { name: 'Shah Alam II', reign: '1759–1806', desc: 'Maratha and British conflicts', stars: 1 },
        { name: 'Akbar Shah II', reign: '1806–1837', desc: 'Last Mughal with any power', stars: 1 },
        { name: 'Bahadur Shah Zafar', reign: '1837–1857', desc: 'Last Mughal emperor and gifted Urdu poet. Became the reluctant symbol of the 1857 revolt. Exiled to Rangoon.', stars: 3 }
      ]
    },
    {
      id: 'maratha',
      name: 'Maratha Empire',
      period: '1674 – 1818 CE',
      founder: 'Chhatrapati Shivaji Maharaj',
      sig: 'Never broken in spirit — Shivaji\'s guerrilla warfare and naval mastery redefined Indian resistance forever.',
      rulers: [
        { name: 'Shivaji Maharaj', reign: '1674–1680', desc: 'Founded the empire through brilliant guerrilla warfare. Created Swarajya (self-rule), a powerful navy, and Hindavi culture.', stars: 5 },
        { name: 'Sambhaji Maharaj', reign: '1680–1689', desc: 'Continued fierce resistance against Aurangzeb\'s massive campaigns. Captured and executed — an immortal Maratha martyr.', stars: 4 },
        { name: 'Rajaram I', reign: '1689–1700', desc: 'Fled to Satara after Sambhaji\'s death', stars: 3 },
        { name: 'Tarabai', reign: '1700–1707', desc: 'Regent, continued resistance', stars: 4 },
        { name: 'Shahu I', reign: '1707–1749', desc: 'Consolidated power after Aurangzeb\'s death. Under the brilliant Peshwas, the Maratha confederacy reached its zenith.', stars: 4 },
        { name: 'Bajirao I (Peshwa)', reign: '1720–1740', desc: 'Never lost a battle — 41 engagements, all victories. Expanded Maratha power from the Deccan to the banks of the Sindhu.', stars: 5 },
        { name: 'Balaji Bajirao (Peshwa)', reign: '1740–1761', desc: 'Expanded empire to Delhi', stars: 4 },
        { name: 'Sadashivrao Bhau (Peshwa)', reign: '1761', desc: 'Died at the Third Battle of Panipat, shattering Maratha morale and ending all hopes of northward expansion.', stars: 3 },
        { name: 'Madhav Rao I', reign: '1761–1772', desc: 'Restored Maratha power', stars: 4 },
        { name: 'Narayan Rao', reign: '1772–1773', desc: 'Short reign', stars: 1 },
        { name: 'Maharaja Sawai Madhav Rao', reign: '1774–1795', desc: 'Patron of arts', stars: 3 },
        { name: 'Bajirao II', reign: '1795–1818', desc: 'Last Peshwa, lost to British', stars: 1 }
      ]
    },
    {
      id: 'mewar-sisodia',
      name: 'Mewar (Sisodia Dynasty)',
      period: '1326 – 1947 CE',
      founder: 'Rana Hammiradeva',
      sig: 'The unbroken chain of Rajput valor — never accepted foreign rule, from Mughals to British.',
      rulers: [
        { name: 'Rana Hammiradeva', reign: '1326–1364', desc: 'Founded Mewar after escaping Delhi Sultanate', stars: 4 },
        { name: 'Rana Kumbha', reign: '1433–1468', desc: 'Built famous forts, expanded kingdom', stars: 5 },
        { name: 'Rana Raimal', reign: '1468–1503', desc: 'Patron of literature', stars: 3 },
        { name: 'Rana Sanga', reign: '1503–1528', desc: 'Greatest Mewar king, defeated Lodi Sultan, fought Babur', stars: 5 },
        { name: 'Rana Pratap Singh', reign: '1572–1597', desc: 'The legendary hero of Haldighati, never accepted Mughal suzerainty. Recovered nearly all of Mewar within his lifetime.', stars: 5 },
        { name: 'Maharana Amar Singh I', reign: '1597–1620', desc: 'Continued resistance against Mughals', stars: 4 },
        { name: 'Maharana Karan Singh II', reign: '1620–1628', desc: 'Short reign', stars: 2 },
        { name: 'Maharana Jagat Singh I', reign: '1628–1652', desc: 'Patron of temples', stars: 3 },
        { name: 'Maharana Raj Singh I', reign: '1652–1680', desc: 'Fought Aurangzeb\'s wars', stars: 4 },
        { name: 'Maharana Jai Singh', reign: '1680–1698', desc: 'Later Mughal conflicts', stars: 3 },
        { name: 'Maharana Amar Singh II', reign: '1698–1710', desc: 'Mughal alliance period', stars: 2 },
        { name: 'Maharana Sangram Singh II', reign: '1710–1734', desc: 'Restored independence', stars: 4 },
        { name: 'Maharana Pratap Singh II', reign: '1734–1754', desc: 'Later ruler', stars: 3 },
        { name: 'Maharana Ari Singh II', reign: '1762–1772', desc: 'Mewar under British', stars: 2 },
        { name: 'Maharana Bhim Singh', reign: '1772–1828', desc: 'Treaty with British', stars: 2 },
        { name: 'Maharana Jagat Singh II', reign: '1828–1838', desc: 'Later ruler', stars: 2 },
        { name: 'Maharana S享 Singh', reign: '1842–1930', desc: 'Modern period', stars: 2 },
        { name: 'Maharana Fateh Singh', reign: '1930–1955', desc: 'Last ruling Maharana', stars: 2 }
      ]
    },
    {
      id: 'jaipur-kachwaha',
      name: 'Jaipur (Kachwaha Dynasty)',
      period: '958 – 1947 CE',
      founder: 'Raja Kankula',
      sig: 'Royal city of Jaipur, famous for Hawa Mahal and Amber Fort.',
      rulers: [
        { name: 'Raja Kankula', reign: 'c. 958–988', desc: 'Early ancestor', stars: 2 },
        { name: 'Raja Dullah', reign: 'c. 1100–1130', desc: 'Early ruler', stars: 2 },
        { name: 'Rana Puranmal', reign: 'c. 1545–1548', desc: 'Amber under Mughals', stars: 3 },
        { name: 'Raja Bharmal', reign: '1548–1575', desc: 'First to accept Mughals', stars: 3 },
        { name: 'Raja Man Singh I', reign: '1590–1614', desc: 'Great Kachwaha ruler, Mughal general', stars: 5 },
        { name: 'Raja Jai Singh I', reign: '1614–1667', desc: 'Built Jaipur city, famous astronomer', stars: 5 },
        { name: 'Raja Bishan Singh', reign: '1667–1688', desc: 'Built many temples', stars: 3 },
        { name: 'Raja Jai Singh II', reign: '1688–1743', desc: 'Last powerful ruler', stars: 4 },
        { name: 'Maharaja Sawai Jai Singh', reign: '1743–1768', desc: 'Named Jaipur city', stars: 4 },
        { name: 'Maharaja Sawai Madhav Rao', reign: '1768–1778', desc: 'Maratha period', stars: 2 },
        { name: 'Maharaja Sawai Pratap Singh', reign: '1778–1803', desc: 'Later ruler', stars: 2 },
        { name: 'Maharaja Sawai Jai Singh', reign: '1818–1835', desc: 'Under British', stars: 2 },
        { name: 'Maharaja Sawai Ram Singh II', reign: '1835–1881', desc: 'Modern period', stars: 2 },
        { name: 'Maharaja Sawai Madhav Singh II', reign: '1922–1947', desc: 'Last Maharaja', stars: 1 }
      ]
    },
    {
      id: 'kota',
      name: 'Kota (Hada Chauhan)',
      period: '1244 – 1947 CE',
      founder: 'Rao Deva',
      sig: 'Branch of Hada Rajputs, ruled Kota region.',
      rulers: [
        { name: 'Rao Deva', reign: '1244–1264', desc: 'Founded Kota', stars: 3 },
        { name: 'Rao Lakha', reign: '1264–1301', desc: 'Expanded territory', stars: 3 },
        { name: 'Rao Ratan Singh', reign: '1432–1465', desc: 'Patron of arts', stars: 3 },
        { name: 'Maharao Umaid Singh I', reign: '1734–1754', desc: 'Most powerful Kota ruler', stars: 4 },
        { name: 'Maharao Ganga Singh', reign: '1921–1947', desc: 'Last ruler', stars: 2 }
      ]
    },
    {
      id: 'bikaner',
      name: 'Bikaner (Rathore Dynasty)',
      period: '1465 – 1949 CE',
      founder: 'Rao Bika',
      sig: 'Major Rajput kingdom in Rajasthan, famous for camel breeding.',
      rulers: [
        { name: 'Rao Bika', reign: '1465–1505', desc: 'Founded Bikaner city', stars: 4 },
        { name: 'Rao Lunkaran', reign: '1505–1527', desc: 'Early ruler', stars: 3 },
        { name: 'Maharaja Rai Singhji', reign: '1571–1611', desc: 'Greatest Bikaner ruler, Mughal general', stars: 5 },
        { name: 'Maharaja Karan Singh', reign: '1611–1631', desc: 'Patron of arts', stars: 3 },
        { name: 'Maharaja Anup Singh', reign: '1669–1698', desc: 'Extended kingdom', stars: 3 },
        { name: 'Maharaja Sarup Singh', reign: '1845–1851', desc: 'British period', stars: 2 },
        { name: 'Maharaja Ganga Singh', reign: '1881–1943', desc: 'Modern ruler', stars: 3 }
      ]
    },
    {
      id: 'jodhpur',
      name: 'Jodhpur (Rathore Dynasty)',
      period: '1459 – 1949 CE',
      founder: 'Rao Jodha',
      sig: 'Second largest kingdom in Rajasthan, famous for Mehrangarh Fort.',
      rulers: [
        { name: 'Rao Jodha', reign: '1459–1485', desc: 'Founded Jodhpur city', stars: 4 },
        { name: 'Rao Satal', reign: '1485–1491', desc: 'Short reign', stars: 2 },
        { name: 'Rao Ganga Singh', reign: '1491–1516', desc: 'Expanded kingdom', stars: 3 },
        { name: 'Maharaja Maldev', reign: '1531–1552', desc: 'Powerful ruler', stars: 4 },
        { name: 'Maharaja Udai Singh I', reign: '1583–1595', desc: 'Founded city of Jodhpur', stars: 3 },
        { name: 'Maharaja Gaj Singh', reign: '1595–1615', desc: 'Patron of arts', stars: 3 },
        { name: 'Maharaja Jaswant Singh', reign: '1638–1678', desc: 'Famous ruler, expanded kingdom', stars: 4 },
        { name: 'Maharaja Ajit Singh', reign: '1679–1707', desc: 'Fought Mughals', stars: 3 },
        { name: 'Maharaja Abhai Singh', reign: '1724–1749', desc: 'Restored kingdom', stars: 3 },
        { name: 'Maharaja Vijay Singh', reign: '1752–1793', desc: 'Later ruler', stars: 3 },
        { name: 'Maharaja Man Singh', reign: '1803–1843', desc: 'British period', stars: 2 },
        { name: 'Maharaja Sardar Singh', reign: '1843–1873', desc: 'Modern period', stars: 2 },
        { name: 'Maharaja Jaswant Singh II', reign: '1895–1920', desc: 'Later ruler', stars: 2 },
        { name: 'Maharaja Hanwant Singh', reign: '1947–1952', desc: 'Last ruling Maharaja', stars: 2 }
      ]
    },
    {
      id: 'uthen',
      name: 'Jaisalmer (Rawal Dynasty)',
      period: '1156 – 1949 CE',
      founder: 'Rawal Jaisal',
      sig: 'Golden city on Thar desert, famous for yellow sandstone fort.',
      rulers: [
        { name: 'Rawal Jaisal', reign: '1156–1163', desc: 'Founded Jaisalmer', stars: 4 },
        { name: 'Rawal Salraja', reign: '1163–1178', desc: 'Early ruler', stars: 2 },
        { name: 'Rawal Punja', reign: '1226–1276', desc: 'Extended kingdom', stars: 3 },
        { name: 'Rawal Ghiya Singh', reign: '1551–1560', desc: 'Mughal period', stars: 2 },
        { name: 'Rawal Mulraj', reign: '1840–1870', desc: 'British period', stars: 2 },
        { name: 'Maharawal Ganga Singh', reign: '1910–1947', desc: 'Last ruler', stars: 2 }
      ]
    },
    {
      id: 'dholpur',
      name: 'Dholpur (Bariha Dynasty)',
      period: '1000 – 1947 CE',
      founder: 'Raja Dhoraji',
      sig: 'Small Rajput kingdom between Bharatpur and Gwalior.',
      rulers: [
        { name: 'Raja Dhoraji', reign: 'c. 1000', desc: 'Legendary founder', stars: 2 },
        { name: 'Raja Karanpal', reign: 'c. 1100', desc: 'Early ruler', stars: 2 },
        { name: 'Maharaja Rana Kirat Singh', reign: '1805–1835', desc: 'British period', stars: 2 },
        { name: 'Maharaja Ranjit Singh', reign: '1911–1947', desc: 'Last ruler', stars: 1 }
      ]
    },
    {
      id: 'garhwal',
      name: 'Garhwal Kingdom',
      period: '688 – 1949 CE',
      founder: 'Kanakpal',
      sig: 'Mountain kingdom in Himalayas, known for temples and martial tradition.',
      rulers: [
        { name: 'Kanakpal', reign: 'c. 688–715', desc: 'Founded the kingdom', stars: 3 },
        { name: 'Parmarth', reign: 'c. 900–950', desc: 'Early ruler', stars: 2 },
        { name: 'Ruler from 1200s to 1500s', reign: 'Various', desc: 'Multiple rulers expanded kingdom', stars: 3 },
        { name: 'Raja Pradyumn Shah', reign: 'c. 1555–1570', desc: 'Consolidated kingdom', stars: 3 },
        { name: 'Raja Ajay Pal', reign: 'c. 1570–1590', desc: 'Expanded territory', stars: 3 },
        { name: 'Raja Man Shah', reign: 'c. 1590–1610', desc: 'Later ruler', stars: 2 },
        { name: 'Raja Udyan Shah', reign: 'c. 1730–1750', desc: 'Gurkha conflicts began', stars: 2 },
        { name: 'Raja Pradyumn Chandra', reign: '1804–1815', desc: 'British period', stars: 2 },
        { name: 'Maharaja Sudarshan Shah', reign: '1815–1843', desc: 'Under British', stars: 2 },
        { name: 'Maharaja Jawahar Shah', reign: '1843–1949', desc: 'Last ruler', stars: 1 }
      ]
    },
    {
      id: 'kashmir-mughal',
      name: 'Kashmir (Mughal/Chilki)',
      period: '1585 – 1947 CE',
      founder: 'Akbar',
      sig: 'Beautiful valley under Mughal and Afghan rule.',
      rulers: [
        { name: 'Akbar', reign: '1585–1605', desc: 'Mughal conquest', stars: 3 },
        { name: 'Shah Jahan', reign: '1620–1658', desc: 'Mughal period', stars: 3 },
        { name: 'Aurangzeb', reign: '1658–1707', desc: 'Islamic rule strengthened', stars: 2 },
        { name: 'Afsharid Rule', reign: '1734–1752', desc: 'Afghan rule', stars: 2 },
        { name: 'Sikh Rule', reign: '1819–1846', desc: 'Ranjit Singh conquered Kashmir', stars: 3 },
        { name: 'British India', reign: '1846–1947', desc: 'Dogra dynasty ruled as princes', stars: 2 }
      ]
    },
    {
      id: 'sikh',
      name: 'Sikh Empire',
      period: '1799 – 1849 CE',
      founder: 'Maharaja Ranjit Singh',
      sig: 'The Lion of Punjab — never lost a battle, created South Asia\'s first secular kingdom, and held the Kohinoor diamond.',
      rulers: [
        { name: 'Maharaja Ranjit Singh', reign: '1799–1839', desc: 'Unified the Sikh misls into a formidable empire. Never lost a battle. Created South Asia\'s first secular state and held the Kohinoor.', stars: 5 },
        { name: 'Kharak Singh', reign: '1839–1840', desc: 'Brief reign marked by court intrigue and power struggles. The empire began a dangerous internal fragmentation.', stars: 2 },
        { name: 'Nau Nihal Singh', reign: '1840', desc: 'Died in accident shortly after', stars: 1 },
        { name: 'Sher Singh', reign: '1840–1843', desc: 'Temporarily stabilized the court, then was assassinated. Rapid decline followed.', stars: 2 },
        { name: 'Duleep Singh', reign: '1843–1849', desc: 'Last Maharaja, deposed at age 10. The Kohinoor was surrendered to Queen Victoria. He spent his life seeking its return.', stars: 2 }
      ]
    },
    {
      id: 'mysore-wodeyar',
      name: 'Mysore (Wodeyar Dynasty)',
      period: '1399 – 1950 CE',
      founder: 'Yaduraya Wodeyar',
      sig: 'Major South Indian kingdom, became powerful under Hyder Ali and Tipu Sultan.',
      rulers: [
        { name: 'Yaduraya Wodeyar', reign: '1399–1423', desc: 'Founded the dynasty', stars: 3 },
        { name: 'Raja Wodeyar I', reign: '1578–1617', desc: 'Established Mysore kingdom', stars: 3 },
        { name: 'Kanthirava Narasimha', reign: '1638–1664', desc: 'Expanded kingdom', stars: 4 },
        { name: 'Chikka Deva Raja', reign: '1672–1704', desc: 'Known as the great ruler', stars: 4 },
        { name: 'Krishna Raja Wodeyar III', reign: '1799–1868', desc: 'Mysore under British', stars: 3 },
        { name: 'Krishna Raja Wodeyar IV', reign: '1902–1940', desc: 'Last ruling Maharaja', stars: 3 },
        { name: 'Jayachamaraja Wodeyar', reign: '1940–1950', desc: 'Last Maharaja of Mysore', stars: 2 }
      ]
    },
    {
      id: 'mysore-hyder',
      name: 'Kingdom of Mysore (Hyder Ali & Tipu)',
      period: '1761 – 1799 CE',
      founder: 'Hyder Ali',
      sig: 'Revolutionary kingdom that challenged British expansion.',
      rulers: [
        { name: 'Hyder Ali', reign: '1761–1782', desc: 'Rose from soldier to de facto ruler, modernized army', stars: 5 },
        { name: 'Tipu Sultan', reign: '1782–1799', desc: 'Tiger of Mysore, fought British valiantly, died defending Srirangapatna', stars: 5 }
      ]
    },
    {
      id: 'travancore',
      name: 'Travancore Kingdom',
      period: '1100 – 1949 CE',
      founder: 'King Marthanda Varma',
      sig: 'Southernmost kingdom, known for Sree Padmanabhaswamy Temple.',
      rulers: [
        { name: 'Rama Varma', reign: 'c. 1100', desc: 'Early ruler', stars: 2 },
        { name: 'King Marthanda Varma', reign: '1729–1758', desc: 'Consolidated Travancore, modernized administration', stars: 5 },
        { name: 'Dharma Raja', reign: '1758–1798', desc: 'Patron of arts', stars: 4 },
        { name: 'Swathi Thirunal', reign: '1829–1846', desc: 'Great patron of music', stars: 5 },
        { name: 'Maharaja Sree Chithira Thirunal', reign: '1932–1949', desc: 'Last ruling Maharaja', stars: 2 }
      ]
    },
    {
      id: 'cochin',
      name: 'Cochin Kingdom',
      period: '1100 – 1949 CE',
      founder: 'Perumpadappu Mooppil Nair',
      sig: 'Small kingdom on Malabar coast, famous for spice trade.',
      rulers: [
        { name: 'Perumpadappu Mooppil Nair', reign: 'c. 1100', desc: 'Legendary founder', stars: 2 },
        { name: 'Rama Varma', reign: 'c. 1550–1600', desc: 'Peak of Cochin kingdom', stars: 3 },
        { name: 'Rama Varma IX', reign: '1895–1914', desc: 'Later ruler', stars: 2 }
      ]
    },
    {
      id: 'thiruvithamkoor',
      name: 'Thiruvithamkoor (Travancore)',
      period: '1100 – 1949 CE',
      founder: 'Rama Kulasekhara',
      sig: 'Kerala kingdom known for social reforms.',
      rulers: [
        { name: 'Rama Kulasekhara', reign: 'c. 1100', desc: 'Founder', stars: 3 },
        { name: 'Martandavarma', reign: '1729–1758', desc: 'Martandam Temple built', stars: 3 },
        { name: 'Balarama Varma', reign: '1798–1810', desc: 'British alliance', stars: 2 }
      ]
    },
    {
      id: 'ahom',
      name: 'Ahom Dynasty',
      period: '1228 – 1826 CE',
      founder: 'Sukhungmung',
      sig: 'Longest ruling dynasty in Assam, defended against Mughals for centuries.',
      rulers: [
        { name: 'Sukhungmung', reign: '1228–1268', desc: 'Founded the Ahom kingdom', stars: 4 },
        { name: 'Suhung', reign: '1280–1293', desc: 'Expanded kingdom', stars: 3 },
        { name: 'Dihingia', reign: '1293–1332', desc: 'Consolidated power', stars: 3 },
        { name: 'Sujang', reign: '1332–1364', desc: 'Later ruler', stars: 2 },
        { name: 'Supat', reign: '1364–1380', desc: 'Early period', stars: 2 },
        { name: 'Chukongmung', reign: '1531–1552', desc: 'Peak Ahom power', stars: 4 },
        { name: 'Prataap Singha', reign: '1603–1641', desc: 'Built numerous temples', stars: 4 },
        { name: 'Sutingmung', reign: '1641–1644', desc: 'Short reign', stars: 2 },
        { name: 'Auramber', reign: '1644–1648', desc: 'Mughal conflicts began', stars: 2 },
        { name: 'Gadadhar Singha', reign: '1681–1696', desc: 'Last strong ruler', stars: 4 },
        { name: 'Purandhar Singha', reign: '1696–1714', desc: 'Mughal invasions', stars: 2 },
        { name: 'Rajeswar Singha', reign: '1714–1744', desc: 'Restored some power', stars: 3 },
        { name: 'Gurmohan Singha', reign: '1818–1826', desc: 'Last Ahom king', stars: 1 }
      ]
    },
    {
      id: 'manipur',
      name: 'Manipur Kingdom',
      period: '1110 – 1949 CE',
      founder: 'Nongda Loireng Pak',
      sig: 'Ancient kingdom in Northeast, known for classical dance form.',
      rulers: [
        { name: 'Nongda Loireng Pak', reign: '1110–1145', desc: 'Founded the kingdom', stars: 3 },
        { name: 'Khangembam', reign: '1445–1487', desc: 'Later ruler', stars: 2 },
        { name: 'Guru Shamjen', reign: '1709–1748', desc: 'Strengthened kingdom', stars: 3 },
        { name: 'Chura Chand', reign: '1849–1857', desc: 'British period', stars: 2 },
        { name: 'Chura Chand', reign: '1907–1939', desc: 'Last king', stars: 2 }
      ]
    },
    {
      id: 'tripura',
      name: 'Tripura Kingdom',
      period: '1280 – 1949 CE',
      founder: 'Raja Tripura',
      sig: 'Hill kingdom in Northeast, famous for temples.',
      rulers: [
        { name: 'Raja Tripura', reign: 'c. 1280', desc: 'Legendary founder', stars: 2 },
        { name: 'Raja Dharma Manikya', reign: '1460–1487', desc: 'Early historical ruler', stars: 3 },
        { name: 'Raja Manikya', reign: '1500–1555', desc: 'Consolidated kingdom', stars: 3 },
        { name: 'Raja Kashi Chandra', reign: '1830–1849', desc: 'British period', stars: 2 },
        { name: 'Maharaja Birendra Kishore', reign: '1909–1923', desc: 'Last ruler', stars: 2 }
      ]
    },
    {
      id: 'bhutan',
      name: 'Bhutan Kingdom',
      period: '1616 – 1907 CE',
      founder: 'Ngawang Namgyal',
      sig: 'Mountain kingdom with unique Buddhist tradition.',
      rulers: [
        { name: 'Ngawang Namgyal', reign: '1616–1651', desc: 'Founded unified Bhutan', stars: 5 },
        { name: 'Tenpa Myur', reign: '1651–1652', desc: 'First Druk Desi', stars: 2 },
        { name: 'Damchho', reign: '1680–1694', desc: 'Period of conflict', stars: 2 },
        { name: 'Ugyen Wangchuck', reign: '1907', desc: 'First hereditary king', stars: 3 }
      ]
    },
    {
      id: 'nepal',
      name: 'Nepal Kingdom',
      period: '1768 – 2008 CE',
      founder: 'Prithvi Narayan Shah',
      sig: 'Himalayan kingdom with ancient history.',
      rulers: [
        { name: 'Prithvi Narayan Shah', reign: '1768–1775', desc: 'Founded unified Nepal', stars: 5 },
        { name: 'Rana Bahadur Shah', reign: '1799–1804', desc: 'Early ruler', stars: 3 },
        { name: 'Rajendra Laxmi', reign: '1804–1806', desc: 'Regency period', stars: 2 },
        { name: 'Guru Shumsher', reign: '1881–1885', desc: 'First Rana prime minister', stars: 3 },
        { name: 'King Mahendra', reign: '1955–1972', desc: 'Modern king', stars: 3 },
        { name: 'King Birendra', reign: '1972–2001', desc: 'Last monarch', stars: 3 },
        { name: 'King Gyanendra', reign: '2001–2008', desc: 'Last king of Nepal', stars: 1 }
      ]
    },
    {
      id: 'nawab-bengal',
      name: 'Bengal Nizamat',
      period: '1717 – 1858 CE',
      founder: 'Murshid Quli Khan',
      sig: 'Richest province of Mughal Empire, became independent under Nizams.',
      rulers: [
        { name: 'Murshid Quli Khan', reign: '1717–1727', desc: 'First Nawab of Bengal', stars: 4 },
        { name: 'Shuja-ud-din', reign: '1727–1739', desc: 'Consolidated power', stars: 3 },
        { name: 'Sarfaraz Khan', reign: '1739–1741', desc: 'Short reign', stars: 2 },
        { name: 'Alivardi Khan', reign: '1741–1756', desc: 'Strong independent ruler', stars: 4 },
        { name: 'Siraj-ud-Daulah', reign: '1756–1757', desc: 'Last independent Nawab, Battle of Plassey', stars: 3 },
        { name: 'Mir Jafar', reign: '1757–1760', desc: 'British puppet', stars: 1 },
        { name: 'Mir Qasim', reign: '1760–1763', desc: 'Tried to resist British', stars: 2 },
        { name: 'Nawab Najim-ud-Daulah', reign: '1765–1770', desc: 'British controlled', stars: 1 }
      ]
    },
    {
      id: 'nawab-awadh',
      name: 'Awadh (Oudh) Nizamat',
      period: '1722 – 1856 CE',
      founder: 'Safdar Jang',
      sig: 'Rich kingdom in North India, famous for Lucknow culture.',
      rulers: [
        { name: 'Safdar Jang', reign: '1732–1739', desc: 'First Nawab', stars: 3 },
        { name: 'Shuja-ud-Daula', reign: '1775–1779', desc: 'Battle of Buxar', stars: 3 },
        { name: 'Asaf-ud-Daula', reign: '1779–1797', desc: 'Built Lucknow', stars: 4 },
        { name: 'Saadat Ali Khan', reign: '1798–1814', desc: 'British treaty', stars: 2 },
        { name: 'Ghazi-ud-Din Haidar', reign: '1814–1827', desc: 'King title adopted', stars: 2 },
        { name: 'Nawab Wajid Ali Shah', reign: '1847–1856', desc: 'Last Nawab, annexed by British', stars: 2 }
      ]
    },
    {
      id: 'nawab-hyderabad',
      name: 'Hyderabad Nizamat',
      period: '1724 – 1948 CE',
      founder: 'Nizam-ul-Mulk Asaf Jah I',
      sig: 'Largest Indian princely state, richest in the world.',
      rulers: [
        { name: 'Nizam-ul-Mulk Asaf Jah I', reign: '1724–1748', desc: 'Founded Hyderabad Nizamat', stars: 5 },
        { name: 'Nasir Jung', reign: '1748–1750', desc: 'Short reign', stars: 2 },
        { name: 'Salabat Jung', reign: '1751–1762', desc: 'Weak ruler', stars: 1 },
        { name: 'Nizam Ali Khan', reign: '1762–1803', desc: 'Restored stability', stars: 3 },
        { name: 'Sikandar Jah', reign: '1803–1829', desc: 'Consolidated kingdom', stars: 3 },
        { name: 'Nizam-ul-Mulk Asaf Jah IV', reign: '1829–1869', desc: 'Modernization period', stars: 3 },
        { name: 'Mahbub Ali Khan', reign: '1869–1911', desc: 'Sixth Nizam', stars: 3 },
        { name: 'Osman Ali Khan', reign: '1911–1948', desc: 'Last Nizam, richest man in world', stars: 3 }
      ]
    },
    {
      id: 'mysore-poligars',
      name: 'Poligar Chiefs',
      period: '1500 – 1948 CE',
      founder: 'Various',
      sig: 'Southern Indian chieftains, famous for resistance to British.',
      rulers: [
        { name: 'Polygar System Established', reign: '1500s', desc: 'Feudal chieftains in Tamil region', stars: 2 },
        { name: 'Kattabomman', reign: '1790–1799', desc: 'Famous Poligar, executed by British', stars: 4 },
        { name: 'Marudu Brothers', reign: '1801', desc: 'Led rebellion against British', stars: 4 },
        { name: 'British Annexation', reign: '1948', desc: 'Poligars abolished', stars: 1 }
      ]
    },
    {
      id: 'kashmir-dogra',
      name: 'Dogra Dynasty',
      period: '1846 – 1947 CE',
      founder: 'Gulab Singh',
      sig: 'Ruled Jammu and Kashmir, famous for Dogra Fort.',
      rulers: [
        { name: 'Gulab Singh', reign: '1846–1857', desc: 'Founded Dogra dynasty, first Maharaja of Jammu and Kashmir', stars: 4 },
        { name: 'Ranbir Singh', reign: '1857–1885', desc: 'Expanded kingdom', stars: 4 },
        { name: 'Pratap Singh', reign: '1885–1925', desc: 'British period', stars: 3 },
        { name: 'Hari Singh', reign: '1925–1947', desc: 'Last Maharaja, acceded to India', stars: 2 }
      ]
    },
    {
      id: 'orissa-feudatories',
      name: 'Orissa Feudatories',
      period: '1430 – 1948 CE',
      founder: 'Various',
      sig: 'Various princely states in Odisha region.',
      rulers: [
        { name: 'Gajapati Kingdom', reign: '1430–1550', desc: 'Early rulers of Odisha', stars: 3 },
        { name: 'Nawabs of Bengal', reign: '1550–1751', desc: 'Mughal period', stars: 2 },
        { name: 'British Period', reign: '1751–1948', desc: 'Various small states', stars: 1 }
      ]
    },
    {
      id: 'rajput confederacy',
      name: 'Rajput Confederacies',
      period: 'Various',
      founder: 'Multiple',
      sig: 'Various Rajput kingdoms fighting for supremacy.',
      rulers: [
        { name: 'Maharana Pratap', reign: '1572–1597', desc: 'Mewar hero', stars: 5 },
        { name: 'Rana Sanga', reign: '1503–1528', desc: 'Mewar great', stars: 5 },
        { name: 'Raja Man Singh', reign: '1590–1614', desc: 'Kachwaha great', stars: 5 },
        { name: 'Raja Jai Singh II', reign: '1688–1743', desc: 'Kachwaha astronomer king', stars: 4 }
      ]
    }
  ]
};

// Additional comprehensive data structures
export const COMPREHENSIVE_BATTLES = [
  // Major battles already have detailed data, adding more
  {
    id: 'plassey',
    name: 'Battle of Plassey',
    year: '1757 CE',
    icon: '⚔️',
    between: 'British East India Company vs. Nawab of Bengal',
    summary: 'Robert Clive\'s victory that established British dominance in Bengal.',
    d: {
      date: 'June 23, 1757',
      loc: 'Plassey, Bengal',
      out: 'British victory - Nawab betrayed by Mir Jafar',
      cmd: 'Robert Clive vs. Siraj-ud-Daulah',
      str: 'British: 3,000 (only 500 combat) | Nawab: 50,000',
      strat: 'Mir Jafar\'s betrayal - he refused to fight',
      turn: 'Mir Jafar\'s forces did not engage, allowing British to win',
      cas: 'British: 22 killed | Nawab: 500+',
      sig: 'Began British colonial rule in India'
    }
  },
  {
    id: 'buyar',
    name: 'Battle of Buxar',
    year: '1764 CE',
    icon: '⚔️',
    between: 'British East India Company vs. Mughal Empire + Awadh + Bengal',
    summary: 'Decisive British victory that confirmed British rule in Bengal.',
    d: {
      date: 'October 22, 1764',
      loc: 'Buxar, Bihar',
      out: 'British victory',
      cmd: 'Hector Munro vs. Shuja-ud-Daula + Mughal Emperor',
      str: 'British: 10,000 | Allied: 40,000',
      strat: 'British artillery superiority',
      turn: 'Allied forces retreated after heavy casualties',
      cas: 'British: 847 | Allied: 8,000',
      sig: 'Confirmed British dominion over Bengal'
    }
  },
  {
    id: 'wandiwash',
    name: 'Battle of Wandiwash',
    year: '1760 CE',
    icon: '⚔️',
    between: 'British East India Company vs. French East India Company',
    summary: 'Decisive British victory ending French hopes in India.',
    d: {
      date: 'January 22, 1760',
      loc: 'Wandiwash, Tamil Nadu',
      out: 'British victory - French power in India broken',
      cmd: 'Eyre Coote vs. Lally',
      str: 'British: 4,000 | French: 4,500',
      strat: 'British infantry superiority',
      turn: 'French commander Lally captured',
      cas: 'British: 360 | French: 1,500',
      sig: 'End of French ambitions in India'
    }
  },
  {
    id: 'assaye',
    name: 'Battle of Assaye',
    year: '1803 CE',
    icon: '⚔️',
    between: 'British East India Company vs. Maratha Empire',
    summary: 'Arthur Wellesley\'s victory over Marathas.',
    d: {
      date: 'September 23, 1803',
      loc: 'Assaye, Maharashtra',
      out: 'British victory',
      cmd: 'Arthur Wellesley vs. Colonel Jean Baptiste Filoze',
      str: 'British: 4,500 | Maratha: 30,000 + 10,000',
      strat: 'British cavalry charge on both flanks',
      turn: 'Maratha guns captured and turned',
      cas: 'British: 1,592 | Maratha: 6,000',
      sig: 'Established British supremacy over Marathas'
    }
  },
  {
    id: 'laswari',
    name: 'Battle of Laswari',
    year: '1803 CE',
    icon: '⚔️',
    between: 'British East India Company vs. Maratha Empire',
    summary: 'Decisive British victory over Maratha confederates.',
    d: {
      date: 'November 1, 1803',
      loc: 'Laswari, Haryana',
      out: 'British victory - Scindia and Holkar defeated',
      cmd: 'General Lake vs. Maratha forces',
      str: 'British: 10,000 | Maratha: 30,000',
      strat: 'British artillery broke Maratha lines',
      turn: 'Maratha cavalry fled',
      cas: 'British: 707 | Maratha: 3,000',
      sig: 'End of Maratha independence in North'
    }
  },
  {
    id: 'mehid',
    name: 'Battle of Mehid',
    year: '1804 CE',
    icon: '⚔️',
    between: 'British vs. Scindia & Holkar',
    summary: 'British victory but Scindia escaped.',
    d: {
      date: 'December 24, 1804',
      loc: 'Mehid, Rajasthan',
      out: 'British tactical victory',
      cmd: 'Lord Lake vs. Daulat Rao Scindia',
      str: 'British: 6,000 | Scindia: 30,000',
      strat: 'Ambush by British cavalry',
      turn: 'Scindia fled with treasury',
      cas: 'British: 1,000 | Scindia: 3,000',
      sig: 'Scindia submitted after losing army'
    }
  },
  {
    id: 'deeg',
    name: 'Battle of Deeg',
    year: '1804 CE',
    icon: '⚔️',
    between: 'British vs. Holkar',
    summary: 'British defeat in surprise attack.',
    d: {
      date: 'October 31, 1804',
      loc: 'Deeg, Rajasthan',
      out: 'Maratha victory',
      cmd: 'Fraser vs. Holkar',
      str: 'British: 4,500 | Holkar: 30,000',
      strat: 'Holkar\'s surprise night attack',
      turn: 'British commander Fraser killed',
      cas: 'British: 1,000 | Holkar: 1,500',
      sig: 'Only major Maratha victory in Second Anglo-Maratha War'
    }
  },
  {
    id: 'bhopal',
    name: 'Battle of Bhopal',
    year: '1819 CE',
    icon: '⚔️',
    between: 'British East India Company vs. Nawab of Bhopal',
    summary: 'Final defeat of Maratha power in Central India.',
    d: {
      date: 'December 9, 1819',
      loc: 'Bhopal, Madhya Pradesh',
      out: 'British victory',
      cmd: 'Malcolm vs. Nawab',
      str: 'British: 4,000 | Bhopal: 6,000',
      strat: 'British infantry superiority',
      turn: 'Nawab escaped but later surrendered',
      cas: 'British: 252 | Bhopal: 2,000',
      sig: 'End of independent Bhopal'
    }
  },
  {
    id: 'khadki',
    name: 'Battle of Khadki',
    year: '1794 CE',
    icon: '⚔️',
    between: 'Maratha Empire vs. Nizam of Hyderabad',
    summary: 'Maratha victory over Nizam.',
    d: {
      date: 'October 12, 1794',
      loc: 'Khadki, Maharashtra',
      out: 'Maratha victory',
      cmd: 'Peshwa vs. Nizam',
      str: 'Maratha: 80,000 | Nizam: 30,000',
      strat: 'Superior Maratha numbers',
      turn: 'Nizam retreated',
      cas: 'Nizam lost artillery',
      sig: 'Nizam accepted Maratha supremacy temporarily'
    }
  },
  {
    id: 'pune',
    name: 'Battle of Pune',
    year: '1795 CE',
    icon: '⚔️',
    between: 'Nawab of Bhopal vs. Marathas',
    summary: 'Internal Maratha conflict.',
    d: {
      date: 'March 25, 1795',
      loc: 'Pune, Maharashtra',
      out: 'Inconclusive',
      cmd: 'Mahadji Scindia vs. Peshwa',
      str: 'Scindia: 15,000 | Peshwa: 20,000',
      strat: 'Infantry and artillery',
      turn: 'Peace negotiated',
      cas: 'Unknown',
      sig: 'Showed Scindia\'s power in Deccan'
    }
  }
];

export const COMPREHENSIVE_DYKS = [
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
  'Kanishka the Great of Kushan Empire hosted the Fourth Buddhist Council in 72 CE — helping spread Buddhism to China and Korea.',
  'The Brihadeeswara Temple at Thanjavur built by Rajaraja Chola I required 130 million bricks and is one of the largest temples in India.',
  'Tipu Sultan is credited with introducing the first rockets in warfare — the " Mysore rockets" that impressed British engineers.',
  'The Qutb Minar was built by Qutb-ud-din Aibak using demolition material from 27 Hindu temples.',
  'Maharaja Ranjit Singh\'s empire was the last to hold the Kohinoor diamond before British annexation.',
  'The Ajanta Caves were patronized by various dynasties over 800 years — from Satavahanas to Mughals.',
  'Samudragupta\'s coins show him playing the veena — a rare depiction of a king as musician.',
  'Emperor Ashoka\'s edicts are found across South Asia — from Afghanistan to Sri Lanka — the largest such inscription corpus.',
  'Chandragupta Maurya was reportedly brought up among shepherds before being discovered by Chanakya.',
  'Rani Lakshmibai of Jhansi was trained in sword fighting and martial arts from a young age.',
  'The Hoysala temples at Belur and Halebidu took over 150 years to complete.',
  'Birla Mandir temples were built by the industrialist family and named after many historical figures.',
  'Maharaja Ranjit Singh established the first modern army in India with European-style training.',
  'The Sun Temple at Konark was built in the shape of a giant chariot with 24 wheels.',
  'The Chola empire had the world\'s first recorded marine insurance system for traders.',
  'Shivaji\'s navy controlled the Arabian Sea coast from Mumbai to Goa.',
  'Mughal Emperor Akbar built Fatehpur Sikri using red sandstone from the quarries of Rajasthan.',
  'The Maratha confederacy at its peak had the Peshwa in Pune and 7 major sardars controlling different regions.',
  'Kalhana\'s Rajatarangini is the oldest historical chronicle of Kashmir, written in 12th century.'
];
