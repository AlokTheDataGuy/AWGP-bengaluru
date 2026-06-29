import PillarPage from '../../../components/pillars/PillarPage';
import Breadcrumbs from '../../../components/seo/Breadcrumbs';
import { buildMetadata } from '../../../lib/seo/metadata';
import data from '../../../data-json-files/sanyam.json';

const SEAL = '/assets/icon/sanyam1.png';
const IMG = '/assets/pillars/sanyam';
const PILLAR_NAME = { en: 'Sanyam — Self-Discipline', hi: 'संयम — आत्म-अनुशासन', kn: 'ಸಂಯಮ — ಆತ್ಮ-ಶಿಸ್ತು' };
const HOME_LABEL = { en: 'Home', hi: 'होम', kn: 'ಮುಖಪುಟ' };
const PILLAR_DESC = {
  en: 'Sanyam (self-discipline) is the third pillar of Gayatri Pariwar sadhana — mastering the senses (indriya), thought (vichar), time (samay) and resources (artha). Learn the four forms of self-restraint taught by Gurudev Shri Ram Sharma Acharya.',
  hi: 'संयम (आत्म-अनुशासन) गायत्री परिवार साधना का तीसरा स्तंभ है — इंद्रिय, विचार, समय एवं अर्थ का संयम। गुरुदेव श्रीराम शर्मा आचार्य द्वारा सिखाए संयम के चार रूप जानें।',
  kn: 'ಸಂಯಮ (ಆತ್ಮ-ಶಿಸ್ತು) ಗಾಯತ್ರಿ ಪರಿವಾರ ಸಾಧನೆಯ ಮೂರನೇ ಸ್ತಂಭ — ಇಂದ್ರಿಯ, ವಿಚಾರ, ಸಮಯ ಮತ್ತು ಅರ್ಥದ ಸಂಯಮ. ಗುರುದೇವ ಶ್ರೀರಾಮ ಶರ್ಮಾ ಆಚಾರ್ಯರು ಕಲಿಸಿದ ಸಂಯಮದ ನಾಲ್ಕು ರೂಪಗಳನ್ನು ತಿಳಿಯಿರಿ.',
};

const SECTION_LABELS = {
  'what-is-sanyam': { en: 'The Meaning', hi: 'अर्थ', kn: 'ಅರ್ಥ' },
  'why-it-matters': { en: 'Why It Matters', hi: 'महत्त्व', kn: 'ಮಹತ್ವ' },
};
const SECTION_IMG = {
  'what-is-sanyam': `${IMG}/meaning.png`,
  'why-it-matters': `${IMG}/why.png`,
};
const TYPE_IMG = {
  'indriya-sanyam': `${IMG}/types/indriya.png`,
  'vichar-sanyam': `${IMG}/types/vichar.png`,
  'samay-sanyam': `${IMG}/types/samay.png`,
  'arth-sanyam': `${IMG}/types/arth.png`,
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/sanyam',
    title: PILLAR_NAME,
    description: data.meta?.seoDescription || PILLAR_DESC,
  });
}

export default async function SanyamPillarPage({ params }) {
  const { locale } = await params;
  const L = (o) => (o && (o[locale] ?? o.en)) || '';

  const hero = {
    icon: SEAL,
    image: `${IMG}/hero.png`,
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
    <>
    <Breadcrumbs
      locale={locale}
      items={[
        { name: L(HOME_LABEL), path: '/' },
        { name: L(PILLAR_NAME), path: '/sanyam' },
      ]}
    />
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
    </>
  );
}
