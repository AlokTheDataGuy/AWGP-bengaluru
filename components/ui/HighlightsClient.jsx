'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { CalendarDays, MapPin, Images as ImagesIcon, Sparkles } from 'lucide-react';
import GalleryLightbox from './GalleryLightbox';
import highlightsData from '../../data-json-files/media/highlights.json';
import './Highlights.css';

const pad = (n) => String(n).padStart(2, '0');

function imagesOf(h) {
  const count = h.imageCount || 1;
  return Array.from({ length: count }, (_, i) => `/assets/highlights/${h.id}/${h.id}-${pad(i + 1)}.jpg`);
}

export default function HighlightsClient() {
  const locale = useLocale();
  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);
  const T = (obj) => (obj && (obj[locale] || obj.en)) || '';

  const { section, categories, highlights } = highlightsData;

  const sorted = useMemo(
    () => [...highlights].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [highlights]
  );

  const cats = useMemo(() => {
    const present = new Set(sorted.map((h) => h.category));
    return Object.entries(categories).filter(([key]) => present.has(key));
  }, [sorted, categories]);

  const [active, setActive] = useState('all');
  const [lb, setLb] = useState(null);

  const shown = active === 'all' ? sorted : sorted.filter((h) => h.category === active);
  const [featured, ...rest] = shown;

  const openGallery = (h) => {
    const items = imagesOf(h).map((src) => ({ src, caption: T(h.imageAlt) }));
    setLb({ items, index: (h.coverIndex || 1) - 1 });
  };

  if (!featured) return null;

  const featImages = imagesOf(featured);
  const featCover = featImages[(featured.coverIndex || 1) - 1];
  const viewLabel = L('View photos', 'फ़ोटो देखें', 'ಫೋಟೋ ನೋಡಿ');

  return (
    <section className="hl-section">
      <span className="hl-mandala" aria-hidden="true" />

      <div className="section-inner">
        <div className="hl-head">
          <span className="sec-head__eyebrow">{T(section.eyebrow)}</span>
          <h2 className="hl-head__title">{T(section.title)}</h2>
          <div className="hl-head__divider" aria-hidden="true">
            <span /><span className="hl-head__diamond" /><span />
          </div>
          <p className="hl-head__sub">{T(section.subtitle)}</p>
        </div>

        {cats.length > 1 && (
          <div className="hl-filters" role="tablist" aria-label={L('Filter highlights', 'झलकियाँ फ़िल्टर करें', 'ಮುಖ್ಯಾಂಶಗಳನ್ನು ಫಿಲ್ಟರ್ ಮಾಡಿ')}>
            <button
              role="tab"
              aria-selected={active === 'all'}
              className={`hl-filter${active === 'all' ? ' hl-filter--active' : ''}`}
              onClick={() => setActive('all')}
            >
              {L('All', 'सभी', 'ಎಲ್ಲಾ')}
            </button>
            {cats.map(([key, val]) => (
              <button
                key={key}
                role="tab"
                aria-selected={active === key}
                className={`hl-filter${active === key ? ' hl-filter--active' : ''}`}
                onClick={() => setActive(key)}
              >
                {T(val.label)}
              </button>
            ))}
          </div>
        )}

        {/* Featured — most recent highlight */}
        <article className="hl-featured">
          <button
            className="hl-featured__media"
            onClick={() => openGallery(featured)}
            aria-label={`${viewLabel} — ${T(featured.title)}`}
          >
            <Image
              src={featCover}
              alt={T(featured.imageAlt)}
              fill
              sizes="(max-width: 760px) 100vw, 56vw"
              style={{ objectFit: 'cover' }}
              priority
            />
            <span className={`hl-tag hl-tag--${featured.category}`}>
              {T(categories[featured.category]?.label)}
            </span>
            {featImages.length > 1 && (
              <span className="hl-photocount">
                <ImagesIcon size={13} aria-hidden="true" /> {featImages.length}
              </span>
            )}
          </button>

          <div className="hl-featured__body">
            <span className="hl-featured__kicker">
              <Sparkles size={13} aria-hidden="true" />
              {L('Latest Highlight', 'नवीनतम झलक', 'ಇತ್ತೀಚಿನ ಮುಖ್ಯಾಂಶ')}
            </span>
            <h3 className="hl-featured__title">{T(featured.title)}</h3>
            <div className="hl-meta">
              <span className="hl-meta__item">
                <CalendarDays size={14} aria-hidden="true" /> {T(featured.dateDisplay)}
              </span>
              {featured.location && (
                <span className="hl-meta__item">
                  <MapPin size={14} aria-hidden="true" /> {T(featured.location)}
                </span>
              )}
            </div>
            <p className="hl-featured__desc">{T(featured.description)}</p>
            <div className="hl-featured__foot">
              {featured.stat && <span className="hl-chip">{T(featured.stat)}</span>}
              {featImages.length > 1 && (
                <button className="hl-gallery-cta" onClick={() => openGallery(featured)}>
                  <ImagesIcon size={15} aria-hidden="true" />
                  {L('View Gallery', 'गैलरी देखें', 'ಗ್ಯಾಲರಿ ನೋಡಿ')}
                </button>
              )}
            </div>
          </div>
        </article>

        {/* Grid — remaining highlights */}
        {rest.length > 0 && (
          <div className="hl-grid">
            {rest.map((h, i) => {
              const imgs = imagesOf(h);
              const cover = imgs[(h.coverIndex || 1) - 1];
              return (
                <article key={h.id} className="hl-card" style={{ '--i': i + 1 }}>
                  <button
                    className="hl-card__media"
                    onClick={() => openGallery(h)}
                    aria-label={`${viewLabel} — ${T(h.title)}`}
                  >
                    <Image
                      src={cover}
                      alt={T(h.imageAlt)}
                      fill
                      sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <span className={`hl-tag hl-tag--${h.category}`}>
                      {T(categories[h.category]?.label)}
                    </span>
                    {imgs.length > 1 && (
                      <span className="hl-photocount">
                        <ImagesIcon size={12} aria-hidden="true" /> {imgs.length}
                      </span>
                    )}
                    <span className="hl-card__overlay">
                      <span className="hl-card__overlay-label">
                        <ImagesIcon size={15} aria-hidden="true" />
                        {imgs.length > 1
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
            })}
          </div>
        )}
      </div>

      {lb && (
        <GalleryLightbox
          items={lb.items}
          index={lb.index}
          onClose={() => setLb(null)}
          onIndex={(idx) => setLb((s) => (s ? { ...s, index: idx } : s))}
        />
      )}
    </section>
  );
}
