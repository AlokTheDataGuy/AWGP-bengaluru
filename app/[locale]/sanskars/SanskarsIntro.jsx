'use client';
import { useState } from 'react';

const LABELS = {
  more: { en: 'Read more', hi: 'और पढ़ें', kn: 'ಇನ್ನಷ್ಟು ಓದಿ' },
  less: { en: 'Read less', hi: 'कम करें',  kn: 'ಕಡಿಮೆ ಮಾಡಿ' },
};

export default function SanskarsIntro({ paras, locale }) {
  const [expanded, setExpanded] = useState(false);
  const L = (o) => o[locale] ?? o.en;

  const visible = expanded ? paras : [paras[0]];

  return (
    <div className="skr-intro__body">
      {visible.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {paras.length > 1 && (
        <button
          className="skr-intro__read-more"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? L(LABELS.less) : L(LABELS.more)}
          <svg
            width="14" height="14" viewBox="0 0 14 14"
            fill="none" aria-hidden="true"
            style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}
          >
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
