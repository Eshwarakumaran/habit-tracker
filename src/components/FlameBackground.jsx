import FlameCanvas from './FlameCanvas';

export default function FlameBackground() {
  return (
    <div className="flame-bg" aria-hidden="true">
      <FlameCanvas />
      <div className="flame-glow-overlay" />
      <div className="flame flame-1" />
      <div className="flame flame-2" />
      <div className="flame flame-3" />
      <div className="flame flame-4" />
    </div>
  );
}
