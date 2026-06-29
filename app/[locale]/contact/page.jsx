import { getTranslations } from 'next-intl/server';
import HeroSection from '../../../components/ui/HeroSection';
import ContactBody from './ContactBody';
import Breadcrumbs from '../../../components/seo/Breadcrumbs';
import FaqSection from '../../../components/seo/FaqSection';
import { buildMetadata } from '../../../lib/seo/metadata';
import { getFaqs } from '../../../lib/seo/faqs';

const CONTACT_TITLE = {
  en: 'Contact & Visit — Gayatri Chetna Kendra, Begur',
  hi: 'संपर्क एवं पधारें — गायत्री चेतना केंद्र, बेगूर',
  kn: 'ಸಂಪರ್ಕ ಮತ್ತು ಭೇಟಿ — ಗಾಯತ್ರಿ ಚೇತನ ಕೇಂದ್ರ, ಬೇಗೂರು',
};

const CONTACT_DESC = {
  en: 'Visit AWGP Bengaluru at 37, Lakshmi Layout Main Road, Chikka Begur, Begur — 560114. Open daily 5:30 AM–9:00 PM. Call or WhatsApp +91 92437 55613, email connect@awgpblr.org, or get directions via Kudlu Gate metro.',
  hi: 'AWGP बेंगलूरु पधारें — 37, लक्ष्मी लेआउट मेन रोड, चिक्का बेगूर, बेगूर — 560114। प्रतिदिन सुबह 5:30 से रात 9:00 बजे तक खुला। कॉल या WhatsApp +91 92437 55613, ईमेल connect@awgpblr.org।',
  kn: 'AWGP ಬೆಂಗಳೂರಿಗೆ ಭೇಟಿ ನೀಡಿ — 37, ಲಕ್ಷ್ಮಿ ಲೇಔಟ್ ಮುಖ್ಯ ರಸ್ತೆ, ಚಿಕ್ಕ ಬೇಗೂರು, ಬೇಗೂರು — 560114. ಪ್ರತಿದಿನ ಬೆಳಿಗ್ಗೆ 5:30 ರಿಂದ ರಾತ್ರಿ 9:00. ಕರೆ ಅಥವಾ WhatsApp +91 92437 55613, ಇಮೇಲ್ connect@awgpblr.org.',
};

const CONTACT_BC = {
  home: { en: 'Home', hi: 'होम', kn: 'ಮುಖಪುಟ' },
  contact: { en: 'Contact', hi: 'संपर्क', kn: 'ಸಂಪರ್ಕ' },
};

const CONTACT_FAQ = {
  eyebrow: { en: 'Getting Here', hi: 'यहाँ पहुँचना', kn: 'ಇಲ್ಲಿಗೆ ಬರುವುದು' },
  heading: { en: 'Visiting & Directions', hi: 'पधारना एवं मार्गदर्शन', kn: 'ಭೇಟಿ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ' },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({ locale, path: '/contact', title: CONTACT_TITLE, description: CONTACT_DESC });
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations();
  const L = (o) => o[locale] || o.en;

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { name: L(CONTACT_BC.home), path: '/' },
          { name: L(CONTACT_BC.contact), path: '/contact' },
        ]}
      />
      <HeroSection
        title={t('contact_title')}
        subtitle={t('contact_subtitle')}
      />
      <ContactBody locale={locale} />
      <FaqSection
        items={getFaqs('visit', locale)}
        eyebrow={L(CONTACT_FAQ.eyebrow)}
        heading={L(CONTACT_FAQ.heading)}
        id="contact-faq"
        background="cream-dark"
      />
    </>
  );
}
