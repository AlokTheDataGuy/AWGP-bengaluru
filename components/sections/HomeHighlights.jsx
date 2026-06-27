'use client';

import { useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '../../lib/i18n/navigation';
import { imagesOf, coverOf, sortByDateDesc } from '../../lib/highlights';
import HighlightFeatured from '../ui/HighlightFeatured';
import HighlightCard from '../ui/HighlightCard';
import GalleryLightbox from '../ui/GalleryLightbox';
import highlightsData from '../../data-json-files/media/highlights.json';
import '../ui/Highlights.css';
import './HomeHighlights.css';

const TEASER_COUNT = 4;

export default function HomeHighlights() {
  const locale = useLocale();
  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);
  const T = (obj) => (obj && (obj[locale] || obj.en)) || '';

  const { section, categories, highlights } = highlightsData;

  const shown = useMemo(() => sortByDateDesc(highlights).slice(0, TEASER_COUNT), [highlights]);
  const [featured, ...rest] = shown;

  const [lb, setLb] = useState(null);

  if (!featured) return null;

  const viewLabel = L('View photos', 'फ़ोटो देखें', 'ಫೋಟೋ ನೋಡಿ');
  const featImages = imagesOf(featured);

  const openGallery = (h) => {
    const images = imagesOf(h);
    const items = images.map((src) => ({ src, caption: T(h.imageAlt) }));
    setLb({ items, index: (h.coverIndex || 1) - 1 });
  };

  return (
    <section className="hl-section home-highlights">
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

        <HighlightFeatured
          h={featured}
          images={featImages}
          cover={coverOf(featured, featImages)}
          categories={categories}
          T={T}
          L={L}
          viewLabel={viewLabel}
          onOpen={() => openGallery(featured)}
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
                  viewLabel={viewLabel}
                  onOpen={() => openGallery(h)}
                />
              );
            })}
          </div>
        )}

        <div className="home-highlights__footer">
          <Link href="/media/news" className="btn btn-gold-outline home-highlights__view-all">
            {L('View All Highlights', 'सभी झलकियाँ देखें', 'ಎಲ್ಲಾ ಮುಖ್ಯಾಂಶಗಳು')}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
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
