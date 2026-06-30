'use client';

import { useState, useCallback } from 'react';
import GalleryLightbox from './GalleryLightbox';
import Reveal from './Reveal';
import './Media.css';

/**
 * Reusable clickable photo grid/strip backed by the shared GalleryLightbox.
 * Drop-in for any gallery markup — pass the wrapper/item class names so the
 * page's existing CSS keeps applying, and the same full-screen viewer opens
 * on click everywhere (program pages, activity/initiative pages, festivals…).
 *
 * @param {(string | {src:string, caption?:string})[]} photos
 * @param {string} [alt]            base alt/aria text (suffixed with index)
 * @param {string} [className]      grid/strip wrapper class
 * @param {string} [itemClassName]  class for each clickable tile
 * @param {string} [labelClassName] if set, render each caption as a label span
 * @param {boolean} [reveal]        wrap each tile in <Reveal> (scroll-in stagger)
 * @param {number} [revealMod]      stagger modulus for the `--i` index var
 */
export default function PhotoStrip({
  photos = [],
  alt = '',
  className = 'pd-photo-strip',
  itemClassName = 'pd-photo-strip__item',
  labelClassName = '',
  reveal = false,
  revealMod = 8,
}) {
  const items = photos.map((p) => (typeof p === 'string' ? { src: p } : p));

  const [index, setIndex] = useState(null);
  const open = useCallback((i) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);

  if (items.length === 0) return null;

  return (
    <>
      <div className={className}>
        {items.map((it, i) => {
          const aria = alt ? `${alt} — ${i + 1}` : (it.caption || `Photo ${i + 1}`);
          const tileProps = {
            type: 'button',
            className: itemClassName,
            onClick: () => open(i),
            'aria-label': aria,
          };
          const tileInner = (
            <>
              <img
                src={it.src}
                alt={alt ? `${alt} — ${i + 1}` : (it.caption || '')}
                loading="lazy"
                decoding="async"
              />
              {labelClassName && it.caption && (
                <span className={labelClassName}>{it.caption}</span>
              )}
            </>
          );

          return reveal ? (
            <Reveal key={it.src} as="button" style={{ '--i': i % revealMod }} {...tileProps}>
              {tileInner}
            </Reveal>
          ) : (
            <button key={it.src} {...tileProps}>
              {tileInner}
            </button>
          );
        })}
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
