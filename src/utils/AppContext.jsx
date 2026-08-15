import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { loadState, saveState, generateId, defaultState, defaultUser } from './storage';
import { SAMPLE_HABITS } from '../data/sampleHabits';
import { ACHIEVEMENTS } from '../data/achievements';
import {
  calculateLevel,
  calculateXpGain,
  calculateStreak,
  calculateLongestStreak,
  countTotalCompletions,
  getSoulEnergy,
  getWeeklyCompletionPercent,
} from './gamification';
import { formatDateKey } from './dateUtils';

const AppContext = createContext(null);

const initState = () => {
  const saved = loadState();
  if (!saved.profile.initialized) {
    return {
      ...saved,
      habits: SAMPLE_HABITS,
      profile: { ...saved.profile, initialized: true },
    };
  }
  return saved;
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return action.payload;
    case 'LOGIN':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
          authenticated: true,
        },
      };
    case 'SIGNUP':
      return {
        ...state,
        user: {
          displayName: action.payload.displayName || 'Flame Rider',
          email: action.payload.email,
          title: 'Hellfire Novice',
          avatar: action.payload.avatar || 'flame-skull',
          authenticated: true,
        },
      };
    case 'LOGOUT':
      return {
        ...state,
        user: {
          ...defaultUser(),
          authenticated: false,
        },
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case 'ADD_HABIT':
      return {
        ...state,
        habits: [...state.habits, action.payload],
      };
    case 'UPDATE_HABIT':
      return {
        ...state,
        habits: state.habits.map((h) =>
          h.id === action.payload.id ? { ...h, ...action.payload } : h
        ),
      };
    case 'DELETE_HABIT': {
      const { [action.payload]: _, ...restCompletions } = state.completions;
      return {
        ...state,
        habits: state.habits.filter((h) => h.id !== action.payload),
        completions: restCompletions,
      };
    }
    case 'TOGGLE_COMPLETION': {
      const { habitId, dateKey, completed } = action.payload;
      const habitCompletions = { ...(state.completions[habitId] || {}) };
      if (completed) {
        habitCompletions[dateKey] = true;
      } else {
        delete habitCompletions[dateKey];
      }
      return {
        ...state,
        completions: { ...state.completions, [habitId]: habitCompletions },
      };
    }
    case 'UPDATE_PROFILE':
      return {
        ...state,
        profile: { ...state.profile, ...action.payload },
      };
    case 'UNLOCK_ACHIEVEMENT':
      if (state.profile.unlockedAchievements.includes(action.payload)) return state;
      return {
        ...state,
        profile: {
          ...state.profile,
          unlockedAchievements: [...state.profile.unlockedAchievements, action.payload],
        },
      };
    case 'RESET':
      return {
        ...defaultState(),
        habits: SAMPLE_HABITS,
        profile: { ...defaultState().profile, initialized: true },
        user: state.user,
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, initState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const login = useCallback((credentials) => {
    dispatch({
      type: 'LOGIN',
      payload: {
        email: credentials.email,
        displayName: credentials.displayName || credentials.email.split('@')[0],
      },
    });
  }, []);

  const signup = useCallback((data) => {
    dispatch({ type: 'SIGNUP', payload: data });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const updateUser = useCallback((userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  }, []);

  const getStats = useCallback(() => {
    const streak = calculateStreak(state.habits, state.completions);
    const longestStreak = calculateLongestStreak(state.habits, state.completions);
    const totalCompleted = countTotalCompletions(state.completions);
    const soulEnergy = getSoulEnergy(state.habits, state.completions);
    const weeklyPercent = getWeeklyCompletionPercent(state.habits, state.completions);
    const level = calculateLevel(state.profile.xp);

    return {
      streak,
      longestStreak,
      totalCompleted,
      soulEnergy,
      weeklyPercent,
      level,
      habitCount: state.habits.length,
      xp: state.profile.xp,
    };
  }, [state]);

  const checkAchievements = useCallback(() => {
    const stats = getStats();
    ACHIEVEMENTS.forEach((achievement) => {
      if (achievement.check(stats)) {
        dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: achievement.id });
      }
    });
  }, [getStats]);

  const addHabit = useCallback((habitData) => {
    const habit = {
      id: generateId(),
      ...habitData,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_HABIT', payload: habit });
    return habit;
  }, []);

  const updateHabit = useCallback((id, data) => {
    dispatch({ type: 'UPDATE_HABIT', payload: { id, ...data } });
  }, []);

  const deleteHabit = useCallback((id) => {
    dispatch({ type: 'DELETE_HABIT', payload: id });
  }, []);

  const toggleCompletion = useCallback(
    (habitId, date = new Date()) => {
      const dateKey = formatDateKey(date);
      const currentlyCompleted = state.completions[habitId]?.[dateKey] === true;
      const newCompleted = !currentlyCompleted;

      dispatch({
        type: 'TOGGLE_COMPLETION',
        payload: { habitId, dateKey, completed: newCompleted },
      });

      let xpGain = 0;
      let leveledUp = false;
      let newLevel = state.profile.level;

      if (newCompleted) {
        const streak = calculateStreak(state.habits, {
          ...state.completions,
          [habitId]: { ...(state.completions[habitId] || {}), [dateKey]: true },
        });
        xpGain = calculateXpGain(streak);
        const newXp = state.profile.xp + xpGain;
        newLevel = calculateLevel(newXp);
        leveledUp = newLevel > calculateLevel(state.profile.xp);

        dispatch({
          type: 'UPDATE_PROFILE',
          payload: { xp: newXp, level: newLevel },
        });
      }

      setTimeout(checkAchievements, 100);

      return { xpGain, leveledUp, newLevel, completed: newCompleted };
    },
    [state, checkAchievements]
  );

  const resetAll = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const importState = useCallback((data) => {
    dispatch({ type: 'LOAD', payload: data });
  }, []);

  const value = {
    state,
    dispatch,
    login,
    signup,
    logout,
    updateUser,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
    resetAll,
    importState,
    getStats,
    checkAchievements,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
