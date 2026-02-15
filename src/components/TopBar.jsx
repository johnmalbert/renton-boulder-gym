export default function TopBar({ visible }) {
  return (
    <header className={`top-bar ${visible ? '' : 'hidden'}`}>
      <div className="top-bar__logo">🧗 Cedar River Boulder</div>
    </header>
  );
}
