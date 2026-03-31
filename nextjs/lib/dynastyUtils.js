import { DYN } from './data';

export const ERA_LABELS = {
  ancient: 'Ancient',
  medieval: 'Medieval',
  modern: 'Modern',
};

export const DYNASTY_DETAILS = {
  indus: {
    slug: 'indus-valley-civilization',
    region: 'Northwest',
    sortYear: -3300,
    summary:
      'Urban South Asia begins here: planned cities, advanced drainage, standard weights, and a trading network stretching from Mesopotamia to Gujarat.',
    highlights: ['Urban planning', 'Trade networks', 'Proto-writing'],
  },
  maurya: {
    slug: 'mauryan-empire',
    region: 'Pan-Indian',
    sortYear: -322,
    summary:
      'The first large imperial unification of the subcontinent, crowned by Ashoka’s ethical turn after Kalinga and a state system shaped by Chanakya’s political vision.',
    highlights: ['Imperial unification', 'Ashokan edicts', 'Buddhist patronage'],
  },
  gupta: {
    slug: 'gupta-empire',
    region: 'North',
    sortYear: 320,
    summary:
      'A classical age of political stability, mathematics, literature, and temple culture often described as one of the high points of early Indian civilization.',
    highlights: ['Science and mathematics', 'Sanskrit culture', 'Nalanda'],
  },
  kushan: {
    slug: 'kushan-empire',
    region: 'Northwest',
    sortYear: 30,
    summary:
      'A transregional empire linking India, Central Asia, and the Silk Road, especially important for trade, coinage, and the spread of Buddhism.',
    highlights: ['Silk Road exchange', 'Gold coinage', 'Buddhist transmission'],
  },
  chola: {
    slug: 'chola-dynasty',
    region: 'South',
    sortYear: -300,
    summary:
      'A long-lived Tamil power whose imperial phase built monumental temples, refined administration, and projected naval strength across the Bay of Bengal.',
    highlights: ['Temple architecture', 'Maritime power', 'Tamil administration'],
  },
  chalukya: {
    slug: 'chalukya-dynasty',
    region: 'Deccan',
    sortYear: 543,
    summary:
      'A major Deccan polity that checked northern expansion and left behind a decisive architectural legacy in Badami, Aihole, and Pattadakal.',
    highlights: ['Deccan statecraft', 'Temple innovation', 'Military resistance'],
  },
  pallava: {
    slug: 'pallava-dynasty',
    region: 'South',
    sortYear: 275,
    summary:
      'The Pallavas anchored early medieval power on the Coromandel coast and drove the evolution of South Indian stone and rock-cut temple forms.',
    highlights: ['Mahabalipuram', 'Rock-cut temples', 'Coastal influence'],
  },
  rashtrakuta: {
    slug: 'rashtrakuta-dynasty',
    region: 'Deccan',
    sortYear: 753,
    summary:
      'A Deccan empire with north-south reach, remembered for military ambition, literary patronage, and the extraordinary Kailasa temple at Ellora.',
    highlights: ['Ellora Kailasa', 'Kannada literature', 'Pan-Indian reach'],
  },
  vijayanagara: {
    slug: 'vijayanagara-empire',
    region: 'South',
    sortYear: 1336,
    summary:
      'The great imperial power of late medieval South India, with Hampi as its dazzling capital and a long frontier struggle against the Deccan sultanates.',
    highlights: ['Hampi', 'South Indian revival', 'Imperial city'],
  },
  mughal: {
    slug: 'mughal-empire',
    region: 'North',
    sortYear: 1526,
    summary:
      'A gunpowder empire that transformed administration, architecture, agrarian revenue, and court culture across much of the subcontinent.',
    highlights: ['Gunpowder empire', 'Imperial administration', 'Monumental architecture'],
  },
  maratha: {
    slug: 'maratha-empire',
    region: 'West',
    sortYear: 1674,
    summary:
      'A confederated power forged from western India that challenged Mughal supremacy and became the last major indigenous contender for subcontinental dominance.',
    highlights: ['Swarajya', 'Mobile warfare', 'Confederacy expansion'],
  },
  sikh: {
    slug: 'sikh-empire',
    region: 'Northwest',
    sortYear: 1799,
    summary:
      'Ranjit Singh’s state unified Punjab, modernized its army, and created one of the most formidable powers in early nineteenth-century South Asia.',
    highlights: ['Punjab unification', 'Khalsa army', 'Secular governance'],
  },
};

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function enrichDynasty(dynasty, era) {
  const details = DYNASTY_DETAILS[dynasty.id] || {};

  return {
    ...dynasty,
    era,
    slug: details.slug || slugify(dynasty.name),
    region: details.region || 'Pan-Indian',
    sortYear: details.sortYear ?? 0,
    summary: details.summary || dynasty.sig,
    highlights: details.highlights || [],
  };
}

export function getAllDynasties() {
  return Object.entries(DYN).flatMap(([era, dynasties]) =>
    dynasties.map((dynasty) => enrichDynasty(dynasty, era)),
  );
}

export const ALL_DYNASTIES = getAllDynasties().sort((left, right) => left.sortYear - right.sortYear);

export function getDynastyById(id) {
  return ALL_DYNASTIES.find((dynasty) => dynasty.id === id) || null;
}

export function getDynastyBySlug(slug) {
  return ALL_DYNASTIES.find((dynasty) => dynasty.slug === slug) || null;
}

export function getDynastyHref(id) {
  const dynasty = getDynastyById(id);
  return dynasty ? `/dynasties/${dynasty.slug}` : '/dynasties';
}
