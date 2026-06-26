'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './SlideshowClient.css';

export default function SlideshowClient({ slides, aspectRatio = '4/3', interval = 4000, showDots = true, className = '' }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, interval);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [slides.length, interval]);

  const goTo = (i) => {
    clearInterval(timerRef.current);
    setCurrent(i);
    startTimer();
  };

  return (
    <div className={`slideshow ${className}`.trim()} style={{ aspectRatio }}>
      <div className="slideshow__track">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`slideshow__slide${i === current ? ' slideshow__slide--active' : ''}`}
          >
            <Image
              src={slide.src}
              alt={slide.caption || ''}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 860px) 100vw, 50vw"
            />
            {slide.caption && (
              <span className="slideshow__caption">{slide.caption}</span>
            )}
          </div>
        ))}
      </div>

      {/* Dots */}
      {showDots && (
        <div className="slideshow__dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`slideshow__dot${i === current ? ' slideshow__dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
