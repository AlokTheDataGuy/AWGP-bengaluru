import { useLocale } from 'next-intl';
import {
  MapPin, Phone, Mail, Clock, Globe, MessageCircle, Youtube,
} from 'lucide-react';
import './HomeContact.css';

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.4!2d77.6219!3d12.8835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s37%2C+Lakshmi+Layout+Main+Rd%2C+Chikka+Begur%2C+Begur%2C+Bengaluru%2C+Karnataka+560114!5e0!3m2!1sen!2sin!4v1';
const MAP_LINK =
  'https://maps.google.com/?q=37,+Lakshmi+Layout+Main+Rd,+Chikka+Begur,+Begur,+Bengaluru,+Karnataka+560114';

export default function HomeContact() {
  const locale = useLocale();
  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);

  return (
    <section className="home-contact section">
<div className="section-inner">

        <div className="home-contact__head">
          <span className="home-contact__eyebrow">
            {L('Reach Out to Us', 'हमसे संपर्क करें', 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ')}
          </span>
          <h2 className="home-contact__title">
            {L('We’d love to hear from you', 'हमें आपसे सुनकर प्रसन्नता होगी', 'ನಿಮ್ಮಿಂದ ಕೇಳಲು ನಾವು ಇಷ್ಟಪಡುತ್ತೇವೆ')}
          </h2>
          <span className="home-contact__divider" aria-hidden="true" />
          <p className="home-contact__lead">
            {L(
              'Whether you want to join our spiritual family, volunteer, or simply visit — our doors are always open.',
              'चाहे आप हमारे आध्यात्मिक परिवार से जुड़ना चाहें, सेवा करना चाहें, या केवल पधारना चाहें — हमारे द्वार सदैव खुले हैं।',
              'ನೀವು ನಮ್ಮ ಆಧ್ಯಾತ್ಮಿಕ ಕುಟುಂಬ ಸೇರಲು, ಸೇವೆ ಮಾಡಲು ಅಥವಾ ಸುಮ್ಮನೆ ಭೇಟಿ ನೀಡಲು ಬಯಸಿದರೂ — ನಮ್ಮ ಬಾಗಿಲುಗಳು ಸದಾ ತೆರೆದಿವೆ.',
            )}
          </p>
        </div>

        <div className="home-contact__grid">
          {/* Left — info panel + social */}
          <div className="home-contact__info">
            <div className="home-contact__panel">
              <div className="home-contact__cards">
                <InfoCard
                  icon={<MapPin size={20} />}
                  label={L('Address', 'पता', 'ವಿಳಾಸ')}
                  value="37, Lakshmi Layout Main Rd, Chikka Begur, Begur, Bengaluru — 560114"
                />
                <InfoCard
                  icon={<Phone size={20} />}
                  label={L('Phone', 'फ़ोन', 'ದೂರವಾಣಿ')}
                  value="+91 92437 55613"
                  href="tel:+919243755613"
                />
                <InfoCard
                  icon={<Mail size={20} />}
                  label={L('Email', 'ईमेल', 'ಇಮೇಲ್')}
                  value="connect@awgp.org"
                  href="mailto:connect@awgp.org"
                />
                <InfoCard
                  icon={<Clock size={20} />}
                  label={L('Hours', 'समय', 'ಸಮಯ')}
                  value={L('Open Daily: 5:00 AM – 9:00 PM', 'प्रतिदिन: 5:00 AM – 9:00 PM', 'ಪ್ರತಿದಿನ: 5:00 AM – 9:00 PM')}
                />
              </div>

              <div className="home-contact__social">
                <a href="https://wa.me/919243755613" target="_blank" rel="noopener noreferrer" className="home-contact__social-btn">
                  <MessageCircle size={18} aria-hidden="true" /> WhatsApp
                </a>
                <a href="https://www.youtube.com/awgp" target="_blank" rel="noopener noreferrer" className="home-contact__social-btn">
                  <Youtube size={18} aria-hidden="true" /> YouTube
                </a>
                <a href="https://www.awgp.org" target="_blank" rel="noopener noreferrer" className="home-contact__social-btn">
                  <Globe size={18} aria-hidden="true" /> AWGP.org
                </a>
              </div>
            </div>
          </div>

          {/* Right — map + directions */}
          <div className="home-contact__map">
            <iframe
              title={L('AWGP Bengaluru location map', 'AWGP बेंगलूरु स्थान मानचित्र', 'AWGP ಬೆಂಗಳೂರು ನಕ್ಷೆ')}
              src={MAP_EMBED}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="home-contact__directions fx-sheen fx-lift">
              {L('Get Directions', 'दिशा-निर्देश पाएं', 'ದಾರಿ ಪಡೆಯಿರಿ')}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

function InfoCard({ icon, label, value, href }) {
  return (
    <div className="home-contact__card">
      <div className="home-contact__card-icon">{icon}</div>
      <div className="home-contact__card-body">
        <span className="home-contact__card-label">{label}</span>
        {href
          ? <a href={href} className="home-contact__card-value">{value}</a>
          : <span className="home-contact__card-value">{value}</span>}
      </div>
    </div>
  );
}
