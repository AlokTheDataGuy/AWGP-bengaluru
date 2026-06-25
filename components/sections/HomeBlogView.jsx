'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Link } from '../../lib/i18n/navigation';
import { useReveal } from '../../lib/useReveal';
import './HomeBlog.css';

export default function HomeBlogView({ posts, head }) {
  const ref = useReveal();

  return (
    <section className="home-blog section" ref={ref}>
      <div className="section-inner home-blog__inner">

        {/* ── Header: title block + "all articles" link ────── */}
        <header className="home-blog__head">
          <div className="home-blog__head-text">
            <span className="home-blog__eyebrow">{head.eyebrow}</span>
            <h2 className="home-blog__title">{head.title}</h2>
            <p className="home-blog__sub">{head.sub}</p>
          </div>
          <Link href="/blog" className="home-blog__all">
            {head.viewAll}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </header>

        {/* ── Latest posts ─────────────────────────────────── */}
        <div className="home-blog__grid">
          {posts.map((p, i) => (
            <article key={p.slug} className="hb-card" style={{ '--i': i }}>
              <Link href={`/blog/${p.slug}`} className="hb-card__link" aria-label={p.title}>
                <span className="hb-card__media">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="hb-card__chip">{p.category}</span>
                </span>

                <span className="hb-card__body">
                  <span className="hb-card__meta">{p.date} · {p.read}</span>
                  <h3 className="hb-card__title">{p.title}</h3>
                  <p className="hb-card__excerpt">{p.excerpt}</p>
                  <span className="hb-card__more">
                    {head.readMore}
                    <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
