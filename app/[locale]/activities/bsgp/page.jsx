import { Link } from '../../../../lib/i18n/navigation';
import Breadcrumbs from '../../../../components/seo/Breadcrumbs';
import InitiativeArticle from '../../../../components/initiatives/InitiativeArticle';
import { buildMetadata } from '../../../../lib/seo/metadata';
import data from '../../../../data-json-files/activities/bhartiya-sanskriti-gyan-pariksha.json';
import { PHOTO_MANIFEST } from '../../../../lib/photoManifest';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/activities/bsgp',
    title: data.meta.navLabel,
    description: data.meta.seoDescription,
    images: ['/assets/activities/bsgp.jpg'],
  });
}

export default async function BsgpPage({ params }) {
  const { locale } = await params;
  const L = (obj) => (obj && (obj[locale] || obj.en)) || '';
  const photos = PHOTO_MANIFEST['bsgp'] || [];

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { name: locale === 'hi' ? 'होम' : locale === 'kn' ? 'ಮುಖಪುಟ' : 'Home', path: '/' },
          { name: locale === 'hi' ? 'गतिविधियां' : locale === 'kn' ? 'ಚಟುವಟಿಕೆಗಳು' : 'Activities', path: '/activities' },
          { name: L(data.meta.navLabel), path: '/activities/bsgp' },
        ]}
      />
      <InitiativeArticle
        locale={locale}
        data={data}
        sectionImage="/assets/activities/bsgp.jpg"
        gallery={photos}
        cardsHeading={{ en: 'What BSGP Builds', hi: 'BSGP क्या गढ़ती है', kn: 'BSGP ಏನನ್ನು ಕಟ್ಟುತ್ತದೆ' }}
        backHref={{ href: '/activities', label: { en: '← All Activities', hi: '← सभी गतिविधियां', kn: '← ಎಲ್ಲಾ ಚಟುವಟಿಕೆಗಳು' } }}
      />
    </>
  );
}
