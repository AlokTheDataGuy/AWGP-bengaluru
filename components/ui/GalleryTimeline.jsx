'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { GALLERY_YEARS, GALLERY_MANIFEST } from '../../lib/galleryManifest';
import { useReveal } from '../../lib/useReveal';

/* Number of photos previewed per year before "View all". */
const PREVIEW = 6;

/* One-line theme per year — trilingual. Placeholder copy: edit freely. */
const YEAR_THEME = {
  2017: { en: 'The first lamps are lit',          hi: 'पहली ज्योति प्रज्वलित',        kn: 'ಮೊದಲ ಜ್ಯೋತಿ ಬೆಳಗಿತು' },
  2018: { en: 'Roots take hold',                  hi: 'जड़ें गहराईं',                  kn: 'ಬೇರುಗಳು ಆಳವಾದವು' },
  2019: { en: 'The Pariwar grows',                hi: 'परिवार बढ़ता है',               kn: 'ಪರಿವಾರ ಬೆಳೆಯಿತು' },
  2020: { en: 'Seva in difficult times',          hi: 'कठिन समय में सेवा',            kn: 'ಕಷ್ಟ ಕಾಲದಲ್ಲಿ ಸೇವೆ' },
  2021: { en: 'Light through the storm',          hi: 'तूफ़ान में भी ज्योति',          kn: 'ಚಂಡಮಾರುತದಲ್ಲೂ ಜ್ಯೋತಿ' },
  2022: { en: 'A year of yagya & festivals',      hi: 'यज्ञ और उत्सवों का वर्ष',       kn: 'ಯಜ್ಞ ಮತ್ತು ಹಬ್ಬಗಳ ವರ್ಷ' },
  2023: { en: 'Sanskars for every generation',    hi: 'हर पीढ़ी के संस्कार',           kn: 'ಪ್ರತಿ ತಲೆಮಾರಿಗೆ ಸಂಸ್ಕಾರ' },
  2024: { en: 'Serving as one family',            hi: 'एक परिवार रूप में सेवा',        kn: 'ಒಂದು ಕುಟುಂಬವಾಗಿ ಸೇವೆ' },
  2025: { en: 'Carrying the flame forward',       hi: 'ज्योति आगे बढ़ती है',           kn: 'ಜ್ಯೋತಿಯನ್ನು ಮುಂದೆ ಸಾಗಿಸಿ' },
  2026: { en: 'A new chapter begins',             hi: 'नए अध्याय का आरंभ',            kn: 'ಹೊಸ ಅಧ್ಯಾಯ ಆರಂಭ' },
};

function YearBlock({ year, side, onOpen, L }) {
  const reveal = useReveal(0.12);
  const srcs = GALLERY_MANIFEST[year] || [];
  const theme = YEAR_THEME[year] || { en: '', hi: '', kn: '' };
  const themeText = L(theme.en, theme.hi, theme.kn);
  const preview = srcs.slice(0, PREVIEW);

  /* Items handed to the lightbox: the whole year, captioned. */
  const items = srcs.map((src) => ({ src, caption: `${year} · ${themeText}` }));

  return (
    <article id={`year-${year}`} className={`gtl-year gtl-year--${side}`} ref={reveal}>
      <span className="gtl-year__node" aria-hidden="true" />

      <header className="gtl-year__head">
        <span className="gtl-year__num">{year}</span>
        <span className="gtl-year__meta">
          <span className="gtl-year__theme">{themeText}</span>
        </span>
      </header>

      <div className="gtl-grid">
        {preview.map((src, i) => (
          <button
            key={src}
            className="gtl-tile"
            style={{ '--i': i }}
            onClick={() => onOpen(items, i)}
            aria-label={`${year} — ${L('photo', 'चित्र', 'ಚಿತ್ರ')} ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${year} — ${themeText}`}
              fill
              sizes="(max-width: 560px) 45vw, (max-width: 920px) 30vw, 200px"
              style={{ objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>

      {srcs.length > PREVIEW && (
        <button className="gtl-viewall" onClick={() => onOpen(items, 0)}>
          {L('View all', 'सभी देखें', 'ಎಲ್ಲಾ ನೋಡಿ')} {' '}
          {L('photos', 'चित्र', 'ಚಿತ್ರಗಳು')}
          <span aria-hidden="true"> →</span>
        </button>
      )}
    </article>
  );
}

export default function GalleryTimeline({ onOpen }) {
  const locale = useLocale();
  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);

  const years = GALLERY_YEARS;
  const [active, setActive] = useState(years[0]);
  const chipsRef = useRef(null);
  const visible = useRef({});

  /* Track which year is in the reading band below the sticky chips. */
  useEffect(() => {
    const sections = years
      .map((y) => document.getElementById(`year-${y}`))
      .filter(Boolean);
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          visible.current[e.target.id] = e.isIntersecting;
        });
        const firstVisible = years.find((y) => visible.current[`year-${y}`]);
        if (firstVisible) setActive(firstVisible);
      },
      { rootMargin: '-150px 0px -65% 0px', threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [years]);

  /* Keep the active chip centered in the mobile scroll strip. */
  useEffect(() => {
    const bar = chipsRef.current;
    if (!bar) return;
    const chip = bar.querySelector(`[data-year="${active}"]`);
    if (!chip) return;
    bar.scrollTo({
      left: chip.offsetLeft - bar.clientWidth / 2 + chip.clientWidth / 2,
      behavior: 'smooth',
    });
  }, [active]);

  const jumpTo = (year) => {
    const el = document.getElementById(`year-${year}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="gtl">
      {/* Sticky jump-chips */}
      <nav className="gtl-chips" ref={chipsRef} aria-label={L('Jump to year', 'वर्ष चुनें', 'ವರ್ಷ ಆಯ್ಕೆಮಾಡಿ')}>
        {years.map((y) => (
          <button
            key={y}
            data-year={y}
            className={`gtl-chip${active === y ? ' gtl-chip--active' : ''}`}
            onClick={() => jumpTo(y)}
            aria-current={active === y ? 'true' : undefined}
          >
            {y}
          </button>
        ))}
      </nav>

      {/* Vertical spine + alternating year blocks */}
      <div className="gtl-timeline">
        {years.map((y, i) => (
          <YearBlock
            key={y}
            year={y}
            side={i % 2 === 0 ? 'left' : 'right'}
            onOpen={onOpen}
            L={L}
          />
        ))}
      </div>
    </div>
  );
}
