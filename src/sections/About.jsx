import Section from '../components/Section';

export default function About() {
  return (
    <Section id="about" className="section--about">
      <h2 className="section__eyebrow">Who We Are</h2>
      <h1 className="section__title">About Renton Bouldering</h1>
      <p className="section__body">
        Renton Bouldering is an indoor bouldering-only climbing gym in Renton,
        WA. We're a community-focused, accessible, and family-friendly facility
        designed for beginners through experienced climbers.
      </p>
      <div className="feature-row">
        <div className="feature">
          <span className="feature__icon">🪨</span>
          <h4>Set Walls</h4>
          <p>Professionally set bouldering problems</p>
        </div>
        <div className="feature">
          <span className="feature__icon">🧒</span>
          <h4>Youth Programs</h4>
          <p>Classes &amp; teams for young climbers</p>
        </div>
        <div className="feature">
          <span className="feature__icon">🎉</span>
          <h4>Events</h4>
          <p>Competitions, socials &amp; community nights</p>
        </div>
      </div>
    </Section>
  );
}
