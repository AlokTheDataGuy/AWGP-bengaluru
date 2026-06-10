import { useTranslations, useLocale } from 'next-intl';
import scheduleData from '../../data/schedule.json';
import './Schedule.css';

export default function Schedule() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section id="schedule" className="section schedule-section">
      <div
        className="schedule-bg"
        style={{ backgroundImage: `url(/assets/shantikunj/shivir.jpg)` }}
      />
      <div className="schedule-overlay" />

      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <p className="eyebrow">{t('schedule_title')}</p>
          <h2>
            {locale === 'hi' ? 'दैनिक साधना क्रम' : locale === 'kn' ? 'ದೈನಂದಿನ ಸಾಧನಾ ಕ್ರಮ' : 'Daily Sadhana Schedule'}
          </h2>
          <div className="ornament"><span>🕉️</span></div>
        </div>

        <div className="schedule-grid">
          <ScheduleBlock
            title={t('schedule_morning')}
            icon="🌅"
            items={scheduleData.morning}
            locale={locale}
            accent="saffron"
          />
          <ScheduleBlock
            title={t('schedule_evening')}
            icon="🌙"
            items={scheduleData.evening}
            locale={locale}
            accent="maroon"
          />
          <ScheduleBlock
            title={t('schedule_sunday')}
            icon="✨"
            items={scheduleData.sunday}
            locale={locale}
            accent="gold"
          />
        </div>
      </div>
    </section>
  );
}

function ScheduleBlock({ title, icon, items, locale, accent }) {
  return (
    <div className={`schedule-block schedule-block--${accent}`}>
      <div className="schedule-block__header">
        <span className="schedule-block__icon">{icon}</span>
        <h3>{title}</h3>
      </div>
      <ul className="schedule-list">
        {items.map((item, i) => (
          <li key={i} className="schedule-item">
            <span className="schedule-time">{item.time}</span>
            <span className="schedule-dot" />
            <span className="schedule-activity">
              {item.activity[locale] || item.activity.en}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
