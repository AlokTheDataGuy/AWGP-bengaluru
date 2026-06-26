'use client';

import { useReveal } from '../../lib/useReveal';

/** Wrap a block so it reveals on scroll (adds `.is-visible` in view). */
export default function Reveal({ as: Tag = 'section', threshold = 0.12, className = '', children, ...rest }) {
  const ref = useReveal(threshold);
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
