'use client';

import { useEffect, useRef, useState } from 'react';
import './ReadMore.css';

const LABELS = {
  more: { en: 'Read more', hi: 'और पढ़ें', kn: 'ಇನ್ನಷ್ಟು ಓದಿ' },
  less: { en: 'Show less', hi: 'कम दिखाएं', kn: 'ಕಡಿಮೆ ತೋರಿಸಿ' },
};

/**
 * Clamps long copy to a fixed number of lines (fewer on mobile) and only
 * shows a "Read more" toggle when the text actually overflows — short
 * paragraphs render plainly with no dead control.
 */
export default function ReadMore({ children, lines = 6, mobileLines = 4, locale = 'en', className = '' }) {
  const textRef = useRef(null);
  const [overflows, setOverflows] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const L = (obj) => obj[locale] || obj.en;

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    setOverflows(el.scrollHeight - el.clientHeight > 2);
  }, [children]);

  return (
    <div className={`read-more ${expanded ? 'is-expanded' : ''} ${className}`}>
      <div
        ref={textRef}
        className="read-more__text"
        style={{ '--rm-lines': lines, '--rm-lines-mobile': mobileLines }}
      >
        {children}
      </div>
      {overflows && (
        <button
          type="button"
          className="read-more__toggle"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? L(LABELS.less) : L(LABELS.more)}
        </button>
      )}
    </div>
  );
}
