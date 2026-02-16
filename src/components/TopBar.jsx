export default function TopBar({ visible }) {
  return (
    <header className={`top-bar ${visible ? '' : 'hidden'}`}>
      <div className="top-bar__logo">🧗 Renton Bouldering</div>
    </header>
  );
}
