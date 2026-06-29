import { notFound } from 'next/navigation';
import { Link } from '../../../../lib/i18n/navigation';
import HeroSection from '../../../../components/ui/HeroSection';
import Reveal from '../../../../components/ui/Reveal';
import ReadMore from '../../../../components/ui/ReadMore';
import Breadcrumbs from '../../../../components/seo/Breadcrumbs';
import FaqSection from '../../../../components/seo/FaqSection';
import JsonLd from '../../../../components/seo/JsonLd';
import { buildMetadata, localeUrl } from '../../../../lib/seo/metadata';
import { eventSchema } from '../../../../lib/seo/schema';
import { getFaqs } from '../../../../lib/seo/faqs';
import programTypesData from '../../../../data/program-types.json';
import yagyaData       from '../../../../data-json-files/programs/yagya.json';
import bookFairData    from '../../../../data-json-files/programs/book-fairs.json';
import treePlantData   from '../../../../data-json-files/programs/tree-plantation-our-work-section.json';
import eventsData      from '../../../../data/programs.json';
import './ProgramDetail.css';

export async function generateStaticParams() {
  return programTypesData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const program = programTypesData.find((p) => p.slug === slug);
  if (!program) return {};
  const L = (obj) => (obj && (obj[locale] || obj.en)) || '';
  return buildMetadata({
    locale,
    path: `/programs/${slug}`,
    title: L(program.title),
    description: L(program.subtitle) || L(program.intro),
  });
}

const CHECK_ICON = (
  <svg className="pd-highlights__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default async function ProgramDetailPage({ params }) {
  const { locale, slug } = await params;
  const program = programTypesData.find((p) => p.slug === slug);
  if (!program) notFound();

  const L = (obj) => (obj && (obj[locale] || obj.en)) || '';

  /* ── Breadcrumb + per-program structured data (invisible, design-safe) ── */
  const programsLabel = locale === 'hi' ? 'कार्यक्रम' : locale === 'kn' ? 'ಕಾರ್ಯಕ್ರಮಗಳು' : 'Programs';
  const homeLabel = locale === 'hi' ? 'होम' : locale === 'kn' ? 'ಮುಖಪುಟ' : 'Home';
  const festivalEvents =
    slug === 'festivals'
      ? eventsData.map((e) =>
          eventSchema({
            name: e.title[locale] || e.title.en,
            startDate: e.date,
            description: e.desc[locale] || e.desc.en,
            image: e.img,
            url: localeUrl(locale, '/programs/festivals'),
            locationName: e.location[locale] || e.location.en,
            registrationUrl: localeUrl(locale, '/contact'),
          })
        )
      : [];
  const seo = (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { name: homeLabel, path: '/' },
          { name: programsLabel, path: '/programs' },
          { name: L(program.title), path: `/programs/${slug}` },
        ]}
      />
      {festivalEvents.length > 0 && <JsonLd data={festivalEvents} id="festival-events" />}
    </>
  );

  /* ── Shared labels ── */
  const lbl = {
    schedule:   locale === 'hi' ? '📅 समय-सारणी'          : locale === 'kn' ? '📅 ವೇಳಾಪಟ್ಟಿ'            : '📅 Schedule',
    join:       locale === 'hi' ? '🙏 साधना में भाग लें'    : locale === 'kn' ? '🙏 ಸೇರಿ'                : '🙏 Join This Program',
    contact:    locale === 'hi' ? 'संपर्क करें'             : locale === 'kn' ? 'ಸಂಪರ್ಕಿಸಿ'              : 'Get in Touch',
    whatsapp:   'WhatsApp',
    joinDesc:   locale === 'hi'
      ? 'सभी कार्यक्रम निःशुल्क और सभी के लिए खुले हैं।'
      : locale === 'kn'
      ? 'ಎಲ್ಲ ಕಾರ್ಯಕ್ರಮಗಳು ಉಚಿತ ಮತ್ತು ಎಲ್ಲರಿಗೂ ಮುಕ್ತ.'
      : 'All programs are free and open to all. Contact us for dates and details.',
    highlights: locale === 'hi' ? 'मुख्य विशेषताएं'        : locale === 'kn' ? 'ಮುಖ್ಯ ವಿಶೇಷತೆಗಳು'       : 'Key Highlights',
    festivals:  locale === 'hi' ? 'त्योहार जो हम मनाते हैं' : locale === 'kn' ? 'ನಾವು ಆಚರಿಸುವ ಹಬ್ಬಗಳು' : 'Festivals We Celebrate',
    yagyaTypes: locale === 'hi' ? 'यज्ञ के प्रकार'          : locale === 'kn' ? 'ಯಜ್ಞ ಪ್ರಕಾರಗಳು'         : 'Types of Yagya',
    allProgs:   locale === 'hi' ? 'सभी कार्यक्रम'            : locale === 'kn' ? 'ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳು'    : 'All Programs',
    ctaEye:     locale === 'hi' ? 'हमारे साथ जुड़ें'         : locale === 'kn' ? 'ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ'        : 'Come Join Us',
    ctaTitle:   locale === 'hi' ? 'हमारे परिवार का हिस्सा बनें' : locale === 'kn' ? 'ನಮ್ಮ ಪರಿವಾರ ಸೇರಿ' : 'Be Part of Our Pariwar',
    ctaBody:    locale === 'hi'
      ? 'साधना और सेवा की यात्रा में हमारे साथ आएं।'
      : locale === 'kn'
      ? 'ಸಾಧನೆ ಮತ್ತು ಸೇವೆಯ ಪ್ರಯಾಣದಲ್ಲಿ ನಮ್ಮೊಂದಿಗೆ ಬನ್ನಿ.'
      : 'Come join us on the journey of Sadhana and Seva.',
  };

  /* ── Sidebar ── */
  const Sidebar = () => (
    <aside className="pd-sidebar">
      {program.schedule && (
        <div className="pd-card">
          <h4 className="pd-card__title">{lbl.schedule}</h4>
          <p className="pd-card__body">{L(program.schedule)}</p>
        </div>
      )}
      <div className="pd-card pd-card--cta">
        <h4 className="pd-card__title">{lbl.join}</h4>
        <p className="pd-card__body">{lbl.joinDesc}</p>
        <Link href="/contact" className="btn btn-primary" style={{ marginTop: '1.1rem', display: 'flex', justifyContent: 'center' }}>
          {lbl.contact}
        </Link>
        <a
          href="https://wa.me/919243755613"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
          style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}
        >
          💬 {lbl.whatsapp}
        </a>
      </div>
    </aside>
  );

  /* ── Bottom CTA strip ── */
  const CtaStrip = () => (
    <section className="pd-cta-strip">
      <div className="pd-cta-strip__inner">
        <span className="pd-cta-strip__eye">{lbl.ctaEye}</span>
        <h2 className="pd-cta-strip__title">{lbl.ctaTitle}</h2>
        <p className="pd-cta-strip__body">{lbl.ctaBody}</p>
        <div className="pd-cta-strip__btns">
          <Link href="/contact" className="btn btn-primary">{lbl.contact}</Link>
          <Link href="/programs" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.35)', color: '#fff' }}>
            {lbl.allProgs}
          </Link>
        </div>
      </div>
    </section>
  );

  /* ─────────────────────────────────────────────────────────
     FESTIVALS
  ───────────────────────────────────────────────────────── */
  if (slug === 'festivals') {
    return (
      <>
        {seo}
        <HeroSection
          title={L(program.title)}
          subtitle={L(program.subtitle)}
        />
        <div className="pd-page">
          <div className="pd-layout">
            {/* Main */}
            <div>
              {/* Intro */}
              <Reveal as="div" className="pd-intro">
                <ReadMore locale={locale} lines={5} mobileLines={3}>
                  <p className="pd-intro__text">{L(program.intro)}</p>
                </ReadMore>
              </Reveal>

              {/* Festival chips */}
              <Reveal as="div" className="pd-festivals">
                <h3 className="pd-sec-title">🪔 {lbl.festivals}</h3>
                <div className="pd-chips">
                  {program.festivals.map((f, i) => (
                    <Reveal key={i} as="span" className="pd-chip">
                      {L(f.name)}
                    </Reveal>
                  ))}
                </div>
              </Reveal>

              {/* How we celebrate */}
              <Reveal as="div" className="pd-section-block">
                <h3 className="pd-sec-title">✨ {locale === 'hi' ? 'हम कैसे मनाते हैं' : locale === 'kn' ? 'ನಾವು ಹೇಗೆ ಆಚರಿಸುತ್ತೇವೆ' : 'How We Celebrate'}</h3>
                <ReadMore locale={locale} lines={5} mobileLines={3}>
                  <p className="pd-section-body">
                    {locale === 'hi'
                      ? 'प्रत्येक पर्व पर हम यज्ञ, कीर्तन, सत्संग और प्रसाद के साथ एकजुट होते हैं। ये आयोजन हिंदू पंचांग के अनुसार मनाए जाते हैं और सभी के लिए पूरी तरह निःशुल्क हैं। इन उत्सवों में शामिल होकर आप सामूहिक आध्यात्मिक ऊर्जा का अनुभव कर सकते हैं।'
                      : locale === 'kn'
                      ? 'ಪ್ರತಿ ಹಬ್ಬದಂದು ನಾವು ಯಜ್ಞ, ಕೀರ್ತನ, ಸತ್ಸಂಗ ಮತ್ತು ಪ್ರಸಾದದೊಂದಿಗೆ ಒಟ್ಟಿಗೆ ಸೇರುತ್ತೇವೆ. ಈ ಕಾರ್ಯಕ್ರಮಗಳು ಹಿಂದೂ ಪಂಚಾಂಗ ಅನ್ವಯ ಆಚರಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಎಲ್ಲರಿಗೂ ಉಚಿತ.'
                      : 'Every festival at AWGP Bengaluru comes alive with Yagya, kirtan, satsang, and prasad. Events follow the Hindu Panchang and are free and open to all. These gatherings carry the warmth of a shared spiritual family — whether you are new or have been with us for years, you are always welcome.'}
                  </p>
                </ReadMore>
              </Reveal>
            </div>
            <Sidebar />
          </div>
        </div>
        <CtaStrip />
      </>
    );
  }

  /* ─────────────────────────────────────────────────────────
     YAGYA EVENTS
  ───────────────────────────────────────────────────────── */
  if (slug === 'yagya-events') {
    const KUND_MAP = { '24': '24', '9': '9', '5': '5', '3': '3', 'home': '🏠' };
    return (
      <>
        {seo}
        <HeroSection
          title={L(program.title)}
          subtitle={L(program.subtitle)}
        />
        <div className="pd-page">
          <div className="pd-layout">
            <div>
              {/* Intro from yagya.json hero */}
              <Reveal as="div" className="pd-intro">
                <ReadMore locale={locale} lines={5} mobileLines={3}>
                  <p className="pd-intro__text">{L(yagyaData.hero.intro)}</p>
                </ReadMore>
              </Reveal>

              {/* What is Yagya section */}
              {yagyaData.sections.map((sec) => (
                <Reveal key={sec.id} as="div" className="pd-section-block">
                  <h3 className="pd-sec-title">🔥 {L(sec.title)}</h3>
                  <ReadMore locale={locale} lines={6} mobileLines={3}>
                    <p className="pd-section-body">{L(sec.body)}</p>
                  </ReadMore>
                  {sec.highlights && (
                    <ul className="pd-section-highlights" style={{ marginTop: '1rem' }}>
                      {L(sec.highlights).map((h, i) => <li key={i}>{h}</li>)}
                    </ul>
                  )}
                </Reveal>
              ))}

              {/* Yagya types grid */}
              <Reveal as="div">
                <h3 className="pd-sec-title">🪔 {lbl.yagyaTypes}</h3>
                <div className="pd-yagya-grid">
                  {yagyaData.yagyaTypes.map((t) => (
                    <Reveal key={t.id} as="div" className="pd-yagya-card">
                      <span className="pd-yagya-num">{KUND_MAP[t.kunds] ?? t.kunds}</span>
                      <strong className="pd-yagya-name">{L(t.title)}</strong>
                      <p className="pd-yagya-desc">{L(t.description)}</p>
                    </Reveal>
                  ))}
                </div>
              </Reveal>

              {/* CTA from yagya.json */}
              <Reveal as="div" className="pd-intro" style={{ marginTop: '1rem' }}>
                <p className="pd-intro__text" style={{ fontStyle: 'italic', color: 'var(--maroon)' }}>
                  {L(yagyaData.cta.text)}
                </p>
              </Reveal>
            </div>
            <Sidebar />
          </div>
        </div>
        <FaqSection
          items={getFaqs('yagya', locale)}
          eyebrow={locale === 'hi' ? 'यज्ञ के बारे में' : locale === 'kn' ? 'ಯಜ್ಞದ ಬಗ್ಗೆ' : 'About Yagya'}
          heading={locale === 'hi' ? 'यज्ञ — अक्सर पूछे जाने वाले प्रश्न' : locale === 'kn' ? 'ಯಜ್ಞ — ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು' : 'Yagya — Frequently Asked Questions'}
          id="yagya-faq"
          background="cream-dark"
        />
        <CtaStrip />
      </>
    );
  }

  /* ─────────────────────────────────────────────────────────
     BOOK FAIR
  ───────────────────────────────────────────────────────── */
  if (slug === 'book-fair') {
    return (
      <>
        {seo}
        <HeroSection
          title={L(program.title)}
          subtitle={L(program.subtitle)}
        />
        <div className="pd-page">
          <div className="pd-layout">
            <div>
              {/* Intro */}
              <Reveal as="div" className="pd-intro">
                <ReadMore locale={locale} lines={5} mobileLines={3}>
                  <p className="pd-intro__text">{L(bookFairData.hero.intro)}</p>
                </ReadMore>
              </Reveal>

              {/* Key highlights from program-types */}
              {program.points?.length > 0 && (
                <Reveal as="div">
                  <h3 className="pd-sec-title">📚 {lbl.highlights}</h3>
                  <ul className="pd-highlights">
                    {program.points.map((p, i) => (
                      <Reveal key={i} as="li">
                        {CHECK_ICON}
                        {L(p)}
                      </Reveal>
                    ))}
                  </ul>
                </Reveal>
              )}

              {/* What you find */}
              <Reveal as="div" className="pd-categories">
                <h3 className="pd-sec-title">📖 {L(bookFairData.categories.heading)}</h3>
                <div className="pd-cat-grid">
                  {bookFairData.categories.items.map((item, i) => (
                    <Reveal key={i} as="div" className="pd-cat-item">
                      <span className="pd-cat-dot" />
                      {L(item)}
                    </Reveal>
                  ))}
                </div>
              </Reveal>

              {/* CTA from book-fairs.json */}
              <Reveal as="div" className="pd-section-block">
                <h3 className="pd-sec-title">🌟 {L(bookFairData.cta.heading)}</h3>
                <ReadMore locale={locale} lines={4} mobileLines={3}>
                  <p className="pd-section-body">{L(bookFairData.cta.body)}</p>
                </ReadMore>
              </Reveal>
            </div>
            <Sidebar />
          </div>
        </div>
        <CtaStrip />
      </>
    );
  }

  /* ─────────────────────────────────────────────────────────
     TREE PLANTATION
  ───────────────────────────────────────────────────────── */
  if (slug === 'tree-plantation') {
    return (
      <>
        {seo}
        <HeroSection
          title={L(program.title)}
          subtitle={L(program.subtitle)}
        />
        <div className="pd-page">
          <div className="pd-layout">
            <div>
              {/* Stat block */}
              <Reveal as="div" className="pd-stat-block">
                <div className="pd-stat-item">
                  <span className="pd-stat-big">1,500+</span>
                  <span className="pd-stat-lbl">{locale === 'hi' ? 'वृक्ष लगाए' : locale === 'kn' ? 'ಮರಗಳು ನೆಟ್ಟವು' : 'Trees Planted'}</span>
                </div>
                <div className="pd-stat-item">
                  <span className="pd-stat-big">10+</span>
                  <span className="pd-stat-lbl">{locale === 'hi' ? 'वर्षों का अनुभव' : locale === 'kn' ? 'ವರ್ಷಗಳ ಅನುಭವ' : 'Years of Service'}</span>
                </div>
                <div className="pd-stat-item">
                  <span className="pd-stat-big">∞</span>
                  <span className="pd-stat-lbl">{locale === 'hi' ? 'सेवा का संकल्प' : locale === 'kn' ? 'ಸೇವೆಯ ಪ್ರತಿಜ್ಞೆ' : 'Seva Spirit'}</span>
                </div>
              </Reveal>

              {/* Intro from tree-plantation-our-work-section.json */}
              <Reveal as="div" className="pd-intro">
                <ReadMore locale={locale} lines={6} mobileLines={3}>
                  <p className="pd-intro__text">{L(treePlantData.body)}</p>
                </ReadMore>
              </Reveal>

              {/* Highlights from json */}
              {treePlantData.highlights && (
                <Reveal as="div">
                  <h3 className="pd-sec-title">🌳 {lbl.highlights}</h3>
                  <ul className="pd-highlights">
                    {L(treePlantData.highlights).map((h, i) => (
                      <Reveal key={i} as="li">
                        {CHECK_ICON}
                        {h}
                      </Reveal>
                    ))}
                  </ul>
                </Reveal>
              )}

              {/* Additional points from program-types */}
              {program.points?.length > 0 && (
                <Reveal as="div" className="pd-section-block">
                  <h3 className="pd-sec-title">🌿 {locale === 'hi' ? 'हमारी पहल' : locale === 'kn' ? 'ನಮ್ಮ ಉಪಕ್ರಮ' : 'Our Initiatives'}</h3>
                  <ul className="pd-section-highlights">
                    {program.points.map((p, i) => <li key={i}>{L(p)}</li>)}
                  </ul>
                </Reveal>
              )}
            </div>
            <Sidebar />
          </div>
        </div>
        <CtaStrip />
      </>
    );
  }

  /* ─────────────────────────────────────────────────────────
     GENERIC FALLBACK (akhand-jap, bal-sanskar-shala, etc.)
  ───────────────────────────────────────────────────────── */
  return (
    <>
      {seo}
      <HeroSection
        title={L(program.title)}
        subtitle={L(program.subtitle)}
      />
      <div className="pd-page">
        <div className="pd-layout">
          <div>
            {/* Intro */}
            <Reveal as="div" className="pd-intro">
              <ReadMore locale={locale} lines={6} mobileLines={3}>
                <p className="pd-intro__text">{L(program.intro)}</p>
              </ReadMore>
            </Reveal>

            {/* Highlights */}
            {program.points?.length > 0 && (
              <Reveal as="div">
                <h3 className="pd-sec-title">✨ {lbl.highlights}</h3>
                <ul className="pd-highlights">
                  {program.points.map((p, i) => (
                    <Reveal key={i} as="li">
                      {CHECK_ICON}
                      {L(p)}
                    </Reveal>
                  ))}
                </ul>
              </Reveal>
            )}

            {/* Festival chips (fallback) */}
            {program.festivals?.length > 0 && (
              <Reveal as="div" className="pd-festivals">
                <h3 className="pd-sec-title">🪔 {lbl.festivals}</h3>
                <div className="pd-chips">
                  {program.festivals.map((f, i) => (
                    <Reveal key={i} as="span" className="pd-chip">
                      {L(f.name)}
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Yagya types (fallback) */}
            {program.yagyaTypes?.length > 0 && (
              <Reveal as="div">
                <h3 className="pd-sec-title">🔥 {lbl.yagyaTypes}</h3>
                <div className="pd-yagya-grid">
                  {program.yagyaTypes.map((y, i) => (
                    <Reveal key={i} as="div" className="pd-yagya-card">
                      <span className="pd-yagya-num">{i + 1}</span>
                      <strong className="pd-yagya-name">{L(y.name)}</strong>
                      <p className="pd-yagya-desc">{L(y.desc)}</p>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
          <Sidebar />
        </div>
      </div>
      <CtaStrip />
    </>
  );
}
