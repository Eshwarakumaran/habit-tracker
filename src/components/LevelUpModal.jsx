import { useEffect } from 'react';
import { Flame, Crown, Sparkles, Award } from 'lucide-react';

export default function LevelUpModal({ level, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="level-up-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="level-up-modal" onClick={(e) => e.stopPropagation()}>
        <div className="level-up-flames">
          <Flame size={32} color="#ff4500" />
          <Award size={48} color="#eab308" />
          <Flame size={32} color="#ff4500" />
        </div>
        <h2 className="level-up-title">LEVEL UP!</h2>
        <div className="level-up-badge">
          <Crown size={20} color="#eab308" />
          <span>ASCENSION TO LEVEL {level}</span>
        </div>
        <p className="level-up-sub">Your consistency and daily habits have reached a new milestone.</p>
        <button className="btn btn-primary btn-lg" onClick={onClose}>
          <Sparkles size={18} />
          <span>Continue Journey</span>
        </button>
      </div>
    </div>
  );
}
