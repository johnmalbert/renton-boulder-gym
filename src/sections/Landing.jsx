import Section from '../components/Section';

export default function Landing() {
  return (
    <Section id="landing" className="section--landing">
      <h1 className="hero-title display">
        Cedar River<br />Boulder
      </h1>
      <p className="hero-sub">Renton's boutique climbing gym</p>
      <p className="hero-cta-text">Your project starts here.</p>
      <div className="hero-scroll-prompt">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
        <span>Scroll up to start climbing</span>
      </div>
    </Section>
  );
}
