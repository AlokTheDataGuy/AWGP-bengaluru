import Image from 'next/image';
import { Link } from '../../../../lib/i18n/navigation';
import HeroSection from '../../../../components/ui/HeroSection';
import Reveal from '../../../../components/ui/Reveal';
import ReadMore from '../../../../components/ui/ReadMore';
import festivalsData from '../../../../data-json-files/programs/festivals.json';
import Breadcrumbs from '../../../../components/seo/Breadcrumbs';
import JsonLd from '../../../../components/seo/JsonLd';
import { buildMetadata, localeUrl } from '../../../../lib/seo/metadata';
import { eventSchema } from '../../../../lib/seo/schema';
import eventsData from '../../../../data/programs.json';
import './Festivals.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const d = festivalsData.meta.seoDescription;
  const t = festivalsData.hero.title;
  return buildMetadata({
    locale,
    path: '/programs/festivals',
    title: { en: `${t.en} — Hindu Festivals at AWGP Bengaluru`, hi: t.hi || t.en, kn: t.kn || t.en },
    description: d,
  });
}

function festivalEventsJsonLd(locale) {
  return eventsData.map((e) =>
    eventSchema({
      name: e.title[locale] || e.title.en,
      startDate: e.date,
      description: e.desc[locale] || e.desc.en,
      image: e.img,
      url: localeUrl(locale, '/programs/festivals'),
      locationName: e.location[locale] || e.location.en,
      registrationUrl: localeUrl(locale, '/contact'),
    })
  );
}

/* ── Image map: festival-id → best photo path ── */
const CARD_IMG = {
  'makar-sankranti':          '/assets/festivals/makar-sakranti.png',
  'basant-panchami':          '/assets/festivals/basant-panchami/basant-panchami.jpg',
  'mahashivratri':            '/assets/festivals/mahashivratri.jpg',
  'holi':                     '/assets/festivals/holi/holi.jpg',
  'navratri':                 '/assets/festivals/navratri/navratri.jpg',
  'gayatri-jayanti':          '/assets/festivals/gayatri-jayanti/gayatri-jayanti.jpeg',
  'guru-purnima':             '/assets/festivals/guru-purnima.jpg',
  'raksha-bandhan':           '/assets/festivals/raksha-bandhan/raksha-bandhan.jpg',
  'janmashtami':              '/assets/festivals/janamstami/janmastami1.jpg',
  'ganesh-chaturthi':         '/assets/festivals/ganesh-chaturthi/ganesh-chaturthi1.jpg',
  'international-womens-day': "/assets/festivals/international%20women%27s%20day/IWD.jpg",
};

/* Gradient themes for festivals without photos (fallback only) */
const CARD_BG = {
  default: 'linear-gradient(135deg, #3D1F0A 0%, #7B4A00 100%)',
};

/* ── Gallery photos — flat uniform grid (no span variants to avoid gaps) ── */
const GALLERY = [
  { src: '/assets/festivals/navratri/navratri.jpg',       label: 'Navratri' },
  { src: '/assets/festivals/navratri/navratri1.jpg',      label: 'Navratri' },
  { src: '/assets/festivals/navratri/navratri2.jpg',      label: 'Navratri' },
  { src: '/assets/festivals/navratri/navratri3.jpg',      label: 'Navratri' },
  { src: '/assets/festivals/janamstami/janmastami.jpg',   label: 'Janmashtami' },
  { src: '/assets/festivals/janamstami/janmastami1.jpg',  label: 'Janmashtami' },
  { src: '/assets/festivals/holi/holi.jpg',               label: 'Holi' },
  { src: '/assets/festivals/holi/holi1.jpg',              label: 'Holi' },
  { src: '/assets/festivals/holi/holika-dahan.jpg',       label: 'Holika Dahan' },
  { src: '/assets/festivals/ganesh-chaturthi/ganesh-chaturthi.jpg', label: 'Ganesh Chaturthi' },
  { src: '/assets/festivals/ganesh-chaturthi/ganeshji.jpg',          label: 'Ganesh Chaturthi' },
  { src: '/assets/festivals/raksha-bandhan/raksha-bandhan.jpg',       label: 'Raksha Bandhan' },
  { src: '/assets/festivals/raksha-bandhan/raksha-bandhan1.jpg',      label: 'Raksha Bandhan' },
  { src: '/assets/festivals/raksha-bandhan/raksha-bandhan2.jpg',      label: 'Raksha Bandhan' },
  { src: '/assets/festivals/guru-purnima.jpg',            label: 'Guru Purnima' },
  { src: '/assets/festivals/deepavali/deepavali.jpg',     label: 'Deepavali' },
  { src: "/assets/festivals/international%20women%27s%20day/IWD.jpg",  label: "Women's Day" },
  { src: "/assets/festivals/international%20women%27s%20day/IWD1.jpg", label: "Women's Day" },
  { src: "/assets/festivals/international%20women%27s%20day/IWD2.jpg", label: "Women's Day" },
  { src: '/assets/festivals/mahashivratri.jpg',           label: 'Mahashivratri' },
];

/* 4 festival elements (how we celebrate) */
const ELEMENTS = [
  {
    icon: '🔥',
    name: { en: 'Yagya', hi: 'यज्ञ', kn: 'ಯಜ್ಞ' },
    desc: {
      en: 'Sacred fire offerings with Gayatri mantras — purifying the space and the heart.',
      hi: 'गायत्री मंत्रों के साथ पवित्र अग्नि में आहुति — स्थान और हृदय को शुद्ध करती है।',
      kn: 'ಗಾಯತ್ರಿ ಮಂತ್ರಗಳೊಂದಿಗೆ ಪವಿತ್ರ ಅಗ್ನಿಯಲ್ಲಿ ಆಹುತಿ — ಸ್ಥಳ ಮತ್ತು ಹೃದಯ ಶುದ್ಧಗೊಳಿಸುತ್ತದೆ.',
    },
  },
  {
    icon: '🎶',
    name: { en: 'Kirtan', hi: 'कीर्तन', kn: 'ಕೀರ್ತನ' },
    desc: {
      en: 'Devotional songs and bhajans that lift the spirit and unite everyone in shared joy.',
      hi: 'भक्तिपूर्ण भजन और कीर्तन जो भाव को ऊपर उठाते हैं और सबको साझा आनंद में एक करते हैं।',
      kn: 'ಭಕ್ತಿಪೂರ್ಣ ಭಜನ ಮತ್ತು ಕೀರ್ತನ — ಭಾವ ಎತ್ತುತ್ತದೆ ಮತ್ತು ಎಲ್ಲರನ್ನೂ ಒಂದಾಗಿಸುತ್ತದೆ.',
    },
  },
  {
    icon: '📖',
    name: { en: 'Satsang', hi: 'सत्संग', kn: 'ಸತ್ಸಂಗ' },
    desc: {
      en: "A short discourse on the true meaning of the festival, rooted in Gurudev's wisdom.",
      hi: 'पर्व के सच्चे अर्थ पर एक लघु प्रवचन — गुरुदेव के ज्ञान में निहित।',
      kn: 'ಹಬ್ಬದ ನಿಜ ಅರ್ಥದ ಬಗ್ಗೆ ಸಣ್ಣ ಪ್ರವಚನ — ಗುರುದೇವ್ ಅವರ ಜ್ಞಾನದಲ್ಲಿ ಬೇರೂರಿದ.',
    },
  },
  {
    icon: '🪔',
    name: { en: 'Prasad', hi: 'प्रसाद', kn: 'ಪ್ರಸಾದ' },
    desc: {
      en: "Sacred food shared among all — a symbol of the Gayatri Pariwar's open, generous spirit.",
      hi: 'सभी में बँटा पवित्र प्रसाद — गायत्री परिवार की उदार भावना का प्रतीक।',
      kn: 'ಎಲ್ಲರಲ್ಲಿ ಹಂಚಿದ ಪ್ರಸಾದ — ಪರಿವಾರದ ಮುಕ್ತ, ಉದಾರ ಭಾವನೆಯ ಸಂಕೇತ.',
    },
  },
];

const L = (obj, locale) => (obj && (obj[locale] || obj.en)) || '';

export default async function FestivalsPage({ params }) {
  const { locale } = await params;
  const loc = (obj) => L(obj, locale);

  const highlights = (festivalsData.sections[0]?.highlights?.[locale]
    || festivalsData.sections[0]?.highlights?.en
    || []);

  const lbl = {
    eyebrow:       loc({ en: 'What We Offer', hi: 'हम क्या प्रदान करते हैं', kn: 'ನಾವು ಏನು ನೀಡುತ್ತೇವೆ' }),
    introTitle:    loc(festivalsData.sections[0].title),
    cardsEye:      loc({ en: 'Through the Year', hi: 'वर्ष भर', kn: 'ವರ್ಷವಿಡೀ' }),
    cardsTitle:    loc({ en: 'Our Festival Celebrations', hi: 'हमारे पर्व उत्सव', kn: 'ನಮ್ಮ ಹಬ್ಬ ಆಚರಣೆಗಳು' }),
    cardsSub:      loc({
      en: 'Every major Indian festival — observed together with yagya, kirtan, satsang, and prasad. Free and open to all.',
      hi: 'हर प्रमुख भारतीय पर्व — यज्ञ, कीर्तन, सत्संग और प्रसाद के साथ। निःशुल्क और सबके लिए।',
      kn: 'ಪ್ರತಿ ಪ್ರಮುಖ ಭಾರತೀಯ ಹಬ್ಬ — ಯಜ್ಞ, ಕೀರ್ತನ, ಸತ್ಸಂಗ ಮತ್ತು ಪ್ರಸಾದದೊಂದಿಗೆ. ಉಚಿತ ಮತ್ತು ಎಲ್ಲರಿಗೂ ಮುಕ್ತ.',
    }),
    galleryEye:    loc({ en: 'Real Moments', hi: 'असली पल', kn: 'ನಿಜ ಕ್ಷಣಗಳು' }),
    galleryTitle:  loc({ en: 'From Our Celebrations', hi: 'हमारे उत्सवों की झलक', kn: 'ನಮ್ಮ ಆಚರಣೆಗಳ ಕ್ಷಣಗಳು' }),
    elementsEye:   loc({ en: 'Every Festival', hi: 'हर पर्व पर', kn: 'ಪ್ರತಿ ಹಬ್ಬದಂದು' }),
    elementsTitle: loc({ en: 'How Every Festival Unfolds', hi: 'हर पर्व कैसे मनाया जाता है', kn: 'ಪ್ರತಿ ಹಬ್ಬ ಹೇಗೆ ಆಚರಿಸಲಾಗುತ್ತದೆ' }),
    resourcesEye:  loc({ en: 'Learn More', hi: 'और जानें', kn: 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ' }),
    resourcesTitle:loc({ en: 'Deepen Your Understanding', hi: 'अपनी समझ को गहरा करें', kn: 'ನಿಮ್ಮ ಜ್ಞಾನ ಆಳಗೊಳಿಸಿ' }),
    ctaTitle:      loc(festivalsData.cta.title),
    ctaBody:       loc(festivalsData.cta.text),
    ctaBtn:        loc(festivalsData.cta.buttonLabel),
    contact:       loc({ en: 'Contact Us', hi: 'संपर्क करें', kn: 'ಸಂಪರ್ಕಿಸಿ' }),
    allPrograms:   loc({ en: 'All Programs', hi: 'सभी कार्यक्रम', kn: 'ಎಲ್ಲ ಕಾರ್ಯಕ್ರಮಗಳು' }),
  };

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { name: locale === 'hi' ? 'होम' : locale === 'kn' ? 'ಮುಖಪುಟ' : 'Home', path: '/' },
          { name: locale === 'hi' ? 'कार्यक्रम' : locale === 'kn' ? 'ಕಾರ್ಯಕ್ರಮಗಳು' : 'Programs', path: '/programs' },
          { name: locale === 'hi' ? 'पर्व उत्सव' : locale === 'kn' ? 'ಹಬ್ಬಗಳು' : 'Festivals', path: '/programs/festivals' },
        ]}
      />
      <JsonLd data={festivalEventsJsonLd(locale)} id="festival-events" />
      {/* ── Hero ── */}
      <HeroSection
        title={loc(festivalsData.hero.title)}
        subtitle={loc(festivalsData.hero.tagline)}
      />

      {/* ── Intro band ── */}
      <section className="fst-intro">
        <img
          src="/assets/designs/design8.png"
          alt=""
          className="fst-intro__mandala"
          aria-hidden="true"
        />
        <div className="fst-intro__inner">
          {/* Left: rich body text */}
          <div>
            <span className="fst-intro__eyebrow">{lbl.eyebrow}</span>
            <h2 className="fst-intro__title">{lbl.introTitle}</h2>
            <ReadMore locale={locale} lines={6} mobileLines={3}>
              <p className="fst-intro__text">
                {loc(festivalsData.sections[0].body)}
              </p>
            </ReadMore>
          </div>

          {/* Right: highlight bullets */}
          <ul className="fst-intro__highlights">
            {highlights.map((h, i) => (
              <Reveal key={i} as="li" className="fst-intro__hl">
                <span className="fst-intro__hl-num">{i + 1}</span>
                <span className="fst-intro__hl-text">{h}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Mandala divider ── */}
      <div style={{ background: 'var(--cream)', display: 'flex', justifyContent: 'center' }}>
        <img src="/assets/designs/design4.png" alt="" className="fst-divider" aria-hidden="true" />
      </div>

      {/* ── Festival cards grid ── */}
      <section className="fst-cards-section">
        <div className="fst-cards-header">
          <span className="fst-cards-eyebrow">{lbl.cardsEye}</span>
          <h2 className="fst-cards-title">{lbl.cardsTitle}</h2>
          <p className="fst-cards-sub">{lbl.cardsSub}</p>
        </div>

        <div className="fst-grid">
          {festivalsData.festivals.map((fest, i) => {
            const img = CARD_IMG[fest.id];
            const bg  = CARD_BG[fest.id] || CARD_BG.default;
            const whenText = loc(fest.when);

            return (
              <Reveal
                key={fest.id}
                as="article"
                className="fst-card"
                style={{ '--i': i % 3 }}
              >
                {img ? (
                  <div className="fst-card__img-wrap">
                    <img src={img} alt={loc(fest.name)} loading="lazy" />
                    <div className="fst-card__img-grad" />
                    <span className="fst-card__when">{whenText}</span>
                  </div>
                ) : (
                  <div className="fst-card__placeholder" style={{ background: bg }}>
                    <img
                      src="/assets/designs/design8.png"
                      alt=""
                      className="fst-card__placeholder-mandala"
                      aria-hidden="true"
                    />
                    <span className="fst-card__placeholder-label">{whenText}</span>
                  </div>
                )}

                <div className="fst-card__body">
                  <h3 className="fst-card__name">{loc(fest.name)}</h3>
                  <div className="fst-card__divider" />
                  <ReadMore locale={locale} lines={4} mobileLines={3}>
                    <p className="fst-card__desc">{loc(fest.description)}</p>
                  </ReadMore>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── Photo gallery — uniform grid, no gaps ── */}
      <section className="fst-gallery">
        <div className="fst-gallery__header">
          <span className="fst-gallery__eyebrow">{lbl.galleryEye}</span>
          <h2 className="fst-gallery__title">{lbl.galleryTitle}</h2>
        </div>

        <div className="fst-gallery__grid">
          {GALLERY.map((photo, i) => (
            <Reveal
              key={i}
              as="div"
              className="fst-photo"
              style={{ '--i': i % 8 }}
            >
              <img src={photo.src} alt={photo.label} loading="lazy" />
              <span className="fst-photo__label">{photo.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── How every festival unfolds ── */}
      <section className="fst-elements">
        <div className="fst-elements__header">
          <span className="fst-elements__eyebrow">{lbl.elementsEye}</span>
          <h2 className="fst-elements__title">{lbl.elementsTitle}</h2>
        </div>

        <div className="fst-elements__grid">
          {ELEMENTS.map((el, i) => (
            <Reveal key={i} as="div" className="fst-element" style={{ '--i': i }}>
              <span className="fst-element__icon">{el.icon}</span>
              <h3 className="fst-element__name">{loc(el.name)}</h3>
              <p className="fst-element__desc">{loc(el.desc)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Resources ── */}
      {festivalsData.resources?.length > 0 && (
        <section className="fst-resources">
          <div className="fst-resources__header">
            <span className="fst-resources__eyebrow">{lbl.resourcesEye}</span>
            <h3 className="fst-resources__title">{lbl.resourcesTitle}</h3>
          </div>
          <div className="fst-resources__grid">
            {festivalsData.resources.map((res) => (
              <Reveal key={res.id} as="a" className="fst-resource-card" href={res.read} target="_blank" rel="noopener noreferrer">
                <span className="fst-resource-card__type">
                  {res.type === 'book' ? '📚' : '🔗'}
                </span>
                <div>
                  <div className="fst-resource-card__title">{loc(res.title)}</div>
                  <div className="fst-resource-card__hint">
                    {res.type === 'book'
                      ? (locale === 'hi' ? 'पुस्तक · AWGP' : locale === 'kn' ? 'ಪುಸ್ತಕ · AWGP' : 'Book · AWGP')
                      : (locale === 'hi' ? 'लेख · AWGP.org' : locale === 'kn' ? 'ಲೇಖನ · AWGP.org' : 'Article · AWGP.org')}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA strip ── */}
      <section className="fst-cta">
        <img
          src="/assets/designs/Website- design idea - Copy (5).png"
          alt=""
          className="fst-cta__mandala"
          aria-hidden="true"
        />
        <div className="fst-cta__inner">
          <h2 className="fst-cta__title">{lbl.ctaTitle}</h2>
          <p className="fst-cta__text">{lbl.ctaBody}</p>
          <div className="fst-cta__btns">
            <Link href={festivalsData.cta.link} className="btn btn-primary">{lbl.ctaBtn}</Link>
            <a
              href="https://wa.me/919243755613"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline only-desktop"
              style={{ borderColor: 'rgba(255,255,255,0.35)', color: '#fff' }}
            >
              💬 WhatsApp
            </a>
            <a
              href="tel:+919243755613"
              className="btn btn-outline only-mobile"
              style={{ borderColor: 'rgba(255,255,255,0.35)', color: '#fff' }}
            >
              📞 {locale === 'hi' ? 'कॉल करें' : locale === 'kn' ? 'ಕರೆ ಮಾಡಿ' : 'Call Us'}
            </a>
            <Link
              href="/programs"
              className="btn btn-outline"
              style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.65)' }}
            >
              ← {lbl.allPrograms}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
