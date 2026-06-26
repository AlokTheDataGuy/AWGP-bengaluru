import { notFound } from 'next/navigation';
import { Link } from '../../../../lib/i18n/navigation';
import HeroSection from '../../../../components/ui/HeroSection';
import programTypesData from '../../../../data/program-types.json';
import '../../../../components/ui/ProgramPage.css';
import '../../../../components/ui/DetailPage.css';

export async function generateStaticParams() {
  return programTypesData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const program = programTypesData.find((p) => p.slug === slug);
  if (!program) return {};
  return { title: `${program.title[locale] || program.title.en} — AWGP Bengaluru` };
}

export default async function ProgramDetailPage({ params }) {
  const { locale, slug } = await params;
  const program = programTypesData.find((p) => p.slug === slug);
  if (!program) notFound();

  const L = (obj) => (obj && (obj[locale] || obj.en)) || '';
  const scheduleLabel  = locale === 'hi' ? '📅 समय-सारणी' : locale === 'kn' ? '📅 ವೇಳಾಪಟ್ಟಿ' : '📅 Schedule';
  const contactDesc    = locale === 'hi' ? 'अधिक जानकारी या पंजीकरण के लिए संपर्क करें।' : locale === 'kn' ? 'ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಅಥವಾ ನೋಂದಣಿಗಾಗಿ ಸಂಪರ್ಕಿಸಿ.' : 'Contact us for more information or to register.';
  const getInTouch     = locale === 'hi' ? 'संपर्क करें' : locale === 'kn' ? 'ಸಂಪರ್ಕಿಸಿ' : 'Get in Touch';
  const highlightsLabel= locale === 'hi' ? 'मुख्य विशेषताएं' : locale === 'kn' ? 'ಮುಖ್ಯ ವಿಶೇಷತೆಗಳು' : 'Key Highlights';
  const festivalsLabel = locale === 'hi' ? 'त्योहार जो हम मनाते हैं' : locale === 'kn' ? 'ನಾವು ಆಚರಿಸುವ ಹಬ್ಬಗಳು' : 'Festivals We Celebrate';
  const yagyaTypesLabel= locale === 'hi' ? 'यज्ञ के प्रकार' : locale === 'kn' ? 'ಯಜ್ಞ ಪ್ರಕಾರಗಳು' : 'Types of Yagya We Organise';
  const ctaJoinLabel   = locale === 'hi' ? 'हमारे परिवार से जुड़ें' : locale === 'kn' ? 'ನಮ್ಮ ಪರಿವಾರ ಸೇರಿ' : 'Join Our Pariwar';
  const ctaJoinDesc    = locale === 'hi' ? 'साधना और सेवा की यात्रा में हमारे साथ आएं।' : locale === 'kn' ? 'ಸಾಧನೆ ಮತ್ತು ಸೇವೆಯ ಪ್ರಯಾಣದಲ್ಲಿ ನಮ್ಮೊಂದಿಗೆ ಬನ್ನಿ.' : 'Come join us on the journey of Sadhana and Seva.';

  return (
    <>
      <HeroSection
        eyebrow={`AWGP Bengaluru · ${locale === 'hi' ? 'कार्यक्रम' : locale === 'kn' ? 'ಕಾರ್ಯಕ್ರಮ' : 'Programs'}`}
        title={L(program.title)}
        subtitle={L(program.subtitle)}
        bgImage={program.img}
        bgColor={program.heroColor}
        icon={program.icon}
      />

      <section className="section">
        <div className="section-inner">
          <div className="program-intro-grid">

            {/* Main */}
            <div>
              <p className="program-intro-text">{L(program.intro)}</p>

              {program.points?.length > 0 && (
                <>
                  <h3 className="program-sub-heading" style={{ marginTop: '1.8rem' }}>
                    {highlightsLabel}
                  </h3>
                  <ul className="info-list" style={{ marginTop: '1rem' }}>
                    {program.points.map((p, i) => <li key={i}>{L(p)}</li>)}
                  </ul>
                </>
              )}

              {program.festivals?.length > 0 && (
                <div className="detail-block">
                  <h3 className="detail-sub-heading">{festivalsLabel}</h3>
                  <div className="festival-chips">
                    {program.festivals.map((f, i) => (
                      <div key={i} className="festival-chip">
                        <span>{L(f.name)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {program.yagyaTypes?.length > 0 && (
                <div className="detail-block">
                  <h3 className="detail-sub-heading">{yagyaTypesLabel}</h3>
                  <div className="yagya-type-grid">
                    {program.yagyaTypes.map((y, i) => (
                      <div key={i} className="yagya-type-card">
                        <strong>{L(y.name)}</strong>
                        <p>{L(y.desc)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="program-side">
              {program.schedule && (
                <div className="program-schedule-card">
                  <h4>{scheduleLabel}</h4>
                  <p>{L(program.schedule)}</p>
                </div>
              )}
              <div className="program-contact-card">
                <p>{contactDesc}</p>
                <Link
                  href="/contact"
                  className="btn btn-primary"
                  style={{ marginTop: '1rem', display: 'inline-flex' }}
                >
                  {getInTouch}
                </Link>
                <a
                  href="https://wa.me/919243755613"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ marginTop: '10px', display: 'inline-flex', width: '100%', justifyContent: 'center' }}
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* CTA strip */}
          <div className="page-cta-strip">
            <div>
              <h3>{ctaJoinLabel}</h3>
              <p>{ctaJoinDesc}</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-white">{getInTouch}</Link>
              <Link
                href="/programs"
                className="btn btn-outline"
                style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
              >
                {locale === 'hi' ? 'सभी कार्यक्रम' : locale === 'kn' ? 'ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳು' : 'All Programs'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
