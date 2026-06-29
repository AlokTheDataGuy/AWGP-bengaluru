import { notFound } from 'next/navigation';
import { Link } from '../../../../lib/i18n/navigation';
import PageHeader from '../../../../components/ui/PageHeader';
import Image from 'next/image';
import {
  Facebook, Instagram, Youtube, MessageCircle, Mail, ArrowRight,
} from 'lucide-react';
import blogData from '../../../../data/blog.json';
import Breadcrumbs from '../../../../components/seo/Breadcrumbs';
import JsonLd from '../../../../components/seo/JsonLd';
import { buildMetadata, localeUrl } from '../../../../lib/seo/metadata';
import { articleSchema } from '../../../../lib/seo/schema';
import '../../blog/Blog.css';

const JOIN_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSenAHsGkgiiYVh4GkGFiV6XAFFEFqTk4LNEA0U20KiBAnHoFA/viewform?fbzx=-8132684196568383509';

export async function generateStaticParams() {
  return blogData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const post = blogData.find((p) => p.slug === slug);
  if (!post) return {};
  const title = post.title[locale] || post.title.en;
  const description = post.excerpt[locale] || post.excerpt.en;
  return buildMetadata({
    locale,
    path: `/blog/${slug}`,
    title,
    description,
    type: 'article',
    images: post.image ? [post.image] : undefined,
    openGraph: {
      publishedTime: post.date,
      authors: [post.author?.en || 'AWGP Bengaluru'],
      section: post.category?.en,
    },
  });
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

  const sidebar = {
    heading: locale === 'hi' ? 'जुड़े रहें' : locale === 'kn' ? 'ಸಂಪರ್ಕದಲ್ಲಿರಿ' : 'Get Involved',
    blurb: locale === 'hi'
      ? 'गायत्री परिवार से जुड़ें या किसी भी प्रश्न के लिए हमसे संपर्क करें।'
      : locale === 'kn'
        ? 'ಗಾಯತ್ರಿ ಪರಿವಾರ ಸೇರಿ ಅಥವಾ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಿಗೆ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.'
        : 'Join the Gayatri Pariwar, or reach out to us with any questions.',
    contact: locale === 'hi' ? 'संपर्क करें' : locale === 'kn' ? 'ಸಂಪರ್ಕಿಸಿ' : 'Contact Us',
    join: locale === 'hi' ? 'परिवार से जुड़ें' : locale === 'kn' ? 'ಪರಿವಾರ ಸೇರಿ' : 'Join Us',
    follow: locale === 'hi' ? 'हमें फॉलो करें' : locale === 'kn' ? 'ನಮ್ಮನ್ನು ಅನುಸರಿಸಿ' : 'Follow us',
  };

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { name: locale === 'hi' ? 'होम' : locale === 'kn' ? 'ಮುಖಪುಟ' : 'Home', path: '/' },
          { name: locale === 'hi' ? 'ब्लॉग' : locale === 'kn' ? 'ಬ್ಲಾಗ್' : 'Blog', path: '/blog' },
          { name: L(post.title), path: `/blog/${slug}` },
        ]}
      />
      <JsonLd
        data={articleSchema({
          headline: L(post.title),
          description: L(post.excerpt),
          image: post.image,
          datePublished: post.date,
          authorName: L(post.author),
          section: L(post.category),
          url: localeUrl(locale, `/blog/${slug}`),
        })}
        id="article"
      />
      <PageHeader
        eyebrow={`AWGP Bengaluru · ${L(post.category)}`}
        title={L(post.title)}
        subtitle={`${L(post.author)} · ${formatDate(post.date, locale)} · ${readLabel}`}
      />

      <section className="blog-section">
        <div className="section-inner blog-layout">
          <article className="blog-article">
            <div className="blog-article__cover">
              <Image
                src={post.image}
                alt={L(post.title)}
                fill
                sizes="(max-width: 800px) 100vw, 720px"
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

            <Link href="/blog" className="blog-back blog-back--bottom">{backLabel}</Link>
          </article>

          <aside className="blog-sidebar">
            <div className="blog-sidebar__inner">
              <h3 className="blog-sidebar__head">{sidebar.heading}</h3>
              <p className="blog-sidebar__blurb">{sidebar.blurb}</p>

              <div className="blog-sidebar__cta">
                <Link href="/contact" className="blog-sidebar__btn blog-sidebar__btn--ghost">
                  <Mail size={17} aria-hidden="true" />
                  {sidebar.contact}
                </Link>
                <a
                  href={JOIN_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-sidebar__btn blog-sidebar__btn--primary"
                >
                  {sidebar.join}
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
              </div>

              <div className="blog-sidebar__social-wrap">
                <span className="blog-sidebar__social-label">{sidebar.follow}</span>
                <div className="blog-sidebar__social">
                  <a href="https://www.facebook.com/gayatripariwarbangalore" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="blog-sidebar__social-btn">
                    <Facebook size={18} aria-hidden="true" />
                  </a>
                  <a href="https://wa.me/919243755613" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="blog-sidebar__social-btn">
                    <MessageCircle size={18} aria-hidden="true" />
                  </a>
                  <a href="https://www.instagram.com/awgp.bengaluru/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="blog-sidebar__social-btn">
                    <Instagram size={18} aria-hidden="true" />
                  </a>
                  <a href="https://www.youtube.com/@AWGPBengaluru" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="blog-sidebar__social-btn">
                    <Youtube size={18} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

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
