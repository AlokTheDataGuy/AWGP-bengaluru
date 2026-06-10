import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow local images — update if you move to a CDN later
    localPatterns: [{ pathname: '/assets/**' }],
  },
};

export default withNextIntl(nextConfig);
