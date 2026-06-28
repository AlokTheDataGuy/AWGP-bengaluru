import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Image from 'next/image';
import './Contact.css';

export default function Contact() {
  const t = useTranslations();
  const locale = useLocale();
  const L = (en, hi, kn) => locale === 'hi' ? hi : locale === 'kn' ? kn : en;

  return (
    <div>
      <section id="contact" className="section contact-section">
        <div className="section-inner">
          <div className="section-header">
            <p className="eyebrow">{L('Contact Us', 'संपर्क करें', 'ಸಂಪರ್ಕಿಸಿ')}</p>
            <h2>{L('Find Us & Connect', 'हमसे मिलें और जुड़ें', 'ನಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡಿ')}</h2>
            <div className="ornament"><span>🙏</span></div>
          </div>

          <div className="contact-grid">
            {/* Info cards */}
            <div className="contact-info">
              <ContactCard
                icon={<MapPin size={22} />}
                label={L('Address', 'पता', 'ವಿಳಾಸ')}
                value={t('contact_address')}
              />
              <ContactCard
                icon={<Phone size={22} />}
                label={L('Phone', 'फ़ोन', 'ದೂರವಾಣಿ')}
                value="+91 92437 55613"
                href="tel:+919243755613"
              />
              <ContactCard
                icon={<Mail size={22} />}
                label={L('Email', 'ईमेल', 'ಇಮೇಲ್')}
                value="connect@awgpblr.org"
                href="mailto:connect@awgpblr.org"
              />
              <ContactCard
                icon={<Clock size={22} />}
                label={L('Hours', 'समय', 'ಸಮಯ')}
                value={L('Open daily 5:30 AM – 9:30 PM', 'प्रतिदिन 5:30 AM – 9:30 PM', 'ಪ್ರತಿದಿನ 5:30 AM – 9:30 PM')}
              />

              {/* Social buttons */}
              <div className="contact-social">
                <a href="https://www.awgp.org" target="_blank" rel="noopener noreferrer" className="social-btn">
                  🌐 AWGP.org
                </a>
                <a href="https://wa.me/919243755613" target="_blank" rel="noopener noreferrer" className="social-btn social-btn--green">
                  💬 WhatsApp
                </a>
                <a href="https://www.instagram.com/awgp.bengaluru/" target="_blank" rel="noopener noreferrer" className="social-btn social-btn--pink">
                  📷 Instagram
                </a>
                <a href="https://www.youtube.com/@AWGPBengaluru" target="_blank" rel="noopener noreferrer" className="social-btn social-btn--red">
                  ▶ YouTube
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="contact-map-wrap">
              <iframe
                title="AWGP Bengaluru Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.4!2d77.6219!3d12.8835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s37%2C+Lakshmi+Layout+Main+Rd%2C+Chikka+Begur%2C+Begur%2C+Bengaluru%2C+Karnataka+560114!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="380"
                style={{ border: 0, borderRadius: 'var(--radius)', display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://maps.google.com?q=37,+Lakshmi+Layout+Main+Rd,+Chikka+Begur,+Begur,+Bengaluru,+Karnataka+560114"
                target="_blank"
                rel="noopener noreferrer"
                className="map-directions-btn fx-sheen fx-lift"
              >
                📍 {L('Get Directions', 'दिशा-निर्देश पाएं', 'ದಾರಿ ತೋರಿಸಿ')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp join section */}
      <section className="section">
        <div className="section-inner">
          <div className="whatsapp-join">
            <div className="whatsapp-qr">
              <div className="qr-placeholder">
                <Image
                  src="/assets/misc/qr-code.png"
                  alt="WhatsApp QR Code"
                  width={188}
                  height={188}
                  className="qr-img"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            <div className="whatsapp-info">
              <h3>{L('AWGP Bengaluru Pariwar', 'AWGP बेंगलूरु परिवार', 'AWGP ಬೆಂಗಳೂರು ಪರಿವಾರ')}</h3>
              <p>{L(
                'Join our WhatsApp group to receive instant updates about Yagyas, programs, and Sadhana schedules.',
                'हमारे WhatsApp समूह से जुड़ें और यज्ञ, आयोजन, साधना कार्यक्रमों की तत्काल सूचना पाएं।',
                'ನಮ್ಮ WhatsApp ಗ್ರೂಪ್ ಸೇರಿ ಮತ್ತು ಯಜ್ಞ, ಕಾರ್ಯಕ್ರಮಗಳ ತಕ್ಷಣ ಅಪ್‌ಡೇಟ್ ಪಡೆಯಿರಿ.'
              )}</p>
              <ul className="info-list" style={{ marginTop: '1rem' }}>
                <li>{L('Yagya & program updates', 'यज्ञ एवं आयोजन की सूचनाएं', 'ಯಜ್ಞ ಮತ್ತು ಕಾರ್ಯಕ್ರಮ ಅಪ್‌ಡೇಟ್‌ಗಳು')}</li>
                <li>{L('Daily inspiration & thought of the day', 'दैनिक प्रेरणा एवं विचार', 'ದೈನಂದಿನ ಪ್ರೇರಣೆ ಮತ್ತು ಆಲೋಚನೆಗಳು')}</li>
                <li>{L('Community seva opportunities', 'समुदाय सेवा के अवसर', 'ಸಮುದಾಯ ಸೇವಾ ಅವಕಾಶಗಳು')}</li>
              </ul>
              <a
                href="https://wa.me/919243755613"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: '1.5rem' }}
              >
                💬 {L('Chat on WhatsApp', 'WhatsApp पर संपर्क करें', 'WhatsApp ನಲ್ಲಿ ಸಂಪರ್ಕಿಸಿ')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactCard({ icon, label, value, href }) {
  return (
    <div className="contact-card">
      <div className="contact-card__icon">{icon}</div>
      <div className="contact-card__body">
        <span className="contact-card__label">{label}</span>
        {href
          ? <a href={href} className="contact-card__value">{value}</a>
          : <span className="contact-card__value">{value}</span>
        }
      </div>
    </div>
  );
}
