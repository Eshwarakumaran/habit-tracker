import { useEffect, useState } from 'react';

export default function FireBurstEffect({ active, onEnd }) {
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    if (!active) return;

    const count = 30;
    const newSparks = Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5);
      const distance = Math.random() * 140 + 60;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: Math.random() * 8 + 4,
        hue: Math.random() > 0.25 ? Math.random() * 30 + 10 : 200, // Fiery orange or soul blue
        duration: Math.random() * 0.4 + 0.6,
      };
    });

    setSparks(newSparks);

    const timer = setTimeout(() => {
      setSparks([]);
      if (onEnd) onEnd();
    }, 1000);

    return () => clearTimeout(timer);
  }, [active, onEnd]);

  if (!active || sparks.length === 0) return null;

  return (
    <div className="fire-burst-container">
      <div className="fire-burst-center">
        {sparks.map((s) => (
          <div
            key={s.id}
            className="fire-burst-spark"
            style={{
              '--dx': `${s.x}px`,
              '--dy': `${s.y}px`,
              '--size': `${s.size}px`,
              '--color': `hsl(${s.hue}, 100%, 55%)`,
              '--duration': `${s.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
