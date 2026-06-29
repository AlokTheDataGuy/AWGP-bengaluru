'use client';

import { useEffect } from 'react';

export default function LangBodySync({ locale }) {
  useEffect(() => {
    // data-lang drives the font switch in CSS; lang on <html> is the
    // accessibility/SEO signal (root layout renders a static lang="en").
    document.body.setAttribute('data-lang', locale);
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
