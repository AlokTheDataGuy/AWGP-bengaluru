'use client';

import { useEffect, useState } from 'react';
import { Facebook, Send, MessageCircle, Copy, Check, Share2 } from 'lucide-react';
import './ShareButton.css';

/* X (formerly Twitter) brand mark — lucide ships no X logo, so use the glyph. */
const XIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LABELS = {
  share: { en: 'Share', hi: 'साझा करें', kn: 'ಹಂಚಿಕೊಳ್ಳಿ' },
  copy: { en: 'Copy link', hi: 'लिंक कॉपी करें', kn: 'ಲಿಂಕ್ ನಕಲಿಸಿ' },
  copied: { en: 'Copied!', hi: 'कॉपी हो गया!', kn: 'ನಕಲಿಸಲಾಗಿದೆ!' },
  more: { en: 'More options', hi: 'और विकल्प', kn: 'ಇನ್ನಷ್ಟು ಆಯ್ಕೆಗಳು' },
};

/**
 * Reusable multi-platform share control — WhatsApp, Facebook, X, Telegram,
 * Copy link, plus the native share sheet on supported (mobile) devices.
 *
 * @param {string} [url]      absolute URL to share; defaults to the current page
 * @param {string} [title]   text/title shared alongside the link
 * @param {string} [locale]  'en' | 'hi' | 'kn' for labels
 * @param {boolean} [showLabel]  show the leading "Share" label (default true)
 */
export default function ShareButton({ url, title = '', locale = 'en', showLabel = true }) {
  const [copied, setCopied] = useState(false);
  const [canNative, setCanNative] = useState(false);

  useEffect(() => {
    setCanNative(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  const T = (o) => (typeof o === 'string' ? o : o[locale] || o.en);
  const enc = encodeURIComponent;
  const getUrl = () => url || (typeof window !== 'undefined' ? window.location.href : '');

  const targets = [
    { key: 'whatsapp', label: 'WhatsApp', Icon: MessageCircle, href: (u) => `https://wa.me/?text=${enc(title ? `${title} ${u}` : u)}` },
    { key: 'facebook', label: 'Facebook', Icon: Facebook, href: (u) => `https://www.facebook.com/sharer/sharer.php?u=${enc(u)}` },
    { key: 'x', label: 'X', Icon: XIcon, href: (u) => `https://twitter.com/intent/tweet?url=${enc(u)}&text=${enc(title)}` },
    { key: 'telegram', label: 'Telegram', Icon: Send, href: (u) => `https://t.me/share/url?url=${enc(u)}&text=${enc(title)}` },
  ];

  const openShare = (e, hrefFn) => {
    e.preventDefault();
    window.open(hrefFn(getUrl()), '_blank', 'noopener,noreferrer,width=600,height=540');
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — ignore */
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, text: title, url: getUrl() });
    } catch {
      /* user dismissed — ignore */
    }
  };

  return (
    <div className="share-btns">
      {showLabel && (
        <span className="share-btns__label">
          <Share2 size={15} aria-hidden="true" />
          {T(LABELS.share)}
        </span>
      )}
      <div className="share-btns__row">
        {targets.map(({ key, label, Icon, href }) => (
          <a
            key={key}
            href={href(getUrl())}
            onClick={(e) => openShare(e, href)}
            className={`share-btn share-btn--${key}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
          >
            <Icon size={18} aria-hidden="true" />
          </a>
        ))}
        <button
          type="button"
          className={`share-btn share-btn--copy${copied ? ' is-copied' : ''}`}
          onClick={copy}
          aria-label={T(LABELS.copy)}
          title={copied ? T(LABELS.copied) : T(LABELS.copy)}
        >
          {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
        </button>
        {canNative && (
          <button
            type="button"
            className="share-btn share-btn--native"
            onClick={nativeShare}
            aria-label={T(LABELS.more)}
            title={T(LABELS.more)}
          >
            <Share2 size={18} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
