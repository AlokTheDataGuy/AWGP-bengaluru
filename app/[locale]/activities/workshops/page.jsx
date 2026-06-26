import HeroSection from '../../../../components/ui/HeroSection';
import Reveal from '../../../../components/ui/Reveal';
import { Link } from '../../../../lib/i18n/navigation';
import './Workshops.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = {
    en: 'Workshops & Shivirs — AWGP Bengaluru',
    hi: 'कार्यशालाएं एवं शिविर — AWGP बेंगलूरु',
    kn: 'ಕಾರ್ಯಾಗಾರಗಳು ಮತ್ತು ಶಿಬಿರಗಳು — AWGP ಬೆಂಗಳೂರು',
  };
  return { title: titles[locale] || titles.en };
}

export default async function WorkshopsPage({ params }) {
  const { locale } = await params;

  return (
    <>
      <HeroSection
        eyebrow="AWGP Bengaluru · Activities"
        title={locale === 'hi' ? 'कार्यशालाएं एवं शिविर' : locale === 'kn' ? 'ಕಾರ್ಯಾಗಾರಗಳು ಮತ್ತು ಶಿಬಿರಗಳು' : 'Workshops & Shivirs'}
        subtitle={
          locale === 'hi'
            ? 'मन, शरीर और आत्मा के लिए परिवर्तनकारी शिक्षा'
            : locale === 'kn'
              ? 'ಮನಸ್ಸು, ದೇಹ ಮತ್ತು ಆತ್ಮಕ್ಕಾಗಿ ಪರಿವರ್ತನಕಾರಿ ಕಲಿಕೆ'
              : 'Transformative Learning for Mind, Body & Spirit'
        }
        bgImage="/assets/programs/workshops-banner.jpg"
        bgColor="linear-gradient(135deg, #7B1C1C 0%, #3D1F0A 100%)"
      />

      <section className="section workshops-soon">
        <div className="section-inner">
          <Reveal as="div" className="workshops-soon__card">
            <span className="workshops-soon__rays" aria-hidden="true" />
            <span className="workshops-soon__badge">
              {locale === 'hi' ? 'जल्द आ रहा है' : locale === 'kn' ? 'ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ' : 'Coming Soon'}
            </span>
            <h2 className="workshops-soon__title">
              {locale === 'hi'
                ? 'विवरण जल्द जोड़े जाएंगे'
                : locale === 'kn'
                  ? 'ವಿವರಗಳನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಸೇರಿಸಲಾಗುವುದು'
                  : "We're putting the details together"}
            </h2>
            <p className="workshops-soon__text">
              {locale === 'hi'
                ? 'हमारी कार्यशालाएं और शिविर गुरुदेव की विचार क्रांति की दृष्टि पर आधारित हैं — वैज्ञानिक अध्यात्म, व्यक्तित्व विकास और पारिवारिक सद्भाव पर केंद्रित। आगामी कार्यक्रमों की जानकारी के लिए हमसे संपर्क करें या WhatsApp समूह से जुड़ें।'
                : locale === 'kn'
                  ? 'ನಮ್ಮ ಕಾರ್ಯಾಗಾರಗಳು ಮತ್ತು ಶಿಬಿರಗಳು ಗುರುದೇವರ ವಿಚಾರ ಕ್ರಾಂತಿ ದೃಷ್ಟಿಕೋನದ ಮೇಲೆ ಆಧಾರಿತ — ವೈಜ್ಞಾನಿಕ ಆಧ್ಯಾತ್ಮ, ವ್ಯಕ್ತಿತ್ವ ವಿಕಾಸ ಮತ್ತು ಕುಟುಂಬ ಸೌಹಾರ್ದದ ಮೇಲೆ ಕೇಂದ್ರೀಕೃತ. ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳ ಬಗ್ಗೆ ತಿಳಿಯಲು ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ ಅಥವಾ WhatsApp ಗ್ರೂಪ್ ಸೇರಿ.'
                  : "Our workshops and shivirs are rooted in Gurudev's vision of Vichar Kranti — scientific spirituality, personality development, and family harmony. We're putting the full schedule together — reach out or join our WhatsApp group to hear about upcoming sessions first."}
            </p>
            <div className="workshops-soon__actions">
              <Link href="/contact" className="btn btn-primary">
                {locale === 'hi' ? 'संपर्क करें' : locale === 'kn' ? 'ಸಂಪರ್ಕಿಸಿ' : 'Get in Touch'}
              </Link>
              <a href="https://wa.me/919243755613" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">
                💬 WhatsApp
              </a>
            </div>
          </Reveal>

          <div style={{ textAlign: 'center' }}>
            <Link href="/activities" className="workshops-soon__back">
              {locale === 'hi' ? '← सभी गतिविधियां' : locale === 'kn' ? '← ಎಲ್ಲಾ ಚಟುವಟಿಕೆಗಳು' : '← All Activities'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
