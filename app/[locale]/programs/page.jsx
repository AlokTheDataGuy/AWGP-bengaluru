import Image from 'next/image';
import { Link } from '../../../lib/i18n/navigation';
import HeroSection from '../../../components/ui/HeroSection';
import Reveal from '../../../components/ui/Reveal';
import Breadcrumbs from '../../../components/seo/Breadcrumbs';
import JsonLd from '../../../components/seo/JsonLd';
import { buildMetadata, localeUrl } from '../../../lib/seo/metadata';
import { eventSchema } from '../../../lib/seo/schema';
import programTypesData from '../../../data/program-types.json';
import eventsData from '../../../data/programs.json';
import './Programs.css';

const PROGRAMS_TITLE = {
  en: 'Programs — Festivals, Yagya & Spiritual Shivirs',
  hi: 'कार्यक्रम — उत्सव, यज्ञ एवं आध्यात्मिक शिविर',
  kn: 'ಕಾರ್ಯಕ್ರಮಗಳು — ಹಬ್ಬಗಳು, ಯಜ್ಞ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಶಿಬಿರಗಳು',
};

const PROGRAMS_DESC = {
  en: 'Free festivals, Yagya ceremonies, Akhand Jap, Bal Sanskar Shala and transformative shivirs at AWGP Bengaluru. Every program is open to all — no fee, no registration. See upcoming events.',
  hi: 'AWGP बेंगलूरु में नि:शुल्क उत्सव, यज्ञ अनुष्ठान, अखंड जप, बाल संस्कार शाला एवं परिवर्तनकारी शिविर। हर कार्यक्रम सभी के लिए खुला — कोई शुल्क नहीं, कोई पंजीकरण नहीं।',
  kn: 'AWGP ಬೆಂಗಳೂರಿನಲ್ಲಿ ಉಚಿತ ಹಬ್ಬಗಳು, ಯಜ್ಞ ಆಚರಣೆಗಳು, ಅಖಂಡ ಜಪ, ಬಾಲ ಸಂಸ್ಕಾರ ಶಾಲೆ ಮತ್ತು ಪರಿವರ್ತನಕಾರಿ ಶಿಬಿರಗಳು. ಪ್ರತಿ ಕಾರ್ಯಕ್ರಮ ಎಲ್ಲರಿಗೂ ಮುಕ್ತ.',
};

const PROGRAMS_BC = {
  home: { en: 'Home', hi: 'होम', kn: 'ಮುಖಪುಟ' },
  programs: { en: 'Programs', hi: 'कार्यक्रम', kn: 'ಕಾರ್ಯಕ್ರಮಗಳು' },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({ locale, path: '/programs', title: PROGRAMS_TITLE, description: PROGRAMS_DESC });
}

/** Upcoming dated events → Event JSON-LD (festival schema). */
function eventsJsonLd(locale) {
  const today = new Date();
  return eventsData
    .filter((e) => new Date(e.date) >= new Date(today.getFullYear() - 1, 0, 1))
    .map((e) =>
      eventSchema({
        name: (e.title[locale] || e.title.en),
        startDate: e.date,
        description: e.desc[locale] || e.desc.en,
        image: e.img,
        url: localeUrl(locale, '/programs/festivals'),
        locationName: e.location[locale] || e.location.en,
        registrationUrl: localeUrl(locale, '/contact'),
      })
    );
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
      <Breadcrumbs
        locale={locale}
        items={[
          { name: loc(PROGRAMS_BC.home), path: '/' },
          { name: loc(PROGRAMS_BC.programs), path: '/programs' },
        ]}
      />
      <JsonLd data={eventsJsonLd(locale)} id="upcoming-events" />
      {/* ── Hero ── */}
      <HeroSection
        title={loc({ en: 'Programs', hi: 'कार्यक्रम', kn: 'ಕಾರ್ಯಕ್ರಮಗಳು' })}
        subtitle={loc({ en: 'Festivals, Yagyas & Transformative Shivirs', hi: 'उत्सव, यज्ञ और परिवर्तनकारी शिविर', kn: 'ಉತ್ಸವ, ಯಜ್ಞ ಮತ್ತು ಪರಿವರ್ತನಕಾರಿ ಶಿಬಿರಗಳು' })}
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
          const isFlip     = i % 2 !== 0;
          const panelTheme = i % 2 === 0 ? 'dark' : 'light';
          const img        = PROGRAM_IMGS[program.id] || program.img;
          const imgGrad    = 'none';

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
              <div className={`prog-row__panel prog-row__panel--${panelTheme}`}>
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
