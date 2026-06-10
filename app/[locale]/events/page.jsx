import Image from 'next/image';
import { Link } from '../../../lib/i18n/navigation';
import HeroSection from '../../../components/ui/HeroSection';
import eventTypesData from '../../../data/event-types.json';
import '../../../components/ui/IndexPage.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { en: 'Events — AWGP Bengaluru', hi: 'कार्यक्रम — AWGP बेंगलूरु', kn: 'ಕಾರ್ಯಕ್ರಮಗಳು — AWGP ಬೆಂಗಳೂರು' };
  return { title: titles[locale] || titles.en };
}

export default async function EventsIndexPage({ params }) {
  const { locale } = await params;
  const L = (obj) => (obj && (obj[locale] || obj.en)) || '';

  return (
    <>
      <HeroSection
        eyebrow="AWGP Bengaluru"
        title={locale === 'hi' ? 'कार्यक्रम' : locale === 'kn' ? 'ಕಾರ್ಯಕ್ರಮಗಳು' : 'Events'}
        subtitle={locale === 'hi' ? 'उत्सव, यज्ञ और परिवर्तनकारी शिविर' : locale === 'kn' ? 'ಉತ್ಸವ, ಯಜ್ಞ ಮತ್ತು ಪರಿವರ್ತನಕಾರಿ ಶಿಬಿರಗಳು' : 'Festivals, Yagyas & Transformative Shivirs'}
        bgImage="/assets/programs/programs_banner.jpg"
        bgImageMobile="/assets/programs/programs_banner_mob.jpg"
        mantra="॥ ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥"
      />

      <section className="section idx-intro-section">
        <div className="section-inner">
          <div className="idx-intro">
            <h2 className="idx-intro__heading">
              {locale === 'hi' ? 'हर अवसर एक उत्सव है' : locale === 'kn' ? 'ಪ್ರತಿ ಸಂದರ್ಭ ಒಂದು ಉತ್ಸವ' : 'Every Occasion a Celebration'}
            </h2>
            <p className="idx-intro__text">
              {locale === 'hi'
                ? 'AWGP बेंगलूरु के कार्यक्रम — उत्सव, यज्ञ, कार्यशालाएं, अनुष्ठान और अखंड जप — सामूहिक आध्यात्मिक अनुभव के अवसर हैं। सभी कार्यक्रम निःशुल्क और सभी के लिए खुले हैं।'
                : locale === 'kn'
                ? 'AWGP ಬೆಂಗಳೂರಿನ ಕಾರ್ಯಕ್ರಮಗಳು — ಹಬ್ಬಗಳು, ಯಜ್ಞ, ಕಾರ್ಯಾಗಾರ, ಅನುಷ್ಠಾನ ಮತ್ತು ಅಖಂಡ ಜಪ — ಸಾಮೂಹಿಕ ಆಧ್ಯಾತ್ಮಿಕ ಅನುಭವದ ಅವಕಾಶಗಳು. ಎಲ್ಲ ಕಾರ್ಯಕ್ರಮಗಳು ಉಚಿತ ಮತ್ತು ಎಲ್ಲರಿಗೂ ಮುಕ್ತ.'
                : "AWGP Bengaluru's events — festivals, Yagyas, workshops, Anusthan, and Akhand Jap — are occasions for collective spiritual experience. All events are free and open to everyone."}
            </p>
            <div className="ornament"><span>✦</span></div>
          </div>
        </div>
      </section>

      <section className="section idx-grid-section">
        <div className="section-inner">
          <div className="idx-section-head">
            <h2>
              {locale === 'hi' ? 'हमारे कार्यक्रम' : locale === 'kn' ? 'ನಮ್ಮ ಕಾರ್ಯಕ್ರಮಗಳು' : 'Explore Our Events'}
            </h2>
            <p>
              {locale === 'hi'
                ? 'किसी भी कार्यक्रम पर क्लिक करें — समय, विवरण और जुड़ने का तरीका जानें।'
                : locale === 'kn'
                ? 'ಯಾವುದೇ ಕಾರ್ಯಕ್ರಮದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ — ಸಮಯ, ವಿವರ ಮತ್ತು ಸೇರುವ ವಿಧಾನ ತಿಳಿಯಿರಿ.'
                : 'Click any event to learn about schedules, what to expect, and how to join.'}
            </p>
          </div>
          <div className="index-grid">
            {eventTypesData.map((e) => (
              <Link href={`/events/${e.slug}`} key={e.id} className="index-card">
                <div className="index-card__img-wrap">
                  <Image
                    src={e.img}
                    alt={L(e.title)}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                    className="index-card__img"
                  />
                  <div className="index-card__overlay" />
                </div>
                <div className="index-card__body">
                  <h3 className="index-card__title">{L(e.title)}</h3>
                  <p className="index-card__subtitle">{L(e.subtitle)}</p>
                  <p className="index-card__schedule">🕐 {L(e.schedule)}</p>
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
