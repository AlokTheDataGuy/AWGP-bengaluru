import PillarPage from '../../../components/pillars/PillarPage';
import data from '../../../data-json-files/seva.json';

const SEAL = '/assets/icon/seva1.png';
const IMG = '/assets/pillars/seva';

const SECTION_LABELS = {
  'what-is-seva': { en: 'The Meaning', hi: 'अर्थ', kn: 'ಅರ್ಥ' },
  'why-it-matters': { en: 'Why It Matters', hi: 'महत्त्व', kn: 'ಮಹತ್ವ' },
};
const SECTION_IMG = {
  'what-is-seva': `${IMG}/meaning.jpg`,
  'why-it-matters': `${IMG}/why.jpg`,
};
const TYPE_IMG = {
  samaydaan: `${IMG}/types/samaydaan.jpg`,
  anshdaan: `${IMG}/types/anshdaan.jpg`,
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { en: 'Seva — AWGP Bengaluru', hi: 'सेवा — AWGP बेंगलूरु', kn: 'ಸೇವೆ — AWGP ಬೆಂಗಳೂರು' };
  return { title: titles[locale] || titles.en };
}

export default async function SevaPillarPage({ params }) {
  const { locale } = await params;
  const L = (o) => (o && (o[locale] ?? o.en)) || '';

  const hero = {
    icon: SEAL,
    image: `${IMG}/hero.jpg`,
    eyebrow: L({ en: 'The Fourth Pillar · Selfless Service', hi: 'चौथा स्तंभ · सेवा', kn: 'ನಾಲ್ಕನೇ ಸ್ತಂಭ · ಸೇವೆ' }),
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

  const feature = data.gyanYagya && {
    eyebrow: L({ en: 'The Highest Service', hi: 'सर्वोच्च सेवा', kn: 'ಅತ್ಯುನ್ನತ ಸೇವೆ' }),
    title: L(data.gyanYagya.heading),
    body: L(data.gyanYagya.body),
    image: `${IMG}/gyan-yagya.jpg`,
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
      slug="seva"
      index={4}
      hero={hero}
      sections={sections}
      types={types}
      feature={feature}
      practice={practice}
      resources={resources}
    />
  );
}
