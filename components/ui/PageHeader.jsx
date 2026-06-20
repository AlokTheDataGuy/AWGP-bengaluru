import './PageHeader.css';

/**
 * Lightweight page header for pages without a full hero banner.
 * Sits on the cream surface, clears the fixed navbar, and carries the
 * brand's diamond-rule motif. Use on pages where the navbar renders solid.
 *
 * Props: eyebrow, title, subtitle
 */
export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <header className="page-head">
      <div className="page-head__inner">
        {eyebrow && <p className="page-head__eyebrow">{eyebrow}</p>}
        <h1 className="page-head__title">
          <span className="page-head__rule" aria-hidden="true" />
          <span className="page-head__title-text">{title}</span>
          <span className="page-head__rule" aria-hidden="true" />
        </h1>
        {subtitle && <p className="page-head__subtitle">{subtitle}</p>}
      </div>
    </header>
  );
}
