'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '../../lib/i18n/navigation';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import './Hero.css';

const SCROLL_LABEL = {
  en: 'Scroll Down',
  hi: 'नीचे स्क्रॉल करें',
  kn: 'ಕೆಳಗೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ',
};

const SLIDES = [
  {
    id: 'home',
    image: '/assets/homepage/hero/hero.png',
    imageMobile: '/assets/homepage/hero/gayatri-mata1.jpg',
    en: {
      eyebrow: 'All World Gayatri Pariwar',
      title: 'Welcome to Gayatri Pariwar Bengaluru',
      sub: 'AWGP\'s Bengaluru chapter — serving the city through Gayatri Sadhana and selfless seva.',
      subMobile: 'AWGP\'s Bengaluru chapter — sadhana and selfless seva.',
      cta: 'Explore', ctaHref: '/homepath',
      cta2: 'Who We Are', cta2Href: '/about',
    },
    hi: {
      eyebrow: 'अखिल विश्व गायत्री परिवार',
      title: 'गायत्री परिवार बेंगलुरु में आपका स्वागत है',
      sub: 'वैज्ञानिक अध्यात्म, समुदाय और निस्वार्थ सेवा — गायत्री साधना में निहित।',
      subMobile: 'वैज्ञानिक अध्यात्म, समुदाय और निस्वार्थ सेवा।',
      cta: 'कार्यक्रम देखें', ctaHref: '/programs',
      cta2: 'हमारे बारे में', cta2Href: '/about',
    },
    kn: {
      eyebrow: 'ಅಖಿಲ ವಿಶ್ವ ಗಾಯತ್ರಿ ಪರಿವಾರ',
      title: 'ಗಾಯತ್ರಿ ಪರಿವಾರ ಬೆಂಗಳೂರಿಗೆ ಸ್ವಾಗತ',
      sub: 'ವೈಜ್ಞಾನಿಕ ಅಧ್ಯಾತ್ಮ, ಸಮುದಾಯ ಮತ್ತು ನಿಸ್ವಾರ್ಥ ಸೇವೆ — ಗಾಯತ್ರಿ ಸಾಧನೆಯ ಮೂಲಕ.',
      subMobile: 'ವೈಜ್ಞಾನಿಕ ಅಧ್ಯಾತ್ಮ, ಸಮುದಾಯ ಮತ್ತು ನಿಸ್ವಾರ್ಥ ಸೇವೆ.',
      cta: 'ಕಾರ್ಯಕ್ರಮಗಳು', ctaHref: '/programs',
      cta2: 'ನಮ್ಮ ಬಗ್ಗೆ', cta2Href: '/about',
    },
  },
  {
    id: 'about',
    image: '/assets/homepage/hero/about-hero.png',
    imageMobile: '/assets/homepage/hero/mashal_mob.png',
    en: {
      eyebrow: 'Our Story',
      title: 'Meet the Gayatri Pariwar',
      sub: 'The awakening of divinity in humanity and the descent of heaven on earth.',
      subMobile: 'Divinity in humanity, heaven on earth.',
      cta: 'Learn About Us', ctaHref: '/about',
    },
    hi: {
      eyebrow: 'हमारी कहानी',
      title: 'गायत्री परिवार से मिलें',
      sub: 'मनुष्य में देवत्व का उदय और धरती पर स्वर्ग का अवतरण।',
      subMobile: 'मनुष्य में देवत्व, धरती पर स्वर्ग।',
      cta: 'हमारे बारे में जानें', ctaHref: '/about',
    },
    kn: {
      eyebrow: 'ನಮ್ಮ ಕಥೆ',
      title: 'ಗಾಯತ್ರಿ ಪರಿವಾರವನ್ನು ಭೇಟಿಯಾಗಿ',
      sub: 'ಮನುಷ್ಯನಲ್ಲಿ ದೈವತ್ವದ ಉದಯ ಮತ್ತು ಭೂಮಿಯ ಮೇಲೆ ಸ್ವರ್ಗದ ಅವತರಣ.',
      subMobile: 'ಮನುಷ್ಯನಲ್ಲಿ ದೈವತ್ವ, ಭೂಮಿಯ ಮೇಲೆ ಸ್ವರ್ಗ.',
      cta: 'ನಮ್ಮ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ', ctaHref: '/about',
    },
  },
  {
    id: 'sanskars',
    image: '/assets/homepage/hero/sanskars-hero.jpg',
    imageMobile: '/assets/homepage/hero/sanskars-hero.jpg',
    en: {
      eyebrow: 'Sanskars',
      title: 'The Sacred Sanskars',
      sub: "Discover the Sanskars that mark life's milestones with Vedic rituals, community blessings, and timeless tradition.",
      subMobile: "The Sanskars that mark life's sacred milestones.",
      cta: 'Explore Sanskars', ctaHref: '/sanskars',
    },
    hi: {
      eyebrow: 'संस्कार',
      title: 'पवित्र संस्कार',
      sub: 'उन संस्कारों की खोज करें जो जीवन के पड़ावों को वैदिक अनुष्ठानों, सामुदायिक आशीर्वाद और शाश्वत परंपरा से चिह्नित करते हैं।',
      subMobile: 'जीवन के पवित्र पड़ावों को चिह्नित करने वाले संस्कार।',
      cta: 'संस्कार देखें', ctaHref: '/sanskars',
    },
    kn: {
      eyebrow: 'ಸಂಸ್ಕಾರಗಳು',
      title: 'ಪವಿತ್ರ ಸಂಸ್ಕಾರಗಳು',
      sub: 'ಜೀವನದ ಮೈಲಿಗಲ್ಲುಗಳನ್ನು ವೈದಿಕ ಆಚರಣೆಗಳು, ಸಾಮುದಾಯಿಕ ಆಶೀರ್ವಾದ ಮತ್ತು ಶಾಶ್ವತ ಸಂಪ್ರದಾಯದೊಂದಿಗೆ ಗುರುತಿಸುವ ಸಂಸ್ಕಾರಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.',
      subMobile: 'ಜೀವನದ ಪವಿತ್ರ ಮೈಲಿಗಲ್ಲುಗಳನ್ನು ಗುರುತಿಸುವ ಸಂಸ್ಕಾರಗಳು.',
      cta: 'ಸಂಸ್ಕಾರಗಳು ತಿಳಿಯಿರಿ', ctaHref: '/sanskars',
    },
  },
  {
    id: 'activities',
    image: '/assets/homepage/hero/activities.png',
    imageMobile: '/assets/homepage/hero/activities-hero.png',
    en: {
      eyebrow: 'Activities',
      title: 'Seva & Activities',
      sub: 'Engage in meaningful activities like yoga, meditation, sadhana that blend spiritual practice with heartfelt social service and seva.',
      subMobile: 'Meaningful activities of service and seva.',
      cta: 'Explore Our Activities', ctaHref: '/activities',
    },
    hi: {
      eyebrow: 'गतिविधियां',
      title: 'सेवा और सामुदायिक गतिविधियां',
      sub: 'ऐसी सार्थक सामुदायिक गतिविधियों में भाग लें जो आध्यात्मिक अभ्यास को हार्दिक सामाजिक सेवा के साथ जोड़ती हैं।',
      subMobile: 'आध्यात्मिक अभ्यास के साथ सार्थक सामुदायिक सेवा।',
      cta: 'हमारी गतिविधियां देखें', ctaHref: '/activities',
    },
    kn: {
      eyebrow: 'ಚಟುವಟಿಕೆಗಳು',
      title: 'ಸೇವೆ ಮತ್ತು ಸಾಮುದಾಯಿಕ ಚಟುವಟಿಕೆಗಳು',
      sub: 'ಆಧ್ಯಾತ್ಮಿಕ ಅಭ್ಯಾಸ ಮತ್ತು ಹೃದಯಪೂರ್ವಕ ಸಾಮಾಜಿಕ ಸೇವೆಯನ್ನು ಸಂಯೋಜಿಸುವ ಅರ್ಥಪೂರ್ಣ ಸಾಮುದಾಯಿಕ ಚಟುವಟಿಕೆಗಳಲ್ಲಿ ಭಾಗವಹಿಸಿ.',
      subMobile: 'ಆಧ್ಯಾತ್ಮಿಕ ಅಭ್ಯಾಸದೊಂದಿಗೆ ಅರ್ಥಪೂರ್ಣ ಸಾಮುದಾಯಿಕ ಸೇವೆ.',
      cta: 'ನಮ್ಮ ಚಟುವಟಿಕೆಗಳು ನೋಡಿ', ctaHref: '/activities',
    },
  },
  {
    id: 'programs',
    image: '/assets/homepage/hero/programs-hero1.png',
    imageMobile: '/assets/homepage/hero/programs-hero.png',
    en: {
      eyebrow: 'Programs',
      title: 'Festivals, Yagya & Shivirs',
      sub: 'Join our festival celebrations, Yagya ceremonies, and spiritual shivirs — moments of devotion, learning, and togetherness.',
      subMobile: 'Festivals, Yagya ceremonies, and spiritual shivirs.',
      cta: 'Explore Programs', ctaHref: '/programs',
    },
    hi: {
      eyebrow: 'कार्यक्रम',
      title: 'उत्सव, यज्ञ और शिविर',
      sub: 'हमारे उत्सव समारोहों, यज्ञ अनुष्ठानों और आध्यात्मिक शिविरों में शामिल हों — भक्ति, ज्ञान और सहभागिता के क्षण।',
      subMobile: 'उत्सव, यज्ञ अनुष्ठान और आध्यात्मिक शिविर।',
      cta: 'कार्यक्रम देखें', ctaHref: '/programs',
    },
    kn: {
      eyebrow: 'ಕಾರ್ಯಕ್ರಮಗಳು',
      title: 'ಹಬ್ಬಗಳು, ಯಜ್ಞ ಮತ್ತು ಶಿಬಿರಗಳು',
      sub: 'ನಮ್ಮ ಹಬ್ಬದ ಆಚರಣೆಗಳು, ಯಜ್ಞ ಆಚರಣೆಗಳು ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಶಿಬಿರಗಳಿಗೆ ಸೇರಿ — ಭಕ್ತಿ, ಕಲಿಕೆ ಮತ್ತು ಒಗ್ಗಟ್ಟಿನ ಕ್ಷಣಗಳು.',
      subMobile: 'ಹಬ್ಬಗಳು, ಯಜ್ಞ ಆಚರಣೆಗಳು ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಶಿಬಿರಗಳು.',
      cta: 'ಕಾರ್ಯಕ್ರಮಗಳು ನೋಡಿ', ctaHref: '/programs',
    },
  },
  {
    id: 'books',
    image: '/assets/homepage/hero/books-hero.png',
    en: {
      eyebrow: 'Wisdom & Knowledge',
      title: 'A Library of Sacred Wisdom',
      sub: 'Explore a rich collection of Vedic literature, spiritual texts, and self-help books — read online or order your copies.',
      subMobile: 'Vedic literature and spiritual texts to read or buy.',
      cta: 'Explore Our Literature', ctaHref: '/literature',
    },
    hi: {
      eyebrow: 'ज्ञान का भंडार',
      title: 'पवित्र ज्ञान का पुस्तकालय',
      sub: 'वैदिक साहित्य, आध्यात्मिक ग्रंथों और स्व-सहायता पुस्तकों का समृद्ध संग्रह खोजें — ऑनलाइन पढ़ें या मंगवाएं।',
      subMobile: 'पढ़ने या खरीदने के लिए वैदिक साहित्य और आध्यात्मिक ग्रंथ।',
      cta: 'हमारा साहित्य देखें', ctaHref: '/literature',
    },
    kn: {
      eyebrow: 'ಜ್ಞಾನ ಭಂಡಾರ',
      title: 'ಪವಿತ್ರ ಜ್ಞಾನದ ಗ್ರಂಥಾಲಯ',
      sub: 'ವೈದಿಕ ಸಾಹಿತ್ಯ, ಆಧ್ಯಾತ್ಮಿಕ ಗ್ರಂಥಗಳು ಮತ್ತು ಸ್ವ-ಸಹಾಯ ಪುಸ್ತಕಗಳ ಸಮೃದ್ಧ ಸಂಗ್ರಹ ಅನ್ವೇಷಿಸಿ — ಆನ್‌ಲೈನ್ ಓದಿ ಅಥವಾ ಖರೀದಿಸಿ.',
      subMobile: 'ಓದಲು ಅಥವಾ ಖರೀದಿಸಲು ವೈದಿಕ ಸಾಹಿತ್ಯ ಮತ್ತು ಗ್ರಂಥಗಳು.',
      cta: 'ನಮ್ಮ ಸಾಹಿತ್ಯ ನೋಡಿ', ctaHref: '/literature',
    },
  },
  {
    id: 'gau-seva',
    image: '/assets/homepage/hero/gau-seva-hero.png',
    imageMobile: '/assets/homepage/hero/gau.png',
    en: {
      eyebrow: 'Gau-Seva',
      title: 'Honour the Sacred Cow',
      sub: 'Participate in Gau Seva — a cherished tradition of compassionate care and service to the sacred cow, blessed by our ancestors.',
      subMobile: 'Compassionate care and service to the sacred cow.',
      cta: 'Gau Seva', ctaHref: '/activities/gau-seva',
    },
    hi: {
      eyebrow: 'गौ-सेवा',
      title: 'गाय माता की सेवा करें',
      sub: 'गौ सेवा में भाग लें — हमारे पूर्वजों द्वारा आशीर्वादित, पवित्र गाय की करुणामय देखभाल और सेवा की एक पोषित परंपरा।',
      subMobile: 'पवित्र गाय की करुणामय देखभाल और सेवा।',
      cta: 'गौ सेवा', ctaHref: '/activities/gau-seva',
    },
    kn: {
      eyebrow: 'ಗೌ-ಸೇವೆ',
      title: 'ಪವಿತ್ರ ಗೋವಿಗೆ ಗೌರವ ಅರ್ಪಿಸಿ',
      sub: 'ಗೌ ಸೇವಾದಲ್ಲಿ ಭಾಗವಹಿಸಿ — ನಮ್ಮ ಪೂರ್ವಜರಿಂದ ಆಶೀರ್ವದಿಸಲ್ಪಟ್ಟ, ಪವಿತ್ರ ಗೋವಿನ ಸೇವೆಯ ಒಂದು ಪ್ರಿಯ ಸಂಪ್ರದಾಯ.',
      subMobile: 'ಪವಿತ್ರ ಗೋವಿನ ಕರುಣಾಮಯ ಆರೈಕೆ ಮತ್ತು ಸೇವೆ.',
      cta: 'ಗೌ ಸೇವಾ', ctaHref: '/activities/gau-seva',
    },
  },
  {
    id: 'contact',
    image: '/assets/homepage/hero/hero1.png',
    imageMobile: '/assets/homepage/hero/hero3.jpg',
    en: {
      eyebrow: 'Reach Out to Us',
      title: "We'd Love to Hear from You",
      sub: "Whether you want to join our spiritual family, volunteer, or seek guidance — our doors are always open for you.",
      subMobile: 'Join us, volunteer, or seek guidance — our doors are open.',
      cta: 'Contact Us', ctaHref: '/contact',
    },
    hi: {
      eyebrow: 'हमसे संपर्क करें',
      title: 'हम आपसे मिलना चाहते हैं',
      sub: 'चाहे आप हमारे परिवार में शामिल होना चाहते हों, स्वयंसेवी बनना चाहते हों, या मार्गदर्शन की तलाश करते हों — हमारे दरवाजे सदा खुले हैं।',
      subMobile: 'हमारे दरवाजे आपके लिए सदा खुले हैं।',
      cta: 'संपर्क करें', ctaHref: '/contact',
    },
    kn: {
      eyebrow: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
      title: 'ನಿಮ್ಮಿಂದ ಕೇಳಲು ನಾವು ಇಷ್ಟಪಡುತ್ತೇವೆ',
      sub: 'ನೀವು ನಮ್ಮ ಆಧ್ಯಾತ್ಮಿಕ ಕುಟುಂಬ ಸೇರಲು, ಸ್ವಯಂಸೇವಕರಾಗಲು, ಅಥವಾ ಮಾರ್ಗದರ್ಶನ ಬಯಸಲು — ನಮ್ಮ ಬಾಗಿಲು ಯಾವಾಗಲೂ ತೆರೆದಿದೆ.',
      subMobile: 'ನಮ್ಮ ಬಾಗಿಲು ಯಾವಾಗಲೂ ನಿಮಗಾಗಿ ತೆರೆದಿದೆ.',
      cta: 'ಸಂಪರ್ಕಿಸಿ', ctaHref: '/contact',
    },
  },
];

const INTERVAL = 6000;

export default function Hero() {
  const locale = useLocale();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (idx) => setCurrent(((idx % SLIDES.length) + SLIDES.length) % SLIDES.length),
    []
  );
  const goNext = useCallback(() => go(current + 1), [current, go]);
  const goPrev = useCallback(() => go(current - 1), [current, go]);

  // Auto-advance — recreated on slide change so the timer restarts cleanly
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused, current]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) goNext();
      else goPrev();
    }
  }, [goNext, goPrev]);

  const active = SLIDES[current];
  const d = active[locale] || active.en;

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background layer — crossfades between slides, each with its own Ken Burns */}
      <div className="hero__stage" aria-hidden="true">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`hero__bg${i === current ? ' hero__bg--active' : ''}`}
          >
            <div className="hero__bg-zoom">
              <Image
                src={slide.image}
                className={`hero__img${slide.imageMobile ? ' hero__img--desktop' : ''}`}
                alt=""
                fill
                priority={i === 0}
                quality={90}
                sizes="100vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
              {slide.imageMobile && (
                <Image
                  src={slide.imageMobile}
                  className="hero__img hero__img--mobile"
                  alt=""
                  fill
                  priority={i === 0}
                  quality={90}
                  sizes="100vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              )}
            </div>
          </div>
        ))}
        <div className="hero__scrim" />
      </div>

      {/* Content — keyed by `current` so the entrance animation replays per slide */}
      <div className="hero__content">
        <div key={current} className={`hero__inner hero__inner--${active.id}`}>
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-mark" aria-hidden="true" />
            {d.eyebrow}
          </p>
          <h1 className="hero__title">{d.title}</h1>
          {d.sub && <p className="hero__sub hero__sub--full">{d.sub}</p>}
          {d.subMobile && <p className="hero__sub hero__sub--mob">{d.subMobile}</p>}

          {/* Gold diamond divider — the ownable "light from a single point" motif */}
          <div className="hero__divider" aria-hidden="true">
            <span className="hero__divider-line hero__divider-line--l" />
            <span className="hero__divider-diamond" />
            <span className="hero__divider-line hero__divider-line--r" />
          </div>

          {/* Brand anchor line — fixed Devanagari mantra, in the quote serif */}
          {/* {active.id === 'home' && (
            <p className="hero__mantra" lang="hi">
              हम बदलेंगे, युग बदलेगा | हम सुधरेंगे, युग सुधरेगा |
            </p>
          )} */}

          <div className="hero__actions">
            <Link href={d.ctaHref} className="btn btn-primary hero__cta">{d.cta}</Link>
            {d.cta2 && (
              <Link href={d.cta2Href} className="btn btn-outline hero__cta">{d.cta2}</Link>
            )}
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button className="hero__arrow hero__arrow--prev" onClick={goPrev} aria-label="Previous slide">
        <ChevronLeft size={24} strokeWidth={2.2} />
      </button>
      <button className="hero__arrow hero__arrow--next" onClick={goNext} aria-label="Next slide">
        <ChevronRight size={24} strokeWidth={2.2} />
      </button>

      {/* Dot navigation — desktop / tablet */}
      <div className="hero__dots" role="tablist" aria-label="Slide navigation">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            className={`hero__dot${i === current ? ' hero__dot--active' : ''}`}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            role="tab"
            aria-selected={i === current}
          />
        ))}
      </div>

      {/* Scroll cue — mobile only, replaces the dots */}
      <div className="hero__scroll-cue" aria-hidden="true">
        <span className="hero__scroll-cue-text">{SCROLL_LABEL[locale] || SCROLL_LABEL.en}</span>
        <ChevronDown className="hero__scroll-cue-arrow" size={18} strokeWidth={2.2} />
      </div>

      {/* Auto-advance progress — slim line on the bottom edge */}
      <div className="hero__progress" aria-hidden="true">
        <div
          key={current}
          className="hero__progress-bar"
          style={{
            animationDuration: `${INTERVAL}ms`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        />
      </div>
    </section>
  );
}
