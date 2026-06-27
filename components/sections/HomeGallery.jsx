'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '../../lib/i18n/navigation';
import { useReveal } from '../../lib/useReveal';
import GalleryLightbox from '../ui/GalleryLightbox';
import '../ui/Media.css';
import './HomeGallery.css';

/* Row 1 scrolls left, row 2 scrolls right.
   Each item carries a trilingual caption shown in the lightbox. */
const row1 = [
  { src: '/assets/chetna-kendra/mandir.png',         en: 'Gayatri Mandir',     hi: 'गायत्री मंदिर',      kn: 'ಗಾಯತ್ರಿ ಮಂದಿರ' },
  { src: '/assets/programs/yoga_session.jpg',         en: 'Yoga Session',       hi: 'योग सत्र',          kn: 'ಯೋಗ ಅಧಿವೇಶನ' },
  { src: '/assets/activities/yagya.jpg',              en: 'Yagya',              hi: 'यज्ञ',              kn: 'ಯಜ್ಞ' },
  { src: '/assets/chetna-kendra/yagya-shala.png',     en: 'Yagya Shala',        hi: 'यज्ञ शाला',         kn: 'ಯಜ್ಞ ಶಾಲೆ' },
  { src: '/assets/programs/meditation.jpg',           en: 'Meditation',         hi: 'ध्यान',             kn: 'ಧ್ಯಾನ' },
  { src: '/assets/activities/tree-plantation.jpg',    en: 'Tree Plantation',    hi: 'वृक्षारोपण',         kn: 'ವೃಕ್ಷಾರೋಪಣ' },
  { src: '/assets/misc/deepyagya.jpg',                en: 'Deep Yagya',         hi: 'दीप यज्ञ',          kn: 'ದೀಪ ಯಜ್ಞ' },
  { src: '/assets/chetna-kendra/inauguration.jpg',    en: 'Inauguration',       hi: 'उद्घाटन',           kn: 'ಉದ್ಘಾಟನೆ' },
  { src: '/assets/programs/bal-sanskar-shala.jpg',    en: 'Bal Sanskar Shala',  hi: 'बाल संस्कार शाला',   kn: 'ಬಾಲ ಸಂಸ್ಕಾರ ಶಾಲೆ' },
  { src: '/assets/activities/blood-camp.jpg',         en: 'Blood Donation',     hi: 'रक्तदान शिविर',      kn: 'ರಕ್ತದಾನ ಶಿಬಿರ' },
];

const row2 = [
  { src: '/assets/shantikunj/shantikunj.jpg',         en: 'Shantikunj',         hi: 'शांतिकुंज',          kn: 'ಶಾಂತಿಕುಂಜ' },
  { src: '/assets/programs/festival.jpg',             en: 'Festival',           hi: 'पर्व उत्सव',        kn: 'ಹಬ್ಬದ ಆಚರಣೆ' },
  { src: '/assets/activities/food-distribution.jpg',  en: 'Food Distribution',  hi: 'अन्न वितरण',         kn: 'ಅನ್ನ ವಿತರಣೆ' },
  { src: '/assets/shantikunj/mandir.jpg',             en: 'Shantikunj Mandir',  hi: 'शांतिकुंज मंदिर',    kn: 'ಶಾಂತಿಕುಂಜ ಮಂದಿರ' },
  { src: '/assets/workshops/workshops.jpg',            en: 'Workshop',           hi: 'कार्यशाला',          kn: 'ಕಾರ್ಯಾಗಾರ' },
  { src: '/assets/activities/book-fair.jpg',          en: 'Book Fair',          hi: 'पुस्तक मेला',        kn: 'ಪುಸ್ತಕ ಮೇಳ' },
  { src: '/assets/misc/deepyagya1.jpg',               en: 'Deep Yagya',         hi: 'दीप यज्ञ',          kn: 'ದೀಪ ಯಜ್ಞ' },
  { src: '/assets/shantikunj/shivir.jpg',             en: 'Shivir',             hi: 'शिविर',             kn: 'ಶಿಬಿರ' },
  { src: '/assets/workshops/workshops1.jpg',           en: 'Workshop',           hi: 'कार्यशाला',          kn: 'ಕಾರ್ಯಾಗಾರ' },
  { src: '/assets/activities/gau-seva.jpg',           en: 'Gau Seva',           hi: 'गौ सेवा',            kn: 'ಗೌ ಸೇವೆ' },
];

function MarqueeRow({ items, reverse = false, baseIndex, captionFor, onOpen }) {
  /* Duplicate items to create a seamless infinite loop. The duplicate half
     maps back to the same source index so the lightbox opens the right photo. */
  const track = [...items, ...items];
  return (
    <div className={`gallery-row${reverse ? ' gallery-row--reverse' : ''}`}>
      <div className="gallery-track">
        {track.map((img, i) => {
          const caption = captionFor(img);
          return (
            <button
              key={i}
              type="button"
              className="gallery-item"
              onClick={() => onOpen(baseIndex + (i % items.length))}
              aria-label={caption}
            >
              <Image
                src={img.src}
                alt={caption}
                fill
                style={{ objectFit: 'cover' }}
                sizes="320px"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function HomeGallery() {
  const locale = useLocale();
  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);
  const captionFor = (img) => L(img.en, img.hi, img.kn);
  const ref = useReveal();

  /* One flat, ordered set for the lightbox (row1 then row2). */
  const items = [...row1, ...row2].map((img) => ({ src: img.src, caption: captionFor(img) }));

  const [lbIndex, setLbIndex] = useState(null);
  const open = useCallback((index) => setLbIndex(index), []);
  const close = useCallback(() => setLbIndex(null), []);

  return (
    <section className="home-gallery" ref={ref}>
<div className="home-gallery__bar">
        <div className="home-gallery__head">
          <span className="home-gallery__eyebrow">
            {L('Our Community', 'हमारा समुदाय', 'ನಮ್ಮ ಸಮುದಾಯ')}
          </span>
          <h2 className="home-gallery__title">
            {L('Moments from the Pariwar', 'परिवार के पल', 'ಪರಿವಾರದ ಕ್ಷಣಗಳು')}
          </h2>
        </div>

        <Link href="/media/gallery" className="home-gallery__cta">
          <span>{L('View Full Gallery', 'पूरी गैलरी देखें', 'ಸಂಪೂರ್ಣ ಗ್ಯಾಲರಿ ನೋಡಿ')}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <div className="home-gallery__marquee">
        <MarqueeRow items={row1} reverse={false} baseIndex={0} captionFor={captionFor} onOpen={open} />
        <MarqueeRow items={row2} reverse={true} baseIndex={row1.length} captionFor={captionFor} onOpen={open} />
      </div>

      {lbIndex !== null && (
        <GalleryLightbox items={items} index={lbIndex} onClose={close} onIndex={setLbIndex} />
      )}
    </section>
  );
}
