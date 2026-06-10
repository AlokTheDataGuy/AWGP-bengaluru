'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import './HomeGallery.css';

/* Row 1 scrolls left, row 2 scrolls right */
const row1 = [
  { src: '/assets/chetna-kendra/mandir.png',          alt: 'Gayatri Mandir' },
  { src: '/assets/programs/yoga_session.jpg',          alt: 'Yoga Session' },
  { src: '/assets/activities/yagya.jpg',               alt: 'Yagya' },
  { src: '/assets/chetna-kendra/yagya-shala.png',      alt: 'Yagya Shala' },
  { src: '/assets/programs/meditation.jpg',            alt: 'Meditation' },
  { src: '/assets/activities/tree-plantation.jpg',     alt: 'Tree Plantation' },
  { src: '/assets/misc/deepyagya.jpg',                 alt: 'Deep Yagya' },
  { src: '/assets/chetna-kendra/inauguration.jpg',     alt: 'Inauguration' },
  { src: '/assets/programs/bal-sanskar-shala.jpg',     alt: 'Bal Sanskar Shala' },
  { src: '/assets/activities/blood-camp.jpg',          alt: 'Blood Donation' },
];

const row2 = [
  { src: '/assets/shantikunj/shantikunj.jpg',          alt: 'Shantikunj' },
  { src: '/assets/programs/festival.jpg',              alt: 'Festival' },
  { src: '/assets/activities/food-distribution.jpg',   alt: 'Food Distribution' },
  { src: '/assets/shantikunj/mandir.jpg',              alt: 'Shantikunj Mandir' },
  { src: '/assets/programs/workshops.jpg',             alt: 'Workshop' },
  { src: '/assets/activities/book-fair.jpg',           alt: 'Book Fair' },
  { src: '/assets/misc/deepyagya1.jpg',                alt: 'Deep Yagya' },
  { src: '/assets/shantikunj/shivir.jpg',              alt: 'Shivir' },
  { src: '/assets/programs/workshops1.jpg',            alt: 'Workshop' },
  { src: '/assets/activities/gau-seva.jpg',            alt: 'Gau Seva' },
];

function MarqueeRow({ items, reverse = false }) {
  /* Duplicate items to create seamless infinite loop */
  const track = [...items, ...items];
  return (
    <div className={`gallery-row${reverse ? ' gallery-row--reverse' : ''}`}>
      <div className="gallery-track">
        {track.map((img, i) => (
          <div key={i} className="gallery-item">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              style={{ objectFit: 'cover' }}
              sizes="280px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomeGallery() {
  const locale = useLocale();
  const L = (en, hi, kn) => locale === 'hi' ? hi : locale === 'kn' ? kn : en;

  return (
    <section className="home-gallery">
      <div className="home-gallery__head section-inner">
        <span className="sec-head__eyebrow sec-head__eyebrow--light">
          {L('Our Community', 'हमारा समुदाय', 'ನಮ್ಮ ಸಮುದಾಯ')}
        </span>
        <h2 className="home-gallery__title">
          {L('Moments from the Pariwar', 'परिवार के पल', 'ಪರಿವಾರದ ಕ್ಷಣಗಳು')}
        </h2>
      </div>

      <div className="home-gallery__marquee">
        <MarqueeRow items={row1} reverse={false} />
        <MarqueeRow items={row2} reverse={true} />
      </div>
    </section>
  );
}
