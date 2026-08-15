import { useMemo } from 'react';
import { getDayCompletionStatus } from '../utils/gamification';
import { formatDateKey } from '../utils/dateUtils';
import { Flame, Target, Zap } from 'lucide-react';

export default function SoulEnergyCard({ soulEnergy, habits, completions }) {
  const ringStyle = useMemo(
    () => ({
      background: `conic-gradient(
        #ff4500 ${soulEnergy * 3.6}deg,
        #2a2a2a ${soulEnergy * 3.6}deg
      )`,
    }),
    [soulEnergy]
  );

  const todayStatus = getDayCompletionStatus(habits, completions, new Date());

  return (
    <div className="soul-energy-card">
      <div className="soul-energy-glow" />
      <div className="soul-energy-header">
        <span className="soul-energy-skull">
          <Zap size={28} color="#ff5500" />
        </span>
        <div>
          <h2 className="soul-energy-title">Habit Performance</h2>
          <p className="soul-energy-sub">Overall daily focus rate</p>
        </div>
      </div>
      <div className="soul-energy-ring-wrap">
        <div className="soul-energy-ring" style={ringStyle}>
          <div className="soul-energy-ring-inner">
            <Flame size={20} color="#ff4500" className="soul-energy-flame-icon" />
            <span className="soul-energy-value">{soulEnergy}</span>
            <span className="soul-energy-unit">%</span>
          </div>
        </div>
      </div>
      <div className="soul-energy-footer">
        <span>
          Today: {todayStatus.completed}/{todayStatus.total} habits done
        </span>
        <span className="soul-energy-date">{formatDateKey(new Date())}</span>
      </div>
      <div className="soul-energy-chains">
        <Target size={14} color="#555" />
      </div>
    </div>
  );
}
