export default function SectionHeader({ eyebrow, title, ornament, subtitle }) {
  return (
    <div className="section-header">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {ornament && <div className="ornament"><span>{ornament}</span></div>}
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
