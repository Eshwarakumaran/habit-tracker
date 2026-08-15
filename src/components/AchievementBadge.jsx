import { ACHIEVEMENTS } from '../data/achievements';
import CategoryIcon from './CategoryIcon';
import { Lock, CheckCircle2 } from 'lucide-react';

export default function AchievementBadge({ achievement, unlocked }) {
  return (
    <div
      className={`achievement-badge ${unlocked ? 'achievement-badge--unlocked' : 'achievement-badge--locked'}`}
      style={{ '--badge-color': achievement.color || '#ff4500' }}
    >
      <div className="achievement-badge-icon">
        <CategoryIcon
          iconName={achievement.iconName}
          size={24}
          color={unlocked ? achievement.color || '#ff4500' : '#666'}
        />
      </div>
      <div className="achievement-badge-info">
        <h4>{achievement.title}</h4>
        <p>{achievement.description}</p>
      </div>
      {unlocked ? (
        <span className="achievement-badge-status achievement-badge-status--unlocked">
          <CheckCircle2 size={13} /> Unlocked
        </span>
      ) : (
        <span className="achievement-badge-status achievement-badge-status--locked">
          <Lock size={13} /> Locked
        </span>
      )}
    </div>
  );
}

export function AchievementList({ unlockedIds }) {
  return (
    <div className="achievement-list">
      {ACHIEVEMENTS.map((achievement) => (
        <AchievementBadge
          key={achievement.id}
          achievement={achievement}
          unlocked={unlockedIds.includes(achievement.id)}
        />
      ))}
    </div>
  );
}
