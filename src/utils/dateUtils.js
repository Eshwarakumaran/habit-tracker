export const formatDateKey = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const parseDateKey = (key) => {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const isSameDay = (a, b) => formatDateKey(a) === formatDateKey(b);

export const isToday = (date) => isSameDay(date, new Date());

export const getWeekStart = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.getFullYear(), d.getMonth(), diff);
};

export const getWeekEnd = (date) => {
  const start = getWeekStart(date);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  return end;
};

export const getWeekKey = (date) => formatDateKey(getWeekStart(date));

export const getDaysInMonth = (year, month) =>
  new Date(year, month + 1, 0).getDate();

export const getMonthDays = (year, month) => {
  const days = getDaysInMonth(year, month);
  return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
};

export const getCalendarGrid = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(year, month);
  const grid = [];

  for (let i = 0; i < firstDay; i++) {
    grid.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    grid.push(new Date(year, month, d));
  }
  return grid;
};

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const getDateRange = (start, end) => {
  const dates = [];
  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

export const formatDisplayDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
