import { getTranslations } from 'next-intl/server';
import HeroSection from '../../../components/ui/HeroSection';
import ContactBody from './ContactBody';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = {
    en: 'Contact — AWGP Bengaluru',
    hi: 'संपर्क — AWGP बेंगलूरु',
    kn: 'ಸಂಪರ್ಕ — AWGP ಬೆಂಗಳೂರು',
  };
  return { title: titles[locale] || titles.en };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <>
      <HeroSection
        eyebrow="AWGP Bengaluru"
        title={t('contact_title')}
        subtitle={t('contact_subtitle')}
        mantra="॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥"
      />
      <ContactBody locale={locale} />
    </>
  );
}
