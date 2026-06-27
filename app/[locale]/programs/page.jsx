import Image from 'next/image';
import { Link } from '../../../lib/i18n/navigation';
import HeroSection from '../../../components/ui/HeroSection';
import Reveal from '../../../components/ui/Reveal';
import programTypesData from '../../../data/program-types.json';
import './Programs.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { en: 'Programs — AWGP Bengaluru', hi: 'कार्यक्रम — AWGP बेंगलूरु', kn: 'ಕಾರ್ಯಕ್ರಮಗಳು — AWGP ಬೆಂಗಳೂರು' };
  return { title: titles[locale] || titles.en };
}

/* Richer banner images per program slug */
const PROGRAM_IMGS = {
  'festivals':       '/assets/programs/festival-banner.jpg',
  'yagya-events':    '/assets/programs/yagya-banner.png',
  'book-fair':       '/assets/activities/book-fair.jpg',
  'tree-plantation': '/assets/activities/tree-plantation1.jpg',
  'akhand-jap':      '/assets/programs/akhand-jap.jpeg',
  'bal-sanskar-shala': '/assets/programs/bss-banner.jpg',
};

/* Gradient image overlays — harmonise with each panel colour */
const PANEL_IMG_GRAD = {
  'festivals':       'linear-gradient(90deg, transparent 55%, rgba(123,74,0,0.6) 100%)',
  'yagya-events':    'linear-gradient(90deg, transparent 55%, rgba(61,31,10,0.7) 100%)',
  'book-fair':       'linear-gradient(90deg, transparent 55%, rgba(90,48,0,0.65) 100%)',
  'tree-plantation': 'linear-gradient(90deg, transparent 55%, rgba(47,90,30,0.65) 100%)',
};
const PANEL_IMG_GRAD_FLIP = {
  'festivals':       'linear-gradient(270deg, transparent 55%, rgba(123,74,0,0.6) 100%)',
  'yagya-events':    'linear-gradient(270deg, transparent 55%, rgba(61,31,10,0.7) 100%)',
  'book-fair':       'linear-gradient(270deg, transparent 55%, rgba(90,48,0,0.65) 100%)',
  'tree-plantation': 'linear-gradient(270deg, transparent 55%, rgba(47,90,30,0.65) 100%)',
};

const L = (obj, locale) => (obj && (obj[locale] || obj.en)) || '';

export default async function ProgramsIndexPage({ params }) {
  const { locale } = await params;
  const loc = (obj) => L(obj, locale);

  const listed = programTypesData.filter((p) => p.listed !== false);

  const T = {
    eyebrow:  loc({ en: 'What We Offer', hi: 'हम क्या प्रदान करते हैं', kn: 'ನಾವು ಏನು ನೀಡುತ್ತೇವೆ' }),
    heading:  loc({ en: 'Every Occasion a Celebration', hi: 'हर अवसर एक उत्सव', kn: 'ಪ್ರತಿ ಸಂದರ್ಭ ಒಂದು ಉತ್ಸವ' }),
    body:     loc({
      en: "AWGP Bengaluru's programs — festivals, Yagyas, Anusthan, and Akhand Jap — are moments of collective spiritual experience. All programs are free, open to everyone, and rooted in Gurudev's vision of Sadhana and Seva.",
      hi: 'AWGP बेंगलूरु के कार्यक्रम — उत्सव, यज्ञ, अनुष्ठान और अखंड जप — सामूहिक आध्यात्मिक अनुभव के अवसर हैं। सभी कार्यक्रम निःशुल्क और सभी के लिए खुले हैं।',
      kn: 'AWGP ಬೆಂಗಳೂರಿನ ಕಾರ್ಯಕ್ರಮಗಳು — ಹಬ್ಬಗಳು, ಯಜ್ಞ, ಅನುಷ್ಠಾನ ಮತ್ತು ಅಖಂಡ ಜಪ — ಸಾಮೂಹಿಕ ಆಧ್ಯಾತ್ಮಿಕ ಅನುಭವದ ಅವಕಾಶಗಳು.',
    }),
    explore:  loc({ en: 'Explore', hi: 'और जानें', kn: 'ಇನ್ನಷ್ಟು' }),
    ctaEye:   loc({ en: 'Come Join Us', hi: 'हमारे साथ जुड़ें', kn: 'ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ' }),
    ctaH:     loc({ en: 'Be Part of Our Pariwar', hi: 'हमारे परिवार का हिस्सा बनें', kn: 'ನಮ್ಮ ಪರಿವಾರದ ಭಾಗವಾಗಿ' }),
    ctaBody:  loc({
      en: 'All programs are open to everyone — no registration, no fee. Come as you are.',
      hi: 'सभी कार्यक्रम सबके लिए खुले हैं — कोई पंजीकरण नहीं, कोई शुल्क नहीं।',
      kn: 'ಎಲ್ಲ ಕಾರ್ಯಕ್ರಮಗಳು ಎಲ್ಲರಿಗೂ ಮುಕ್ತ — ನೋಂದಣಿ ಬೇಡ, ಶುಲ್ಕ ಬೇಡ.',
    }),
    contact:  loc({ en: 'Contact Us', hi: 'संपर्क करें', kn: 'ಸಂಪರ್ಕಿಸಿ' }),
    whatsapp: 'WhatsApp',
  };

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection
        eyebrow="AWGP Bengaluru"
        title={loc({ en: 'Programs', hi: 'कार्यक्रम', kn: 'ಕಾರ್ಯಕ್ರಮಗಳು' })}
        subtitle={loc({ en: 'Festivals, Yagyas & Transformative Shivirs', hi: 'उत्सव, यज्ञ और परिवर्तनकारी शिविर', kn: 'ಉತ್ಸವ, ಯಜ್ಞ ಮತ್ತು ಪರಿವರ್ತನಕಾರಿ ಶಿಬಿರಗಳು' })}
        mantra="॥ ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥"
      />

      {/* ── Intro band ── */}
      <section className="prog-page__intro">
        <div className="prog-page__intro-inner">
          <span className="prog-page__intro-eyebrow">{T.eyebrow}</span>
          <h2 className="prog-page__intro-title">{T.heading}</h2>
          <p className="prog-page__intro-text">{T.body}</p>
        </div>
      </section>

      {/* ── Programs showcase ── */}
      <section className="prog-page__showcase">
        {listed.map((program, i) => {
          const isFlip = i % 2 !== 0;
          const img = PROGRAM_IMGS[program.id] || program.img;
          const bg  = program.heroColor || 'linear-gradient(135deg, #5A1A0E 0%, #3D1F0A 100%)';
          const imgGrad = (isFlip ? PANEL_IMG_GRAD_FLIP : PANEL_IMG_GRAD)[program.id] || 'none';

          return (
            <Reveal key={program.id} as="article" className={`prog-row${isFlip ? ' prog-row--flip' : ''}`}>
              {/* Image */}
              <div className="prog-row__img">
                <div className="prog-row__img-inner">
                  <Image
                    src={img}
                    alt={loc(program.title)}
                    fill
                    sizes="(max-width:840px) 100vw, 55vw"
                    style={{ objectFit: 'cover' }}
                    priority={i === 0}
                  />
                </div>
                {/* Gradient bleeding into panel colour */}
                <div className="prog-row__img-grad" style={{ background: imgGrad }} />
              </div>

              {/* Text panel */}
              <div className="prog-row__panel" style={{ background: bg }}>
                <span className="prog-row__panel-tag">AWGP Bengaluru</span>
                <h2 className="prog-row__panel-title">{loc(program.title)}</h2>
                <p className="prog-row__panel-sub">{loc(program.subtitle)}</p>
                <span className="prog-row__panel-schedule">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {loc(program.schedule)}
                </span>
                <p className="prog-row__panel-desc">{loc(program.intro)}</p>
                <Link href={`/programs/${program.slug}`} className="prog-row__panel-cta">
                  {T.explore}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              </div>
            </Reveal>
          );
        })}
      </section>

      {/* ── CTA strip ── */}
      <section className="prog-page__cta">
        <div className="prog-page__cta-inner">
          <span className="prog-page__cta-eyebrow">{T.ctaEye}</span>
          <h2 className="prog-page__cta-title">{T.ctaH}</h2>
          <p className="prog-page__cta-text">{T.ctaBody}</p>
          <div className="prog-page__cta-btns">
            <Link href="/contact" className="btn btn-primary">{T.contact}</Link>
            <a
              href="https://wa.me/919243755613"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ borderColor: 'rgba(255,255,255,0.35)', color: '#fff' }}
            >
              💬 {T.whatsapp}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
