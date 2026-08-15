import { useState } from 'react';
import HabitCalendar from '../components/HabitCalendar';
import { getCompletionsForDate } from '../utils/gamification';
import { formatDisplayDate } from '../utils/dateUtils';
import { getCategoryById } from '../data/categories';
import CategoryIcon from '../components/CategoryIcon';
import EmptyState from '../components/EmptyState';
import { Calendar as CalendarIcon, Flame, CheckCircle2 } from 'lucide-react';

export default function CalendarPage({ habits, completions }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());

  const completedHabits = getCompletionsForDate(habits, completions, selectedDate);

  return (
    <div className="page calendar-page">
      <div className="page-header">
        <div>
          <h1>Hellfire Calendar</h1>
          <p className="page-subtitle">Inspect your streak and completion history across time.</p>
        </div>
      </div>

      {habits.length === 0 ? (
        <EmptyState
          iconName="Calendar"
          title="No Calendar Data"
          message="Forge your habits first to unlock your daily calendar tracker."
        />
      ) : (
        <div className="calendar-layout">
          <HabitCalendar
            habits={habits}
            completions={completions}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            viewDate={viewDate}
            onViewChange={setViewDate}
          />

          <div className="calendar-detail">
            <div className="calendar-detail-header">
              <CalendarIcon size={18} color="#ff4500" />
              <h3>{formatDisplayDate(selectedDate)}</h3>
            </div>
            {completedHabits.length === 0 ? (
              <p className="calendar-detail-empty">No habits completed on this date.</p>
            ) : (
              <ul className="calendar-detail-list">
                {completedHabits.map((habit) => {
                  const cat = getCategoryById(habit.category);
                  return (
                    <li key={habit.id} className="calendar-detail-item">
                      <CategoryIcon iconName={cat.iconName} size={16} color={cat.color} />
                      <span className="habit-detail-name">{habit.name}</span>
                      <span className="calendar-detail-flame">
                        <CheckCircle2 size={16} color="#22c55e" />
                        <Flame size={14} color="#ff4500" />
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
