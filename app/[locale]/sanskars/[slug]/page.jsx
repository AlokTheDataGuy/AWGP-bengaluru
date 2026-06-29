import { notFound } from 'next/navigation';
import data from '../../../../data-json-files/sanskars/sanskars.json';
import { SANSKAR_IMG, SANSKAR_STAGE } from '../sanskarMeta';
import HeroSection from '../../../../components/ui/HeroSection';
import SanskarDetailView from './SanskarDetailView';
import Breadcrumbs from '../../../../components/seo/Breadcrumbs';
import { buildMetadata } from '../../../../lib/seo/metadata';
import './SanskarDetail.css';

export function generateStaticParams() {
  return data.sanskars.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const s = data.sanskars.find((x) => x.id === slug);
  if (!s) return {};
  const name = s.name[locale] || s.name.en;
  const summary = (s.summary && (s.summary[locale] || s.summary.en)) || '';
  return buildMetadata({
    locale,
    path: `/sanskars/${slug}`,
    title: { en: `${s.name.en} Sanskar`, hi: `${s.name.hi || s.name.en} संस्कार`, kn: `${s.name.kn || s.name.en} ಸಂಸ್ಕಾರ` },
    description: summary,
    images: SANSKAR_IMG[slug] ? [SANSKAR_IMG[slug]] : undefined,
  });
}

export default async function SanskarDetailPage({ params }) {
  const { locale, slug } = await params;
  const L = (o) => (o && (o[locale] ?? o.en)) || '';

  const list = data.sanskars;
  const idx = list.findIndex((x) => x.id === slug);
  if (idx === -1) notFound();
  const s = list[idx];

  const prev = idx > 0 ? list[idx - 1] : null;
  const next = idx < list.length - 1 ? list[idx + 1] : null;
  const summary = (s.summary && (s.summary[locale] || s.summary.en)) || '';

  const view = {
    name: L(s.name),
    stage: L(SANSKAR_STAGE[s.id]),
    image: SANSKAR_IMG[s.id] || null,
    intro: L(s.intro),
    whyItMatters: s.whyItMatters ? L(s.whyItMatters) : null,
    scientificPerspective: s.scientificPerspective ? L(s.scientificPerspective) : null,
    benefits: (s.benefits && (s.benefits[locale] || s.benefits.en)) || [],
    prev: prev ? { href: `/sanskars/${prev.id}`, name: L(prev.name), stage: L(SANSKAR_STAGE[prev.id]) } : null,
    next: next ? { href: `/sanskars/${next.id}`, name: L(next.name), stage: L(SANSKAR_STAGE[next.id]) } : null,
  };

  const labels = {
    whatIs:   locale === 'hi' ? 'परिचय'              : locale === 'kn' ? 'ಪರಿಚಯ'            : 'Introduction',
    why:      locale === 'hi' ? 'यह क्यों महत्वपूर्ण है' : locale === 'kn' ? 'ಇದು ಏಕೆ ಮುಖ್ಯ'     : 'Why it matters',
    science:  locale === 'hi' ? 'वैज्ञानिक दृष्टिकोण'   : locale === 'kn' ? 'ವೈಜ್ಞಾನಿಕ ದೃಷ್ಟಿಕೋನ' : 'Scientific perspective',
    benefits: locale === 'hi' ? 'लाभ'                : locale === 'kn' ? 'ಲಾಭಗಳು'           : 'Benefits',
    backAll:  locale === 'hi' ? '← सभी संस्कार'        : locale === 'kn' ? '← ಎಲ್ಲಾ ಸಂಸ್ಕಾರಗಳು' : '← All Sanskars',
    prevLbl:  locale === 'hi' ? 'पिछला'              : locale === 'kn' ? 'ಹಿಂದಿನದು'          : 'Previous',
    nextLbl:  locale === 'hi' ? 'अगला'               : locale === 'kn' ? 'ಮುಂದಿನದು'          : 'Next',
    ctaTitle:
      locale === 'hi' ? 'यह संस्कार अपने घर पर सम्पन्न कराएँ'
      : locale === 'kn' ? 'ಈ ಸಂಸ್ಕಾರವನ್ನು ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ನಡೆಸಿಸಿ'
      : 'Hold this Sanskar at your home',
    ctaText:
      locale === 'hi' ? 'AWGP बेंगलूरु के प्रशिक्षित स्वयंसेवक यह संस्कार सम्पन्न कराते हैं।'
      : locale === 'kn' ? 'AWGP ಬೆಂಗಳೂರಿನ ತರಬೇತಿ ಪಡೆದ ಸ್ವಯಂಸೇವಕರು ಈ ಸಂಸ್ಕಾರವನ್ನು ಉಚಿತವಾಗಿ ನಡೆಸುತ್ತಾರೆ.'
      : 'Trained volunteers at AWGP Bengaluru performs this Sanskar.',
    ctaBtn:   locale === 'hi' ? 'संपर्क करें' : locale === 'kn' ? 'ಸಂಪರ್ಕಿಸಿ' : 'Get in touch',
    readMore: locale === 'hi' ? 'और पढ़ें'    : locale === 'kn' ? 'ಇನ್ನಷ್ಟು ಓದಿ' : 'Read more',
    readLess: locale === 'hi' ? 'कम करें'     : locale === 'kn' ? 'ಕಡಿಮೆ ಮಾಡಿ'  : 'Read less',
  };

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { name: locale === 'hi' ? 'होम' : locale === 'kn' ? 'ಮುಖಪುಟ' : 'Home', path: '/' },
          { name: locale === 'hi' ? 'संस्कार' : locale === 'kn' ? 'ಸಂಸ್ಕಾರಗಳು' : 'Sanskars', path: '/sanskars' },
          { name: view.name, path: `/sanskars/${slug}` },
        ]}
      />
      <HeroSection
        title={view.name}
        subtitle={summary || undefined}
      />
      <SanskarDetailView view={view} labels={labels} />
    </>
  );
}
