'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '../../lib/i18n/navigation';
import './HomeWelcome.css';

const DATA = {
  en: {
    eyebrow: 'Who We Are',
    title: 'A Community Rooted in the Gayatri Tradition',
    desc1: 'Gayatri Chetna Kendra, Bengaluru is a vibrant centre of the All World Gayatri Pariwar — inspired by the life and teachings of Pandit Shriram Sharma Acharya ji and Mata Bhagwati Devi Sharma ji.',
    desc2: 'We offer a path of scientific spirituality — blending ancient Vedic wisdom with modern understanding — to help individuals and families live with purpose, virtue, and inner peace.',
    quote: '॥ हम सुधरेंगे — युग सुधरेगा ॥',
    quoteSub: 'The motto of Yug Nirman Yojana',
    cta: 'Learn More About Us',
    badgeLabel: 'Years of Service',
  },
  hi: {
    eyebrow: 'हम कौन हैं',
    title: 'गायत्री परंपरा में निहित एक समुदाय',
    desc1: 'गायत्री चेतना केंद्र, बेंगलुरु — अखिल विश्व गायत्री परिवार का एक जीवंत केंद्र है, जो पं. श्रीराम शर्मा आचार्य जी और माता भगवती देवी शर्मा जी की शिक्षाओं से प्रेरित है।',
    desc2: 'हम वैज्ञानिक अध्यात्म का मार्ग प्रदान करते हैं — प्राचीन वैदिक ज्ञान को आधुनिक समझ के साथ जोड़कर — व्यक्तियों और परिवारों को सार्थक, सदाचारी और शांतिपूर्ण जीवन की ओर ले जाने के लिए।',
    quote: '॥ हम सुधरेंगे — युग सुधरेगा ॥',
    quoteSub: 'युग निर्माण योजना का संकल्प',
    cta: 'हमारे बारे में जानें',
    badgeLabel: 'सेवा के वर्ष',
  },
  kn: {
    eyebrow: 'ನಾವು ಯಾರು',
    title: 'ಗಾಯತ್ರಿ ಪರಂಪರೆಯಲ್ಲಿ ಬೇರೂರಿದ ಒಂದು ಸಮುದಾಯ',
    desc1: 'ಗಾಯತ್ರಿ ಚೇತನ ಕೇಂದ್ರ, ಬೆಂಗಳೂರು — ಅಖಿಲ ವಿಶ್ವ ಗಾಯತ್ರಿ ಪರಿವಾರದ ಒಂದು ಜೀವಂತ ಕೇಂದ್ರ, ಪಂ. ಶ್ರೀರಾಮ ಶರ್ಮಾ ಆಚಾರ್ಯ ಜಿ ಮತ್ತು ಮಾತಾ ಭಗವತಿ ದೇವಿ ಶರ್ಮಾ ಜಿ ಅವರ ಬೋಧನೆಗಳಿಂದ ಪ್ರೇರಿತ.',
    desc2: 'ನಾವು ವೈಜ್ಞಾನಿಕ ಅಧ್ಯಾತ್ಮದ ಮಾರ್ಗವನ್ನು ನೀಡುತ್ತೇವೆ — ಪ್ರಾಚೀನ ವೈದಿಕ ಜ್ಞಾನ ಮತ್ತು ಆಧುನಿಕ ತಿಳಿವಳಿಕೆಯ ಸಮ್ಮಿಲನದ ಮೂಲಕ — ಸಾರ್ಥಕ, ಸಚ್ಚರಿತ್ರ ಮತ್ತು ಶಾಂತ ಜೀವನದ ಕಡೆ ಕರೆದೊಯ್ಯಲು.',
    quote: '॥ हम सुधरेंगे — युग सुधरेगा ॥',
    quoteSub: 'ಯುಗ ನಿರ್ಮಾಣ ಯೋಜನೆಯ ಧ್ಯೇಯ',
    cta: 'ನಮ್ಮ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ',
    badgeLabel: 'ಸೇವೆಯ ವರ್ಷಗಳು',
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

        {/* Text side */}
        <div className="home-welcome__text">
          <span className="sec-head__eyebrow">{d.eyebrow}</span>
          <div className="divider" />
          <h2 className="home-welcome__title">{d.title}</h2>
          <p className="home-welcome__desc">{d.desc1}</p>
          <p className="home-welcome__desc">{d.desc2}</p>
          <figure className="home-welcome__quote">
            <blockquote>{d.quote}</blockquote>
            <figcaption>{d.quoteSub}</figcaption>
          </figure>
          <Link href="/about" className="link-arrow">{d.cta}</Link>
        </div>

        {/* Image side */}
        <div className="home-welcome__img-wrap">
          <div className="home-welcome__img-frame">
            <Image
              src="/assets/chetna-kendra/mandir.png"
              alt="Gayatri Chetna Kendra Bengaluru"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 860px) 100vw, 50vw"
            />
          </div>
          <div className="home-welcome__badge">
            <span className="home-welcome__badge-num">40+</span>
            <span className="home-welcome__badge-label">{d.badgeLabel}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
