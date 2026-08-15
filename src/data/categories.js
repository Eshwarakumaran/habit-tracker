export const CATEGORIES = [
  { id: 'fitness', label: 'Fitness & Body', iconName: 'Dumbbell', color: '#ff4500', bgGlow: 'rgba(255, 69, 0, 0.15)' },
  { id: 'study', label: 'Knowledge & Study', iconName: 'BookOpen', color: '#ff8c00', bgGlow: 'rgba(255, 140, 0, 0.15)' },
  { id: 'health', label: 'Health & Vitality', iconName: 'HeartPulse', color: '#ff2200', bgGlow: 'rgba(255, 34, 0, 0.15)' },
  { id: 'coding', label: 'Tech & Coding', iconName: 'Code2', color: '#00d2ff', bgGlow: 'rgba(0, 210, 255, 0.15)' },
  { id: 'mindset', label: 'Mindset & Focus', iconName: 'Brain', color: '#a855f7', bgGlow: 'rgba(168, 85, 247, 0.15)' },
  { id: 'wealth', label: 'Career & Finance', iconName: 'Briefcase', color: '#eab308', bgGlow: 'rgba(234, 179, 8, 0.15)' },
];

export const FREQUENCIES = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
];

export const TIMES_OF_DAY = [
  { id: 'anytime', label: 'Anytime', iconName: 'Zap' },
  { id: 'morning', label: 'Morning', iconName: 'Sun' },
  { id: 'afternoon', label: 'Afternoon', iconName: 'SunMedium' },
  { id: 'evening', label: 'Evening', iconName: 'Moon' },
];

export const DIFFICULTIES = [
  { id: 'easy', label: 'Easy', xp: 10, color: '#22c55e' },
  { id: 'medium', label: 'Medium', xp: 25, color: '#eab308' },
  { id: 'hard', label: 'Hard', xp: 50, color: '#ff7043' },
  { id: 'executive', label: 'Executive', xp: 100, color: '#ff1a1a' },
];

export const getCategoryById = (id) =>
  CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];
