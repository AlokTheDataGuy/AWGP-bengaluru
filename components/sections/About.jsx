import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../../lib/i18n/navigation';
import SlideshowClient from '../ui/SlideshowClient';
import './About.css';

const ABOUT_SLIDES = [
  { src: '/assets/chetna-kendra/gayatri-mata.png',   caption: 'Gayatri Mata' },
  { src: '/assets/chetna-kendra/building.png',        caption: 'Gayatri Chetna Kendra' },
  { src: '/assets/chetna-kendra/mandir.png',          caption: 'Gayatri Mata Mandir' },
  { src: '/assets/chetna-kendra/library.png',         caption: 'Library' },
  { src: '/assets/chetna-kendra/bhatka-hua-devta.png',caption: 'Bhatka Hua Devta' },
  { src: '/assets/chetna-kendra/yagya-shala.png',     caption: 'Yagya Shala' },
];

export default function About() {
  const t = useTranslations();
  const locale = useLocale();
  const L = (en, hi, kn) => locale === 'hi' ? hi : locale === 'kn' ? kn : en;

  return (
    <section id="about" className="section about-section">
      <div className="section-inner">
        <div className="section-header">
          <p className="eyebrow">
            {L('About', 'हमारे बारे में', 'ನಮ್ಮ ಬಗ್ಗೆ')}
          </p>
          <h2>{L(
            'Gayatri Chetna Kendra, Bengaluru',
            'गायत्री चेतना केंद्र, बेंगलूरु',
            'ಗಾಯತ್ರಿ ಚೇತನ ಕೇಂದ್ರ, ಬೆಂಗಳೂರು'
          )}</h2>
          <div className="ornament"><span>🔱</span></div>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <p className="about-p1">{L(
              'AWGP Bengaluru is a centre of the All World Gayatri Pariwar — a global spiritual movement founded by Pandit Shriram Sharma Acharya. We are a community of seekers committed to inner transformation and outer service, guided by the Gayatri Mantra and the teachings of Gurudev.',
              'AWGP बेंगलूरु, अखिल विश्व गायत्री परिवार का एक केंद्र है — पं. श्रीराम शर्मा आचार्य द्वारा स्थापित एक वैश्विक आध्यात्मिक आंदोलन।',
              'AWGP ಬೆಂಗಳೂರು, ಪಂ. ಶ್ರೀರಾಮ ಶರ್ಮ ಆಚಾರ್ಯ ಸ್ಥಾಪಿಸಿದ ಅಖಿಲ ವಿಶ್ವ ಗಾಯತ್ರಿ ಪರಿವಾರದ ಕೇಂದ್ರ.'
            )}</p>
            <p style={{ marginTop: '1rem' }}>{L(
              'Our Gayatri Chetna Kendra hosts daily prayers, Yagyas, yoga sessions, and community events — open to all who seek wisdom, peace, and purpose.',
              'हमारा गायत्री चेतना केंद्र दैनिक प्रार्थना, यज्ञ, योग सत्र और सामुदायिक आयोजन करता है — जो ज्ञान, शांति और उद्देश्य के साधकों के लिए खुला है।',
              'ನಮ್ಮ ಕೇಂದ್ರ ದೈನಂದಿನ ಪ್ರಾರ್ಥನೆ, ಯಜ್ಞ, ಯೋಗ ಸತ್ರ ಮತ್ತು ಸಾಮುದಾಯಿಕ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಆಯೋಜಿಸುತ್ತದೆ.'
            )}</p>
            <Link href="/about" className="btn btn-outline" style={{ marginTop: '1.5rem' }}>
              {L('Learn About Us →', 'AWGP के बारे में जानें →', 'AWGP ಬಗ್ಗೆ ತಿಳಿಯಿರಿ →')}
            </Link>
          </div>

          <div className="about-visual">
            <SlideshowClient slides={ABOUT_SLIDES} aspectRatio="4/3" interval={5000} />
          </div>
        </div>
      </div>
    </section>
  );
}
