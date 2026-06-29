import Image from 'next/image';
import { Link } from '../../../lib/i18n/navigation';
import HeroSection from '../../../components/ui/HeroSection';
import SectionHeader from '../../../components/ui/SectionHeader';
import data from '../../../data-json-files/about/initiatives.json';
import { buildMetadata } from '../../../lib/seo/metadata';
import './Initiatives.css';

const INIT_TITLE = {
  en: 'Initiatives & Movements — Vichar Kranti & Sapt Andolan',
  hi: 'पहल एवं आंदोलन — विचार क्रांति एवं सप्त आंदोलन',
  kn: 'ಉಪಕ್ರಮಗಳು ಮತ್ತು ಆಂದೋಲನಗಳು — ವಿಚಾರ ಕ್ರಾಂತಿ ಮತ್ತು ಸಪ್ತ ಆಂದೋಲನ',
};
const INIT_DESC = {
  en: 'The global movements of All World Gayatri Pariwar — Vichar Kranti (thought revolution) and the Sapt Andolan (seven movements) for personal, family and social transformation, carried forward by AWGP Bengaluru.',
  hi: 'अखिल विश्व गायत्री परिवार के वैश्विक आंदोलन — विचार क्रांति एवं व्यक्ति, परिवार व समाज के परिवर्तन हेतु सप्त आंदोलन, AWGP बेंगलूरु द्वारा अग्रसर।',
  kn: 'ಅಖಿಲ ವಿಶ್ವ ಗಾಯತ್ರಿ ಪರಿವಾರದ ಜಾಗತಿಕ ಆಂದೋಲನಗಳು — ವಿಚಾರ ಕ್ರಾಂತಿ ಮತ್ತು ವ್ಯಕ್ತಿ, ಕುಟುಂಬ ಹಾಗೂ ಸಮಾಜದ ಪರಿವರ್ತನೆಗಾಗಿ ಸಪ್ತ ಆಂದೋಲನ.',
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({ locale, path: '/initiatives', title: INIT_TITLE, description: INIT_DESC });
}

export default async function InitiativesPage({ params }) {
  const { locale } = await params;
  const L = (o) => (o && (o[locale] ?? o.en)) || '';
  const mv = data.missionVision;
  const vk = data.vicharKranti;
  const sapt = data.saptAndolan;
  const cta = data.cta;

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection
        title={L(data.hero.title)}
        subtitle={L(data.hero.subtitle)}
      >
        {(data.hero.ctas || []).map((c, i) => (
          <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className="btn btn-white">
            {L(c.label)}
          </a>
        ))}
      </HeroSection>

      {/* ── Vichar Kranti — the foundation ── */}
      <section className="section vk-section" style={{ background: 'var(--cream-dark)' }}>
        <div className="section-inner">
          <div className="vk-grid">
            <div className="vk-img-wrap">
              <Image src="/assets/misc/vichar.jpg" alt={L(vk.title)} fill style={{ objectFit: 'cover' }} sizes="(max-width:860px) 100vw, 50vw" />
            </div>
            <div className="vk-content">
              <p className="vk-eyebrow">{L(vk.eyebrow)}</p>
              <h2 className="vk-title">{L(vk.title)}</h2>
              <div className="vk-rule" />
              <p className="vk-body">{L(vk.body)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sapt Andolan intro banner ── */}
      <div className="initiatives-banner">
        <div className="initiatives-banner-inner">
          <p>{L(sapt.note)}</p>
        </div>
      </div>

      {/* ── Sapt Andolan ── */}
      <section id={sapt.id} className="section" style={{ background: 'var(--cream)' }}>
        <div className="section-inner">
          <SectionHeader eyebrow={L(sapt.eyebrow)} title={L(sapt.title)} ornament={sapt.ornament} />
          <div className="andolan-grid">
            {sapt.movements.map((mvt, idx) => (
              <div key={mvt.key} className="andolan-card">
                <div className="andolan-num">{String(idx + 1).padStart(2, '0')}</div>
                <div className="andolan-img-wrap">
                  <Image
                    src={mvt.img}
                    alt={L(mvt.name)}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width:640px) 90vw, (max-width:1000px) 45vw, 30vw"
                  />
                  <div className="andolan-img-overlay" />
                  <span className="andolan-icon">{mvt.icon}</span>
                </div>
                <div className="andolan-body">
                  <span className="andolan-subtitle">{L(mvt.subtitle)}</span>
                  <h3 className="andolan-name">{L(mvt.name)}</h3>
                  <p className="andolan-desc">{L(mvt.desc)}</p>
                  <ul className="andolan-points">
                    {(mvt.points[locale] || mvt.points.en).map((pt, i) => <li key={i}>{pt}</li>)}
                  </ul>
                  <a href={mvt.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary andolan-btn">
                    {locale === 'hi' ? 'और जानें →' : locale === 'kn' ? 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ →' : 'Learn More →'}
                  </a>
                </div>
              </div>
            ))}
          </div>
          {sapt.bookUrl && (
            <div className="andolan-book">
              <a href={sapt.bookUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold-outline">
                {locale === 'hi' ? '“हमारे सप्त आंदोलन” पढ़ें →' : locale === 'kn' ? '“ಹಮಾರೆ ಸಪ್ತ ಆಂದೋಲನ” ಓದಿ →' : 'Read “Hamare Sapt Andolan” →'}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id={cta.id} className="section init-cta">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <p className="init-cta__eyebrow">{L(cta.eyebrow)}</p>
          <h2 className="init-cta__title">{L(cta.title)}</h2>
          <p className="init-cta__body">{L(cta.body)}</p>
          <div className="init-cta__btns">
            {cta.buttons.map((b, i) =>
              b.external ? (
                <a key={i} href={b.href} target="_blank" rel="noopener noreferrer" className={`btn ${b.type === 'primary' ? 'btn-white' : 'btn-outline'}`}>
                  {L(b.label)}
                </a>
              ) : (
                <Link key={i} href={b.href} className={`btn ${b.type === 'primary' ? 'btn-white' : 'btn-outline'}`}>
                  {L(b.label)}
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── References ── */}
      <section className="section about-refs" style={{ background: 'var(--cream)' }}>
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
