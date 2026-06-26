import ActivityArticle from '../../../../components/activities/ActivityArticle';
import data from '../../../../data-json-files/activities/meditation.json';

const RESOURCES_HEADING = { en: 'Learn more — books & resources', hi: 'और जानें — पुस्तकें व संसाधन', kn: 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ — ಪುಸ್ತಕಗಳು' };
const RESOURCES_NOTE = {
  en: "These titles by Gurudev Pandit Shriram Sharma Acharya explore Jap, Tap, and Dhyan in depth. Read free online, or order a copy.",
  hi: 'गुरुदेव पंडित श्रीराम शर्मा आचार्य की ये पुस्तकें जप, तप और ध्यान को गहराई से समझाती हैं। ऑनलाइन निःशुल्क पढ़ें, या प्रति मँगवाएँ।',
  kn: 'ಗುರುದೇವ್ ಪಂಡಿತ್ ಶ್ರೀರಾಮ್ ಶರ್ಮಾ ಆಚಾರ್ಯರ ಈ ಪುಸ್ತಕಗಳು ಜಪ, ತಪ ಮತ್ತು ಧ್ಯಾನವನ್ನು ಆಳವಾಗಿ ತಿಳಿಸುತ್ತವೆ. ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಉಚಿತವಾಗಿ ಓದಿ, ಅಥವಾ ಪ್ರತಿ ತರಿಸಿಕೊಳ್ಳಿ.',
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = {
    en: 'Meditation — AWGP Bengaluru',
    hi: 'ध्यान — AWGP बेंगलूरु',
    kn: 'ಧ್ಯಾನ — AWGP ಬೆಂಗಳೂರು',
  };
  return { title: titles[locale] || titles.en };
}

export default async function MeditationPage({ params }) {
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

  const resources = Array.isArray(data.resources)
    ? {
        heading: L(RESOURCES_HEADING),
        note: L(RESOURCES_NOTE),
        links: data.resources.map((r) => ({
          id: r.id,
          title: L(r.title),
          source: r.lang ? r.lang.toUpperCase() : null,
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
      heroImage="/assets/programs/meditation.jpg"
      sectionImage="/assets/programs/meditation1.jpg"
      sections={sections}
      extra={null}
      resources={resources}
    />
  );
}
