import Image from 'next/image';
import { Link } from '../../lib/i18n/navigation';
import { getPrograms } from '../../lib/content';
import './HomePrograms.css';

const FALLBACK_IMG = '/assets/programs/festival.jpg';
const MON_SHORT = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

function gcalUrl({ date, title, details, location }) {
  const [y, m, d] = date.split('-').map(Number);
  const pad = (n) => String(n).padStart(2, '0');
  const fmt = (dt) => `${dt.getUTCFullYear()}${pad(dt.getUTCMonth() + 1)}${pad(dt.getUTCDate())}`;
  const start = new Date(Date.UTC(y, m - 1, d));
  const end   = new Date(Date.UTC(y, m - 1, d + 1));
  const params = new URLSearchParams({
    action: 'TEMPLATE', text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: details || '', location: location || '',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function getTag(id = '', titleEn = '') {
  const s = `${id} ${titleEn}`.toLowerCase();
  if (s.includes('yoga'))                            return 'Yoga';
  if (s.includes('yagya') || s.includes('havan'))   return 'Yagya';
  if (s.includes('jayanti'))                         return 'Jayanti';
  if (s.includes('purnima'))                         return 'Purnima';
  if (s.includes('meditation') || s.includes('dhyan')) return 'Dhyan';
  if (s.includes('shivir') || s.includes('camp'))   return 'Shivir';
  if (s.includes('kirtan') || s.includes('sandhya')) return 'Kirtan';
  return 'Program';
}

function parseBadge(dateStr) {
  const [, m, d] = dateStr.split('-').map(Number);
  return { day: String(d).padStart(2, '0'), mon: MON_SHORT[m - 1] };
}

const LocationIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const CalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default function HomePrograms({ locale = 'en' }) {
  const programs = getPrograms();
  const L = (obj) => (locale === 'hi' ? obj?.hi : locale === 'kn' ? obj?.kn : obj?.en) || obj?.en || '';

  const upcoming = programs.slice(0, 3);
  if (!upcoming.length) return null;

  const labels = {
    eyebrow: locale === 'hi' ? 'आगामी' : locale === 'kn' ? 'ಮುಂಬರುವ' : 'Upcoming',
    heading: locale === 'hi' ? 'कार्यक्रम एवं उत्सव' : locale === 'kn' ? 'ಕಾರ್ಯಕ್ರಮಗಳು' : 'Programs & Events',
    addCal:  locale === 'hi' ? 'कैलेंडर में जोड़ें' : locale === 'kn' ? 'ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ' : 'Add to Calendar',
    viewAll: locale === 'hi' ? 'सभी कार्यक्रम देखें' : locale === 'kn' ? 'ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳು' : 'View All Programs',
    details: locale === 'hi' ? 'विवरण' : locale === 'kn' ? 'ವಿವರಗಳು' : 'Details',
  };

  return (
    <section className="home-programs">

      {/* ── Decorative ambient layer ── */}
      <div className="home-programs__bg" aria-hidden="true">
        <span className="home-programs__glow home-programs__glow--a" />
        <span className="home-programs__glow home-programs__glow--b" />
        <Image
          src="/assets/designs/lotus-mandala.png"
          alt=""
          width={420}
          height={420}
          className="home-programs__mandala home-programs__mandala--tr"
        />
        <Image
          src="/assets/designs/pillar-rays.png"
          alt=""
          width={340}
          height={340}
          className="home-programs__mandala home-programs__mandala--bl"
        />
      </div>

      <div className="section-inner">

        {/* ── Section header ── */}
        <header className="home-programs__hd">
          <span className="home-programs__eyebrow">{labels.eyebrow}</span>
          <h2 className="home-programs__title">{labels.heading}</h2>
          <Image
            src="/assets/designs/divider2.png"
            alt=""
            width={240}
            height={48}
            className="home-programs__divider"
          />
        </header>

        {/* ── Uniform card grid ── */}
        <div className="home-programs__grid">
          {upcoming.map((pr, i) => {
            const title  = L(pr.title);
            const badge  = parseBadge(pr.date);
            const tag    = getTag(pr.id, pr.title?.en || '');
            const calUrl = gcalUrl({ date: pr.date, title, details: L(pr.desc), location: L(pr.location) });
            return (
              <article key={pr.id} className="prog-card" style={{ '--i': i }}>
                <div className="prog-card__img">
                  <Image
                    src={pr.img || FALLBACK_IMG}
                    alt={title}
                    fill
                    sizes="(max-width:960px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    priority={i === 0}
                  />
                  <span className="prog-card__img-fade" aria-hidden="true" />
                  <span className="prog-card__sheen" aria-hidden="true" />
                  <span className="prog-card__tag">{tag}</span>
                  <div className="prog-card__badge">
                    <span className="prog-card__badge-day">{badge.day}</span>
                    <span className="prog-card__badge-mon">{badge.mon}</span>
                  </div>
                </div>

                <div className="prog-card__body">
                  <h3 className="prog-card__name">{title}</h3>
                  {pr.location && (
                    <p className="prog-card__loc">
                      <LocationIcon />
                      {L(pr.location)}
                    </p>
                  )}
                  {pr.desc && (
                    <p className="prog-card__desc">{L(pr.desc)}</p>
                  )}
                  <div className="prog-card__rule" aria-hidden="true" />
                  <div className="prog-card__foot">
                    <a className="prog-card__cal" href={calUrl} target="_blank" rel="noopener noreferrer">
                      <CalIcon /> {labels.addCal}
                    </a>
                    <Link href="/programs" className="prog-card__more">
                      {labels.details} <ArrowIcon />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Footer CTA ── */}
        <div className="home-programs__footer">
          <Link href="/programs" className="home-programs__view-all">
            <span className="home-programs__view-all-shine" aria-hidden="true" />
            <span>{labels.viewAll}</span>
            <ArrowIcon />
          </Link>
        </div>

      </div>
    </section>
  );
}
