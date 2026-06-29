'use client';

import { useEffect, useState } from 'react';
import './WhatsAppButton.css';

const TEL_NUMBER = '+919243755613';

const PhoneIcon = ({ size = 26 }) => (
  <svg viewBox="0 0 24 24" fill="white" width={size} height={size}>
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

/**
 * Floating Call button — shown on mobile only. Desktop has no floating
 * contact button (use the in-page contact details instead).
 */
export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const visStyle = {
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? 'auto' : 'none',
    transform: visible ? 'scale(1)' : 'scale(0.8)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  };

  return (
    <a
      href={`tel:${TEL_NUMBER}`}
      aria-label="Call us"
      className="call-fab"
      style={visStyle}
    >
      <PhoneIcon size={26} />
    </a>
  );
}
