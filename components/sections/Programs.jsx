import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../../lib/i18n/navigation';
import Image from 'next/image';
import './Programs.css';

const programs = [
  {
    img: '/assets/programs/akhand-jap.jpeg',
    href: '/programs/sadhana',
    isNew: false,
    title: { en: 'Sadhana',                 hi: 'साधना',                  kn: 'ಸಾಧನೆ' },
    desc:  { en: 'Akhand Jap, Anusthan, Antah-Urja Jagran & Mataji Jap — four paths of disciplined inner practice open to all.',
             hi: 'अखंड जप, अनुष्ठान, अंतः-ऊर्जा जागरण एवं माताजी जप — गहन साधना के चार मार्ग, सभी के लिए खुले।',
             kn: 'ಅಖಂಡ ಜಪ, ಅನುಷ್ಠಾನ, ಅಂತಃ-ಊರ್ಜಾ ಜಾಗರಣ ಮತ್ತು ಮಾತಾಜಿ ಜಪ — ಎಲ್ಲರಿಗೂ ಮುಕ್ತ ನಾಲ್ಕು ಸಾಧನೆ ಮಾರ್ಗಗಳು.' },
  },
  {
    img: '/assets/programs/antah-urja-jagran.jpg',
    href: '/programs/meditation',
    isNew: false,
    title: { en: 'Meditation',              hi: 'ध्यान',                  kn: 'ಧ್ಯಾನ' },
    desc:  { en: 'Guided Sunday meditation sessions — breath awareness, Gayatri mantra meditation & visualisation. Open to all.',
             hi: 'रविवार को निर्देशित ध्यान सत्र — श्वास जागरूकता, गायत्री मंत्र ध्यान। सभी के लिए खुला।',
             kn: 'ಭಾನುವಾರದ ನಿರ್ದೇಶಿತ ಧ್ಯಾನ ಸತ್ರ — ಉಸಿರು ಜಾಗೃತಿ, ಗಾಯತ್ರಿ ಮಂತ್ರ ಧ್ಯಾನ. ಎಲ್ಲರಿಗೂ ಮುಕ್ತ.' },
  },
  {
    img: '/assets/programs/workshops.jpg',
    href: '/programs/workshops',
    isNew: false,
    title: { en: 'Workshops & Shivirs',     hi: 'कार्यशालाएं एवं शिविर',  kn: 'ಕಾರ್ಯಾಗಾರ ಮತ್ತು ಶಿಬಿರ' },
    desc:  { en: 'Transformative sessions on scientific spirituality, personality development, and family harmony.',
             hi: 'वैज्ञानिक अध्यात्म, व्यक्तित्व विकास और पारिवारिक सद्भाव पर परिवर्तनकारी सत्र।',
             kn: 'ವೈಜ್ಞಾನಿಕ ಆಧ್ಯಾತ್ಮ, ವ್ಯಕ್ತಿತ್ವ ವಿಕಾಸ ಮತ್ತು ಕುಟುಂಬ ಸೌಹಾರ್ದದ ಸತ್ರಗಳು.' },
  },
  {
    img: '/assets/programs/yoga_session.jpg',
    href: '/programs/yoga',
    isNew: false,
    title: { en: 'Yoga',                    hi: 'योग',                    kn: 'ಯೋಗ' },
    desc:  { en: 'Daily weekday yoga combining asanas, pranayam, and meditation — open to all levels.',
             hi: 'दैनिक योग सत्र जिसमें आसन, प्राणायाम और ध्यान शामिल हैं — सभी स्तरों के लिए।',
             kn: 'ಆಸನ, ಪ್ರಾಣಾಯಾಮ ಮತ್ತು ಧ್ಯಾನ ಒಳಗೊಂಡ ದೈನಂದಿನ ಯೋಗ — ಎಲ್ಲ ಹಂತಗಳಿಗೆ ಮುಕ್ತ.' },
  },
  {
    img: '/assets/programs/festival.jpg',
    href: '/programs/festivals',
    isNew: false,
    title: { en: 'Festival Celebrations',   hi: 'पर्व उत्सव',             kn: 'ಹಬ್ಬದ ಆಚರಣೆಗಳು' },
    desc:  { en: 'All major Indian festivals celebrated with Yagya, kirtan, satsang, and prasad.',
             hi: 'सभी प्रमुख भारतीय त्योहार यज्ञ, कीर्तन, सत्संग और प्रसाद के साथ मनाए जाते हैं।',
             kn: 'ಎಲ್ಲ ಪ್ರಮುಖ ಭಾರತೀಯ ಹಬ್ಬಗಳನ್ನು ಯಜ್ಞ, ಕೀರ್ತನ, ಸತ್ಸಂಗದೊಂದಿಗೆ ಆಚರಿಸಲಾಗುತ್ತದೆ.' },
  },
  {
    img: '/assets/programs/bal-sanskar-shala.jpg',
    href: '/programs/bal-sanskar-shala',
    isNew: false,
    title: { en: 'Bal Sanskar Shala',       hi: 'बाल संस्कार शाला',       kn: 'ಬಾಲ ಸಂಸ್ಕಾರ ಶಾಲಾ' },
    desc:  { en: 'Weekly values and character-building classes for children rooted in Indian culture and Vedic wisdom.',
             hi: 'बच्चों के लिए साप्ताहिक मूल्य और चरित्र निर्माण की कक्षाएं — भारतीय संस्कृति पर आधारित।',
             kn: 'ಮಕ್ಕಳಿಗಾಗಿ ವಾರದ ಮೌಲ್ಯ ಮತ್ತು ಚಾರಿತ್ರ್ಯ ನಿರ್ಮಾಣ ತರಗತಿಗಳು — ಭಾರತೀಯ ಸಂಸ್ಕೃತಿ ಆಧಾರಿತ.' },
  },
];

export default function Programs({ locale }) {
  const t = useTranslations();
  const lang = locale;
  const learnMore = lang === 'hi' ? 'और जानें' : lang === 'kn' ? 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ' : 'Learn More';

  return (
    <section id="programs" className="section programs-section">
      <div className="section-inner">
        <div className="section-header">
          <p className="eyebrow">
            {lang === 'hi' ? 'हमारे कार्यक्रम' : lang === 'kn' ? 'ನಮ್ಮ ಕಾರ್ಯಕ್ರಮಗಳು' : 'Our Programs'}
          </p>
          <h2>
            {lang === 'hi' ? 'साधना और सेवा' : lang === 'kn' ? 'ಸಾಧನೆ ಮತ್ತು ಸೇವೆ' : 'Sadhana & Service'}
          </h2>
          <div className="ornament"><span>✨</span></div>
        </div>

        <div className="programs-flip-grid">
          {programs.map((p, i) => (
            <div key={i} className="flip-card">
              <div className="flip-card__inner">
                {/* Front */}
                <div className="flip-card__front">
                  <Image
                    src={p.img}
                    alt={p.title[lang] || p.title.en}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                    className="flip-card__img"
                  />
                  <div className="flip-card__front-overlay" />
                  {p.isNew && (
                    <span className="flip-card__new-badge">
                      {lang === 'hi' ? 'नया' : lang === 'kn' ? 'ಹೊಸದು' : 'New'}
                    </span>
                  )}
                  <h3 className="flip-card__front-title">{p.title[lang] || p.title.en}</h3>
                </div>
                {/* Back */}
                <div className="flip-card__back">
                  <div className="flip-card__back-content">
                    <h3 className="flip-card__back-title">{p.title[lang] || p.title.en}</h3>
                    <p className="flip-card__back-desc">{p.desc[lang] || p.desc.en}</p>
                    <Link href={p.href} className="flip-card__back-cta">
                      {learnMore} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="programs-view-all">
          <Link href="/programs" className="btn btn-primary">
            {lang === 'hi' ? 'सभी कार्यक्रम देखें →' : lang === 'kn' ? 'ಎಲ್ಲ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ನೋಡಿ →' : 'View All Programs →'}
          </Link>
        </div>
      </div>
    </section>
  );
}
