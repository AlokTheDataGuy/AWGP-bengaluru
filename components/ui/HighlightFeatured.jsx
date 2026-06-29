'use client';

import Image from 'next/image';
import { CalendarDays, MapPin, Images as ImagesIcon, Sparkles, ArrowRight } from 'lucide-react';

export default function HighlightFeatured({ h, images, cover, categories, T, L, galleryLabel, detailLabel, onGallery, onDetail }) {
  const onBodyKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onDetail();
    }
  };

  return (
    <article className="hl-featured">
      <button
        className="hl-featured__media"
        onClick={onGallery}
        aria-label={`${galleryLabel} — ${T(h.title)}`}
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
        <span className="hl-card__overlay">
          <span className="hl-card__overlay-label">
            <ImagesIcon size={15} aria-hidden="true" />
            {images.length > 1
              ? L('View Gallery', 'गैलरी देखें', 'ಗ್ಯಾಲರಿ ನೋಡಿ')
              : L('View Photo', 'फ़ोटो देखें', 'ಫೋಟೋ ನೋಡಿ')}
          </span>
        </span>
      </button>

      <div
        className="hl-featured__body"
        role="button"
        tabIndex={0}
        onClick={onDetail}
        onKeyDown={onBodyKey}
        aria-label={`${detailLabel} — ${T(h.title)}`}
      >
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
          <span className="hl-featured__more">
            {detailLabel} <ArrowRight size={15} aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}
