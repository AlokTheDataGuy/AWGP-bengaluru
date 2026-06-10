import { getTranslations, getLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '../../../lib/i18n/navigation';
import HeroSection from '../../../components/ui/HeroSection';
import SectionHeader from '../../../components/ui/SectionHeader';
import SlideshowClient from '../../../components/ui/SlideshowClient';
import '../../../components/sections/About.css';
import './About.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { en: 'About Us — AWGP Bengaluru', hi: 'हमारे बारे में — AWGP बेंगलूरु', kn: 'ನಮ್ಮ ಬಗ್ಗೆ — AWGP ಬೆಂಗಳೂರು' };
  return { title: titles[locale] || titles.en };
}

const MISSION_SLIDES = [
  { src: '/assets/founders/smile.jpeg',             caption: 'Gurudev & Mataji' },
  { src: '/assets/chetna-kendra/building.png',      caption: 'Gayatri Consciousness Center' },
  { src: '/assets/chetna-kendra/inauguration.jpg',  caption: 'Inauguration' },
];

const AWGP_SLIDES = [
  { src: '/assets/shantikunj/shantikunj.jpg', caption: 'Shantikunj, Haridwar — Global HQ' },
  { src: '/assets/shantikunj/samadhi.png',    caption: 'Samadhi Sthal' },
  { src: '/assets/shantikunj/deepak.jpg',     caption: 'Akhand Deepak' },
  { src: '/assets/shantikunj/mandir.jpg',     caption: 'Gayatri Mata Mandir' },
  { src: '/assets/shantikunj/dsvv.jpg',       caption: 'Dev Sanskriti Vishwavidyalaya' },
  { src: '/assets/shantikunj/shivir.jpg',     caption: 'Shivir — 9-Day Residential Camp' },
];

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations();
  const L = (en, hi, kn) => locale === 'hi' ? hi : locale === 'kn' ? kn : en;

  return (
    <>
      <HeroSection
        eyebrow="All World Gayatri Pariwar · Bengaluru"
        title={L('About Us', 'हमारे बारे में', 'ನಮ್ಮ ಬಗ್ಗೆ')}
        subtitle={L(
          'Find Your Inner Balance · Scientific Spirituality for the Modern Seeker',
          'आंतरिक संतुलन पाएं · आधुनिक साधक के लिए वैज्ञानिक अध्यात्म',
          'ಆಂತರಿಕ ಸಮತೋಲನ ಕಂಡುಕೊಳ್ಳಿ · ಆಧುನಿಕ ಸಾಧಕನಿಗೆ ವೈಜ್ಞಾನಿಕ ಆಧ್ಯಾತ್ಮ'
        )}
        bgImage="/assets/shantikunj/banner.jpg"
        bgImageMobile="/assets/mobile_imgs/about_us_bg.jpg"
        mantra="॥ ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥"
      >
        <Link href="/contact" className="btn btn-white">
          {L('Join Our Pariwar', 'परिवार से जुड़ें', 'ಪರಿವಾರ ಸೇರಿ')}
        </Link>
        <a href="#mission" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.55)', color: '#fff' }}>
          {L('Our Mission', 'हमारा उद्देश्य', 'ನಮ್ಮ ಉದ್ದೇಶ')}
        </a>
      </HeroSection>

      {/* Mission */}
      {/* <section id="mission" className="section" style={{ background: 'var(--cream)' }}>
        <div className="section-inner">
          <SectionHeader
            eyebrow={L('Our Mission', 'हमारा उद्देश्य', 'ನಮ್ಮ ಉದ್ದೇಶ')}
            title={L('A Center for Scientific Spirituality', 'वैज्ञानिक अध्यात्म का केंद्र', 'ವೈಜ್ಞಾನಿಕ ಆಧ್ಯಾತ್ಮದ ಕೇಂದ್ರ')}
            ornament="🔥"
          />
          <div className="mission-grid">
            <SlideshowClient slides={MISSION_SLIDES} aspectRatio="16/9" interval={4000} />
            <div className="mission-content">
              <p className="mission-lead">
                {L(
                  "AWGP Bengaluru is part of the All World Gayatri Pariwar — a global spiritual movement founded by Pandit Shriram Sharma Acharya, headquartered at Shantikunj, Haridwar.",
                  'AWGP बेंगलूरु, पं. श्रीराम शर्मा आचार्य द्वारा स्थापित अखिल विश्व गायत्री परिवार का एक केंद्र है, जिसका मुख्यालय शांतिकुंज, हरिद्वार में है।',
                  'AWGP ಬೆಂಗಳೂರು, ಪಂ. ಶ್ರೀರಾಮ ಶರ್ಮಾ ಆಚಾರ್ಯರಿಂದ ಸ್ಥಾಪಿಸಲ್ಪಟ್ಟ ಅಖಿಲ ವಿಶ್ವ ಗಾಯತ್ರಿ ಪರಿವಾರದ ಒಂದು ಕೇಂದ್ರ.'
                )}
              </p>
              <p>
                {L(
                  "Rooted in Vichar Kranti — a revolution in thought — we blend ancient Vedic wisdom with practical tools for modern living.",
                  'विचार क्रांति में निहित — हम प्राचीन वैदिक ज्ञान को आधुनिक जीवन के व्यावहारिक उपकरणों के साथ जोड़ते हैं।',
                  'ವಿಚಾರ ಕ್ರಾಂತಿಯಲ್ಲಿ ಬೇರೂರಿ — ನಾವು ಪ್ರಾಚೀನ ವೈದಿಕ ಜ್ಞಾನವನ್ನು ಆಧುನಿಕ ಜೀವನದ ಪ್ರಾಯೋಗಿಕ ಸಾಧನಗಳೊಂದಿಗೆ ಬೆಸೆಯುತ್ತೇವೆ.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section> */}

    {/* Founders */}
<section className="section founders-section">
  <div className="section-inner">
    <SectionHeader
      eyebrow="Our Founders"
      title="Guiding Lights of the Gayatri Movement"
      ornament="🪔"
    />

    <div className="founders-grid">
      <FounderCard
        img="/assets/founders/guruji.jpeg"
        name="Pandit Shri Ram Sharma Acharya"
        role="Gurudev"
        desc="A visionary sage who authored over 3,000 books, Gurudev founded AWGP and dedicated his life to the revival of Indian culture through selfless service and the union of ancient wisdom with modern thought."
      />

      <FounderCard
        img="/assets/founders/mataji.jpeg"
        name="Vandaniya Mata Bhagwati Devi Sharma"
        role="Mataji"
        desc="Revered as the Mother of the Gayatri Parivaar, Mataji guided millions on the path of inner transformation through sacrifice, compassion, and spiritual discipline."
      />
    </div>
  </div>
</section>

      {/* Torchbearers */}
      <section className="section torchbearers-section" style={{ background: 'var(--cream-dark)' }}>
        <div className="section-inner">
          <SectionHeader
            eyebrow={L('Current Leadership', 'वर्तमान नेतृत्व', 'ಪ್ರಸ್ತುತ ನಾಯಕತ್ವ')}
            title={L('The Torchbearers', 'मशाल वाहक', 'ಜ್ಯೋತಿ ವಾಹಕರು')}
            subtitle={L('Guiding the Global Movement of Thought Revolution', 'विचार क्रांति के वैश्विक आंदोलन का मार्गदर्शन', 'ವಿಚಾರ ಕ್ರಾಂತಿಯ ಜಾಗತಿಕ ಆಂದೋಲನದ ಮಾರ್ಗದರ್ಶನ')}
            ornament="🔦"
          />
          <div className="torchbearers-grid">
            <TorchbearerCard
              img="/assets/founders/shraddheya.jpg"
              name="Shraddhey  Dr. Pranav Pandya"
              role={L('Head: All World Gayatri Pariwar', 'प्रमुख: अखिल विश्व गायत्री परिवार', 'ಮುಖ್ಯಸ್ಥ: ಅಖಿಲ ವಿಶ್ವ ಗಾಯತ್ರಿ ಪರಿವಾರ')}
              points={[
                L('Chancellor: Dev Sanskriti Vishwavidyalaya', 'कुलाधिपति: देव संस्कृति विश्वविद्यालय', 'ಕುಲಾಧಿಪತಿ: ದೇವ ಸಂಸ್ಕೃತಿ ವಿಶ್ವವಿದ್ಯಾಲಯ'),
                L('Director: Brahmavarchas Research Institute', 'निदेशक: ब्रह्मवर्चस शोध संस्थान', 'ನಿರ್ದೇಶಕ: ಬ್ರಹ್ಮವರ್ಚಸ್ ಸಂಶೋಧನಾ ಸಂಸ್ಥೆ'),
                L('Editor: Akhand Jyoti', 'संपादक: अखंड ज्योति', 'ಸಂಪಾದಕ: ಅಖಂಡ ಜ್ಯೋತಿ'),
              ]}
              desc={L(
                'A close and direct disciple of Pt. Shriram Sharma Acharya, he is renowned as a pioneer of scientific spirituality. Under his dynamic leadership, DSVV is reforming modern education.',
                'पं. श्रीराम शर्मा आचार्य के प्रत्यक्ष शिष्य, वैज्ञानिक अध्यात्म के अग्रदूत के रूप में विख्यात। उनके नेतृत्व में DSVV आधुनिक शिक्षा को नया रूप दे रहा है।',
                'ಪಂ. ಶ್ರೀರಾಮ ಶರ್ಮಾ ಆಚಾರ್ಯರ ನೇರ ಶಿಷ್ಯ, ವೈಜ್ಞಾನಿಕ ಆಧ್ಯಾತ್ಮದ ಪ್ರವರ್ತಕ. ಅವರ ನಾಯಕತ್ವದಲ್ಲಿ DSVV ಆಧುನಿಕ ಶಿಕ್ಷಣವನ್ನು ಹೊಸ ರೂಪ ನೀಡುತ್ತಿದೆ.'
              )}
              readMoreUrl="https://en.wikipedia.org/wiki/Pranav_Pandya_(AWGP)"
              locale={locale}
            />
            <TorchbearerCard
              img="/assets/founders/jiji.jpg"
              name="Shraddheya Shailbala Pandya"
              role={L('Managing Trustee: Shantikunj', 'प्रबंध न्यासी: शांतिकुंज', 'ವ್ಯವಸ್ಥಾಪಕ ಟ್ರಸ್ಟಿ: ಶಾಂತಿಕುಂಜ')}
              points={[
                L('Revered as "Jiji" by all Parijans', 'सभी परिजनों की प्रिय "जीजी"', 'ಎಲ್ಲ ಪರಿಜನರ ಪ್ರಿಯ "ಜೀಜೀ"'),
                L('Head of Vichar Kranti Abhiyan', 'विचार क्रांति अभियान की प्रमुख', 'ವಿಚಾರ ಕ್ರಾಂತಿ ಅಭಿಯಾನದ ಮುಖ್ಯಸ್ಥೆ'),
                L('Masters in Psychology', 'मनोविज्ञान में परास्नातक', 'ಮನೋವಿಜ್ಞಾನದಲ್ಲಿ ಸ್ನಾತಕೋತ್ತರ'),
              ]}
              desc={L(
                'Revered as Jiji, she is the embodiment of boundless love. Her mere darshan alleviates sufferings. Masters in Psychology from Devi Ahilya University, Indore.',
                'जीजी के रूप में पूजनीय, वे असीम प्रेम की प्रतिमूर्ति हैं। उनके दर्शन मात्र से कष्ट दूर होते हैं। देवी अहिल्या विश्वविद्यालय इंदौर से मनोविज्ञान में परास्नातक।',
                'ಜೀಜೀ ಎಂದು ಪೂಜಿಸಲ್ಪಡುವ ಅವರು ಅಪರಿಮಿತ ಪ್ರೇಮದ ಮೂರ್ತ ರೂಪ. ಅವರ ದರ್ಶನ ಮಾತ್ರದಿಂದ ಕಷ್ಟಗಳು ದೂರವಾಗುತ್ತವೆ.'
              )}
              readMoreUrl="https://www.awgp.org/en/about_us/present_mentor/shraddheya_shailbala_pandya"
              locale={locale}
            />
            <TorchbearerCard
              img="/assets/founders/chinmaya-bhaiya.jpg"
              name="Dr. Chinmay Pandya"
              role={L('Pro Vice Chancellor: DSVV', 'कुलपति: DSVV', 'ಕುಲಪತಿ: DSVV')}
              points={[
                L('Pro Vice Chancellor: DSVV', 'सह-कुलपति: देव संस्कृति विश्वविद्यालय', 'ಸಹ-ಕುಲಪತಿ: ದೇವ ಸಂಸ್ಕೃತಿ ವಿಶ್ವವಿದ್ಯಾಲಯ'),
                L('Medical Training in India & UK', 'भारत और यूके में चिकित्सा प्रशिक्षण', 'ಭಾರತ ಮತ್ತು ಯುಕೆಯಲ್ಲಿ ವೈದ್ಯಕೀಯ ತರಬೇತಿ'),
                L('Member of Royal College of Psychiatrists', 'रॉयल कॉलेज ऑफ साइकेट्रिस्ट्स के सदस्य', 'ರಾಯಲ್ ಕಾಲೇಜ್ ಆಫ್ ಸೈಕ್ಯಾಟ್ರಿಸ್ಟ್ಸ್ ಸದಸ್ಯ'),
              ]}
              desc={L(
                'Dr. Chinmay completed his medical training in India and the UK, gaining Membership of the Royal College of Psychiatrists (MRCPsych). He guides the youth in scientific spirituality.',
                'डॉ. चिन्मय ने भारत और यूके में चिकित्सा प्रशिक्षण प्राप्त किया और रॉयल कॉलेज ऑफ साइकेट्रिस्ट्स की सदस्यता हासिल की। वे युवाओं को वैज्ञानिक अध्यात्म की दिशा में मार्गदर्शन करते हैं।',
                'ಡಾ. ಚಿನ್ಮಯ್ ಭಾರತ ಮತ್ತು ಯುಕೆಯಲ್ಲಿ ವೈದ್ಯಕೀಯ ತರಬೇತಿ ಪಡೆದು ರಾಯಲ್ ಕಾಲೇಜ್ ಸದಸ್ಯತ್ವ ಗಳಿಸಿದ್ದಾರೆ. ಯುವಜನರಿಗೆ ವೈಜ್ಞಾನಿಕ ಆಧ್ಯಾತ್ಮದ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತಾರೆ.'
              )}
              readMoreUrl="https://www.awgp.org/en/about_us/present_mentor/dr_chinmay_pandya"
              locale={locale}
            />
          </div>
        </div>
      </section>

      {/* Intro banner */}
      <section className="about-intro-banner">
        <div className="about-intro-inner">
          <p className="about-intro-text">
            {L(
              'In the fast-paced world of tech, deadlines and digital overload disconnect us from ourselves. AWGP Bengaluru is a space to pause, reset, and grow from within — through meditation, Gayatri Sadhana, yoga, and selfless seva.',
              'तेज़ रफ़्तार तकनीकी दुनिया में डिजिटल अधिभार हमें स्वयं से दूर कर देते हैं। AWGP बेंगलूरु एक ऐसी जगह है जहाँ आप रुकें और भीतर से विकास करें।',
              'ವೇಗದ ತಂತ್ರಜ್ಞಾನ ಜಗತ್ತಿನಲ್ಲಿ ಡಿಜಿಟಲ್ ಒತ್ತಡ ನಮ್ಮನ್ನು ನಮ್ಮಿಂದಲೇ ದೂರ ಮಾಡುತ್ತದೆ. AWGP ಬೆಂಗಳೂರು ಒಳಗಿನಿಂದ ಬೆಳೆಯಲು ನಿಲ್ಲುವ ಜಾಗ.'
            )}
          </p>
        </div>
      </section>

      {/* Vision & Goals */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="section-inner">
          <SectionHeader
            eyebrow={L('Vision & Goals', 'दृष्टि एवं लक्ष्य', 'ದೃಷ್ಟಿ ಮತ್ತು ಗುರಿಗಳು')}
            title={L('What We Stand For', 'हम किसके लिए खड़े हैं', 'ನಾವು ಯಾವುದಕ್ಕಾಗಿ ನಿಲ್ಲುತ್ತೇವೆ')}
            ornament="🌟"
          />
          <div className="vision-grid">
            {[
              {
                icon: '🌅',
                title: L('Vision', 'दृष्टि', 'ದೃಷ್ಟಿ'),
                body: L(
                  'A world where every individual lives with wisdom, compassion, and purpose — contributing to a peaceful, awakened society.',
                  'एक ऐसी दुनिया जहां हर व्यक्ति ज्ञान, करुणा और उद्देश्य के साथ जीता है।',
                  'ಪ್ರತಿ ವ್ಯಕ್ತಿಯು ಜ್ಞಾನ, ಕರುಣೆ ಮತ್ತು ಉದ್ದೇಶದೊಂದಿಗೆ ಜೀವಿಸುವ ಜಗತ್ತು.'
                ),
              },
              {
                icon: '🎯',
                title: L('Mission', 'मिशन', 'ಮಿಷನ್'),
                body: L(
                  'To guide individuals toward inner transformation through Gayatri Sadhana, Yagya, meditation, and selfless service.',
                  'गायत्री साधना, यज्ञ, ध्यान और निःस्वार्थ सेवा के माध्यम से आंतरिक परिवर्तन की ओर मार्गदर्शन करना।',
                  'ಗಾಯತ್ರಿ ಸಾಧನೆ, ಯಜ್ಞ, ಧ್ಯಾನ ಮತ್ತು ನಿಸ್ವಾರ್ಥ ಸೇವೆಯ ಮೂಲಕ ಆಂತರಿಕ ರೂಪಾಂತರ.'
                ),
              },
              {
                icon: '🌱',
                title: L('Our Approach', 'हमारा दृष्टिकोण', 'ನಮ್ಮ ವಿಧಾನ'),
                body: L(
                  'We believe spirituality is scientific — not blind faith. Through direct experience, inquiry, and practice, seekers discover timeless truths.',
                  'हम मानते हैं कि अध्यात्म वैज्ञानिक है — अंधा विश्वास नहीं।',
                  'ಆಧ್ಯಾತ್ಮವು ವೈಜ್ಞಾನಿಕ — ಕುರುಡು ನಂಬಿಕೆ ಅಲ್ಲ ಎಂದು ನಾವು ನಂಬುತ್ತೇವೆ.'
                ),
              },
            ].map((v, i) => (
              <div key={i} className="vision-card">
                <span className="vision-icon">{v.icon}</span>
                <h3 className="vision-title">{v.title}</h3>
                <p className="vision-body">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* AWGP Global */}
      <section className="section" style={{ background: 'var(--cream-dark)' }}>
        <div className="section-inner">
          <SectionHeader
            eyebrow={L('Global Movement', 'वैश्विक आंदोलन', 'ಜಾಗತಿಕ ಆಂದೋಲನ')}
            title={L('All World Gayatri Pariwar', 'अखिल विश्व गायत्री परिवार', 'ಅಖಿಲ ವಿಶ್ವ ಗಾಯತ್ರಿ ಪರಿವಾರ')}
            ornament="🌍"
          />
          <div className="awgp-intro-grid">
            <SlideshowClient slides={AWGP_SLIDES} aspectRatio="16/9" interval={5000} />
            <div className="awgp-intro-text">
              <p>
                {L(
                  "Founded in 1971 by Pandit Shriram Sharma Acharya, the All World Gayatri Pariwar is one of the world's largest spiritual movements — uniting millions across every continent.",
                  '1971 में पं. श्रीराम शर्मा आचार्य द्वारा स्थापित, अखिल विश्व गायत्री परिवार विश्व के सबसे बड़े आध्यात्मिक आंदोलनों में से एक है।',
                  '1971ರಲ್ಲಿ ಸ್ಥಾಪಿಸಲ್ಪಟ್ಟ ಅಖಿಲ ವಿಶ್ವ ಗಾಯತ್ರಿ ಪರಿವಾರ ವಿಶ್ವದ ಅತಿದೊಡ್ಡ ಆಧ್ಯಾತ್ಮಿಕ ಆಂದೋಲನಗಳಲ್ಲಿ ಒಂದು.'
                )}
              </p>
              <p>
                {L(
                  'Shantikunj — the global HQ in Haridwar — serves as a living university of spiritual science, hosting lakhs of seekers each year for residential Shivirs, Yagyas, and experiential learning.',
                  'शांतिकुंज — हरिद्वार स्थित वैश्विक मुख्यालय — एक जीवंत आध्यात्मिक विज्ञान विश्वविद्यालय के रूप में कार्य करता है।',
                  'ಶಾಂತಿಕುಂಜ — ಹರಿದ್ವಾರದ ಜಾಗತಿಕ ಕೇಂದ್ರ — ಆಧ್ಯಾತ್ಮಿಕ ವಿಜ್ಞಾನದ ಜೀವಂತ ವಿಶ್ವವಿದ್ಯಾಲಯ.'
                )}
              </p>
            </div>
          </div>

          <div className="about-stats-grid" style={{ marginTop: '2.5rem' }}>
            {[
              { num: '15M+', label: { en: 'Members Worldwide', hi: 'विश्वव्यापी सदस्य', kn: 'ವಿಶ್ವಾದ್ಯಂತ ಸದಸ್ಯರು' } },
              { num: '100+', label: { en: 'Countries', hi: 'देश', kn: 'ದೇಶಗಳು' } },
              { num: '3000+', label: { en: 'Books by Gurudev', hi: 'गुरुदेव की पुस्तकें', kn: 'ಗುರುದೇವರ ಪುಸ್ತಕಗಳು' } },
              { num: '1971', label: { en: 'Year Founded', hi: 'स्थापना वर्ष', kn: 'ಸ್ಥಾಪನೆ ವರ್ಷ' } },
            ].map((s, i) => (
              <div key={i} className="about-stat-card">
                <span className="about-stat-num">{s.num}</span>
                <span className="about-stat-label">{s.label[locale] || s.label.en}</span>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href="https://www.awgp.org/en" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {L('Visit AWGP.org →', 'AWGP वेबसाइट देखें →', 'AWGP ವೆಬ್‌ಸೈಟ್ ನೋಡಿ →')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function TorchbearerCard({ img, name, role, points, desc, readMoreUrl, locale }) {
  const readMoreLabel = locale === 'hi' ? 'और पढ़ें →' : locale === 'kn' ? 'ಇನ್ನಷ್ಟು ಓದಿ →' : 'Read More →';
  return (
    <div className="torchbearer-card">
      <div className="torchbearer-img-wrap">
        <Image src={img} alt={name} fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="(max-width:640px) 90vw, 33vw" />
        <div className="torchbearer-img-bar" />
      </div>
      <div className="torchbearer-body">
        <h3 className="torchbearer-name">{name}</h3>
        <span className="torchbearer-role">{role}</span>
        <ul className="torchbearer-points">
          {points.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
        <p className="torchbearer-desc">{desc}</p>
        <a href={readMoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary torchbearer-btn">
          {readMoreLabel}
        </a>
      </div>
    </div>
  );
}

function FounderCard({ img, name, role, desc }) {
  return (
    <div className="founder-card">
      <div className="founder-img-wrap">
        <div className="founder-halo" />
        <Image
          src={img}
          alt={name}
          width={150}
          height={150}
          className="founder-img"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>
      <div className="founder-body">
        <h3 className="founder-name">{name}</h3>
        <span className="founder-role">{role}</span>
        <p className="founder-desc">{desc}</p>
      </div>
    </div>
  );
}
