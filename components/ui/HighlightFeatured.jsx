'use client';

import Image from 'next/image';
import { CalendarDays, MapPin, Images as ImagesIcon, Sparkles } from 'lucide-react';

export default function HighlightFeatured({ h, images, cover, categories, T, L, viewLabel, onOpen }) {
  return (
    <article className="hl-featured">
      <button
        className="hl-featured__media"
        onClick={onOpen}
        aria-label={`${viewLabel} — ${T(h.title)}`}
      >
        <Image
          src={cover}
          alt={T(h.imageAlt)}
          fill
          sizes="(max-width: 760px) 100vw, 56vw"
          style={{ objectFit: 'cover' }}
          priority
        />
        <span className={`hl-tag hl-tag--${h.category}`}>{T(categories[h.category]?.label)}</span>
        {images.length > 1 && (
          <span className="hl-photocount">
            <ImagesIcon size={13} aria-hidden="true" /> {images.length}
          </span>
        )}
      </button>

      <div className="hl-featured__body">
        <span className="hl-featured__kicker">
          <Sparkles size={13} aria-hidden="true" />
          {L('Latest Highlight', 'नवीनतम झलक', 'ಇತ್ತೀಚಿನ ಮುಖ್ಯಾಂಶ')}
        </span>
        <h3 className="hl-featured__title">{T(h.title)}</h3>
        <div className="hl-meta">
          <span className="hl-meta__item">
            <CalendarDays size={14} aria-hidden="true" /> {T(h.dateDisplay)}
          </span>
          {h.location && (
            <span className="hl-meta__item">
              <MapPin size={14} aria-hidden="true" /> {T(h.location)}
            </span>
          )}
        </div>
        <p className="hl-featured__desc">{T(h.description)}</p>
        <div className="hl-featured__foot">
          {h.stat && <span className="hl-chip">{T(h.stat)}</span>}
          {images.length > 1 && (
            <button className="hl-gallery-cta" onClick={onOpen}>
              <ImagesIcon size={15} aria-hidden="true" />
              {L('View Gallery', 'गैलरी देखें', 'ಗ್ಯಾಲರಿ ನೋಡಿ')}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
