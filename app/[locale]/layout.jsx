import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../lib/i18n/routing';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import LangBodySync from '../../components/layout/LangBodySync';
import WhatsAppButton from '../../components/layout/WhatsAppButton';
import BottomNav from '../../components/layout/BottomNav';
import JsonLd from '../../components/seo/JsonLd';
import { siteGraph } from '../../lib/seo/schema';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {/* Site-wide entity graph: Organization (NGO) + LocalBusiness + WebSite */}
      <JsonLd data={siteGraph(locale)} id="site-graph" />
      <LangBodySync locale={locale} />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <BottomNav />
    </NextIntlClientProvider>
  );
}
