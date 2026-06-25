'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import GalleryTimeline from './GalleryTimeline';
import GalleryLightbox from './GalleryLightbox';
import './Media.css';

/* Category keys → trilingual labels */
const CATEGORIES = [
  { key: 'all',       en: 'All',                 hi: 'सभी',            kn: 'ಎಲ್ಲಾ' },
  { key: 'yagya',     en: 'Yagya & Festivals',   hi: 'यज्ञ एवं पर्व',  kn: 'ಯಜ್ಞ ಮತ್ತು ಹಬ್ಬ' },
  { key: 'seva',      en: 'Seva',                hi: 'सेवा',           kn: 'ಸೇವೆ' },
  { key: 'sadhana',   en: 'Sadhana',             hi: 'साधना',          kn: 'ಸಾಧನೆ' },
  { key: 'sanskars',  en: 'Sanskars',            hi: 'संस्कार',         kn: 'ಸಂಸ್ಕಾರ' },
  { key: 'kendra',    en: 'Chetna Kendra',       hi: 'चेतना केंद्र',    kn: 'ಚೇತನ ಕೇಂದ್ರ' },
];

const IMAGES = [
  { src: '/assets/misc/deepyagya.jpg',                cat: 'yagya',    en: 'Deep Yagya',          hi: 'दीप यज्ञ',          kn: 'ದೀಪ ಯಜ್ಞ' },
  { src: '/assets/activities/yagya.jpg',              cat: 'yagya',    en: 'Yagya',               hi: 'यज्ञ',              kn: 'ಯಜ್ಞ' },
  { src: '/assets/misc/deepyagya1.jpg',               cat: 'yagya',    en: 'Deep Yagya Evening',  hi: 'दीप यज्ञ संध्या',   kn: 'ದೀಪ ಯಜ್ಞ ಸಂಜೆ' },
  { src: '/assets/programs/akhand-jap.jpeg',          cat: 'yagya',    en: 'Akhand Jap',          hi: 'अखंड जप',           kn: 'ಅಖಂಡ ಜಪ' },
  { src: '/assets/programs/festival.jpg',             cat: 'yagya',    en: 'Festival',            hi: 'पर्व उत्सव',        kn: 'ಹಬ್ಬದ ಆಚರಣೆ' },
  { src: '/assets/festivals/rangoli.png',             cat: 'yagya',    en: 'Festival Rangoli',    hi: 'पर्व रंगोली',       kn: 'ಹಬ್ಬದ ರಂಗೋಲಿ' },

  { src: '/assets/activities/tree-plantation.jpg',    cat: 'seva',     en: 'Tree Plantation',     hi: 'वृक्षारोपण',         kn: 'ವೃಕ್ಷಾರೋಪಣ' },
  { src: '/assets/activities/blood-camp.jpg',         cat: 'seva',     en: 'Blood Donation',      hi: 'रक्तदान शिविर',      kn: 'ರಕ್ತದಾನ ಶಿಬಿರ' },
  { src: '/assets/activities/food-distribution.jpg',  cat: 'seva',     en: 'Food Distribution',   hi: 'अन्न वितरण',         kn: 'ಅನ್ನ ವಿತರಣೆ' },
  { src: '/assets/activities/gau-seva.jpg',           cat: 'seva',     en: 'Gau Seva',            hi: 'गौ सेवा',            kn: 'ಗೌ ಸೇವೆ' },
  { src: '/assets/activities/book-fair.jpg',          cat: 'seva',     en: 'Book Fair',           hi: 'पुस्तक मेला',        kn: 'ಪುಸ್ತಕ ಮೇಳ' },
  { src: '/assets/activities/hospital-visit.jpg',     cat: 'seva',     en: 'Hospital Seva',       hi: 'अस्पताल सेवा',       kn: 'ಆಸ್ಪತ್ರೆ ಸೇವೆ' },

  { src: '/assets/programs/meditation.jpg',           cat: 'sadhana',  en: 'Meditation',          hi: 'ध्यान',              kn: 'ಧ್ಯಾನ' },
  { src: '/assets/programs/yoga_session.jpg',         cat: 'sadhana',  en: 'Yoga Session',        hi: 'योग सत्र',           kn: 'ಯೋಗ ಅಧಿವೇಶನ' },
  { src: '/assets/programs/anusthan.png',             cat: 'sadhana',  en: 'Anusthan',            hi: 'अनुष्ठान',           kn: 'ಅನುಷ್ಠಾನ' },
  { src: '/assets/programs/workshops.jpg',            cat: 'sadhana',  en: 'Workshop',            hi: 'कार्यशाला',          kn: 'ಕಾರ್ಯಾಗಾರ' },
  { src: '/assets/programs/bal-sanskar-shala.jpg',    cat: 'sadhana',  en: 'Bal Sanskar Shala',   hi: 'बाल संस्कार शाला',    kn: 'ಬಾಲ ಸಂಸ್ಕಾರ ಶಾಲೆ' },

  { src: '/assets/sanskars/naamkaran.jpg',            cat: 'sanskars', en: 'Naamkaran',           hi: 'नामकरण',             kn: 'ನಾಮಕರಣ' },
  { src: '/assets/sanskars/annaprashan.jpg',          cat: 'sanskars', en: 'Annaprashan',         hi: 'अन्नप्राशन',          kn: 'ಅನ್ನಪ್ರಾಶನ' },
  { src: '/assets/sanskars/mundan.jpg',               cat: 'sanskars', en: 'Mundan',              hi: 'मुंडन',               kn: 'ಮುಂಡನ' },
  { src: '/assets/sanskars/vidyaarambh.jpg',          cat: 'sanskars', en: 'Vidyarambh',          hi: 'विद्यारंभ',           kn: 'ವಿದ್ಯಾರಂಭ' },
  { src: '/assets/sanskars/yagyopaveet.jpg',          cat: 'sanskars', en: 'Yagyopaveet',         hi: 'यज्ञोपवीत',           kn: 'ಯಜ್ಞೋಪವೀತ' },
  { src: '/assets/sanskars/deeksha.jpg',              cat: 'sanskars', en: 'Gayatri Deeksha',     hi: 'गायत्री दीक्षा',       kn: 'ಗಾಯತ್ರಿ ದೀಕ್ಷೆ' },

  { src: '/assets/chetna-kendra/mandir.png',          cat: 'kendra',   en: 'Gayatri Mandir',      hi: 'गायत्री मंदिर',       kn: 'ಗಾಯತ್ರಿ ಮಂದಿರ' },
  { src: '/assets/chetna-kendra/building.png',        cat: 'kendra',   en: 'Chetna Kendra',       hi: 'चेतना केंद्र',         kn: 'ಚೇತನ ಕೇಂದ್ರ' },
  { src: '/assets/chetna-kendra/gaushala.png',        cat: 'kendra',   en: 'Gaushala',            hi: 'गौशाला',              kn: 'ಗೋಶಾಲೆ' },
  { src: '/assets/chetna-kendra/yagya-shala.png',     cat: 'kendra',   en: 'Yagya Shala',         hi: 'यज्ञ शाला',           kn: 'ಯಜ್ಞ ಶಾಲೆ' },
  { src: '/assets/chetna-kendra/library.png',         cat: 'kendra',   en: 'Library',             hi: 'पुस्तकालय',           kn: 'ಗ್ರಂಥಾಲಯ' },
  { src: '/assets/chetna-kendra/inauguration.jpg',    cat: 'kendra',   en: 'Inauguration',        hi: 'उद्घाटन',             kn: 'ಉದ್ಘಾಟನೆ' },
];

export default function GalleryClient() {
  const locale = useLocale();
  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);
  const Lc = (item) => (item && (item[locale] || item.en)) || '';

  const [view, setView] = useState('year'); // 'year' | 'theme'
  const [active, setActive] = useState('all');
  const [lb, setLb] = useState(null); // { items, index } | null

  const open = useCallback((items, index) => setLb({ items, index }), []);
  const close = useCallback(() => setLb(null), []);
  const setIndex = useCallback((index) => setLb((s) => (s ? { ...s, index } : s)), []);

  const shown = active === 'all' ? IMAGES : IMAGES.filter((i) => i.cat === active);
  const themeItems = shown.map((img) => ({ src: img.src, caption: Lc(img) }));

  return (
    <>
      {/* Page head */}
      <div className="gal-head">
        <span className="sec-head__eyebrow">{L('Our Journey', 'हमारी यात्रा', 'ನಮ್ಮ ಪ್ರಯಾಣ')}</span>
        <h1 className="gal-head__title">{L('A Decade of Light', 'प्रकाश का एक दशक', 'ಬೆಳಕಿನ ಒಂದು ದಶಕ')}</h1>
        <div className="gal-head__divider" aria-hidden="true">
          <span /><span className="gal-head__diamond" /><span />
        </div>
        <p className="gal-head__stats">
          {L('9 Years', '9 वर्ष', '9 ವರ್ಷ')} · {L('One Pariwar', 'एक परिवार', 'ಒಂದು ಪರಿವಾರ')}
        </p>
      </div>

      {/* View toggle */}
      <div className="gal-toggle" role="tablist" aria-label={L('Gallery view', 'गैलरी दृश्य', 'ಗ್ಯಾಲರಿ ನೋಟ')}>
        <button
          role="tab"
          aria-selected={view === 'year'}
          className={`gal-toggle__btn${view === 'year' ? ' gal-toggle__btn--active' : ''}`}
          onClick={() => setView('year')}
        >
          {L('By Year', 'वर्षानुसार', 'ವರ್ಷವಾರು')}
        </button>
        <button
          role="tab"
          aria-selected={view === 'theme'}
          className={`gal-toggle__btn${view === 'theme' ? ' gal-toggle__btn--active' : ''}`}
          onClick={() => setView('theme')}
        >
          {L('By Theme', 'विषयानुसार', 'ವಿಷಯವಾರು')}
        </button>
      </div>

      {/* By Year — timeline */}
      {view === 'year' && <GalleryTimeline onOpen={open} />}

      {/* By Theme — category masonry */}
      {view === 'theme' && (
        <>
          <div className="gal-filters">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                className={`gal-filter${active === c.key ? ' gal-filter--active' : ''}`}
                onClick={() => setActive(c.key)}
              >
                {Lc(c)}
              </button>
            ))}
          </div>

          <div className="gal-grid">
            {shown.map((img, i) => (
              <button
                key={img.src}
                className="gal-item"
                onClick={() => open(themeItems, i)}
                aria-label={Lc(img)}
              >
                <Image
                  src={img.src}
                  alt={Lc(img)}
                  width={500}
                  height={500}
                  sizes="(max-width: 420px) 100vw, (max-width: 760px) 50vw, (max-width: 1100px) 33vw, 25vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <span className="gal-item__overlay">
                  <span className="gal-item__caption">{Lc(img)}</span>
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Shared lightbox */}
      {lb && (
        <GalleryLightbox
          items={lb.items}
          index={lb.index}
          onClose={close}
          onIndex={setIndex}
        />
      )}
    </>
  );
}
