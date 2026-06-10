import { notFound } from 'next/navigation';
import { Link } from '../../../../lib/i18n/navigation';
import HeroSection from '../../../../components/ui/HeroSection';
import sanskarsData from '../../../../data/sanskars.json';
import '../../../../components/ui/SanskarPage.css';

export async function generateStaticParams() {
  return sanskarsData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const config = sanskarsData.find((s) => s.slug === slug);
  if (!config) return {};
  return { title: `${config.title[locale] || config.title.en} — AWGP Bengaluru` };
}

export default async function SanskarDetailPage({ params }) {
  const { locale, slug } = await params;
  const config = sanskarsData.find((s) => s.slug === slug);
  if (!config) notFound();

  const L = (obj) => (obj && (obj[locale] || obj.en)) || '';
  const skt = locale === 'hi' ? 'संस्कार' : locale === 'kn' ? 'ಸಂಸ್ಕಾರ' : 'Sanskar';
  const bookLabel = locale === 'hi' ? 'अभी बुक करें' : locale === 'kn' ? 'ಈಗ ಬುಕ್ ಮಾಡಿ' : 'Book Now';
  const backLabel = locale === 'hi' ? '← वापस जाएं' : locale === 'kn' ? '← ಹಿಂದೆ ಹೋಗಿ' : '← Back';
  const sigLabel  = locale === 'hi' ? 'महत्व' : locale === 'kn' ? 'ಮಹತ್ವ' : 'Significance';
  const stepsLabel= locale === 'hi' ? 'संस्कार की विधि' : locale === 'kn' ? 'ಅನುಷ್ಠಾನ ವಿಧಾನ' : 'Ceremony Steps';
  const matLabel  = locale === 'hi' ? '📋 सामग्री सूची' : locale === 'kn' ? '📋 ಸಾಮಗ್ರಿ ಪಟ್ಟಿ' : '📋 Materials Needed';
  const bookCardLabel = locale === 'hi' ? '📅 बुकिंग' : locale === 'kn' ? '📅 ಬುಕಿಂಗ್' : '📅 Book this Sanskar';
  const bookCardDesc  = locale === 'hi'
    ? 'हमारे स्वयंसेवक आपके घर पर यह संस्कार निःशुल्क करते हैं।'
    : locale === 'kn'
    ? 'ನಮ್ಮ ಸ್ವಯಂಸೇವಕರು ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಈ ಸಂಸ್ಕಾರವನ್ನು ಉಚಿತವಾಗಿ ನಡೆಸುತ್ತಾರೆ.'
    : 'Our volunteers perform this Sanskar at your home — free of charge.';

  return (
    <>
      <HeroSection
        icon={config.icon}
        eyebrow={`AWGP Bengaluru · ${skt}`}
        title={L(config.title)}
        subtitle={L(config.subtitle)}
        bgImage={config.heroImage}
        bgImageMobile={config.heroImgMobile}
        bgColor={config.heroColor}
      />

      <section className="section">
        <div className="section-inner">
          <div className="sanskar-layout">

            {/* ── Main ── */}
            <div className="sanskar-main">
              <p className="program-intro-text">{L(config.intro)}</p>

              {config.significance && (
                <div className="sanskar-block">
                  <h3>{sigLabel}</h3>
                  <p>{L(config.significance)}</p>
                </div>
              )}

              {config.steps?.length > 0 && (
                <div className="sanskar-block">
                  <h3>{stepsLabel}</h3>
                  <ol className="sanskar-steps">
                    {config.steps.map((s, i) => <li key={i}>{L(s)}</li>)}
                  </ol>
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div className="sanskar-sidebar">
              {config.materials?.length > 0 && (
                <div className="sanskar-card">
                  <h4>{matLabel}</h4>
                  <ul className="info-list">
                    {config.materials.map((m, i) => <li key={i}>{L(m)}</li>)}
                  </ul>
                </div>
              )}

              <div className="sanskar-card sanskar-booking">
                <h4>{bookCardLabel}</h4>
                <p>{bookCardDesc}</p>
                <Link
                  href="/contact"
                  className="btn btn-primary"
                  style={{ marginTop: '1rem', display: 'inline-flex', width: '100%', justifyContent: 'center' }}
                >
                  {bookLabel}
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

              <Link href="/contact" className="detail-back-link">
                {backLabel}
              </Link>
            </div>
          </div>

          {/* CTA strip */}
          <div className="page-cta-strip" style={{ marginTop: '25px' }}>
            <div>
              <h3>{L(config.ctaTitle)}</h3>
              <p>{L(config.ctaDesc)}</p>
            </div>
            <Link href="/contact" className="btn btn-white">
              {locale === 'hi' ? 'संपर्क करें' : locale === 'kn' ? 'ಸಂಪರ್ಕಿಸಿ' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
