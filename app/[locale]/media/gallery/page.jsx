import GalleryClient from '../../../../components/ui/GalleryClient';
import HeroSection from '../../../../components/ui/HeroSection';
import { buildMetadata } from '../../../../lib/seo/metadata';
import '../../../../components/ui/Media.css';

const GALLERY_TITLE = {
  en: 'Photo Gallery — Programs, Yagya & Seva',
  hi: 'फोटो गैलरी — कार्यक्रम, यज्ञ एवं सेवा',
  kn: 'ಫೋಟೋ ಗ್ಯಾಲರಿ — ಕಾರ್ಯಕ್ರಮಗಳು, ಯಜ್ಞ ಮತ್ತು ಸೇವೆ',
};
const GALLERY_DESC = {
  en: 'Photos from AWGP Bengaluru — Yagyas, festivals, meditation, Sanskars and community seva at the Gayatri Chetna Kendra, Begur.',
  hi: 'AWGP बेंगलूरु की तस्वीरें — गायत्री चेतना केंद्र, बेगूर में यज्ञ, उत्सव, ध्यान, संस्कार एवं सामुदायिक सेवा।',
  kn: 'AWGP ಬೆಂಗಳೂರಿನ ಫೋಟೋಗಳು — ಗಾಯತ್ರಿ ಚೇತನ ಕೇಂದ್ರ, ಬೇಗೂರಿನಲ್ಲಿ ಯಜ್ಞ, ಹಬ್ಬ, ಧ್ಯಾನ, ಸಂಸ್ಕಾರ ಮತ್ತು ಸಮುದಾಯ ಸೇವೆ.',
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({ locale, path: '/media/gallery', title: GALLERY_TITLE, description: GALLERY_DESC });
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
