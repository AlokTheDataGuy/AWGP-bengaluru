import ActivityArticle from '../../../../components/activities/ActivityArticle';
import data from '../../../../data-json-files/activities/gau-seva.json';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = {
    en: 'Gau Seva — AWGP Bengaluru',
    hi: 'गौ सेवा — AWGP बेंगलूरु',
    kn: 'ಗೋ ಸೇವೆ — AWGP ಬೆಂಗಳೂರು',
  };
  return { title: titles[locale] || titles.en };
}

export default async function GauSevaPage({ params }) {
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
  }));

  const extra = data.feeding
    ? {
        type: 'feeding',
        heading: L(data.feeding.heading),
        description: L(data.feeding.description),
        items: data.feeding.slots.map((slot) => ({ label: L(slot.label), time: L(slot.time) })),
      }
    : null;

  const donation = data.donation
    ? {
        heading: L(data.donation.heading),
        description: L(data.donation.description),
        image: data.donation.image,
        imageAlt: L(data.donation.imageAlt),
      }
    : null;

  const resources = data.resources
    ? {
        heading: L(data.resources.heading),
        note: L(data.resources.note),
        links: data.resources.links.map((r) => ({
          id: r.id,
          title: L(r.title),
          source: r.source,
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
      heroImage="/assets/homepage/hero/gau-seva-hero.png"
      heroImageMobile="/assets/homepage/hero/gau-seva-hero-mob.png"
      sectionImage="/assets/activities/gau-seva1.jpg"
      sections={sections}
      extra={extra}
      donation={donation}
      resources={resources}
    />
  );
}
