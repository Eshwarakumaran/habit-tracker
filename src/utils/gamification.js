import {
  formatDateKey,
  getDateRange,
  getWeekKey,
} from './dateUtils';

export const XP_PER_COMPLETION = 25;
export const STREAK_BONUS_PER_DAY = 5;
export const MAX_STREAK_BONUS = 50;

export const xpForLevel = (level) => level * 100;

export const getXpProgress = (xp, level) => {
  const currentLevelXp = xpForLevel(level - 1);
  const nextLevelXp = xpForLevel(level);
  const progress = xp - currentLevelXp;
  const needed = nextLevelXp - currentLevelXp;
  const percent = Math.min(100, Math.max(0, (progress / needed) * 100));
  return { progress, needed, percent, currentLevelXp, nextLevelXp };
};

export const calculateLevel = (xp) => {
  let level = 1;
  while (xp >= xpForLevel(level)) {
    level++;
  }
  return level;
};

export const isHabitDue = (habit, date) => {
  if (habit.frequency === 'daily') return true;
  if (habit.frequency === 'weekly') return true;
  return false;
};

export const isHabitCompletedOnDate = (completions, habitId, date) => {
  const key = formatDateKey(date);
  return completions[habitId]?.[key] === true;
};

export const isWeeklyHabitCompletedForWeek = (completions, habitId, date) => {
  const weekKey = getWeekKey(date);
  const habitCompletions = completions[habitId] || {};
  return Object.keys(habitCompletions).some((dateKey) => {
    if (!habitCompletions[dateKey]) return false;
    return getWeekKey(parseDateKeySafe(dateKey)) === weekKey;
  });
};

const parseDateKeySafe = (key) => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const getDueHabitsForDate = (habits, date) =>
  habits.filter((h) => isHabitDue(h, date));

export const getDayCompletionStatus = (habits, completions, date) => {
  const due = getDueHabitsForDate(habits, date);
  if (due.length === 0) return { completed: 0, total: 0, percent: 0, isPerfect: false };

  let completed = 0;
  due.forEach((habit) => {
    if (habit.frequency === 'weekly') {
      if (isWeeklyHabitCompletedForWeek(completions, habit.id, date)) completed++;
    } else if (isHabitCompletedOnDate(completions, habit.id, date)) {
      completed++;
    }
  });

  const percent = Math.round((completed / due.length) * 100);
  return { completed, total: due.length, percent, isPerfect: completed === due.length };
};

export const getSoulEnergy = (habits, completions, date = new Date()) => {
  const { percent } = getDayCompletionStatus(habits, completions, date);
  return percent;
};

export const calculateStreak = (habits, completions, upToDate = new Date()) => {
  if (habits.length === 0) return 0;

  let streak = 0;
  const current = new Date(upToDate);
  current.setHours(0, 0, 0, 0);

  const todayStatus = getDayCompletionStatus(habits, completions, current);
  if (!todayStatus.isPerfect && todayStatus.completed > 0) {
    // partial today doesn't break streak yet, check from yesterday
  } else if (!todayStatus.isPerfect && todayStatus.completed === 0) {
    current.setDate(current.getDate() - 1);
  }

  while (true) {
    const status = getDayCompletionStatus(habits, completions, current);
    if (status.total === 0) {
      current.setDate(current.getDate() - 1);
      continue;
    }
    if (status.isPerfect) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
    if (streak > 365) break;
  }

  return streak;
};

export const calculateLongestStreak = (habits, completions) => {
  if (habits.length === 0) return 0;

  const allDates = new Set();
  Object.values(completions).forEach((habitCompletions) => {
    Object.keys(habitCompletions).forEach((d) => allDates.add(d));
  });

  if (allDates.size === 0) return 0;

  const sorted = [...allDates].sort();
  const startDate = parseDateKeySafe(sorted[0]);
  const endDate = new Date();
  const range = getDateRange(startDate, endDate);

  let longest = 0;
  let current = 0;

  range.forEach((date) => {
    const status = getDayCompletionStatus(habits, completions, date);
    if (status.total > 0 && status.isPerfect) {
      current++;
      longest = Math.max(longest, current);
    } else if (status.total > 0) {
      current = 0;
    }
  });

  return longest;
};

export const countTotalCompletions = (completions) => {
  let total = 0;
  Object.values(completions).forEach((habitCompletions) => {
    Object.values(habitCompletions).forEach((done) => {
      if (done) total++;
    });
  });
  return total;
};

export const calculateXpGain = (streak) => {
  const bonus = Math.min(MAX_STREAK_BONUS, streak * STREAK_BONUS_PER_DAY);
  return XP_PER_COMPLETION + bonus;
};

export const getWeeklyCompletionPercent = (habits, completions, referenceDate = new Date()) => {
  const start = new Date(referenceDate);
  start.setDate(start.getDate() - start.getDay());
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);

  const range = getDateRange(start, end);
  let totalDue = 0;
  let totalCompleted = 0;

  range.forEach((date) => {
    const status = getDayCompletionStatus(habits, completions, date);
    totalDue += status.total;
    totalCompleted += status.completed;
  });

  if (totalDue === 0) return 0;
  return Math.round((totalCompleted / totalDue) * 100);
};

export const getMonthlyCompletionPercent = (habits, completions, year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let totalDue = 0;
  let totalCompleted = 0;

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    if (date > new Date()) break;
    const status = getDayCompletionStatus(habits, completions, date);
    totalDue += status.total;
    totalCompleted += status.completed;
  }

  if (totalDue === 0) return 0;
  return Math.round((totalCompleted / totalDue) * 100);
};

export const getWeeklyChartData = (habits, completions) => {
  const data = [];
  const today = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const status = getDayCompletionStatus(habits, completions, date);
    data.push({
      name: dayNames[date.getDay()],
      percent: status.percent,
      completed: status.completed,
      total: status.total,
    });
  }
  return data;
};

export const getMonthlyChartData = (habits, completions) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const data = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    if (date > today) break;
    const status = getDayCompletionStatus(habits, completions, date);
    data.push({
      name: String(d),
      percent: status.percent,
      completed: status.completed,
      total: status.total,
    });
  }
  return data;
};

export const getCategoryStats = (habits, completions) => {
  const stats = {};
  habits.forEach((habit) => {
    if (!stats[habit.category]) {
      stats[habit.category] = { completed: 0, total: 0 };
    }
    const habitCompletions = completions[habit.id] || {};
    const count = Object.values(habitCompletions).filter(Boolean).length;
    stats[habit.category].completed += count;
    stats[habit.category].total += count + 1;
  });

  return Object.entries(stats).map(([category, { completed, total }]) => ({
    category,
    completed,
    percent: total > 0 ? Math.round((completed / total) * 100) : 0,
  }));
};

export const getCompletionsForDate = (habits, completions, date) =>
  habits.filter((habit) => {
    if (habit.frequency === 'weekly') {
      return isWeeklyHabitCompletedForWeek(completions, habit.id, date);
    }
    return isHabitCompletedOnDate(completions, habit.id, date);
  });
