import PillarPage from '../../../components/pillars/PillarPage';
import data from '../../../data-json-files/sadhana.json';

const SEAL = '/assets/icon/sadhna1.png';
const IMG = '/assets/pillars/sadhana';

/* Eyebrow label shown above each concept section */
const SECTION_LABELS = {
  'what-is-sadhana': { en: 'The Meaning', hi: 'अर्थ', kn: 'ಅರ್ಥ' },
  'why-it-matters': { en: 'Why It Matters', hi: 'महत्त्व', kn: 'ಮಹತ್ವ' },
};
const SECTION_IMG = {
  'what-is-sadhana': `${IMG}/meaning.jpg`,
  'why-it-matters': `${IMG}/why.jpg`,
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { en: 'Sadhana — AWGP Bengaluru', hi: 'साधना — AWGP बेंगलूरु', kn: 'ಸಾಧನೆ — AWGP ಬೆಂಗಳೂರು' };
  return { title: titles[locale] || titles.en, description: data.meta.seoDescription?.[locale] || data.meta.seoDescription?.en };
}

export default async function SadhanaPillarPage({ params }) {
  const { locale } = await params;
  const L = (o) => (o && (o[locale] ?? o.en)) || '';

  const concept = data.sections.filter((s) => s.id !== 'sadhana-andolan');
  const andolan = data.sections.find((s) => s.id === 'sadhana-andolan');

  const hero = {
    icon: SEAL,
    image: `${IMG}/hero.jpg`,
    eyebrow: L({ en: 'The First Pillar · Self-Refinement', hi: 'पहला स्तंभ · आत्म-परिष्कार', kn: 'ಮೊದಲ ಸ್ತಂಭ · ಆತ್ಮ-ಪರಿಷ್ಕಾರ' }),
    title: L(data.hero.title),
    subtitle: L(data.hero.tagline),
    intro: L(data.hero.intro),
    mantra: '॥ ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
  };

  const sections = concept.map((s) => ({
    id: s.id,
    label: L(SECTION_LABELS[s.id]),
    title: L(s.title),
    body: L(s.body),
    highlights: (s.highlights?.[locale] || s.highlights?.en || []),
    image: SECTION_IMG[s.id],
  }));

  const feature = andolan && {
    eyebrow: L({ en: 'The Movement', hi: 'आंदोलन', kn: 'ಆಂದೋಲನ' }),
    title: L(andolan.title),
    body: L(andolan.body),
    image: `${IMG}/andolan.jpg`,
  };

  const practice = {
    eyebrow: L({ en: 'Begin', hi: 'आरंभ', kn: 'ಆರಂಭ' }),
    title: L(data.practices.title),
    text: L(data.practices.text),
    button: { label: L(data.practices.buttonLabel), href: '/activities/sadhana', external: false },
  };

  const resources = {
    heading: L({ en: 'Read More', hi: 'आगे पढ़ें', kn: 'ಹೆಚ್ಚಿನ ಓದು' }),
    note: L({
      en: 'Gurudev’s own teachings on sadhana, freely readable at awgp.org:',
      hi: 'साधना पर गुरुदेव की मूल शिक्षाएँ, awgp.org पर नि:शुल्क उपलब्ध:',
      kn: 'ಸಾಧನೆಯ ಬಗ್ಗೆ ಗುರುದೇವರ ಮೂಲ ಬೋಧನೆಗಳು, awgp.org ನಲ್ಲಿ ಉಚಿತವಾಗಿ:',
    }),
    items: (data.resources || []).map((r) => ({ title: L(r.title), url: r.read, type: r.type })),
  };

  return (
    <PillarPage
      locale={locale}
      slug="sadhana"
      index={1}
      hero={hero}
      sections={sections}
      feature={feature}
      practice={practice}
      resources={resources}
    />
  );
}
