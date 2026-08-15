import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import FlameBackground from './FlameBackground';
import { Flame, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { useApp } from '../utils/AppContext';

export default function Layout({ activePage, onNavigate, children }) {
  const { logout } = useApp();

  return (
    <div className="app-layout">
      <FlameBackground />
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <main className="main-content">
        <header className="mobile-header">
          <div className="mobile-brand">
            <Flame size={24} color="#ff4500" className="mobile-skull-icon" />
            <span>Ignite Habits</span>
          </div>
          <div className="mobile-actions">
            <button
              className="btn btn-ghost btn-sm mobile-settings"
              onClick={() => onNavigate('settings')}
              aria-label="Settings"
            >
              <SettingsIcon size={18} />
            </button>
            <button
              className="btn btn-ghost btn-sm mobile-logout"
              onClick={logout}
              aria-label="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>
        <div className="page-content">{children}</div>
      </main>
      <BottomNav activePage={activePage} onNavigate={onNavigate} />
    </div>
  );
}
