import HeroSection from '../../../components/ui/HeroSection';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { en: 'Literature — AWGP Bengaluru', hi: 'साहित्य — AWGP बेंगलूरु', kn: 'ಸಾಹಿತ್ಯ — AWGP ಬೆಂಗಳೂರು' };
  return { title: titles[locale] || titles.en };
}

export default async function LiteraturePage({ params }) {
  const { locale } = await params;
  return (
    <>
      <HeroSection
        eyebrow="AWGP Bengaluru"
        title={locale === 'hi' ? 'साहित्य' : locale === 'kn' ? 'ಸಾಹಿತ್ಯ' : 'Literature'}
        subtitle={locale === 'hi' ? 'गायत्री परिवार का साहित्य और प्रकाशन' : locale === 'kn' ? 'ಗಾಯತ್ರಿ ಪರಿವಾರದ ಸಾಹಿತ್ಯ ಮತ್ತು ಪ್ರಕಾಶನಗಳು' : 'Publications & Sacred Literature of Gayatri Pariwar'}
        bgColor="linear-gradient(135deg, #2A1A0A 0%, #5C3D10 100%)"
      />
      <section className="section">
        <div className="section-inner" style={{ padding: '3rem 0', textAlign: 'center' }}>
          <h2>
            {locale === 'hi' ? 'साहित्य' : locale === 'kn' ? 'ಸಾಹಿತ್ಯ' : 'Literature'}
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
