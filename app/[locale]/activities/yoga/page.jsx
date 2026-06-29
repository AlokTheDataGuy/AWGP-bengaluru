import ActivityArticle from '../../../../components/activities/ActivityArticle';
import Breadcrumbs from '../../../../components/seo/Breadcrumbs';
import { buildMetadata } from '../../../../lib/seo/metadata';
import data from '../../../../data-json-files/activities/yoga.json';

const SESSION_IMAGES = ['/assets/yoga/womens-yoga.jpg', '/assets/programs/yoga_session1.jpg'];

const YOGA_TITLE = {
  en: 'Pragya Yoga in Bangalore — Free Yoga Classes',
  hi: 'बेंगलूरु में प्रज्ञायोग — नि:शुल्क योग कक्षाएं',
  kn: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಪ್ರಜ್ಞಾಯೋಗ — ಉಚಿತ ಯೋಗ ತರಗತಿಗಳು',
};
const YOGA_DESC = {
  en: 'Free Pragya Yoga and Yoga sessions at AWGP Bengaluru — a simple sequence of asanas, Gayatri Mantra and conscious breathing for every age, in the tradition of Gurudev Shri Ram Sharma Acharya.',
  hi: 'AWGP बेंगलूरु में नि:शुल्क प्रज्ञायोग एवं योग सत्र — आसन, गायत्री मंत्र एवं सजग श्वास का सरल क्रम, हर आयु के लिए, गुरुदेव श्रीराम शर्मा आचार्य की परंपरा में।',
  kn: 'AWGP ಬೆಂಗಳೂರಿನಲ್ಲಿ ಉಚಿತ ಪ್ರಜ್ಞಾಯೋಗ ಮತ್ತು ಯೋಗ ಅವಧಿಗಳು — ಆಸನ, ಗಾಯತ್ರಿ ಮಂತ್ರ ಮತ್ತು ಜಾಗೃತ ಉಸಿರಾಟದ ಸರಳ ಅನುಕ್ರಮ, ಎಲ್ಲಾ ವಯಸ್ಸಿಗೆ.',
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/activities/yoga',
    title: YOGA_TITLE,
    description: YOGA_DESC,
    images: ['/assets/programs/yoga.jpg'],
  });
}

export default async function YogaPage({ params }) {
  const { locale } = await params;
  const L = (obj) => (obj && (obj[locale] || obj.en)) || '';

  const hero = {
    title: L(data.hero.title),
    tagline: L(data.hero.tagline),
    intro: L(data.hero.intro),
  };

  const sections = data.sections.map((s) => ({
    id: s.id,
    heading: L(s.heading || s.title),
    body: L(s.body),
    highlights: s.highlights ? L(s.highlights) : null,
    link: s.link ? { label: L(s.link.label), url: s.link.url } : null,
  }));

  const extra = data.sessions
    ? {
        type: 'sessions',
        heading: L(data.sessions.heading),
        items: data.sessions.items.map((item, i) => ({
          title: L(item.title),
          timing: L(item.timing),
          description: L(item.description),
          image: SESSION_IMAGES[i % SESSION_IMAGES.length],
        })),
      }
    : null;

  const resources = data.resources
    ? {
        heading: L(data.resources.heading),
        note: L(data.resources.note),
        links: data.resources.links.map((r) => ({
          id: r.id,
          title: L(r.title),
          source: r.lang || null,
          type: r.type,
          read: r.read,
          buy: r.buy,
        })),
      }
    : null;

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { name: locale === 'hi' ? 'होम' : locale === 'kn' ? 'ಮುಖಪುಟ' : 'Home', path: '/' },
          { name: locale === 'hi' ? 'गतिविधियां' : locale === 'kn' ? 'ಚಟುವಟಿಕೆಗಳು' : 'Activities', path: '/activities' },
          { name: locale === 'hi' ? 'योग' : locale === 'kn' ? 'ಯೋಗ' : 'Yoga', path: '/activities/yoga' },
        ]}
      />
      <ActivityArticle
        locale={locale}
        hero={hero}
        heroImage="/assets/programs/yoga.jpg"
        sectionImage="/assets/programs/yoga_session.jpg"
        sections={sections}
        extra={extra}
        resources={resources}
      />
    </>
  );
}
