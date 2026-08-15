import { AchievementList } from '../components/AchievementBadge';
import { Trophy, Sparkles, Crown, Zap } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/achievements';

export default function Achievements({ unlockedIds = [], stats = {} }) {
  const unlockedCount = unlockedIds.length;
  const totalCount = ACHIEVEMENTS.length;

  return (
    <div className="page achievements-page">
      <div className="page-header">
        <div>
          <h1>Soul Crest Achievements</h1>
          <p className="page-subtitle">
            {unlockedCount} of {totalCount} unlocked — prove your spirit of vengeance.
          </p>
        </div>
      </div>

      <div className="achievements-summary">
        <div className="achievements-trophy">
          <Trophy size={36} color="#eab308" />
        </div>
        <div>
          <h2>
            {unlockedCount} / {totalCount} Unlocked Crests
          </h2>
          <p>
            <Crown size={14} color="#eab308" className="inline-icon" /> Level {stats.level || 1} · {stats.totalCompleted || 0} habits completed · {stats.longestStreak || 0} day best streak
          </p>
        </div>
      </div>

      <AchievementList unlockedIds={unlockedIds} />
    </div>
  );
}
