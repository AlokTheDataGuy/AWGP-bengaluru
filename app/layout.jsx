import { Mukta, Noto_Sans_Kannada, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import SiteLoader from '../components/ui/SiteLoader';

// Source Sans 3 — humanist text sans used as the English body/UI face
// (warmer & more legible than the geometric Jost it replaced).
const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-source',
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
      <body className={`${mukta.variable} ${notoKannada.variable} ${sourceSans.variable}`}>
        <SiteLoader />
        {children}
      </body>
    </html>
  );
}
