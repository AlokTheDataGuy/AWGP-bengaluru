'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import './HomeStats.css';

const STATS = [
  { num: '15Cr+',  labelEn: 'Members',               labelHi: 'सदस्य',                       labelKn: 'ಸದಸ್ಯರು' },
  { num: '3500+',  labelEn: 'Centers',               labelHi: 'केंद्र',                       labelKn: 'ಕೇಂದ್ರಗಳು' },
  { num: '1.5Lc+', labelEn: 'Volunteers',            labelHi: 'स्वयंसेवक',                   labelKn: 'ಸ್ವಯಂಸೇವಕರು' },
  { num: '100+',   labelEn: 'Activities & Programs', labelHi: 'गतिविधियाँ एवं कार्यक्रम',     labelKn: 'ಚಟುವಟಿಕೆಗಳು ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳು' },
];

/* "15Cr+" -> { target: 15, suffix: 'Cr+', decimals: 0 }
   "1.5Lc+" -> { target: 1.5, suffix: 'Lc+', decimals: 1 } */
function parseNum(raw) {
  const m = String(raw).match(/^(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!m) return { target: 0, suffix: raw, decimals: 0 };
  const numStr = m[1].replace(/,/g, '');
  const dot = numStr.indexOf('.');
  const decimals = dot === -1 ? 0 : numStr.length - dot - 1;
  return { target: parseFloat(numStr), suffix: m[2], decimals };
}

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function StatNum({ raw, run }) {
  const { target, suffix, decimals } = parseNum(raw);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    const duration = 2000;
    let rafId;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setValue(eased * target);
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [run, target]);

  return (
    <span className="home-stats__num" aria-hidden="true">
      {value.toFixed(decimals)}{suffix}
    </span>
  );
}

export default function HomeStats() {
  const locale = useLocale();
  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);

  const ref = useRef(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className={`home-stats ${run ? 'is-visible' : ''}`} ref={ref}>
      <span className="home-stats__rays" aria-hidden="true" />
      <span className="home-stats__glow" aria-hidden="true" />

      <div className="home-stats__inner section-inner">
        <span className="home-stats__ornament" aria-hidden="true" />

        <div className="home-stats__grid">
          {STATS.map((s, i) => {
            const label = L(s.labelEn, s.labelHi, s.labelKn);
            return (
              <div
                key={s.labelEn}
                className="home-stats__item"
                style={{ '--i': i + 1 }}
                aria-label={`${s.num} ${label}`}
              >
                <StatNum raw={s.num} run={run} />
                <span className="home-stats__accent" aria-hidden="true" />
                <span className="home-stats__label" aria-hidden="true">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
