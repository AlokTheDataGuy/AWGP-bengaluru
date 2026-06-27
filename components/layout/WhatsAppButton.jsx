'use client';

import { useEffect, useState } from 'react';
import './WhatsAppButton.css';

const WA_NUMBER = '919243755613';
const TEL_NUMBER = '+919243755613';

const WhatsAppIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" fill="white" width={size} height={size}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const visStyle = {
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? 'auto' : 'none',
    transform: visible ? 'scale(1)' : 'scale(0.8)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  };

  return (
    <>
      {/* ── Desktop: plain WhatsApp button ── */}
      <a
        href={`https://wa.me/${WA_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="whatsapp-btn"
        style={visStyle}
      >
        <WhatsAppIcon size={30} />
      </a>

      {/* ── Mobile: speed-dial FAB ── */}
      {open && <div className="fab-backdrop" onClick={() => setOpen(false)} />}
      <div className="fab-container" style={visStyle}>
        <a
          href={`tel:${TEL_NUMBER}`}
          aria-label="Call us"
          className={`fab-action fab-action-call ${open ? 'fab-action-visible fab-action-2' : ''}`}
          onClick={() => setOpen(false)}
        >
          <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          <span className="fab-label">Call</span>
        </a>
        <a
          href={`https://wa.me/${WA_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className={`fab-action fab-action-wa ${open ? 'fab-action-visible fab-action-1' : ''}`}
          onClick={() => setOpen(false)}
        >
          <WhatsAppIcon size={22} />
          <span className="fab-label">WhatsApp</span>
        </a>
        <button
          type="button"
          className={`fab-trigger ${open ? 'fab-trigger-open' : ''}`}
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close contact options' : 'Contact us'}
        >
          {open ? (
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
