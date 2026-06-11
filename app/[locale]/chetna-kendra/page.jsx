import Image from 'next/image';
import HeroSection from '../../../components/ui/HeroSection';
import SectionHeader from '../../../components/ui/SectionHeader';
import './ChetnaKendra.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = {
    en: 'Chetna Kendra — AWGP Bengaluru',
    hi: 'चेतना केंद्र — AWGP बेंगलूरु',
    kn: 'ಚೇತನ ಕೇಂದ್ರ — AWGP ಬೆಂಗಳೂರು',
  };
  return { title: titles[locale] || titles.en };
}

const FACILITIES = [
  {
    img: '/assets/chetna-kendra/mandir.png',
    en: {
      name: 'Gayatri Mata Mandir',
      desc: 'The heart of the Chetna Kendra is the beautiful Gayatri Mata Mandir — a sacred space for daily prayers, Gayatri Havan, and personal Sadhana. Devotees find peace and inner clarity through regular worship at this serene temple.',
    },
    hi: {
      name: 'गायत्री माता मंदिर',
      desc: 'चेतना केंद्र का हृदय सुंदर गायत्री माता मंदिर है — दैनिक प्रार्थना, गायत्री हवन और व्यक्तिगत साधना के लिए एक पवित्र स्थान। भक्त इस शांत मंदिर में नियमित पूजा के माध्यम से शांति और आंतरिक स्पष्टता पाते हैं।',
    },
    kn: {
      name: 'ಗಾಯತ್ರಿ ಮಾತಾ ಮಂದಿರ',
      desc: 'ಚೇತನ ಕೇಂದ್ರದ ಹೃದಯ ಸುಂದರ ಗಾಯತ್ರಿ ಮಾತಾ ಮಂದಿರ — ದೈನಂದಿನ ಪ್ರಾರ್ಥನೆ, ಗಾಯತ್ರಿ ಹವನ ಮತ್ತು ವೈಯಕ್ತಿಕ ಸಾಧನೆಗಾಗಿ ಒಂದು ಪವಿತ್ರ ಸ್ಥಳ.',
    },
  },
  {
    img: '/assets/chetna-kendra/library.png',
    en: {
      name: 'Brahmavarchas Granthalaya (Library)',
      desc: "Our well-stocked library houses thousands of books on Vedic philosophy, scientific spirituality, health, and self-development — all authored or published under Gurudev's guidance. It is a treasure trove for seekers of knowledge and wisdom.",
    },
    hi: {
      name: 'ब्रह्मवर्चस ग्रंथालय (पुस्तकालय)',
      desc: 'हमारे सुसज्जित पुस्तकालय में वैदिक दर्शन, वैज्ञानिक अध्यात्म, स्वास्थ्य और आत्म-विकास पर हजारों पुस्तकें हैं — सभी गुरुदेव के मार्गदर्शन में लिखी या प्रकाशित। यह ज्ञान और विवेक के साधकों के लिए एक खजाना है।',
    },
    kn: {
      name: 'ಬ್ರಹ್ಮವರ್ಚಸ್ ಗ್ರಂಥಾಲಯ (ಪುಸ್ತಕಾಲಯ)',
      desc: 'ನಮ್ಮ ಸುಸಜ್ಜಿತ ಪುಸ್ತಕಾಲಯದಲ್ಲಿ ವೈದಿಕ ತತ್ವಶಾಸ್ತ್ರ, ವೈಜ್ಞಾನಿಕ ಆಧ್ಯಾತ್ಮ, ಆರೋಗ್ಯ ಮತ್ತು ಸ್ವ-ಅಭಿವೃದ್ಧಿಯ ಸಾವಿರಾರು ಪುಸ್ತಕಗಳಿವೆ.',
    },
  },
  {
    img: '/assets/chetna-kendra/yagya-shala.png',
    en: {
      name: 'Yagya Shala',
      desc: 'The Yagya Shala is dedicated to the ancient Vedic fire ritual — Yagya or Havan — which purifies the environment, the mind, and the soul. Regular Gayatri Havans, Sahasra Kundiya Yagyas, and Navgraha Pujas are conducted here for the welfare of all.',
    },
    hi: {
      name: 'यज्ञ शाला',
      desc: 'यज्ञ शाला प्राचीन वैदिक अग्नि अनुष्ठान — यज्ञ या हवन — के लिए समर्पित है जो पर्यावरण, मन और आत्मा को शुद्ध करता है। सभी के कल्याण के लिए यहां नियमित गायत्री हवन, सहस्र कुंडीय यज्ञ और नवग्रह पूजा होती है।',
    },
    kn: {
      name: 'ಯಜ್ಞ ಶಾಲೆ',
      desc: 'ಯಜ್ಞ ಶಾಲೆ ಪ್ರಾಚೀನ ವೈದಿಕ ಅಗ್ನಿ ಆಚರಣೆ — ಯಜ್ಞ ಅಥವಾ ಹವನ — ಕ್ಕೆ ಮೀಸಲಾಗಿದೆ. ಇದು ಪರಿಸರ, ಮನಸ್ಸು ಮತ್ತು ಆತ್ಮವನ್ನು ಶುದ್ಧಗೊಳಿಸುತ್ತದೆ.',
    },
  },
  {
    img: '/assets/chetna-kendra/meditation_room.JPG',
    en: {
      name: 'Meditation & Sadhana Hall',
      desc: 'A calm and serene hall dedicated to meditation, Pranayama, and Gayatri Sadhana. Regular guided meditation sessions, Tratak, and group Sadhana are held here. This peaceful space helps practitioners develop concentration, inner stillness, and spiritual awareness.',
    },
    hi: {
      name: 'ध्यान एवं साधना कक्ष',
      desc: 'ध्यान, प्राणायाम और गायत्री साधना के लिए समर्पित एक शांत हॉल। यहां नियमित निर्देशित ध्यान सत्र, त्राटक और समूह साधना होती है। यह शांतिपूर्ण स्थान साधकों को एकाग्रता और आंतरिक शांति विकसित करने में मदद करता है।',
    },
    kn: {
      name: 'ಧ್ಯಾನ ಮತ್ತು ಸಾಧನಾ ಕೊಠಡಿ',
      desc: 'ಧ್ಯಾನ, ಪ್ರಾಣಾಯಾಮ ಮತ್ತು ಗಾಯತ್ರಿ ಸಾಧನೆಗೆ ಮೀಸಲಾದ ಶಾಂತ ಮತ್ತು ನಿರ್ಮಲ ಕೊಠಡಿ. ನಿಯಮಿತ ಮಾರ್ಗದರ್ಶಿ ಧ್ಯಾನ ಸತ್ರಗಳು ಮತ್ತು ಗುಂಪು ಸಾಧನೆ ಇಲ್ಲಿ ನಡೆಯುತ್ತವೆ.',
    },
  },
  {
    img: '/assets/chetna-kendra/gaushala.JPG',
    en: {
      name: 'Gaushala (Cow Shelter)',
      desc: 'In the Vedic tradition, the cow is revered as a symbol of abundance and purity. Our Gaushala shelters and cares for cows, and serves as a living demonstration of Gau Seva — one of AWGP\'s key initiatives for social upliftment and ecological balance.',
    },
    hi: {
      name: 'गौशाला',
      desc: 'वैदिक परंपरा में गाय को समृद्धि और पवित्रता के प्रतीक के रूप में पूजा जाता है। हमारी गौशाला गायों को आश्रय देती है और उनकी देखभाल करती है, और गौ सेवा का जीवंत प्रदर्शन करती है।',
    },
    kn: {
      name: 'ಗೋಶಾಲೆ',
      desc: 'ವೈದಿಕ ಸಂಪ್ರದಾಯದಲ್ಲಿ ಹಸು ಸಮೃದ್ಧಿ ಮತ್ತು ಪವಿತ್ರತೆಯ ಸಂಕೇತವಾಗಿ ಪೂಜಿಸಲ್ಪಡುತ್ತದೆ. ನಮ್ಮ ಗೋಶಾಲೆ ಹಸುಗಳಿಗೆ ಆಶ್ರಯ ನೀಡುತ್ತದೆ ಮತ್ತು ಗೋ ಸೇವೆಯ ಜೀವಂತ ಪ್ರದರ್ಶನ ಆಗಿದೆ.',
    },
  },
  {
    img: '/assets/chetna-kendra/bhatka-hua-devta.png',
    en: {
      name: 'Spiritual Art — Bhatka Hua Devta',
      desc: 'The centre features unique spiritual artwork inspired by Gurudev\'s philosophy, including the iconic "Bhatka Hua Devta" — depicting the soul\'s journey from delusion toward divine awakening. These artworks serve as contemplative tools that inspire seekers toward the path of self-realisation.',
    },
    hi: {
      name: 'आध्यात्मिक कला — भटका हुआ देवता',
      desc: 'केंद्र में गुरुदेव के दर्शन से प्रेरित अनूठी आध्यात्मिक कलाकृतियां हैं, जिनमें "भटका हुआ देवता" भी शामिल है — जो आत्मा की भ्रम से दिव्य जागृति की ओर यात्रा को दर्शाता है।',
    },
    kn: {
      name: 'ಆಧ್ಯಾತ್ಮಿಕ ಕಲೆ — ಭಟಕಾ ಹುಆ ದೇವತಾ',
      desc: 'ಕೇಂದ್ರದಲ್ಲಿ ಗುರುದೇವರ ತತ್ವಶಾಸ್ತ್ರದಿಂದ ಪ್ರೇರಿತ ಅನನ್ಯ ಆಧ್ಯಾತ್ಮಿಕ ಕಲಾಕೃತಿಗಳಿವೆ, ಇದರಲ್ಲಿ "ಭಟಕಾ ಹುಆ ದೇವತಾ" ಸೇರಿದೆ — ಇದು ಆತ್ಮದ ಭ್ರಮೆಯಿಂದ ದಿವ್ಯ ಜಾಗೃತಿಯೆಡೆಗಿನ ಪ್ರಯಾಣವನ್ನು ಚಿತ್ರಿಸುತ್ತದೆ.',
    },
  },
];

const DAILY = [
  { time: '05:30 – 05:45 AM',    en: 'Morning Aarti (Puja)',     hi: 'प्रातः आरती (पूजा)',           kn: 'ಬೆಳಗಿನ ಆರತಿ (ಪೂಜೆ)' },
  { time: '05:45 – 06:30 AM',    en: 'Morning Meditation',       hi: 'प्रातः ध्यान',                kn: 'ಬೆಳಗಿನ ಧ್ಯಾನ' },
  { time: '06:30 – 07:15 AM',    en: 'Daily Yagya (Homa)',       hi: 'दैनिक यज्ञ (हवन)',             kn: 'ದೈನಂದಿನ ಯಜ್ಞ (ಹೋಮ)' },
  { time: '11:00 AM – 12:00 PM', en: 'Yog Training (For Women)', hi: 'योग प्रशिक्षण (महिलाओं हेतु)',  kn: 'ಯೋಗ ತರಬೇತಿ (ಮಹಿಳೆಯರಿಗೆ)' },
  { time: '05:30 – 06:00 PM',    en: 'Evening Aarti (Puja)',     hi: 'सायं आरती (पूजा)',             kn: 'ಸಂಜೆ ಆರತಿ (ಪೂಜೆ)' },
  { time: '06:00 – 06:20 PM',    en: 'Naadyog Sadhana',          hi: 'नादयोग साधना',                kn: 'ನಾದಯೋಗ ಸಾಧನೆ' },
];

const SUNDAY = [
  { time: '09:00 – 11:00 AM',    en: 'All Vedic Sanskar',  hi: 'समस्त वैदिक संस्कार', kn: 'ಎಲ್ಲಾ ವೈದಿಕ ಸಂಸ್ಕಾರ' },
  { time: '09:00 – 10:00 AM',    en: 'Morning Meditation', hi: 'प्रातः ध्यान',        kn: 'ಬೆಳಗಿನ ಧ್ಯಾನ' },
  { time: '09:00 – 11:30 AM',    en: 'Yagya (Homa)',       hi: 'यज्ञ (हवन)',          kn: 'ಯಜ್ಞ (ಹೋಮ)' },
  { time: '11:30 AM – 12:30 PM', en: 'Workshops',          hi: 'कार्यशालाएँ',          kn: 'ಕಾರ್ಯಾಗಾರಗಳು' },
  { time: '12:00 – 01:30 PM',    en: 'Maha-prasadam',      hi: 'महाप्रसादम्',          kn: 'ಮಹಾಪ್ರಸಾದಂ' },
];

export default async function ChetnaKendraPage({ params }) {
  const { locale } = await params;
  const L = (en, hi, kn) => locale === 'hi' ? hi : locale === 'kn' ? kn : en;
  const t = (item) => item[locale] || item.en;

  return (
    <>
      <HeroSection
        eyebrow="AWGP Bengaluru"
        title={L('Gayatri Chetna Kendra', 'गायत्री चेतना केंद्र', 'ಗಾಯತ್ರಿ ಚೇತನ ಕೇಂದ್ರ')}
        subtitle={L(
          'A Sacred Space for Spiritual Awakening in the Heart of Bengaluru',
          'बेंगलूरु के हृदय में आध्यात्मिक जागृति का पवित्र स्थान',
          'ಬೆಂಗಳೂರಿನ ಕೇಂದ್ರದಲ್ಲಿ ಆಧ್ಯಾತ್ಮಿಕ ಜಾಗೃತಿಯ ಪವಿತ್ರ ಸ್ಥಳ'
        )}
        bgImage="/assets/chetna-kendra/building.png"
        mantra="॥ गायत्री माता की जय ॥"
      />

      {/* Inauguration Section */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="section-inner">
          <SectionHeader
            eyebrow={L('Inauguration', 'उद्घाटन', 'ಉದ್ಘಾಟನೆ')}
            title={L('Inaugurated by Shraddhey  Dr. Pranav Pandya', 'श्रद्धेय डॉ. प्रणव पंड्या द्वारा उद्घाटित', 'ಶ್ರದ್ಧೇಯ ಡಾ. ಪ್ರಣವ ಪಾಂಡ್ಯ ಅವರಿಂದ ಉದ್ಘಾಟಿಸಲ್ಪಟ್ಟಿದೆ')}
            ornament="🪔"
          />
          <div className="inauguration-grid">
            <div className="inauguration-img-wrap">
              <Image
                src="/assets/chetna-kendra/inauguration.jpg"
                alt="Inauguration"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                sizes="(max-width:860px) 100vw, 50vw"
              />
            </div>
            <div className="inauguration-content">
              <p className="inauguration-lead">
                {L(
                  'The Gayatri Chetna Kendra, Bengaluru was inaugurated by Shraddhey  Dr. Pranav Pandya — Chancellor of Dev Sanskriti Vishwavidyalaya and Head of All World Gayatri Pariwar — in a magnificent ceremony attended by thousands of devotees and Parijans.',
                  'गायत्री चेतना केंद्र, बेंगलूरु का उद्घाटन श्रद्धेय डॉ. प्रणव पंड्या — देव संस्कृति विश्वविद्यालय के कुलाधिपति और अखिल विश्व गायत्री परिवार के प्रमुख — द्वारा हजारों भक्तों और परिजनों की उपस्थिति में भव्य समारोह में किया गया।',
                  'ಗಾಯತ್ರಿ ಚೇತನ ಕೇಂದ್ರ, ಬೆಂಗಳೂರು ಅನ್ನು ಶ್ರದ್ಧೇಯ ಡಾ. ಪ್ರಣವ ಪಾಂಡ್ಯ — ದೇವ ಸಂಸ್ಕೃತಿ ವಿಶ್ವವಿದ್ಯಾಲಯದ ಕುಲಾಧಿಪತಿ ಮತ್ತು ಅಖಿಲ ವಿಶ್ವ ಗಾಯತ್ರಿ ಪರಿವಾರದ ಮುಖ್ಯಸ್ಥ — ಅವರಿಂದ ಸಾವಿರಾರು ಭಕ್ತರ ಉಪಸ್ಥಿತಿಯಲ್ಲಿ ಉದ್ಘಾಟಿಸಲ್ಪಟ್ಟಿತು.'
                )}
              </p>
              <p>
                {L(
                  'The inauguration was a momentous occasion marking the establishment of a permanent centre of Gayatri consciousness in Karnataka — a hub for spiritual education, Sadhana, and community service for seekers across South India.',
                  'उद्घाटन कर्नाटक में गायत्री चेतना के एक स्थायी केंद्र की स्थापना को चिह्नित करने वाला एक ऐतिहासिक अवसर था — दक्षिण भारत के साधकों के लिए आध्यात्मिक शिक्षा, साधना और सामुदायिक सेवा का केंद्र।',
                  'ಉದ್ಘಾಟನೆ ಕರ್ನಾಟಕದಲ್ಲಿ ಗಾಯತ್ರಿ ಪ್ರಜ್ಞೆಯ ಶಾಶ್ವತ ಕೇಂದ್ರ ಸ್ಥಾಪಿಸಿದ ಒಂದು ಐತಿಹಾಸಿಕ ಸಂದರ್ಭ — ದಕ್ಷಿಣ ಭಾರತದ ಸಾಧಕರಿಗೆ ಆಧ್ಯಾತ್ಮಿಕ ಶಿಕ್ಷಣ, ಸಾಧನೆ ಮತ್ತು ಸಮುದಾಯ ಸೇವೆಯ ಕೇಂದ್ರ.'
                )}
              </p>
              <div className="inauguration-quote">
                <p>{L(
                  '"This centre is not just a building — it is a temple of consciousness, a living flame of the Gayatri tradition that will guide and uplift generations to come."',
                  '"यह केंद्र केवल एक इमारत नहीं है — यह चेतना का मंदिर है, गायत्री परंपरा की एक जीवंत लौ जो आने वाली पीढ़ियों का मार्गदर्शन करेगी।"',
                  '"ಈ ಕೇಂದ್ರ ಕೇವಲ ಒಂದು ಕಟ್ಟಡ ಮಾತ್ರವಲ್ಲ — ಇದು ಪ್ರಜ್ಞೆಯ ದೇವಾಲಯ, ಗಾಯತ್ರಿ ಸಂಪ್ರದಾಯದ ಜೀವಂತ ಜ್ಯೋತಿ."'
                )}</p>
                <span className="inauguration-quote-by">— {L('Shraddhey  Dr. Pranav Pandya', 'श्रद्धेय डॉ. प्रणव पंड्या', 'ಶ್ರದ್ಧೇಯ ಡಾ. ಪ್ರಣವ ಪಾಂಡ್ಯ')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Building & Location */}
      <section className="section" style={{ background: 'var(--cream-dark)' }}>
        <div className="section-inner">
          <SectionHeader
            eyebrow={L('The Centre', 'केंद्र परिसर', 'ಕೇಂದ್ರ ಆವರಣ')}
            title={L('About the Chetna Kendra', 'चेतना केंद्र के बारे में', 'ಚೇತನ ಕೇಂದ್ರದ ಬಗ್ಗೆ')}
            ornament="🏛️"
          />
          <div className="ck-about-grid">
            <div className="ck-about-img-wrap">
              <Image
                src="/assets/chetna-kendra/gayatri-mata-mandir.png"
                alt="Gayatri Chetna Kendra Building"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width:860px) 100vw, 50vw"
              />
            </div>
            <div className="ck-about-content">
              <p>
                {L(
                  'The Gayatri Chetna Kendra (Gayatri Consciousness Centre) is AWGP Bengaluru\'s flagship spiritual campus — a multi-facility centre designed to serve as a complete environment for inner growth, Vedic learning, and community upliftment.',
                  'गायत्री चेतना केंद्र AWGP बेंगलूरु का प्रमुख आध्यात्मिक परिसर है — आंतरिक विकास, वैदिक अध्ययन और सामुदायिक उत्थान के लिए एक पूर्ण वातावरण के रूप में डिज़ाइन की गई बहु-सुविधा केंद्र।',
                  'ಗಾಯತ್ರಿ ಚೇತನ ಕೇಂದ್ರ AWGP ಬೆಂಗಳೂರಿನ ಪ್ರಮುಖ ಆಧ್ಯಾತ್ಮಿಕ ಆವರಣ — ಆಂತರಿಕ ಬೆಳವಣಿಗೆ, ವೈದಿಕ ಕಲಿಕೆ ಮತ್ತು ಸಮುದಾಯ ಉನ್ನತಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಬಹು-ಸೌಲಭ್ಯ ಕೇಂದ್ರ.'
                )}
              </p>
              <p>
                {L(
                  'Spread across a purpose-built campus in Bengaluru, Karnataka, the centre houses a Gayatri Mata Mandir, Yagya Shala, Meditation Hall, Brahmavarchas Library, Gaushala, and spiritual art installations — making it a complete destination for all aspects of Vedic living.',
                  'बेंगलूरु, कर्नाटक में एक विशेष रूप से निर्मित परिसर में फैला यह केंद्र गायत्री माता मंदिर, यज्ञ शाला, ध्यान कक्ष, ब्रह्मवर्चस पुस्तकालय, गौशाला और आध्यात्मिक कला प्रतिष्ठानों का घर है।',
                  'ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕದಲ್ಲಿ ನಿರ್ದಿಷ್ಟ ಉದ್ದೇಶದಿಂದ ನಿರ್ಮಿಸಲಾದ ಆವರಣದಲ್ಲಿ ಹರಡಿರುವ ಕೇಂದ್ರದಲ್ಲಿ ಗಾಯತ್ರಿ ಮಾತಾ ಮಂದಿರ, ಯಜ್ಞ ಶಾಲೆ, ಧ್ಯಾನ ಕೊಠಡಿ, ಗ್ರಂಥಾಲಯ, ಗೋಶಾಲೆ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಕಲಾ ಸ್ಥಾಪನೆಗಳಿವೆ.'
                )}
              </p>
              <div className="ck-highlights">
                {[
                  { icon: '🛕', text: L('Gayatri Mata Mandir', 'गायत्री माता मंदिर', 'ಗಾಯತ್ರಿ ಮಾತಾ ಮಂದಿರ') },
                  { icon: '🔥', text: L('Yagya Shala', 'यज्ञ शाला', 'ಯಜ್ಞ ಶಾಲೆ') },
                  { icon: '🧘', text: L('Meditation Hall', 'ध्यान कक्ष', 'ಧ್ಯಾನ ಕೊಠಡಿ') },
                  { icon: '📚', text: L('Brahmavarchas Library', 'ब्रह्मवर्चस ग्रंथालय', 'ಬ್ರಹ್ಮವರ್ಚಸ್ ಗ್ರಂಥಾಲಯ') },
                  { icon: '🐄', text: L('Gaushala', 'गौशाला', 'ಗೋಶಾಲೆ') },
                  { icon: '🖼️', text: L('Spiritual Art Gallery', 'आध्यात्मिक कला दीर्घा', 'ಆಧ್ಯಾತ್ಮಿಕ ಕಲಾ ಗ್ಯಾಲರಿ') },
                ].map((h, i) => (
                  <div key={i} className="ck-highlight-chip">
                    <span>{h.icon}</span>
                    <span>{h.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Reach */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="section-inner">
          <SectionHeader
            eyebrow={L('Location & Directions', 'स्थान और दिशानिर्देश', 'ಸ್ಥಳ ಮತ್ತು ದಿಕ್ಕುಗಳು')}
            title={L('How to Reach Us', 'हम तक कैसे पहुंचें', 'ನಮ್ಮನ್ನು ಹೇಗೆ ತಲುಪುವುದು')}
            ornament="📍"
          />
          <div className="ck-reach-grid">
            <div className="ck-reach-card">
              <span className="ck-reach-icon">🚇</span>
              <h3>{L('By Metro', 'मेट्रो से', 'ಮೆಟ್ರೋ ಮೂಲಕ')}</h3>
              <p>{L(
                'Take the Namma Metro to the nearest station and our centre is accessible within a short auto or cab ride. Contact us for the nearest metro stop from your location.',
                'नम्मा मेट्रो से निकटतम स्टेशन तक आएं और हमारा केंद्र ऑटो या कैब से पहुंचा जा सकता है।',
                'ನಮ್ಮ ಮೆಟ್ರೋ ಮೂಲಕ ಹತ್ತಿರದ ನಿಲ್ದಾಣಕ್ಕೆ ಬನ್ನಿ, ನಂತರ ಆಟೋ ಅಥವಾ ಕ್ಯಾಬ್ ಮೂಲಕ ಕೇಂದ್ರ ತಲುಪಬಹುದು.'
              )}</p>
            </div>
            <div className="ck-reach-card">
              <span className="ck-reach-icon">🚌</span>
              <h3>{L('By Bus', 'बस से', 'ಬಸ್ ಮೂಲಕ')}</h3>
              <p>{L(
                'BMTC buses connect to all parts of Bengaluru. Please contact us or check our address on Google Maps for the nearest bus stop routes.',
                'BMTC बसें बेंगलूरु के सभी हिस्सों से जुड़ती हैं। निकटतम बस स्टॉप के लिए कृपया हमसे संपर्क करें।',
                'BMTC ಬಸ್‌ಗಳು ಬೆಂಗಳೂರಿನ ಎಲ್ಲ ಭಾಗಗಳಿಗೆ ಸಂಪರ್ಕ ಕಲ್ಪಿಸುತ್ತವೆ. ಹತ್ತಿರದ ಬಸ್ ನಿಲ್ದಾಣಕ್ಕೆ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.'
              )}</p>
            </div>
            <div className="ck-reach-card">
              <span className="ck-reach-icon">🚗</span>
              <h3>{L('By Car / Auto', 'कार / ऑटो से', 'ಕಾರ್ / ಆಟೋ ಮೂಲಕ')}</h3>
              <p>{L(
                'Parking is available at the centre. Search "AWGP Bengaluru Gayatri Chetna Kendra" on Google Maps for directions, or call us for a precise address and landmark guidance.',
                'केंद्र में पार्किंग उपलब्ध है। दिशानिर्देशों के लिए Google Maps पर "AWGP Bengaluru Gayatri Chetna Kendra" खोजें।',
                'ಕೇಂದ್ರದಲ್ಲಿ ಪಾರ್ಕಿಂಗ್ ಲಭ್ಯವಿದೆ. ದಿಕ್ಕುಗಳಿಗೆ Google Maps ನಲ್ಲಿ "AWGP Bengaluru Gayatri Chetna Kendra" ಹುಡುಕಿ.'
              )}</p>
            </div>
            <div className="ck-reach-card">
              <span className="ck-reach-icon">📞</span>
              <h3>{L('Contact & Timings', 'संपर्क और समय', 'ಸಂಪರ್ಕ ಮತ್ತು ಸಮಯ')}</h3>
              <p>{L(
                'The centre is open daily. Visit us during morning Aarti (6:00 AM), Yagya sessions, meditation classes, and evening Satsang. Contact us for appointment and directions.',
                'केंद्र प्रतिदिन खुला रहता है। प्रातःकाल आरती (6:00 AM), यज्ञ, ध्यान कक्षाओं और सायं सत्संग के दौरान हमारे पास आएं।',
                'ಕೇಂದ್ರ ಪ್ರತಿದಿನ ತೆರೆದಿರುತ್ತದೆ. ಬೆಳಿಗ್ಗೆ ಆರತಿ (6:00 AM), ಯಜ್ಞ, ಧ್ಯಾನ ತರಗತಿ ಮತ್ತು ಸಾಯಂಕಾಲ ಸತ್ಸಂಗ ಸಮಯದಲ್ಲಿ ಭೇಟಿ ನೀಡಿ.'
              )}</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href="/contact" className="btn btn-primary">
              {L('Get Directions & Contact →', 'दिशानिर्देश और संपर्क →', 'ದಿಕ್ಕುಗಳು ಮತ್ತು ಸಂಪರ್ಕ →')}
            </a>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section" style={{ background: 'var(--cream-dark)' }}>
        <div className="section-inner">
          <SectionHeader
            eyebrow={L('What We Offer', 'हम क्या प्रदान करते हैं', 'ನಾವು ಏನು ನೀಡುತ್ತೇವೆ')}
            title={L('Facilities at Chetna Kendra', 'चेतना केंद्र की सुविधाएं', 'ಚೇತನ ಕೇಂದ್ರದ ಸೌಲಭ್ಯಗಳು')}
            ornament="🏛️"
          />
          <div className="ck-facilities-grid">
            {FACILITIES.map((facility) => {
              const data = t(facility);
              return (
                <div key={data.name} className="ck-facility-card">
                  <div className="ck-facility-img-wrap">
                    <Image
                      src={facility.img}
                      alt={data.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width:640px) 90vw, (max-width:1000px) 45vw, 30vw"
                    />
                    <div className="ck-facility-overlay" />
                    <h3 className="ck-facility-img-title">{data.name}</h3>
                  </div>
                  <div className="ck-facility-body">
                    <p>{data.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Daily & Sunday Schedule */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="section-inner">
          <SectionHeader
            eyebrow={L('Timings', 'समय', 'ಸಮಯ')}
            title={L('Daily Schedule', 'दैनिक कार्यक्रम', 'ದೈನಂದಿನ ವೇಳಾಪಟ್ಟಿ')}
            ornament="🕉️"
          />
          <div className="ck-schedule-grid">
            <div className="ck-sched-box">
              <h3 className="ck-sched-box__title">
                {L('Daily Activities (Mon–Sat)', 'दैनिक गतिविधियाँ (सोम–शनि)', 'ದೈನಂದಿನ ಚಟುವಟಿಕೆಗಳು (ಸೋಮ–ಶನಿ)')}
              </h3>
              <ul className="ck-sched-list">
                {DAILY.map((it, i) => (
                  <li key={i} className="ck-sched-row">
                    <span className="ck-sched-act">{t(it)}</span>
                    <span className="ck-sched-time">{it.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ck-sched-box ck-sched-box--sunday">
              <h3 className="ck-sched-box__title">
                {L('Sunday Activities', 'रविवार की गतिविधियाँ', 'ಭಾನುವಾರದ ಚಟುವಟಿಕೆಗಳು')}
              </h3>
              <ul className="ck-sched-list">
                {SUNDAY.map((it, i) => (
                  <li key={i} className="ck-sched-row">
                    <span className="ck-sched-act">{t(it)}</span>
                    <span className="ck-sched-time">{it.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--maroon) 0%, var(--brown-dk) 100%)' }}>
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--white)', marginBottom: '0.75rem' }}>
            {L('Visit the Chetna Kendra', 'चेतना केंद्र आएं', 'ಚೇತನ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ')}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.82)', maxWidth: 580, margin: '0 auto 2rem', lineHeight: 1.8 }}>
            {L(
              'Whether you seek peace, knowledge, or community — the Chetna Kendra welcomes you with open arms. All are welcome, regardless of caste, creed, or background.',
              'चाहे आप शांति, ज्ञान या समुदाय की तलाश करें — चेतना केंद्र आपका खुले दिल से स्वागत करता है। जाति, पंथ या पृष्ठभूमि के बावजूद सभी का स्वागत है।',
              'ನೀವು ಶಾಂತಿ, ಜ್ಞಾನ ಅಥವಾ ಸಮುದಾಯ ಹುಡುಕುತ್ತಿದ್ದರೂ — ಚೇತನ ಕೇಂದ್ರ ತೆರೆದ ತೋಳುಗಳಿಂದ ಸ್ವಾಗತಿಸುತ್ತದೆ. ಎಲ್ಲರೂ ಸ್ವಾಗತಾರ್ಹ.'
            )}
          </p>
          <a href="/contact" className="btn btn-white">
            {L('Plan Your Visit →', 'अपनी यात्रा योजना बनाएं →', 'ನಿಮ್ಮ ಭೇಟಿ ಯೋಜಿಸಿ →')}
          </a>
        </div>
      </section>
    </>
  );
}
