import { useLocale } from 'next-intl';
import { Link } from '../../lib/i18n/navigation';
import Image from 'next/image';
import activitiesData from '../../data/activities.json';
import './Activities.css';

export default function Activities() {
  const locale = useLocale();
  const lang = locale;
  const learnMore = lang === 'hi' ? 'और जानें' : lang === 'kn' ? 'ಇನ್ನಷ್ಟು' : 'Learn more';

  return (
    <section id="activities" className="section activities-section">
      <div className="section-inner">
        <div className="section-header">
          <p className="eyebrow">
            {lang === 'hi' ? 'सामुदायिक गतिविधियां' : lang === 'kn' ? 'ಸಾಮುದಾಯಿಕ ಚಟುವಟಿಕೆಗಳು' : 'Community Activities'}
          </p>
          <h2>
            {lang === 'hi' ? 'सेवा में अध्यात्म' : lang === 'kn' ? 'ಸೇವೆಯಲ್ಲಿ ಆಧ್ಯಾತ್ಮ' : 'Spirituality in Seva'}
          </h2>
          <div className="ornament"><span>🤝</span></div>
        </div>

        <div className="activities-bento">
          {activitiesData.map((item, index) => (
            <Link
              href={`/activities/${item.slug}`}
              key={item.id}
              className={`activity-card${index === 0 ? ' activity-card--large' : ''}`}
            >
              <Image
                src={item.img}
                alt={item.title[lang] || item.title.en}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 540px) 100vw, (max-width: 900px) 50vw, 25vw"
                className="activity-img"
              />
              <div className="activity-overlay" />
              <div className="activity-content">
                <h3 className="activity-title">{item.title[lang] || item.title.en}</h3>
                <span className="activity-cta">{learnMore} →</span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/activities" className="btn btn-outline">
            {lang === 'hi' ? 'सभी गतिविधियां देखें →' : lang === 'kn' ? 'ಎಲ್ಲಾ ಚಟುವಟಿಕೆಗಳು ನೋಡಿ →' : 'View All Activities →'}
          </Link>
        </div>
      </div>
    </section>
  );
}
