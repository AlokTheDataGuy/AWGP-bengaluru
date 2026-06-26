import { Link } from '../../lib/i18n/navigation';
import Reveal from '../ui/Reveal';
import ReadMore from '../ui/ReadMore';
import './ActivityArticle.css';

const UI = {
  highlights: { en: 'At a Glance', hi: 'मुख्य बातें', kn: 'ಮುಖ್ಯಾಂಶಗಳು' },
  participate: { en: '🙏 Take Part', hi: '🙏 भाग लें', kn: '🙏 ಭಾಗವಹಿಸಿ' },
  participateDesc: {
    en: 'Contact us for more information or to register — all are welcome, no prior experience needed.',
    hi: 'अधिक जानकारी या पंजीकरण के लिए हमसे संपर्क करें — सभी का स्वागत है, पूर्व-अनुभव आवश्यक नहीं।',
    kn: 'ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಅಥವಾ ನೋಂದಣಿಗಾಗಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ — ಎಲ್ಲರಿಗೂ ಸ್ವಾಗತ, ಪೂರ್ವಾನುಭವ ಅಗತ್ಯವಿಲ್ಲ.',
  },
  getInTouch: { en: 'Get in Touch', hi: 'संपर्क करें', kn: 'ಸಂಪರ್ಕಿಸಿ' },
  whatsapp: { en: '💬 WhatsApp', hi: '💬 WhatsApp', kn: '💬 WhatsApp' },
  read: { en: 'Read', hi: 'पढ़ें', kn: 'ಓದಿ' },
  buy: { en: 'Buy', hi: 'मँगवाएं', kn: 'ಖರೀದಿಸಿ' },
  backLabel: { en: '← All Activities', hi: '← सभी गतिविधियां', kn: '← ಎಲ್ಲಾ ಚಟುವಟಿಕೆಗಳು' },
};

const t = (locale, obj) => obj[locale] || obj.en;

export default function ActivityArticle({
  locale = 'en',
  hero,
  heroImage,
  heroImageMobile,
  sectionImage,
  sections = [],
  extra,
  resources,
}) {
  const L = (obj) => t(locale, obj);
  const [firstSection, ...restSections] = sections;

  return (
    <article className="aa-page">
      {/* ── Hero ───────────────────────────────────────── */}
      <header className="aa-hero">
        <span className="aa-hero__bg" style={heroImage ? { backgroundImage: `url('${heroImage}')` } : undefined} aria-hidden="true" />
        {heroImageMobile && (
          <span className="aa-hero__bg aa-hero__bg--mobile" style={{ backgroundImage: `url('${heroImageMobile}')` }} aria-hidden="true" />
        )}
        <span className="aa-hero__veil" aria-hidden="true" />
        <span className="aa-hero__mandala" aria-hidden="true" />
        <div className="aa-hero__inner">
          <span className="aa-hero__eyebrow">AWGP Bengaluru · Activities</span>
          <h1 className="aa-hero__title">{hero.title}</h1>
          {hero.tagline && <p className="aa-hero__tagline">{hero.tagline}</p>}
          <span className="aa-hero__divider" aria-hidden="true" />
        </div>
      </header>

      {/* ── Intro lead ─────────────────────────────────── */}
      {hero.intro && (
        <Reveal className="aa-intro section">
          <div className="section-inner">
            <p className="aa-intro__lead">{hero.intro}</p>
          </div>
        </Reveal>
      )}

      {/* ── First section: image + text split ─────────── */}
      {firstSection && (
        <Reveal className="aa-split-section section">
          <div className="section-inner">
            <div className="aa-split">
              <div className="aa-split__media">
                <span className="aa-split__img" style={sectionImage ? { backgroundImage: `url('${sectionImage}')` } : undefined} />
              </div>
              <div className="aa-split__text">
                <h2 className="aa-heading">{firstSection.heading}</h2>
                <span className="aa-rule" aria-hidden="true" />
                <ReadMore locale={locale} lines={9} mobileLines={6}>
                  <p className="aa-body">{firstSection.body}</p>
                </ReadMore>
                {firstSection.highlights?.length > 0 && (
                  <ul className="aa-checks">
                    {firstSection.highlights.map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Remaining sections: editorial bands ─────────── */}
      {restSections.map((s, i) => (
        <Reveal key={s.id} className={`aa-band section ${i % 2 === 0 ? 'aa-band--alt' : ''}`}>
          <div className="section-inner aa-band__inner">
            <h2 className="aa-heading aa-heading--center">{s.heading}</h2>
            <span className="aa-rule aa-rule--center" aria-hidden="true" />
            <ReadMore locale={locale} lines={7} mobileLines={5}>
              <p className="aa-body">{s.body}</p>
            </ReadMore>
            {s.highlights?.length > 0 && (
              <ul className="aa-checks aa-checks--center">
                {s.highlights.map((h, hi) => <li key={hi}>{h}</li>)}
              </ul>
            )}
            {s.link && (
              <a className="aa-link-cta" href={s.link.url} target="_blank" rel="noopener noreferrer">
                {s.link.label} <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </Reveal>
      ))}

      {/* ── Extra block: feeding slots / sessions ───────── */}
      {extra?.type === 'feeding' && (
        <Reveal className="aa-feeding section">
          <div className="section-inner">
            <div className="aa-feeding__head">
              <h2 className="aa-heading aa-heading--center">{extra.heading}</h2>
              <span className="aa-rule aa-rule--center" aria-hidden="true" />
              {extra.description && <p className="aa-feeding__desc">{extra.description}</p>}
            </div>
            <div className="aa-feeding__grid">
              {extra.items.map((slot, i) => (
                <div key={i} className="aa-feeding__slot">
                  <span className="aa-feeding__slot-label">{slot.label}</span>
                  <span className="aa-feeding__slot-time">{slot.time}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {extra?.type === 'sessions' && (
        <Reveal className="aa-sessions section">
          <div className="section-inner">
            <div className="aa-feeding__head">
              <h2 className="aa-heading aa-heading--center">{extra.heading}</h2>
              <span className="aa-rule aa-rule--center" aria-hidden="true" />
            </div>
            <div className="aa-sessions__grid">
              {extra.items.map((item, i) => (
                <article key={i} className="aa-session-card" style={{ '--i': i }}>
                  {item.image && <span className="aa-session-card__img" style={{ backgroundImage: `url('${item.image}')` }} />}
                  <div className="aa-session-card__body">
                    <h3 className="aa-session-card__title">{item.title}</h3>
                    <span className="aa-session-card__timing">🕐 {item.timing}</span>
                    <p className="aa-session-card__desc">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Resources ────────────────────────────────────── */}
      {resources?.links?.length > 0 && (
        <Reveal className="aa-resources section">
          <div className="section-inner">
            <div className="aa-feeding__head">
              <h2 className="aa-heading aa-heading--center">{resources.heading}</h2>
              <span className="aa-rule aa-rule--center" aria-hidden="true" />
              {resources.note && <p className="aa-feeding__desc">{resources.note}</p>}
            </div>
            <ul className="aa-resources__list">
              {resources.links.map((r) => (
                <li key={r.id} className="aa-resource">
                  <span className="aa-resource__type">{r.type || 'link'}</span>
                  <span className="aa-resource__title">
                    {r.title}
                    {r.source && <span className="aa-resource__source"> · {r.source}</span>}
                  </span>
                  <span className="aa-resource__actions">
                    {r.read && (
                      <a href={r.read} target="_blank" rel="noopener noreferrer" className="aa-resource__action">
                        {L(UI.read)} →
                      </a>
                    )}
                    {r.buy && (
                      <a href={r.buy} target="_blank" rel="noopener noreferrer" className="aa-resource__action aa-resource__action--buy">
                        {L(UI.buy)} →
                      </a>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}

      {/* ── Closing CTA ──────────────────────────────────── */}
      <Reveal className="aa-cta section">
        <div className="section-inner">
          <div className="page-cta-strip">
            <div>
              <h3>{L(UI.participate)}</h3>
              <p>{L(UI.participateDesc)}</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-white">{L(UI.getInTouch)}</Link>
              <a
                href="https://wa.me/919243755613"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
              >
                {L(UI.whatsapp)}
              </a>
            </div>
          </div>
          <Link href="/activities" className="aa-back-link">{L(UI.backLabel)}</Link>
        </div>
      </Reveal>
    </article>
  );
}
