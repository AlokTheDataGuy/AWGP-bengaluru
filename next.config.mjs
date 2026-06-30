import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hide the dev-only Next.js indicator (the "N" badge) so it doesn't
  // overlap the mobile bottom nav. Has no effect on production builds.
  devIndicators: false,
  // Some server components read photo folders via fs.readdirSync(public/assets/…)
  // at build time (getPhotos). Next's file-tracer then conservatively bundles the
  // entire 430MB public/ tree into those serverless functions, blowing past
  // Vercel's 250MB limit. public/ is served by the CDN, never from a function, so
  // exclude it from the trace. Image URLs (/assets/…) are unaffected.
  outputFileTracingExcludes: {
    '**': ['./public/**'],
  },
  images: {
    // Allow local images — update if you move to a CDN later
    localPatterns: [{ pathname: '/assets/**' }],
    // Required from Next.js 16: every quality used must be listed.
    // 75 is the default for <Image> without a quality prop; 90 is used in Hero.jsx.
    qualities: [75, 90],
  },
};

export default withNextIntl(nextConfig);
