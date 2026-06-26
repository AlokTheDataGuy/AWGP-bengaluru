import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../../lib/i18n/navigation';
import Image from 'next/image';
import {
  Facebook, Instagram, Youtube, MessageCircle, Phone, Mail, MapPin, BookOpen, ArrowRight,
} from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">

          {/* Left link columns (tight group) */}
          <div className="footer__links">

          {/* Explore */}
          <nav className="footer__col" aria-label={L('Explore', 'अन्वेषण', 'ಅನ್ವೇಷಿಸಿ')}>
            <h4>{L('Explore', 'अन्वेषण', 'ಅನ್ವೇಷಿಸಿ')}</h4>
            <ul>
              <li><Link href="/">{t('nav_home')}</Link></li>
              <li><Link href="/about">{t('nav_about')}</Link></li>
              <li><Link href="/sanskars">{t('nav_sanskars')}</Link></li>
              <li><Link href="/media/gallery">{L('Gallery', 'गैलरी', 'ಗ್ಯಾಲರಿ')}</Link></li>
              <li><Link href="/blog">{t('nav_blog')}</Link></li>
              <li><Link href="/literature">{t('nav_literature')}</Link></li>
              <li><Link href="/contact">{t('nav_contact')}</Link></li>
            </ul>
          </nav>

          {/* Practice */}
          <nav className="footer__col" aria-label={L('Practice', 'साधना', 'ಅಭ್ಯಾಸ')}>
            <h4>{L('Practice', 'साधना', 'ಅಭ್ಯಾಸ')}</h4>
            <ul>
              <li><Link href="/activities/meditation">{L('Meditation', 'ध्यान', 'ಧ್ಯಾನ')}</Link></li>
              <li><Link href="/activities/yoga">{L('Yoga', 'योग', 'ಯೋಗ')}</Link></li>
              <li><Link href="/activities/workshops">{L('Workshops & Shivirs', 'कार्यशालाएं एवं शिविर', 'ಕಾರ್ಯಾಗಾರಗಳು')}</Link></li>
              <li><Link href="/activities/bal-sanskar-shala">{L('Bal Sanskar Shala', 'बाल संस्कार शाला', 'ಬಾಲ ಸಂಸ್ಕಾರ ಶಾಲೆ')}</Link></li>
              <li><Link href="/activities">{L('All Activities', 'सभी गतिविधियाँ', 'ಎಲ್ಲಾ ಚಟುವಟಿಕೆಗಳು')}</Link></li>
            </ul>
          </nav>

          {/* Events */}
          <nav className="footer__col" aria-label={L('Events', 'कार्यक्रम', 'ಕಾರ್ಯಕ್ರಮ')}>
            <h4>{L('Events', 'कार्यक्रम', 'ಕಾರ್ಯಕ್ರಮ')}</h4>
            <ul>
              <li><Link href="/events/festivals">{L('Festivals', 'पर्व उत्सव', 'ಹಬ್ಬಗಳು')}</Link></li>
              <li><Link href="/events/yagya-events">{L('Yagya Events', 'यज्ञ आयोजन', 'ಯಜ್ಞ ಕಾರ್ಯಕ್ರಮ')}</Link></li>
              <li><Link href="/events">{L('All Events', 'सभी कार्यक्रम', 'ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮ')}</Link></li>
            </ul>
          </nav>

          </div>

          {/* Brand — centre */}
          <div className="footer__brand">
            <div className="footer__logo">
              <Image
                src="/assets/logos/final_logo_light.png"
                alt="AWGP Bengaluru"
                width={280}
                height={96}
                style={{ objectFit: 'contain', width: 'auto', height: '96px' }}
              />
            </div>
            <p className="footer__tagline">{t('footer_tagline')}</p>
            <div className="footer__social">
              <a href="https://www.facebook.com/awgp" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-btn fx-sheen fx-lift">
                <Facebook size={18} aria-hidden="true" />
              </a>
              <a href="https://wa.me/919243755613" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="footer__social-btn fx-sheen fx-lift">
                <MessageCircle size={18} aria-hidden="true" />
              </a>
              <a href="https://www.instagram.com/awgp" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-btn fx-sheen fx-lift">
                <Instagram size={18} aria-hidden="true" />
              </a>
              <a href="https://www.youtube.com/awgp" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer__social-btn fx-sheen fx-lift">
                <Youtube size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="footer__col footer__contact">
            <h4>{t('footer_contact')}</h4>
            <ul className="footer__contact-list">
              <li>
                <Phone size={16} aria-hidden="true" />
                <a href="tel:+919243755613">+91 92437 55613</a>
              </li>
              <li>
                <MessageCircle size={16} aria-hidden="true" />
                <a href="https://wa.me/919243755613" target="_blank" rel="noopener noreferrer">
                  WhatsApp: +91 92437 55613
                </a>
              </li>
              <li>
                <Mail size={16} aria-hidden="true" />
                <a href="mailto:connect@awgp.org">connect@awgp.org</a>
              </li>
              <li>
                <MapPin size={16} aria-hidden="true" />
                <span>37, Lakshmi Layout Main Rd, Chikka Begur, Begur, Bengaluru — 560114</span>
              </li>
            </ul>
          </div>

          {/* Akhand Jyoti subscription */}
          <div className="footer__col footer__jyoti">
            <h4>{L('Akhand Jyoti', 'अखण्ड ज्योति', 'ಅಖಂಡ ಜ್ಯೋತಿ')}</h4>
            <div className="footer__jyoti-card">
              <div className="footer__jyoti-head">
                <span className="footer__jyoti-icon" aria-hidden="true">
                  <BookOpen size={20} />
                </span>
                <div>
                  <span className="footer__jyoti-name">
                    {L('Akhand Jyoti', 'अखण्ड ज्योति', 'ಅಖಂಡ ಜ್ಯೋತಿ')}
                  </span>
                  <span className="footer__jyoti-meta">
                    {L('Monthly Magazine', 'मासिक पत्रिका', 'ಮಾಸಿಕ ಪತ್ರಿಕೆ')}
                  </span>
                </div>
              </div>
              <p className="footer__jyoti-text">
                {L(
                  'The monthly magazine of thought transformation — timeless wisdom for a brighter life, delivered to your door.',
                  'विचार क्रांति की मासिक पत्रिका — उज्ज्वल जीवन के लिए शाश्वत ज्ञान, आपके द्वार तक।',
                  'ವಿಚಾರ ಕ್ರಾಂತಿಯ ಮಾಸಿಕ ಪತ್ರಿಕೆ — ಉಜ್ವಲ ಜೀವನಕ್ಕಾಗಿ ಶಾಶ್ವತ ಜ್ಞಾನ, ನಿಮ್ಮ ಮನೆ ಬಾಗಿಲಿಗೆ.',
                )}
              </p>
              <a
                href="https://literature.awgp.org/magazine/akhandjyoti"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__jyoti-btn fx-sheen fx-lift"
              >
                {L('Subscribe Now', 'अभी सदस्यता लें', 'ಈಗ ಚಂದಾದಾರರಾಗಿ')}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

        </div>

        <div className="footer__bottom">
          <p>{t('footer_rights')} · <a href="/admin">{L('Admin', 'व्यवस्थापक', 'ನಿರ್ವಾಹಕ')}</a></p>
          <p>{t('footer_made_with')} 🙏 {t('footer_in_bengaluru')}</p>
        </div>
      </div>
    </footer>
  );
}
