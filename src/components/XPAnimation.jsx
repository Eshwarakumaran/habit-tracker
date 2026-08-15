import { useEffect } from 'react';
import { Flame, Zap } from 'lucide-react';

export default function XPAnimation({ amount, onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="xp-animation" aria-live="polite">
      <Zap size={20} color="#ffb700" className="xp-icon" />
      <span className="xp-animation-text">+{amount} SOUL XP</span>
      <Flame size={20} color="#ff4500" className="xp-flame" />
    </div>
  );
}
