import { getBlogPosts } from '../../lib/content';
import HomeBlogView from './HomeBlogView';

/* Server component: reads blog.json, resolves the active locale, and trims each
   post down to just the fields the teaser needs. Doing this server-side keeps the
   posts' long multilingual `body` essays out of the client bundle — only the three
   newest cards' resolved strings cross the boundary to the animated client view. */

const LOCALE_TAG = { hi: 'hi-IN', kn: 'kn-IN', en: 'en-IN' };

const HEAD = {
  en: {
    eyebrow: 'Insights & Reflections',
    title: 'From Our Blog',
    sub: 'Thoughts on sadhana, seva and the science of inner change — short reads from the Gayatri Pariwar.',
    viewAll: 'All Articles',
    readMore: 'Read Article',
  },
  hi: {
    eyebrow: 'विचार एवं चिंतन',
    title: 'हमारा ब्लॉग',
    sub: 'साधना, सेवा और आंतरिक परिवर्तन के विज्ञान पर विचार — गायत्री परिवार से कुछ संक्षिप्त लेख।',
    viewAll: 'सभी लेख',
    readMore: 'पूरा पढ़ें',
  },
  kn: {
    eyebrow: 'ವಿಚಾರ ಮತ್ತು ಚಿಂತನೆ',
    title: 'ನಮ್ಮ ಬ್ಲಾಗ್',
    sub: 'ಸಾಧನೆ, ಸೇವೆ ಮತ್ತು ಆಂತರಿಕ ಪರಿವರ್ತನೆಯ ವಿಜ್ಞಾನದ ಕುರಿತು ವಿಚಾರಗಳು — ಗಾಯತ್ರಿ ಪರಿವಾರದಿಂದ ಕೆಲವು ಸಂಕ್ಷಿಪ್ತ ಲೇಖನಗಳು.',
    viewAll: 'ಎಲ್ಲಾ ಲೇಖನಗಳು',
    readMore: 'ಲೇಖನ ಓದಿ',
  },
};

function formatDate(iso, locale) {
  try {
    return new Date(iso).toLocaleDateString(LOCALE_TAG[locale] || 'en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

function readLabel(mins, locale) {
  return locale === 'hi'
    ? `${mins} मिनट पढ़ें`
    : locale === 'kn'
      ? `${mins} ನಿಮಿಷ ಓದು`
      : `${mins} min read`;
}

export default function HomeBlog({ locale = 'en' }) {
  const L = (obj) => (obj && (obj[locale] || obj.en)) || '';

  const posts = [...getBlogPosts()]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      image: p.image,
      category: L(p.category),
      title: L(p.title),
      excerpt: L(p.excerpt),
      date: formatDate(p.date, locale),
      read: readLabel(p.readMins, locale),
    }));

  if (posts.length === 0) return null;

  return <HomeBlogView posts={posts} head={HEAD[locale] || HEAD.en} />;
}
