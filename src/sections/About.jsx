import Section from '../components/Section';

export default function About() {
  return (
    <Section id="about" className="section--about">
      <h2 className="section__eyebrow">Who We Are</h2>
      <h1 className="section__title">About Cedar River Boulder</h1>
      <p className="section__body">
        Cedar River Boulder is Renton's first dedicated bouldering gym — a
        boutique space built by climbers, for climbers. Tucked alongside the
        Cedar River Trail, our gym features 4,000 sq ft of climbing terrain,
        routinely reset problems ranging from V0 to V12, a training area, and a
        welcoming community space.
      </p>
      <p className="section__body">
        Whether you're chalking up for the first time or projecting your hardest
        grade, you'll find a home here. We believe climbing should be accessible,
        inclusive, and fun.
      </p>
      <div className="feature-row">
        <div className="feature">
          <span className="feature__icon">🪨</span>
          <h4>50+ Problems</h4>
          <p>Reset bi-weekly</p>
        </div>
        <div className="feature">
          <span className="feature__icon">💪</span>
          <h4>Training Zone</h4>
          <p>Campus board, hangboard &amp; more</p>
        </div>
        <div className="feature">
          <span className="feature__icon">☕</span>
          <h4>Café Corner</h4>
          <p>Coffee, smoothies &amp; snacks</p>
        </div>
      </div>
    </Section>
  );
}
