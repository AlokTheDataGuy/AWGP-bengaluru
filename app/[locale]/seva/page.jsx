import HeroSection from '../../../components/ui/HeroSection';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { en: 'Seva — AWGP Bengaluru', hi: 'सेवा — AWGP बेंगलूरु', kn: 'ಸೇವೆ — AWGP ಬೆಂಗಳೂರು' };
  return { title: titles[locale] || titles.en };
}

export default async function SevaPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <HeroSection
        eyebrow="AWGP Bengaluru"
        title={locale === 'hi' ? 'सेवा' : locale === 'kn' ? 'ಸೇವೆ' : 'Seva'}
        subtitle={locale === 'hi' ? 'निस्वार्थ सेवा और समाज कल्याण' : locale === 'kn' ? 'ನಿಸ್ವಾರ್ಥ ಸೇವೆ ಮತ್ತು ಸಮಾಜ ಕಲ್ಯಾಣ' : 'Selfless Service & Social Welfare'}
        bgColor="linear-gradient(135deg, #3D1A0A 0%, #6B3210 100%)"
      />
      <section className="section">
        <div className="section-inner" style={{ padding: '3rem 0', textAlign: 'center' }}>
          <h2>
            {locale === 'hi' ? 'सेवा' : locale === 'kn' ? 'ಸೇವೆ' : 'Seva'}
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
