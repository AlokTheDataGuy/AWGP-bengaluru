import PillarPage from '../../../components/pillars/PillarPage';
import Breadcrumbs from '../../../components/seo/Breadcrumbs';
import { buildMetadata } from '../../../lib/seo/metadata';
import data from '../../../data-json-files/seva.json';

const SEAL = '/assets/icon/seva1.png';
const IMG = '/assets/pillars/seva';
const PILLAR_NAME = { en: 'Seva — Selfless Service', hi: 'सेवा — निःस्वार्थ सेवा', kn: 'ಸೇವೆ — ನಿಃಸ್ವಾರ್ಥ ಸೇವೆ' };
const HOME_LABEL = { en: 'Home', hi: 'होम', kn: 'ಮುಖಪುಟ' };
const PILLAR_DESC = {
  en: 'Seva (selfless service) is the fourth pillar of Gayatri Pariwar sadhana — giving time (samaydaan) and a share of one’s earnings (anshdaan) for the good of all. See how AWGP Bengaluru turns spiritual practice into community service.',
  hi: 'सेवा (निःस्वार्थ सेवा) गायत्री परिवार साधना का चौथा स्तंभ है — समयदान एवं अंशदान द्वारा सबके हित में योगदान। देखें कैसे AWGP बेंगलूरु अध्यात्म को सामुदायिक सेवा में बदलता है।',
  kn: 'ಸೇವೆ (ನಿಃಸ್ವಾರ್ಥ ಸೇವೆ) ಗಾಯತ್ರಿ ಪರಿವಾರ ಸಾಧನೆಯ ನಾಲ್ಕನೇ ಸ್ತಂಭ — ಸಮಯದಾನ ಮತ್ತು ಅಂಶದಾನದ ಮೂಲಕ ಎಲ್ಲರ ಹಿತಕ್ಕಾಗಿ ಕೊಡುಗೆ. AWGP ಬೆಂಗಳೂರು ಅಧ್ಯಾತ್ಮವನ್ನು ಸಮುದಾಯ ಸೇವೆಯಾಗಿ ಪರಿವರ್ತಿಸುವುದನ್ನು ನೋಡಿ.',
};

const SECTION_LABELS = {
  'what-is-seva': { en: 'The Meaning', hi: 'अर्थ', kn: 'ಅರ್ಥ' },
  'why-it-matters': { en: 'Why It Matters', hi: 'महत्त्व', kn: 'ಮಹತ್ವ' },
};
const SECTION_IMG = {
  'what-is-seva': `${IMG}/meaning.png`,
  'why-it-matters': `${IMG}/why.png`,
};
const TYPE_IMG = {
  samaydaan: `${IMG}/types/samaydaan.png`,
  anshdaan: `${IMG}/types/anshdaan.png`,
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/seva',
    title: PILLAR_NAME,
    description: data.meta?.seoDescription || PILLAR_DESC,
  });
}

export default async function SevaPillarPage({ params }) {
  const { locale } = await params;
  const L = (o) => (o && (o[locale] ?? o.en)) || '';

  const hero = {
    icon: SEAL,
    image: `${IMG}/hero.png`,
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
    image: `${IMG}/gyan-yagya.png`,
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
        { name: L(PILLAR_NAME), path: '/seva' },
      ]}
    />
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
    </>
  );
}
