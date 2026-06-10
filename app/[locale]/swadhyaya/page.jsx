import HeroSection from '../../../components/ui/HeroSection';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { en: 'Swadhyaya — AWGP Bengaluru', hi: 'स्वाध्याय — AWGP बेंगलूरु', kn: 'ಸ್ವಾಧ್ಯಾಯ — AWGP ಬೆಂಗಳೂರು' };
  return { title: titles[locale] || titles.en };
}

export default async function SwadhyayaPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <HeroSection
        eyebrow="AWGP Bengaluru"
        title={locale === 'hi' ? 'स्वाध्याय' : locale === 'kn' ? 'ಸ್ವಾಧ್ಯಾಯ' : 'Swadhyaya'}
        subtitle={locale === 'hi' ? 'स्वयं का अध्ययन और ज्ञान' : locale === 'kn' ? 'ಸ್ವಯಂ ಅಧ್ಯಯನ ಮತ್ತು ಜ್ಞಾನ' : 'Self-Study & Sacred Knowledge'}
        bgColor="linear-gradient(135deg, #0A2A3D 0%, #1A4A6B 100%)"
      />
      <section className="section">
        <div className="section-inner" style={{ padding: '3rem 0', textAlign: 'center' }}>
          <h2>
            {locale === 'hi' ? 'स्वाध्याय' : locale === 'kn' ? 'ಸ್ವಾಧ್ಯಾಯ' : 'Swadhyaya'}
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
