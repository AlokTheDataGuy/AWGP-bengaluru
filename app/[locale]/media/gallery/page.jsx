import GalleryClient from '../../../../components/ui/GalleryClient';
import HeroSection from '../../../../components/ui/HeroSection';
import '../../../../components/ui/Media.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { en: 'Gallery — AWGP Bengaluru', hi: 'गैलरी — AWGP बेंगलूरु', kn: 'ಗ್ಯಾಲರಿ — AWGP ಬೆಂಗಳೂರು' };
  return { title: titles[locale] || titles.en };
}

export default async function GalleryPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <HeroSection
        title={locale === 'hi' ? 'फोटो गैलरी' : locale === 'kn' ? 'ಫೋಟೋ ಗ್ಯಾಲರಿ' : 'Photo Gallery'}
        subtitle={locale === 'hi' ? 'हमारे कार्यक्रमों और सेवा गतिविधियों के अनमोल पल' : locale === 'kn' ? 'ನಮ್ಮ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಸೇವಾ ಚಟುವಟಿಕೆಗಳ ಅಮೂಲ್ಯ ಕ್ಷಣಗಳು' : 'Glimpses of our programs, celebrations, and seva activities'}
      />
      <section className="media-section">
        <div className="section-inner">
          <GalleryClient />
        </div>
      </section>
    </>
  );
}
