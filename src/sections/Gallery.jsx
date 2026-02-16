import { useState, useEffect, useCallback, useRef } from 'react';
import Section from '../components/Section';

const photos = [
  { src: '/ourgym1.jpg', alt: 'Cedar River Boulder — climbing walls' },
  { src: '/ourgym2.jpg', alt: 'Cedar River Boulder — gym interior' },
  { src: '/ourgym3.jpg', alt: 'Cedar River Boulder — training area' },
  { src: '/ourgym4.jpg', alt: 'Cedar River Boulder — community space' },
];

export default function Gallery() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);
  const touchStart = useRef(null);

  const goto = useCallback((i) => {
    setActive((i + photos.length) % photos.length);
  }, []);

  // Auto-advance every 4s unless paused
  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => goto(active + 1), 4000);
    return () => clearInterval(timer.current);
  }, [active, paused, goto]);

  // Pause on hover / touch
  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  // Swipe support
  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goto(diff > 0 ? active + 1 : active - 1);
    }
    touchStart.current = null;
  };

  // Keyboard nav
  const onKey = (e) => {
    if (e.key === 'ArrowRight') goto(active + 1);
    if (e.key === 'ArrowLeft') goto(active - 1);
  };

  return (
    <Section id="gallery" className="section--gallery">
      <h2 className="section__eyebrow">Take a Look</h2>
      <h1 className="section__title">Our Gym</h1>

      <div
        className="carousel"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyDown={onKey}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Gym photos"
      >
        {/* Track */}
        <div
          className="carousel__track"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {photos.map((p, i) => (
            <div className="carousel__slide" key={i}>
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Prev / Next arrows */}
        <button
          className="carousel__btn carousel__btn--prev"
          onClick={() => goto(active - 1)}
          aria-label="Previous photo"
        >
          ‹
        </button>
        <button
          className="carousel__btn carousel__btn--next"
          onClick={() => goto(active + 1)}
          aria-label="Next photo"
        >
          ›
        </button>

        {/* Dots */}
        <div className="carousel__dots">
          {photos.map((_, i) => (
            <button
              key={i}
              className={`carousel__dot${i === active ? ' carousel__dot--active' : ''}`}
              onClick={() => goto(i)}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="carousel__progress">
          <div
            className="carousel__progress-bar"
            key={`${active}-${paused}`}
            style={{ animationPlayState: paused ? 'paused' : 'running' }}
          />
        </div>
      </div>
    </Section>
  );
}
