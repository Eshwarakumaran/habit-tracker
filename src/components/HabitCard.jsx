import { useState } from 'react';
import { getCategoryById, DIFFICULTIES, TIMES_OF_DAY } from '../data/categories';
import { isHabitCompletedOnDate, isWeeklyHabitCompletedForWeek, calculateStreak } from '../utils/gamification';
import { formatDateKey } from '../utils/dateUtils';
import CategoryIcon from './CategoryIcon';
import FireBurstEffect from './FireBurstEffect';
import { Check, Edit3, Trash2, Flame, Clock, Zap, Target } from 'lucide-react';

export default function HabitCard({
  habit,
  completions,
  onToggle,
  onEdit,
  onDelete,
  date = new Date(),
}) {
  const [bursting, setBursting] = useState(false);
  const category = getCategoryById(habit.category);
  const dateKey = formatDateKey(date);

  const isCompleted =
    habit.frequency === 'weekly'
      ? isWeeklyHabitCompletedForWeek(completions, habit.id, date)
      : isHabitCompletedOnDate(completions, habit.id, date);

  const streak = calculateStreak([habit], completions);
  const difficulty = DIFFICULTIES.find((d) => d.id === habit.difficulty) || DIFFICULTIES[1];
  const timeOfDay = TIMES_OF_DAY.find((t) => t.id === habit.timeOfDay) || TIMES_OF_DAY[0];

  const handleToggleClick = () => {
    if (!isCompleted) {
      setBursting(true);
    }
    onToggle(habit.id, date);
  };

  return (
    <div className={`habit-card ${isCompleted ? 'habit-card--completed' : ''}`}>
      <FireBurstEffect active={bursting} onEnd={() => setBursting(false)} />
      <div className="habit-card-glow" style={{ '--cat-color': category.color }} />

      {/* Card Header */}
      <div className="habit-card-top">
        <span className="habit-card-category" style={{ color: category.color, backgroundColor: category.bgGlow }}>
          <CategoryIcon iconName={category.iconName} size={15} color={category.color} />
          <span>{category.label}</span>
        </span>
        
        <div className="habit-card-meta-badges">
          <span className="difficulty-badge" style={{ color: difficulty.color, borderColor: difficulty.color }}>
            {difficulty.label} (+{difficulty.xp} XP)
          </span>
          <span className="habit-card-frequency">{habit.frequency}</span>
        </div>
      </div>

      {/* Habit Title & Target */}
      <div className="habit-card-body">
        <h3 className="habit-card-name">{habit.name}</h3>
        
        {(habit.targetGoal || habit.timeOfDay) && (
          <div className="habit-card-details">
            {habit.targetGoal && (
              <span className="detail-item">
                <Target size={13} /> {habit.targetGoal} {habit.targetUnit || ''}
              </span>
            )}
            {habit.timeOfDay && (
              <span className="detail-item">
                <CategoryIcon iconName={timeOfDay.iconName} size={13} /> {timeOfDay.label}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Actions & Streak */}
      <div className="habit-card-actions">
        <button
          className={`btn btn-toggle ${isCompleted ? 'btn-toggle--done' : ''}`}
          onClick={handleToggleClick}
          aria-pressed={isCompleted}
          aria-label={isCompleted ? 'Mark incomplete' : 'Mark complete'}
        >
          <span className="btn-toggle-icon">
            <Check size={16} />
          </span>
          <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
        </button>

        <div className="habit-card-streak-badge" title="Current streak">
          <Flame size={15} color="#ff4500" className={streak > 0 ? 'flame-animated' : ''} />
          <span>{streak}d</span>
        </div>

        <div className="habit-card-secondary">
          <button className="btn btn-ghost btn-sm" onClick={() => onEdit(habit)} aria-label="Edit habit">
            <Edit3 size={15} />
          </button>
          <button className="btn btn-ghost btn-sm btn-danger" onClick={() => onDelete(habit.id)} aria-label="Delete habit">
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {isCompleted && (
        <div className="habit-card-completed-indicator">
          <Flame size={22} className="completed-flame-icon" />
        </div>
      )}
    </div>
  );
}
