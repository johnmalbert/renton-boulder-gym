import { useRef, useEffect, useState } from 'react';

export default function Section({ id, className, children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id={id} className={`section ${className || ''}`}>
      <div ref={ref} className={`section__inner ${visible ? 'visible' : ''}`}>
        {children}
      </div>
    </section>
  );
}
