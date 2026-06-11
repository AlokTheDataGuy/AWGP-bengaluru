import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '../../lib/i18n/navigation';
import './HomeChetna.css';

export default function HomeChetna() {
  const locale = useLocale();
  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);

  return (
    <section className="home-chetna section section--cream">
      <div className="section-inner">

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

        {/* ── Photo with overlapping cards ─────────────────── */}
        <div className="home-chetna__showcase">
          <div className="home-chetna__media">
            <Image
              src="/assets/chetna-kendra/building2.png"
              alt={L('Gayatri Chetna Kendra, Bengaluru', 'गायत्री चेतना केंद्र, बेंगलूरु', 'ಗಾಯತ್ರಿ ಚೇತನ ಕೇಂದ್ರ, ಬೆಂಗಳೂರು')}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 860px) 90vw, 620px"
            />
          </div>

          {/* white info card — bottom-left */}
          <div className="ck-card ck-card--light">
            <h3 className="ck-card__title">
              {L('Visiting Hours', 'दर्शन समय', 'ದರ್ಶನ ಸಮಯ')}
            </h3>
            <p className="ck-card__sub">
              {L('Open every day for sadhana and darshan.', 'साधना और दर्शन के लिए प्रतिदिन खुला।', 'ಸಾಧನೆ ಮತ್ತು ದರ್ಶನಕ್ಕಾಗಿ ಪ್ರತಿದಿನ ತೆರೆದಿರುತ್ತದೆ.')}
            </p>
            <ul className="ck-card__list">
              <li><span>{L('Morning Aarti', 'प्रातः आरती', 'ಬೆಳಗಿನ ಆರತಿ')}</span><b>05:30 AM</b></li>
              <li><span>{L('Daily Yagya', 'दैनिक यज्ञ', 'ದೈನಂದಿನ ಯಜ್ಞ')}</span><b>06:30 AM</b></li>
              <li><span>{L('Evening Aarti', 'सायं आरती', 'ಸಂಜೆ ಆರತಿ')}</span><b>05:30 PM</b></li>
            </ul>
          </div>

          {/* accent CTA card — right */}
          <div className="ck-card ck-card--accent">
            <h3 className="ck-card__title">
              {L('Plan Your Visit', 'अपनी यात्रा की योजना बनाएं', 'ನಿಮ್ಮ ಭೇಟಿ ಯೋಜಿಸಿ')}
            </h3>
            <p className="ck-card__sub">
              {L(
                'Experience daily Yagya, meditation, and seva at the Kendra.',
                'केंद्र में दैनिक यज्ञ, ध्यान और सेवा का अनुभव करें।',
                'ಕೇಂದ್ರದಲ್ಲಿ ದೈನಂದಿನ ಯಜ್ಞ, ಧ್ಯಾನ ಮತ್ತು ಸೇವೆಯ ಅನುಭವ ಪಡೆಯಿರಿ.'
              )}
            </p>
            <Link href="/chetna-kendra" className="btn btn-outline ck-card__btn">
              {L('Explore the Kendra', 'केंद्र देखें', 'ಕೇಂದ್ರ ನೋಡಿ')}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
