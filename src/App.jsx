import { useState, useCallback, useEffect } from 'react';
import { AppProvider, useApp } from './utils/AppContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import HabitsPage from './pages/Habits';
import CalendarPage from './pages/CalendarPage';
import Statistics from './pages/Statistics';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import XPAnimation from './components/XPAnimation';
import LevelUpModal from './components/LevelUpModal';

function AppContent() {
  const [activePage, setActivePage] = useState('dashboard');
  const [xpAnim, setXpAnim] = useState(null);
  const [levelUp, setLevelUp] = useState(null);

  const {
    state,
    login,
    signup,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
    resetAll,
    importState,
    getStats,
    checkAchievements,
  } = useApp();

  useEffect(() => {
    if (state?.user?.authenticated) {
      checkAchievements();
    }
  }, [state?.user?.authenticated, checkAchievements]);

  const stats = getStats();

  const handleToggle = useCallback(
    (habitId, date) => {
      const result = toggleCompletion(habitId, date);
      if (result.completed && result.xpGain > 0) {
        setXpAnim(result.xpGain);
      }
      if (result.leveledUp) {
        setLevelUp(result.newLevel);
      }
    },
    [toggleCompletion]
  );

  if (!state?.user?.authenticated) {
    return <LoginPage onLogin={login} onSignup={signup} />;
  }

  const xpAnimation = xpAnim ? (
    <XPAnimation amount={xpAnim} onDone={() => setXpAnim(null)} />
  ) : null;

  const levelUpModal = levelUp ? (
    <LevelUpModal level={levelUp} onClose={() => setLevelUp(null)} />
  ) : null;

  const sharedProps = {
    habits: state.habits,
    completions: state.completions,
    onToggle: handleToggle,
    xpAnimation,
    LevelUpModal: levelUpModal,
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <Dashboard
            {...sharedProps}
            stats={stats}
            onEdit={(habit) => setActivePage('habits')}
            onDelete={deleteHabit}
            onNavigate={setActivePage}
          />
        );
      case 'habits':
        return (
          <HabitsPage
            {...sharedProps}
            onAdd={addHabit}
            onUpdate={updateHabit}
            onDelete={deleteHabit}
          />
        );
      case 'calendar':
        return <CalendarPage habits={state.habits} completions={state.completions} />;
      case 'statistics':
        return <Statistics habits={state.habits} completions={state.completions} />;
      case 'achievements':
        return (
          <Achievements
            unlockedIds={state.profile.unlockedAchievements}
            stats={stats}
          />
        );
      case 'settings':
        return <Settings state={state} onImport={importState} onReset={resetAll} />;
      default:
        return null;
    }
  };

  return (
    <Layout activePage={activePage} onNavigate={setActivePage}>
      {renderPage()}
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
