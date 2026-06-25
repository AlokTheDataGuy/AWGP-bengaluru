import PillarPage from '../../../components/pillars/PillarPage';
import data from '../../../data-json-files/swadhyay.json';

const SEAL = '/assets/icon/swadhayay1.png';
const IMG = '/assets/pillars/swadhyay';

const SECTION_LABELS = {
  'what-is-swadhyay': { en: 'The Meaning', hi: 'अर्थ', kn: 'ಅರ್ಥ' },
  'why-it-matters': { en: 'Why It Matters', hi: 'महत्त्व', kn: 'ಮಹತ್ವ' },
};
const SECTION_IMG = {
  'what-is-swadhyay': `${IMG}/meaning.png`,
  'why-it-matters': `${IMG}/why.png`,
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { en: 'Swadhyay — AWGP Bengaluru', hi: 'स्वाध्याय — AWGP बेंगलूरु', kn: 'ಸ್ವಾಧ್ಯಾಯ — AWGP ಬೆಂಗಳೂರು' };
  return { title: titles[locale] || titles.en, description: data.meta.seoDescription?.[locale] || data.meta.seoDescription?.en };
}

export default async function SwadhyayPillarPage({ params }) {
  const { locale } = await params;
  const L = (o) => (o && (o[locale] ?? o.en)) || '';

  const concept = data.sections.filter((s) => s.id !== 'jnana-yagya');
  const jnana = data.sections.find((s) => s.id === 'jnana-yagya');

  const hero = {
    icon: SEAL,
    image: `${IMG}/hero.png`,
    eyebrow: L({ en: 'The Second Pillar · Self-Study', hi: 'दूसरा स्तंभ · स्वाध्याय', kn: 'ಎರಡನೇ ಸ್ತಂಭ · ಸ್ವಾಧ್ಯಾಯ' }),
    title: L(data.hero.title),
    subtitle: L(data.hero.tagline),
    intro: L(data.hero.intro),
  };

  const sections = concept.map((s) => ({
    id: s.id,
    label: L(SECTION_LABELS[s.id]),
    title: L(s.title),
    body: L(s.body),
    highlights: (s.highlights?.[locale] || s.highlights?.en || []),
    image: SECTION_IMG[s.id],
  }));

  const feature = jnana && {
    eyebrow: L({ en: 'The Movement', hi: 'आंदोलन', kn: 'ಆಂದೋಲನ' }),
    title: L(jnana.title),
    body: L(jnana.body),
    image: `${IMG}/jnana-yagya.png`,
  };

  const practice = {
    eyebrow: L({ en: 'Begin', hi: 'आरंभ', kn: 'ಆರಂಭ' }),
    title: L(data.practices.title),
    text: L(data.practices.text),
    button: { label: L(data.practices.buttonLabel), href: data.practices.link, external: true },
  };

  const resources = {
    heading: L({ en: 'Read More', hi: 'आगे पढ़ें', kn: 'ಹೆಚ್ಚಿನ ಓದು' }),
    note: L({
      en: 'Gurudev’s own teachings on swadhyay, freely readable at awgp.org:',
      hi: 'स्वाध्याय पर गुरुदेव की मूल शिक्षाएँ, awgp.org पर नि:शुल्क उपलब्ध:',
      kn: 'ಸ್ವಾಧ್ಯಾಯದ ಬಗ್ಗೆ ಗುರುದೇವರ ಮೂಲ ಬೋಧನೆಗಳು, awgp.org ನಲ್ಲಿ ಉಚಿತವಾಗಿ:',
    }),
    items: (data.resources || []).map((r) => ({ title: L(r.title), url: r.read, type: r.type })),
  };

  return (
    <PillarPage
      locale={locale}
      slug="swadhyay"
      index={2}
      hero={hero}
      sections={sections}
      feature={feature}
      practice={practice}
      resources={resources}
    />
  );
}
