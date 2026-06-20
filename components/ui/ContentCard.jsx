import Image from 'next/image';
import { Link } from '../../lib/i18n/navigation';
import './ContentCard.css';

/**
 * ContentCard — the standard AWGP content card used across listing pages
 * (Sanskars, Events, Activities). White surface, hairline gold-tinted border,
 * warm shadow that lifts on hover, square corners, image zoom, a gold accent
 * bar that sweeps in, and an animated "Learn More →" CTA.
 *
 * Presentational + CSS-only interactions, so it works in server components.
 *
 * Props:
 *  - href      : destination (i18n-aware Link)
 *  - image     : cover image src
 *  - imageAlt  : alt text
 *  - icon      : optional emoji/glyph shown as a chip on the image
 *  - eyebrow   : optional small uppercase kicker above the title
 *  - title     : card heading
 *  - subtitle  : optional italic supporting line
 *  - meta      : optional meta line (e.g. schedule)
 *  - cta       : CTA label (localized by the caller)
 */
export default function ContentCard({
  href,
  image,
  imageAlt = '',
  icon,
  eyebrow,
  title,
  subtitle,
  meta,
  cta = 'Learn More',
}) {
  return (
    <Link href={href} className="content-card">
      <div className="content-card__media">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="content-card__img"
        />
        <span className="content-card__scrim" aria-hidden="true" />
        {icon && <span className="content-card__icon" aria-hidden="true">{icon}</span>}
      </div>

      <div className="content-card__body">
        {eyebrow && <span className="content-card__eyebrow">{eyebrow}</span>}
        <h3 className="content-card__title">{title}</h3>
        {subtitle && <p className="content-card__subtitle">{subtitle}</p>}
        {meta && <p className="content-card__meta">{meta}</p>}
        <span className="content-card__cta">
          {cta}
          <svg
            className="content-card__arrow"
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="4" y1="12" x2="18" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
