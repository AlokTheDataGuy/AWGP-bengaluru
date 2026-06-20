'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '../../lib/i18n/navigation';
import './HomeCards.css';

const cards = [
  {
    href: '/sanskars',
    image: '/assets/homepage/hero/sanskars-hero.jpg',
    eyebrowEn: 'Sacred Sacraments',
    eyebrowHi: 'पवित्र संस्कार',
    eyebrowKn: 'ಪವಿತ್ರ ಸಂಸ್ಕಾರಗಳು',
    titleEn: 'Sanskars',
    titleHi: 'संस्कार',
    titleKn: 'ಸಂಸ್ಕಾರಗಳು',
    descEn: "The 16 Vedic rites that sanctify life's milestones — from naamkaran to deeksha.",
    descHi: 'जीवन के पड़ावों को पवित्र करने वाले 16 वैदिक संस्कार — नामकरण से दीक्षा तक।',
    descKn: 'ಜೀವನದ ಮೈಲಿಗಲ್ಲುಗಳನ್ನು ಪವಿತ್ರಗೊಳಿಸುವ 16 ವೈದಿಕ ಸಂಸ್ಕಾರಗಳು — ನಾಮಕರಣದಿಂದ ದೀಕ್ಷೆವರೆಗೆ.',
  },
  {
    href: '/activities',
    image: '/assets/homepage/hero/gau-seva-hero.png',
    eyebrowEn: 'Community Service',
    eyebrowHi: 'सामुदायिक सेवा',
    eyebrowKn: 'ಸಮುದಾಯ ಸೇವೆ',
    titleEn: 'Activities',
    titleHi: 'गतिविधियां',
    titleKn: 'ಚಟುವಟಿಕೆಗಳು',
    descEn: 'Yoga, meditation, gau seva, tree plantation and seva that turn practice into action.',
    descHi: 'योग, ध्यान, गौ सेवा, वृक्षारोपण और सेवा — साधना को कर्म में बदलते हैं।',
    descKn: 'ಯೋಗ, ಧ್ಯಾನ, ಗೋ ಸೇವೆ, ವೃಕ್ಷಾರೋಪಣ ಮತ್ತು ಸೇವೆ — ಸಾಧನೆಯನ್ನು ಕ್ರಿಯೆಯಾಗಿ ಪರಿವರ್ತಿಸುತ್ತವೆ.',
  },
  {
    href: '/events',
    image: '/assets/homepage/hero/gayatri-maa.png',
    eyebrowEn: 'Gather & Celebrate',
    eyebrowHi: 'मिलें एवं उत्सव मनाएं',
    eyebrowKn: 'ಸೇರಿ ಮತ್ತು ಆಚರಿಸಿ',
    titleEn: 'Events',
    titleHi: 'कार्यक्रम',
    titleKn: 'ಕಾರ್ಯಕ್ರಮಗಳು',
    descEn: 'Yagyas, festivals and shivirs through the year — come together in shared light.',
    descHi: 'वर्ष भर यज्ञ, उत्सव और शिविर — साझा प्रकाश में एक साथ आएं।',
    descKn: 'ವರ್ಷವಿಡೀ ಯಜ್ಞ, ಉತ್ಸವ ಮತ್ತು ಶಿಬಿರಗಳು — ಹಂಚಿದ ಬೆಳಕಿನಲ್ಲಿ ಒಟ್ಟಿಗೆ ಸೇರಿ.',
  },
];

export default function HomeCards() {
  const locale = useLocale();
  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);
  const explore = L('Explore', 'देखें', 'ಅನ್ವೇಷಿಸಿ');

  return (
    <section className="paths section section--cream-2">
      {/* Traditional mandala watermarks */}
      <span className="paths__wm paths__wm--left" aria-hidden="true" />
      <span className="paths__wm paths__wm--right" aria-hidden="true" />

      <div className="section-inner">

        <div className="paths__head">
          <span className="paths__eyebrow">
            {L('What We Offer', 'हम क्या प्रदान करते हैं', 'ನಾವು ಏನು ನೀಡುತ್ತೇವೆ')}
          </span>
          <h2 className="paths__title">
            {L('Paths of Growth', 'विकास के मार्ग', 'ಬೆಳವಣಿಗೆಯ ಮಾರ್ಗಗಳು')}
          </h2>
          <span className="paths__divider" aria-hidden="true" />
        </div>

        <div className="paths__grid">
          {cards.map((p) => {
            const title = L(p.titleEn, p.titleHi, p.titleKn);
            return (
              <Link key={p.href} href={p.href} className="path-card" aria-label={title}>
                <Image
                  src={p.image}
                  alt=""
                  fill
                  className="path-card__img"
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
                <span className="path-card__scrim" aria-hidden="true" />

                <div className="path-card__content">
                  <span className="path-card__eyebrow">
                    {L(p.eyebrowEn, p.eyebrowHi, p.eyebrowKn)}
                  </span>
                  <h3 className="path-card__title">{title}</h3>
                  <p className="path-card__desc">
                    {L(p.descEn, p.descHi, p.descKn)}
                  </p>
                  <span className="path-card__cta">
                    {explore}
                    <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
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
