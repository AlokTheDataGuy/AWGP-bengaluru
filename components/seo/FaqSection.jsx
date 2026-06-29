import JsonLd from './JsonLd';
import { faqSchema } from '../../lib/seo/schema';
import './FaqSection.css';

/**
 * Accessible FAQ block + FAQPage JSON-LD in one component.
 *
 * Uses native <details>/<summary> so every question and answer is present in
 * the server-rendered HTML — fully crawlable and readable by AI answer engines
 * with no JavaScript required. The matching faqSchema() emits the FAQPage rich
 * result.
 *
 * @param {object} props
 * @param {Array<{ question: string, answer: string }>} props.items
 * @param {string} [props.heading]
 * @param {string} [props.eyebrow]
 * @param {string} [props.id] anchor id for the section
 * @param {'cream' | 'cream-dark'} [props.background]
 */
export default function FaqSection({
  items,
  heading = 'Frequently Asked Questions',
  eyebrow,
  id = 'faq',
  background = 'cream',
}) {
  if (!items || items.length === 0) return null;

  const bg = background === 'cream-dark' ? 'var(--cream-dark)' : 'var(--cream)';

  return (
    <section id={id} className="faq-sec" style={{ background: bg }} aria-labelledby={`${id}-title`}>
      <div className="faq-sec__inner">
        <header className="faq-sec__head">
          {eyebrow && <span className="faq-sec__eyebrow">{eyebrow}</span>}
          <h2 id={`${id}-title`} className="faq-sec__title">{heading}</h2>
          <span className="faq-sec__rule" aria-hidden="true" />
        </header>

        <div className="faq-sec__list">
          {items.map((item, i) => (
            <details key={i} className="faq-item" open={i === 0}>
              <summary className="faq-item__q">
                <span>{item.question}</span>
                <svg className="faq-item__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="faq-item__a">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>

      <JsonLd data={faqSchema(items)} id={`${id}-jsonld`} />
    </section>
  );
}
