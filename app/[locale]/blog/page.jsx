import { Link } from '../../../lib/i18n/navigation';
import Image from 'next/image';
import HeroSection from '../../../components/ui/HeroSection';
import blogData from '../../../data/blog.json';
import './Blog.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { en: 'Blogs — AWGP Bengaluru', hi: 'ब्लॉग — AWGP बेंगलूरु', kn: 'ಬ್ಲಾಗ್ — AWGP ಬೆಂಗಳೂರು' };
  return { title: titles[locale] || titles.en };
}

const formatDate = (iso, locale) => {
  const map = { hi: 'hi-IN', kn: 'kn-IN', en: 'en-IN' };
  try {
    return new Date(iso).toLocaleDateString(map[locale] || 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return iso;
  }
};

export default async function BlogIndexPage({ params }) {
  const { locale } = await params;
  const L = (obj) => (obj && (obj[locale] || obj.en)) || '';

  const posts = [...blogData].sort((a, b) => new Date(b.date) - new Date(a.date));
  const [featured, ...rest] = posts;
  const readLabel = (m) => (locale === 'hi' ? `${m} मिनट पढ़ें` : locale === 'kn' ? `${m} ನಿಮಿಷ ಓದು` : `${m} min read`);
  const readMore = locale === 'hi' ? 'पूरा पढ़ें' : locale === 'kn' ? 'ಮುಂದೆ ಓದಿ' : 'Read More';

  return (
    <>
      <HeroSection
        title={locale === 'hi' ? 'ब्लॉग एवं विचार' : locale === 'kn' ? 'ಬ್ಲಾಗ್ ಮತ್ತು ಚಿಂತನೆ' : 'Blog & Reflections'}
        subtitle={locale === 'hi' ? 'ज्ञान, साधना और जीवन-परिवर्तन की प्रेरक कहानियाँ' : locale === 'kn' ? 'ಜ್ಞಾನ, ಸಾಧನೆ ಮತ್ತು ಜೀವನ-ಪರಿವರ್ತನೆಯ ಪ್ರೇರಕ ಕಥೆಗಳು' : 'Insights, reflections, and stories of inner transformation'}
      />
      <section className="blog-section">
        <div className="section-inner">

          {/* Featured post */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="blog-featured">
              <div className="blog-featured__media">
                <Image
                  src={featured.image}
                  alt={L(featured.title)}
                  fill
                  sizes="(max-width: 900px) 100vw, 55vw"
                  style={{ objectFit: 'cover' }}
                  priority
                />
                <span className="blog-featured__scrim" aria-hidden="true" />
              </div>
              <div className="blog-featured__body">
                <span className="blog-chip">{L(featured.category)}</span>
                <h2 className="blog-featured__title">{L(featured.title)}</h2>
                <p className="blog-featured__excerpt">{L(featured.excerpt)}</p>
                <span className="blog-meta">
                  {formatDate(featured.date, locale)} · {readLabel(featured.readMins)}
                </span>
                <span className="blog-featured__cta">{readMore} →</span>
              </div>
            </Link>
          )}

          {/* Rest of the posts */}
          {rest.length > 0 && (
            <div className="blog-grid">
              {rest.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="blog-card">
                  <div className="blog-card__media">
                    <Image
                      src={post.image}
                      alt={L(post.title)}
                      fill
                      sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <span className="blog-chip blog-chip--float">{L(post.category)}</span>
                  </div>
                  <div className="blog-card__body">
                    <h3 className="blog-card__title">{L(post.title)}</h3>
                    <p className="blog-card__excerpt">{L(post.excerpt)}</p>
                    <span className="blog-meta">
                      {formatDate(post.date, locale)} · {readLabel(post.readMins)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
