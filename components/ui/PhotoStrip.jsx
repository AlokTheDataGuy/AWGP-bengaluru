'use client';

import { useState, useCallback } from 'react';
import GalleryLightbox from './GalleryLightbox';
import './Media.css';

/**
 * Reusable horizontal photo strip with a click-to-open lightbox.
 * Drop-in for the `.pd-photo-strip` markup used on program pages.
 *
 * @param {(string | {src:string, caption?:string})[]} photos
 * @param {string} [alt]        base alt/caption text (suffixed with index)
 * @param {string} [className]  strip wrapper class (defaults to pd-photo-strip)
 */
export default function PhotoStrip({ photos = [], alt = '', className = 'pd-photo-strip' }) {
  const items = photos.map((p) =>
    typeof p === 'string' ? { src: p } : p
  );

  const [index, setIndex] = useState(null);
  const open = useCallback((i) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);

  if (items.length === 0) return null;

  return (
    <>
      <div className={className}>
        {items.map((it, i) => (
          <button
            key={it.src}
            type="button"
            className="pd-photo-strip__item"
            onClick={() => open(i)}
            aria-label={alt ? `${alt} — ${i + 1}` : `Photo ${i + 1}`}
          >
            <img
              src={it.src}
              alt={alt ? `${alt} — ${i + 1}` : ''}
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>

      {index !== null && (
        <GalleryLightbox
          items={items}
          index={index}
          onClose={close}
          onIndex={setIndex}
        />
      )}
    </>
  );
}
