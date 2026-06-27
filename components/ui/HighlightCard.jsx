'use client';

import Image from 'next/image';
import { CalendarDays, MapPin, Images as ImagesIcon } from 'lucide-react';

export default function HighlightCard({ h, images, cover, categories, T, L, viewLabel, onOpen, i = 0 }) {
  return (
    <article className="hl-card" style={{ '--i': i }}>
      <button
        className="hl-card__media"
        onClick={onOpen}
        aria-label={`${viewLabel} — ${T(h.title)}`}
      >
        <Image
          src={cover}
          alt={T(h.imageAlt)}
          fill
          sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        <span className={`hl-tag hl-tag--${h.category}`}>{T(categories[h.category]?.label)}</span>
        {images.length > 1 && (
          <span className="hl-photocount">
            <ImagesIcon size={12} aria-hidden="true" /> {images.length}
          </span>
        )}
        <span className="hl-card__overlay">
          <span className="hl-card__overlay-label">
            <ImagesIcon size={15} aria-hidden="true" />
            {images.length > 1
              ? L('View Gallery', 'गैलरी देखें', 'ಗ್ಯಾಲರಿ ನೋಡಿ')
              : L('View Photo', 'फ़ोटो देखें', 'ಫೋಟೋ ನೋಡಿ')}
          </span>
        </span>
      </button>
      <div className="hl-card__body">
        <span className="hl-card__date">
          <CalendarDays size={13} aria-hidden="true" /> {T(h.dateDisplay)}
        </span>
        <h4 className="hl-card__title">{T(h.title)}</h4>
        <p className="hl-card__desc">{T(h.description)}</p>
        <div className="hl-card__foot">
          {h.stat && <span className="hl-chip hl-chip--sm">{T(h.stat)}</span>}
          {h.location && (
            <span className="hl-card__loc">
              <MapPin size={12} aria-hidden="true" /> {T(h.location)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
