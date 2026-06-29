import ActivityArticle from '../../../../components/activities/ActivityArticle';
import { buildMetadata } from '../../../../lib/seo/metadata';
import data from '../../../../data-json-files/activities/gau-seva.json';

const GAU_TITLE = {
  en: 'Gau Seva in Bangalore — Caring for the Sacred Cow',
  hi: 'बेंगलूरु में गौ सेवा — पवित्र गौ की देखभाल',
  kn: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಗೋ ಸೇವೆ — ಪವಿತ್ರ ಗೋವಿನ ಆರೈಕೆ',
};
const GAU_DESC = {
  en: 'Join Gau Seva at AWGP Bengaluru — daily feeding and compassionate care of the sacred cow as a living spiritual practice. Volunteer or sponsor cow seva in Bangalore.',
  hi: 'AWGP बेंगलूरु में गौ सेवा से जुड़ें — पवित्र गौ की दैनिक चारा सेवा एवं करुणामय देखभाल, एक जीवंत आध्यात्मिक साधना। बेंगलूरु में गौ सेवा हेतु स्वयंसेवा करें या सहयोग दें।',
  kn: 'AWGP ಬೆಂಗಳೂರಿನಲ್ಲಿ ಗೋ ಸೇವೆಗೆ ಸೇರಿ — ಪವಿತ್ರ ಗೋವಿನ ದೈನಂದಿನ ಆಹಾರ ಸೇವೆ ಮತ್ತು ಕರುಣಾಮಯ ಆರೈಕೆ. ಸ್ವಯಂಸೇವಕರಾಗಿ ಅಥವಾ ಸಹಕರಿಸಿ.',
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({ locale, path: '/activities/gau-seva', title: GAU_TITLE, description: GAU_DESC });
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
