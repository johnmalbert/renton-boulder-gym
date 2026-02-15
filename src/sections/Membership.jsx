import Section from '../components/Section';

export default function Membership() {
  return (
    <Section id="membership" className="section--membership">
      <h2 className="section__eyebrow">Join the Crew</h2>
      <h1 className="section__title">Membership</h1>
      <div className="pricing-grid">
        {/* Day Pass */}
        <div className="price-card">
          <h3>Day Pass</h3>
          <p className="price">$22</p>
          <ul>
            <li>Full gym access</li>
            <li>Shoe rental available ($5)</li>
            <li>No commitment</li>
          </ul>
        </div>

        {/* Monthly – featured */}
        <div className="price-card price-card--featured">
          <span className="badge">Most Popular</span>
          <h3>Monthly</h3>
          <p className="price">$79<span>/mo</span></p>
          <ul>
            <li>Unlimited climbing</li>
            <li>Free shoe rental</li>
            <li>Guest passes (2/mo)</li>
            <li>Member events</li>
          </ul>
        </div>

        {/* Annual */}
        <div className="price-card">
          <h3>Annual</h3>
          <p className="price">$699<span>/yr</span></p>
          <ul>
            <li>Everything in Monthly</li>
            <li>Save over $200/yr</li>
            <li>Free chalk bag</li>
            <li>Priority route-setting input</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
