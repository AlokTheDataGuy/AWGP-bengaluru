import Image from 'next/image';
import { Link } from '../../../lib/i18n/navigation';
import HeroSection from '../../../components/ui/HeroSection';
import sanskarsData from '../../../data/sanskars.json';
import '../../../components/ui/IndexPage.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { en: 'Sanskars — AWGP Bengaluru', hi: 'संस्कार — AWGP बेंगलूरु', kn: 'ಸಂಸ್ಕಾರಗಳು — AWGP ಬೆಂಗಳೂರು' };
  return { title: titles[locale] || titles.en };
}

export default async function SanskarsIndexPage({ params }) {
  const { locale } = await params;
  const L = (obj) => (obj && (obj[locale] || obj.en)) || '';

  return (
    <>
      <HeroSection
        eyebrow="AWGP Bengaluru"
        title={locale === 'hi' ? 'संस्कार' : locale === 'kn' ? 'ಸಂಸ್ಕಾರಗಳು' : 'Sanskars'}
        subtitle={locale === 'hi' ? 'जीवन के पवित्र पड़ावों को अर्थपूर्ण बनाएं' : locale === 'kn' ? 'ಜೀವನದ ಪ್ರತಿ ಹಂತವನ್ನು ಪವಿತ್ರ ಮತ್ತು ಅರ್ಥಪೂರ್ಣಗೊಳಿಸಿ' : "Mark Life's Sacred Milestones with Meaning"}
        bgImage="/assets/sanskars/sanskar-banner.jpg"
        bgImageMobile="/assets/sanskars/sanskar-banner-mob.jpg"
        mantra="॥ संस्कारात् जायते मानवः ॥"
      />

      <section className="section idx-intro-section">
        <div className="section-inner">
          <div className="idx-intro">
            <h2 className="idx-intro__heading">
              {locale === 'hi' ? 'षोडश संस्कार क्या हैं?' : locale === 'kn' ? 'ಷೋಡಶ ಸಂಸ್ಕಾರ ಎಂದರೇನು?' : 'What are the Shodash Sanskars?'}
            </h2>
            <p className="idx-intro__text">
              {locale === 'hi'
                ? '"षोडश" का अर्थ है सोलह और "संस्कार" का अर्थ है परिष्कार। हिंदू परंपरा में जन्म से मृत्यु तक 16 संस्कार जीवन के हर महत्वपूर्ण पड़ाव को पवित्र करते हैं। गुरुदेव पंडित श्रीराम शर्मा आचार्य ने इन प्राचीन अनुष्ठानों को सरल और सर्वसुलभ बनाया, ताकि हर परिवार इनका लाभ उठा सके — जाति, क्षेत्र या पृष्ठभूमि की परवाह किए बिना। AWGP बेंगलूरु में हमारे प्रशिक्षित स्वयंसेवक ये संस्कार आपके घर पर निःशुल्क संपन्न करते हैं।'
                : locale === 'kn'
                ? '"ಷೋಡಶ" ಎಂದರೆ ಹದಿನಾರು ಮತ್ತು "ಸಂಸ್ಕಾರ" ಎಂದರೆ ಪರಿಷ್ಕರಣ. ಹಿಂದೂ ಸಂಪ್ರದಾಯದಲ್ಲಿ ಜನನದಿಂದ ಮರಣದವರೆಗೆ 16 ಸಂಸ್ಕಾರಗಳು ಜೀವನದ ಪ್ರತಿ ಮಹತ್ವದ ಹಂತವನ್ನು ಪವಿತ್ರಗೊಳಿಸುತ್ತವೆ. ಗುರುದೇವರು ಈ ಆಚರಣೆಗಳನ್ನು ಸರಳ ಮತ್ತು ಎಲ್ಲರಿಗೂ ಸುಲಭಗೊಳಿಸಿದರು. AWGP ಬೆಂಗಳೂರಿನ ಸ್ವಯಂಸೇವಕರು ಈ ಸಂಸ್ಕಾರಗಳನ್ನು ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಉಚಿತವಾಗಿ ನಡೆಸುತ್ತಾರೆ.'
                : '"Shodash" means sixteen and "Sanskar" means refinement. The Hindu tradition recognises 16 life-cycle rites of passage — each marking a significant transition from birth to death. Gurudev Pandit Shriram Sharma Acharya revived these ancient ceremonies and made them accessible to every household, regardless of caste, region, or background. At AWGP Bengaluru, our trained volunteers perform these Sanskars at your home, free of charge.'}
            </p>
            <div className="ornament"><span>✦</span></div>
          </div>
        </div>
      </section>

      <section className="section idx-grid-section">
        <div className="section-inner">
          <div className="idx-section-head">
            <h2>
              {locale === 'hi' ? 'हमारे द्वारा किए जाने वाले संस्कार' : locale === 'kn' ? 'ನಾವು ನಡೆಸುವ ಸಂಸ್ಕಾರಗಳು' : 'Sanskars We Perform'}
            </h2>
            <p>
              {locale === 'hi'
                ? 'किसी भी संस्कार पर क्लिक करें — अर्थ, विधि और बुकिंग की जानकारी पाएं।'
                : locale === 'kn'
                ? 'ಯಾವುದೇ ಸಂಸ್ಕಾರದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ — ಅರ್ಥ, ವಿಧಿ ಮತ್ತು ಬುಕಿಂಗ್ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.'
                : 'Click any card to learn the meaning, procedure, and how to schedule with our volunteers.'}
            </p>
          </div>
          <div className="index-grid">
            {sanskarsData.map((s) => (
              <Link href={`/sanskars/${s.slug}`} key={s.slug} className="index-card">
                <div className="index-card__img-wrap">
                  <Image
                    src={s.heroImage}
                    alt={L(s.title)}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                    className="index-card__img"
                  />
                  <div className="index-card__overlay" />
                </div>
                <div className="index-card__body">
                  <h3 className="index-card__title">{L(s.title)}</h3>
                  <p className="index-card__schedule">{s.icon} {L(s.subtitle)}</p>
                  <span className="index-card__cta">
                    {locale === 'hi' ? 'और जानें →' : locale === 'kn' ? 'ಇನ್ನಷ್ಟು →' : 'Learn More →'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
