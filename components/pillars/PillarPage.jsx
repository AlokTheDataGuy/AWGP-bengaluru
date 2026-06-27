'use client';

import { Link } from '../../lib/i18n/navigation';
import HeroSection from '../ui/HeroSection';
import Reveal from '../ui/Reveal';
import './PillarPage.css';

/* ── Canonical order of the four pillars (matches HomePillars) ──
   Sadhana · Swadhyay · Sanyam · Seva. Summaries reused on every
   pillar page's "Four Pillars" cross-link grid. */
const PILLARS = [
  {
    slug: 'sadhana',
    href: '/sadhana',
    icon: '/assets/icon/sadhna1.png',
    name: { en: 'Sadhana', hi: 'साधना', kn: 'ಸಾಧನೆ' },
    summary: {
      en: 'Refining the self through worship, japa, and meditation.',
      hi: 'उपासना, जप और ध्यान द्वारा स्वयं का परिष्कार।',
      kn: 'ಉಪಾಸನೆ, ಜಪ ಮತ್ತು ಧ್ಯಾನದ ಮೂಲಕ ಸ್ವಯಂ ಪರಿಷ್ಕಾರ.',
    },
  },
  {
    slug: 'swadhyay',
    href: '/swadhyay',
    icon: '/assets/icon/swadhayay1.png',
    name: { en: 'Swadhyay', hi: 'स्वाध्याय', kn: 'ಸ್ವಾಧ್ಯಾಯ' },
    summary: {
      en: 'Self-study — daily reading of uplifting, sattvic literature.',
      hi: 'स्वाध्याय — श्रेष्ठ, सात्विक साहित्य का नित्य अध्ययन।',
      kn: 'ಸ್ವಾಧ್ಯಾಯ — ಶ್ರೇಷ್ಠ, ಸಾತ್ವಿಕ ಸಾಹಿತ್ಯದ ನಿತ್ಯ ಅಧ್ಯಯನ.',
    },
  },
  {
    slug: 'sanyam',
    href: '/sanyam',
    icon: '/assets/icon/sanyam1.png',
    name: { en: 'Sanyam', hi: 'संयम', kn: 'ಸಂಯಮ' },
    summary: {
      en: 'Self-discipline — mastering the senses, time, thought, and resources.',
      hi: 'आत्म-अनुशासन — इंद्रिय, समय, विचार और साधनों का संयम।',
      kn: 'ಆತ್ಮ-ಶಿಸ್ತು — ಇಂದ್ರಿಯ, ಸಮಯ, ವಿಚಾರ ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳ ಸಂಯಮ.',
    },
  },
  {
    slug: 'seva',
    href: '/seva',
    icon: '/assets/icon/seva1.png',
    name: { en: 'Seva', hi: 'सेवा', kn: 'ಸೇವೆ' },
    summary: {
      en: "Selfless service — sharing one's time and gifts for the good of all.",
      hi: 'निःस्वार्थ सेवा — अपने समय और सामर्थ्य का सबके हित में योगदान।',
      kn: 'ನಿಃಸ್ವಾರ್ಥ ಸೇವೆ — ತನ್ನ ಸಮಯ ಮತ್ತು ಸಾಮರ್ಥ್ಯವನ್ನು ಎಲ್ಲರ ಹಿತಕ್ಕಾಗಿ ಹಂಚುವುದು.',
    },
  },
];

/* Static UI labels not carried in the JSON */
const UI = {
  pillarsHeading: { en: 'The Four Pillars', hi: 'चार स्तंभ', kn: 'ನಾಲ್ಕು ಸ್ತಂಭಗಳು' },
  pillarsNote: {
    en: "Gurudev's four steps for a complete life — none can be left out, like seed, soil, manure and water in farming.",
    hi: 'पूर्ण जीवन के लिए गुरुदेव के चार सूत्र — खेती में बीज, भूमि, खाद और पानी की तरह, एक भी छोड़ा नहीं जा सकता।',
    kn: 'ಸಂಪೂರ್ಣ ಜೀವನಕ್ಕಾಗಿ ಗುರುದೇವರ ನಾಲ್ಕು ಸೂತ್ರಗಳು — ಕೃಷಿಯಲ್ಲಿ ಬೀಜ, ಮಣ್ಣು, ಗೊಬ್ಬರ ಮತ್ತು ನೀರಿನಂತೆ ಯಾವುದನ್ನೂ ಬಿಡಲಾಗದು.',
  },
  current: { en: 'You are here', hi: 'आप यहाँ हैं', kn: 'ನೀವು ಇಲ್ಲಿದ್ದೀರಿ' },
  explore: { en: 'Explore', hi: 'जानें', kn: 'ಅನ್ವೇಷಿಸಿ' },
  read: { en: 'Read', hi: 'पढ़ें', kn: 'ಓದಿ' },
  ctaTitle: {
    en: 'Walk this path with us',
    hi: 'इस पथ पर हमारे साथ चलें',
    kn: 'ಈ ಪಥದಲ್ಲಿ ನಮ್ಮೊಂದಿಗೆ ನಡೆಯಿರಿ',
  },
  ctaText: {
    en: 'Every practice at AWGP Bengaluru is open to all — no prior experience needed. Reach out to begin.',
    hi: 'एडब्ल्यूजीपी बेंगलुरु की हर साधना सबके लिए खुली है — किसी पूर्व-अनुभव की आवश्यकता नहीं। आरंभ करने के लिए संपर्क करें।',
    kn: 'AWGP ಬೆಂಗಳೂರಿನ ಪ್ರತಿ ಸಾಧನೆಯೂ ಎಲ್ಲರಿಗೂ ಮುಕ್ತ — ಪೂರ್ವಾನುಭವ ಅಗತ್ಯವಿಲ್ಲ. ಆರಂಭಿಸಲು ಸಂಪರ್ಕಿಸಿ.',
  },
  ctaButton: { en: 'Get in touch', hi: 'संपर्क करें', kn: 'ಸಂಪರ್ಕಿಸಿ' },
};

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="13 6 19 12 13 18" />
  </svg>
);

/** A framed visual that gracefully falls back to a warm gradient + the
 *  pillar medallion when its background image is missing. */
function PillarFigure({ image, icon, label, tone = 'a' }) {
  return (
    <figure className={`pillar-figure pillar-figure--${tone}`} aria-hidden="true">
      <span className="pillar-figure__img" style={image ? { backgroundImage: `url('${image}')` } : undefined} />
      <span className="pillar-figure__glow" />
      {icon && <img className="pillar-figure__seal" src={icon} alt="" loading="lazy" />}
      {label && <figcaption className="pillar-figure__cap">{label}</figcaption>}
    </figure>
  );
}

export default function PillarPage({
  locale = 'en',
  slug,
  index = 1,
  hero,
  sections = [],
  feature = null,
  types = null,
  practice = null,
  resources = null,
}) {
  const L = (obj) => (obj && (obj[locale] ?? obj.en)) || '';

  return (
    <>
      <HeroSection
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        bgImage={hero.image}
        mantra={hero.mantra}
        imgIcon={hero.icon}
      />

      <div className="pillar-page" data-pillar={slug}>

      {/* ── Intro lead ───────────────────────────────────── */}
      {hero.intro && (
        <Reveal className="pillar-intro section">
          <div className="section-inner">
            <p className="pillar-intro__lead">{hero.intro}</p>
          </div>
        </Reveal>
      )}

      {/* ── Zig-zag concept sections ─────────────────────── */}
      {sections.map((s, i) => (
        <Reveal
          key={s.id}
          className={`pillar-section section ${i % 2 === 1 ? 'pillar-section--alt' : ''}`}
        >
          <div className="section-inner">
            <div className={`pillar-split ${i % 2 === 1 ? 'pillar-split--reverse' : ''}`}>
              <div className="pillar-split__media">
                <PillarFigure image={s.image} icon={hero.icon} tone={i % 2 === 1 ? 'b' : 'a'} />
              </div>
              <div className="pillar-split__text">
                {s.label && <span className="pillar-section__eyebrow">{s.label}</span>}
                <h2 className="pillar-section__title">{s.title}</h2>
                <span className="pillar-rule" aria-hidden="true" />
                <p className="pillar-body">{s.body}</p>
                {Array.isArray(s.highlights) && s.highlights.length > 0 && (
                  <ul className="pillar-checks">
                    {s.highlights.map((h, hi) => (
                      <li key={hi}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      ))}

      {/* ── Types grid (kinds of Sanyam / forms of Seva) ── */}
      {types && Array.isArray(types.items) && types.items.length > 0 && (
        <Reveal className="pillar-types section">
          <div className="section-inner">
            <div className="pillar-types__head">
              <h2 className="pillar-types__title">{types.heading}</h2>
              <span className="pillar-rule pillar-rule--center" aria-hidden="true" />
              {types.intro && <p className="pillar-types__intro">{types.intro}</p>}
            </div>

            <div className={`pillar-types__grid pillar-types__grid--${types.items.length}`}>
              {types.items.map((t, i) => (
                <article key={t.id} className="ptype-card" style={{ '--i': i }}>
                  <div className="ptype-card__media">
                    <PillarFigure image={t.image} icon={hero.icon} tone={i % 2 ? 'b' : 'a'} />
                  </div>
                  <div className="ptype-card__body">
                    <h3 className="ptype-card__name">{t.name}</h3>
                    {t.summary && <p className="ptype-card__summary">{t.summary}</p>}
                    {t.description && <p className="ptype-card__desc">{t.description}</p>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Feature band (Andolan / Jnana-Yagya / Gyan-Yagya) ── */}
      {feature && (
        <Reveal className="pillar-feature section">
          <span className="pillar-feature__mandala" aria-hidden="true" />
          <div className="section-inner">
            <div className="pillar-feature__grid">
              <div className="pillar-feature__media">
                <PillarFigure image={feature.image} icon={hero.icon} tone="light" />
              </div>
              <div className="pillar-feature__text">
                {feature.eyebrow && <span className="pillar-feature__eyebrow">{feature.eyebrow}</span>}
                <h2 className="pillar-feature__title">{feature.title}</h2>
                <span className="pillar-rule pillar-rule--gold" aria-hidden="true" />
                <p className="pillar-feature__body">{feature.body}</p>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Practice / How to begin ──────────────────────── */}
      {practice && (
        <Reveal className="pillar-practice section">
          <div className="section-inner">
            <div className="pillar-practice__card">
              <span className="pillar-practice__rays" aria-hidden="true" />
              <div className="pillar-practice__body">
                {practice.eyebrow && <span className="pillar-practice__eyebrow">{practice.eyebrow}</span>}
                <h2 className="pillar-practice__title">{practice.title}</h2>
                {practice.text && <p className="pillar-practice__text">{practice.text}</p>}
                {practice.button && (
                  practice.button.external ? (
                    <a className="btn btn-primary pillar-practice__btn" href={practice.button.href} target="_blank" rel="noopener noreferrer">
                      {practice.button.label}
                    </a>
                  ) : (
                    <Link className="btn btn-primary pillar-practice__btn" href={practice.button.href}>
                      {practice.button.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Resources / References ───────────────────────── */}
      {resources && Array.isArray(resources.items) && resources.items.length > 0 && (
        <Reveal className="pillar-res section">
          <div className="section-inner">
            <div className="pillar-res__head">
              <h2 className="pillar-res__title">{resources.heading}</h2>
              {resources.note && <p className="pillar-res__note">{resources.note}</p>}
            </div>
            <ul className="pillar-res__list">
              {resources.items.map((r, i) => (
                <li key={i} className="pillar-res__item">
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="pillar-res__link">
                    <span className="pillar-res__type">{r.type || 'link'}</span>
                    <span className="pillar-res__name">{r.title}</span>
                    <span className="pillar-res__go" aria-hidden="true">
                      {L(UI.read)} <ArrowIcon />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}

      {/* ── Closing CTA ──────────────────────────────────── */}
      <Reveal className="pillar-cta section">
        <div className="section-inner">
          <div className="page-cta-strip pillar-cta__strip">
            <div>
              <h3>{L(UI.ctaTitle)}</h3>
              <p>{L(UI.ctaText)}</p>
            </div>
            <Link href="/contact" className="btn btn-primary">{L(UI.ctaButton)}</Link>
          </div>
        </div>
      </Reveal>

      </div>
    </>
  );
}
