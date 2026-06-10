'use client';

import { useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { MdMenuBook, MdBalance, MdVolunteerActivism } from 'react-icons/md';
import { Link } from '../../lib/i18n/navigation';
import './HomePillars.css';

/* Flat diya (oil lamp) — no icon set ships one, so it's a filled SVG
   in the same solid style as the Material icons (fills via currentColor). */
function DiyaIcon(props) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" {...props}>
      {/* flame */}
      <path d="M256 104c-20 50-54 80-54 126a54 54 0 0 0 108 0c0-32-24-56-38-84-7-15-12-28-16-42z" />
      {/* wick bridging flame to the bowl */}
      <path d="M246 250h20l-4 64h-12z" />
      {/* lamp bowl (boat shape, rim raised at the tips) */}
      <path d="M40 298c84 22 348 22 432 0-10 64-92 110-216 110S50 362 40 298z" />
    </svg>
  );
}

const HEAD = {
  en: {
    title: 'Our Four Pillars',
    sub: 'The foundation of our journey towards individual excellence and social transformation.',
  },
  hi: {
    title: 'हमारे चार स्तंभ',
    sub: 'व्यक्तिगत उत्कृष्टता और सामाजिक परिवर्तन की हमारी यात्रा का आधार।',
  },
  kn: {
    title: 'ನಮ್ಮ ನಾಲ್ಕು ಸ್ತಂಭಗಳು',
    sub: 'ವೈಯಕ್ತಿಕ ಶ್ರೇಷ್ಠತೆ ಮತ್ತು ಸಾಮಾಜಿಕ ಪರಿವರ್ತನೆಯ ನಮ್ಮ ಪ್ರಯಾಣದ ಅಡಿಪಾಯ.',
  },
};

const PILLARS = [
  {
    href: '/sadhana',
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

/* Flat icons — colour inherits from the badge via currentColor */
const ICONS = {
  sadhana: <DiyaIcon />,
  swadhyaya: <MdMenuBook aria-hidden="true" />,
  sanyam: <MdBalance aria-hidden="true" />,
  seva: <MdVolunteerActivism aria-hidden="true" />,
};

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export default function HomePillars() {
  const locale = useLocale();
  const h = HEAD[locale] || HEAD.en;
  const ref = useReveal();

  return (
    <section className="home-pillars section section--cream" ref={ref}>
      <div className="section-inner">

        <div className="pillars__head">
          <h2 className="pillars__title">{h.title}</h2>
          <span className="pillars__ornament" aria-hidden="true" />
          <p className="pillars__sub">{h.sub}</p>
        </div>

        <div className="home-pillars__grid">
          {PILLARS.map((p, i) => {
            const d = p[locale] || p.en;
            return (
              <Link key={p.href} href={p.href} className="pillar-col" style={{ '--i': i }}>
                <span className="pillar-col__icon">{ICONS[p.key]}</span>
                <h3 className="pillar-col__name">{d.name}</h3>
                <p className="pillar-col__desc">{d.meaning}</p>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
