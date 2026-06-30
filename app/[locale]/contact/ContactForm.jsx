'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { useReveal } from '../../../lib/useReveal';

const CONTACT_EMAIL = 'connect@awgpblr.org';

/* Subject options — value + English label (used in the email subject line) */
const SUBJECTS = [
  { value: 'general',    en: 'General Enquiry',      hi: 'सामान्य पूछताछ',     kn: 'ಸಾಮಾನ್ಯ ವಿಚಾರಣೆ' },
  { value: 'sanskars',   en: 'Sanskars',             hi: 'संस्कार',            kn: 'ಸಂಸ್ಕಾರ' },
  { value: 'programs',   en: 'Programs',             hi: 'कार्यक्रम',          kn: 'ಕಾರ್ಯಕ್ರಮಗಳು' },
  { value: 'activities', en: 'Activities',           hi: 'गतिविधियां',         kn: 'ಚಟುವಟಿಕೆಗಳು' },
  { value: 'yagya',      en: 'Yagya / Havan',        hi: 'यज्ञ / हवन',         kn: 'ಯಜ್ಞ / ಹವನ' },
  { value: 'volunteer',  en: 'Volunteer / Seva',     hi: 'सेवा में सहयोग',     kn: 'ಸೇವೆ' },
  { value: 'visit',      en: 'Visit / Darshan',      hi: 'पधारना / दर्शन',     kn: 'ಭೇಟಿ / ದರ್ಶನ' },
  { value: 'site',       en: 'Regarding the Website', hi: 'वेबसाइट संबंधी',    kn: 'ಜಾಲತಾಣದ ಬಗ್ಗೆ' },
  { value: 'feedback',   en: 'Website Feedback',     hi: 'वेबसाइट फीडबैक',     kn: 'ಜಾಲತಾಣ ಪ್ರತಿಕ್ರಿಯೆ' },
  { value: 'other',      en: 'Other',                hi: 'अन्य',               kn: 'ಇತರೆ' },
];

export default function ContactForm({ locale }) {
  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);
  const Ls = (o) => (locale === 'hi' ? o.hi : locale === 'kn' ? o.kn : o.en);

  const formRef = useReveal();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', subject: 'general', message: '',
  });
  const [error, setError] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setError(L(
        'Please enter your name and a message.',
        'कृपया अपना नाम और संदेश दर्ज करें।',
        'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಸಂದೇಶವನ್ನು ನಮೂದಿಸಿ.',
      ));
      return;
    }
    setError('');

    const subjLabel = SUBJECTS.find((s) => s.value === form.subject)?.en || 'General Enquiry';
    const bodyLines = [
      `Name: ${form.name.trim()}`,
      form.email.trim()   && `Email: ${form.email.trim()}`,
      form.phone.trim()   && `Phone: ${form.phone.trim()}`,
      form.address.trim() && `Address: ${form.address.trim()}`,
      `Subject: ${subjLabel}`,
      '',
      form.message.trim(),
    ].filter(Boolean).join('\n');

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `[Website] ${subjLabel}`
    )}&body=${encodeURIComponent(bodyLines)}`;
    window.location.href = mailto;
  };

  return (
    <section className="cp-form" ref={formRef}>
      <div className="cp-form__mandala" aria-hidden="true" />

      <div className="cp-form__inner">
        <header className="cp-form__head">
          <span className="cp-form__eyebrow">
            {L('Send a Message', 'संदेश भेजें', 'ಸಂದೇಶ ಕಳುಹಿಸಿ')}
          </span>
          <h2 className="cp-form__title">
            {L('Write to Us', 'हमें लिखें', 'ನಮಗೆ ಬರೆಯಿರಿ')}
          </h2>
          <p className="cp-form__lead">
            {L(
              'Have a question or a message for us? Fill in the form below and we will get back to you.',
              'कोई प्रश्न या संदेश है? नीचे फ़ॉर्म भरें, हम शीघ्र आपसे संपर्क करेंगे।',
              'ಪ್ರಶ್ನೆ ಅಥವಾ ಸಂದೇಶವಿದೆಯೇ? ಕೆಳಗಿನ ನಮೂನೆಯನ್ನು ಭರ್ತಿ ಮಾಡಿ, ನಾವು ಶೀಘ್ರ ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.',
            )}
          </p>
        </header>

        <form className="cp-form__card" onSubmit={handleSubmit} noValidate>
          <div className="cp-form__panel-bar" aria-hidden="true" />

          <div className="cp-form__grid">
            <div className="cp-form__field">
              <label className="cp-form__label" htmlFor="cf-name">
                {L('Full Name', 'पूरा नाम', 'ಪೂರ್ಣ ಹೆಸರು')} <span className="cp-form__req">*</span>
              </label>
              <input
                id="cf-name" type="text" className="cp-form__input"
                value={form.name} onChange={update('name')}
                placeholder={L('Your name', 'आपका नाम', 'ನಿಮ್ಮ ಹೆಸರು')}
                required
              />
            </div>

            <div className="cp-form__field">
              <label className="cp-form__label" htmlFor="cf-email">
                {L('Email', 'ईमेल', 'ಇಮೇಲ್')} <span className="cp-form__opt">({L('optional', 'वैकल्पिक', 'ಐಚ್ಛಿಕ')})</span>
              </label>
              <input
                id="cf-email" type="email" className="cp-form__input"
                value={form.email} onChange={update('email')}
                placeholder="you@email.com"
              />
            </div>

            <div className="cp-form__field">
              <label className="cp-form__label" htmlFor="cf-phone">
                {L('Phone', 'फ़ोन', 'ದೂರವಾಣಿ')} <span className="cp-form__opt">({L('optional', 'वैकल्पिक', 'ಐಚ್ಛಿಕ')})</span>
              </label>
              <input
                id="cf-phone" type="tel" className="cp-form__input"
                value={form.phone} onChange={update('phone')}
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="cp-form__field">
              <label className="cp-form__label" htmlFor="cf-address">
                {L('Address', 'पता', 'ವಿಳಾಸ')} <span className="cp-form__opt">({L('optional', 'वैकल्पिक', 'ಐಚ್ಛಿಕ')})</span>
              </label>
              <input
                id="cf-address" type="text" className="cp-form__input"
                value={form.address} onChange={update('address')}
                placeholder={L('Area / City', 'क्षेत्र / शहर', 'ಪ್ರದೇಶ / ನಗರ')}
              />
            </div>

            <div className="cp-form__field cp-form__field--full">
              <label className="cp-form__label" htmlFor="cf-subject">
                {L('Subject', 'विषय', 'ವಿಷಯ')}
              </label>
              <select
                id="cf-subject" className="cp-form__input cp-form__select"
                value={form.subject} onChange={update('subject')}
              >
                {SUBJECTS.map((s) => (
                  <option key={s.value} value={s.value}>{Ls(s)}</option>
                ))}
              </select>
            </div>

            <div className="cp-form__field cp-form__field--full">
              <label className="cp-form__label" htmlFor="cf-message">
                {L('Message', 'संदेश', 'ಸಂದೇಶ')} <span className="cp-form__req">*</span>
              </label>
              <textarea
                id="cf-message" className="cp-form__input cp-form__textarea"
                value={form.message} onChange={update('message')}
                rows={5}
                placeholder={L(
                  'Tell us how we can help…',
                  'हमें बताएं कि हम कैसे सहायता कर सकते हैं…',
                  'ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು ಎಂದು ತಿಳಿಸಿ…',
                )}
                required
              />
            </div>
          </div>

          {error && <p className="cp-form__error" role="alert">{error}</p>}

          <button type="submit" className="cp-form__submit">
            {L('Send Message', 'संदेश भेजें', 'ಸಂದೇಶ ಕಳುಹಿಸಿ')}
            <Send size={17} aria-hidden="true" />
          </button>

          <p className="cp-form__note">
            {L(
              'Your message opens in your email app, addressed to ',
              'आपका संदेश आपके ईमेल ऐप में खुलेगा, यहाँ भेजने हेतु ',
              'ನಿಮ್ಮ ಸಂದೇಶ ನಿಮ್ಮ ಇಮೇಲ್ ಆ್ಯಪ್‌ನಲ್ಲಿ ತೆರೆಯುತ್ತದೆ, ಇಲ್ಲಿಗೆ ',
            )}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </form>
      </div>
    </section>
  );
}
