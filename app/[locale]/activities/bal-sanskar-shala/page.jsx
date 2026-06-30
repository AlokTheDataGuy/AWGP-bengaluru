import Breadcrumbs from '../../../../components/seo/Breadcrumbs';
import InitiativeArticle from '../../../../components/initiatives/InitiativeArticle';
import { buildMetadata } from '../../../../lib/seo/metadata';
import data from '../../../../data-json-files/activities/baal-sanskar-shala.json';
import { PHOTO_MANIFEST } from '../../../../lib/photoManifest';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/activities/bal-sanskar-shala',
    title: data.meta.navLabel,
    description: data.meta.seoDescription,
    images: ['/assets/programs/bal-sanskar-shala.jpg'],
  });
}

export default async function BalSanskarShalaPage({ params }) {
  const { locale } = await params;
  const L = (obj) => (obj && (obj[locale] || obj.en)) || '';
  const photos = PHOTO_MANIFEST['bss'] || [];

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { name: locale === 'hi' ? 'होम' : locale === 'kn' ? 'ಮುಖಪುಟ' : 'Home', path: '/' },
          { name: locale === 'hi' ? 'गतिविधियां' : locale === 'kn' ? 'ಚಟುವಟಿಕೆಗಳು' : 'Activities', path: '/activities' },
          { name: L(data.meta.navLabel), path: '/activities/bal-sanskar-shala' },
        ]}
      />
      <InitiativeArticle
        locale={locale}
        data={data}
        sectionImage="/assets/programs/bal-sanskar-shala.jpg"
        gallery={photos}
        cardsHeading={{ en: 'What Children Do', hi: 'बच्चे क्या करते हैं', kn: 'ಮಕ್ಕಳು ಏನು ಮಾಡುತ್ತಾರೆ' }}
        backHref={{ href: '/activities', label: { en: '← All Activities', hi: '← सभी गतिविधियां', kn: '← ಎಲ್ಲಾ ಚಟುವಟಿಕೆಗಳು' } }}
      />
    </>
  );
}
