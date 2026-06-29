import Image from 'next/image';
import { Link } from '../../../../lib/i18n/navigation';
import HeroSection from '../../../../components/ui/HeroSection';
import Reveal from '../../../../components/ui/Reveal';
import ReadMore from '../../../../components/ui/ReadMore';
import activitiesData from '../../../../data/activities.json';
import { buildMetadata } from '../../../../lib/seo/metadata';
import '../../../../components/ui/DetailPage.css';
import '../../../../components/ui/CommunitySeva.css';

const SEVA_SLUGS = ['blood-donation', 'food-cloth-distribution', 'hospital-volunteering'];

const SEVA_TITLE = {
  en: 'Community Seva in Bangalore — Blood Donation & Volunteering',
  hi: 'बेंगलूरु में सामुदायिक सेवा — रक्तदान एवं स्वयंसेवा',
  kn: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಸಮುದಾಯ ಸೇವೆ — ರಕ್ತದಾನ ಮತ್ತು ಸ್ವಯಂಸೇವೆ',
};
const SEVA_DESC = {
  en: 'Volunteer with AWGP Bengaluru — blood donation camps, food and clothing distribution, and hospital service. Selfless seva opportunities for individuals and families in Bangalore.',
  hi: 'AWGP बेंगलूरु के साथ स्वयंसेवा करें — रक्तदान शिविर, अन्न एवं वस्त्र वितरण, और अस्पताल सेवा। बेंगलूरु में व्यक्तियों एवं परिवारों हेतु निस्वार्थ सेवा के अवसर।',
  kn: 'AWGP ಬೆಂಗಳೂರಿನೊಂದಿಗೆ ಸ್ವಯಂಸೇವೆ ಮಾಡಿ — ರಕ್ತದಾನ ಶಿಬಿರಗಳು, ಆಹಾರ ಮತ್ತು ಬಟ್ಟೆ ವಿತರಣೆ, ಆಸ್ಪತ್ರೆ ಸೇವೆ. ನಿಸ್ವಾರ್ಥ ಸೇವಾ ಅವಕಾಶಗಳು.',
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({ locale, path: '/activities/community-seva', title: SEVA_TITLE, description: SEVA_DESC });
}

export default async function CommunitySeva({ params }) {
  const { locale } = await params;
  const L = (obj) => (obj && (obj[locale] || obj.en)) || '';

  const sevaForms = SEVA_SLUGS.map((slug) => activitiesData.find((a) => a.slug === slug)).filter(Boolean);

  const scheduleLabel  = locale === 'hi' ? '📅 समय-सारणी' : locale === 'kn' ? '📅 ವೇಳಾಪಟ್ಟಿ' : '📅 Schedule';
  const volunteerLabel = locale === 'hi' ? '🙏 सेवा में भाग लें' : locale === 'kn' ? '🙏 ಸೇವೆಯಲ್ಲಿ ಭಾಗವಹಿಸಿ' : '🙏 Volunteer with Us';
  const volunteerDesc  = locale === 'hi'
    ? 'अगले शिविर या दौरे में भाग लेने के लिए हमसे संपर्क करें।'
    : locale === 'kn'
    ? 'ಮುಂದಿನ ಶಿಬಿರ ಅಥವಾ ಭೇಟಿಯಲ್ಲಿ ಭಾಗವಹಿಸಲು ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.'
    : 'Contact us to join the next camp or monthly visit. All seva opportunities are open to everyone.';
  const getInTouch     = locale === 'hi' ? 'संपर्क करें' : locale === 'kn' ? 'ಸಂಪರ್ಕಿಸಿ' : 'Get in Touch';
  const backLabel      = locale === 'hi' ? '← सभी गतिविधियां' : locale === 'kn' ? '← ಎಲ್ಲಾ ಚಟುವಟಿಕೆಗಳು' : '← All Activities';
  const highlightsLabel = locale === 'hi' ? 'मुख्य विशेषताएं' : locale === 'kn' ? 'ಮುಖ್ಯ ವಿಶೇಷತೆಗಳು' : 'Key Highlights';

  const consolidatedSchedule = locale === 'hi'
    ? '🩸 रक्तदान शिविर — वर्ष में 2-3 बार\n🤲 अनाथालय / वृद्धाश्रम — मासिक दौरे\n👗 वस्त्र अभियान — समय-समय पर\n🏥 अस्पताल दौरे — मासिक'
    : locale === 'kn'
    ? '🩸 ರಕ್ತದಾನ ಶಿಬಿರ — ವರ್ಷಕ್ಕೆ 2-3 ಬಾರಿ\n🤲 ಅನಾಥಾಶ್ರಮ / ವೃದ್ಧಾಶ್ರಮ — ಮಾಸಿಕ ಭೇಟಿ\n👗 ವಸ್ತ್ರ ಅಭಿಯಾನ — ಆಗಾಗ್ಗೆ\n🏥 ಆಸ್ಪತ್ರೆ ಭೇಟಿ — ಮಾಸಿಕ'
    : '🩸 Blood donation camps — 2–3 times a year\n🤲 Orphanage / old age home — monthly visits\n👗 Clothing drives — periodically\n🏥 Hospital visits — monthly';

  return (
    <>
      <HeroSection
        title={locale === 'hi' ? 'समुदाय सेवा' : locale === 'kn' ? 'ಸಮುದಾಯ ಸೇವಾ' : 'Community Seva'}
        subtitle={locale === 'hi' ? 'मानवता की सेवा आराधना के रूप में' : locale === 'kn' ? 'ಪೂಜೆಯ ರೂಪದಲ್ಲಿ ಮಾನವತೆಯ ಸೇವೆ' : 'Serving Humanity as an Act of Worship'}
      />

      <section className="section">
        <div className="section-inner">
          <div className="detail-layout">

            {/* Main */}
            <div className="detail-main">
              <p className="detail-intro">
                {locale === 'hi'
                  ? 'हमारा मानना है कि मानव शरीर केवल व्यक्तिगत सुख के लिए नहीं, बल्कि दूसरों की सेवा के लिए मिला है। "आत्मवत् सर्वभूतेषु" — अर्थात सभी प्राणियों में आत्मा को देखो। बेंगलूरु में हमारी Community Seva गतिविधियां इसी भावना से प्रेरित हैं।'
                  : locale === 'kn'
                  ? 'ನಾವು ನಂಬುತ್ತೇವೆ — ಮಾನವ ದೇಹ ಕೇವಲ ವ್ಯಕ್ತಿಗತ ಸುಖಕ್ಕಲ್ಲ, ಇತರರ ಸೇವೆಗಾಗಿ. "ಆತ್ಮವತ್ ಸರ್ವಭೂತೇಷು" — ಎಲ್ಲ ಜೀವಿಗಳಲ್ಲಿ ಆತ್ಮನನ್ನು ಕಾಣಿ. ಬೆಂಗಳೂರಿನಲ್ಲಿ ನಮ್ಮ ಸಮುದಾಯ ಸೇವಾ ಚಟುವಟಿಕೆಗಳು ಈ ಭಾವನೆಯಿಂದ ಪ್ರೇರಿತ.'
                  : 'We hold that the human body is not given merely for personal pleasure, but to be of service to others. Our Community Seva activities in Bengaluru are driven by the principle of "Atmavat sarvabhuteshu" — see the self in all beings. We firmly believe that every act of giving is an act of worship.'}
              </p>

              <div className="cseva-grid">
                {sevaForms.map((form, idx) => (
                  <Reveal as="article" key={form.id} className="cseva-card" style={{ '--i': idx }}>
                    <div className="cseva-card__img-wrap">
                      <Image
                        src={form.img}
                        alt={L(form.title)}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 860px) 100vw, 60vw"
                        className="cseva-card__img"
                      />
                      <div className="cseva-card__img-overlay" />
                    </div>
                    <div className="cseva-card__body">
                      <div className="cseva-card__header">
                        <h3 className="cseva-card__title">{L(form.title)}</h3>
                        <span className="cseva-card__schedule">🕐 {L(form.schedule)}</span>
                      </div>
                      <ReadMore locale={locale} lines={4} mobileLines={3}>
                        <p className="cseva-card__desc">{L(form.intro)}</p>
                      </ReadMore>
                      {form.points?.length > 0 && (
                        <>
                          <h4 className="cseva-card__highlights-heading">{highlightsLabel}</h4>
                          <ul className="cseva-card__highlights">
                            {form.points.map((p, i) => <li key={i}>{L(p)}</li>)}
                          </ul>
                        </>
                      )}
                      <Link href={`/activities/${form.slug}`} className="cseva-card__link">
                        {locale === 'hi' ? 'और जानें →' : locale === 'kn' ? 'ಇನ್ನಷ್ಟು →' : 'Learn More →'}
                      </Link>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="detail-sidebar">
              <div className="detail-card">
                <h4>{scheduleLabel}</h4>
                <p>{consolidatedSchedule}</p>
              </div>

              <div className="detail-card detail-card--cta">
                <h4>{volunteerLabel}</h4>
                <p>{volunteerDesc}</p>
                <Link
                  href="/contact"
                  className="btn btn-primary"
                  style={{ marginTop: '1rem', display: 'inline-flex', width: '100%', justifyContent: 'center' }}
                >
                  {getInTouch}
                </Link>
                <a
                  href="https://wa.me/919243755613"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline only-desktop"
                  style={{ marginTop: '10px', display: 'inline-flex', width: '100%', justifyContent: 'center' }}
                >
                  💬 WhatsApp
                </a>
                <a
                  href="tel:+919243755613"
                  className="btn btn-outline only-mobile"
                  style={{ marginTop: '10px', display: 'inline-flex', width: '100%', justifyContent: 'center' }}
                >
                  📞 {locale === 'hi' ? 'कॉल करें' : locale === 'kn' ? 'ಕರೆ ಮಾಡಿ' : 'Call Us'}
                </a>
              </div>

              <Link href="/activities" className="detail-back-link">
                {backLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
