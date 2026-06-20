import { notFound } from 'next/navigation';
import { Link } from '../../../../lib/i18n/navigation';
import PageHeader from '../../../../components/ui/PageHeader';
import Image from 'next/image';
import blogData from '../../../../data/blog.json';
import '../../blog/Blog.css';

export async function generateStaticParams() {
  return blogData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const post = blogData.find((p) => p.slug === slug);
  if (!post) return {};
  const title = post.title[locale] || post.title.en;
  const description = post.excerpt[locale] || post.excerpt.en;
  return { title: `${title} — AWGP Bengaluru`, description };
}

const formatDate = (iso, locale) => {
  const map = { hi: 'hi-IN', kn: 'kn-IN', en: 'en-IN' };
  try {
    return new Date(iso).toLocaleDateString(map[locale] || 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return iso;
  }
};

export default async function BlogPostPage({ params }) {
  const { locale, slug } = await params;
  const post = blogData.find((p) => p.slug === slug);
  if (!post) notFound();

  const L = (obj) => (obj && (obj[locale] || obj.en)) || '';
  const body = post.body[locale] || post.body.en || [];
  const readLabel = locale === 'hi' ? `${post.readMins} मिनट पढ़ें` : locale === 'kn' ? `${post.readMins} ನಿಮಿಷ ಓದು` : `${post.readMins} min read`;

  const related = blogData.filter((p) => p.slug !== slug).slice(0, 3);
  const moreLabel = locale === 'hi' ? 'और पढ़ें' : locale === 'kn' ? 'ಇನ್ನಷ್ಟು ಓದಿ' : 'More from the Blog';
  const backLabel = locale === 'hi' ? '← सभी लेख' : locale === 'kn' ? '← ಎಲ್ಲಾ ಲೇಖನಗಳು' : '← All Posts';

  return (
    <>
      <PageHeader
        eyebrow={`AWGP Bengaluru · ${L(post.category)}`}
        title={L(post.title)}
        subtitle={`${L(post.author)} · ${formatDate(post.date, locale)} · ${readLabel}`}
      />

      <article className="blog-section">
        <div className="section-inner blog-article">
          <Link href="/blog" className="blog-back">{backLabel}</Link>

          <div className="blog-article__cover">
            <Image
              src={post.image}
              alt={L(post.title)}
              fill
              sizes="(max-width: 800px) 100vw, 760px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>

          <div className="blog-prose">
            {body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="blog-share-strip">
            <span>{locale === 'hi' ? 'इस लेख को साझा करें' : locale === 'kn' ? 'ಈ ಲೇಖನವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ' : 'Found this useful? Share it.'}</span>
            <a
              href="https://wa.me/919243755613"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="blog-section blog-related">
          <div className="section-inner">
            <h2 className="blog-related__head">{moreLabel}</h2>
            <div className="blog-grid">
              {related.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="blog-card">
                  <div className="blog-card__media">
                    <Image
                      src={p.image}
                      alt={L(p.title)}
                      fill
                      sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <span className="blog-chip blog-chip--float">{L(p.category)}</span>
                  </div>
                  <div className="blog-card__body">
                    <h3 className="blog-card__title">{L(p.title)}</h3>
                    <p className="blog-card__excerpt">{L(p.excerpt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
