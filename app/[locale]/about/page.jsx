import Image from 'next/image';
import { Link } from '../../../lib/i18n/navigation';
import HeroSection from '../../../components/ui/HeroSection';
import SectionHeader from '../../../components/ui/SectionHeader';
import SlideshowClient from '../../../components/ui/SlideshowClient';
import Breadcrumbs from '../../../components/seo/Breadcrumbs';
import { buildMetadata } from '../../../lib/seo/metadata';
import data from '../../../data-json-files/about/about.json';
import './About.css';

const ABOUT_TITLE = {
  en: 'About Us — Our Story, Founders & Mission',
  hi: 'हमारे बारे में — हमारी कहानी, संस्थापक एवं ध्येय',
  kn: 'ನಮ್ಮ ಬಗ್ಗೆ — ನಮ್ಮ ಕಥೆ, ಸಂಸ್ಥಾಪಕರು ಮತ್ತು ಧ್ಯೇಯ',
};

const ABOUT_DESC = {
  en: 'Learn about All World Gayatri Pariwar Bengaluru — our history, founders Gurudev Shri Ram Sharma Acharya and Mata Bhagwati Devi Sharma, our link to Shantikunj Haridwar, and our mission of self-refinement and selfless service in Bangalore.',
  hi: 'अखिल विश्व गायत्री परिवार बेंगलूरु के बारे में जानें — हमारा इतिहास, संस्थापक गुरुदेव श्रीराम शर्मा आचार्य एवं माता भगवती देवी शर्मा, शांतिकुंज हरिद्वार से हमारा संबंध, तथा आत्म-परिष्कार एवं निस्वार्थ सेवा का हमारा ध्येय।',
  kn: 'ಅಖಿಲ ವಿಶ್ವ ಗಾಯತ್ರಿ ಪರಿವಾರ ಬೆಂಗಳೂರು ಬಗ್ಗೆ ತಿಳಿಯಿರಿ — ನಮ್ಮ ಇತಿಹಾಸ, ಸಂಸ್ಥಾಪಕರಾದ ಗುರುದೇವ ಶ್ರೀರಾಮ ಶರ್ಮಾ ಆಚಾರ್ಯ ಮತ್ತು ಮಾತಾ ಭಗವತಿ ದೇವಿ ಶರ್ಮಾ, ಶಾಂತಿಕುಂಜ ಹರಿದ್ವಾರದೊಂದಿಗಿನ ನಂಟು, ಮತ್ತು ಆತ್ಮ-ಪರಿಷ್ಕಾರ ಹಾಗೂ ನಿಸ್ವಾರ್ಥ ಸೇವೆಯ ಧ್ಯೇಯ.',
};

const BC = {
  home: { en: 'Home', hi: 'होम', kn: 'ಮುಖಪುಟ' },
  about: { en: 'About Us', hi: 'हमारे बारे में', kn: 'ನಮ್ಮ ಬಗ್ಗೆ' },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({ locale, path: '/about', title: ABOUT_TITLE, description: ABOUT_DESC });
}

const mission = data.sections.find((s) => s.id === 'mission');
const approach = data.sections.find((s) => s.id === 'approach');

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const L = (o) => (o && (o[locale] ?? o.en)) || '';
  const heroCtas = data.hero.ctas || [];

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { name: L(BC.home), path: '/' },
          { name: L(BC.about), path: '/about' },
        ]}
      />
      {/* ── Hero ── */}
      <HeroSection
        title={L(data.hero.title)}
        subtitle={L(data.hero.subtitle)}
      >
        {heroCtas.map((c, i) =>
          c.href.startsWith('#') ? (
            <a key={i} href={c.href} className="btn btn-outline">{L(c.label)}</a>
          ) : (
            <Link key={i} href={c.href} className="btn btn-white">{L(c.label)}</Link>
          )
        )}
      </HeroSection>

      {/* ── All World Gayatri Pariwar (now directly under hero) ── */}
      <section id={data.global.id} className="section" style={{ background: 'var(--cream)' }}>
        <div className="section-inner">
          <SectionHeader eyebrow={L(data.global.eyebrow)} title={L(data.global.title)} ornament={data.global.ornament} />
          <div className="global-grid">
            <SlideshowClient
              className="global-slideshow"
              slides={data.global.slides.map((s) => ({ src: s.src, caption: L(s.caption) }))}
              aspectRatio="4/3"
              interval={5000}
              showDots={false}
            />
            <div className="global-text">
              <p>{L(data.intro.body)}</p>
            </div>
          </div>

          <div className="global-stats">
            {data.global.stats.map((s, i) => (
              <div key={i} className="global-stat">
                <span className="global-stat__num">{s.num}</span>
                <span className="global-stat__label">{L(s.label)}</span>
              </div>
            ))}
          </div>

          <div className="global-cta">
            <a href={data.global.cta.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {L(data.global.cta.label)}
            </a>
          </div>
        </div>
      </section>

      {/* ── Our Founders (animated frames, alternating rows) ── */}
      <section id="founders" className="section founders-sec" style={{ background: 'var(--cream-dark)' }}>
        <div className="section-inner">
          <SectionHeader eyebrow={L(data.founders.eyebrow)} title={L(data.founders.title)} ornament={data.founders.ornament} />
          <div className="founders-list">
            {data.founders.items.map((f, i) => (
              <article key={L(f.name)} className={`founder-row${i % 2 === 1 ? ' founder-row--reverse' : ''}`}>
                <div className="founder-media">
                  <div className="founder-ring">
                    <div className="founder-photo">
                      <Image src={f.img} alt={L(f.name)} fill style={{ objectFit: 'cover', objectPosition: 'center 12%' }} sizes="240px" />
                    </div>
                  </div>
                </div>
                <div className="founder-info">
                  <h3 className="founder-name">{L(f.name)}</h3>
                  <span className="founder-role">{L(f.role)}</span>
                  <p className="founder-bio">{L(f.desc)}</p>
                  {f.readMoreUrl && (
                    <a href={f.readMoreUrl} target="_blank" rel="noopener noreferrer" className="founder-readmore">
                      {locale === 'hi' ? 'और पढ़ें →' : locale === 'kn' ? 'ಇನ್ನಷ್ಟು ಓದಿ →' : 'Read More →'}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Mentors (reworded eyebrow — no duplicate "mentors") ── */}
      <section id={data.mentors.id} className="section" style={{ background: 'var(--cream)' }}>
        <div className="section-inner">
          <SectionHeader
            eyebrow={L({ en: 'Present Leadership', hi: 'वर्तमान नेतृत्व', kn: 'ಪ್ರಸ್ತುತ ನಾಯಕತ್ವ' })}
            title={L(data.mentors.title)}
            subtitle={L(data.mentors.subtitle)}
            ornament={data.mentors.ornament}
          />
          <div className="mentors-grid">
            {data.mentors.items.map((m) => (
              <article key={L(m.name)} className="mentor-card">
                <div className="mentor-img-wrap">
                  <Image src={m.img} alt={L(m.name)} fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="(max-width:640px) 90vw, 33vw" />
                  <span className="mentor-img-bar" />
                </div>
                <div className="mentor-body">
                  <h3 className="mentor-name">{L(m.name)}</h3>
                  <span className="mentor-role">{L(m.role)}</span>
                  <ul className="mentor-points">
                    {(m.points[locale] || m.points.en).map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                  <p className="mentor-desc">{L(m.desc)}</p>
                  {m.readMoreUrl && (
                    <a href={m.readMoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mentor-btn">
                      {locale === 'hi' ? 'और पढ़ें →' : locale === 'kn' ? 'ಇನ್ನಷ್ಟು ಓದಿ →' : 'Read More →'}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission & Vision (no confusing title; editorial layout) ── */}
      {mission && (
        <section id={mission.id} className="section" style={{ background: 'var(--cream-dark)' }}>
          <div className="section-inner">
            <SectionHeader title={L(mission.eyebrow)} ornament={mission.ornament} />

            <div className="mv-vision">
              <span className="mv-tag mv-tag--gold">{L(mission.vision.label)}</span>
              <p className="mv-vision__text">{L(mission.vision.body)}</p>
            </div>

            <div className="mv-mission">
              <div className="mv-mission__intro">
                <span className="mv-tag">{L(mission.mission.label)}</span>
                <p className="mv-mission__lead">{L(mission.mission.intro)}</p>
                <p className="mv-aims">{L(mission.aimsNote)}</p>
              </div>
              <ul className="mv-points">
                {(mission.mission.points[locale] || mission.mission.points.en).map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ── Our Approach (short, no icons) ── */}
      {approach && (
        <section id={approach.id} className="section" style={{ background: 'var(--cream)' }}>
          <div className="section-inner">
            <SectionHeader eyebrow={L(approach.eyebrow)} title={L(approach.title)} ornament={approach.ornament} />
            <div className="approach-row">
              {approach.pillars.map((p) => (
                <div key={p.id} className="approach-item">
                  <h3 className="approach-item__name">{L(p.name)}</h3>
                  <p className="approach-item__summary">{L(p.summary)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── References ── */}
      <section className="section about-refs" style={{ background: 'var(--cream-dark)' }}>
        <div className="section-inner">
          <h2 className="about-refs__heading">{L(data.references.heading)}</h2>
          <p className="about-refs__note">{L(data.references.note)}</p>
          <ul className="about-refs__list">
            {data.references.items.map((r, i) => (
              <li key={i} className="about-refs__item">
                <span className={`about-refs__type about-refs__type--${r.type}`}>{r.type}</span>
                <a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
