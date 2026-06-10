import Image from 'next/image';
import { Link } from '../../../lib/i18n/navigation';
import HeroSection from '../../../components/ui/HeroSection';
import activitiesData from '../../../data/activities.json';
import '../../../components/ui/IndexPage.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { en: 'Activities — AWGP Bengaluru', hi: 'गतिविधियां — AWGP बेंगलूरु', kn: 'ಚಟುವಟಿಕೆಗಳು — AWGP ಬೆಂಗಳೂರು' };
  return { title: titles[locale] || titles.en };
}

export default async function ActivitiesIndexPage({ params }) {
  const { locale } = await params;
  const L = (obj) => (obj && (obj[locale] || obj.en)) || '';

  return (
    <>
      <HeroSection
        eyebrow="AWGP Bengaluru"
        title={locale === 'hi' ? 'सामुदायिक गतिविधियां' : locale === 'kn' ? 'ಸಾಮುದಾಯಿಕ ಚಟುವಟಿಕೆಗಳು' : 'Community Activities'}
        subtitle={locale === 'hi' ? 'सेवा में अध्यात्म को जीएं' : locale === 'kn' ? 'ಸೇವೆಯಲ್ಲಿ ಆಧ್ಯಾತ್ಮ ಜೀವಿಸಿ' : 'Living Spirituality Through Seva'}
        bgImage="/assets/activities/activities_banner.jpg"
        bgImageMobile="/assets/activities/activities_banner_mob.jpg"
        mantra="॥ आत्मवत् सर्वभूतेषु यः पश्यति स पण्डितः ॥"
      />

      <section className="section idx-intro-section">
        <div className="section-inner">
          <div className="idx-intro">
            <h2 className="idx-intro__heading">
              {locale === 'hi' ? 'कर्म में अध्यात्म' : locale === 'kn' ? 'ಕರ್ಮದಲ್ಲಿ ಆಧ್ಯಾತ್ಮ' : 'Spirituality in Action'}
            </h2>
            <p className="idx-intro__text">
              {locale === 'hi'
                ? 'गुरुदेव ने सिखाया कि सच्ची आध्यात्मिकता पूजा घर तक सीमित नहीं रह सकती — उसे सेवा के रूप में संसार में प्रकट होना चाहिए। AWGP बेंगलूरु की सामुदायिक गतिविधियां हमारी आध्यात्मिक साधना का विस्तार हैं। रक्तदान, गौ सेवा, वृक्षारोपण, यज्ञ आयोजन — हर सेवा कार्य एक आराधना है।'
                : locale === 'kn'
                ? 'ಗುರುದೇವರು ಕಲಿಸಿದರು — ನಿಜವಾದ ಆಧ್ಯಾತ್ಮ ಪೂಜಾ ಕೋಣೆಯಲ್ಲಿ ಉಳಿಯಲ್ಲ, ಅದು ಸೇವೆಯ ರೂಪದಲ್ಲಿ ಹೊರಹೊಮ್ಮಬೇಕು. AWGP ಬೆಂಗಳೂರಿನ ಸಮುದಾಯ ಚಟುವಟಿಕೆಗಳು ನಮ್ಮ ಆಧ್ಯಾತ್ಮಿಕ ಅಭ್ಯಾಸದ ವಿಸ್ತರಣೆ. ಪ್ರತಿ ಸೇವಾ ಕಾರ್ಯ ಒಂದು ಪೂಜೆ.'
                : "Gurudev taught that true spirituality cannot remain confined to a puja room — it must express itself in the world as service. At AWGP Bengaluru, our community activities are an extension of our spiritual practice: blood donation, gau seva, tree plantation, yagya events, and more. Every act of seva is an act of worship."}
            </p>
            <div className="ornament"><span>✦</span></div>
          </div>
        </div>
      </section>

      <section className="section idx-grid-section">
        <div className="section-inner">
          <div className="idx-section-head">
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
            {activitiesData.map((a) => (
              <Link href={`/activities/${a.slug}`} key={a.id} className="index-card">
                <div className="index-card__img-wrap">
                  <Image
                    src={a.img}
                    alt={L(a.title)}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                    className="index-card__img"
                  />
                  <div className="index-card__overlay" />
                </div>
                <div className="index-card__body">
                  <h3 className="index-card__title">{L(a.title)}</h3>
                  <p className="index-card__subtitle">{L(a.subtitle)}</p>
                  <p className="index-card__schedule">🕐 {L(a.schedule)}</p>
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
