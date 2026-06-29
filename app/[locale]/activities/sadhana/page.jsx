import HeroSection from '../../../../components/ui/HeroSection';
import Reveal from '../../../../components/ui/Reveal';
import ReadMore from '../../../../components/ui/ReadMore';
import { Link } from '../../../../lib/i18n/navigation';
import '../../../../components/ui/DetailPage.css';
import './Sadhana.css';
import sadhanaData from '../../../../data-json-files/activities/sadhana-activities.json';
import { buildMetadata } from '../../../../lib/seo/metadata';

const SADHANA_VISUALS = {
  'akhand-jap': { icon: '🕉', img: '/assets/programs/akhand-jap.jpeg' },
  'gayatri-anusthan': { icon: '🔥', img: '/assets/programs/anusthan.png' },
  'antah-urja-jagran': { icon: '🧘', img: '/assets/programs/antah-urja-jagran.jpg' },
  'chandrayaan-kalp-sadhana': { icon: '🌙', img: '/assets/programs/chandrayan.jpg' },
};

const SADHANA_ACT_TITLE = {
  en: 'Sadhana — Akhand Jap, Anusthan & Gayatri Practice',
  hi: 'साधना — अखंड जप, अनुष्ठान एवं गायत्री साधना',
  kn: 'ಸಾಧನೆ — ಅಖಂಡ ಜಪ, ಅನುಷ್ಠಾನ ಮತ್ತು ಗಾಯತ್ರಿ ಸಾಧನೆ',
};
const SADHANA_ACT_DESC = {
  en: 'Daily and seasonal Gayatri Sadhana at AWGP Bengaluru — Akhand Jap, Anusthan, Antah Urja Jagran and Kalp Sadhana. Join collective spiritual practice rooted in the Gayatri Mantra.',
  hi: 'AWGP बेंगलूरु में दैनिक एवं मौसमी गायत्री साधना — अखंड जप, अनुष्ठान, अंतःऊर्जा जागरण एवं कल्प साधना। गायत्री मंत्र पर आधारित सामूहिक साधना में सम्मिलित हों।',
  kn: 'AWGP ಬೆಂಗಳೂರಿನಲ್ಲಿ ದೈನಂದಿನ ಮತ್ತು ಋತುಮಾನ ಗಾಯತ್ರಿ ಸಾಧನೆ — ಅಖಂಡ ಜಪ, ಅನುಷ್ಠಾನ, ಅಂತಃ ಊರ್ಜಾ ಜಾಗರಣ ಮತ್ತು ಕಲ್ಪ ಸಾಧನೆ.',
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({ locale, path: '/activities/sadhana', title: SADHANA_ACT_TITLE, description: SADHANA_ACT_DESC });
}

export default async function SadhanaPage({ params }) {
  const { locale } = await params;
  const L = (obj) => (obj && (obj[locale] || obj.en)) || '';

  return (
    <>
      <HeroSection
        title={locale === 'hi' ? 'साधना' : locale === 'kn' ? 'ಸಾಧನೆ' : 'Sadhana'}
        subtitle={
          locale === 'hi'
            ? 'AWGP में आध्यात्मिक साधना का केंद्र'
            : locale === 'kn'
              ? 'AWGP ನಲ್ಲಿ ಆಧ್ಯಾತ್ಮಿಕ ಅಭ್ಯಾಸದ ಕೇಂದ್ರ'
              : 'The Heart of Spiritual Practice at AWGP'
        }
      />

      <section className="section">
        <div className="section-inner">
          <div className="detail-layout">

            {/* Main */}
            <div className="detail-main">
              <p className="detail-intro">{L(sadhanaData.meta.intro)}</p>

              <div className="sadhana-grid">
                {sadhanaData.sadhanas.map((form, i) => {
                  const visual = SADHANA_VISUALS[form.id] || {};
                  return (
                    <Reveal key={form.id} as="article" className="sadhana-card" style={{ '--i': i }}>
                      <div className="sadhana-card__media">
                        <img src={visual.img} alt={L(form.title)} className="sadhana-card__img" />
                        {visual.icon && <span className="sadhana-card__icon" aria-hidden="true">{visual.icon}</span>}
                      </div>
                      <div className="sadhana-card__body">
                        <div className="sadhana-card__header">
                          <h3 className="sadhana-card__title">{L(form.title)}</h3>
                          <span className="sadhana-card__schedule">🕐 {L(form.schedule)}</span>
                        </div>
                        <p className="sadhana-card__summary">{L(form.summary)}</p>
                        <ReadMore locale={locale} lines={5} mobileLines={3}>
                          <p className="sadhana-card__desc">{L(form.description)}</p>
                        </ReadMore>
                        {L(form.highlights)?.length > 0 && (
                          <ul className="sadhana-card__highlights">
                            {L(form.highlights).map((h, hi) => <li key={hi}>{h}</li>)}
                          </ul>
                        )}
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="detail-sidebar">
              <div className="detail-card">
                <h4>📅 {locale === 'hi' ? 'साधना समय-सारणी' : locale === 'kn' ? 'ಸಾಧನೆ ವೇಳಾಪಟ್ಟಿ' : 'Sadhana Schedule'}</h4>
                <p>
                  {locale === 'hi'
                    ? '🕉 अखंड जप — हर 2रे शनिवार\n🔥 अनुष्ठान — नवरात्रि (9 दिन)\n🧘 अंतः-ऊर्जा — समय-समय पर\n🌙 चांद्रायण — वार्षिक'
                    : locale === 'kn'
                      ? '🕉 ಅಖಂಡ ಜಪ — ಪ್ರತಿ 2ನೇ ಶನಿ\n🔥 ಅನುಷ್ಠಾನ — ನವರಾತ್ರಿ (9 ದಿನ)\n🧘 ಅಂತಃ-ಊರ್ಜಾ — ಆಗಾಗ್ಗೆ\n🌙 ಚಾಂದ್ರಾಯಣ — ವಾರ್ಷಿಕ'
                      : '🕉 Akhand Jap — every 2nd Saturday\n🔥 Anusthan — Navratri (9 days)\n🧘 Antah-Urja — periodically\n🌙 Chandrayaan Kalp — annually'}
                </p>
              </div>

              <div className="detail-card detail-card--cta">
                <h4>🙏 {locale === 'hi' ? 'साधना में भाग लें' : locale === 'kn' ? 'ಸಾಧನೆಯಲ್ಲಿ ಭಾಗವಹಿಸಿ' : 'Join a Sadhana'}</h4>
                <p>
                  {locale === 'hi'
                    ? 'किसी भी साधना कार्यक्रम में भाग लेने के लिए हमसे संपर्क करें।'
                    : locale === 'kn'
                      ? 'ಯಾವುದೇ ಸಾಧನೆ ಕಾರ್ಯಕ್ರಮದಲ್ಲಿ ಭಾಗವಹಿಸಲು ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.'
                      : 'All Sadhana programs are open to everyone. Contact us to know the next dates or to register.'}
                </p>
                <Link href="/contact" className="btn btn-primary" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                  {locale === 'hi' ? 'संपर्क करें' : locale === 'kn' ? 'ಸಂಪರ್ಕಿಸಿ' : 'Get in Touch'}
                </Link>
                <a href="https://wa.me/919243755613" target="_blank" rel="noopener noreferrer"
                  className="btn btn-outline" style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
