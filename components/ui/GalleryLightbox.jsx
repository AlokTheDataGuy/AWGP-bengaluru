'use client';

import { useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Shared lightbox for both gallery views (By Year + By Theme).
 * Shows a large centered image, prev/next, a counter, and a bottom
 * filmstrip of every item in the set (e.g. all photos of that year).
 *
 * @param {{src:string, caption?:string}[]} items  the full set being browsed
 * @param {number} index                            currently shown index
 * @param {() => void} onClose
 * @param {(next:number) => void} onIndex           request a new index
 */
export default function GalleryLightbox({ items, index, onClose, onIndex }) {
  const total = items.length;
  const touch = useRef({ x: 0, y: 0 });
  const stripRef = useRef(null);

  const prev = useCallback(
    () => onIndex((index - 1 + total) % total),
    [index, total, onIndex]
  );
  const next = useCallback(
    () => onIndex((index + 1) % total),
    [index, total, onIndex]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  /* Keep the active thumbnail centered in the filmstrip. */
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const el = strip.querySelector(`[data-i="${index}"]`);
    if (el) {
      strip.scrollTo({
        left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [index]);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
  };

  const current = items[index];
  if (!current) return null;

  return (
    <div className="gal-lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
      {/* Top bar — counter + close */}
      <div className="gal-lb-topbar">
        <span className="gal-lb-counter" aria-hidden="true">{index + 1} / {total}</span>
        <button className="gal-lb-close" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>
      </div>

      {/* Stage — arrows + main image (click backdrop to close) */}
      <div
        className="gal-lb-stage"
        onClick={onClose}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          className="gal-lb-nav gal-lb-nav--prev"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous"
        >
          <ChevronLeft size={32} />
        </button>

        <figure className="gal-lb-figure" onClick={(e) => e.stopPropagation()}>
          <Image
            src={current.src}
            alt={current.caption || ''}
            width={1400}
            height={1000}
            sizes="92vw"
            className="gal-lb-img"
            style={{ width: 'auto', height: 'auto', objectFit: 'contain' }}
            priority
          />
        </figure>

        <button
          className="gal-lb-nav gal-lb-nav--next"
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Filmstrip — every item in the set */}
      {total > 1 && (
        <div className="gal-lb-strip" ref={stripRef} role="tablist" aria-label="Thumbnails">
          {items.map((it, i) => (
            <button
              key={it.src}
              data-i={i}
              className={`gal-lb-thumb${i === index ? ' gal-lb-thumb--active' : ''}`}
              onClick={() => onIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              aria-selected={i === index}
              role="tab"
            >
              <Image src={it.src} alt="" fill sizes="96px" style={{ objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
