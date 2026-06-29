import HeroSection from '../../../components/ui/HeroSection';
import { Link } from '../../../lib/i18n/navigation';
import data from '../../../data-json-files/sanskars/sanskars.json';
import { SANSKAR_IMG, SANSKAR_STAGE } from './sanskarMeta';
import SanskarsGrid from './SanskarsGrid';
import SanskarsIntro from './SanskarsIntro';
import Breadcrumbs from '../../../components/seo/Breadcrumbs';
import FaqSection from '../../../components/seo/FaqSection';
import { buildMetadata } from '../../../lib/seo/metadata';
import { getFaqs } from '../../../lib/seo/faqs';
import './Sanskars.css';

const SANSKARS_TITLE = {
  en: 'Sanskars — The 16 Vedic Sacraments (Shodash Sanskar)',
  hi: 'संस्कार — सोलह वैदिक संस्कार (षोडश संस्कार)',
  kn: 'ಸಂಸ್ಕಾರಗಳು — ಹದಿನಾರು ವೈದಿಕ ಸಂಸ್ಕಾರಗಳು (ಷೋಡಶ ಸಂಸ್ಕಾರ)',
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/sanskars',
    title: SANSKARS_TITLE,
    description: data.meta?.seoDescription,
  });
}

export default async function SanskarsPage({ params }) {
  const { locale } = await params;
  const L = (o) => (o && (o[locale] ?? o.en)) || '';

  const introParas = L(data.hero.intro).split('\n\n').map((p) => p.trim()).filter(Boolean);

  const items = data.sanskars.map((s) => ({
    id: s.id,
    name: L(s.name),
    stage: L(SANSKAR_STAGE[s.id]),
    image: SANSKAR_IMG[s.id] || null,
    summary: L(s.summary) || L(s.intro).split('. ')[0],
  }));

  const labels = {
    learn: locale === 'hi' ? 'और जानें' : locale === 'kn' ? 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ' : 'Learn more',
    gridEyebrow: locale === 'hi' ? 'षोडश संस्कार' : locale === 'kn' ? 'ಷೋಡಶ ಸಂಸ್ಕಾರಗಳು' : 'The Shodash Sanskars',
    gridTitle:
      locale === 'hi' ? 'जीवन के सोलह पवित्र पड़ाव'
      : locale === 'kn' ? 'ಜೀವನದ ಹದಿನಾರು ಪವಿತ್ರ ಹಂತಗಳು'
      : 'Sixteen Sacred Milestones of Life',
    gridNote:
      locale === 'hi' ? 'किसी भी संस्कार पर क्लिक करें — उसका अर्थ, महत्व और लाभ विस्तार से जानें।'
      : locale === 'kn' ? 'ಯಾವುದೇ ಸಂಸ್ಕಾರದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ — ಅದರ ಅರ್ಥ, ಮಹತ್ವ ಮತ್ತು ಲಾಭವನ್ನು ವಿವರವಾಗಿ ತಿಳಿಯಿರಿ.'
      : 'Tap any sanskar to explore its meaning, significance, and benefits in depth.',
  };

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { name: locale === 'hi' ? 'होम' : locale === 'kn' ? 'ಮುಖಪುಟ' : 'Home', path: '/' },
          { name: locale === 'hi' ? 'संस्कार' : locale === 'kn' ? 'ಸಂಸ್ಕಾರಗಳು' : 'Sanskars', path: '/sanskars' },
        ]}
      />
      <HeroSection
        title={locale === 'hi' ? 'संस्कार' : locale === 'kn' ? 'ಸಂಸ್ಕಾರಗಳು' : 'Sanskars'}
        subtitle={
          locale === 'hi'
            ? 'जीवन के हर पवित्र पड़ाव को अर्थ और संस्कार से सँवारें'
            : locale === 'kn'
            ? 'ಜೀವನದ ಪ್ರತಿ ಪವಿತ್ರ ಹಂತವನ್ನು ಅರ್ಥ ಮತ್ತು ಸಂಸ್ಕಾರದಿಂದ ಅಲಂಕರಿಸಿ'
            : 'Refining every sacred stage of life — from conception to remembrance'
        }
      />

      {/* ── Intro ─────────────────────────────────────────── */}
      <section className="skr-intro">
        <div className="skr-intro__inner">
          <span className="skr-intro__eyebrow">
            {locale === 'hi' ? 'सोलह वैदिक संस्कार' : locale === 'kn' ? 'ಹದಿನಾರು ವೈದಿಕ ಸಂಸ್ಕಾರಗಳು' : 'The Sixteen Vedic Sacraments'}
          </span>
          <h2 className="skr-intro__title">{L(data.hero.title)}</h2>
          <span className="skr-intro__divider" aria-hidden="true" />
          <SanskarsIntro paras={introParas} locale={locale} />
        </div>
      </section>

      {/* ── Card grid ─────────────────────────────────────── */}
      <SanskarsGrid items={items} labels={labels} />

      {/* ── Closing CTA ───────────────────────────────────── */}
      <section className="skr-cta">
        <span className="skr-cta__glow" aria-hidden="true" />
        <div className="skr-cta__inner">
          <h2>
            {locale === 'hi'
              ? 'अपने परिवार में संस्कारों का दीप जलाएँ'
              : locale === 'kn'
              ? 'ನಿಮ್ಮ ಕುಟುಂಬದಲ್ಲಿ ಸಂಸ್ಕಾರಗಳ ದೀಪ ಬೆಳಗಿಸಿ'
              : 'Bring these Sanskars into your family'}
          </h2>
          <p>
            {locale === 'hi'
              ? 'AWGP बेंगलूरु के प्रशिक्षित स्वयंसेवक ये संस्कार आपके घर पर सम्पन्न कराते हैं।'
              : locale === 'kn'
              ? 'AWGP ಬೆಂಗಳೂರಿನ ತರಬೇತಿ ಪಡೆದ ಸ್ವಯಂಸೇವಕರು ಈ ಸಂಸ್ಕಾರಗಳನ್ನು ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಉಚಿತವಾಗಿ ನಡೆಸುತ್ತಾರೆ.'
              : 'Our trained volunteers at AWGP Bengaluru perform these Sanskars at your home.'}
          </p>
          <Link href="/contact" className="btn btn-primary">
            {locale === 'hi' ? 'संपर्क करें' : locale === 'kn' ? 'ಸಂಪರ್ಕಿಸಿ' : 'Get in touch'}
          </Link>
        </div>
      </section>

      <FaqSection
        items={getFaqs('sanskars', locale)}
        eyebrow={locale === 'hi' ? 'संस्कारों के बारे में' : locale === 'kn' ? 'ಸಂಸ್ಕಾರಗಳ ಬಗ್ಗೆ' : 'About Sanskars'}
        heading={locale === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : locale === 'kn' ? 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು' : 'Frequently Asked Questions'}
        id="sanskars-faq"
      />
    </>
  );
}
