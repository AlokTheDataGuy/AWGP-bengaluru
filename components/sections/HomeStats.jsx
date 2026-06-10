'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import './HomeStats.css';

const STATS = [
  { num: '40+',   labelEn: 'Years of Service',  labelHi: 'सेवा के वर्ष',        labelKn: 'ಸೇವೆಯ ವರ್ಷಗಳು' },
  { num: '5000+', labelEn: 'Pariwar Members',   labelHi: 'परिवार सदस्य',        labelKn: 'ಪರಿವಾರ ಸದಸ್ಯರು' },
  { num: '12+',   labelEn: 'Active Programs',   labelHi: 'सक्रिय कार्यक्रम',     labelKn: 'ಸಕ್ರಿಯ ಕಾರ್ಯಕ್ರಮಗಳು' },
  { num: '200+',  labelEn: 'Yagyas Per Year',   labelHi: 'प्रति वर्ष यज्ञ',      labelKn: 'ಪ್ರತಿ ವರ್ಷ ಯಜ್ಞಗಳು' },
];

/* "5000+" -> { target: 5000, suffix: '+' } */
function parseNum(raw) {
  const m = String(raw).match(/^(\d[\d,]*)(.*)$/);
  if (!m) return { target: 0, suffix: raw };
  return { target: parseInt(m[1].replace(/,/g, ''), 10), suffix: m[2] };
}

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function StatNum({ raw, run }) {
  const { target, suffix } = parseNum(raw);
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
      setValue(Math.round(eased * target));
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [run, target]);

  return (
    <span className="home-stats__num" aria-hidden="true">
      {value}{suffix}
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
    <section className="home-stats" ref={ref}>
      <div className="home-stats__inner section-inner">
        {STATS.map((s) => (
          <div key={s.labelEn} className="home-stats__item">
            <StatNum raw={s.num} run={run} />
            <span className="home-stats__label">
              {L(s.labelEn, s.labelHi, s.labelKn)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
