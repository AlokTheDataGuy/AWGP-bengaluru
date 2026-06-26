import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import HeroSection from '../../../components/ui/HeroSection';
import SectionHeader from '../../../components/ui/SectionHeader';
import './Contact.css';
import '../../../components/sections/Contact.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { en: 'Contact — AWGP Bengaluru', hi: 'संपर्क — AWGP बेंगलूरु', kn: 'ಸಂಪರ್ಕ — AWGP ಬೆಂಗಳೂರು' };
  return { title: titles[locale] || titles.en };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations();
  const L = (en, hi, kn) => locale === 'hi' ? hi : locale === 'kn' ? kn : en;

  return (
    <>
      <HeroSection
        eyebrow="AWGP Bengaluru"
        title={t('contact_title')}
        subtitle={t('contact_subtitle')}
        mantra="॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥"
        bgImage="/assets/shantikunj/hero.jpg"
        bgImageMobile="/assets/mobile_imgs/contact.png"
      />

      {/* WhatsApp QR + Group Join */}
      <section className="section">
        <div className="section-inner">
          <SectionHeader
            eyebrow={L('Community', 'समुदाय', 'ಸಮುದಾಯ')}
            title={L('Join Our WhatsApp Group', 'हमारे WhatsApp समूह से जुड़ें', 'ನಮ್ಮ WhatsApp ಗ್ರೂಪ್ ಸೇರಿ')}
            ornament="💬"
          />
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
                'Join our WhatsApp group to receive instant updates about Yagyas, events, and Sadhana schedules.',
                'हमारे WhatsApp समूह से जुड़ें और यज्ञ, आयोजन की तत्काल सूचना पाएं।',
                'ನಮ್ಮ WhatsApp ಗ್ರೂಪ್ ಸೇರಿ ಮತ್ತು ಯಜ್ಞ, ಕಾರ್ಯಕ್ರಮಗಳ ತಕ್ಷಣ ಅಪ್‌ಡೇಟ್ ಪಡೆಯಿರಿ.'
              )}</p>
              <ul className="info-list" style={{ marginTop: '1rem' }}>
                <li>{L('Yagya & event updates', 'यज्ञ एवं आयोजन की सूचनाएं', 'ಯಜ್ಞ ಮತ್ತು ಕಾರ್ಯಕ್ರಮ ಅಪ್‌ಡೇಟ್‌ಗಳು')}</li>
                <li>{L('Daily inspiration & thought of the day', 'दैनिक प्रेरणा एवं विचार', 'ದೈನಂದಿನ ಪ್ರೇರಣೆ')}</li>
                <li>{L('Community seva opportunities', 'समुदाय सेवा के अवसर', 'ಸಮುದಾಯ ಸೇವಾ ಅವಕಾಶಗಳು')}</li>
              </ul>
              <a href="https://wa.me/919243755613" target="_blank" rel="noopener noreferrer"
                className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                💬 {L('Chat on WhatsApp', 'WhatsApp पर संपर्क करें', 'WhatsApp ನಲ್ಲಿ ಸಂಪರ್ಕಿಸಿ')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact cards + Map */}
      <section className="section">
        <div className="section-inner">
          <div className="contact-grid">
            <div className="contact-info">
              <ContactCard icon={<MapPin size={22} />}
                label={L('Address', 'पता', 'ವಿಳಾಸ')}
                value={t('contact_address')} />
              <ContactCard icon={<Phone size={22} />}
                label={L('Phone', 'फ़ोन', 'ದೂರವಾಣಿ')}
                value={t('contact_phone')} href={`tel:${t('contact_phone')}`} />
              <ContactCard icon={<Mail size={22} />}
                label={L('Email', 'ईमेल', 'ಇಮೇಲ್')}
                value={t('contact_email')} href={`mailto:${t('contact_email')}`} />
              <ContactCard icon={<Clock size={22} />}
                label={L('Hours', 'समय', 'ಸಮಯ')}
                value={t('contact_hours')} />
              <a href="https://wa.me/919243755613" target="_blank" rel="noopener noreferrer"
                className="whatsapp-btn">
                <MessageCircle size={22} />
                <div>
                  <strong>{L('Join on WhatsApp', 'WhatsApp से जुड़ें', 'WhatsApp ಸೇರಿ')}</strong>
                  <span>+91 92437 55613</span>
                </div>
              </a>
            </div>

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
                target="_blank" rel="noopener noreferrer"
                className="map-directions-btn fx-sheen fx-lift"
              >
                📍 {L('Get Directions', 'दिशा-निर्देश पाएं', 'ದಾರಿ ತೋರಿಸಿ')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How to Reach */}
      <section className="section" style={{ background: 'var(--cream-dark)' }}>
        <div className="section-inner">
          <SectionHeader
            eyebrow={L('Directions', 'मार्गदर्शन', 'ಮಾರ್ಗದರ್ಶನ')}
            title={L('How to Reach Us', 'कैसे पहुंचें', 'ಹೇಗೆ ತಲುಪುವುದು')}
            ornament="🗺️"
          />
          <div className="reach-grid">
            {[
              {
                icon: '🚇',
                mode: { en: 'By Metro', hi: 'मेट्रो से', kn: 'ಮೆಟ್ರೋ ಮೂಲಕ' },
                desc: { en: 'Nearest metro station details will be updated once the exact address is confirmed.', hi: 'सटीक पता तय होने पर नजदीकी मेट्रो स्टेशन की जानकारी अपडेट की जाएगी।', kn: 'ನಿಖರ ವಿಳಾಸ ದೃಢೀಕರಣದ ನಂತರ ಹತ್ತಿರದ ಮೆಟ್ರೋ ನಿಲ್ದಾಣ ಮಾಹಿತಿ ನವೀಕರಿಸಲಾಗುವುದು.' },
              },
              {
                icon: '🚌',
                mode: { en: 'By Bus', hi: 'बस से', kn: 'ಬಸ್ ಮೂಲಕ' },
                desc: { en: 'BMTC bus route information will be available soon.', hi: 'BMTC बस मार्ग जानकारी जल्द उपलब्ध होगी।', kn: 'BMTC ಬಸ್ ಮಾರ್ಗ ಮಾಹಿತಿ ಶೀಘ್ರದಲ್ಲಿ ಲಭ್ಯ.' },
              },
              {
                icon: '🚗',
                mode: { en: 'By Car / Auto', hi: 'कार / ऑटो से', kn: 'ಕಾರ್ / ಆಟೋ ಮೂಲಕ' },
                desc: { en: 'Parking available on premises. Use the Google Maps link above for navigation.', hi: 'परिसर में पार्किंग उपलब्ध है। नेविगेशन के लिए Google Maps लिंक का उपयोग करें।', kn: 'ಆವರಣದಲ್ಲಿ ಪಾರ್ಕಿಂಗ್ ಲಭ್ಯ. ನ್ಯಾವಿಗೇಷನ್‌ಗಾಗಿ Google Maps ಲಿಂಕ್ ಬಳಸಿ.' },
              },
            ].map((item, i) => (
              <div key={i} className="reach-card">
                <span className="reach-icon">{item.icon}</span>
                <h3>{item.mode[locale] || item.mode.en}</h3>
                <p>{item.desc[locale] || item.desc.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
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
          : <span className="contact-card__value">{value}</span>}
      </div>
    </div>
  );
}
