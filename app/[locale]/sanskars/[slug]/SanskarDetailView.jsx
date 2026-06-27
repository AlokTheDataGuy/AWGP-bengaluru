'use client';

import Image from 'next/image';
import { Link } from '../../../../lib/i18n/navigation';
import { useReveal } from '../../../../lib/useReveal';

function Reveal({ as: Tag = 'div', className = '', children, style }) {
  const ref = useReveal(0.12);
  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

function NavArrow({ dir }) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={dir === 'prev' ? { transform: 'rotate(180deg)' } : undefined}>
      <line x1="4" y1="12" x2="18" y2="12" />
      <polyline points="12 6 18 12 12 18" />
    </svg>
  );
}

export default function SanskarDetailView({ view, labels }) {
  return (
    <div className="skd">
      <div className="skd__inner">
        <Link href="/sanskars" className="skd__back">{labels.backAll}</Link>

        {/* Intro lead — photo before the introduction text */}
        <Reveal as="section" className="skd-block skd-lead">
          {view.image && (
            <div className="skd-lead__media">
              <Image
                src={view.image}
                alt={view.name}
                fill
                sizes="(max-width: 720px) 92vw, 40vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
          <div className="skd-lead__text-wrap">
            <span className="skd-block__kicker">{labels.whatIs}</span>
            <p className="skd-lead__text">{view.intro}</p>
          </div>
        </Reveal>

        {/* Why it matters */}
        {view.whyItMatters && (
          <Reveal as="section" className="skd-block skd-why">
            <h2 className="skd-block__title">{labels.why}</h2>
            <span className="skd-rule" aria-hidden="true" />
            <p>{view.whyItMatters}</p>
          </Reveal>
        )}

        {/* Scientific perspective */}
        {view.scientificPerspective && (
          <Reveal as="section" className="skd-block skd-science">
            <span className="skd-science__badge" aria-hidden="true">🔬</span>
            <h2 className="skd-block__title">{labels.science}</h2>
            <span className="skd-rule skd-rule--gold" aria-hidden="true" />
            <p>{view.scientificPerspective}</p>
          </Reveal>
        )}

        {/* Benefits */}
        {view.benefits.length > 0 && (
          <Reveal as="section" className="skd-block skd-benefits">
            <h2 className="skd-block__title skd-block__title--center">{labels.benefits}</h2>
            <span className="skd-rule skd-rule--center" aria-hidden="true" />
            <div className="skd-ben-grid">
              {view.benefits.map((b, i) => (
                <div key={i} className="skd-ben" style={{ '--i': i }}>
                  <span className="skd-ben__no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div className="skd-ben__body">
                    {b.title && <h3 className="skd-ben__title">{b.title}</h3>}
                    <p className="skd-ben__text">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* CTA */}
        <Reveal as="section" className="skd-cta">
          <div className="skd-cta__inner">
            <h2>{labels.ctaTitle}</h2>
            <p>{labels.ctaText}</p>
            <Link href="/contact" className="btn btn-primary">{labels.ctaBtn}</Link>
          </div>
        </Reveal>

        {/* Prev / Next */}
        {(view.prev || view.next) && (
          <nav className="skd-nav">
            {view.prev ? (
              <Link href={view.prev.href} className="skd-nav__link skd-nav__link--prev">
                <NavArrow dir="prev" />
                <span className="skd-nav__meta">
                  <span className="skd-nav__lbl">{labels.prevLbl}</span>
                  <span className="skd-nav__name">{view.prev.name}</span>
                </span>
              </Link>
            ) : <span />}
            {view.next ? (
              <Link href={view.next.href} className="skd-nav__link skd-nav__link--next">
                <span className="skd-nav__meta">
                  <span className="skd-nav__lbl">{labels.nextLbl}</span>
                  <span className="skd-nav__name">{view.next.name}</span>
                </span>
                <NavArrow dir="next" />
              </Link>
            ) : <span />}
          </nav>
        )}
      </div>
    </div>
  );
}
