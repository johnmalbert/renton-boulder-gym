import Section from '../components/Section';

export default function Location() {
  return (
    <Section id="location" className="section--location">
      <h2 className="section__eyebrow">Find Us</h2>
      <h1 className="section__title">Location &amp; Hours</h1>
      <div className="info-cards">
        <div className="info-card">
          <h3>📍 Address</h3>
          <p>123 Cedar River Trail<br />Renton, WA 98057</p>
        </div>
        <div className="info-card">
          <h3>🕐 Hours</h3>
          <p>
            Mon – Fri: 6 AM – 10 PM<br />
            Sat – Sun: 8 AM – 8 PM
          </p>
        </div>
        <div className="info-card">
          <h3>🅿️ Parking</h3>
          <p>Free lot parking available. Bike racks on-site.</p>
        </div>
      </div>
      <div className="map-embed">
        <iframe
          title="Cedar River Boulder location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21590.04063157684!2d-122.2171!3d47.4829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906866f04e0001%3A0xc4e0b8a7b7f7d3e0!2sRenton%2C%20WA!5e0!3m2!1sen!1sus!4v1700000000000"
          width="100%"
          height="250"
          style={{ border: 0, borderRadius: '12px' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </Section>
  );
}
