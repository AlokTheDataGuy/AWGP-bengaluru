import { Link } from '../../../../lib/i18n/navigation';
import Image from 'next/image';
import { Newspaper, ArrowUpRight } from 'lucide-react';
import HeroSection from '../../../../components/ui/HeroSection';
import HighlightsClient from '../../../../components/ui/HighlightsClient';
import newsData from '../../../../data/news.json';
import { buildMetadata } from '../../../../lib/seo/metadata';
import '../../../../components/ui/Media.css';

const NEWS_TITLE = {
  en: 'Press & Highlights — AWGP Bengaluru in the News',
  hi: 'समाचार एवं झलकियाँ — सुर्खियों में AWGP बेंगलूरु',
  kn: 'ಸುದ್ದಿ ಮತ್ತು ಮುಖ್ಯಾಂಶಗಳು — ಸುದ್ದಿಯಲ್ಲಿ AWGP ಬೆಂಗಳೂರು',
};
const NEWS_DESC = {
  en: 'Press coverage, milestones and highlights from AWGP Bengaluru — Yagyas, community seva and spiritual programs reported across Bangalore.',
  hi: 'AWGP बेंगलूरु की प्रेस कवरेज, उपलब्धियां एवं झलकियाँ — यज्ञ, सामुदायिक सेवा एवं आध्यात्मिक कार्यक्रम।',
  kn: 'AWGP ಬೆಂಗಳೂರಿನ ಪತ್ರಿಕಾ ವರದಿ, ಸಾಧನೆಗಳು ಮತ್ತು ಮುಖ್ಯಾಂಶಗಳು — ಯಜ್ಞ, ಸಮುದಾಯ ಸೇವೆ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಕಾರ್ಯಕ್ರಮಗಳು.',
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({ locale, path: '/media/news', title: NEWS_TITLE, description: NEWS_DESC });
}

const formatDate = (iso, locale) => {
  const map = { hi: 'hi-IN', kn: 'kn-IN', en: 'en-IN' };
  try {
    return new Date(iso).toLocaleDateString(map[locale] || 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
};

export default async function NewsPage({ params }) {
  const { locale } = await params;
  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);
  const T = (obj) => (obj && (obj[locale] || obj.en)) || '';

  const press = [...newsData.press].sort((a, b) => new Date(b.date) - new Date(a.date));

  const heroTitle    = L('Press and Highlights', 'समाचार एवं झलकियाँ', 'ಸುದ್ದಿ ಮತ್ತು ಮುಖ್ಯಾಂಶಗಳು');
  const heroSubtitle = L(
    'A look back at our most recent gatherings, yagyas, and seva drives across Bengaluru.',
    'बेंगलूरु भर में हमारे हाल के आयोजनों, यज्ञों और सेवा अभियानों की झलकियाँ।',
    'ಬೆಂಗಳೂರಿನಾದ್ಯಂತ ನಮ್ಮ ಇತ್ತೀಚಿನ ಸಮಾವೇಶ, ಯಜ್ಞ ಮತ್ತು ಸೇವಾ ಅಭಿಯಾನಗಳ ಮೇಲೊಂದು ನೋಟ.',
  );

  return (
    <>
      <HeroSection
        title={heroTitle}
        subtitle={heroSubtitle}
      />

      {/* Recent highlights */}
      <HighlightsClient />

      {/* In the press */}
      <section className="media-section media-section--press">
        <div className="section-inner">
          <div className="media-intro">
            <span className="idx-eyebrow">{L('In the Press', 'समाचार-पत्रों में', 'ಪತ್ರಿಕೆಗಳಲ್ಲಿ')}</span>
            <h2 className="media-intro__heading">
              {L('Newspaper Coverage', 'समाचार-पत्र कवरेज', 'ಪತ್ರಿಕಾ ವರದಿ')}
            </h2>
            <p className="media-intro__text">
              {L(
                "Clippings from local and national dailies covering AWGP Bengaluru's work.",
                'AWGP बेंगलूरु के कार्यों को कवर करने वाले स्थानीय एवं राष्ट्रीय समाचार-पत्रों की कतरनें।',
                'AWGP ಬೆಂಗಳೂರಿನ ಕಾರ್ಯಗಳನ್ನು ವರದಿ ಮಾಡಿದ ಸ್ಥಳೀಯ ಮತ್ತು ರಾಷ್ಟ್ರೀಯ ಪತ್ರಿಕೆಗಳ ತುಣುಕುಗಳು.',
              )}
            </p>
          </div>

          <div className="press-grid">
            {press.map((p) => {
              const Card = (
                <>
                  <div className="press-card__clip">
                    <Image
                      src={p.image}
                      alt={T(p.headline)}
                      fill
                      sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 25vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <span className="press-card__paper">
                      <Newspaper size={13} aria-hidden="true" />
                      {T(p.publication)}
                    </span>
                  </div>
                  <div className="press-card__body">
                    <span className="press-card__date">{formatDate(p.date, locale)}</span>
                    <p className="press-card__headline">{T(p.headline)}</p>
                    {p.url ? <span className="press-card__cta">{L('Read article', 'लेख पढ़ें', 'ಲೇಖನ ಓದಿ')} <ArrowUpRight size={14} /></span> : null}
                  </div>
                </>
              );
              return p.url ? (
                <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="press-card press-card--link">
                  {Card}
                </a>
              ) : (
                <article key={p.id} className="press-card">{Card}</article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="media-section media-section--cta">
        <div className="section-inner">
          <div className="page-cta-strip">
            <div>
              <h3>{L('Be Part of the Next One', 'अगले आयोजन का हिस्सा बनें', 'ಮುಂದಿನದರ ಭಾಗವಾಗಿ')}</h3>
              <p>
                {L(
                  'Every program is open to all. Come join a yagya, a shivir or a seva drive.',
                  'हर कार्यक्रम सभी के लिए खुला है। किसी यज्ञ, शिविर या सेवा अभियान में सम्मिलित हों।',
                  'ಪ್ರತಿ ಕಾರ್ಯಕ್ರಮವೂ ಎಲ್ಲರಿಗೂ ಮುಕ್ತ. ಯಜ್ಞ, ಶಿಬಿರ ಅಥವಾ ಸೇವಾ ಅಭಿಯಾನದಲ್ಲಿ ಭಾಗವಹಿಸಿ.',
                )}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/programs" className="btn btn-primary">
                {L('See Programs', 'कार्यक्रम देखें', 'ಕಾರ್ಯಕ್ರಮ ನೋಡಿ')}
              </Link>
              <Link href="/contact" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>
                {L('Contact Us', 'संपर्क करें', 'ಸಂಪರ್ಕಿಸಿ')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
