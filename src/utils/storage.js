const STORAGE_KEY = 'spirit-of-vengeance-data';
const USER_KEY = 'spirit-of-vengeance-user';

export const defaultUser = () => ({
  authenticated: false,
  displayName: 'Johnny Blaze',
  email: 'rider@hellfire.com',
  title: 'Flame Rider',
  avatar: 'flame-skull',
});

export const defaultState = () => ({
  habits: [],
  completions: {},
  profile: {
    xp: 0,
    level: 1,
    totalCompleted: 0,
    unlockedAchievements: [],
    initialized: false,
  },
  user: defaultUser(),
});

export const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const rawUser = localStorage.getItem(USER_KEY);
    const parsedUser = rawUser ? JSON.parse(rawUser) : defaultUser();
    
    if (!raw) return { ...defaultState(), user: parsedUser };
    const parsed = JSON.parse(raw);
    return {
      ...defaultState(),
      ...parsed,
      profile: { ...defaultState().profile, ...parsed.profile },
      user: { ...defaultUser(), ...(parsed.user || {}), ...parsedUser },
    };
  } catch {
    return defaultState();
  }
};

export const saveState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (state.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(state.user));
  }
};

export const exportData = (state) => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'spirit-of-vengeance-backup.json';
  a.click();
  URL.revokeObjectURL(url);
};

export const importData = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.habits || !data.completions || !data.profile) {
          reject(new Error('Invalid backup file format.'));
          return;
        }
        resolve(data);
      } catch {
        reject(new Error('Could not parse backup file.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsText(file);
  });

export const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(USER_KEY);
};

export const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
