import HeroSection from '../../../components/ui/HeroSection';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { en: 'Sanyam — AWGP Bengaluru', hi: 'संयम — AWGP बेंगलूरु', kn: 'ಸಂಯಮ — AWGP ಬೆಂಗಳೂರು' };
  return { title: titles[locale] || titles.en };
}

export default async function SanyamPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <HeroSection
        eyebrow="AWGP Bengaluru"
        title={locale === 'hi' ? 'संयम' : locale === 'kn' ? 'ಸಂಯಮ' : 'Sanyam'}
        subtitle={locale === 'hi' ? 'संयम और आत्म-अनुशासन' : locale === 'kn' ? 'ಸಂಯಮ ಮತ್ತು ಆತ್ಮ-ಶಿಸ್ತು' : 'Discipline & Self-Restraint'}
        bgColor="linear-gradient(135deg, #1A3D1A 0%, #2E5C2E 100%)"
      />
      <section className="section">
        <div className="section-inner" style={{ padding: '3rem 0', textAlign: 'center' }}>
          <h2>
            {locale === 'hi' ? 'संयम' : locale === 'kn' ? 'ಸಂಯಮ' : 'Sanyam'}
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
