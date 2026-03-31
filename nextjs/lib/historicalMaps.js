export const HISTORICAL_MAPS = [
  {
    id: 'maurya-250-bce',
    dynastyId: 'maurya',
    era: 'ancient',
    yearLabel: '250 BCE',
    title: 'Mauryan Empire at Ashoka’s Height',
    description:
      'A subcontinental imperial map centered on Ashoka’s reign, useful for visualizing the scale of Mauryan consolidation and the reach of edict-bearing territories.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Mauryas_map.svg/960px-Mauryas_map.svg.png',
    width: 960,
    height: 889,
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mauryas_map.svg',
    sourceLabel: 'Wikimedia Commons',
    sourceNote:
      'Map caption identifies the Mauryan Empire in 250 BCE and notes areas interpreted as semi-independent in some reconstructions.',
  },
  {
    id: 'gupta-400-ce',
    dynastyId: 'gupta',
    era: 'ancient',
    yearLabel: '320–550 CE',
    title: 'Gupta Empire',
    description:
      'A historical reconstruction based on the Kulke and Rothermund atlas tradition, useful for situating the Gupta core in the Gangetic plain and its wider political reach.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Gupta_Empire%2C_320-550_CE.png/960px-Gupta_Empire%2C_320-550_CE.png',
    width: 960,
    height: 875,
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gupta_Empire,_320-550_CE.png',
    sourceLabel: 'Wikimedia Commons',
    sourceNote:
      'The file description says it is based on p. 90 of Kulke and Rothermund’s A History of India (4th ed.).',
  },
  {
    id: 'chola-1030-ce',
    dynastyId: 'chola',
    era: 'medieval',
    yearLabel: 'c. 1030 CE',
    title: 'Chola Maritime Reach',
    description:
      'A Chola-period map that helps frame the southern imperial core and the larger maritime horizon associated with Rajaraja I and Rajendra I.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Chola_Empire_Map_%281%29.png/960px-Chola_Empire_Map_%281%29.png',
    width: 960,
    height: 563,
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Chola_Empire_Map_(1).png',
    sourceLabel: 'Wikimedia Commons',
    sourceNote: 'Used here as an era snapshot rather than a claim of exact year-by-year border precision.',
  },
  {
    id: 'vijayanagara-1500-ce',
    dynastyId: 'vijayanagara',
    era: 'medieval',
    yearLabel: 'c. 1500 CE',
    title: 'Vijayanagara Imperial Core',
    description:
      'A late medieval South Indian power map that helps situate the Tungabhadra-centered empire and its zone of control before Talikota.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Vijayanagara-empire-map.svg/960px-Vijayanagara-empire-map.svg.png',
    width: 960,
    height: 1121,
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Vijayanagara-empire-map.svg',
    sourceLabel: 'Wikimedia Commons',
    sourceNote: 'Original file dates to 2007 and is treated here as a broad historical reconstruction.',
  },
  {
    id: 'mughal-1707-ce',
    dynastyId: 'mughal',
    era: 'modern',
    yearLabel: '1707 CE',
    title: 'Mughal Empire Under Aurangzeb',
    description:
      'A widely used historical map showing Mughal territorial reach at the close of Aurangzeb’s reign, when the empire approached its greatest extent.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Mughal_Empire%2C_1707.png',
    width: 801,
    height: 749,
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mughal_Empire,_1707.png',
    sourceLabel: 'Wikimedia Commons',
    sourceNote: 'Used as a late-imperial benchmark for early modern India.',
  },
  {
    id: 'maratha-1760-ce',
    dynastyId: 'maratha',
    era: 'modern',
    yearLabel: '1760 CE',
    title: 'Maratha Empire Before Panipat',
    description:
      'A map snapshot useful for understanding how far Maratha influence had spread on the eve of the Third Battle of Panipat.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Map_of_the_Maratha_Empire_1760.svg/960px-Map_of_the_Maratha_Empire_1760.svg.png',
    width: 960,
    height: 1120,
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Map_of_the_Maratha_Empire_1760.svg',
    sourceLabel: 'Wikimedia Commons',
    sourceNote: 'Best read as a political influence map for the confederacy at its peak moment.',
  },
  {
    id: 'sikh-1839-ce',
    dynastyId: 'sikh',
    era: 'modern',
    yearLabel: '1839 CE',
    title: 'Sikh Empire at Ranjit Singh’s Death',
    description:
      'A northwest-focused map marking the Sikh Empire’s extent at the death of Maharaja Ranjit Singh, just before the empire’s rapid internal weakening.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Sikh_Empire.png/960px-Sikh_Empire.png',
    width: 960,
    height: 889,
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Sikh_Empire.png',
    sourceLabel: 'Wikimedia Commons',
    sourceNote: 'The map title on the source page explicitly marks the year as c. 1839.',
  },
];

export function getMapsForDynasty(dynastyId) {
  return HISTORICAL_MAPS.filter((map) => map.dynastyId === dynastyId);
}
