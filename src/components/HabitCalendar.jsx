import { useMemo } from 'react';
import {
  MONTH_NAMES,
  DAY_NAMES,
  getCalendarGrid,
  formatDateKey,
  isToday,
} from '../utils/dateUtils';
import { getDayCompletionStatus } from '../utils/gamification';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';

export default function HabitCalendar({ habits, completions, selectedDate, onSelectDate, viewDate, onViewChange }) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const grid = useMemo(() => getCalendarGrid(year, month), [year, month]);

  const prevMonth = () => onViewChange(new Date(year, month - 1, 1));
  const nextMonth = () => onViewChange(new Date(year, month + 1, 1));

  const getDayClass = (date) => {
    if (!date) return 'cal-day cal-day--empty';
    const status = getDayCompletionStatus(habits, completions, date);
    const classes = ['cal-day'];
    if (isToday(date)) classes.push('cal-day--today');
    if (formatDateKey(date) === formatDateKey(selectedDate)) classes.push('cal-day--selected');
    if (status.total === 0) classes.push('cal-day--nodata');
    else if (status.isPerfect) classes.push('cal-day--perfect');
    else if (status.completed > 0) classes.push('cal-day--partial');
    else classes.push('cal-day--missed');
    return classes.join(' ');
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="btn btn-ghost btn-sm" onClick={prevMonth} aria-label="Previous month">
          <ChevronLeft size={18} />
        </button>
        <h3>
          {MONTH_NAMES[month]} {year}
        </h3>
        <button className="btn btn-ghost btn-sm" onClick={nextMonth} aria-label="Next month">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="calendar-weekdays">
        {DAY_NAMES.map((d) => (
          <span key={d} className="calendar-weekday">
            {d}
          </span>
        ))}
      </div>

      <div className="calendar-grid">
        {grid.map((date, i) => (
          <button
            key={i}
            className={getDayClass(date)}
            onClick={() => date && onSelectDate(date)}
            disabled={!date}
            aria-label={date ? formatDateKey(date) : undefined}
          >
            {date && (
              <>
                <span className="cal-day-num">{date.getDate()}</span>
                {getDayCompletionStatus(habits, completions, date).isPerfect && (
                  <Flame size={13} color="#ff4500" className="cal-day-flame" />
                )}
              </>
            )}
          </button>
        ))}
      </div>

      <div className="calendar-legend">
        <span><i className="legend-dot legend-dot--perfect" /> Perfect (All Done)</span>
        <span><i className="legend-dot legend-dot--partial" /> Partial</span>
        <span><i className="legend-dot legend-dot--missed" /> Missed</span>
      </div>
    </div>
  );
}
