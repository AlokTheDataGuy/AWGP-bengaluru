import JsonLd from './JsonLd';
import { breadcrumbSchema } from '../../lib/seo/schema';
import { Link } from '../../lib/i18n/navigation';
import './Breadcrumbs.css';

/**
 * Emits BreadcrumbList JSON-LD for a page, plus an optional visible trail.
 *
 * By default `visible` is false so the structured data ships without altering
 * the hero-driven page design. Pass `visible` to also render an accessible
 * <nav> breadcrumb.
 *
 * @param {object} props
 * @param {Array<{ name: string, path: string }>} props.items root→current, locale-less paths
 * @param {string} props.locale
 * @param {boolean} [props.visible]
 */
export default function Breadcrumbs({ items, locale, visible = false }) {
  if (!items || items.length === 0) return null;

  return (
    <>
      <JsonLd data={breadcrumbSchema(items, locale)} id="breadcrumbs" />
      {visible && (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            {items.map((item, i) => {
              const isLast = i === items.length - 1;
              return (
                <li key={item.path} className="breadcrumbs__item">
                  {isLast ? (
                    <span aria-current="page">{item.name}</span>
                  ) : (
                    <>
                      <Link href={item.path || '/'}>{item.name}</Link>
                      <span className="breadcrumbs__sep" aria-hidden="true">/</span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </>
  );
}
