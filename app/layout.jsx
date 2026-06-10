import { Kumbh_Sans, Nunito_Sans, Mukta, Noto_Sans_Kannada } from 'next/font/google';
import './globals.css';

const kumbhSans = Kumbh_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-primary',
  display: 'swap',
});

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-nunito',
  display: 'swap',
});

const mukta = Mukta({
  subsets: ['latin', 'devanagari'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-mukta',
  display: 'swap',
});

const notoKannada = Noto_Sans_Kannada({
  subsets: ['kannada'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-kn',
  display: 'swap',
});

export const metadata = {
  title: 'AWGP Bengaluru — Gayatri Chetna Kendra',
  description:
    'All World Gayatri Pariwar Bengaluru — a centre of spiritual practice, service, and community rooted in the Gayatri tradition.',
  keywords: 'AWGP, Gayatri Pariwar, Bengaluru, Shantikunj, Yagya, Sanskar',
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={`${kumbhSans.variable} ${nunitoSans.variable} ${mukta.variable} ${notoKannada.variable}`}>
        {children}
      </body>
    </html>
  );
}
