'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '../../lib/i18n/navigation';
import './HomeCards.css';

const cards = [
  {
    href: '/sanskars',
    image: '/assets/sanskars/naamkaran.jpg',
    eyebrowEn: 'Life-cycle Rites',
    eyebrowHi: 'जीवन संस्कार',
    eyebrowKn: 'ಜೀವನ ಸಂಸ್ಕಾರಗಳು',
    titleEn: 'Shodash Sanskars',
    titleHi: 'षोडश संस्कार',
    titleKn: 'ಷೋಡಶ ಸಂಸ್ಕಾರಗಳು',
    descEn: "Mark life's sacred milestones — from naming to marriage — with the sixteen timeless Vedic sanskars.",
    descHi: 'जीवन के पवित्र पड़ावों को सोलह कालजयी वैदिक संस्कारों के साथ मनाएं — नामकरण से विवाह तक।',
    descKn: 'ನಾಮಕರಣದಿಂದ ವಿವಾಹದವರೆಗೆ — ಜೀವನದ ಪವಿತ್ರ ಮೈಲಿಗಲ್ಲುಗಳನ್ನು ಹದಿನಾರು ಶಾಶ್ವತ ವೈದಿಕ ಸಂಸ್ಕಾರಗಳೊಂದಿಗೆ ಆಚರಿಸಿ.',
  },
  {
    href: '/events',
    image: '/assets/programs/festival.jpg',
    eyebrowEn: 'Festivals & Yagyas',
    eyebrowHi: 'उत्सव एवं यज्ञ',
    eyebrowKn: 'ಉತ್ಸವ ಮತ್ತು ಯಜ್ಞ',
    titleEn: 'Events & Shivirs',
    titleHi: 'कार्यक्रम एवं शिविर',
    titleKn: 'ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಶಿಬಿರಗಳು',
    descEn: 'Celebrate festivals, yagyas, workshops, and transformative shivirs — collective experiences, free and open to all.',
    descHi: 'उत्सव, यज्ञ, कार्यशालाएं और परिवर्तनकारी शिविर मनाएं — सामूहिक आध्यात्मिक अनुभव, सभी के लिए निःशुल्क।',
    descKn: 'ಹಬ್ಬಗಳು, ಯಜ್ಞಗಳು, ಕಾರ್ಯಾಗಾರಗಳು ಮತ್ತು ಪರಿವರ್ತನಕಾರಿ ಶಿಬಿರಗಳನ್ನು ಆಚರಿಸಿ — ಸಾಮೂಹಿಕ ಅನುಭವ, ಎಲ್ಲರಿಗೂ ಉಚಿತ.',
  },
  {
    href: '/activities',
    image: '/assets/activities/gau-seva1.jpg',
    eyebrowEn: 'Selfless Service',
    eyebrowHi: 'निस्वार्थ सेवा',
    eyebrowKn: 'ನಿಸ್ವಾರ್ಥ ಸೇವೆ',
    titleEn: 'Community Activities',
    titleHi: 'सामुदायिक सेवा कार्य',
    titleKn: 'ಸಮುದಾಯ ಚಟುವಟಿಕೆಗಳು',
    descEn: 'Live spirituality through seva — gau seva, blood donation, tree plantation, and food-distribution drives.',
    descHi: 'सेवा के माध्यम से अध्यात्म जिएं — गौ सेवा, रक्तदान, वृक्षारोपण और अन्नदान अभियान।',
    descKn: 'ಸೇವೆಯ ಮೂಲಕ ಆಧ್ಯಾತ್ಮ ಜೀವಿಸಿ — ಗೋ ಸೇವೆ, ರಕ್ತದಾನ, ವೃಕ್ಷಾರೋಪಣ ಮತ್ತು ಅನ್ನದಾನ ಅಭಿಯಾನಗಳು.',
  },
];

export default function HomeCards() {
  const locale = useLocale();
  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);
  const readMore = L('Read More', 'और पढ़ें', 'ಮತ್ತಷ್ಟು ಓದಿ');

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
              <article key={p.href} className="path-card">
                <Link href={p.href} className="path-card__img" aria-label={title}>
                  <Image
                    src={p.image}
                    alt={title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 560px) 100vw, (max-width: 860px) 50vw, 33vw"
                  />
                </Link>

                <div className="path-card__body">
                  <span className="path-card__eyebrow">
                    {L(p.eyebrowEn, p.eyebrowHi, p.eyebrowKn)}
                  </span>
                  <h3 className="path-card__title">
                    <Link href={p.href}>{title}</Link>
                  </h3>
                  <p className="path-card__desc">
                    {L(p.descEn, p.descHi, p.descKn)}
                  </p>
                  <Link href={p.href} className="path-card__btn">
                    {readMore}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
