import Section from '../components/Section';

export default function Summit() {
  return (
    <Section id="summit" className="section--summit">
      <h2 className="section__eyebrow">You made it!</h2>
      <h1 className="section__title display">The Summit</h1>
      <p className="section__body">
        Thanks for climbing with us. Follow along, drop in, and send your
        project.
      </p>
      <div className="social-links">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13v-3.5a6.37 6.37 0 0 0-.88-.07 6.26 6.26 0 0 0 0 12.51 6.27 6.27 0 0 0 6.27-6.27V9.33a8.28 8.28 0 0 0 3.83.96V6.69z" />
          </svg>
        </a>
        <a href="mailto:hello@rentonbouldering.com" aria-label="Email">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <polyline points="22,4 12,13 2,4" />
          </svg>
        </a>
      </div>

      <button
        className="downclimb-btn"
        onClick={() => document.getElementById('landing')?.scrollIntoView({ behavior: 'smooth' })}
      >
        ↓ Down-climb
      </button>
    </Section>
  );
}
