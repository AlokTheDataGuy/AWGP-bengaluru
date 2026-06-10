import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../../lib/i18n/navigation';
import Image from 'next/image';
import './Footer.css';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const L = (en, hi, kn) => locale === 'hi' ? hi : locale === 'kn' ? kn : en;

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">

          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <Image
                src="/assets/logo-dark.png"
                alt="AWGP Bengaluru"
                width={200}
                height={52}
                style={{ objectFit: 'contain', width: 'auto', height: '68px' }}
              />
            </div>
            <p className="footer__tagline">{t('footer_tagline')}</p>
            <p className="footer__address">
              {t('contact_address')}, Bengaluru, India
            </p>
          </div>

          {/* Explore */}
          <div className="footer__col">
            <h4>{L('Explore', 'अन्वेषण', 'ಅನ್ವೇಷಿಸಿ')}</h4>
            <ul>
              <li><Link href="/">{t('nav_home')}</Link></li>
              <li><Link href="/about">{t('nav_about')}</Link></li>
              <li><Link href="/sanskars">{t('nav_sanskars')}</Link></li>
              <li><Link href="/events">{t('nav_events')}</Link></li>
              <li><Link href="/activities">{t('nav_activities')}</Link></li>
              <li><Link href="/literature">{t('nav_literature')}</Link></li>
              <li><Link href="/contact">{t('nav_contact')}</Link></li>
            </ul>
          </div>

          {/* Events & Practice */}
          <div className="footer__col">
            <h4>{L('Events & Practice', 'कार्यक्रम एवं साधना', 'ಕಾರ್ಯಕ್ರಮ ಮತ್ತು ಅಭ್ಯಾಸ')}</h4>
            <ul>
              <li><Link href="/events/festivals">{L('Festival Celebrations', 'पर्व उत्सव', 'ಹಬ್ಬ ಆಚರಣೆ')}</Link></li>
              <li><Link href="/events/yagya-events">{L('Yagya Events', 'यज्ञ आयोजन', 'ಯಜ್ಞ ಕಾರ್ಯಕ್ರಮ')}</Link></li>
              <li><Link href="/events/workshops">{L('Workshops & Shivirs', 'कार्यशालाएं', 'ಕಾರ್ಯಾಗಾರ')}</Link></li>
              <li><Link href="/activities/meditation">{L('Meditation', 'ध्यान', 'ಧ್ಯಾನ')}</Link></li>
              <li><Link href="/activities/yoga">{L('Yoga Sessions', 'योग सत्र', 'ಯೋಗ ಸತ್ರ')}</Link></li>
              <li><Link href="/activities/bal-sanskar-shala">{L('Bal Sanskar Shala', 'बाल संस्कार शाला', 'ಬಾಲ ಸಂಸ್ಕಾರ ಶಾಲೆ')}</Link></li>
            </ul>
          </div>

          {/* Contact + Affiliated */}
          <div className="footer__col">
            <h4>{t('footer_contact')}</h4>
            <ul>
              <li><a href="mailto:awgpbengaluru@gmail.com">awgpbengaluru@gmail.com</a></li>
              <li><a href="tel:+919876543210">+91 98765 43210</a></li>
            </ul>
            <h4 style={{ marginTop: '1.5rem' }}>{t('footer_affiliated')}</h4>
            <ul>
              <li><a href="https://www.awgp.org/en" target="_blank" rel="noopener noreferrer">AWGP Global</a></li>
              <li><a href="https://www.awgp.org/en/about_us/our_establishments/shantikunj_ashram" target="_blank" rel="noopener noreferrer">Shantikunj Haridwar</a></li>
              <li><a href="https://www.awgp.org/en/about_us/dsvv" target="_blank" rel="noopener noreferrer">DSVV University</a></li>
            </ul>
          </div>

        </div>

        <div className="footer__bottom">
          <p>{t('footer_rights')}</p>
          <p>{t('footer_made_with')} 🙏 {t('footer_in_bengaluru')}</p>
        </div>
      </div>
    </footer>
  );
}
