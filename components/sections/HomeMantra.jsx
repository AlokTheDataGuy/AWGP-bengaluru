'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useReveal } from '../../lib/useReveal';
import './HomeMantra.css';

/* The Gayatri Mantra — ancient Vedic verse (Rigveda 3.62.10) */
const MANTRA = [
  'ॐ भूर्भुवः स्वः । तत्सवितुर्वरेण्यं',
  'भर्गो देवस्य धीमहि । धियो यो नः प्रचोदयात् ॥',
];

const COPY = {
  en: {
    eyebrow: 'The Eternal Mantra',
    translit:
      'Om Bhūr Bhuvaḥ Svaḥ, Tat Savitur Vareṇyaṃ, Bhargo Devasya Dhīmahi, Dhiyo Yo Naḥ Prachodayāt.',
    meaning:
      'We meditate upon the radiant glory of the divine Light that sustains the earth, the heavens, and all that lies beyond. May that supreme effulgence illumine our intellect and guide us toward truth.',
  },
  hi: {
    eyebrow: 'शाश्वत महामंत्र',
    translit:
      'ॐ भूर्भुवः स्वः, तत्सवितुर्वरेण्यं, भर्गो देवस्य धीमहि, धियो यो नः प्रचोदयात्।',
    meaning:
      'हम उस दिव्य ज्योति के तेज का ध्यान करते हैं, जो पृथ्वी, अंतरिक्ष और उससे परे सबका आधार है। वह परम तेज हमारी बुद्धि को प्रकाशित करे और हमें सत्य की ओर प्रेरित करे।',
  },
  kn: {
    eyebrow: 'ಶಾಶ್ವತ ಮಹಾಮಂತ್ರ',
    translit:
      'ಓಂ ಭೂರ್ಭುವಃ ಸ್ವಃ, ತತ್ಸವಿತುರ್ವರೇಣ್ಯಂ, ಭರ್ಗೋ ದೇವಸ್ಯ ಧೀಮಹಿ, ಧಿಯೋ ಯೋ ನಃ ಪ್ರಚೋದಯಾತ್।',
    meaning:
      'ಭೂಮಿ, ಆಕಾಶ ಮತ್ತು ಅದರಾಚೆಗಿನ ಎಲ್ಲವನ್ನೂ ಪೋಷಿಸುವ ದಿವ್ಯ ಜ್ಯೋತಿಯ ತೇಜಸ್ಸನ್ನು ನಾವು ಧ್ಯಾನಿಸುತ್ತೇವೆ. ಆ ಪರಮ ತೇಜಸ್ಸು ನಮ್ಮ ಬುದ್ಧಿಯನ್ನು ಬೆಳಗಲಿ ಮತ್ತು ಸತ್ಯದೆಡೆಗೆ ನಮ್ಮನ್ನು ನಡೆಸಲಿ.',
  },
};

/* Hanging temple diyas in the top-right corner */
const DIYAS = [
  { x: 40, len: 118 },
  { x: 110, len: 168 },
  { x: 178, len: 92 },
];

function HangingDiyas() {
  return (
    <svg
      className="home-mantra__diyas"
      viewBox="0 0 230 250"
      width="230"
      height="250"
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id="diyaGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBE08A" />
          <stop offset="0.5" stopColor="#E9B94A" />
          <stop offset="1" stopColor="#B97E25" />
        </linearGradient>
        <radialGradient id="diyaFlame" cx="0.5" cy="0.3" r="0.7">
          <stop offset="0" stopColor="#FFF3C4" />
          <stop offset="0.45" stopColor="#FFC24D" />
          <stop offset="1" stopColor="#F57C00" />
        </radialGradient>
      </defs>

      {DIYAS.map(({ x, len }) => (
        <g key={x} className="home-mantra__diya">
          {/* chain */}
          <line x1={x} y1="0" x2={x} y2={len} stroke="#D9A93E" strokeWidth="1" opacity="0.85" />
          {[0.25, 0.45, 0.65, 0.85].map((t) => (
            <circle key={t} cx={x} cy={len * t} r="1.4" fill="#E9B94A" />
          ))}
          {/* hanger ring */}
          <circle cx={x} cy={len} r="2.6" fill="none" stroke="url(#diyaGold)" strokeWidth="1.4" />
          {/* flame */}
          <path
            d={`M ${x} ${len + 3} C ${x - 5} ${len - 3} ${x - 3} ${len - 12} ${x} ${len - 15} C ${x + 3} ${len - 12} ${x + 5} ${len - 3} ${x} ${len + 3} Z`}
            fill="url(#diyaFlame)"
          />
          {/* lamp bowl */}
          <path
            d={`M ${x - 19} ${len + 7} Q ${x} ${len + 26} ${x + 19} ${len + 7} Q ${x + 13} ${len + 3} ${x} ${len + 4} Q ${x - 13} ${len + 3} ${x - 19} ${len + 7} Z`}
            fill="url(#diyaGold)"
          />
          <path
            d={`M ${x - 19} ${len + 7} Q ${x} ${len + 12} ${x + 19} ${len + 7}`}
            stroke="#8A5A1A"
            strokeWidth="0.8"
            opacity="0.5"
          />
        </g>
      ))}
    </svg>
  );
}

export default function HomeMantra() {
  const locale = useLocale();
  const c = COPY[locale] || COPY.en;
  const ref = useReveal(0.2);
  const [imgOk, setImgOk] = useState(true);

  return (
    <section className="home-mantra section--dark" ref={ref}>
      {/* faint mandala watermark + hanging diyas */}
      <span className="home-mantra__watermark" aria-hidden="true" />
      <HangingDiyas />

      <div className="home-mantra__inner section-inner">

        {/* Eyebrow + lotus flourish */}
        <header className="home-mantra__head">
          <span className="home-mantra__eyebrow">{c.eyebrow}</span>
          <img
            className="home-mantra__flourish"
            src="/assets/designs/divider1.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
        </header>

        <div className="home-mantra__body">

          {/* Left — Gayatri Mata within a rotating gold mandala */}
          <figure className="home-mantra__figure">
            <span className="home-mantra__frame" aria-hidden="true" />
            <span className="home-mantra__ring" aria-hidden="true" />
            <span className="home-mantra__halo" aria-hidden="true" />
            {imgOk ? (
              <img
                className="home-mantra__deity"
                src="/assets/designs/gayatri-maa-icon.png"
                alt="Maa Gayatri"
                loading="lazy"
                onError={() => setImgOk(false)}
              />
            ) : (
              <span className="home-mantra__om" aria-hidden="true">ॐ</span>
            )}
          </figure>

          {/* Right — verse, transliteration, meaning */}
          <div className="home-mantra__content">
            <p className="home-mantra__verse" lang="sa">
              {MANTRA.map((line, i) => (
                <span className="home-mantra__verse-line" style={{ '--i': i }} key={i}>
                  {line}
                </span>
              ))}
            </p>

            <p className="home-mantra__translit">{c.translit}</p>

            <div className="home-mantra__divider" aria-hidden="true">
              <span className="home-mantra__divider-line" />
              <span className="home-mantra__divider-diamond" />
            </div>

            <p className="home-mantra__meaning">{c.meaning}</p>
          </div>

        </div>
      </div>
    </section>
  );
}
