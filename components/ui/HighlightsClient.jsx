'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '../../lib/i18n/navigation';
import { imagesOf, coverOf, sortByDateDesc } from '../../lib/highlights';
import HighlightFeatured from './HighlightFeatured';
import HighlightCard from './HighlightCard';
import HighlightModal from './HighlightModal';
import GalleryLightbox from './GalleryLightbox';
import highlightsData from '../../data-json-files/media/highlights.json';
import './Highlights.css';

/**
 * Single shared highlights section used both on the homepage (as a teaser)
 * and on the Press & Highlights page (full list with category filters).
 *
 * @param {number} [limit]          cap the number of highlights shown (teaser)
 * @param {boolean} [showFilters]   show the category filter row
 * @param {boolean} [showViewAll]   show the "View All Highlights" footer link
 * @param {string} [viewAllHref]    target for the View-All link
 * @param {string} [className]      extra class on the section (e.g. home variant)
 */
export default function HighlightsClient({
  limit = null,
  showFilters = true,
  showViewAll = false,
  viewAllHref = '/media/news',
  className = '',
}) {
  const locale = useLocale();
  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);
  const T = (obj) => (obj && (obj[locale] || obj.en)) || '';

  const { section, categories, highlights } = highlightsData;

  const sorted = useMemo(() => sortByDateDesc(highlights), [highlights]);

  const cats = useMemo(() => {
    const present = new Set(sorted.map((h) => h.category));
    return Object.entries(categories).filter(([key]) => present.has(key));
  }, [sorted, categories]);

  const [active, setActive] = useState('all');
  const [detail, setDetail] = useState(null);
  const [lb, setLb] = useState(null);

  /* Open a highlight directly from a shared deep link, e.g. …/media/news#hl-<id> */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const m = window.location.hash.match(/^#hl-(.+)$/);
    if (!m) return;
    const found = highlights.find((h) => h.id === decodeURIComponent(m[1]));
    if (found) setDetail(found);
  }, [highlights]);

  const filtered = active === 'all' ? sorted : sorted.filter((h) => h.category === active);
  const shown = limit ? filtered.slice(0, limit) : filtered;
  const [featured, ...rest] = shown;

  const openGallery = (h, index) => {
    const images = imagesOf(h);
    const items = images.map((src) => ({ src, caption: T(h.imageAlt) }));
    setLb({ items, index: index != null ? index : (h.coverIndex || 1) - 1 });
  };

  if (!featured) return null;

  const galleryLabel = L('View gallery', 'गैलरी देखें', 'ಗ್ಯಾಲರಿ ನೋಡಿ');
  const detailLabel = L('View details', 'विवरण देखें', 'ವಿವರ ನೋಡಿ');
  const featImages = imagesOf(featured);
  const detailImages = detail ? imagesOf(detail) : [];
  const showFilterRow = showFilters && cats.length > 1;

  return (
    <section className={`hl-section${className ? ` ${className}` : ''}`}>
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

        {showFilterRow && (
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

        <HighlightFeatured
          h={featured}
          images={featImages}
          cover={coverOf(featured, featImages)}
          categories={categories}
          T={T}
          L={L}
          galleryLabel={galleryLabel}
          detailLabel={detailLabel}
          onGallery={() => openGallery(featured)}
          onDetail={() => setDetail(featured)}
        />

        {rest.length > 0 && (
          <div className="hl-grid">
            {rest.map((h, i) => {
              const images = imagesOf(h);
              return (
                <HighlightCard
                  key={h.id}
                  h={h}
                  i={i + 1}
                  images={images}
                  cover={coverOf(h, images)}
                  categories={categories}
                  T={T}
                  L={L}
                  galleryLabel={galleryLabel}
                  detailLabel={detailLabel}
                  onGallery={() => openGallery(h)}
                  onDetail={() => setDetail(h)}
                />
              );
            })}
          </div>
        )}

        {showViewAll && (
          <div className="home-highlights__footer">
            <Link href={viewAllHref} className="btn btn-gold-outline home-highlights__view-all">
              {L('View All Highlights', 'सभी झलकियाँ देखें', 'ಎಲ್ಲಾ ಮುಖ್ಯಾಂಶಗಳು')}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>

      {detail && (
        <HighlightModal
          h={detail}
          images={detailImages}
          cover={coverOf(detail, detailImages)}
          categories={categories}
          T={T}
          L={L}
          locale={locale}
          onClose={() => setDetail(null)}
          onViewGallery={(idx) => openGallery(detail, idx)}
        />
      )}

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
