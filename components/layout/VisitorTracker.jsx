'use client';

import { useEffect } from 'react';

// Fires a single tracking ping per full page load. It lives in the public
// layout, so it persists across client-side navigations and does not double
// count. Failures are silently ignored — tracking must never affect the UI.
export default function VisitorTracker() {
  useEffect(() => {
    fetch('/api/track', { method: 'POST', keepalive: true }).catch(() => {});
  }, []);

  return null;
}
