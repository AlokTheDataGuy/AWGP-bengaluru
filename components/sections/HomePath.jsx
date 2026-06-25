'use client';

import { useLocale } from 'next-intl';
import { Link } from '../../lib/i18n/navigation';
import { useReveal } from '../../lib/useReveal';
import './HomePath.css';

const HEAD = {
  en: {
    eyebrow: 'Our Mission',
    title: 'The Path of Growth',
    sub: 'A threefold journey of refinement — building the self, nurturing the family, and transforming society.',
  },
  hi: {
    eyebrow: 'हमारा ध्येय',
    title: 'विकास का पथ',
    sub: 'परिष्कार की त्रिविध यात्रा — व्यक्ति निर्माण, परिवार निर्माण और समाज निर्माण।',
  },
  kn: {
    eyebrow: 'ನಮ್ಮ ಧ್ಯೇಯ',
    title: 'ಬೆಳವಣಿಗೆಯ ಹಾದಿ',
    sub: 'ಪರಿಷ್ಕರಣೆಯ ತ್ರಿವಿಧ ಪ್ರಯಾಣ — ವ್ಯಕ್ತಿ ನಿರ್ಮಾಣ, ಕುಟುಂಬ ನಿರ್ಮಾಣ ಮತ್ತು ಸಮಾಜ ನಿರ್ಮಾಣ.',
  },
};

const STEPS = [
  {
    href: '/activities/sadhana',
    img: '/assets/programs/meditation.jpg',
    en: { name: 'Self Refinement', desc: 'Daily sadhana that awakens consciousness and inner strength.' },
    hi: { name: 'व्यक्ति निर्माण', desc: 'चेतना और आंतरिक शक्ति को जगाने वाली दैनिक साधना।' },
    kn: { name: 'ವ್ಯಕ್ತಿ ನಿರ್ಮಾಣ', desc: 'ಪ್ರಜ್ಞೆ ಮತ್ತು ಆಂತರಿಕ ಶಕ್ತಿಯನ್ನು ಜಾಗೃತಗೊಳಿಸುವ ದೈನಂದಿನ ಸಾಧನೆ.' },
  },
  {
    href: '/sanskars',
    img: '/assets/programs/bal-sanskar-shala.jpg',
    en: { name: 'Family Building', desc: 'Sacred sanskars that root values across every generation.' },
    hi: { name: 'परिवार निर्माण', desc: 'हर पीढ़ी में संस्कारों को रोपते पवित्र संस्कार।' },
    kn: { name: 'ಕುಟುಂಬ ನಿರ್ಮಾಣ', desc: 'ಪ್ರತಿ ತಲೆಮಾರಿನಲ್ಲಿ ಮೌಲ್ಯಗಳನ್ನು ಬೇರೂರಿಸುವ ಪವಿತ್ರ ಸಂಸ್ಕಾರಗಳು.' },
  },
  {
    href: '/activities/community-seva',
    img: '/assets/activities/seva.jpg',
    en: { name: 'Society Transformation', desc: 'Selfless seva that uplifts the community as one family.' },
    hi: { name: 'समाज निर्माण', desc: 'समाज को एक परिवार की तरह उठाती निःस्वार्थ सेवा।' },
    kn: { name: 'ಸಮಾಜ ನಿರ್ಮಾಣ', desc: 'ಸಮಾಜವನ್ನು ಒಂದು ಕುಟುಂಬವಾಗಿ ಎತ್ತುವ ನಿಸ್ವಾರ್ಥ ಸೇವೆ.' },
  },
];

export default function HomePath() {
  const locale = useLocale();
  const h = HEAD[locale] || HEAD.en;
  const ref = useReveal();

  return (
    <section className="home-path section section--dark" ref={ref}>
      <div className="section-inner">
        <div className="home-path__head">
          <span className="home-path__eyebrow">{h.eyebrow}</span>
          <h2 className="home-path__title">{h.title}</h2>
          <span className="home-path__ornament" aria-hidden="true" />
          <p className="home-path__sub">{h.sub}</p>
        </div>
      </div>

      <div className="home-path__grid">
        {STEPS.map((s, i) => {
          const d = s[locale] || s.en;
          return (
            <Link
              key={s.href}
              href={s.href}
              className="path-col"
              style={{ '--i': i, '--bg': `url('${s.img}')` }}
            >
              <span className="path-col__img" aria-hidden="true" />
              <span className="path-col__scrim" aria-hidden="true" />
              <span className="path-col__index" aria-hidden="true">{`0${i + 1}`}</span>
              <div className="path-col__body">
                <h3 className="path-col__name">{d.name}</h3>
                <p className="path-col__desc">{d.desc}</p>
                <span className="path-col__more" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="13 6 19 12 13 18" />
                  </svg>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
