import PillarPage from '../../../components/pillars/PillarPage';
import data from '../../../data-json-files/sanyam.json';

const SEAL = '/assets/icon/sanyam1.png';
const IMG = '/assets/pillars/sanyam';

const SECTION_LABELS = {
  'what-is-sanyam': { en: 'The Meaning', hi: 'अर्थ', kn: 'ಅರ್ಥ' },
  'why-it-matters': { en: 'Why It Matters', hi: 'महत्त्व', kn: 'ಮಹತ್ವ' },
};
const SECTION_IMG = {
  'what-is-sanyam': `${IMG}/meaning.jpg`,
  'why-it-matters': `${IMG}/why.jpg`,
};
const TYPE_IMG = {
  'indriya-sanyam': `${IMG}/types/indriya.jpg`,
  'vichar-sanyam': `${IMG}/types/vichar.jpg`,
  'samay-sanyam': `${IMG}/types/samay.jpg`,
  'arth-sanyam': `${IMG}/types/arth.jpg`,
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { en: 'Sanyam — AWGP Bengaluru', hi: 'संयम — AWGP बेंगलूरु', kn: 'ಸಂಯಮ — AWGP ಬೆಂಗಳೂರು' };
  return { title: titles[locale] || titles.en };
}

export default async function SanyamPillarPage({ params }) {
  const { locale } = await params;
  const L = (o) => (o && (o[locale] ?? o.en)) || '';

  const hero = {
    icon: SEAL,
    image: `${IMG}/hero.jpg`,
    eyebrow: L({ en: 'The Third Pillar · Self-Restraint', hi: 'तीसरा स्तंभ · संयम', kn: 'ಮೂರನೇ ಸ್ತಂಭ · ಸಂಯಮ' }),
    title: L(data.hero.title),
    subtitle: L(data.hero.subtitle),
    intro: L(data.hero.intro),
  };

  const sections = data.sections.map((s) => ({
    id: s.id,
    label: L(SECTION_LABELS[s.id]),
    title: L(s.title),
    body: L(s.body),
    highlights: (s.highlights?.[locale] || s.highlights?.en || []),
    image: SECTION_IMG[s.id],
  }));

  const types = {
    heading: L(data.types.heading),
    intro: L(data.types.intro),
    items: data.types.items.map((t) => ({
      id: t.id,
      name: L(t.name),
      summary: L(t.summary),
      description: L(t.description),
      image: TYPE_IMG[t.id],
    })),
  };

  const practice = {
    eyebrow: L({ en: 'In Practice', hi: 'अभ्यास', kn: 'ಅಭ್ಯಾಸ' }),
    title: L(data.practice.heading),
    text: L(data.practice.body),
    button: null,
  };

  const resources = {
    heading: L(data.references.heading),
    note: L(data.references.note),
    items: (data.references.items || []).map((r) => ({ title: r.title, url: r.url, type: r.type })),
  };

  return (
    <PillarPage
      locale={locale}
      slug="sanyam"
      index={3}
      hero={hero}
      sections={sections}
      types={types}
      practice={practice}
      resources={resources}
    />
  );
}
