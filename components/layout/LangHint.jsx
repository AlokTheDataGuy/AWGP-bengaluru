'use client';

import { useEffect, useRef, useState } from 'react';
import './LangHint.css';

const MSG = {
  en: 'Read this site in your language — switch here.',
  hi: 'इस साइट को अपनी भाषा में पढ़ें — यहाँ बदलें।',
  kn: 'ಈ ತಾಣವನ್ನು ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಓದಿ — ಇಲ್ಲಿ ಬದಲಿಸಿ.',
};
const CLOSE_LABEL = { en: 'Dismiss', hi: 'बंद करें', kn: 'ಮುಚ್ಚಿ' };

// TODO(revert after testing): restore SHOW_AFTER = 22000 and re-enable the
// session gate in the effect below.
const SHOW_AFTER = 1500;    // TESTING: surface ~1.5s after load (prod: 22000)
const VISIBLE_FOR = 15000;  // then auto-hide after 15s
const SS_KEY = 'awgp_lang_hint_seen';
const TESTING = true;       // TESTING: bypass the once-per-session gate

/**
 * A one-time nudge bubble anchored to the language toggle, letting visitors
 * know they can read the site in another language. Appears once per session
 * after a short delay, auto-hides after a while, and dismisses on any click
 * within the toggle area (including the bubble itself).
 */
export default function LangHint({ locale = 'en', children }) {
  const [show, setShow] = useState(false);
  const hideTimer = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!TESTING) {
      try {
        if (sessionStorage.getItem(SS_KEY)) return;
      } catch {
        /* storage blocked — still show once this load */
      }
    }

    const showTimer = setTimeout(() => {
      setShow(true);
      if (!TESTING) { try { sessionStorage.setItem(SS_KEY, '1'); } catch {} }
      hideTimer.current = setTimeout(() => setShow(false), VISIBLE_FOR);
    }, SHOW_AFTER);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer.current);
    };
  }, []);

  const dismiss = () => {
    clearTimeout(hideTimer.current);
    setShow(false);
  };

  const msg = MSG[locale] || MSG.en;

  return (
    <div
      className="lang-hint-wrap"
      onClick={() => { if (show) dismiss(); }}
    >
      {children}
      <div
        className={`lang-hint${show ? ' lang-hint--show' : ''}`}
        role="status"
        aria-hidden={!show}
      >
        <span className="lang-hint__arrow" aria-hidden="true" />
        <span className="lang-hint__text">{msg}</span>
        <button
          type="button"
          className="lang-hint__close"
          onClick={dismiss}
          aria-label={CLOSE_LABEL[locale] || CLOSE_LABEL.en}
          tabIndex={show ? 0 : -1}
        >
          ×
        </button>
      </div>
    </div>
  );
}
