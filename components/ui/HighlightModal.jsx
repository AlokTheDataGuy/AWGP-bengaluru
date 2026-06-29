'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, CalendarDays, MapPin, Images as ImagesIcon, Sparkles, Check } from 'lucide-react';
import ShareButton from './ShareButton';

/**
 * Detail modal for a single highlight — full story text, key points and a
 * photo strip. Clicking the hero or a thumbnail hands off to the shared
 * GalleryLightbox (via onViewGallery) for full-screen photo browsing.
 *
 * @param {object} h            the highlight record
 * @param {string[]} images     resolved image srcs for this highlight
 * @param {string} cover        the cover image src
 * @param {object} categories   category map (for the label)
 * @param {(o:object)=>string} T  locale text helper
 * @param {(en,hi,kn)=>string} L  inline locale helper
 * @param {string} locale       active locale, for the share control
 * @param {() => void} onClose
 * @param {(index:number) => void} onViewGallery  open the lightbox at index
 */
export default function HighlightModal({ h, images, cover, categories, T, L, locale = 'en', onClose, onViewGallery }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!h || typeof document === 'undefined') return null;

  const body = Array.isArray(h.body) ? h.body : [];
  const points = Array.isArray(h.points) ? h.points : [];
  const multi = images.length > 1;
  const coverIdx = (h.coverIndex || 1) - 1;
  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}#hl-${h.id}`
      : '';

  return createPortal(
    <div
      className="hl-modal"
      role="dialog"
      aria-modal="true"
      aria-label={T(h.title)}
      onClick={onClose}
    >
      <div className="hl-modal__dialog" onClick={(e) => e.stopPropagation()}>
        <button className="hl-modal__close" onClick={onClose} aria-label={L('Close', 'बंद करें', 'ಮುಚ್ಚಿ')}>
          <X size={22} />
        </button>

        <button
          className="hl-modal__hero"
          onClick={() => onViewGallery(coverIdx)}
          aria-label={`${L('View photos', 'फ़ोटो देखें', 'ಫೋಟೋ ನೋಡಿ')} — ${T(h.title)}`}
        >
          <Image
            src={cover}
            alt={T(h.imageAlt)}
            fill
            sizes="(max-width: 760px) 100vw, 760px"
            style={{ objectFit: 'cover' }}
            priority
          />
          <span className={`hl-tag hl-tag--${h.category}`}>{T(categories[h.category]?.label)}</span>
          {multi && (
            <span className="hl-photocount">
              <ImagesIcon size={13} aria-hidden="true" /> {images.length}
            </span>
          )}
          <span className="hl-modal__hero-cta">
            <ImagesIcon size={15} aria-hidden="true" />
            {multi
              ? L('View Gallery', 'गैलरी देखें', 'ಗ್ಯಾಲರಿ ನೋಡಿ')
              : L('View Photo', 'फ़ोटो देखें', 'ಫೋಟೋ ನೋಡಿ')}
          </span>
        </button>

        <div className="hl-modal__body">
          <span className="hl-modal__kicker">
            <Sparkles size={13} aria-hidden="true" /> {T(categories[h.category]?.label)}
          </span>
          <h3 className="hl-modal__title">{T(h.title)}</h3>

          <div className="hl-meta hl-modal__meta">
            <span className="hl-meta__item">
              <CalendarDays size={14} aria-hidden="true" /> {T(h.dateDisplay)}
            </span>
            {h.location && (
              <span className="hl-meta__item">
                <MapPin size={14} aria-hidden="true" /> {T(h.location)}
              </span>
            )}
          </div>

          {h.stat && <span className="hl-chip hl-modal__stat">{T(h.stat)}</span>}

          <div className="hl-modal__prose">
            {body.length > 0
              ? body.map((p, i) => <p key={i}>{T(p)}</p>)
              : <p>{T(h.description)}</p>}
          </div>

          {points.length > 0 && (
            <div className="hl-modal__points">
              {h.pointsTitle && <h4 className="hl-modal__points-title">{T(h.pointsTitle)}</h4>}
              <ul>
                {points.map((pt, i) => (
                  <li key={i}>
                    <Check size={15} aria-hidden="true" />
                    <span>{T(pt)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {multi && (
            <>
              <div className="hl-modal__thumbs" role="list">
                {images.map((src, i) => (
                  <button
                    key={src}
                    className="hl-modal__thumb"
                    onClick={() => onViewGallery(i)}
                    aria-label={`${L('View photo', 'फ़ोटो देखें', 'ಫೋಟೋ ನೋಡಿ')} ${i + 1}`}
                  >
                    <Image src={src} alt="" fill sizes="120px" style={{ objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
              <button className="hl-gallery-cta hl-modal__gallery-btn" onClick={() => onViewGallery(coverIdx)}>
                <ImagesIcon size={15} aria-hidden="true" />
                {L('View all photos', 'सभी फ़ोटो देखें', 'ಎಲ್ಲಾ ಫೋಟೋ ನೋಡಿ')}
              </button>
            </>
          )}

          <div className="hl-modal__share">
            <ShareButton url={shareUrl} title={T(h.title)} locale={locale} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
