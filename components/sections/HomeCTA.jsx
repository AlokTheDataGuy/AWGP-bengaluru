'use client';

import { useLocale } from 'next-intl';
import { Link } from '../../lib/i18n/navigation';
import { useReveal } from '../../lib/useReveal';
import './HomeCTA.css';

const JOIN_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSenAHsGkgiiYVh4GkGFiV6XAFFEFqTk4LNEA0U20KiBAnHoFA/viewform?fbzx=-8132684196568383509';

export default function HomeCTA() {
  const locale = useLocale();
  const L = (en, hi, kn) => locale === 'hi' ? hi : locale === 'kn' ? kn : en;
  const ref = useReveal();

  return (
    <section className="home-cta" ref={ref}>
      {/* Rotating lotus-mandala watermarks (designs folder) */}
      <span className="home-cta__mandala home-cta__mandala--tr" aria-hidden="true" />
      <span className="home-cta__mandala home-cta__mandala--bl" aria-hidden="true" />

      <div className="section-inner">
        <div className="home-cta__card">
          <span className="home-cta__glow" aria-hidden="true" />

          <span className="home-cta__eyebrow">
            {L('Join the Pariwar', 'परिवार से जुड़ें', 'ಪರಿವಾರ ಸೇರಿ')}
          </span>

          <h2 className="home-cta__title">
            {L(
              <>Be Part of the <em>Gayatri Pariwar</em></>,
              <>गायत्री परिवार का <em>हिस्सा बनें</em></>,
              <>ಗಾಯತ್ರಿ ಪರಿವಾರದ <em>ಭಾಗವಾಗಿ</em></>
            )}
          </h2>

          <span className="home-cta__divider" aria-hidden="true" />

          <p className="home-cta__desc">
            {L(
              'Join thousands of seekers on the path of truth, wisdom, and selfless service.',
              'सत्य, ज्ञान और निस्वार्थ सेवा के मार्ग पर हजारों साधकों के साथ जुड़ें।',
              'ಸತ್ಯ, ಜ್ಞಾನ ಮತ್ತು ನಿಸ್ವಾರ್ಥ ಸೇವೆಯ ಮಾರ್ಗದಲ್ಲಿ ಸಾವಿರಾರು ಸಾಧಕರೊಂದಿಗೆ ಸೇರಿ.'
            )}
          </p>

          <div className="home-cta__actions">
            <a
              href={JOIN_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <span className="home-cta__btn-label--full">
                {L('Join the Pariwar', 'परिवार से जुड़ें', 'ಪರಿವಾರ ಸೇರಿ')}
              </span>
              <span className="home-cta__btn-label--short">
                {L('Join Us', 'जुड़ें', 'ಸೇರಿ')}
              </span>
            </a>
            <Link href="/contact" className="btn btn-outline-dark">
              {L('Contact Us', 'संपर्क करें', 'ಸಂಪರ್ಕಿಸಿ')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
