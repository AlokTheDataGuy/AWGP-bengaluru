'use client';

import { useLocale } from 'next-intl';
import { Link } from '../../lib/i18n/navigation';
import { useReveal } from '../../lib/useReveal';
import './HomePillars.css';

const HEAD = {
  en: {
    eyebrow: 'The Foundation',
    title: 'Our Four Pillars',
    sub: 'The foundation of our journey towards individual excellence and social transformation.',
  },
  hi: {
    eyebrow: 'आधारशिला',
    title: 'हमारे चार स्तंभ',
    sub: 'व्यक्तिगत उत्कृष्टता और सामाजिक परिवर्तन की हमारी यात्रा का आधार।',
  },
  kn: {
    eyebrow: 'ಅಡಿಪಾಯ',
    title: 'ನಮ್ಮ ನಾಲ್ಕು ಸ್ತಂಭಗಳು',
    sub: 'ವೈಯಕ್ತಿಕ ಶ್ರೇಷ್ಠತೆ ಮತ್ತು ಸಾಮಾಜಿಕ ಪರಿವರ್ತನೆಯ ನಮ್ಮ ಪ್ರಯಾಣದ ಅಡಿಪಾಯ.',
  },
};

const PILLARS = [
  {
    href: '/activities/sadhana',
    key: 'sadhana',
    en: { name: 'Sadhna',     meaning: 'Daily spiritual practices to elevate consciousness and inner strength.' },
    hi: { name: 'साधना',      meaning: 'चेतना और आंतरिक शक्ति को ऊँचा उठाने के लिए दैनिक आध्यात्मिक अभ्यास।' },
    kn: { name: 'ಸಾಧನೆ',      meaning: 'ಪ್ರಜ್ಞೆ ಮತ್ತು ಆಂತರಿಕ ಶಕ್ತಿಯನ್ನು ಎತ್ತರಿಸಲು ದೈನಂದಿನ ಆಧ್ಯಾತ್ಮಿಕ ಅಭ್ಯಾಸಗಳು.' },
  },
  {
    href: '/swadhyaya',
    key: 'swadhyaya',
    en: { name: 'Swadhyay',   meaning: 'Self study of wisdom literature for knowledge and self-realization.' },
    hi: { name: 'स्वाध्याय',   meaning: 'ज्ञान और आत्म-साक्षात्कार के लिए सद्ग्रंथों का स्वाध्याय।' },
    kn: { name: 'ಸ್ವಾಧ್ಯಾಯ',  meaning: 'ಜ್ಞಾನ ಮತ್ತು ಆತ್ಮಸಾಕ್ಷಾತ್ಕಾರಕ್ಕಾಗಿ ಜ್ಞಾನ ಸಾಹಿತ್ಯದ ಸ್ವಾಧ್ಯಾಯ.' },
  },
  {
    href: '/sanyam',
    key: 'sanyam',
    en: { name: 'Sanyam',     meaning: 'Discipline in thoughts, words and actions for a balanced life.' },
    hi: { name: 'संयम',       meaning: 'संतुलित जीवन के लिए विचार, वाणी और कर्म में अनुशासन।' },
    kn: { name: 'ಸಂಯಮ',       meaning: 'ಸಮತೋಲನ ಜೀವನಕ್ಕಾಗಿ ವಿಚಾರ, ಮಾತು ಮತ್ತು ಕ್ರಿಯೆಯಲ್ಲಿ ಶಿಸ್ತು.' },
  },
  {
    href: '/seva',
    key: 'seva',
    en: { name: 'Seva',       meaning: 'Selfless service towards society for collective upliftment.' },
    hi: { name: 'सेवा',        meaning: 'सामूहिक उत्थान के लिए समाज की निःस्वार्थ सेवा।' },
    kn: { name: 'ಸೇವೆ',        meaning: 'ಸಾಮೂಹಿಕ ಉನ್ನತಿಗಾಗಿ ಸಮಾಜದ ನಿಸ್ವಾರ್ಥ ಸೇವೆ.' },
  },
];

/* Pillar icons — colourful diya PNGs from /public/assets/icon */
const ICONS = {
  sadhana: '/assets/icon/sadhna1.png',
  swadhyaya: '/assets/icon/swadhayay1.png',
  sanyam: '/assets/icon/sanyam1.png',
  seva: '/assets/icon/seva1.png',
};

export default function HomePillars() {
  const locale = useLocale();
  const h = HEAD[locale] || HEAD.en;
  const ref = useReveal();

  return (
    <section className="home-pillars section" ref={ref}>
      <span className="pillars__mandala" aria-hidden="true" />

      <div className="section-inner home-pillars__inner">

        <div className="pillars__head">
          <span className="pillars__eyebrow">{h.eyebrow}</span>
          <h2 className="pillars__title">{h.title}</h2>
          <span className="pillars__divider" aria-hidden="true" />
          <p className="pillars__sub">{h.sub}</p>
        </div>

        <div className="home-pillars__grid">
          {PILLARS.map((p, i) => {
            const d = p[locale] || p.en;
            return (
              <Link key={p.href} href={p.href} className="pillar-card" style={{ '--i': i }}>
                <span className="pillar-card__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="pillar-card__medallion">
                  <img src={ICONS[p.key]} alt="" aria-hidden="true" loading="lazy" />
                </span>

                <h3 className="pillar-card__name">{d.name}</h3>
                <p className="pillar-card__desc">{d.meaning}</p>

                <span className="pillar-card__arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="13 6 19 12 13 18" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
