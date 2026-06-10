import HeroSection from '../../../components/ui/HeroSection';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { en: 'Sadhana — AWGP Bengaluru', hi: 'साधना — AWGP बेंगलूरु', kn: 'ಸಾಧನೆ — AWGP ಬೆಂಗಳೂರು' };
  return { title: titles[locale] || titles.en };
}

export default async function SadhanaPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <HeroSection
        eyebrow="AWGP Bengaluru"
        title={locale === 'hi' ? 'साधना' : locale === 'kn' ? 'ಸಾಧನೆ' : 'Sadhana'}
        subtitle={locale === 'hi' ? 'आध्यात्मिक साधना का मार्ग' : locale === 'kn' ? 'ಆಧ್ಯಾತ್ಮಿಕ ಅಭ್ಯಾಸದ ಮಾರ್ಗ' : 'The Path of Spiritual Practice'}
        bgImage="/assets/programs/akhand-jap.jpeg"
        bgColor="linear-gradient(135deg, #7B1C1C 0%, #3D1F0A 100%)"
        mantra="॥ ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥"
      />
      <section className="section">
        <div className="section-inner" style={{ padding: '3rem 0', textAlign: 'center' }}>
          <h2>
            {locale === 'hi' ? 'साधना' : locale === 'kn' ? 'ಸಾಧನೆ' : 'Sadhana'}
          </h2>
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
            {locale === 'hi'
              ? 'TODO: यह पृष्ठ शीघ्र आएगा।'
              : locale === 'kn'
              ? 'TODO: ಈ ಪುಟ ಶೀಘ್ರದಲ್ಲಿ ಬರಲಿದೆ.'
              : 'TODO: This page is coming soon.'}
          </p>
        </div>
      </section>
    </>
  );
}
