import { getXpProgress } from '../utils/gamification';
import { Flame, Zap } from 'lucide-react';

export default function ProgressBar({ value, max, label, showPercent = true, className = '' }) {
  const percent = max > 0 ? Math.min(100, (value / max) * 100) : 0;

  return (
    <div className={`progress-bar-wrap ${className}`}>
      {label && (
        <div className="progress-bar-header">
          <span className="progress-bar-label-text">{label}</span>
          {showPercent && <span className="progress-bar-percent">{Math.round(percent)}%</span>}
        </div>
      )}
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <span className="progress-bar-glow-head" />
        </div>
      </div>
    </div>
  );
}

export function LevelProgressBar({ xp, level }) {
  const { progress, needed, percent } = getXpProgress(xp, level);

  return (
    <div className="level-progress-container">
      <div className="level-progress-title-row">
        <span className="level-title-badge">
          <Zap size={15} color="#ffb700" /> Level {level}
        </span>
        <span className="level-xp-counter">
          <Flame size={14} color="#ff4500" /> {progress} / {needed} XP
        </span>
      </div>
      <ProgressBar
        value={progress}
        max={needed}
        label=""
        showPercent
        className="level-progress"
      />
    </div>
  );
}
