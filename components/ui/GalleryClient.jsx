'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const L = (item) => (item && (item[locale] || item.en)) || '';

  const [active, setActive] = useState('all');
  const [lightbox, setLightbox] = useState(null); // index into `shown` or null

  const shown = active === 'all' ? IMAGES : IMAGES.filter((i) => i.cat === active);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => (i === null ? i : (i - 1 + shown.length) % shown.length)), [shown.length]);
  const next = useCallback(() => setLightbox((i) => (i === null ? i : (i + 1) % shown.length)), [shown.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, close, prev, next]);

  const current = lightbox === null ? null : shown[lightbox];

  return (
    <>
      {/* Filter tabs */}
      <div className="gal-filters">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            className={`gal-filter${active === c.key ? ' gal-filter--active' : ''}`}
            onClick={() => { setActive(c.key); }}
          >
            {L(c)}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="gal-grid">
        {shown.map((img, i) => (
          <button
            key={img.src}
            className="gal-item"
            onClick={() => setLightbox(i)}
            aria-label={L(img)}
          >
            <Image
              src={img.src}
              alt={L(img)}
              width={500}
              height={500}
              sizes="(max-width: 560px) 50vw, (max-width: 900px) 33vw, 25vw"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <span className="gal-item__overlay">
              <span className="gal-item__caption">{L(img)}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {current && (
        <div className="gal-lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button className="gal-lb-close" onClick={close} aria-label="Close"><X size={26} /></button>
          <button className="gal-lb-nav gal-lb-nav--prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous"><ChevronLeft size={32} /></button>
          <figure className="gal-lb-figure" onClick={(e) => e.stopPropagation()}>
            <Image
              src={current.src}
              alt={L(current)}
              width={1400}
              height={1000}
              sizes="90vw"
              style={{ width: 'auto', height: 'auto', maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain' }}
            />
            <figcaption className="gal-lb-caption">{L(current)}</figcaption>
          </figure>
          <button className="gal-lb-nav gal-lb-nav--next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next"><ChevronRight size={32} /></button>
        </div>
      )}
    </>
  );
}
