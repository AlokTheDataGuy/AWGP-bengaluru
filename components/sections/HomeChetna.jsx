'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from '../../lib/i18n/navigation';
import { useReveal } from '../../lib/useReveal';
import './HomeChetna.css';

export default function HomeChetna() {
  const locale = useLocale();
  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);
  const ref = useReveal();

  const schedule = [
    { label: L('Morning Aarti', 'प्रातः आरती', 'ಬೆಳಗಿನ ಆರತಿ'), time: '05:30 AM' },
    { label: L('Daily Yagya', 'दैनिक यज्ञ', 'ದೈನಂದಿನ ಯಜ್ಞ'), time: '06:30 AM' },
    { label: L('Evening Aarti', 'सायं आरती', 'ಸಂಜೆ ಆರತಿ'), time: '05:30 PM' },
  ];

  const facilities = [
    {
      src: '/assets/chetna-kendra/gayatri-mata-mandir.png',
      label: L('Gayatri Mata Mandir', 'गायत्री माता मंदिर', 'ಗಾಯತ್ರಿ ಮಾತಾ ಮಂದಿರ'),
      desc: L('Sanctum of daily aarti & darshan', 'दैनिक आरती एवं दर्शन का गर्भगृह', 'ದೈನಂದಿನ ಆರತಿ ಮತ್ತು ದರ್ಶನದ ಗರ್ಭಗುಡಿ'),
    },
    {
      src: '/assets/chetna-kendra/yagya-shala.png',
      label: L('Yagya Shala', 'यज्ञ शाला', 'ಯಜ್ಞ ಶಾಲೆ'),
      desc: L('Sacred fire altar for daily yagya', 'दैनिक यज्ञ की पवित्र वेदी', 'ದೈನಂದಿನ ಯಜ್ಞದ ಪವಿತ್ರ ವೇದಿ'),
    },
    {
      src: '/assets/chetna-kendra/gaushala.png',
      label: L('Gaushala', 'गौशाला', 'ಗೋಶಾಲೆ'),
      desc: L('Loving shelter & seva for cows', 'गौ माता की सेवा एवं आश्रय', 'ಗೋಮಾತೆಯ ಸೇವೆ ಮತ್ತು ಆಶ್ರಯ'),
    },
    {
      src: '/assets/chetna-kendra/library.png',
      label: L('Gyan Mandir Library', 'ज्ञान मंदिर पुस्तकालय', 'ಜ್ಞಾನ ಮಂದಿರ ಗ್ರಂಥಾಲಯ'),
      desc: L('Yug Nirman literature, open to all', 'युग निर्माण साहित्य, सभी के लिए', 'ಯುಗ ನಿರ್ಮಾಣ ಸಾಹಿತ್ಯ, ಎಲ್ಲರಿಗೂ ಮುಕ್ತ'),
    },
    {
      src: '/assets/chetna-kendra/meditation_room.jpg',
      label: L('Meditation', 'ध्यान कक्ष', 'ಧ್ಯಾನ ಕಕ್ಷ'),
      desc: L('A quiet room for dhyan & stillness', 'ध्यान एवं अंतर्मौन का शांत कक्ष', 'ಧ್ಯಾನ ಮತ್ತು ಮೌನದ ಶಾಂತ ಕೋಣೆ'),
    },
  ];

  return (
    <section className="home-chetna section" ref={ref}>
      <span className="home-chetna__mandala" aria-hidden="true" />
      <span className="home-chetna__glow" aria-hidden="true" />

      <div className="section-inner home-chetna__inner">

        {/* ── Centered heading ─────────────────────────────── */}
        <div className="home-chetna__head">
          <span className="home-chetna__eyebrow">
            {L('Our Spiritual Home', 'हमारा आध्यात्मिक धाम', 'ನಮ್ಮ ಆಧ್ಯಾತ್ಮಿಕ ತಾಣ')}
          </span>
          <h2 className="home-chetna__title">
            {L('Gayatri Chetna Kendra', 'गायत्री चेतना केंद्र', 'ಗಾಯತ್ರಿ ಚೇತನ ಕೇಂದ್ರ')}
          </h2>
          <span className="home-chetna__rule" aria-hidden="true">
            <i className="home-chetna__rule-line" />
            <span className="home-chetna__rule-diamond" />
            <i className="home-chetna__rule-line" />
          </span>
          <p className="home-chetna__lead">
            {L(
              'A serene haven in Bengaluru for daily Sadhana, Yagya, satsang, and selfless service — where the Gayatri tradition comes alive for all who seek inner growth.',
              'बेंगलूरु में एक शांत धाम — दैनिक साधना, यज्ञ, सत्संग और निःस्वार्थ सेवा के लिए, जहाँ गायत्री परंपरा हर साधक के लिए जीवंत होती है।',
              'ಬೆಂಗಳೂರಿನ ಶಾಂತ ತಾಣ — ದೈನಂದಿನ ಸಾಧನೆ, ಯಜ್ಞ, ಸತ್ಸಂಗ ಮತ್ತು ನಿಸ್ವಾರ್ಥ ಸೇವೆಗಾಗಿ, ಗಾಯತ್ರಿ ಪರಂಪರೆ ಇಲ್ಲಿ ಜೀವಂತವಾಗುತ್ತದೆ.'
            )}
          </p>
        </div>

        {/* ── Showcase: featured building + facility list ──── */}
        <div className="ck-showcase">

          {/* Featured — building with frosted daily-schedule panel */}
          <Link href="/chetna-kendra" className="ck-feature">
            <span className="ck-feature__media">
              <Image
                src="/assets/chetna-kendra/building2.png"
                alt={L('Gayatri Chetna Kendra, Bengaluru', 'गायत्री चेतना केंद्र, बेंगलूरु', 'ಗಾಯತ್ರಿ ಚೇತನ ಕೇಂದ್ರ, ಬೆಂಗಳೂರು')}
                fill
                sizes="(max-width: 920px) 100vw, 52vw"
                style={{ objectFit: 'cover' }}
              />
              <span className="ck-feature__scrim" aria-hidden="true" />
            </span>

            <div className="ck-schedule">
              <h3 className="ck-schedule__title">
                <Clock size={16} aria-hidden="true" />
                {L('Daily Darshan & Sadhana', 'दैनिक दर्शन एवं साधना', 'ದೈನಂದಿನ ದರ್ಶನ ಮತ್ತು ಸಾಧನೆ')}
              </h3>
              <ul className="ck-schedule__list">
                {schedule.map((s) => (
                  <li key={s.time}>
                    <span className="ck-schedule__dot" aria-hidden="true" />
                    <span className="ck-schedule__label">{s.label}</span>
                    <b className="ck-schedule__time">{s.time}</b>
                  </li>
                ))}
              </ul>
            </div>
          </Link>

          {/* Facilities — clean list of cards with descriptors */}
          <ul className="ck-facilities">
            {facilities.map((f, i) => (
              <li key={f.label} className="ck-fac-item" style={{ '--i': i + 1 }}>
                <Link href="/chetna-kendra" className="ck-fac">
                  <span className="ck-fac__thumb">
                    <Image
                      src={f.src}
                      alt={f.label}
                      fill
                      sizes="92px"
                      style={{ objectFit: 'cover' }}
                    />
                  </span>
                  <span className="ck-fac__text">
                    <span className="ck-fac__name">{f.label}</span>
                    <span className="ck-fac__desc">{f.desc}</span>
                  </span>
                  <ArrowRight className="ck-fac__arrow" size={17} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── CTA ──────────────────────────────────────────── */}
        <div className="home-chetna__cta">
          <Link href="/chetna-kendra" className="btn btn-gold-outline">
            {L('Explore the Kendra', 'केंद्र देखें', 'ಕೇಂದ್ರ ನೋಡಿ')}
            <ArrowRight size={16} aria-hidden="true" style={{ marginLeft: 8 }} />
          </Link>
        </div>

      </div>
    </section>
  );
}
