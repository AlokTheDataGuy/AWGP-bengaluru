import Image from 'next/image';
import HeroSection from '../../../components/ui/HeroSection';
import SectionHeader from '../../../components/ui/SectionHeader';
import './Initiatives.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = {
    en: 'Our Initiatives — AWGP Bengaluru',
    hi: 'हमारी पहल — AWGP बेंगलूरु',
    kn: 'ನಮ್ಮ ಉಪಕ್ರಮಗಳು — AWGP ಬೆಂಗಳೂರು',
  };
  return { title: titles[locale] || titles.en };
}

const SAPT_ANDOLAN = [
  {
    key: 'vichar',
    img: '/assets/misc/vichar.jpg',
    en: {
      name: 'Vichar Kranti Abhiyan',
      subtitle: 'Thought Revolution Campaign',
      desc: 'Founded by Gurudev Pt. Shriram Sharma Acharya, this campaign aims to transform individual and collective consciousness through the power of righteous thought. Through millions of books, Akhand Jyoti magazine, and digital resources, AWGP spreads the message of scientific spirituality and ethical living across the world.',
      points: ['Mass dissemination of Vedic wisdom through literature', 'Moral-spiritual regeneration of society', 'Replacing negative thought with constructive vision'],
      link: 'https://www.awgp.org/en/about_us/mission_vision',
    },
    hi: {
      name: 'विचार क्रांति अभियान',
      subtitle: 'विचारों की क्रांति',
      desc: 'पं. श्रीराम शर्मा आचार्य द्वारा शुरू किया गया यह अभियान सही विचार की शक्ति से व्यक्तिगत और सामूहिक चेतना को बदलने का लक्ष्य रखता है। लाखों पुस्तकों, अखंड ज्योति पत्रिका और डिजिटल माध्यमों के जरिए AWGP वैज्ञानिक अध्यात्म का प्रसार करता है।',
      points: ['साहित्य के माध्यम से वैदिक ज्ञान का प्रसार', 'समाज का नैतिक-आध्यात्मिक पुनर्जागरण', 'नकारात्मक विचारों को रचनात्मक दृष्टि से बदलना'],
      link: 'https://www.awgp.org/en/about_us/mission_vision',
    },
    kn: {
      name: 'ವಿಚಾರ ಕ್ರಾಂತಿ ಅಭಿಯಾನ',
      subtitle: 'ವಿಚಾರ ಕ್ರಾಂತಿ',
      desc: 'ಪಂ. ಶ್ರೀರಾಮ ಶರ್ಮಾ ಆಚಾರ್ಯರಿಂದ ಪ್ರಾರಂಭಿಸಲ್ಪಟ್ಟ ಈ ಅಭಿಯಾನ ಸರಿಯಾದ ವಿಚಾರದ ಶಕ್ತಿಯಿಂದ ವ್ಯಕ್ತಿಗತ ಮತ್ತು ಸಾಮೂಹಿಕ ಪ್ರಜ್ಞೆಯನ್ನು ಬದಲಾಯಿಸುವ ಗುರಿ ಹೊಂದಿದೆ.',
      points: ['ಸಾಹಿತ್ಯದ ಮೂಲಕ ವೈದಿಕ ಜ್ಞಾನದ ಪ್ರಸಾರ', 'ಸಮಾಜದ ನೈತಿಕ-ಆಧ್ಯಾತ್ಮಿಕ ಪುನರುಜ್ಜೀವನ', 'ನಕಾರಾತ್ಮಕ ವಿಚಾರಗಳನ್ನು ರಚನಾತ್ಮಕ ದೃಷ್ಟಿಯಿಂದ ಬದಲಾಯಿಸುವುದು'],
      link: 'https://www.awgp.org/en/about_us/mission_vision',
    },
  },
  {
    key: 'nari',
    img: '/assets/programs/workshops.jpg',
    en: {
      name: 'Nari Jagran Andolan',
      subtitle: "Women's Awakening Movement",
      desc: "Recognising that women are the cornerstone of a civilised society, this movement empowers women through education, self-confidence, and spiritual growth. It combats the dowry system, gender inequality, and promotes women's rights rooted in Vedic ideals — re-establishing the sacred dignity of women.",
      points: ["Education and self-reliance for every woman", "Combating dowry and gender discrimination", "Reviving Vedic ideals of women's dignity"],
      link: 'https://www.awgp.org/en/about_us',
    },
    hi: {
      name: 'नारी जागरण आंदोलन',
      subtitle: 'महिला जागृति आंदोलन',
      desc: 'यह आंदोलन महिलाओं को शिक्षा, आत्मविश्वास और आध्यात्मिक विकास के माध्यम से सशक्त बनाता है। दहेज प्रथा, लिंग भेद के खिलाफ लड़ते हुए वैदिक आदर्शों पर आधारित महिला अधिकारों को बढ़ावा देता है।',
      points: ['हर महिला के लिए शिक्षा और आत्मनिर्भरता', 'दहेज और लिंग भेद का विरोध', 'महिलाओं की वैदिक गरिमा की पुनःस्थापना'],
      link: 'https://www.awgp.org/en/about_us',
    },
    kn: {
      name: 'ನಾರಿ ಜಾಗರಣ ಆಂದೋಲನ',
      subtitle: 'ಮಹಿಳಾ ಜಾಗೃತಿ ಆಂದೋಲನ',
      desc: 'ಈ ಆಂದೋಲನ ಮಹಿಳೆಯರನ್ನು ಶಿಕ್ಷಣ, ಆತ್ಮವಿಶ್ವಾಸ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಬೆಳವಣಿಗೆಯ ಮೂಲಕ ಸಬಲಗೊಳಿಸುತ್ತದೆ. ವರದಕ್ಷಿಣೆ ಮತ್ತು ಲಿಂಗ ತಾರತಮ್ಯದ ವಿರುದ್ಧ ಹೋರಾಡುತ್ತದೆ.',
      points: ['ಪ್ರತಿ ಮಹಿಳೆಗೆ ಶಿಕ್ಷಣ ಮತ್ತು ಸ್ವಾವಲಂಬನ', 'ವರದಕ್ಷಿಣೆ ಮತ್ತು ಲಿಂಗ ತಾರತಮ್ಯ ನಿರ್ಮೂಲನ', 'ಮಹಿಳಾ ಘನತೆಯ ವೈದಿಕ ಆದರ್ಶ ಪುನಃಸ್ಥಾಪನ'],
      link: 'https://www.awgp.org/en/about_us',
    },
  },
  {
    key: 'vyasan',
    img: '/assets/activities/seva.jpg',
    en: {
      name: 'Vyasan Mukti Abhiyan',
      subtitle: 'Addiction Liberation Campaign',
      desc: 'A nationwide campaign to free individuals and families from the clutches of alcohol, tobacco, drugs, and other harmful substances. Through counselling, spiritual practices, and community awareness drives, thousands of families have been transformed and reclaimed their health and dignity.',
      points: ['Counselling and de-addiction programmes', 'Community awareness drives across towns', 'Spiritual practices as alternative to addiction'],
      link: 'https://www.awgp.org/en/about_us',
    },
    hi: {
      name: 'व्यसन मुक्ति अभियान',
      subtitle: 'नशा मुक्ति अभियान',
      desc: 'यह राष्ट्रव्यापी अभियान व्यक्तियों और परिवारों को शराब, तंबाकू, नशीली दवाओं और अन्य हानिकारक पदार्थों की चंगुल से मुक्त कराता है। परामर्श, आध्यात्मिक साधना और सामुदायिक जागरूकता के माध्यम से हजारों परिवारों का जीवन बदला है।',
      points: ['परामर्श और नशा मुक्ति कार्यक्रम', 'सामुदायिक जागरूकता अभियान', 'नशे के विकल्प के रूप में आध्यात्मिक साधना'],
      link: 'https://www.awgp.org/en/about_us',
    },
    kn: {
      name: 'ವ್ಯಸನ ಮುಕ್ತಿ ಅಭಿಯಾನ',
      subtitle: 'ಚಟ ಮುಕ್ತಿ ಅಭಿಯಾನ',
      desc: 'ಈ ರಾಷ್ಟ್ರವ್ಯಾಪಿ ಅಭಿಯಾನ ವ್ಯಕ್ತಿಗಳು ಮತ್ತು ಕುಟುಂಬಗಳನ್ನು ಮದ್ಯ, ತಂಬಾಕು ಮತ್ತು ಇತರ ಹಾನಿಕಾರಕ ವಸ್ತುಗಳಿಂದ ಮುಕ್ತಗೊಳಿಸುತ್ತದೆ.',
      points: ['ಸಮಾಲೋಚನೆ ಮತ್ತು ಚಟ ಮುಕ್ತಿ ಕಾರ್ಯಕ್ರಮಗಳು', 'ಸಮುದಾಯ ಜಾಗೃತಿ ಅಭಿಯಾನ', 'ಆಧ್ಯಾತ್ಮಿಕ ಸಾಧನೆ ಚಟಕ್ಕೆ ಪರ್ಯಾಯ'],
      link: 'https://www.awgp.org/en/about_us',
    },
  },
  {
    key: 'paryavaran',
    img: '/assets/activities/tree-plantation.jpg',
    en: {
      name: 'Paryavaran Sanrakshan Andolan',
      subtitle: 'Environmental Protection Movement',
      desc: "AWGP's environmental movement combines ancient wisdom with modern ecology — planting millions of trees, promoting Yagya (which scientifically purifies the atmosphere), and educating communities about sustainable living. The movement upholds the Vedic principle that Nature is sacred and must be revered.",
      points: ['Planting millions of trees nationwide', 'Yagya as a tool for atmospheric purification', 'Eco-consciousness and sustainable living education'],
      link: 'https://www.awgp.org/en/about_us',
    },
    hi: {
      name: 'पर्यावरण संरक्षण आंदोलन',
      subtitle: 'पर्यावरण बचाओ अभियान',
      desc: 'AWGP का पर्यावरण आंदोलन प्राचीन ज्ञान को आधुनिक पारिस्थितिकी के साथ जोड़ता है — लाखों पेड़ लगाना, यज्ञ (जो वायुमंडल को शुद्ध करता है), और सतत जीवन के बारे में समुदायों को शिक्षित करना।',
      points: ['राष्ट्रव्यापी वृक्षारोपण', 'वायुमंडल शुद्धि के लिए यज्ञ', 'पर्यावरण जागरूकता और सतत जीवन शिक्षा'],
      link: 'https://www.awgp.org/en/about_us',
    },
    kn: {
      name: 'ಪರಿಸರ ಸಂರಕ್ಷಣ ಆಂದೋಲನ',
      subtitle: 'ಪ್ರಕೃತಿ ರಕ್ಷಣ ಅಭಿಯಾನ',
      desc: 'AWGP ನ ಪರಿಸರ ಆಂದೋಲನ ಪ್ರಾಚೀನ ಜ್ಞಾನವನ್ನು ಆಧುನಿಕ ಪರಿಸರ ಶಾಸ್ತ್ರದೊಂದಿಗೆ ಸಂಯೋಜಿಸುತ್ತದೆ — ಕೋಟ್ಯಾಂತರ ಮರ ನೆಡುವುದು, ಯಜ್ಞ ಮಾಡುವುದು ಮತ್ತು ಸಮುದಾಯಗಳಿಗೆ ಸುಸ್ಥಿರ ಜೀವನ ಶಿಕ್ಷಣ.',
      points: ['ರಾಷ್ಟ್ರವ್ಯಾಪಿ ವೃಕ್ಷಾರೋಪಣ', 'ವಾಯುಮಂಡಲ ಶುದ್ಧಿಗೆ ಯಜ್ಞ', 'ಪರಿಸರ ಜಾಗೃತಿ ಮತ್ತು ಸುಸ್ಥಿರ ಜೀವನ ಶಿಕ್ಷಣ'],
      link: 'https://www.awgp.org/en/about_us',
    },
  },
  {
    key: 'kusanskar',
    img: '/assets/activities/food-distribution.jpg',
    en: {
      name: 'Kusanskar Umoolan Andolan',
      subtitle: 'Eradication of Harmful Social Customs',
      desc: 'This movement works to eliminate blind faith, irrational rituals, caste discrimination, and regressive social customs from society. By promoting scientific spirituality and rational thinking, AWGP helps communities distinguish between genuine Dharma and superstition, building a healthier social fabric.',
      points: ['Eliminating blind faith and superstition', 'Promoting rational, scientific spirituality', 'Fighting casteism, dowry, and child marriage'],
      link: 'https://www.awgp.org/en/about_us',
    },
    hi: {
      name: 'कुसंस्कार उन्मूलन आंदोलन',
      subtitle: 'सामाजिक कुरीति उन्मूलन',
      desc: 'यह आंदोलन समाज से अंधविश्वास, अतार्किक रीति-रिवाजों, जाति भेद और प्रतिगामी सामाजिक प्रथाओं को मिटाने के लिए काम करता है। वैज्ञानिक अध्यात्म और तर्कसंगत सोच को बढ़ावा देकर AWGP वास्तविक धर्म और अंधविश्वास में फर्क करने में मदद करता है।',
      points: ['अंधविश्वास और कुरीतियों का उन्मूलन', 'वैज्ञानिक और तार्किक अध्यात्म का प्रसार', 'जातिवाद, दहेज और बाल विवाह के खिलाफ संघर्ष'],
      link: 'https://www.awgp.org/en/about_us',
    },
    kn: {
      name: 'ಕುಸಂಸ್ಕಾರ ನಿರ್ಮೂಲನ ಆಂದೋಲನ',
      subtitle: 'ಹಾನಿಕಾರಕ ಸಾಮಾಜಿಕ ಪದ್ಧತಿಗಳ ನಿರ್ಮೂಲನ',
      desc: 'ಈ ಆಂದೋಲನ ಸಮಾಜದಿಂದ ಅಂಧಶ್ರದ್ಧೆ, ಅತಾರ್ಕಿಕ ಆಚಾರಗಳು, ಜಾತಿ ತಾರತಮ್ಯ ಮತ್ತು ಹಿಂದುಳಿದ ಸಾಮಾಜಿಕ ಪದ್ಧತಿಗಳನ್ನು ತೊಡೆದುಹಾಕಲು ಕೆಲಸ ಮಾಡುತ್ತದೆ.',
      points: ['ಅಂಧಶ್ರದ್ಧೆ ಮತ್ತು ಮೂಢನಂಬಿಕೆ ನಿರ್ಮೂಲನ', 'ವೈಜ್ಞಾನಿಕ ಮತ್ತು ತಾರ್ಕಿಕ ಆಧ್ಯಾತ್ಮ ಪ್ರಸಾರ', 'ಜಾತಿವಾದ, ವರದಕ್ಷಿಣೆ ಮತ್ತು ಬಾಲ್ಯವಿವಾಹ ವಿರೋಧ'],
      link: 'https://www.awgp.org/en/about_us',
    },
  },
  {
    key: 'swasthya',
    img: '/assets/activities/hospital-visit.jpg',
    en: {
      name: 'Swasthya Sanvardhan Andolan',
      subtitle: 'Health & Wellness Movement',
      desc: 'Promoting holistic wellness through Ayurveda, Yoga, Pranayama, and preventive healthcare camps. Spiritual practices like Gayatri Sadhana and Yagya are presented as scientifically validated complementary health tools. AWGP runs free medical camps and health awareness drives for underprivileged communities.',
      points: ['Free medical and health camps for all', 'Yoga, Pranayama and Ayurvedic wellness', 'Gayatri Sadhana as a complementary health tool'],
      link: 'https://www.awgp.org/en/about_us',
    },
    hi: {
      name: 'स्वास्थ्य संवर्धन आंदोलन',
      subtitle: 'स्वास्थ्य और कल्याण आंदोलन',
      desc: 'आयुर्वेद, योग, प्राणायाम और निवारक स्वास्थ्य शिविरों के माध्यम से समग्र स्वास्थ्य को बढ़ावा देना। AWGP निःशुल्क चिकित्सा शिविर और वंचित समुदायों के लिए स्वास्थ्य जागरूकता अभियान चलाता है।',
      points: ['सभी के लिए निःशुल्क चिकित्सा शिविर', 'योग, प्राणायाम और आयुर्वेदिक स्वास्थ्य', 'स्वास्थ्य उपकरण के रूप में गायत्री साधना'],
      link: 'https://www.awgp.org/en/about_us',
    },
    kn: {
      name: 'ಸ್ವಾಸ್ಥ್ಯ ಸಂವರ್ಧನ ಆಂದೋಲನ',
      subtitle: 'ಆರೋಗ್ಯ ಮತ್ತು ಯೋಗಕ್ಷೇಮ ಆಂದೋಲನ',
      desc: 'ಆಯುರ್ವೇದ, ಯೋಗ, ಪ್ರಾಣಾಯಾಮ ಮತ್ತು ತಡೆಗಟ್ಟುವ ಆರೋಗ್ಯ ಶಿಬಿರಗಳ ಮೂಲಕ ಸಮಗ್ರ ಆರೋಗ್ಯವನ್ನು ಉತ್ತೇಜಿಸುವುದು. AWGP ವಂಚಿತ ಸಮುದಾಯಗಳಿಗೆ ಉಚಿತ ವೈದ್ಯಕೀಯ ಶಿಬಿರಗಳನ್ನು ನಡೆಸುತ್ತದೆ.',
      points: ['ಎಲ್ಲರಿಗೂ ಉಚಿತ ವೈದ್ಯಕೀಯ ಶಿಬಿರಗಳು', 'ಯೋಗ, ಪ್ರಾಣಾಯಾಮ ಮತ್ತು ಆಯುರ್ವೇದ ಕ್ಷೇಮ', 'ಆರೋಗ್ಯ ಸಾಧನವಾಗಿ ಗಾಯತ್ರಿ ಸಾಧನೆ'],
      link: 'https://www.awgp.org/en/about_us',
    },
  },
  {
    key: 'samarasata',
    img: '/assets/activities/blood-camp.jpg',
    en: {
      name: 'Samarasata Andolan',
      subtitle: 'Social Harmony Movement',
      desc: 'Based on the Vedic principle of Vasudhaiva Kutumbakam — "the whole world is one family" — this movement breaks barriers of caste, religion, and class. Joint Yagyas, inter-community gatherings, blood donation camps, and equal participation in spiritual practices foster genuine unity and brotherhood.',
      points: ['Vasudhaiva Kutumbakam — one global family', 'Inter-community joint Yagyas and gatherings', 'Breaking caste, class and religious barriers'],
      link: 'https://www.awgp.org/en/about_us',
    },
    hi: {
      name: 'समरसता आंदोलन',
      subtitle: 'सामाजिक समरसता आंदोलन',
      desc: 'वसुधैव कुटुंबकम — "सारा विश्व एक परिवार" — के वैदिक सिद्धांत पर आधारित यह आंदोलन जाति, धर्म और वर्ग की बाधाओं को तोड़ता है। संयुक्त यज्ञ, अंतर-सामुदायिक सभाएं और रक्तदान शिविर एकता और भाईचारे को बढ़ावा देते हैं।',
      points: ['वसुधैव कुटुंबकम — एक वैश्विक परिवार', 'अंतर-सामुदायिक संयुक्त यज्ञ और सभाएं', 'जाति, वर्ग और धार्मिक बाधाओं को तोड़ना'],
      link: 'https://www.awgp.org/en/about_us',
    },
    kn: {
      name: 'ಸಮರಸತಾ ಆಂದೋಲನ',
      subtitle: 'ಸಾಮಾಜಿಕ ಸೌಹಾರ್ದ ಆಂದೋಲನ',
      desc: 'ವಸುಧೈವ ಕುಟುಂಬಕಂ — "ಇಡೀ ಜಗತ್ತು ಒಂದೇ ಕುಟುಂಬ" — ಎಂಬ ವೈದಿಕ ತತ್ವದ ಆಧಾರದ ಮೇಲೆ ಈ ಆಂದೋಲನ ಜಾತಿ, ಧರ್ಮ ಮತ್ತು ವರ್ಗದ ಅಡೆತಡೆಗಳನ್ನು ಮುರಿಯುತ್ತದೆ.',
      points: ['ವಸುಧೈವ ಕುಟುಂಬಕಂ — ಒಂದು ಜಾಗತಿಕ ಕುಟುಂಬ', 'ಅಂತರ-ಸಮುದಾಯ ಸಂಯುಕ್ತ ಯಜ್ಞ ಮತ್ತು ಸಭೆಗಳು', 'ಜಾತಿ, ವರ್ಗ ಮತ್ತು ಧಾರ್ಮಿಕ ಅಡೆತಡೆಗಳ ನಿರ್ಮೂಲನ'],
      link: 'https://www.awgp.org/en/about_us',
    },
  },
];

export default async function InitiativesPage({ params }) {
  const { locale } = await params;
  const L = (en, hi, kn) => locale === 'hi' ? hi : locale === 'kn' ? kn : en;
  const t = (item) => item[locale] || item.en;

  return (
    <>
      <HeroSection
        eyebrow="All World Gayatri Pariwar · Bengaluru"
        title={L('Our Initiatives', 'हमारी पहल', 'ನಮ್ಮ ಉಪಕ್ರಮಗಳು')}
        subtitle={L(
          'Seven Movements for a Transformed World',
          'एक परिवर्तित विश्व के लिए सात आंदोलन',
          'ಪರಿವರ್ತಿತ ಜಗತ್ತಿಗಾಗಿ ಏಳು ಆಂದೋಲನಗಳು'
        )}
        bgImage="/assets/misc/mashal.jpg"
        mantra="॥ यत् पिण्डे तत् ब्रह्माण्डे ॥"
      >
        <a href="https://www.awgp.org/en" target="_blank" rel="noopener noreferrer" className="btn btn-white">
          {L('Visit AWGP.org →', 'AWGP वेबसाइट →', 'AWGP ವೆಬ್‌ಸೈಟ್ →')}
        </a>
      </HeroSection>

      {/* Mission & Vision */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="section-inner">
          <SectionHeader
            eyebrow={L('Mission & Vision', 'मिशन और दृष्टि', 'ಮಿಷನ್ ಮತ್ತು ದೃಷ್ಟಿ')}
            title={L('Yug Nirman — Reconstruction of the Era', 'युग निर्माण — एक नए युग का निर्माण', 'ಯುಗ ನಿರ್ಮಾಣ — ಒಂದು ಹೊಸ ಯುಗದ ನಿರ್ಮಾಣ')}
            ornament="🔥"
          />
          <div className="initiatives-mv-grid">
            <div className="initiatives-mv-card">
              <span className="initiatives-mv-icon">🌅</span>
              <h3>{L('Our Vision', 'हमारी दृष्टि', 'ನಮ್ಮ ದೃಷ್ಟಿ')}</h3>
              <p>{L(
                'AWGP envisions a world guided by wisdom, compassion, and unity — a living model of a futuristic society based on human equality and the principle of Vasudhaiva Kutumbakam (the whole world is one family).',
                'AWGP एक ऐसी दुनिया की कल्पना करता है जो ज्ञान, करुणा और एकता द्वारा निर्देशित हो — वसुधैव कुटुंबकम के सिद्धांत पर आधारित एक भविष्यवादी समाज का जीवंत मॉडल।',
                'AWGP ಜ್ಞಾನ, ಕರುಣೆ ಮತ್ತು ಏಕತೆಯಿಂದ ನಿರ್ದೇಶಿಸಲ್ಪಟ್ಟ ಜಗತ್ತನ್ನು ಕಲ್ಪಿಸುತ್ತದೆ — ವಸುಧೈವ ಕುಟುಂಬಕಂ ತತ್ವದ ಆಧಾರದ ಮೇಲೆ ಒಂದು ಭವಿಷ್ಯದ ಸಮಾಜದ ಜೀವಂತ ಮಾದರಿ.'
              )}</p>
            </div>
            <div className="initiatives-mv-card">
              <span className="initiatives-mv-icon">🎯</span>
              <h3>{L('Our Mission', 'हमारा मिशन', 'ನಮ್ಮ ಮಿಷನ್')}</h3>
              <p>{L(
                'To create a moral-spiritual revolution — transforming individuals, families, and societies through Gayatri Sadhana, Yagya, and selfless service. AWGP is a unique fountain-head of a global movement rooted in Indian heritage philosophy.',
                'एक नैतिक-आध्यात्मिक क्रांति लाना — गायत्री साधना, यज्ञ और निःस्वार्थ सेवा के माध्यम से व्यक्तियों, परिवारों और समाजों को बदलना। AWGP भारतीय विरासत दर्शन में निहित एक वैश्विक आंदोलन का केंद्र है।',
                'ನೈತಿಕ-ಆಧ್ಯಾತ್ಮಿಕ ಕ್ರಾಂತಿ ತರುವುದು — ಗಾಯತ್ರಿ ಸಾಧನೆ, ಯಜ್ಞ ಮತ್ತು ನಿಸ್ವಾರ್ಥ ಸೇವೆಯ ಮೂಲಕ ವ್ಯಕ್ತಿ, ಕುಟುಂಬ ಮತ್ತು ಸಮಾಜಗಳನ್ನು ಬದಲಾಯಿಸುವುದು.'
              )}</p>
            </div>
            <div className="initiatives-mv-card">
              <span className="initiatives-mv-icon">🌱</span>
              <h3>{L('Yug Nirman Yojana', 'युग निर्माण योजना', 'ಯುಗ ನಿರ್ಮಾಣ ಯೋಜನೆ')}</h3>
              <p>{L(
                'A global movement for the moral, cultural, intellectual, and spiritual reconstruction of society. It addresses the root cause of all problems — human character — and works toward establishing an era of truth, beauty, and goodness.',
                'समाज के नैतिक, सांस्कृतिक, बौद्धिक और आध्यात्मिक पुनर्निर्माण के लिए एक वैश्विक आंदोलन। यह सभी समस्याओं के मूल कारण — मानवीय चरित्र — को संबोधित करता है।',
                'ಸಮಾಜದ ನೈತಿಕ, ಸಾಂಸ್ಕೃತಿಕ, ಬೌದ್ಧಿಕ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಪುನರ್ನಿರ್ಮಾಣಕ್ಕಾಗಿ ಒಂದು ಜಾಗತಿಕ ಆಂದೋಲನ.'
              )}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sapt Andolan intro banner */}
      <div className="initiatives-banner">
        <div className="initiatives-banner-inner">
          <p>{L(
            'The Seven Movements — Sapt Andolan — are AWGP\'s pillars of social transformation, addressing the deepest challenges of our time through spiritual wisdom and collective action.',
            'सात आंदोलन — सप्त आंदोलन — AWGP के सामाजिक परिवर्तन के स्तंभ हैं, जो आध्यात्मिक ज्ञान और सामूहिक कार्रवाई के माध्यम से हमारे समय की गहरी चुनौतियों को संबोधित करते हैं।',
            'ಏಳು ಆಂದೋಲನಗಳು — ಸಪ್ತ ಆಂದೋಲನ — AWGP ನ ಸಾಮಾಜಿಕ ಪರಿವರ್ತನೆಯ ಸ್ತಂಭಗಳು, ಆಧ್ಯಾತ್ಮಿಕ ಜ್ಞಾನ ಮತ್ತು ಸಾಮೂಹಿಕ ಕ್ರಿಯೆಯ ಮೂಲಕ ನಮ್ಮ ಕಾಲದ ಆಳವಾದ ಸವಾಲುಗಳನ್ನು ಎದುರಿಸುತ್ತವೆ.'
          )}</p>
        </div>
      </div>

      {/* Sapt Andolan */}
      <section className="section" style={{ background: 'var(--cream-dark)' }}>
        <div className="section-inner">
          <SectionHeader
            eyebrow={L('The Seven Movements', 'सात आंदोलन', 'ಏಳು ಆಂದೋಲನಗಳು')}
            title={L('Sapt Andolan', 'सप्त आंदोलन', 'ಸಪ್ತ ಆಂದೋಲನ')}
            ornament="✨"
          />
          <div className="andolan-grid">
            {SAPT_ANDOLAN.map((andolan, idx) => {
              const data = t(andolan);
              return (
                <div key={andolan.key} className="andolan-card">
                  <div className="andolan-num">{String(idx + 1).padStart(2, '0')}</div>
                  <div className="andolan-img-wrap">
                    <Image
                      src={andolan.img}
                      alt={data.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width:640px) 90vw, (max-width:1000px) 45vw, 30vw"
                    />
                    <div className="andolan-img-overlay" />
                  </div>
                  <div className="andolan-body">
                    <span className="andolan-subtitle">{data.subtitle}</span>
                    <h3 className="andolan-name">{data.name}</h3>
                    <p className="andolan-desc">{data.desc}</p>
                    <ul className="andolan-points">
                      {data.points.map((pt, i) => <li key={i}>{pt}</li>)}
                    </ul>
                    <a
                      href={data.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary andolan-btn"
                    >
                      {L('Learn More →', 'और जानें →', 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ →')}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <SectionHeader
            eyebrow={L('Be Part of the Change', 'परिवर्तन का हिस्सा बनें', 'ಬದಲಾವಣೆಯ ಭಾಗವಾಗಿ')}
            title={L('Join the Movement', 'आंदोलन से जुड़ें', 'ಆಂದೋಲನಕ್ಕೆ ಸೇರಿ')}
            ornament="🕊️"
          />
          <p style={{ maxWidth: 640, margin: '0 auto 2rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
            {L(
              'Every soul that joins AWGP becomes a torchbearer of this transformation. Participate in Sadhana, Seva, and Swadhyaya — and be a living example of Yug Nirman.',
              'AWGP से जुड़ने वाला प्रत्येक आत्मा इस परिवर्तन का मशालची बन जाता है। साधना, सेवा और स्वाध्याय में भाग लें।',
              'AWGP ಗೆ ಸೇರುವ ಪ್ರತಿ ಆತ್ಮ ಈ ಪರಿವರ್ತನೆಯ ಮಶಾಲ್ ಚಿ ಆಗುತ್ತದೆ. ಸಾಧನೆ, ಸೇವೆ ಮತ್ತು ಸ್ವಾಧ್ಯಾಯದಲ್ಲಿ ಭಾಗವಹಿಸಿ.'
            )}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://www.awgp.org/en" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {L('Explore AWGP.org →', 'AWGP.org एक्सप्लोर करें →', 'AWGP.org ಅನ್ವೇಷಿಸಿ →')}
            </a>
            <a href="/contact" className="btn btn-outline" style={{ borderColor: 'var(--maroon)', color: 'var(--maroon)' }}>
              {L('Contact Us', 'संपर्क करें', 'ಸಂಪರ್ಕಿಸಿ')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
