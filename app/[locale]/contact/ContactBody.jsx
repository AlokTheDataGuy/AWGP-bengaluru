'use client';

import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Globe, MessageCircle, Youtube, Instagram } from 'lucide-react';
import { useReveal } from '../../../lib/useReveal';
import './Contact.css';

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.4!2d77.6219!3d12.8835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s37%2C+Lakshmi+Layout+Main+Rd%2C+Chikka+Begur%2C+Begur%2C+Bengaluru%2C+Karnataka+560114!5e0!3m2!1sen!2sin!4v1';
const MAP_LINK =
  'https://maps.google.com/?q=37,+Lakshmi+Layout+Main+Rd,+Chikka+Begur,+Begur,+Bengaluru,+Karnataka+560114';

export default function ContactBody({ locale }) {
  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);

  const infoRef  = useReveal();
  const waRef    = useReveal();
  const reachRef = useReveal();

  return (
    <>
      {/* ── Contact Info + Map ─────────────────────────────── */}
      <section className="cp-info" ref={infoRef}>
        <div className="cp-info__mandala"   aria-hidden="true" />
        <div className="cp-info__half-l"    aria-hidden="true" />
        <div className="cp-info__half-r"    aria-hidden="true" />

        <Image
          src="/assets/designs/design6.png"
          alt="" aria-hidden="true"
          width={160} height={220}
          className="cp-info__diyas"
          style={{ objectFit: 'contain' }}
        />

        <div className="cp-info__inner">
          <div className="cp-info__crown" aria-hidden="true" />

          <header className="cp-info__head">
            <span className="cp-info__eyebrow">
              {L('Reach Out to Us', 'हमसे संपर्क करें', 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ')}
            </span>
            <h2 className="cp-info__title">
              {L('We’d love to hear from you', 'हमें आपसे सुनकर प्रसन्नता होगी', 'ನಿಮ್ಮ ಮಾತು ಕೇಳಲು ಸಂತೋಷ')}
            </h2>
            <p className="cp-info__lead">
              {L(
                'Whether you want to join our spiritual family, volunteer, or simply visit — our doors are always open.',
                'चाहे आप हमारे आध्यात्मिक परिवार से जुड़ना चाहें, सेवा करना चाहें, या केवल पधारना चाहें — हमारे द्वार सदैव खुले हैं।',
                'ಸೇರಲು, ಸೇವೆ ಮಾಡಲು ಅಥವಾ ಭೇಟಿ ನೀಡಲು ಬಯಸಿದರೂ — ನಮ್ಮ ಬಾಗಿಲುಗಳು ಸದಾ ತೆರೆದಿವೆ.',
              )}
            </p>
          </header>

          <div className="cp-info__grid">
            {/* Left – info panel */}
            <div className="cp-info__panel">
              <div className="cp-info__panel-bar" aria-hidden="true" />
              <div className="cp-info__cards">
                <InfoCard icon={<MapPin size={20} />}
                  label={L('Address', 'पता', 'ವಿಳಾಸ')}
                  value="37, Lakshmi Layout Main Rd, Chikka Begur, Begur, Bengaluru — 560114"
                  n={1}
                />
                <InfoCard icon={<Phone size={20} />}
                  label={L('Phone', 'फ़ोन', 'ದೂರವಾಣಿ')}
                  value="+91 92437 55613"
                  href="tel:+919243755613"
                  n={2}
                />
                <InfoCard icon={<Mail size={20} />}
                  label={L('Email', 'ईमेल', 'ಇಮೇಲ್')}
                  value="awgpblr.connect@gmail.com"
                  href="mailto:awgpblr.connect@gmail.com"
                  n={3}
                />
                <InfoCard icon={<Clock size={20} />}
                  label={L('Hours', 'समय', 'ಸಮಯ')}
                  value={L('Open Daily: 5:30 AM – 9:30 PM', 'प्रतिदिन: 5:30 AM – 9:30 PM', 'ಪ್ರತಿದಿನ: 5:30 AM – 9:30 PM')}
                  n={4}
                />
              </div>
              <div className="cp-info__social">
                <a href="https://wa.me/919243755613" target="_blank" rel="noopener noreferrer"
                  className="cp-social-btn cp-social-btn--wa">
                  <MessageCircle size={15} aria-hidden="true" /> WhatsApp
                </a>
                <a href="https://www.instagram.com/awgp.bengaluru/" target="_blank" rel="noopener noreferrer"
                  className="cp-social-btn cp-social-btn--ig">
                  <Instagram size={15} aria-hidden="true" /> Instagram
                </a>
                <a href="https://www.youtube.com/@AWGPBengaluru" target="_blank" rel="noopener noreferrer"
                  className="cp-social-btn cp-social-btn--yt">
                  <Youtube size={15} aria-hidden="true" /> YouTube
                </a>
                <a href="https://www.awgp.org" target="_blank" rel="noopener noreferrer"
                  className="cp-social-btn cp-social-btn--web">
                  <Globe size={15} aria-hidden="true" /> AWGP.org
                </a>
              </div>
            </div>

            {/* Right – map */}
            <div className="cp-info__map">
              <iframe
                title={L('AWGP Bengaluru location map', 'AWGP बेंगलूरु स्थान मानचित्र', 'AWGP ಬೆಂಗಳೂರು ನಕ್ಷೆ')}
                src={MAP_EMBED}
                width="100%" height="100%"
                style={{ border: 0, display: 'block', minHeight: '100%' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a href={MAP_LINK} target="_blank" rel="noopener noreferrer"
                className="cp-info__directions">
                {L('Get Directions', 'दिशा-निर्देश पाएं', 'ದಾರಿ ಪಡೆಯಿರಿ')}
              </a>
            </div>
          </div>

          <div className="cp-info__border-b" aria-hidden="true" />
        </div>
      </section>

      {/* ── WhatsApp Community ─────────────────────────────── */}
      <section className="cp-wa" ref={waRef}>
        <div className="cp-wa__sunburst" aria-hidden="true" />
        <div className="cp-wa__mandala-sm" aria-hidden="true" />

        <div className="cp-wa__inner">
          <header className="cp-wa__head">
            <span className="cp-wa__eyebrow">
              {L('Community', 'समुदाय', 'ಸಮುದಾಯ')}
            </span>
            <h2 className="cp-wa__title">
              {L('Join Our WhatsApp Community', 'WhatsApp समुदाय से जुड़ें', 'WhatsApp ಸಮುದಾಯ ಸೇರಿ')}
            </h2>
          </header>

          <div className="cp-wa__card">
            <div className="cp-wa__qr-col">
              <div className="cp-wa__qr-frame">
                <Image
                  src="/assets/misc/qr-code.png"
                  alt="WhatsApp QR Code"
                  width={172} height={172}
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
              </div>
              <p className="cp-wa__scan">
                {L('Scan to join', 'स्कैन करके जुड़ें', 'ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಸೇರಿ')}
              </p>
            </div>

            <div className="cp-wa__info">
              <h3 className="cp-wa__name">AWGP Bengaluru Pariwar</h3>
              <p className="cp-wa__desc">
                {L(
                  'Join our WhatsApp group for instant updates about Yagyas, programs, and Sadhana schedules.',
                  'यज्ञ, कार्यक्रम और साधना की तुरंत जानकारी के लिए हमारे WhatsApp समूह से जुड़ें।',
                  'ಯಜ್ಞ, ಕಾರ್ಯಕ್ರಮ ಮತ್ತು ಸಾಧನಾ ಮಾಹಿತಿಗಾಗಿ ಸೇರಿ.',
                )}
              </p>
              <ul className="cp-wa__perks">
                <li>{L('Yagya & program updates', 'यज्ञ एवं आयोजन की सूचनाएं', 'ಯಜ್ಞ ಮತ್ತು ಕಾರ್ಯಕ್ರಮ ಅಪ್‌ಡೇಟ್‌ಗಳು')}</li>
                <li>{L('Daily inspiration & thought of the day', 'दैनिक प्रेरणा एवं विचार', 'ದೈನಂದಿನ ಪ್ರೇರಣೆ')}</li>
                <li>{L('Community seva opportunities', 'समुदाय सेवा के अवसर', 'ಸಮುದಾಯ ಸೇವಾ ಅವಕಾಶಗಳು')}</li>
              </ul>
              <a
                href="https://wa.me/919243755613"
                target="_blank" rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <MessageCircle size={18} aria-hidden="true" />
                {L('Chat on WhatsApp', 'WhatsApp पर संपर्क करें', 'WhatsApp ನಲ್ಲಿ ಸಂಪರ್ಕಿಸಿ')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── How to Reach ──────────────────────────────────── */}
      <section className="cp-reach" ref={reachRef}>
        <div className="cp-reach__mandala" aria-hidden="true" />

        <div className="cp-reach__inner">
          <header className="cp-reach__head">
            <span className="cp-reach__eyebrow">
              {L('Directions', 'मार्गदर्शन', 'ಮಾರ್ಗದರ್ಶನ')}
            </span>
            <h2 className="cp-reach__title">
              {L('How to Reach Us', 'कैसे पहुंचें', 'ಹೇಗೆ ತಲುಪುವುದು')}
            </h2>
          </header>

          <div className="cp-reach__grid">
            {[
              {
                icon: '🚇', n: 1,
                mode: { en: 'By Metro', hi: 'मेट्रो से', kn: 'ಮೆಟ್ರೋ ಮೂಲಕ' },
                desc: {
                  en: 'Nearest metro station details will be updated once the exact address is confirmed.',
                  hi: 'सटीक पता तय होने पर नजदीकी मेट्रो स्टेशन की जानकारी अपडेट की जाएगी।',
                  kn: 'ನಿಖರ ವಿಳಾಸ ದೃಢೀಕರಣದ ನಂತರ ಹತ್ತಿರದ ಮೆಟ್ರೋ ನಿಲ್ದಾಣ ಮಾಹಿತಿ ನವೀಕರಿಸಲಾಗುವುದು.',
                },
              },
              {
                icon: '🚌', n: 2,
                mode: { en: 'By Bus', hi: 'बस से', kn: 'ಬಸ್ ಮೂಲಕ' },
                desc: {
                  en: 'BMTC bus route information will be available soon.',
                  hi: 'BMTC बस मार्ग जानकारी जल्द उपलब्ध होगी।',
                  kn: 'BMTC ಬಸ್ ಮಾರ್ಗ ಮಾಹಿತಿ ಶೀಘ್ರದಲ್ಲಿ ಲಭ್ಯ.',
                },
              },
              {
                icon: '🚗', n: 3,
                mode: { en: 'By Car / Auto', hi: 'कार / ऑटो से', kn: 'ಕಾರ್ / ಆಟೋ ಮೂಲಕ' },
                desc: {
                  en: 'Parking available on premises. Use the Google Maps link above for navigation.',
                  hi: 'परिसर में पार्किंग उपलब्ध है। नेविगेशन के लिए ऊपर दिए Google Maps लिंक का उपयोग करें।',
                  kn: 'ಆವರಣದಲ್ಲಿ ಪಾರ್ಕಿಂಗ್ ಲಭ್ಯ. ನ್ಯಾವಿಗೇಷನ್‌ಗಾಗಿ Google Maps ಲಿಂಕ್ ಬಳಸಿ.',
                },
              },
            ].map(({ icon, n, mode, desc }) => (
              <div key={n} className="cp-reach__card" style={{ '--n': n }}>
                <span className="cp-reach__icon" aria-hidden="true">{icon}</span>
                <h3 className="cp-reach__mode">{mode[locale] || mode.en}</h3>
                <p className="cp-reach__desc">{desc[locale] || desc.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCard({ icon, label, value, href, n }) {
  return (
    <div className="cp-info__card" style={{ '--n': n }}>
      <div className="cp-info__card-icon">{icon}</div>
      <div className="cp-info__card-body">
        <span className="cp-info__card-label">{label}</span>
        {href
          ? <a href={href} className="cp-info__card-value">{value}</a>
          : <span className="cp-info__card-value">{value}</span>}
      </div>
    </div>
  );
}
