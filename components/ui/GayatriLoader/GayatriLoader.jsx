import './GayatriLoader.css';

import om from './om.png';
import ring1 from './ring1.png';
import ring2 from './ring2.png';
import ring3 from './ring3.png';
import ring4 from './ring4.png';

/**
 * GayatriLoader
 *
 * A meditative loader: the central Om stays still while four concentric rings of
 * the Gayatri Mantra counter-rotate (ring 1 & 3 clockwise, ring 2 & 4 counter-
 * clockwise). Pure CSS animation; respects prefers-reduced-motion.
 *
 * Props: size (number px | CSS length), speed (multiplier), glow (bool),
 * label (a11y text), className, style.
 *
 * Note: Next.js static image imports resolve to objects, so we read `.src`.
 */
export default function GayatriLoader({
  size = 'min(80vw, 80vh, 560px)',
  speed = 1,
  glow = true,
  label = 'Loading',
  className = '',
  style = {},
}) {
  const dim = typeof size === 'number' ? `${size}px` : size;

  const vars = {
    '--gl-size': dim,
    '--gl-t1': `${28 / speed}s`,
    '--gl-t2': `${36 / speed}s`,
    '--gl-t3': `${44 / speed}s`,
    '--gl-t4': `${60 / speed}s`,
  };

  return (
    <div
      className={`gl-loader ${className}`}
      role="status"
      aria-label={label}
      style={{ ...vars, ...style }}
    >
      {/* Outermost first so inner rings paint on top */}
      <img className="gl-layer gl-r4" src={ring4.src} alt="" aria-hidden="true" draggable="false" />
      <img className="gl-layer gl-r3" src={ring3.src} alt="" aria-hidden="true" draggable="false" />
      <img className="gl-layer gl-r2" src={ring2.src} alt="" aria-hidden="true" draggable="false" />
      <img className="gl-layer gl-r1" src={ring1.src} alt="" aria-hidden="true" draggable="false" />
      <img
        className={`gl-layer gl-om${glow ? ' gl-om--glow' : ''}`}
        src={om.src}
        alt=""
        aria-hidden="true"
        draggable="false"
      />
      <span className="gl-sr-only">{label}</span>
    </div>
  );
}
