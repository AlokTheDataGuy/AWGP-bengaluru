'use client';
import { useState, useEffect } from 'react';

export default function CollapsibleText({ text, wordLimit = 60, className = '', moreLabel = 'Read more', lessLabel = 'Read less' }) {
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const words = text.split(/\s+/);
  const isLong = words.length > wordLimit;
  const clipped = isMobile && isLong && !expanded;
  const displayText = clipped ? words.slice(0, wordLimit).join(' ') + '…' : text;

  return (
    <p className={className}>
      {displayText}
      {isMobile && isLong && (
        <>
          {' '}
          <button
            className="skd-read-more"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded ? lessLabel : moreLabel}
            <svg
              width="13" height="13" viewBox="0 0 14 14"
              fill="none" aria-hidden="true"
              style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}
            >
              <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}
    </p>
  );
}
