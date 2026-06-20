import HeroSection from '../../../../components/ui/HeroSection';
import { Link } from '../../../../lib/i18n/navigation';
import '../../../../components/ui/DetailPage.css';
import './Sadhana.css';

const sadhanaForms = [
  {
    id: 'akhand-jap',
    img: '/assets/programs/akhand-jap.jpeg',
    title: { en: 'Akhand Jap', hi: 'अखंड जप', kn: 'ಅಖಂಡ ಜಪ' },
    schedule: { en: 'Every 2nd Saturday · 6:00 AM – 12:00 PM', hi: 'प्रत्येक दूसरे शनिवार · सुबह 6:00 – दोपहर 12:00', kn: 'ಪ್ರತಿ 2ನೇ ಶನಿವಾರ · ಬೆಳಿಗ್ಗೆ 6:00 – ಮಧ್ಯಾಹ್ನ 12:00' },
    desc: {
      en: 'An unbroken 6-hour Gayatri Mantra chanting session held every second Saturday. Participants rotate in relay so the sacred sound never ceases — creating a powerful field of divine vibration that purifies the space and uplifts all present.',
      hi: 'प्रत्येक दूसरे शनिवार को 6 घंटे का अखंड गायत्री मंत्र जप। प्रतिभागी बारी-बारी से जप करते हैं ताकि पवित्र ध्वनि कभी न रुके।',
      kn: 'ಪ್ರತಿ 2ನೇ ಶನಿವಾರ 6 ಗಂಟೆ ಅಖಂಡ ಗಾಯತ್ರಿ ಮಂತ್ರ ಜಪ. ಭಾಗವಹಿಸುವವರು ಸರದಿ ಬದಲಾಯಿಸುತ್ತಾ ಪವಿತ್ರ ಧ್ವನಿ ನಿಲ್ಲದಂತೆ ಮಾಡುತ್ತಾರೆ.',
    },
    highlights: [
      { en: 'Continuous 6-hour session — no prior experience needed', hi: '6 घंटे का अखंड सत्र — पूर्व अनुभव आवश्यक नहीं', kn: '6 ಗಂಟೆ ನಿರಂತರ ಸತ್ರ — ಮೊದಲ ಅನುಭವ ಬೇಡ' },
      { en: 'Open to all — families, youth, and elders welcome', hi: 'सभी के लिए खुला — परिवार, युवा और वृद्ध सभी स्वागत', kn: 'ಎಲ್ಲರಿಗೂ ಮುಕ್ತ — ಕುಟುಂಬ, ಯುವಕರು, ಹಿರಿಯರು' },
      { en: 'Akhand Deepak and dhoop maintained throughout', hi: 'अखंड दीपक और धूप सत्र भर जलती रहती है', kn: 'ಅಖಂಡ ದೀಪ ಮತ್ತು ಧೂಪ ಸತ್ರ ಉದ್ದಕ್ಕೂ' },
    ],
  },
  {
    id: 'anusthan',
    img: '/assets/programs/anusthan.png',
    title: { en: 'Gayatri Anusthan', hi: 'गायत्री अनुष्ठान', kn: 'ಗಾಯತ್ರಿ ಅನುಷ್ಠಾನ' },
    schedule: { en: 'Chaitra & Ashwin Navratri · 9 days each', hi: 'चैत्र एवं आश्विन नवरात्रि · प्रत्येक 9 दिन', kn: 'ಚೈತ್ರ ಮತ್ತು ಆಶ್ವಿನ ನವರಾತ್ರಿ · 9 ದಿನ' },
    desc: {
      en: 'An intensive 9-day sadhana during Navratri involving 1,25,000 Gayatri Mantra recitations — 27 malas daily. Participants observe sattvic discipline and conclude with a Gayatri Havan on the final day.',
      hi: 'नवरात्रि में 9 दिन की गहन साधना — 1,25,000 गायत्री मंत्र जप, प्रतिदिन 27 माला। सात्विक जीवनशैली और अंत में गायत्री हवन।',
      kn: 'ನವರಾತ್ರಿಯಲ್ಲಿ 9 ದಿನ 1,25,000 ಗಾಯತ್ರಿ ಮಂತ್ರ ಜಪ — ಪ್ರತಿದಿನ 27 ಮಾಲೆ. ಸಾತ್ವಿಕ ಶಿಸ್ತು ಮತ್ತು ಕೊನೆ ದಿನ ಗಾಯತ್ರಿ ಹವನ.',
    },
    highlights: [
      { en: 'Chaitra Navratri (Mar/Apr) & Ashwin Navratri (Sep/Oct)', hi: 'चैत्र नवरात्रि (मार्च/अप्रैल) एवं आश्विन नवरात्रि (सित./अक्टू.)', kn: 'ಚೈತ್ರ ನವರಾತ್ರಿ ಮತ್ತು ಆಶ್ವಿನ ನವರಾತ್ರಿ' },
      { en: 'Daily Jap, Yagya, sattvic diet & brahmacharya', hi: 'दैनिक जप, यज्ञ, सात्विक आहार और ब्रह्मचर्य', kn: 'ದೈನಂದಿನ ಜಪ, ಯಜ್ಞ, ಸಾತ್ವಿಕ ಆಹಾರ ಮತ್ತು ಬ್ರಹ್ಮಚರ್ಯ' },
      { en: 'Concludes with Gayatri Havan — 108 ahutis', hi: 'गायत्री हवन — 108 आहुतियों के साथ समापन', kn: 'ಗಾಯತ್ರಿ ಹವನ — 108 ಆಹುತಿಗಳೊಂದಿಗೆ ಸಮಾಪ್ತಿ' },
    ],
  },
  {
    id: 'antah-urja',
    img: '/assets/programs/antah-urja-jagran.jpg',
    title: { en: 'Antah Urja Jagran', hi: 'अंतः ऊर्जा जागरण', kn: 'ಅಂತಃ ಊರ್ಜಾ ಜಾಗರಣ' },
    schedule: { en: 'Periodic full-day sessions — dates announced in advance', hi: 'समय-समय पर पूर्ण दिन के सत्र', kn: 'ಆಗಾಗ್ಗೆ ಪೂರ್ಣ ದಿನ ಸತ್ರಗಳು' },
    desc: {
      en: "A full-day Maun Sadhana (silence practice) with complete digital detox — participants engage in deep meditation, Gayatri Jap, pranayam, and swadhyay guided by Gurudev's recorded audio.",
      hi: 'पूर्ण दिन मौन साधना और डिजिटल डिटॉक्स। गुरुदेव की ऑडियो से निर्देशित ध्यान, गायत्री जप, प्राणायाम और स्वाध्याय।',
      kn: 'ಪೂರ್ಣ ದಿನ ಮೌನ ಸಾಧನೆ ಮತ್ತು ಡಿಜಿಟಲ್ ಡಿಟಾಕ್ಸ್. ಗುರುದೇವರ ಆಡಿಯೋ ನಿರ್ದೇಶನದ ಧ್ಯಾನ, ಜಪ ಮತ್ತು ಸ್ವಾಧ್ಯಾಯ.',
    },
    highlights: [
      { en: 'Full-day silence (Maun) & complete digital detox', hi: 'पूर्ण दिन मौन एवं डिजिटल डिटॉक्स', kn: 'ಸಂಪೂರ್ಣ ದಿನ ಮೌನ ಮತ್ತು ಡಿಜಿಟಲ್ ಡಿಟಾಕ್ಸ್' },
      { en: '~6 hours guided Gayatri Jap + Swadhyay sessions', hi: '~6 घंटे निर्देशित गायत्री जप + स्वाध्याय सत्र', kn: '~6 ಗಂಟೆ ನಿರ್ದೇಶಿತ ಗಾಯತ್ರಿ ಜಪ + ಸ್ವಾಧ್ಯಾಯ' },
      { en: 'Write inner resolutions at the end of the day', hi: 'दिन के अंत में आंतरिक संकल्प लिखना', kn: 'ದಿನದ ಕೊನೆಯಲ್ಲಿ ಆಂತರಿಕ ಸಂಕಲ್ಪ ಬರೆಯುವುದು' },
    ],
  },
  {
    id: 'mataji-jap',
    img: '/assets/programs/mataji.jpg',
    title: { en: 'Mataji Janm Satabdi Jap', hi: 'माताजी जन्म शताब्दी जप', kn: 'ಮಾತಾಜಿ ಜನ್ಮ ಶತಾಬ್ದಿ ಜಪ' },
    schedule: { en: 'Every 4th Sunday · 9:00 AM – 12:00 PM', hi: 'प्रत्येक चौथे रविवार · सुबह 9:00 – दोपहर 12:00', kn: 'ಪ್ರತಿ 4ನೇ ಭಾನುವಾರ · ಬೆಳಿಗ್ಗೆ 9:00 – ಮಧ್ಯಾಹ್ನ 12:00' },
    desc: {
      en: "A 3-hour special Jap session every 4th Sunday honouring Vandaniya Mata Bhagwati Devi Sharma Ji's birth centenary (2026). Includes readings from her life, teachings, and a community satsang.",
      hi: 'वंदनीया माता भगवती देवी शर्मा जी की जन्म शताब्दी (2026) के सम्मान में प्रत्येक चौथे रविवार 3 घंटे का विशेष जप। माताजी के जीवन और उपदेशों का पठन व सत्संग।',
      kn: 'ವಂದನೀಯ ಮಾತಾ ಭಗವತಿ ದೇವಿ ಶರ್ಮಾ ಜೀ ಜನ್ಮ ಶತಾಬ್ದಿ (2026) ಗೌರವಾರ್ಥ ಪ್ರತಿ 4ನೇ ಭಾನುವಾರ 3 ಗಂಟೆ ವಿಶೇಷ ಜಪ.',
    },
    highlights: [
      { en: '3-hour Gayatri Jap dedicated to Vandaniya Mataji', hi: 'वंदनीया माताजी को समर्पित 3 घंटे का गायत्री जप', kn: 'ವಂದನೀಯ ಮಾತಾಜಿಗೆ ಅರ್ಪಿತ 3 ಗಂಟೆ ಗಾಯತ್ರಿ ಜಪ' },
      { en: "Readings from Mataji's life & teachings", hi: 'माताजी की जीवन-कथाओं और उपदेशों का पठन', kn: 'ಮಾತಾಜಿ ಜೀವನ ಕಥೆ ಮತ್ತು ಬೋಧನೆ ಪಠಣ' },
      { en: 'Community satsang & prasad distribution', hi: 'सामुदायिक सत्संग और प्रसाद वितरण', kn: 'ಸಾಮುದಾಯಿಕ ಸತ್ಸಂಗ ಮತ್ತು ಪ್ರಸಾದ ವಿತರಣೆ' },
    ],
  },
  {
    id: 'chandrayaan-kalp',
    img: '/assets/programs/chandrayan.jpg',
    title: { en: 'Chandrayaan Kalp Sadhana', hi: 'चांद्रायण कल्प साधना', kn: 'ಚಾಂದ್ರಾಯಣ ಕಲ್ಪ ಸಾಧನೆ' },
    schedule: { en: 'Lunar-cycle based · once per year · dates announced in advance', hi: 'चंद्र चक्र आधारित · वर्ष में एक बार · तिथियां पूर्व में घोषित', kn: 'ಚಂದ್ರ ಚಕ್ರ ಆಧಾರಿತ · ವರ್ಷದಲ್ಲಿ ಒಂದು ಬಾರಿ' },
    desc: {
      en: 'An ancient Vedic purification practice that follows the lunar cycle — combining moon-rhythm dietary discipline (Chandrayana Vrat), Gayatri Upasana, pranayama, and introspection over a full lunar month for body, mind, and soul transformation.',
      hi: 'एक प्राचीन वैदिक शुद्धि साधना जो चंद्र चक्र का अनुसरण करती है — चंद्र-आधारित आहार अनुशासन (चांद्रायण व्रत), गायत्री उपासना, प्राणायाम और आत्म-निरीक्षण का संयोजन।',
      kn: 'ಚಂದ್ರ ಚಕ್ರವನ್ನು ಅನುಸರಿಸುವ ಪ್ರಾಚೀನ ವೈದಿಕ ಶುದ್ಧಿ ಸಾಧನೆ — ಆಹಾರ ಶಿಸ್ತು, ಗಾಯತ್ರಿ ಉಪಾಸನೆ, ಪ್ರಾಣಾಯಾಮ ಮತ್ತು ಆತ್ಮ-ನಿರೀಕ್ಷಣ.',
    },
    highlights: [
      { en: 'Chandrayana Vrat — food intake follows moon phases from Amavasya to Purnima', hi: 'चांद्रायण व्रत — आहार अमावस्या से पूर्णिमा तक चंद्र कलाओं का अनुसरण करता है', kn: 'ಚಾಂದ್ರಾಯಣ ವ್ರತ — ಅಮಾವಾಸ್ಯೆಯಿಂದ ಪೂರ್ಣಿಮೆ ತನಕ ಚಂದ್ರ ಕಲೆ ಆಧಾರಿತ ಆಹಾರ' },
      { en: 'Daily Gayatri Upasana — jap, meditation, and havan throughout the lunar month', hi: 'दैनिक गायत्री उपासना — पूरे चंद्र महीने जप, ध्यान और हवन', kn: 'ದೈನಂದಿನ ಗಾಯತ್ರಿ ಉಪಾಸನೆ — ಜಪ, ಧ್ಯಾನ ಮತ್ತು ಹವನ' },
      { en: 'Mridu (gentle) & Tivra (intense) versions — suitable for all levels', hi: 'मृदु (सौम्य) और तीव्र संस्करण — सभी स्तरों के लिए उपयुक्त', kn: 'ಮೃದು ಮತ್ತು ತೀವ್ರ ಆವೃತ್ತಿಗಳು — ಎಲ್ಲ ಹಂತಗಳಿಗೆ' },
    ],
  },
];

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { en: 'Sadhana — AWGP Bengaluru', hi: 'साधना — AWGP बेंगलूरु', kn: 'ಸಾಧನೆ — AWGP ಬೆಂಗಳೂರು' };
  return { title: titles[locale] || titles.en };
}

export default async function SadhanaPage({ params }) {
  const { locale } = await params;
  const L = (obj) => (obj && (obj[locale] || obj.en)) || '';

  return (
    <>
      <HeroSection
        eyebrow={`AWGP Bengaluru · ${locale === 'hi' ? 'साधना' : locale === 'kn' ? 'ಸಾಧನೆ' : 'Sadhana'}`}
        title={locale === 'hi' ? 'साधना' : locale === 'kn' ? 'ಸಾಧನೆ' : 'Sadhana'}
        subtitle={
          locale === 'hi'
            ? 'AWGP में आध्यात्मिक साधना का केंद्र'
            : locale === 'kn'
              ? 'AWGP ನಲ್ಲಿ ಆಧ್ಯಾತ್ಮಿಕ ಅಭ್ಯಾಸದ ಕೇಂದ್ರ'
              : 'The Heart of Spiritual Practice at AWGP'
        }
        mantra="॥ ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥"
        bgImage="/assets/programs/akhand-jap.jpeg"
        bgColor="linear-gradient(135deg, #7B1C1C 0%, #3D1F0A 100%)"
      />

      <section className="section">
        <div className="section-inner">
          <div className="detail-layout">

            {/* Main */}
            <div className="detail-main">
              <p className="detail-intro">
                {locale === 'hi'
                  ? 'साधना AWGP में व्यक्तिगत परिवर्तन की आधारशिला है। गुरुदेव पंडित श्रीराम शर्मा आचार्य की शिक्षाओं के अनुसार साधना केवल कर्मकांड नहीं, बल्कि अंतःकरण की गहरी सफाई और जागृति का मार्ग है। AWGP बेंगलूरु में हम पाँच प्रमुख साधना कार्यक्रम आयोजित करते हैं — जो हर व्यक्ति को उनकी सुविधा और आध्यात्मिक स्तर के अनुसार जुड़ने का अवसर देते हैं।'
                  : locale === 'kn'
                    ? 'ಸಾಧನೆ AWGP ನಲ್ಲಿ ವೈಯಕ್ತಿಕ ಪರಿವರ್ತನೆಯ ಮೂಲಾಧಾರ. AWGP ಬೆಂಗಳೂರಿನಲ್ಲಿ ನಾವು ಐದು ಪ್ರಮುಖ ಸಾಧನೆ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಆಯೋಜಿಸುತ್ತೇವೆ — ಪ್ರತಿಯೊಬ್ಬರ ಅನುಕೂಲ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಮಟ್ಟಕ್ಕನುಗುಣ.'
                    : 'Sadhana is the cornerstone of personal transformation at AWGP. According to Gurudev Pandit Shriram Sharma Acharya, Sadhana is not mere ritual — it is a systematic path of inner purification, self-discipline, and awakening. At AWGP Bengaluru, we offer five forms of Sadhana, each suitable for different schedules and spiritual inclinations. All are open to everyone — no prior experience required.'}
              </p>

              <div className="sadhana-grid">
                {sadhanaForms.map((form) => (
                  <article key={form.id} className="sadhana-card">
                    <img src={form.img} alt={L(form.title)} className="sadhana-card__img" />
                    <div className="sadhana-card__body">
                      <div className="sadhana-card__header">
                        <div>
                          <h3 className="sadhana-card__title">{L(form.title)}</h3>
                          <span className="sadhana-card__schedule">🕐 {L(form.schedule)}</span>
                        </div>
                      </div>
                      <p className="sadhana-card__desc">{L(form.desc)}</p>
                      <ul className="sadhana-card__highlights">
                        {form.highlights.map((h, i) => <li key={i}>{L(h)}</li>)}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="detail-sidebar">
              <div className="detail-card">
                <h4>📅 {locale === 'hi' ? 'साधना समय-सारणी' : locale === 'kn' ? 'ಸಾಧನೆ ವೇಳಾಪಟ್ಟಿ' : 'Sadhana Schedule'}</h4>
                <p>
                  {locale === 'hi'
                    ? '🕉 अखंड जप — हर 2रे शनिवार\n🔥 अनुष्ठान — नवरात्रि (9 दिन)\n🧘 अंतः-ऊर्जा — समय-समय पर\n🪔 माताजी जप — हर 4थे रविवार\n🌙 चांद्रायण — वार्षिक'
                    : locale === 'kn'
                      ? '🕉 ಅಖಂಡ ಜಪ — ಪ್ರತಿ 2ನೇ ಶನಿ\n🔥 ಅನುಷ್ಠಾನ — ನವರಾತ್ರಿ (9 ದಿನ)\n🧘 ಅಂತಃ-ಊರ್ಜಾ — ಆಗಾಗ್ಗೆ\n🪔 ಮಾತಾಜಿ ಜಪ — ಪ್ರತಿ 4ನೇ ಭಾನು\n🌙 ಚಾಂದ್ರಾಯಣ — ವಾರ್ಷಿಕ'
                      : '🕉 Akhand Jap — every 2nd Saturday\n🔥 Anusthan — Navratri (9 days)\n🧘 Antah-Urja — periodically\n🪔 Mataji Jap — every 4th Sunday\n🌙 Chandrayaan Kalp — annually'}
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
