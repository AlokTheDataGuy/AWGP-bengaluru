import Hero from '../../components/sections/Hero';
import HomeWelcome from '../../components/sections/HomeWelcome';
import HomePillars from '../../components/sections/HomePillars';
import HomePath from '../../components/sections/HomePath';
import HomeStats from '../../components/sections/HomeStats';
import HomePrograms from '../../components/sections/HomePrograms';
import HomeHighlights from '../../components/sections/HomeHighlights';
import HomeChetna from '../../components/sections/HomeChetna';
import HomeBlog from '../../components/sections/HomeBlog';
import GalleryStrip from '../../components/sections/GalleryStrip';
import HomeCTA from '../../components/sections/HomeCTA';
import HomeGallery from '../../components/sections/HomeGallery';
import HomeContact from '../../components/sections/HomeContact';
import FaqSection from '../../components/seo/FaqSection';
import { buildMetadata } from '../../lib/seo/metadata';
import { getFaqs } from '../../lib/seo/faqs';
import './Homepage.css';

const HOME_TITLE = {
  en: 'AWGP Bengaluru — Gayatri Pariwar Bangalore | Gayatri Chetna Kendra',
  hi: 'AWGP बेंगलूरु — गायत्री परिवार बैंगलोर | गायत्री चेतना केंद्र',
  kn: 'AWGP ಬೆಂಗಳೂರು — ಗಾಯತ್ರಿ ಪರಿವಾರ ಬೆಂಗಳೂರು | ಗಾಯತ್ರಿ ಚೇತನ ಕೇಂದ್ರ',
};

const FAQ_LABELS = {
  eyebrow: { en: 'Common Questions', hi: 'सामान्य प्रश्न', kn: 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು' },
  heading: { en: 'Frequently Asked Questions', hi: 'अक्सर पूछे जाने वाले प्रश्न', kn: 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು' },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/',
    title: HOME_TITLE,
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  return (
    <div className="homepage">
      <Hero />
      <HomeWelcome />
      <HomeStats />
      <HomePath />
      <HomePillars />

      <HomePrograms locale={locale} />
      <HomeHighlights />
      <HomeBlog locale={locale} />

      <HomeChetna />      <HomeContact />

      <HomeGallery />
      <FaqSection
        items={getFaqs('home', locale)}
        eyebrow={FAQ_LABELS.eyebrow[locale] || FAQ_LABELS.eyebrow.en}
        heading={FAQ_LABELS.heading[locale] || FAQ_LABELS.heading.en}
        id="home-faq"
      />
      <HomeCTA />
    </div>
  );
}
