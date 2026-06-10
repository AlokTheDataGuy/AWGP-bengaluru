'use client';

import { useEffect } from 'react';

export default function LangBodySync({ locale }) {
  useEffect(() => {
    document.body.setAttribute('data-lang', locale);
  }, [locale]);

  return null;
}
