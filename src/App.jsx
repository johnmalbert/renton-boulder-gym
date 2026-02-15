import { useEffect, useRef, useState, useCallback } from 'react';
import TopBar from './components/TopBar';
import Climber from './components/Climber';
import ProgressNav from './components/ProgressNav';
import Landing from './sections/Landing';
import About from './sections/About';
import Membership from './sections/Membership';
import Location from './sections/Location';
import Summit from './sections/Summit';

const SECTION_IDS = ['summit', 'location', 'membership', 'about', 'landing'];

export default function App() {
  const [climb, setClimb] = useState(0);          // 0 = bottom (landing), 1 = top (summit)
  const [activeSection, setActiveSection] = useState('landing');
  const didScroll = useRef(false);

  // Scroll to bottom on mount
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
    // small raf to let paint settle
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    });
  }, []);

  // Scroll handler
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docH = document.body.scrollHeight - window.innerHeight;
    const raw = docH > 0 ? scrollY / docH : 0;
    const c = 1 - raw; // invert: bottom=0, top=1
    setClimb(c);

    if (c > 0.02) didScroll.current = true;

    // Determine active section
    let active = 'landing';
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.6 && rect.bottom > 0) {
        active = id;
      }
    }
    setActiveSection(active);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <TopBar visible={climb > 0.08} />
      <Climber climb={climb} />
      <ProgressNav
        sections={SECTION_IDS}
        active={activeSection}
        onNav={scrollTo}
      />

      {/* Sections: top-to-bottom in DOM = summit → landing.
          Page starts scrolled to the bottom (landing). */}
      <Summit />
      <Location />
      <Membership />
      <About />
      <Landing />
    </>
  );
}
