'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '../../lib/i18n/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Hero.css';

const SLIDES = [
  {
    id: 'home',
    image: '/assets/homepage/hero/hero.png',
    imageMobile: '/assets/homepage/hero/mashal_mob.png',
    en: {
      eyebrow: 'All World Gayatri Pariwar',
      title: 'Welcome to AWGP Bengaluru',
      sub: 'Scientific spirituality, community, and selfless service — rooted in Gayatri Sadhana.',
      subMobile: 'Scientific spirituality, community, and selfless service.',
      cta: 'Explore Events', ctaHref: '/events',
      cta2: 'Who We Are',   cta2Href: '/about',
    },
    hi: {
      eyebrow: 'अखिल विश्व गायत्री परिवार',
      title: 'गायत्री परिवार बेंगलुरु',
      sub: 'वैज्ञानिक अध्यात्म, समुदाय और निस्वार्थ सेवा — गायत्री साधना में निहित।',
      subMobile: 'वैज्ञानिक अध्यात्म, समुदाय और निस्वार्थ सेवा।',
      cta: 'कार्यक्रम देखें', ctaHref: '/events',
      cta2: 'हमारे बारे में', cta2Href: '/about',
    },
    kn: {
      eyebrow: 'ಅಖಿಲ ವಿಶ್ವ ಗಾಯತ್ರಿ ಪರಿವಾರ',
      title: 'AWGP ಬೆಂಗಳೂರುಗೆ ಸ್ವಾಗತ',
      sub: 'ವೈಜ್ಞಾನಿಕ ಅಧ್ಯಾತ್ಮ, ಸಮುದಾಯ ಮತ್ತು ನಿಸ್ವಾರ್ಥ ಸೇವೆ — ಗಾಯತ್ರಿ ಸಾಧನೆಯ ಮೂಲಕ.',
      subMobile: 'ವೈಜ್ಞಾನಿಕ ಅಧ್ಯಾತ್ಮ, ಸಮುದಾಯ ಮತ್ತು ನಿಸ್ವಾರ್ಥ ಸೇವೆ.',
      cta: 'ಕಾರ್ಯಕ್ರಮಗಳು', ctaHref: '/events',
      cta2: 'ನಮ್ಮ ಬಗ್ಗೆ',    cta2Href: '/about',
    },
  },
  {
    id: 'about',
    image: '/assets/homepage/hero/about-hero.png',
    imageMobile: '/assets/mobile_imgs/about_us_bg.jpg',
    en: {
      eyebrow: 'Our Story',
      title: 'Rooted in Tradition, Serving Humanity',
      sub: 'Founded on the teachings of Pt. Shriram Sharma Acharya, we nurture spiritual growth and social awakening.',
      subMobile: 'Nurturing spiritual growth and social awakening.',
      cta: 'Learn About Us', ctaHref: '/about',
    },
    hi: {
      eyebrow: 'हमारी कहानी',
      title: 'परंपरा में निहित, मानवता की सेवा में',
      sub: 'पं. श्रीराम शर्मा आचार्य की शिक्षाओं पर स्थापित, हम आध्यात्मिक विकास और सामाजिक जागृति को बढ़ावा देते हैं।',
      subMobile: 'आध्यात्मिक विकास और सामाजिक जागृति को बढ़ावा।',
      cta: 'हमारे बारे में जानें', ctaHref: '/about',
    },
    kn: {
      eyebrow: 'ನಮ್ಮ ಕಥೆ',
      title: 'ಸಂಪ್ರದಾಯದಲ್ಲಿ ಬೇರೂರಿ, ಮಾನವತೆಯ ಸೇವೆಯಲ್ಲಿ',
      sub: 'ಪಂ. ಶ್ರೀರಾಮ ಶರ್ಮ ಆಚಾರ್ಯರ ಬೋಧನೆಗಳ ಮೇಲೆ ಸ್ಥಾಪಿತ, ನಾವು ಆಧ್ಯಾತ್ಮಿಕ ಬೆಳವಣಿಗೆ ಮತ್ತು ಸಾಮಾಜಿಕ ಜಾಗೃತಿಯನ್ನು ಪೋಷಿಸುತ್ತೇವೆ.',
      subMobile: 'ಆಧ್ಯಾತ್ಮಿಕ ಬೆಳವಣಿಗೆ ಮತ್ತು ಸಾಮಾಜಿಕ ಜಾಗೃತಿಯ ಪೋಷಣೆ.',
      cta: 'ನಮ್ಮ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ', ctaHref: '/about',
    },
  },
  {
    id: 'sanskars',
    image: '/assets/homepage/hero/sanskars-hero.jpg',
    en: {
      eyebrow: 'Sacred Sacraments',
      title: "Life's Sacred Milestones",
      sub: "Discover the 16 Sanskars that mark life's milestones with Vedic rituals, community blessings, and timeless tradition.",
      subMobile: "The 16 Sanskars that mark life's sacred milestones.",
      cta: 'Explore Sanskars', ctaHref: '/sanskars',
    },
    hi: {
      eyebrow: 'पवित्र संस्कार',
      title: 'जीवन के पवित्र पड़ाव',
      sub: '16 संस्कारों की खोज करें जो जीवन के पवित्र मील के पत्थरों को वैदिक अनुष्ठानों और सामुदायिक आशीर्वाद से चिह्नित करते हैं।',
      subMobile: 'जीवन के पवित्र पड़ावों को चिह्नित करने वाले 16 संस्कार।',
      cta: 'संस्कार देखें', ctaHref: '/sanskars',
    },
    kn: {
      eyebrow: 'ಪವಿತ್ರ ಸಂಸ್ಕಾರಗಳು',
      title: 'ಜೀವನದ ಪವಿತ್ರ ಮೈಲಿಗಲ್ಲುಗಳು',
      sub: 'ಜೀವನದ ಪವಿತ್ರ ಮೈಲಿಗಲ್ಲುಗಳನ್ನು ವೈದಿಕ ಆಚರಣೆಗಳು ಮತ್ತು ಸಾಮುದಾಯಿಕ ಆಶೀರ್ವಾದದೊಂದಿಗೆ ಗುರುತಿಸುವ 16 ಸಂಸ್ಕಾರಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.',
      subMobile: 'ಜೀವನದ ಪವಿತ್ರ ಮೈಲಿಗಲ್ಲುಗಳನ್ನು ಗುರುತಿಸುವ 16 ಸಂಸ್ಕಾರಗಳು.',
      cta: 'ಸಂಸ್ಕಾರಗಳು ತಿಳಿಯಿರಿ', ctaHref: '/sanskars',
    },
  },
  {
    id: 'programs',
    image: '/assets/homepage/hero/programs-hero.png',
    en: {
      eyebrow: 'Spiritual Growth',
      title: 'Transform Your Life Through Sadhana',
      sub: 'Join our structured programs — from Yagya ceremonies to meditation retreats — designed for deep inner awakening.',
      subMobile: 'Structured programs for deep inner awakening.',
      cta: 'View Events', ctaHref: '/events',
    },
    hi: {
      eyebrow: 'आध्यात्मिक विकास',
      title: 'साधना से जीवन को बदलें',
      sub: 'हमारे संरचित कार्यक्रमों में शामिल हों — यज्ञ से लेकर ध्यान शिविर तक — गहरी आंतरिक जागृति के लिए।',
      subMobile: 'गहरी आंतरिक जागृति के लिए संरचित कार्यक्रम।',
      cta: 'कार्यक्रम देखें', ctaHref: '/events',
    },
    kn: {
      eyebrow: 'ಆಧ್ಯಾತ್ಮಿಕ ಬೆಳವಣಿಗೆ',
      title: 'ಸಾಧನೆಯ ಮೂಲಕ ಜೀವನ ಬದಲಿಸಿ',
      sub: 'ಯಜ್ಞ ಆಚರಣೆಗಳಿಂದ ಧ್ಯಾನ ಶಿಬಿರದವರೆಗೆ — ಆಳವಾದ ಆಂತರಿಕ ಜಾಗೃತಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಿದ ನಮ್ಮ ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ಸೇರಿ.',
      subMobile: 'ಆಳವಾದ ಆಂತರಿಕ ಜಾಗೃತಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಂಡ ಕಾರ್ಯಕ್ರಮಗಳು.',
      cta: 'ಕಾರ್ಯಕ್ರಮಗಳು ನೋಡಿ', ctaHref: '/events',
    },
  },
  {
    id: 'activities',
    image: '/assets/homepage/hero/activities-hero.png',
    en: {
      eyebrow: 'Community Service',
      title: 'Serve, Learn & Grow Together',
      sub: 'Engage in meaningful community activities that blend spiritual practice with heartfelt social service and seva.',
      subMobile: 'Meaningful community service and seva.',
      cta: 'Our Activities', ctaHref: '/activities',
    },
    hi: {
      eyebrow: 'सामुदायिक सेवा',
      title: 'सेवा, सीख और साथ मिलकर बढ़ें',
      sub: 'ऐसे सार्थक सामुदायिक गतिविधियों में भाग लें जो आध्यात्मिक अभ्यास को हार्दिक सामाजिक सेवा के साथ जोड़ती हैं।',
      subMobile: 'आध्यात्मिक अभ्यास के साथ सार्थक सामुदायिक सेवा।',
      cta: 'हमारी गतिविधियां', ctaHref: '/activities',
    },
    kn: {
      eyebrow: 'ಸಾಮುದಾಯಿಕ ಸೇವೆ',
      title: 'ಸೇವೆ, ಕಲಿಕೆ ಮತ್ತು ಒಟ್ಟಿಗೆ ಬೆಳೆಯಿರಿ',
      sub: 'ಆಧ್ಯಾತ್ಮಿಕ ಅಭ್ಯಾಸ ಮತ್ತು ಹೃದಯಪೂರ್ವಕ ಸಾಮಾಜಿಕ ಸೇವೆಯನ್ನು ಸಂಯೋಜಿಸುವ ಅರ್ಥಪೂರ್ಣ ಸಾಮುದಾಯಿಕ ಚಟುವಟಿಕೆಗಳಲ್ಲಿ ಭಾಗವಹಿಸಿ.',
      subMobile: 'ಆಧ್ಯಾತ್ಮಿಕ ಅಭ್ಯಾಸದೊಂದಿಗೆ ಅರ್ಥಪೂರ್ಣ ಸಾಮುದಾಯಿಕ ಸೇವೆ.',
      cta: 'ನಮ್ಮ ಚಟುವಟಿಕೆಗಳು', ctaHref: '/activities',
    },
  },
  {
    id: 'books',
    image: '/assets/homepage/hero/books-hero.png',
    en: {
      eyebrow: 'Wisdom & Knowledge',
      title: 'Enlighten Your Mind with Sacred Literature',
      sub: 'Explore a rich collection of Vedic literature, spiritual texts, and self-help books at our annual Book Fair events.',
      subMobile: 'Vedic literature and spiritual texts at our Book Fair.',
      cta: 'Visit Book Fair', ctaHref: '/activities/book-fair',
    },
    hi: {
      eyebrow: 'ज्ञान का भंडार',
      title: 'पवित्र साहित्य से मन को प्रकाशित करें',
      sub: 'हमारे वार्षिक पुस्तक मेले में वैदिक साहित्य, आध्यात्मिक ग्रंथों और स्व-सहायता पुस्तकों का समृद्ध संग्रह खोजें।',
      subMobile: 'हमारे पुस्तक मेले में वैदिक साहित्य और आध्यात्मिक ग्रंथ।',
      cta: 'पुस्तक मेला देखें', ctaHref: '/activities/book-fair',
    },
    kn: {
      eyebrow: 'ಜ್ಞಾನ ಭಂಡಾರ',
      title: 'ಪವಿತ್ರ ಸಾಹಿತ್ಯದಿಂದ ಮನಸ್ಸನ್ನು ಬೆಳಗಿಸಿ',
      sub: 'ನಮ್ಮ ವಾರ್ಷಿಕ ಪುಸ್ತಕ ಮೇಳ ಕಾರ್ಯಕ್ರಮಗಳಲ್ಲಿ ವೈದಿಕ ಸಾಹಿತ್ಯ, ಆಧ್ಯಾತ್ಮಿಕ ಗ್ರಂಥಗಳು ಮತ್ತು ಸ್ವ-ಸಹಾಯ ಪುಸ್ತಕಗಳ ಸಮೃದ್ಧ ಸಂಗ್ರಹ ಅನ್ವೇಷಿಸಿ.',
      subMobile: 'ನಮ್ಮ ಪುಸ್ತಕ ಮೇಳದಲ್ಲಿ ವೈದಿಕ ಸಾಹಿತ್ಯ ಮತ್ತು ಗ್ರಂಥಗಳು.',
      cta: 'ಪುಸ್ತಕ ಮೇಳ ಭೇಟಿ', ctaHref: '/activities/book-fair',
    },
  },
  {
    id: 'gau-seva',
    image: '/assets/homepage/hero/gau-seva-hero.png',
    en: {
      eyebrow: 'Sacred Service',
      title: 'Honour the Sacred Cow',
      sub: 'Participate in Gau Seva — a cherished tradition of compassionate care and service to the sacred cow, blessed by our ancestors.',
      subMobile: 'Compassionate care and service to the sacred cow.',
      cta: 'Gau Seva', ctaHref: '/activities/gau-seva',
    },
    hi: {
      eyebrow: 'पवित्र सेवा',
      title: 'गाय माता की सेवा करें',
      sub: 'गौ सेवा में भाग लें — हमारे पूर्वजों द्वारा आशीर्वादित, पवित्र गाय की करुणामय देखभाल और सेवा की एक पोषित परंपरा।',
      subMobile: 'पवित्र गाय की करुणामय देखभाल और सेवा।',
      cta: 'गौ सेवा', ctaHref: '/activities/gau-seva',
    },
    kn: {
      eyebrow: 'ಪವಿತ್ರ ಸೇವೆ',
      title: 'ಪವಿತ್ರ ಗೋವಿಗೆ ಗೌರವ ಅರ್ಪಿಸಿ',
      sub: 'ಗೌ ಸೇವಾದಲ್ಲಿ ಭಾಗವಹಿಸಿ — ನಮ್ಮ ಪೂರ್ವಜರಿಂದ ಆಶೀರ್ವದಿಸಲ್ಪಟ್ಟ, ಪವಿತ್ರ ಗೋವಿನ ಸೇವೆಯ ಒಂದು ಪ್ರಿಯ ಸಂಪ್ರದಾಯ.',
      subMobile: 'ಪವಿತ್ರ ಗೋವಿನ ಕರುಣಾಮಯ ಆರೈಕೆ ಮತ್ತು ಸೇವೆ.',
      cta: 'ಗೌ ಸೇವಾ', ctaHref: '/activities/gau-seva',
    },
  },
  {
    id: 'contact',
    image: '/assets/homepage/hero/gayatri-maa.png',
    imageMobile: '/assets/mobile_imgs/contact.png',
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

  const active = SLIDES[current];
  const d = active[locale] || active.en;

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
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
        <div key={current} className="hero__inner">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-mark" aria-hidden="true" />
            {d.eyebrow}
          </p>
          <h1 className="hero__title">{d.title}</h1>
          {d.sub && <p className="hero__sub hero__sub--full">{d.sub}</p>}
          {d.subMobile && <p className="hero__sub hero__sub--mob">{d.subMobile}</p>}
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

      {/* Dot navigation */}
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
