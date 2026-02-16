import Section from '../components/Section';

export default function Membership() {
  return (
    <Section id="membership" className="section--membership">
      <h2 className="section__eyebrow">Join the Crew</h2>
      <h1 className="section__title">Membership</h1>

      <div className="pricing-grid">
        {/* Day Passes */}
        <div className="price-card">
          <h3>Day Passes</h3>
          <p className="price">$23</p>
          <ul>
            <li>Standard (18+): $23</li>
            <li>Student: $20</li>
            <li>Kids (under 12): $15</li>
            <li>Shoe rental: $5</li>
            <li>10-punch pass: $200</li>
          </ul>
        </div>

        {/* Standard Monthly – featured */}
        <div className="price-card price-card--featured">
          <span className="badge">Most Popular</span>
          <h3>Standard Monthly</h3>
          <p className="price">$80<span>/mo</span></p>
          <ul>
            <li>Unlimited climbing</li>
            <li>Student members: $70/mo</li>
            <li>Kids add-on (12 &amp; under): $40/mo</li>
            <li>1 guest pass per month</li>
            <li>Unlimited first-time guests</li>
          </ul>
        </div>

        {/* Annual */}
        <div className="price-card">
          <h3>Annual</h3>
          <p className="price">$850<span>/yr</span></p>
          <ul>
            <li>Everything in Monthly</li>
            <li>Save over $100/yr</li>
            <li>1 guest pass per month</li>
            <li>Unlimited first-time guests</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
