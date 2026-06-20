import Image from 'next/image';
import { useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '../../lib/i18n/navigation';
import './HomeChetna.css';

export default function HomeChetna() {
  const locale = useLocale();
  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);

  const schedule = [
    { label: L('Morning Aarti', 'प्रातः आरती', 'ಬೆಳಗಿನ ಆರತಿ'), time: '05:30 AM' },
    { label: L('Daily Yagya', 'दैनिक यज्ञ', 'ದೈನಂದಿನ ಯಜ್ಞ'), time: '06:30 AM' },
    { label: L('Evening Aarti', 'सायं आरती', 'ಸಂಜೆ ಆರತಿ'), time: '05:30 PM' },
  ];

  const tiles = [
    { area: 'mandir', src: '/assets/chetna-kendra/gayatri-mata-mandir.png', label: L('Gayatri Mata Mandir', 'गायत्री माता मंदिर', 'ಗಾಯತ್ರಿ ಮಾತಾ ಮಂದಿರ') },
    { area: 'yagya',  src: '/assets/chetna-kendra/yagya-shala.png',         label: L('Yagya Shala', 'यज्ञ शाला', 'ಯಜ್ಞ ಶಾಲೆ') },
    { area: 'gau',    src: '/assets/chetna-kendra/gaushala.png',            label: L('Gaushala', 'गौशाला', 'ಗೋಶಾಲೆ') },
    { area: 'gyan',   src: '/assets/chetna-kendra/library.png',             label: L('Gyan Mandir Library', 'ज्ञान मंदिर पुस्तकालय', 'ಜ್ಞಾನ ಮಂದಿರ ಗ್ರಂಥಾಲಯ') },
    { area: 'dhyan',  src: '/assets/chetna-kendra/meditation_room.jpg',     label: L('Dhyan Kaksh', 'ध्यान कक्ष', 'ಧ್ಯಾನ ಕಕ್ಷ') },
  ];

  return (
    <section className="home-chetna section">
      <span className="home-chetna__mandala" aria-hidden="true" />
      <div className="section-inner home-chetna__inner">

        {/* ── Centered heading ─────────────────────────────── */}
        <div className="home-chetna__head">
          <span className="home-chetna__eyebrow">
            {L('Our Spiritual Home', 'हमारा आध्यात्मिक धाम', 'ನಮ್ಮ ಆಧ್ಯಾತ್ಮಿಕ ತಾಣ')}
          </span>
          <h2 className="home-chetna__title">
            {L('Gayatri Chetna Kendra', 'गायत्री चेतना केंद्र', 'ಗಾಯತ್ರಿ ಚೇತನ ಕೇಂದ್ರ')}
          </h2>
          <div className="ornament" aria-hidden="true" />
          <p className="home-chetna__lead">
            {L(
              'A serene haven in Bengaluru for daily Sadhana, Yagya, satsang, and selfless service — where the Gayatri tradition comes alive for all who seek inner growth.',
              'बेंगलूरु में एक शांत धाम — दैनिक साधना, यज्ञ, सत्संग और निःस्वार्थ सेवा के लिए, जहाँ गायत्री परंपरा हर साधक के लिए जीवंत होती है।',
              'ಬೆಂಗಳೂರಿನ ಶಾಂತ ತಾಣ — ದೈನಂದಿನ ಸಾಧನೆ, ಯಜ್ಞ, ಸತ್ಸಂಗ ಮತ್ತು ನಿಸ್ವಾರ್ಥ ಸೇವೆಗಾಗಿ, ಗಾಯತ್ರಿ ಪರಂಪರೆ ಇಲ್ಲಿ ಜೀವಂತವಾಗುತ್ತದೆ.'
            )}
          </p>
        </div>

        {/* ── Bento grid of facilities ─────────────────────── */}
        <div className="ck-bento">

          {/* Hero tile — building + daily schedule overlay */}
          <Link href="/chetna-kendra" className="ck-tile ck-tile--hero" style={{ gridArea: 'big' }}>
            <Image
              src="/assets/chetna-kendra/building2.png"
              alt={L('Gayatri Chetna Kendra, Bengaluru', 'गायत्री चेतना केंद्र, बेंगलूरु', 'ಗಾಯತ್ರಿ ಚೇತನ ಕೇಂದ್ರ, ಬೆಂಗಳೂರು')}
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
              style={{ objectFit: 'cover' }}
            />
            <span className="ck-tile__scrim" aria-hidden="true" />
            <div className="ck-tile__schedule">
              <h3 className="ck-tile__schedule-title">
                {L('Daily Darshan & Sadhana', 'दैनिक दर्शन एवं साधना', 'ದೈನಂದಿನ ದರ್ಶನ ಮತ್ತು ಸಾಧನೆ')}
              </h3>
              <ul>
                {schedule.map((s) => (
                  <li key={s.time}><span>{s.label}</span><b>{s.time}</b></li>
                ))}
              </ul>
            </div>
          </Link>

          {/* Facility tiles */}
          {tiles.map((tile) => (
            <Link key={tile.area} href="/chetna-kendra" className="ck-tile" style={{ gridArea: tile.area }}>
              <Image
                src={tile.src}
                alt={tile.label}
                fill
                sizes="(max-width: 900px) 50vw, 30vw"
                style={{ objectFit: 'cover' }}
              />
              <span className="ck-tile__scrim" aria-hidden="true" />
              <span className="ck-tile__caption">{tile.label}</span>
            </Link>
          ))}
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
