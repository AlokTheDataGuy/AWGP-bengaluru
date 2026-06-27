import { notFound } from 'next/navigation';
import { Link } from '../../../../lib/i18n/navigation';
import HeroSection from '../../../../components/ui/HeroSection';
import activitiesData from '../../../../data/activities.json';
import '../../../../components/ui/DetailPage.css';

export async function generateStaticParams() {
  // Skip entries that link to a custom standalone page (href override, e.g. Community Seva)
  return activitiesData.filter((a) => !a.href).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const activity = activitiesData.find((a) => a.slug === slug);
  if (!activity) return {};
  return { title: `${activity.title[locale] || activity.title.en} — AWGP Bengaluru` };
}

export default async function ActivityDetailPage({ params }) {
  const { locale, slug } = await params;
  const activity = activitiesData.find((a) => a.slug === slug);
  if (!activity || activity.href) notFound();

  const L = (obj) => (obj && (obj[locale] || obj.en)) || '';
  const activitiesLabel = locale === 'hi' ? 'गतिविधियां' : locale === 'kn' ? 'ಚಟುವಟಿಕೆಗಳು' : 'Activities';
  const highlightsLabel = locale === 'hi' ? 'मुख्य विशेषताएं' : locale === 'kn' ? 'ಮುಖ್ಯ ವಿಶೇಷತೆಗಳು' : 'Key Highlights';
  const scheduleLabel   = locale === 'hi' ? '📅 समय-सारणी' : locale === 'kn' ? '📅 ವೇಳಾಪಟ್ಟಿ' : '📅 Schedule';
  const participateLabel= locale === 'hi' ? '🙏 भाग लें' : locale === 'kn' ? '🙏 ಭಾಗವಹಿಸಿ' : '🙏 Participate';
  const participateDesc = locale === 'hi' ? 'अधिक जानकारी या पंजीकरण के लिए हमसे संपर्क करें।' : locale === 'kn' ? 'ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಅಥವಾ ನೋಂದಣಿಗಾಗಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.' : 'Contact us for more information or to register.';
  const getInTouch      = locale === 'hi' ? 'संपर्क करें' : locale === 'kn' ? 'ಸಂಪರ್ಕಿಸಿ' : 'Get in Touch';
  const backLabel       = locale === 'hi' ? '← वापस जाएं' : locale === 'kn' ? '← ಹಿಂದೆ ಹೋಗಿ' : '← Back';
  const yagyaTypesLabel = locale === 'hi' ? 'यज्ञ के प्रकार' : locale === 'kn' ? 'ಯಜ್ಞ ಪ್ರಕಾರಗಳು' : 'Types of Yagya We Organise';
  const joinLabel       = locale === 'hi' ? 'हमारे परिवार से जुड़ें' : locale === 'kn' ? 'ನಮ್ಮ ಪರಿವಾರ ಸೇರಿ' : 'Join Our Pariwar';
  const joinDesc        = locale === 'hi' ? 'साधना और सेवा की यात्रा में हमारे साथ आएं।' : locale === 'kn' ? 'ಸಾಧನೆ ಮತ್ತು ಸೇವೆಯ ಪ್ರಯಾಣದಲ್ಲಿ ನಮ್ಮೊಂದಿಗೆ ಬನ್ನಿ.' : 'Come join us on the journey of Sadhana and Seva.';
  const viewAllLabel    = locale === 'hi' ? 'सभी देखें' : locale === 'kn' ? 'ಎಲ್ಲಾ ನೋಡಿ' : 'View All';

  return (
    <>
      <HeroSection
        title={L(activity.title)}
        subtitle={L(activity.subtitle)}
      />

      <section className="section">
        <div className="section-inner">
          <div className="detail-layout">

            {/* Main */}
            <div className="detail-main">
              <p className="detail-intro">{L(activity.intro)}</p>

              {activity.points?.length > 0 && (
                <div className="detail-block">
                  <h3 className="detail-sub-heading">{highlightsLabel}</h3>
                  <ul className="info-list">
                    {activity.points.map((p, i) => <li key={i}>{L(p)}</li>)}
                  </ul>
                </div>
              )}

              {activity.yagyaTypes?.length > 0 && (
                <div className="detail-block">
                  <h3 className="detail-sub-heading">{yagyaTypesLabel}</h3>
                  <div className="yagya-type-grid">
                    {activity.yagyaTypes.map((y, i) => (
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
            <div className="detail-sidebar">
              {activity.schedule && (
                <div className="detail-card">
                  <h4>{scheduleLabel}</h4>
                  <p>{L(activity.schedule)}</p>
                </div>
              )}

              <div className="detail-card detail-card--cta">
                <h4>{participateLabel}</h4>
                <p>{participateDesc}</p>
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
                  className="btn btn-outline"
                  style={{ marginTop: '10px', display: 'inline-flex', width: '100%', justifyContent: 'center' }}
                >
                  💬 WhatsApp
                </a>
              </div>

              <Link href="/activities" className="detail-back-link">
                {backLabel}
              </Link>
            </div>
          </div>

          {/* CTA strip */}
          <div className="page-cta-strip" style={{ marginTop: '30px' }}>
            <div>
              <h3>{joinLabel}</h3>
              <p>{joinDesc}</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-white">{getInTouch}</Link>
              <Link
                href="/activities"
                className="btn btn-outline"
                style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
              >
                {viewAllLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
