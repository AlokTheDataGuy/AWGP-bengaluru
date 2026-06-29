import HeroSection from '../../../components/ui/HeroSection';
import ContentCard from '../../../components/ui/ContentCard';
import Reveal from '../../../components/ui/Reveal';
import Breadcrumbs from '../../../components/seo/Breadcrumbs';
import { buildMetadata } from '../../../lib/seo/metadata';
import '../../../components/ui/IndexPage.css';

const ACTIVITIES_TITLE = {
  en: 'Activities — Meditation, Yoga, Gau Seva & Community Service',
  hi: 'गतिविधियां — ध्यान, योग, गौ सेवा एवं सामुदायिक सेवा',
  kn: 'ಚಟುವಟಿಕೆಗಳು — ಧ್ಯಾನ, ಯೋಗ, ಗೋ ಸೇವೆ ಮತ್ತು ಸಮುದಾಯ ಸೇವೆ',
};
const ACTIVITIES_DESC = {
  en: 'Free meditation, Pragya Yoga, Sadhana, Gau Seva, blood donation and community service at AWGP Bengaluru — where spiritual practice becomes selfless action in Bangalore.',
  hi: 'AWGP बेंगलूरु में नि:शुल्क ध्यान, प्रज्ञायोग, साधना, गौ सेवा, रक्तदान एवं सामुदायिक सेवा — जहाँ साधना निस्वार्थ कर्म बनती है।',
  kn: 'AWGP ಬೆಂಗಳೂರಿನಲ್ಲಿ ಉಚಿತ ಧ್ಯಾನ, ಪ್ರಜ್ಞಾಯೋಗ, ಸಾಧನೆ, ಗೋ ಸೇವೆ, ರಕ್ತದಾನ ಮತ್ತು ಸಮುದಾಯ ಸೇವೆ — ಸಾಧನೆ ನಿಸ್ವಾರ್ಥ ಕರ್ಮವಾಗುವಲ್ಲಿ.',
};

const ACTIVITIES = [
  {
    id: 'sadhana',
    href: '/activities/sadhana',
    img: '/assets/programs/akhand-jap.jpeg',
    title: { en: 'Sadhana', hi: 'साधना', kn: 'ಸಾಧನೆ' },
    subtitle: {
      en: 'Akhand Jap, Anusthan, and the seasonal rhythms of inner practice.',
      hi: 'अखंड जप, अनुष्ठान — आंतरिक साधना की दैनिक व मौसमी लय।',
      kn: 'ಅಖಂಡ ಜಪ, ಅನುಷ್ಠಾನ — ಆಂತರಿಕ ಸಾಧನೆಯ ದೈನಂದಿನ ಮತ್ತು ಋತುಮಾನ ಲಯ.',
    },
    schedule: { en: '4 sadhana paths · daily to annual', hi: '4 साधना पथ · दैनिक से वार्षिक', kn: '4 ಸಾಧನಾ ಪಥಗಳು · ದೈನಂದಿನದಿಂದ ವಾರ್ಷಿಕ' },
  },
  {
    id: 'gau-seva',
    href: '/activities/gau-seva',
    img: '/assets/activities/gau-seva.jpg',
    title: { en: 'Gau Seva', hi: 'गौ सेवा', kn: 'ಗೋ ಸೇವೆ' },
    subtitle: {
      en: 'Caring for the cow — mother, and a living source of sattvic grace.',
      hi: 'गौ की सेवा — माता, और सात्विकता का जीवंत स्रोत।',
      kn: 'ಗೋವಿನ ಆರೈಕೆ — ತಾಯಿ, ಮತ್ತು ಸಾತ್ವಿಕತೆಯ ಜೀವಂತ ಮೂಲ.',
    },
    schedule: { en: 'Daily feeding seva · 7–10 AM & 3–6 PM', hi: 'दैनिक चारा सेवा · सुबह 7–10 व शाम 3–6', kn: 'ದೈನಂದಿನ ಆಹಾರ ಸೇವೆ · ಬೆಳಿಗ್ಗೆ 7–10 ಮತ್ತು ಸಂಜೆ 3–6' },
  },
  {
    id: 'meditation',
    href: '/activities/meditation',
    img: '/assets/programs/meditation.jpg',
    title: { en: 'Meditation', hi: 'ध्यान', kn: 'ಧ್ಯಾನ' },
    subtitle: {
      en: 'The art of turning the mind inward through Jap, Tap, and Dhyan.',
      hi: 'जप, तप और ध्यान द्वारा मन को भीतर मोड़ने की कला।',
      kn: 'ಜಪ, ತಪ ಮತ್ತು ಧ್ಯಾನದ ಮೂಲಕ ಮನಸ್ಸನ್ನು ಒಳಮುಖವಾಗಿ ತಿರುಗಿಸುವ ಕಲೆ.',
    },
    schedule: { en: 'Guided sessions · open to all', hi: 'निर्देशित सत्र · सभी के लिए खुला', kn: 'ಮಾರ್ಗದರ್ಶಿತ ಸೆಷನ್‌ಗಳು · ಎಲ್ಲರಿಗೂ ಮುಕ್ತ' },
  },
  {
    id: 'yoga',
    href: '/activities/yoga',
    img: '/assets/programs/yoga.jpg',
    title: { en: 'Yoga', hi: 'योग', kn: 'ಯೋಗ' },
    subtitle: {
      en: 'Pragya Yoga — asana, breath, and mantra woven into one practice.',
      hi: 'प्रज्ञा योग — आसन, श्वास और मंत्र का एक साथ अभ्यास।',
      kn: 'ಪ್ರಜ್ಞಾ ಯೋಗ — ಆಸನ, ಉಸಿರು ಮತ್ತು ಮಂತ್ರದ ಒಗ್ಗೂಡಿದ ಅಭ್ಯಾಸ.',
    },
    schedule: { en: 'Kendra & online sessions · daily', hi: 'केंद्र व ऑनलाइन सत्र · प्रतिदिन', kn: 'ಕೇಂದ್ರ ಮತ್ತು ಆನ್‌ಲೈನ್ ಸೆಷನ್‌ಗಳು · ಪ್ರತಿದಿನ' },
  },
  {
    id: 'community-seva',
    href: '/activities/community-seva',
    img: '/assets/activities/seva.jpg',
    title: { en: 'Community Seva', hi: 'सामुदायिक सेवा', kn: 'ಸಾಮುದಾಯಿಕ ಸೇವೆ' },
    subtitle: {
      en: 'Blood donation, food & cloth drives, and hospital visits — service as worship.',
      hi: 'रक्तदान, अन्न-वस्त्र वितरण और अस्पताल सेवा — सेवा ही आराधना।',
      kn: 'ರಕ್ತದಾನ, ಆಹಾರ-ವಸ್ತ್ರ ವಿತರಣೆ ಮತ್ತು ಆಸ್ಪತ್ರೆ ಭೇಟಿ — ಸೇವೆಯೇ ಪೂಜೆ.',
    },
    schedule: { en: 'Ongoing · blood camps, food drives, hospital visits', hi: 'सतत · रक्तदान, अन्न वितरण, अस्पताल सेवा', kn: 'ನಿರಂತರ · ರಕ್ತದಾನ, ಆಹಾರ ವಿತರಣೆ, ಆಸ್ಪತ್ರೆ ಭೇಟಿ' },
  },
  {
    id: 'workshops',
    href: '/activities/workshops',
    img: '/assets/programs/workshops-banner.jpg',
    title: { en: 'Workshops & Shivirs', hi: 'कार्यशालाएं एवं शिविर', kn: 'ಕಾರ್ಯಾಗಾರಗಳು ಮತ್ತು ಶಿಬಿರಗಳು' },
    subtitle: {
      en: 'Scientific spirituality, personality development, and family harmony sessions.',
      hi: 'वैज्ञानिक अध्यात्म, व्यक्तित्व विकास और पारिवारिक सद्भाव सत्र।',
      kn: 'ವೈಜ್ಞಾನಿಕ ಆಧ್ಯಾತ್ಮ, ವ್ಯಕ್ತಿತ್ವ ವಿಕಾಸ ಮತ್ತು ಕುಟುಂಬ ಸೌಹಾರ್ದ ಸೆಷನ್‌ಗಳು.',
    },
    comingSoon: { en: 'Coming Soon', hi: 'जल्द आ रहा है', kn: 'ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ' },
  },
];

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({ locale, path: '/activities', title: ACTIVITIES_TITLE, description: ACTIVITIES_DESC });
}

export default async function ActivitiesIndexPage({ params }) {
  const { locale } = await params;
  const L = (obj) => (obj && (obj[locale] || obj.en)) || '';

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { name: locale === 'hi' ? 'होम' : locale === 'kn' ? 'ಮುಖಪುಟ' : 'Home', path: '/' },
          { name: locale === 'hi' ? 'गतिविधियां' : locale === 'kn' ? 'ಚಟುವಟಿಕೆಗಳು' : 'Activities', path: '/activities' },
        ]}
      />
      <HeroSection
        title={locale === 'hi' ? 'हमारी गतिविधियां' : locale === 'kn' ? 'ನಮ್ಮ ಚಟುವಟಿಕೆಗಳು' : 'Our Activities'}
        subtitle={locale === 'hi' ? 'सेवा में अध्यात्म को जीएं' : locale === 'kn' ? 'ಸೇವೆಯಲ್ಲಿ ಆಧ್ಯಾತ್ಮ ಜೀವಿಸಿ' : 'Living Spirituality Through Seva'}
      />

      <section className="idx-intro">
        <div className="section-inner idx-intro__inner">
          <span className="idx-eyebrow">
            {locale === 'hi' ? 'सामुदायिक सेवा' : locale === 'kn' ? 'ಸಾಮುದಾಯಿಕ ಸೇವೆ' : 'Community Service'}
          </span>
          <h2 className="idx-intro__heading">
            {locale === 'hi' ? 'कर्म में अध्यात्म' : locale === 'kn' ? 'ಕರ್ಮದಲ್ಲಿ ಆಧ್ಯಾತ್ಮ' : 'Spirituality in Action'}
          </h2>
          <p className="idx-intro__text">
              {locale === 'hi'
                ? 'गुरुदेव ने सिखाया कि सच्ची आध्यात्मिकता पूजा घर तक सीमित नहीं रह सकती — उसे सेवा के रूप में संसार में प्रकट होना चाहिए। AWGP बेंगलूरु की सामुदायिक गतिविधियां हमारी आध्यात्मिक साधना का विस्तार हैं। साधना, गौ सेवा, ध्यान, योग और सेवा कार्य — हर गतिविधि एक आराधना है।'
                : locale === 'kn'
                ? 'ಗುರುದೇವರು ಕಲಿಸಿದರು — ನಿಜವಾದ ಆಧ್ಯಾತ್ಮ ಪೂಜಾ ಕೋಣೆಯಲ್ಲಿ ಉಳಿಯಲ್ಲ, ಅದು ಸೇವೆಯ ರೂಪದಲ್ಲಿ ಹೊರಹೊಮ್ಮಬೇಕು. AWGP ಬೆಂಗಳೂರಿನ ಸಮುದಾಯ ಚಟುವಟಿಕೆಗಳು ನಮ್ಮ ಆಧ್ಯಾತ್ಮಿಕ ಅಭ್ಯಾಸದ ವಿಸ್ತರಣೆ. ಪ್ರತಿ ಚಟುವಟಿಕೆಯೂ ಒಂದು ಪೂಜೆ.'
                : "Gurudev taught that true spirituality cannot remain confined to a puja room — it must express itself in the world as service. At AWGP Bengaluru, our community activities are an extension of our spiritual practice: Sadhana, Gau Seva, Meditation, Yoga, and seva work — every activity is an act of worship."}
            </p>
          <span className="idx-divider" aria-hidden="true" />
        </div>
      </section>

      <Reveal as="section" className="idx-grid-section">
        <div className="section-inner">
          <div className="idx-section-head">
            <span className="idx-eyebrow">
              {locale === 'hi' ? 'सेवा' : locale === 'kn' ? 'ಸೇವೆ' : 'Seva in Action'}
            </span>
            <h2>
              {locale === 'hi' ? 'हमारी गतिविधियां' : locale === 'kn' ? 'ನಮ್ಮ ಚಟುವಟಿಕೆಗಳು' : 'Our Activities'}
            </h2>
            <p>
              {locale === 'hi'
                ? 'किसी भी गतिविधि पर क्लिक करें — समय, विवरण और शामिल होने का तरीका जानें।'
                : locale === 'kn'
                ? 'ಯಾವುದೇ ಚಟುವಟಿಕೆಯ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ — ಸಮಯ, ವಿವರ ಮತ್ತು ಭಾಗವಹಿಸುವ ವಿಧಾನ ತಿಳಿಯಿರಿ.'
                : 'Click any activity to learn about the schedule, what we do, and how to get involved.'}
            </p>
          </div>
          <div className="index-grid">
            {ACTIVITIES.map((a, i) => (
              <div key={a.id} className="index-grid__item" style={{ '--i': i }}>
                <ContentCard
                  href={a.href}
                  image={a.img}
                  imageAlt={L(a.title)}
                  eyebrow={a.comingSoon ? L(a.comingSoon) : undefined}
                  title={L(a.title)}
                  subtitle={L(a.subtitle)}
                  meta={a.schedule ? `🕐 ${L(a.schedule)}` : undefined}
                  cta={locale === 'hi' ? 'और जानें' : locale === 'kn' ? 'ಇನ್ನಷ್ಟು' : 'Learn More'}
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </>
  );
}
