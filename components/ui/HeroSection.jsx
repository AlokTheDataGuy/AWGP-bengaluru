import Image from 'next/image';
import './HeroSection.css';

/**
 * Reusable page hero banner.
 * Props:
 *   title          – main heading (string)
 *   subtitle       – smaller text below
 *   eyebrow        – small all-caps label above title
 *   bgImage        – path string e.g. '/assets/shantikunj/banner.jpg'
 *   bgImageMobile  – optional alternate image for mobile
 *   bgColor        – fallback CSS gradient (when no bgImage)
 *   mantra         – Sanskrit quote (optional)
 *   icon           – emoji icon (optional)
 *   imgIcon        – image src for a small icon/seal above the eyebrow
 *   children       – extra CTA buttons etc.
 */
export default function HeroSection({
  title,
  icon,
  imgIcon,
  subtitle,
  eyebrow,
  bgImage,
  bgImageMobile,
  bgColor = 'linear-gradient(135deg, #7B1C1C 0%, #3D1F0A 60%, #7B1C1C 100%)',
  mantra,
  children,
  className = '',
}) {
  return (
    <section className={`page-hero ${className}`.trim()}>
      {/* Background image */}
      {bgImage ? (
        <div className="page-hero__bg">
          <Image
            src={bgImage}
            alt=""
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes="100vw"
          />
        </div>
      ) : (
        <div className="page-hero__bg" style={{ background: bgColor }} />
      )}

      {/* Mobile-only alternate bg */}
      {bgImageMobile && (
        <div className="page-hero__bg page-hero__bg--mobile">
          <Image
            src={bgImageMobile}
            alt=""
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes="100vw"
          />
        </div>
      )}

      <div className="page-hero__overlay" />

      <div className="page-hero__content">
        {imgIcon && (
          <img src={imgIcon} alt="" className="page-hero__img-icon anim-fade-up" aria-hidden="true" />
        )}
        {eyebrow && (
          <p className="page-hero__eyebrow anim-fade-up">{eyebrow}</p>
        )}
        <h1 className="page-hero__title anim-fade-up" style={{ animationDelay: '0.15s' }}>
          <span className="page-hero__rule" aria-hidden="true" />
          <span className="page-hero__title-text">
            {icon && <span className="program-big-icon">{icon}</span>}
            {title}
          </span>
          <span className="page-hero__rule" aria-hidden="true" />
        </h1>
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
