import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../lib/i18n/routing';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import LangBodySync from '../../components/layout/LangBodySync';

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
      <LangBodySync locale={locale} />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
