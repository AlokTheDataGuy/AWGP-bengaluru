import ActivityArticle from '../../../../components/activities/ActivityArticle';
import Breadcrumbs from '../../../../components/seo/Breadcrumbs';
import FaqSection from '../../../../components/seo/FaqSection';
import { buildMetadata } from '../../../../lib/seo/metadata';
import { getFaqs } from '../../../../lib/seo/faqs';
import data from '../../../../data-json-files/activities/meditation.json';

const MEDITATION_TITLE = {
  en: 'Free Meditation Classes in Bangalore — Jap, Tap & Dhyan',
  hi: 'बेंगलूरु में नि:शुल्क ध्यान कक्षाएं — जप, तप एवं ध्यान',
  kn: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಉಚಿತ ಧ್ಯಾನ ತರಗತಿಗಳು — ಜಪ, ತಪ ಮತ್ತು ಧ್ಯಾನ',
};
const MEDITATION_DESC = {
  en: 'Free guided meditation and Gayatri Sadhana at AWGP Bengaluru, Begur. Learn Jap, Tap and Dhyan from the Pragya Yoga tradition of Gurudev Shri Ram Sharma Acharya — open to beginners and all ages.',
  hi: 'AWGP बेंगलूरु, बेगूर में नि:शुल्क निर्देशित ध्यान एवं गायत्री साधना। गुरुदेव श्रीराम शर्मा आचार्य की प्रज्ञायोग परंपरा से जप, तप एवं ध्यान सीखें — नवसाधकों एवं सभी आयु के लिए।',
  kn: 'AWGP ಬೆಂಗಳೂರು, ಬೇಗೂರಿನಲ್ಲಿ ಉಚಿತ ಮಾರ್ಗದರ್ಶಿತ ಧ್ಯಾನ ಮತ್ತು ಗಾಯತ್ರಿ ಸಾಧನೆ. ಗುರುದೇವ ಶ್ರೀರಾಮ ಶರ್ಮಾ ಆಚಾರ್ಯರ ಪ್ರಜ್ಞಾಯೋಗ ಪರಂಪರೆಯಿಂದ ಜಪ, ತಪ ಮತ್ತು ಧ್ಯಾನ ಕಲಿಯಿರಿ.',
};

const RESOURCES_HEADING = { en: 'Learn more — books & resources', hi: 'और जानें — पुस्तकें व संसाधन', kn: 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ — ಪುಸ್ತಕಗಳು' };
const RESOURCES_NOTE = {
  en: "These titles by Gurudev Pandit Shriram Sharma Acharya explore Jap, Tap, and Dhyan in depth. Read free online, or order a copy.",
  hi: 'गुरुदेव पंडित श्रीराम शर्मा आचार्य की ये पुस्तकें जप, तप और ध्यान को गहराई से समझाती हैं। ऑनलाइन निःशुल्क पढ़ें, या प्रति मँगवाएँ।',
  kn: 'ಗುರುದೇವ್ ಪಂಡಿತ್ ಶ್ರೀರಾಮ್ ಶರ್ಮಾ ಆಚಾರ್ಯರ ಈ ಪುಸ್ತಕಗಳು ಜಪ, ತಪ ಮತ್ತು ಧ್ಯಾನವನ್ನು ಆಳವಾಗಿ ತಿಳಿಸುತ್ತವೆ. ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಉಚಿತವಾಗಿ ಓದಿ, ಅಥವಾ ಪ್ರತಿ ತರಿಸಿಕೊಳ್ಳಿ.',
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/activities/meditation',
    title: MEDITATION_TITLE,
    description: MEDITATION_DESC,
    images: ['/assets/programs/meditation.jpg'],
  });
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
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { name: locale === 'hi' ? 'होम' : locale === 'kn' ? 'ಮುಖಪುಟ' : 'Home', path: '/' },
          { name: locale === 'hi' ? 'गतिविधियां' : locale === 'kn' ? 'ಚಟುವಟಿಕೆಗಳು' : 'Activities', path: '/activities' },
          { name: locale === 'hi' ? 'ध्यान' : locale === 'kn' ? 'ಧ್ಯಾನ' : 'Meditation', path: '/activities/meditation' },
        ]}
      />
      <ActivityArticle
        locale={locale}
        hero={hero}
        heroImage="/assets/programs/meditation.jpg"
        sectionImage="/assets/programs/meditation1.jpg"
        sections={sections}
        extra={null}
        resources={resources}
      />
      <FaqSection
        items={getFaqs('meditation', locale)}
        eyebrow={locale === 'hi' ? 'ध्यान एवं प्रज्ञायोग' : locale === 'kn' ? 'ಧ್ಯಾನ ಮತ್ತು ಪ್ರಜ್ಞಾಯೋಗ' : 'Meditation & Pragya Yoga'}
        heading={locale === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : locale === 'kn' ? 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು' : 'Frequently Asked Questions'}
        id="meditation-faq"
      />
    </>
  );
}
