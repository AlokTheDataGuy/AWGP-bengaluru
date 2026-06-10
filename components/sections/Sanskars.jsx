'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '../../lib/i18n/navigation';
import Image from 'next/image';
import './Sanskars.css';

const SANSKARS = [
  { href: '/sanskars/punsavan',    img: '/assets/sanskars/punsavan-small.jpeg',
    en: { title: 'Punsavan',     desc: 'Sacred rituals during pregnancy to bless the unborn child with health and virtue.' },
    hi: { title: 'पुंसवन',       desc: 'गर्भावस्था में शिशु के स्वास्थ्य और सद्गुण के लिए पवित्र संस्कार।' },
    kn: { title: 'ಪುಂಸವನ',       desc: 'ಗರ್ಭಾವಸ್ಥೆಯಲ್ಲಿ ಶಿಶುವಿನ ಆರೋಗ್ಯಕ್ಕಾಗಿ ನೆರವೇರಿಸುವ ಸಂಸ್ಕಾರ.' } },
  { href: '/sanskars/naamkaran',   img: '/assets/sanskars/naamkaran1.jpg',
    en: { title: 'Naamkaran',    desc: 'The naming ceremony — welcoming a new soul with a meaningful, auspicious name.' },
    hi: { title: 'नामकरण',       desc: 'नामकरण संस्कार — नए जीव का परिवार में शुभ स्वागत।' },
    kn: { title: 'ನಾಮಕರಣ',       desc: 'ಹೊಸ ಜೀವಿಯನ್ನು ಶುಭ ಹೆಸರಿನೊಂದಿಗೆ ಸ್ವಾಗತಿಸುವ ಆಚರಣೆ.' } },
  { href: '/sanskars/annaprashan', img: '/assets/sanskars/annaprashan-small.jpg',
    en: { title: 'Annaprashan',  desc: "The first feeding — marking a child's transition from milk to solid food." },
    hi: { title: 'अन्नप्राशन',   desc: 'शिशु के पहले अन्न ग्रहण का पवित्र संस्कार।' },
    kn: { title: 'ಅನ್ನಪ್ರಾಶನ',   desc: 'ಶಿಶುವಿನ ಮೊದಲ ಅನ್ನ ಸ್ವೀಕಾರದ ಪವಿತ್ರ ಸಂಸ್ಕಾರ.' } },
  { href: '/sanskars/mundan',      img: '/assets/sanskars/mundan.jpg',
    en: { title: 'Mundan',       desc: 'The first haircut — symbolising removal of past-life impurities and a fresh beginning.' },
    hi: { title: 'मुंडन',         desc: 'प्रथम केश-मुंडन — पूर्व जन्म की अशुद्धियों का निवारण।' },
    kn: { title: 'ಮುಂಡನ',         desc: 'ಪ್ರಥಮ ಕ್ಷೌರ ಸಂಸ್ಕಾರ — ಹಿಂದಿನ ಜನ್ಮದ ಅಶುದ್ಧಿ ನಿವಾರಣೆ.' } },
  { href: '/sanskars/vidyarambh',  img: '/assets/sanskars/vidyaarambh.jpg',
    en: { title: 'Vidyarambh',   desc: "Initiation into learning — invoking Saraswati's blessings as education begins." },
    hi: { title: 'विद्यारंभ',     desc: 'सरस्वती माँ के आशीर्वाद से विद्या-दीक्षा की शुरुआत।' },
    kn: { title: 'ವಿದ್ಯಾರಂಭ',     desc: 'ಸರಸ್ವತಿ ದೇವಿಯ ಆಶೀರ್ವಾದದೊಂದಿಗೆ ವಿದ್ಯಾ ದೀಕ್ಷೆ.' } },
  { href: '/sanskars/yagyopaveet', img: '/assets/sanskars/yagyopaveet.jpg',
    en: { title: 'Yagyopaveet',  desc: 'The sacred thread ceremony — initiating a young person into study and Dharma.' },
    hi: { title: 'यज्ञोपवीत',    desc: 'यज्ञोपवीत संस्कार — अध्ययन और धर्म में दीक्षा का शुभ आरंभ।' },
    kn: { title: 'ಯಜ್ಞೋಪವೀತ',    desc: 'ಪವಿತ್ರ ದಾರ ಸಮಾರಂಭ — ಅಧ್ಯಯನ ಮತ್ತು ಧರ್ಮದ ದೀಕ್ಷೆ.' } },
  { href: '/sanskars/deeksha',     img: '/assets/sanskars/deeksha.jpg',
    en: { title: 'Deeksha',      desc: 'Spiritual initiation — receiving guidance from a Guru and entering a sacred path.' },
    hi: { title: 'दीक्षा',        desc: 'आध्यात्मिक दीक्षा — गुरु का मार्गदर्शन और पवित्र पथ पर प्रवेश।' },
    kn: { title: 'ದೀಕ್ಷಾ',        desc: 'ಆಧ್ಯಾತ್ಮಿಕ ದೀಕ್ಷೆ — ಗುರುವಿನ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ಪವಿತ್ರ ಪಥ ಪ್ರವೇಶ.' } },
  { href: '/sanskars/janm-divas',  img: '/assets/sanskars/janmdin.jpg',
    en: { title: 'Janm Divas',   desc: 'A spiritually meaningful birthday rooted in gratitude and conscious resolve.' },
    hi: { title: 'जन्म दिवस',    desc: 'कृतज्ञता और संकल्प से परिपूर्ण आध्यात्मिक जन्मदिन।' },
    kn: { title: 'ಜನ್ಮ ದಿವಸ',    desc: 'ಕೃತಜ್ಞತೆ ಮತ್ತು ಸಂಕಲ್ಪದ ಆಧ್ಯಾತ್ಮಿಕ ಹುಟ್ಟುಹಬ್ಬ.' } },
  { href: '/sanskars/vivah-divas', img: '/assets/sanskars/vivah-diwas.png',
    en: { title: 'Vivah Divas',  desc: 'Anniversary renewal of sacred vows — celebrating the spiritual bond of marriage.' },
    hi: { title: 'विवाह दिवस',   desc: 'विवाह वर्षगांठ पर पवित्र प्रतिज्ञाओं का नवीनीकरण।' },
    kn: { title: 'ವಿವಾಹ ದಿವಸ',   desc: 'ವಿವಾಹ ವಾರ್ಷಿಕೋತ್ಸವದಂದು ಪವಿತ್ರ ಪ್ರತಿಜ್ಞೆಗಳ ನವೀಕರಣ.' } },
  { href: '/sanskars/tarpan',      img: '/assets/sanskars/tarpan.jpeg',
    en: { title: 'Tarpan',       desc: 'Offerings of water to ancestors — a rite of reverence, remembrance and gratitude.' },
    hi: { title: 'तर्पण',         desc: 'पितरों को जल-अर्पण — श्रद्धा, स्मृति और कृतज्ञता का पवित्र संस्कार।' },
    kn: { title: 'ತರ್ಪಣ',         desc: 'ಪಿತೃಗಳಿಗೆ ಜಲ ಅರ್ಪಣೆ — ಗೌರವ, ಸ್ಮರಣೆ ಮತ್ತು ಕೃತಜ್ಞತೆಯ ವಿಧಿ.' } },
  { href: '/sanskars/anteysti',    img: '/assets/sanskars/anthesyti.jpg',
    en: { title: 'Antyeshti',    desc: "The last rites — honouring the soul's transition with sacred fire and prayer." },
    hi: { title: 'अंत्येष्टि',    desc: 'अंतिम संस्कार — पवित्र अग्नि और प्रार्थना के साथ आत्मा को विदाई।' },
    kn: { title: 'ಅಂತ್ಯೇಷ್ಟಿ',    desc: 'ಅಂತಿಮ ಸಂಸ್ಕಾರ — ಪವಿತ್ರ ಅಗ್ನಿ ಮತ್ತು ಪ್ರಾರ್ಥನೆಯೊಂದಿಗೆ ಆತ್ಮಕ್ಕೆ ವಿದಾಯ.' } },
];

const FADE_DURATION = 350;
const SLIDESHOW_INTERVAL = 3000;

export default function Sanskars() {
  const locale = useLocale();
  const timerRef  = useRef(null);
  const stripRef  = useRef(null);
  const thumbRefs = useRef([]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [fading,    setFading]    = useState(false);

  const L = (en, hi, kn) => locale === 'hi' ? hi : locale === 'kn' ? kn : en;

  const goTo = useCallback((idx) => {
    setFading(true);
    setTimeout(() => { setActiveIdx(idx); setFading(false); }, FADE_DURATION);
  }, []);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActiveIdx(prev => (prev + 1) % SANSKARS.length);
        setFading(false);
      }, FADE_DURATION);
    }, SLIDESHOW_INTERVAL);
  }, []);

  // Scroll active thumb into strip view only
  useEffect(() => {
    const el    = thumbRefs.current[activeIdx];
    const strip = stripRef.current;
    if (!el || !strip) return;
    const elRect    = el.getBoundingClientRect();
    const stripRect = strip.getBoundingClientRect();
    const relTop    = elRect.top - stripRect.top + strip.scrollTop;
    const relBot    = relTop + elRect.height;
    const viewTop   = strip.scrollTop;
    const viewBot   = viewTop + strip.clientHeight;
    if (relTop < viewTop)      strip.scrollTop = relTop - 8;
    else if (relBot > viewBot) strip.scrollTop = relBot - strip.clientHeight + 8;
  }, [activeIdx]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const active        = SANSKARS[activeIdx];
  const activeContent = active[locale] || active.en;

  return (
    <section id="sanskars" className="section sanskars-section">
      <div className="section-inner">
        <div className="section-header">
          <p className="eyebrow">
            {L('Sacred Rites of Passage', 'जीवन के पवित्र संस्कार', 'ಜೀವನದ ಪವಿತ್ರ ಸಂಸ್ಕಾರಗಳು')}
          </p>
          <h2>{L('Our Sanskars', 'हमारे संस्कार', 'ನಮ್ಮ ಸಂಸ್ಕಾರಗಳು')}</h2>
          <p className="sanskars-subtitle">
            {L(
              "Vedic ceremonies that mark life's most meaningful milestones — performed with reverence, rooted in wisdom.",
              'वैदिक संस्कार जो जीवन के महत्वपूर्ण पड़ावों को पवित्र और अर्थपूर्ण बनाते हैं।',
              'ಜೀವನದ ಮಹತ್ವದ ಹಂತಗಳನ್ನು ಪವಿತ್ರ ಮತ್ತು ಅರ್ಥಪೂರ್ಣಗೊಳಿಸುವ ವೈದಿಕ ಸಂಸ್ಕಾರಗಳು.'
            )}
          </p>
        </div>

        {/* Desktop: strip + detail */}
        <div className="sanskars-desktop">
          {/* Left: circle strip */}
          <div className="sk-strip" ref={stripRef}>
            {SANSKARS.map((s, i) => {
              const c = s[locale] || s.en;
              return (
                <button
                  key={s.href}
                  ref={el => thumbRefs.current[i] = el}
                  className={`sk-thumb${i === activeIdx ? ' sk-thumb--active' : ''}`}
                  onClick={() => { clearInterval(timerRef.current); goTo(i); setTimeout(startTimer, 10000); }}
                  aria-label={c.title}
                >
                  <div className="sk-thumb__ring">
                    <Image src={s.img} alt={c.title} width={108} height={108} className="sk-thumb__img" style={{ objectFit: 'cover' }} />
                  </div>
                  <span className="sk-thumb__label">{c.title}</span>
                </button>
              );
            })}
          </div>

          {/* Right: detail panel */}
          <Link
            href={active.href}
            className={`sk-detail${fading ? ' sk-detail--fading' : ''}`}
          >
            <div className="sk-detail__img-wrap">
              <Image
                src={active.img}
                alt={activeContent.title}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                sizes="(max-width: 860px) 100vw, 65vw"
                className="sk-detail__img"
              />
              <div className="sk-detail__img-overlay" />
              <span className="sk-detail__arrow" aria-hidden="true">→</span>
            </div>
            <div className="sk-detail__body">
              <h3 className="sk-detail__title">{activeContent.title}</h3>
              <p className="sk-detail__desc">{activeContent.desc}</p>
            </div>
            <div className="sk-detail__progress">
              <div className="sk-detail__progress-fill" style={{ width: `${((activeIdx + 1) / SANSKARS.length) * 100}%` }} />
            </div>
          </Link>
        </div>

        {/* Mobile: grid */}
        <div className="sanskars-mobile">
          {SANSKARS.map(s => {
            const content = s[locale] || s.en;
            return (
              <Link key={s.href} href={s.href} className="sk-mobile-item">
                <div className="sk-mobile-item__img-wrap">
                  <Image src={s.img} alt={content.title} fill style={{ objectFit: 'cover' }} sizes="50vw" className="sk-mobile-item__img" />
                </div>
                <div className="sk-mobile-item__body">
                  <h3 className="sk-mobile-item__title">{content.title}</h3>
                  <p className="sk-mobile-item__desc">{content.desc}</p>
                  <span className="sk-mobile-item__link">
                    {L('Read More', 'अधिक जानें', 'ಇನ್ನಷ್ಟು')} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/sanskars" className="btn btn-outline">
            {L('View All Sanskars →', 'सभी संस्कार देखें →', 'ಎಲ್ಲಾ ಸಂಸ್ಕಾರಗಳು ನೋಡಿ →')}
          </Link>
        </div>
      </div>
    </section>
  );
}
