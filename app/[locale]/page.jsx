import Hero from '../../components/sections/Hero';
import HomeWelcome from '../../components/sections/HomeWelcome';
import HomePillars from '../../components/sections/HomePillars';
import HomeCards from '../../components/sections/HomeCards';
import HomeStats from '../../components/sections/HomeStats';
import HomeEvents from '../../components/sections/HomeEvents';
import HomeChetna from '../../components/sections/HomeChetna';
import GalleryStrip from '../../components/sections/GalleryStrip';
import HomeCTA from '../../components/sections/HomeCTA';
import HomeGallery from '../../components/sections/HomeGallery';
import HomeContact from '../../components/sections/HomeContact';
import './Homepage.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = {
    en: 'AWGP Bengaluru — Gayatri Chetna Kendra',
    hi: 'AWGP बेंगलूरु — गायत्री चेतना केंद्र',
    kn: 'AWGP ಬೆಂಗಳೂರು — ಗಾಯತ್ರಿ ಚೇತನ ಕೇಂದ್ರ',
  };
  return { title: titles[locale] || titles.en };
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  return (
    <div className="homepage">
      <Hero />
      <HomeWelcome />
      <HomePillars />
      <HomeCards />
      <HomeStats />
      <HomeEvents locale={locale} />
      <HomeChetna />
      <GalleryStrip />      
      <HomeContact />
      <HomeCTA />         
      <HomeGallery />
    </div>
  );
}
