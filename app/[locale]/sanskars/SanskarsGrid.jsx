'use client';

import Image from 'next/image';
import { Link } from '../../../lib/i18n/navigation';
import { useReveal } from '../../../lib/useReveal';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="12" x2="18" y2="12" />
      <polyline points="12 6 18 12 12 18" />
    </svg>
  );
}

export default function SanskarsGrid({ items, labels }) {
  const ref = useReveal(0.08);

  return (
    <section className="skr-grid-sec">
      <span className="skr-grid-sec__bloom" aria-hidden="true" />
      <div className="skr-grid-sec__inner">
        <div className="skr-grid-head">
          <span className="skr-grid-head__eyebrow">{labels.gridEyebrow}</span>
          <h2 className="skr-grid-head__title">{labels.gridTitle}</h2>
          <span className="skr-grid-head__rule" aria-hidden="true" />
          <p className="skr-grid-head__note">{labels.gridNote}</p>
        </div>

        <div className="skr-grid" ref={ref}>
          {items.map((it, i) => (
            <Link key={it.id} href={`/sanskars/${it.id}`} className="skr-card" style={{ '--i': i }}>
              <div className="skr-card__media">
                {it.image && (
                  <Image
                    src={it.image}
                    alt={it.name}
                    fill
                    sizes="(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 30vw"
                    style={{ objectFit: 'cover' }}
                  />
                )}
                <span className="skr-card__veil" aria-hidden="true" />
                {it.stage && <span className="skr-card__stage">{it.stage}</span>}
              </div>
              <div className="skr-card__body">
                <h3 className="skr-card__name">{it.name}</h3>
                <p className="skr-card__summary">{it.summary}</p>
                <span className="skr-card__cta">
                  {labels.learn} <ArrowIcon />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
