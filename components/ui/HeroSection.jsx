import './HeroSection.css';

/**
 * Shared page hero banner — gradient-only (no photo), matching the
 * Sanskar detail page benchmark. Used at the top of every section/listing
 * page across the site for a consistent look.
 *
 * Props: eyebrow, title, subtitle, mantra, children (extra CTAs), className
 */
export default function HeroSection({
  title,
  subtitle,
  eyebrow,
  mantra,
  children,
  className = '',
}) {
  return (
    <section className={`page-hero ${className}`.trim()}>
      <span className="page-hero__glow" aria-hidden="true" />
      <span className="page-hero__mandala" aria-hidden="true" />
      <div className="page-hero__inner">
        {eyebrow && <p className="page-hero__eyebrow anim-fade-up">{eyebrow}</p>}
        <h1 className="page-hero__title anim-fade-up" style={{ animationDelay: '0.15s' }}>
          {title}
        </h1>
        <span className="page-hero__rule anim-fade-up" style={{ animationDelay: '0.2s' }} aria-hidden="true" />
        {subtitle && (
          <p className="page-hero__subtitle anim-fade-up" style={{ animationDelay: '0.28s' }}>
            {subtitle}
          </p>
        )}
        {mantra && (
          <blockquote className="page-hero__mantra anim-fade-up" style={{ animationDelay: '0.4s' }}>
            {mantra}
          </blockquote>
        )}
        {children && (
          <div className="page-hero__extra anim-fade-up" style={{ animationDelay: '0.5s' }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
