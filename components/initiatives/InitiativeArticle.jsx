import { Link } from '../../lib/i18n/navigation';
import HeroSection from '../ui/HeroSection';
import Reveal from '../ui/Reveal';
import ReadMore from '../ui/ReadMore';
import PhotoStrip from '../ui/PhotoStrip';
import '../activities/ActivityArticle.css';

/**
 * Editorial template for the rich, JSON-driven "initiative" pages that share a
 * common schema (meta / hero / sections / cards / events / resources / cta) —
 * Jyoti Kalash Yatra, Bhartiya Sanskriti Gyan Pariksha, Baal Sanskar Shala.
 *
 * Reuses the ActivityArticle (aa-*) visual grammar so it sits consistently
 * alongside the Gau Seva / Meditation / Yoga pages.
 *
 * @param {object}   props
 * @param {string}   props.locale
 * @param {object}   props.data          the loaded *.json content file
 * @param {string}   [props.sectionImage] image for the first section split
 * @param {string[]} [props.gallery]      photo strip srcs (from photoManifest)
 * @param {object}   [props.cardsHeading] localized heading for the cards grid
 * @param {object}   [props.backHref]     { href, label:{en,hi,kn} } back link
 */

const UI = {
  upcoming: { en: '📅 Upcoming in Bengaluru', hi: '📅 बेंगलुरु में आगामी', kn: '📅 ಬೆಂಗಳೂರಿನಲ್ಲಿ ಮುಂಬರುವ' },
  learnMore: { en: '🔗 Learn More', hi: '🔗 और जानें', kn: '🔗 ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ' },
  read: { en: 'Read', hi: 'पढ़ें', kn: 'ಓದಿ' },
  whatsapp: { en: '💬 WhatsApp', hi: '💬 WhatsApp', kn: '💬 WhatsApp' },
  call: { en: '📞 Call Us', hi: '📞 कॉल करें', kn: '📞 ಕರೆ ಮಾಡಿ' },
  glimpses: { en: '📸 Glimpses', hi: '📸 झलकियाँ', kn: '📸 ಒಂದು ನೋಟ' },
};

export default function InitiativeArticle({
  locale = 'en',
  data,
  sectionImage,
  gallery = [],
  cardsHeading,
  backHref,
}) {
  const L = (obj) => (obj && (obj[locale] || obj.en)) || '';

  const sections = data.sections || [];
  const [firstSection, ...restSections] = sections;

  /* Domain-specific cards live under one of these keys, all sharing the
     { id, title, description } shape. */
  const cards = data.preparations || data.objectives || data.activities || [];

  /* Events are placeholders until real dates are added — show the empty state. */
  const realEvents = (data.events?.items || []).filter(
    (e) => !e._placeholder && (e.date || e.location || e.eventType)
  );
  const cta = data.cta;
  const resources = data.resources || [];

  return (
    <>
      <HeroSection title={L(data.hero.title)} subtitle={L(data.hero.tagline)} />

      <article className="aa-page">
        {/* ── Intro lead ─────────────────────────────────── */}
        {data.hero.intro && (
          <Reveal className="aa-intro section">
            <div className="section-inner">
              <p className="aa-intro__lead">{L(data.hero.intro)}</p>
            </div>
          </Reveal>
        )}

        {/* ── First section: image + text split ─────────── */}
        {firstSection && (
          <Reveal className="aa-split-section section">
            <div className="section-inner">
              <div className="aa-split">
                <div className="aa-split__media">
                  <span
                    className="aa-split__img"
                    style={sectionImage ? { backgroundImage: `url('${sectionImage}')` } : undefined}
                  />
                </div>
                <div className="aa-split__text">
                  <h2 className="aa-heading">{L(firstSection.title)}</h2>
                  <span className="aa-rule" aria-hidden="true" />
                  <ReadMore locale={locale} lines={9} mobileLines={6}>
                    <p className="aa-body">{L(firstSection.body)}</p>
                  </ReadMore>
                  {firstSection.highlights && L(firstSection.highlights).length > 0 && (
                    <ul className="aa-checks">
                      {L(firstSection.highlights).map((h, i) => <li key={i}>{h}</li>)}
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
              <h2 className="aa-heading aa-heading--center">{L(s.title)}</h2>
              <span className="aa-rule aa-rule--center" aria-hidden="true" />
              <ReadMore locale={locale} lines={7} mobileLines={5}>
                <p className="aa-body">{L(s.body)}</p>
              </ReadMore>
              {s.highlights && L(s.highlights).length > 0 && (
                <ul className="aa-checks aa-checks--center">
                  {L(s.highlights).map((h, hi) => <li key={hi}>{h}</li>)}
                </ul>
              )}
            </div>
          </Reveal>
        ))}

        {/* ── Cards grid (preparations / objectives / activities) ─── */}
        {cards.length > 0 && (
          <Reveal className="aa-sessions section">
            <div className="section-inner">
              <div className="aa-feeding__head">
                <h2 className="aa-heading aa-heading--center">{L(cardsHeading)}</h2>
                <span className="aa-rule aa-rule--center" aria-hidden="true" />
              </div>
              <div className="aa-sessions__grid">
                {cards.map((c, i) => (
                  <article key={c.id} className="aa-session-card" style={{ '--i': i }}>
                    <div className="aa-session-card__body">
                      <h3 className="aa-session-card__title">{L(c.title)}</h3>
                      <p className="aa-session-card__desc">{L(c.description)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* ── Photo gallery strip ─────────────────────────── */}
        {gallery.length > 0 && (
          <Reveal className="aa-gallery section">
            <div className="section-inner">
              <h2 className="aa-heading aa-heading--center">{L(UI.glimpses)}</h2>
              <span className="aa-rule aa-rule--center" aria-hidden="true" />
              <PhotoStrip
                photos={gallery}
                alt={L(data.hero.title)}
                className="aa-photo-strip"
                itemClassName="aa-photo-strip__item"
              />
            </div>
          </Reveal>
        )}

        {/* ── Upcoming events ─────────────────────────────── */}
        {data.events && (
          <Reveal className="aa-band section aa-band--alt">
            <div className="section-inner aa-band__inner">
              <h2 className="aa-heading aa-heading--center">{L(UI.upcoming)}</h2>
              <span className="aa-rule aa-rule--center" aria-hidden="true" />
              {realEvents.length > 0 ? (
                <ul className="aa-checks aa-checks--center">
                  {realEvents.map((e, i) => (
                    <li key={e.id || i}>
                      {[L(e.eventType), L(e.location), L(e.date)].filter(Boolean).join(' · ')}
                      {L(e.note) ? ` — ${L(e.note)}` : ''}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="aa-feeding__desc">{L(data.events.emptyState)}</p>
              )}
            </div>
          </Reveal>
        )}

        {/* ── Resources ───────────────────────────────────── */}
        {resources.length > 0 && (
          <Reveal className="aa-resources section">
            <div className="section-inner">
              <div className="aa-feeding__head">
                <h2 className="aa-heading aa-heading--center">{L(UI.learnMore)}</h2>
                <span className="aa-rule aa-rule--center" aria-hidden="true" />
              </div>
              <ul className="aa-resources__list">
                {resources.map((r) => (
                  <li key={r.id} className="aa-resource">
                    <span className="aa-resource__type">{r.type || 'link'}</span>
                    <span className="aa-resource__title">{L(r.title)}</span>
                    <span className="aa-resource__actions">
                      {r.read && (
                        <a href={r.read} target="_blank" rel="noopener noreferrer" className="aa-resource__action">
                          {L(UI.read)} →
                        </a>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        {/* ── Closing CTA ─────────────────────────────────── */}
        <Reveal className="aa-cta section">
          <div className="section-inner">
            <div className="page-cta-strip">
              <div>
                <h3>{L(cta.title)}</h3>
                <p>{L(cta.text)}</p>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href={cta.link || '/contact'} className="btn btn-white">{L(cta.buttonLabel)}</Link>
                <a
                  href="https://wa.me/919243755613"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline only-desktop"
                  style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
                >
                  {L(UI.whatsapp)}
                </a>
                <a
                  href="tel:+919243755613"
                  className="btn btn-outline only-mobile"
                  style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
                >
                  {L(UI.call)}
                </a>
              </div>
            </div>
            {backHref && (
              <Link href={backHref.href} className="aa-back-link">{L(backHref.label)}</Link>
            )}
          </div>
        </Reveal>
      </article>
    </>
  );
}
