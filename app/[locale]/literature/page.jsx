import {
  BookOpen, Globe, ShoppingBag, PlayCircle, ArrowRight,
  Compass, TrendingUp, Lightbulb, HeartHandshake, Flame, Landmark,
  Users, Hammer, Wind, Atom, Baby, GraduationCap, Sparkles, HeartPulse, Music,
} from 'lucide-react';
import { Link } from '../../../lib/i18n/navigation';
import HeroSection from '../../../components/ui/HeroSection';
import './Literature.css';

const LIBRARY_URL = 'https://literature.awgp.org/';
const AKHAND_JYOTI_URL = 'https://literature.awgp.org/magazine/akhandjyoti';
const YOUTUBE_URL = 'https://www.youtube.com/awgp';
const STORE_BASE = 'https://www.awgpstore.com/category?id=';
const STORE_PRINT_URL = 'https://www.awgpstore.com/category?id=IG0069';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = {
    en: 'Literature — AWGP Bengaluru',
    hi: 'साहित्य — AWGP बेंगलूरु',
    kn: 'ಸಾಹಿತ್ಯ — AWGP ಬೆಂಗಳೂರು',
  };
  return { title: titles[locale] || titles.en };
}

export default async function LiteraturePage({ params }) {
  const { locale } = await params;
  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);

  const collections = [
    {
      Icon: Compass,
      href: `${STORE_BASE}IG0053`,
      title: L('Life Management', 'जीवन प्रबंधन', 'ಜೀವನ ನಿರ್ವಹಣೆ'),
      desc: L('Time, work and goals — wisdom for a purposeful life.', 'समय, कार्य और लक्ष्य — सार्थक जीवन का ज्ञान।', 'ಸಮಯ, ಕೆಲಸ ಮತ್ತು ಗುರಿ — ಉದ್ದೇಶಪೂರ್ಣ ಜೀವನದ ಜ್ಞಾನ.'),
    },
    {
      Icon: TrendingUp,
      href: `${STORE_BASE}IG0061`,
      title: L('Self-Help', 'स्वयं सहायता', 'ಸ್ವ-ಸಹಾಯ'),
      desc: L('Build better habits, confidence and inner strength.', 'बेहतर आदतें, आत्मविश्वास और आंतरिक शक्ति।', 'ಉತ್ತಮ ಅಭ್ಯಾಸ, ಆತ್ಮವಿಶ್ವಾಸ ಮತ್ತು ಆಂತರಿಕ ಶಕ್ತಿ.'),
    },
    {
      Icon: Lightbulb,
      href: `${STORE_BASE}IG0064`,
      title: L('Philosophy', 'दर्शन', 'ತತ್ವಶಾಸ್ತ್ರ'),
      desc: L('Timeless thought on life, truth and meaning.', 'जीवन, सत्य और अर्थ पर शाश्वत चिंतन।', 'ಜೀವನ, ಸತ್ಯ ಮತ್ತು ಅರ್ಥದ ಕುರಿತ ಶಾಶ್ವತ ಚಿಂತನೆ.'),
    },
    {
      Icon: HeartHandshake,
      href: `${STORE_BASE}IG0065`,
      title: L('Social Improvement', 'समाज सुधार', 'ಸಾಮಾಜಿಕ ಸುಧಾರಣೆ'),
      desc: L('Ideas to uplift society and reform the world.', 'समाज के उत्थान और विश्व सुधार के विचार।', 'ಸಮಾಜದ ಉನ್ನತಿ ಮತ್ತು ಜಗತ್ತಿನ ಸುಧಾರಣೆಯ ವಿಚಾರ.'),
    },
    {
      Icon: Flame,
      href: `${STORE_BASE}IG0068`,
      title: L('Gayatri Pariwar', 'गायत्री परिवार', 'ಗಾಯತ್ರಿ ಪರಿವಾರ'),
      desc: L('The mission, the Guru and the Pariwar movement.', 'मिशन, गुरुदेव और गायत्री परिवार का आंदोलन।', 'ಮಿಷನ್, ಗುರುದೇವ ಮತ್ತು ಗಾಯತ್ರಿ ಪರಿವಾರ ಆಂದೋಲನ.'),
    },
    {
      Icon: Landmark,
      href: `${STORE_BASE}IG0054`,
      title: L('Indian Culture', 'भारतीय संस्कृति', 'ಭಾರತೀಯ ಸಂಸ್ಕೃತಿ'),
      desc: L('Festivals, sanskars and the roots of our heritage.', 'पर्व, संस्कार और भारतीय संस्कृति की जड़ें।', 'ಹಬ್ಬ, ಸಂಸ್ಕಾರ ಮತ್ತು ಭಾರತೀಯ ಸಂಸ್ಕೃತಿಯ ಬೇರು.'),
    },
    {
      Icon: Users,
      href: `${STORE_BASE}IG0058`,
      title: L('Parenting & Relations', 'पालन-पोषण एवं संबंध', 'ಪೋಷಣೆ ಮತ್ತು ಸಂಬಂಧ'),
      desc: L('Nurturing children and harmonious relationships.', 'बच्चों का पालन-पोषण और मधुर रिश्ते।', 'ಮಕ್ಕಳ ಪೋಷಣೆ ಮತ್ತು ಸೌಹಾರ್ದ ಸಂಬಂಧಗಳು.'),
    },
    {
      Icon: Hammer,
      href: `${STORE_BASE}IG0066`,
      title: L('Constructing Era', 'युग निर्माण', 'ಯುಗ ನಿರ್ಮಾಣ'),
      desc: L('Yug Nirman — building a brighter new age.', 'युग निर्माण — उज्ज्वल नए युग का सृजन।', 'ಯುಗ ನಿರ್ಮಾಣ — ಉಜ್ವಲ ಹೊಸ ಯುಗದ ಸೃಷ್ಟಿ.'),
    },
    {
      Icon: Wind,
      href: `${STORE_BASE}IG0056`,
      title: L('Yoga & Pranayam', 'योग एवं प्राणायाम', 'ಯೋಗ ಮತ್ತು ಪ್ರಾಣಾಯಾಮ'),
      desc: L('Asanas, breathwork and the science of prana.', 'आसन, प्राणायाम और प्राण का विज्ञान।', 'ಆಸನ, ಪ್ರಾಣಾಯಾಮ ಮತ್ತು ಪ್ರಾಣದ ವಿಜ್ಞಾನ.'),
    },
    {
      Icon: Atom,
      href: `${STORE_BASE}IG0059`,
      title: L('Science & Spirituality', 'विज्ञान एवं अध्यात्म', 'ವಿಜ್ಞಾನ ಮತ್ತು ಆಧ್ಯಾತ್ಮ'),
      desc: L('Where modern science meets the inner world.', 'जहाँ आधुनिक विज्ञान आत्मज्ञान से मिलता है।', 'ಆಧುನಿಕ ವಿಜ್ಞಾನ ಆಂತರಿಕ ಜಗತ್ತನ್ನು ಸಂಧಿಸುವಲ್ಲಿ.'),
    },
    {
      Icon: Baby,
      href: `${STORE_BASE}IG0062`,
      title: L("Children's", 'बाल साहित्य', 'ಮಕ್ಕಳ ಸಾಹಿತ್ಯ'),
      desc: L('Stories and values for young, curious minds.', 'बच्चों के लिए कहानियाँ और संस्कार।', 'ಮಕ್ಕಳಿಗೆ ಕಥೆಗಳು ಮತ್ತು ಮೌಲ್ಯಗಳು.'),
    },
    {
      Icon: GraduationCap,
      href: `${STORE_BASE}IG0063`,
      title: L('Teen & Students', 'किशोर एवं विद्यार्थी', 'ಹದಿಹರೆಯ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿ'),
      desc: L('Study, character and motivation for students.', 'विद्यार्थियों के लिए अध्ययन, चरित्र और प्रेरणा।', 'ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಅಧ್ಯಯನ, ಚಾರಿತ್ರ್ಯ ಮತ್ತು ಪ್ರೇರಣೆ.'),
    },
    {
      Icon: Sparkles,
      href: `${STORE_BASE}IG0096`,
      title: L('Spirituality', 'अध्यात्म', 'ಆಧ್ಯಾತ್ಮ'),
      desc: L('Sadhana, meditation and the spiritual path.', 'साधना, ध्यान और आध्यात्मिक मार्ग।', 'ಸಾಧನೆ, ಧ್ಯಾನ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಮಾರ್ಗ.'),
    },
    {
      Icon: HeartPulse,
      href: `${STORE_BASE}IG0060`,
      title: L('Health & Fitness', 'स्वास्थ्य एवं फिटनेस', 'ಆರೋಗ್ಯ ಮತ್ತು ಫಿಟ್‌ನೆಸ್'),
      desc: L('Natural health, diet and a vibrant body.', 'प्राकृतिक स्वास्थ्य, आहार और स्वस्थ शरीर।', 'ನೈಸರ್ಗಿಕ ಆರೋಗ್ಯ, ಆಹಾರ ಮತ್ತು ಚೈತನ್ಯಶೀಲ ದೇಹ.'),
    },
    {
      Icon: Music,
      href: `${STORE_BASE}IG0067`,
      title: L('Bhajan Sangeet', 'भजन संगीत', 'ಭಜನ ಸಂಗೀತ'),
      desc: L('Devotional songs and sacred music.', 'भक्ति गीत और पवित्र संगीत।', 'ಭಕ್ತಿ ಗೀತೆ ಮತ್ತು ಪವಿತ್ರ ಸಂಗೀತ.'),
    },
  ];

  const access = [
    {
      Icon: Globe,
      href: LIBRARY_URL,
      title: L('Read Free Online', 'निःशुल्क ऑनलाइन पढ़ें', 'ಉಚಿತವಾಗಿ ಆನ್‌ಲೈನ್ ಓದಿ'),
      desc: L(
        'The entire collection is freely available on the AWGP digital library.',
        'संपूर्ण संग्रह AWGP डिजिटल पुस्तकालय पर निःशुल्क उपलब्ध है।',
        'ಸಂಪೂರ್ಣ ಸಂಗ್ರಹ AWGP ಡಿಜಿಟಲ್ ಗ್ರಂಥಾಲಯದಲ್ಲಿ ಉಚಿತವಾಗಿ ಲಭ್ಯ.',
      ),
    },
    {
      Icon: ShoppingBag,
      href: STORE_PRINT_URL,
      title: L('Order Print Editions', 'मुद्रित प्रति मंगाएं', 'ಮುದ್ರಿತ ಪ್ರತಿ ತರಿಸಿ'),
      desc: L(
        'Printed books and sets are available at a nominal cost from AWGP.',
        'मुद्रित पुस्तकें एवं सेट AWGP से नाममात्र मूल्य पर उपलब्ध हैं।',
        'ಮುದ್ರಿತ ಪುಸ್ತಕಗಳು ಮತ್ತು ಸೆಟ್‌ಗಳು AWGP ಯಿಂದ ನಾಮಮಾತ್ರ ಬೆಲೆಯಲ್ಲಿ ಲಭ್ಯ.',
      ),
    },
    {
      Icon: PlayCircle,
      href: YOUTUBE_URL,
      title: L('Listen & Watch', 'सुनें एवं देखें', 'ಕೇಳಿ ಮತ್ತು ನೋಡಿ'),
      desc: L(
        'Discourses, audiobooks and talks on the official AWGP channel.',
        'प्रवचन, ऑडियो-पुस्तकें और वार्ताएं आधिकारिक AWGP चैनल पर।',
        'ಪ್ರವಚನ, ಆಡಿಯೋ-ಪುಸ್ತಕ ಮತ್ತು ಮಾತುಕತೆ ಅಧಿಕೃತ AWGP ಚಾನೆಲ್‌ನಲ್ಲಿ.',
      ),
    },
  ];

  return (
    <>
      <HeroSection
        eyebrow="AWGP Bengaluru"
        title={L('Literature', 'साहित्य', 'ಸಾಹಿತ್ಯ')}
        subtitle={L(
          'The Living Wisdom of Yug Rishi Pandit Shriram Sharma Acharya',
          'युग ऋषि पं. श्रीराम शर्मा आचार्य का जीवंत ज्ञान',
          'ಯುಗ ಋಷಿ ಪಂ. ಶ್ರೀರಾಮ ಶರ್ಮಾ ಆಚಾರ್ಯರ ಜೀವಂತ ಜ್ಞಾನ',
        )}
        bgColor="linear-gradient(135deg, #2A1A0A 0%, #5C3D10 60%, #7A2315 100%)"
        mantra="॥ स्वाध्यायान्मा प्रमदः ॥"
      >
        <a href={LIBRARY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-white">
          {L('Browse the Library', 'पुस्तकालय देखें', 'ಗ್ರಂಥಾಲಯ ನೋಡಿ')}
        </a>
        <a href={AKHAND_JYOTI_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.55)', color: '#fff' }}>
          {L('Akhand Jyoti', 'अखण्ड ज्योति', 'ಅಖಂಡ ಜ್ಯೋತಿ')}
        </a>
      </HeroSection>

      {/* Intro — the literary legacy */}
      <section className="section lit-intro-section">
        <div className="section-inner">
          <div className="lit-intro">
            <h2 className="lit-intro__heading">
              {L('A Library for the Soul', 'आत्मा का पुस्तकालय', 'ಆತ್ಮದ ಗ್ರಂಥಾಲಯ')}
            </h2>
            <p className="lit-intro__text">
              {L(
                'Gurudev Pandit Shriram Sharma Acharya authored more than 3,000 books — together known as the Yug Sahitya, the literature of a new era. Distilled into the 108-volume Vangmaya (collected works), this body of writing translates the deepest truths of the Vedas, science and self-development into language any seeker can read and live by. It is not literature to merely be read, but to be practised.',
                'गुरुदेव पं. श्रीराम शर्मा आचार्य ने 3,000 से अधिक पुस्तकें रचीं — जिन्हें "युग साहित्य" कहा जाता है, अर्थात् नए युग का साहित्य। 108 खंडों के "वाङ्मय" में संकलित यह साहित्य वेदों, विज्ञान और आत्म-विकास के गूढ़ सत्यों को ऐसी भाषा में प्रस्तुत करता है जिसे हर साधक पढ़ और जी सके। यह केवल पढ़ने का नहीं, अपनाने का साहित्य है।',
                'ಗುರುದೇವ ಪಂ. ಶ್ರೀರಾಮ ಶರ್ಮಾ ಆಚಾರ್ಯರು 3,000ಕ್ಕೂ ಹೆಚ್ಚು ಪುಸ್ತಕಗಳನ್ನು ರಚಿಸಿದರು — ಇವನ್ನು "ಯುಗ ಸಾಹಿತ್ಯ" ಎಂದು ಕರೆಯಲಾಗುತ್ತದೆ. 108 ಸಂಪುಟಗಳ "ವಾಙ್ಮಯ"ದಲ್ಲಿ ಸಂಗ್ರಹಿಸಲ್ಪಟ್ಟ ಈ ಸಾಹಿತ್ಯವು ವೇದ, ವಿಜ್ಞಾನ ಮತ್ತು ಆತ್ಮ-ವಿಕಾಸದ ಆಳವಾದ ಸತ್ಯಗಳನ್ನು ಪ್ರತಿಯೊಬ್ಬ ಸಾಧಕನೂ ಓದಿ ಬದುಕಬಲ್ಲ ಭಾಷೆಗೆ ತರುತ್ತದೆ. ಇದು ಕೇವಲ ಓದುವ ಸಾಹಿತ್ಯವಲ್ಲ, ಅಳವಡಿಸಿಕೊಳ್ಳುವ ಸಾಹಿತ್ಯ.',
              )}
            </p>
            <div className="ornament" aria-hidden="true" />
          </div>

          <div className="lit-stats">
            {[
              { num: '3000+', label: L('Books by Gurudev', 'गुरुदेव की पुस्तकें', 'ಗುರುದೇವರ ಪುಸ್ತಕಗಳು') },
              { num: '108', label: L('Vangmaya Volumes', 'वाङ्मय खंड', 'ವಾಙ್ಮಯ ಸಂಪುಟ') },
              { num: '1940', label: L('Akhand Jyoti Since', 'अखण्ड ज्योति: तब से', 'ಅಖಂಡ ಜ್ಯೋತಿ ಇಂದ') },
              { num: '∞', label: L('Free to Read', 'पढ़ने हेतु निःशुल्क', 'ಓದಲು ಉಚಿತ') },
            ].map((s, i) => (
              <div key={i} className="lit-stat">
                <span className="lit-stat__num">{s.num}</span>
                <span className="lit-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured — Akhand Jyoti magazine */}
      <section className="section lit-magazine-section">
        <div className="section-inner">
          <div className="lit-magazine">
            <div className="lit-magazine__art" aria-hidden="true">
              <BookOpen size={64} strokeWidth={1.2} />
              <span className="lit-magazine__art-label">Akhand Jyoti</span>
            </div>
            <div className="lit-magazine__body">
              <span className="lit-magazine__eyebrow">
                {L('Featured · Monthly Magazine', 'विशेष · मासिक पत्रिका', 'ವಿಶೇಷ · ಮಾಸಿಕ ಪತ್ರಿಕೆ')}
              </span>
              <h2 className="lit-magazine__title">
                {L('Akhand Jyoti', 'अखण्ड ज्योति', 'ಅಖಂಡ ಜ್ಯೋತಿ')}
              </h2>
              <p className="lit-magazine__text">
                {L(
                  'Published continuously since 1940, Akhand Jyoti is the monthly magazine of thought transformation — timeless wisdom for a brighter, more meaningful life, delivered to your door in many languages.',
                  '1940 से निरंतर प्रकाशित, अखण्ड ज्योति विचार क्रांति की मासिक पत्रिका है — उज्ज्वल एवं सार्थक जीवन के लिए शाश्वत ज्ञान, अनेक भाषाओं में आपके द्वार तक।',
                  '1940ರಿಂದ ನಿರಂತರವಾಗಿ ಪ್ರಕಟವಾಗುತ್ತಿರುವ ಅಖಂಡ ಜ್ಯೋತಿ ವಿಚಾರ ಕ್ರಾಂತಿಯ ಮಾಸಿಕ ಪತ್ರಿಕೆ — ಉಜ್ವಲ, ಅರ್ಥಪೂರ್ಣ ಜೀವನಕ್ಕಾಗಿ ಶಾಶ್ವತ ಜ್ಞಾನ, ಹಲವು ಭಾಷೆಗಳಲ್ಲಿ ನಿಮ್ಮ ಮನೆ ಬಾಗಿಲಿಗೆ.',
                )}
              </p>
              <div className="lit-magazine__actions">
                <a href={AKHAND_JYOTI_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  {L('Read & Subscribe', 'पढ़ें एवं सदस्यता लें', 'ಓದಿ ಮತ್ತು ಚಂದಾದಾರರಾಗಿ')}
                  <ArrowRight size={16} aria-hidden="true" style={{ marginLeft: 6 }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections grid */}
      <section className="section lit-collections-section">
        <div className="section-inner">
          <div className="lit-section-head">
            <h2>{L('Explore by Theme', 'विषय अनुसार खोजें', 'ವಿಷಯದ ಪ್ರಕಾರ ಹುಡುಕಿ')}</h2>
            <p>
              {L(
                'Whatever question life brings, there is a book with an answer. Pick a category to browse it on the AWGP Store.',
                'जीवन का कोई भी प्रश्न हो, उसका उत्तर किसी न किसी पुस्तक में है। कोई श्रेणी चुनें और उसे AWGP स्टोर पर देखें।',
                'ಜೀವನದ ಯಾವ ಪ್ರಶ್ನೆಯಾದರೂ, ಉತ್ತರ ಒಂದು ಪುಸ್ತಕದಲ್ಲಿದೆ. ಒಂದು ವರ್ಗ ಆಯ್ಕೆಮಾಡಿ AWGP ಸ್ಟೋರ್‌ನಲ್ಲಿ ನೋಡಿ.',
              )}
            </p>
          </div>

          <div className="lit-grid">
            {collections.map(({ Icon, href, title, desc }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="lit-card"
              >
                <span className="lit-card__icon" aria-hidden="true">
                  <Icon size={26} strokeWidth={1.6} />
                </span>
                <h3 className="lit-card__title">{title}</h3>
                <p className="lit-card__desc">{desc}</p>
                <span className="lit-card__cta">
                  {L('Shop on AWGP Store →', 'AWGP स्टोर पर खरीदें →', 'AWGP ಸ್ಟೋರ್‌ನಲ್ಲಿ ಖರೀದಿಸಿ →')}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to access */}
      <section className="section lit-access-section">
        <div className="section-inner">
          <div className="lit-section-head">
            <h2>{L('How to Read', 'कैसे पढ़ें', 'ಹೇಗೆ ಓದುವುದು')}</h2>
          </div>
          <div className="lit-access-grid">
            {access.map(({ Icon, href, title, desc }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="lit-access-card">
                <span className="lit-access-card__icon" aria-hidden="true">
                  <Icon size={24} strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="lit-access-card__title">{title}</h3>
                  <p className="lit-access-card__desc">{desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="section lit-cta-section">
        <div className="section-inner">
          <div className="page-cta-strip">
            <div>
              <h3>{L('Begin Your Swadhyaya', 'अपना स्वाध्याय आरंभ करें', 'ನಿಮ್ಮ ಸ್ವಾಧ್ಯಾಯ ಆರಂಭಿಸಿ')}</h3>
              <p>
                {L(
                  'One page a day can change a life. Start reading today — or visit us for guidance.',
                  'प्रतिदिन एक पृष्ठ जीवन बदल सकता है। आज ही पढ़ना आरंभ करें — या मार्गदर्शन हेतु हमसे मिलें।',
                  'ದಿನಕ್ಕೊಂದು ಪುಟ ಜೀವನವನ್ನೇ ಬದಲಿಸಬಲ್ಲದು. ಇಂದೇ ಓದಲು ಆರಂಭಿಸಿ — ಅಥವಾ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ನಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡಿ.',
                )}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href={LIBRARY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-white">
                {L('Start Reading', 'पढ़ना आरंभ करें', 'ಓದಲು ಆರಂಭಿಸಿ')}
              </a>
              <Link
                href="/contact"
                className="btn btn-outline"
                style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
              >
                {L('Contact Us', 'संपर्क करें', 'ಸಂಪರ್ಕಿಸಿ')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
