import GalleryClient from '../../../../components/ui/GalleryClient';
import '../../../../components/ui/Media.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { en: 'Gallery — AWGP Bengaluru', hi: 'गैलरी — AWGP बेंगलूरु', kn: 'ಗ್ಯಾಲರಿ — AWGP ಬೆಂಗಳೂರು' };
  return { title: titles[locale] || titles.en };
}

export default async function GalleryPage() {
  return (
    <section className="media-section media-section--top">
      <div className="section-inner">
        <GalleryClient />
      </div>
    </section>
  );
}
