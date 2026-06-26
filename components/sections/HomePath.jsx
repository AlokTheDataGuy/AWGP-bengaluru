'use client';

import { useLocale } from 'next-intl';
import { Link } from '../../lib/i18n/navigation';
import { useReveal } from '../../lib/useReveal';
import './HomePath.css';

const HEAD = {
  en: {
    eyebrow: 'What We Offer',
    title: 'Paths of Growth',
    sub: 'Sacred rites, living practice and shared celebration — the ways we walk forward together.',
  },
  hi: {
    eyebrow: 'हम क्या प्रदान करते हैं',
    title: 'विकास के मार्ग',
    sub: 'पवित्र संस्कार, जीवंत साधना और साझा उत्सव — वे राहें जिन पर हम साथ चलते हैं।',
  },
  kn: {
    eyebrow: 'ನಾವು ಏನು ನೀಡುತ್ತೇವೆ',
    title: 'ಬೆಳವಣಿಗೆಯ ಮಾರ್ಗಗಳು',
    sub: 'ಪವಿತ್ರ ಸಂಸ್ಕಾರ, ಜೀವಂತ ಸಾಧನೆ ಮತ್ತು ಹಂಚಿದ ಆಚರಣೆ — ನಾವು ಒಟ್ಟಿಗೆ ಮುನ್ನಡೆಯುವ ಹಾದಿಗಳು.',
  },
};

const CTA = { en: 'Explore', hi: 'जानें', kn: 'ಅನ್ವೇಷಿಸಿ' };

const STEPS = [
  {
    href: '/sanskars',
    img: '/assets/path_of_growth/sanskar.png',
    en: { name: 'Sanskars', desc: "The 16 Vedic rites that sanctify life's milestones — from naamkaran to deeksha." },
    hi: { name: 'संस्कार', desc: 'जीवन के पड़ावों को पवित्र करने वाले 16 वैदिक संस्कार — नामकरण से दीक्षा तक।' },
    kn: { name: 'ಸಂಸ್ಕಾರಗಳು', desc: 'ಜೀವನದ ಮೈಲಿಗಲ್ಲುಗಳನ್ನು ಪವಿತ್ರಗೊಳಿಸುವ 16 ವೈದಿಕ ಸಂಸ್ಕಾರಗಳು — ನಾಮಕರಣದಿಂದ ದೀಕ್ಷೆವರೆಗೆ.' },
  },
  {
    href: '/activities',
    img: '/assets/path_of_growth/activities.png',
    en: { name: 'Activities', desc: 'Yoga, workshops, meditation, sadhna and seva that turn practice into action.' },
    hi: { name: 'गतिविधियां', desc: 'योग, कार्यशालाएं, ध्यान, साधना और सेवा — अभ्यास को कर्म में बदलते हैं।' },
    kn: { name: 'ಚಟುವಟಿಕೆಗಳು', desc: 'ಯೋಗ, ಕಾರ್ಯಾಗಾರಗಳು, ಧ್ಯಾನ, ಸಾಧನೆ ಮತ್ತು ಸೇವೆ — ಅಭ್ಯಾಸವನ್ನು ಕ್ರಿಯೆಯಾಗಿ ಪರಿವರ್ತಿಸುತ್ತವೆ.' },
  },
  {
    href: '/programs',
    img: '/assets/path_of_growth/events.jpg',
    en: { name: 'Programs', desc: 'Yagyas, festivals and drives through the year — come together in shared light.' },
    hi: { name: 'कार्यक्रम', desc: 'वर्ष भर यज्ञ, उत्सव और अभियान — साझा प्रकाश में एक साथ आएं।' },
    kn: { name: 'ಕಾರ್ಯಕ್ರಮಗಳು', desc: 'ವರ್ಷವಿಡೀ ಯಜ್ಞ, ಉತ್ಸವ ಮತ್ತು ಅಭಿಯಾನ — ಹಂಚಿದ ಬೆಳಕಿನಲ್ಲಿ ಒಟ್ಟಿಗೆ ಸೇರಿ.' },
  },
];

export default function HomePath() {
  const locale = useLocale();
  const h = HEAD[locale] || HEAD.en;
  const cta = CTA[locale] || CTA.en;
  const ref = useReveal();

  return (
    <section className="home-path section" ref={ref}>
      <div className="section-inner">
        <div className="home-path__head">
          <span className="home-path__eyebrow">{h.eyebrow}</span>
          <h2 className="home-path__title">{h.title}</h2>
          <span className="home-path__ornament" aria-hidden="true" />
          <p className="home-path__sub">{h.sub}</p>
        </div>

        <div className="home-path__grid">
          {STEPS.map((s, i) => {
            const d = s[locale] || s.en;
            return (
              <Link key={s.href} href={s.href} className="path-step" style={{ '--i': i }}>
                <span className="path-step__node">
                  <span className="path-step__img" style={{ '--bg': `url('${s.img}')` }} aria-hidden="true" />
                  <span className="path-step__frame" aria-hidden="true" />
                </span>

                <div className="path-step__body">
                  <h3 className="path-step__name">{d.name}</h3>
                  <p className="path-step__desc">{d.desc}</p>
                  <span className="path-step__more">
                    {cta}
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="13 6 19 12 13 18" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
