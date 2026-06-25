import { Jost, Mukta, Noto_Sans_Kannada } from 'next/font/google';
import './globals.css';
import SiteLoader from '../components/ui/SiteLoader';

// Jost — open-source geometric sans in the Futura/Renner lineage,
// matching the Samadhi theme's "Renner" body/UI typeface.
const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
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
      <body className={`${jost.variable} ${mukta.variable} ${notoKannada.variable}`}>
        <SiteLoader />
        {children}
      </body>
    </html>
  );
}
