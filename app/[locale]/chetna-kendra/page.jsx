import Image from 'next/image';
import { Link } from '../../../lib/i18n/navigation';
import HeroSection from '../../../components/ui/HeroSection';
import SectionHeader from '../../../components/ui/SectionHeader';
import data from '../../../data-json-files/about/chetna-kendra.json';
import './ChetnaKendra.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: data.meta.title[locale] || data.meta.title.en };
}

export default async function ChetnaKendraPage({ params }) {
  const { locale } = await params;
  const L = (o) => (o && (o[locale] ?? o.en)) || '';
  const { inauguration: inaug, about, facilities, reach, schedule, cta } = data;

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection
        title={L(data.hero.title)}
        subtitle={L(data.hero.subtitle)}
      />

      {/* ── Inauguration ── */}
      <section id={inaug.id} className="section" style={{ background: 'var(--cream)' }}>
        <div className="section-inner">
          <SectionHeader eyebrow={L(inaug.eyebrow)} title={L(inaug.title)} ornament={inaug.ornament} />
          <div className="inauguration-grid">
            <div className="inauguration-img-wrap">
              <Image src={inaug.image} alt={L(inaug.title)} fill style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="(max-width:860px) 100vw, 50vw" />
            </div>
            <div className="inauguration-content">
              <p className="inauguration-lead">{L(inaug.lead)}</p>
              <p>{L(inaug.body)}</p>
              <div className="inauguration-quote">
                <p>&ldquo;{L(inaug.quote.text)}&rdquo;</p>
                <span className="inauguration-quote-by">— {L(inaug.quote.by)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About the Centre ── */}
      <section id={about.id} className="section" style={{ background: 'var(--cream-dark)' }}>
        <div className="section-inner">
          <SectionHeader eyebrow={L(about.eyebrow)} title={L(about.title)} ornament={about.ornament} />
          <div className="ck-about-grid">
            <div className="ck-about-img-wrap">
              <Image src={about.image} alt={L(about.title)} fill style={{ objectFit: 'cover' }} sizes="(max-width:860px) 100vw, 50vw" />
            </div>
            <div className="ck-about-content">
              {about.paras.map((p, i) => <p key={i}>{L(p)}</p>)}
              <div className="ck-highlights">
                {about.highlights.map((h, i) => (
                  <div key={i} className="ck-highlight-chip">
                    <span>{h.icon}</span>
                    <span>{L(h.text)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Facilities ── */}
      <section id={facilities.id} className="section" style={{ background: 'var(--cream)' }}>
        <div className="section-inner">
          <SectionHeader eyebrow={L(facilities.eyebrow)} title={L(facilities.title)} ornament={facilities.ornament} />
          <div className="ck-facilities-grid">
            {facilities.items.map((f, i) => (
              <div key={i} className="ck-facility-card">
                <div className="ck-facility-img-wrap">
                  <Image src={f.img} alt={L(f.name)} fill style={{ objectFit: 'cover' }} sizes="(max-width:640px) 90vw, (max-width:1000px) 45vw, 30vw" />
                  <div className="ck-facility-overlay" />
                  <h3 className="ck-facility-img-title">{L(f.name)}</h3>
                </div>
                <div className="ck-facility-body">
                  <p>{L(f.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to Reach ── */}
      <section id={reach.id} className="section" style={{ background: 'var(--cream-dark)' }}>
        <div className="section-inner">
          <SectionHeader eyebrow={L(reach.eyebrow)} title={L(reach.title)} ornament={reach.ornament} />
          <div className="ck-reach-grid">
            {reach.cards.map((c, i) => (
              <div key={i} className="ck-reach-card">
                <span className="ck-reach-icon">{c.icon}</span>
                <h3>{L(c.title)}</h3>
                <p>{L(c.body)}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/contact" className="btn btn-primary">{L(reach.ctaLabel)}</Link>
          </div>
        </div>
      </section>

      {/* ── Daily & Sunday Schedule ── */}
      <section id={schedule.id} className="section" style={{ background: 'var(--cream)' }}>
        <div className="section-inner">
          <SectionHeader eyebrow={L(schedule.eyebrow)} title={L(schedule.title)} ornament={schedule.ornament} />
          <div className="ck-schedule-grid">
            <div className="ck-sched-box">
              <h3 className="ck-sched-box__title">{L(schedule.dailyTitle)}</h3>
              <ul className="ck-sched-list">
                {schedule.daily.map((it, i) => (
                  <li key={i} className="ck-sched-row">
                    <span className="ck-sched-act">{L(it.label)}</span>
                    <span className="ck-sched-time">{it.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ck-sched-box ck-sched-box--sunday">
              <h3 className="ck-sched-box__title">{L(schedule.sundayTitle)}</h3>
              <ul className="ck-sched-list">
                {schedule.sunday.map((it, i) => (
                  <li key={i} className="ck-sched-row">
                    <span className="ck-sched-act">{L(it.label)}</span>
                    <span className="ck-sched-time">{it.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id={cta.id} className="section" style={{ background: 'linear-gradient(135deg, var(--maroon) 0%, var(--brown-dk) 100%)' }}>
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--white)', marginBottom: '0.75rem' }}>{L(cta.title)}</h2>
          <p style={{ color: 'rgba(255,255,255,0.82)', maxWidth: 580, margin: '0 auto 2rem', lineHeight: 1.8 }}>{L(cta.body)}</p>
          <Link href={cta.href} className="btn btn-white">{L(cta.buttonLabel)}</Link>
        </div>
      </section>
    </>
  );
}
