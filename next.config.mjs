import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow local images — update if you move to a CDN later
    localPatterns: [{ pathname: '/assets/**' }],
    // Required from Next.js 16: every quality used must be listed.
    // 75 is the default for <Image> without a quality prop; 90 is used in Hero.jsx.
    qualities: [75, 90],
  },
};

export default withNextIntl(nextConfig);
