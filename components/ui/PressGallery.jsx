'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Newspaper } from 'lucide-react';
import GalleryLightbox from './GalleryLightbox';

const formatDate = (iso, locale) => {
  const map = { hi: 'hi-IN', kn: 'kn-IN', en: 'en-IN' };
  try {
    return new Date(iso).toLocaleDateString(map[locale] || 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
};

/**
 * Newspaper-coverage grid. Each clipping is clickable and opens the shared
 * GalleryLightbox (the same full-screen viewer used by the highlights) so the
 * full cutout can be read.
 *
 * @param {object[]} press  the press records from news.json
 */
export default function PressGallery({ press = [] }) {
  const locale = useLocale();
  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);
  const T = (obj) => (obj && (obj[locale] || obj.en)) || '';

  const [lb, setLb] = useState(null);

  const items = press.map((p) => ({ src: p.image, caption: T(p.headline) }));
  const openAt = (index) => setLb({ index });

  return (
    <>
      <div className="press-grid">
        {press.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className="press-card press-card--link"
            onClick={() => openAt(i)}
            aria-label={`${L('View clipping', 'कतरन देखें', 'ತುಣುಕು ನೋಡಿ')} — ${T(p.headline)}`}
          >
            <div className="press-card__clip">
              <Image
                src={p.image}
                alt={T(p.headline)}
                fill
                sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 25vw"
                style={{ objectFit: 'cover' }}
              />
              <span className="press-card__paper">
                <Newspaper size={13} aria-hidden="true" />
                {T(p.publication)}
              </span>
            </div>
            <div className="press-card__body">
              <span className="press-card__date">{formatDate(p.date, locale)}</span>
              <p className="press-card__headline">{T(p.headline)}</p>
            </div>
          </button>
        ))}
      </div>

      {lb && (
        <GalleryLightbox
          items={items}
          index={lb.index}
          onClose={() => setLb(null)}
          onIndex={(idx) => setLb((s) => (s ? { ...s, index: idx } : s))}
        />
      )}
    </>
  );
}
