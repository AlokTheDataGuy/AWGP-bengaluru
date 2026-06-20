'use client';

import { useEffect, useState } from 'react';
import GayatriLoader from './GayatriLoader';
import './SiteLoader.css';

const MIN_VISIBLE = 700;   // keep the splash up at least this long (avoids a flash)
const FADE_MS = 600;       // must match the CSS opacity transition

/**
 * SiteLoader — a full-screen Gayatri splash shown on the initial page load.
 * It stays until the window has loaded (or MIN_VISIBLE, whichever is later),
 * fades out, then unmounts. Client navigations don't re-trigger it.
 */
export default function SiteLoader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  // Decide when to start fading out
  useEffect(() => {
    const start = Date.now();
    const finish = () => {
      const wait = Math.max(0, MIN_VISIBLE - (Date.now() - start));
      setTimeout(() => setHidden(true), wait);
    };
    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish);
      return () => window.removeEventListener('load', finish);
    }
  }, []);

  // Lock scroll while the splash is visible; unmount after the fade
  useEffect(() => {
    if (removed) return undefined;
    document.body.style.overflow = hidden ? '' : 'hidden';
    if (hidden) {
      const t = setTimeout(() => setRemoved(true), FADE_MS);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [hidden, removed]);

  if (removed) return null;

  return (
    <div className={`site-loader${hidden ? ' site-loader--hidden' : ''}`} aria-hidden={hidden}>
      <GayatriLoader size={300} label="Loading AWGP Bengaluru" />
    </div>
  );
}
