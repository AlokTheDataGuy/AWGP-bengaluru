import Image from 'next/image';
import { Link } from '../../lib/i18n/navigation';
import { getEvents } from '../../lib/content';
import './HomeEvents.css';

const FALLBACK_IMG = '/assets/programs/festival.jpg';
const LOCALE_TAG = { hi: 'hi-IN', kn: 'kn-IN', en: 'en-US' };

/* Build a Google Calendar "create event" link (all-day) */
function gcalUrl({ date, title, details, location }) {
  const [y, m, d] = date.split('-').map(Number);
  const pad = (n) => String(n).padStart(2, '0');
  const fmt = (dt) => `${dt.getUTCFullYear()}${pad(dt.getUTCMonth() + 1)}${pad(dt.getUTCDate())}`;
  const start = new Date(Date.UTC(y, m - 1, d));
  const end = new Date(Date.UTC(y, m - 1, d + 1)); // end is exclusive for all-day
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: details || '',
    location: location || '',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function HomeEvents({ locale = 'en' }) {
  const events = getEvents();
  const L = (obj) => (locale === 'hi' ? obj?.hi : locale === 'kn' ? obj?.kn : obj?.en) || obj?.en || '';

  const upcoming = events.slice(0, 3);

  const upcomingLabel = locale === 'hi' ? 'आगामी' : locale === 'kn' ? 'ಮುಂಬರುವ' : 'Upcoming';
  const eventsLabel   = locale === 'hi' ? 'कार्यक्रम' : locale === 'kn' ? 'ಕಾರ್ಯಕ್ರಮಗಳು' : 'Events';
  const viewAllLabel  = locale === 'hi' ? 'सभी कार्यक्रम देखें' : locale === 'kn' ? 'ಎಲ್ಲ ಕಾರ್ಯಕ್ರಮಗಳು' : 'View All Events';
  const addCalLabel   = locale === 'hi' ? 'कैलेंडर में जोड़ें' : locale === 'kn' ? 'ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ' : 'Add to Calendar';

  const fmt = new Intl.DateTimeFormat(LOCALE_TAG[locale] || 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <section className="home-events">
      <div className="home-events__band">

        <div className="home-events__intro" style={{ '--i': 0 }}>
          <span className="home-events__eyebrow">{upcomingLabel}</span>
          <h2 className="home-events__heading">{eventsLabel}</h2>
          <div className="ornament ornament--left" aria-hidden="true" />
        </div>

        {upcoming.map((ev, i) => {
          const title = L(ev.title);
          let dateStr = fmt.format(new Date(ev.date));
          if (locale === 'en') dateStr = dateStr.toUpperCase();

          const calHref = gcalUrl({
            date: ev.date,
            title,
            details: L(ev.desc),
            location: L(ev.location),
          });

          return (
            <article key={ev.id} className="ev-card" style={{ '--i': i + 1 }}>
              {/* Whole-card link to the events page (stretched, behind the overlay) */}
              <Link href="/events" className="ev-card__link" aria-label={title} />

              <div className="ev-card__media">
                <Image
                  src={ev.img || FALLBACK_IMG}
                  alt={title}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Default caption */}
              <div className="ev-card__cap">
                <span className="ev-card__date">{dateStr}</span>
                <h3 className="ev-card__title">{title}</h3>
              </div>

              {/* Hover overlay — slides up from the bottom */}
              <div className="ev-card__overlay">
                <span className="ev-card__ov-date">{dateStr}</span>
                <h3 className="ev-card__ov-title">{title}</h3>
                <p className="ev-card__ov-desc">{L(ev.desc)}</p>
                {ev.location && (
                  <p className="ev-card__ov-loc">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {L(ev.location)}
                  </p>
                )}
                <a
                  className="ev-card__cal"
                  href={calHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18M12 14v4M10 16h4" />
                  </svg>
                  {addCalLabel}
                </a>
              </div>
            </article>
          );
        })}

      </div>

      <div className="home-events__footer">
        <Link href="/events" className="btn btn-outline-dark">
          {viewAllLabel}
        </Link>
      </div>
    </section>
  );
}
