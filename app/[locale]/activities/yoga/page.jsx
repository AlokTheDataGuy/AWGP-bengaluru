import ActivityArticle from '../../../../components/activities/ActivityArticle';
import data from '../../../../data-json-files/activities/yoga.json';

const SESSION_IMAGES = ['/assets/yoga/womens-yoga.jpg', '/assets/programs/yoga_session1.jpg'];

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = {
    en: 'Yoga — AWGP Bengaluru',
    hi: 'योग — AWGP बेंगलूरु',
    kn: 'ಯೋಗ — AWGP ಬೆಂಗಳೂರು',
  };
  return { title: titles[locale] || titles.en };
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
    <ActivityArticle
      locale={locale}
      hero={hero}
      heroImage="/assets/programs/yoga.jpg"
      sectionImage="/assets/programs/yoga_session.jpg"
      sections={sections}
      extra={extra}
      resources={resources}
    />
  );
}
