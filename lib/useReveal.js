'use client';

import { useRef, useEffect } from 'react';

/**
 * Reveal-on-scroll primitive.
 *
 * Attach the returned ref to a section; the first time it scrolls into
 * view the `is-visible` class is added (then the observer disconnects).
 * Pair with CSS that transitions `.is-visible` descendants — e.g.
 *   .card { opacity: 0; transform: translateY(28px); }
 *   .is-visible .card { opacity: 1; transform: none; transition: ... }
 *
 * Always provide a `prefers-reduced-motion` fallback in the CSS that
 * forces the resting (visible) state, so motion-sensitive users — and
 * the no-JS case — never see hidden content.
 *
 * @param {number} threshold IntersectionObserver visibility ratio (0–1).
 */
export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}
