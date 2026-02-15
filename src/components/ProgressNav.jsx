export default function ProgressNav({ sections, active, onNav }) {
  const labels = {
    summit: 'Summit',
    location: 'Location',
    membership: 'Membership',
    about: 'About',
    landing: 'Start',
  };

  return (
    <nav className="progress-nav" aria-label="Page sections">
      {sections.map((id) => (
        <button
          key={id}
          className={active === id ? 'active' : ''}
          title={labels[id] || id}
          onClick={() => onNav(id)}
        />
      ))}
    </nav>
  );
}
