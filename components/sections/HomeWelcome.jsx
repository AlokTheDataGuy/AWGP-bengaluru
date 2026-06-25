'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '../../lib/i18n/navigation';
import './HomeWelcome.css';

const DATA = {
  en: {
    eyebrow: 'Who We Are',
    title: 'All World Gayatri Pariwar',
    desc1: 'All World Gayatri Pariwar is a global movement for scientific spirituality, founded on the teachings of Yugrishi Pandit Shriram Sharma Acharya. Here in Bengaluru, we carry that light forward — through sadhana, study, self-restraint and service.',
    desc2: 'Whether you are a young professional seeking focus and calm, or a family continuing a lifelong practice — our doors are open. Come as you are.',
    cta: 'Read Our Story',
    portrait: 'Yugrishi Pt. Shriram Sharma Acharya',
  },
  hi: {
    eyebrow: 'हम कौन हैं',
    title: 'अखिल विश्व गायत्री परिवार',
    desc1: 'अखिल विश्व गायत्री परिवार वैज्ञानिक अध्यात्म का एक वैश्विक आंदोलन है, जो युगऋषि पं. श्रीराम शर्मा आचार्य की शिक्षाओं पर आधारित है। यहाँ बेंगलुरु में, हम उस ज्योति को आगे बढ़ाते हैं — साधना, स्वाध्याय, संयम और सेवा के माध्यम से।',
    desc2: 'चाहे आप एकाग्रता और शांति की खोज में एक युवा पेशेवर हों, या आजीवन साधना निभाने वाला परिवार — हमारे द्वार खुले हैं। जैसे हैं वैसे ही आइए।',
    cta: 'हमारी कहानी पढ़ें',
    portrait: 'युगऋषि पं. श्रीराम शर्मा आचार्य',
  },
  kn: {
    eyebrow: 'ನಾವು ಯಾರು',
    title: 'ಅಖಿಲ ವಿಶ್ವ ಗಾಯತ್ರಿ ಪರಿವಾರ',
    desc1: 'ಅಖಿಲ ವಿಶ್ವ ಗಾಯತ್ರಿ ಪರಿವಾರವು ವೈಜ್ಞಾನಿಕ ಅಧ್ಯಾತ್ಮದ ಒಂದು ಜಾಗತಿಕ ಆಂದೋಲನ, ಯುಗಋಷಿ ಪಂ. ಶ್ರೀರಾಮ ಶರ್ಮಾ ಆಚಾರ್ಯರ ಬೋಧನೆಗಳ ಮೇಲೆ ಸ್ಥಾಪಿತ. ಇಲ್ಲಿ ಬೆಂಗಳೂರಿನಲ್ಲಿ, ನಾವು ಆ ಬೆಳಕನ್ನು ಮುಂದೆ ಸಾಗಿಸುತ್ತೇವೆ — ಸಾಧನೆ, ಸ್ವಾಧ್ಯಾಯ, ಸಂಯಮ ಮತ್ತು ಸೇವೆಯ ಮೂಲಕ.',
    desc2: 'ನೀವು ಏಕಾಗ್ರತೆ ಮತ್ತು ಶಾಂತಿಯನ್ನು ಬಯಸುವ ಯುವ ವೃತ್ತಿಪರರಾಗಿರಲಿ, ಅಥವಾ ಆಜೀವ ಸಾಧನೆಯನ್ನು ಮುಂದುವರಿಸುವ ಕುಟುಂಬವಾಗಿರಲಿ — ನಮ್ಮ ಬಾಗಿಲುಗಳು ತೆರೆದಿವೆ. ಇರುವಂತೆಯೇ ಬನ್ನಿ.',
    cta: 'ನಮ್ಮ ಕಥೆ ಓದಿ',
    portrait: 'ಯುಗಋಷಿ ಪಂ. ಶ್ರೀರಾಮ ಶರ್ಮಾ ಆಚಾರ್ಯ',
  },
};

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export default function HomeWelcome() {
  const locale = useLocale();
  const d = DATA[locale] || DATA.en;
  const ref = useReveal();

  return (
    <section className="home-welcome section section--white" ref={ref}>
      <div className="section-inner home-welcome__inner">

        {/* Image side */}
        <div className="home-welcome__media">
          <div className="home-welcome__img-frame">
            <Image
              src="/assets/homepage/hero/about-hero.png"
              alt="Gayatri Chetna Kendra Bengaluru"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 860px) 100vw, 50vw"
            />
          </div>
          <figure className="home-welcome__portrait">
            <span className="home-welcome__portrait-img">
              <Image
                src="/assets/founders/guruji.jpeg"
                alt={d.portrait}
                fill
                style={{ objectFit: 'cover' }}
                sizes="120px"
              />
            </span>
            <figcaption className="home-welcome__portrait-label">{d.portrait}</figcaption>
          </figure>
        </div>

        {/* Text side */}
        <div className="home-welcome__text">
          <span className="sec-head__eyebrow">{d.eyebrow}</span>
          <h2 className="home-welcome__title">{d.title}</h2>
          <span className="home-welcome__rule" aria-hidden="true" />
          <p className="home-welcome__desc">{d.desc1}</p>
          <p className="home-welcome__desc">{d.desc2}</p>
          <Link href="/about" className="btn btn-primary home-welcome__cta">{d.cta}</Link>
        </div>

      </div>
    </section>
  );
}
