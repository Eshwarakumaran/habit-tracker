import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart3,
  Trophy,
  Settings,
  Flame,
  Skull,
  LogOut,
  User,
  Zap,
} from 'lucide-react';
import { useApp } from '../utils/AppContext';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', iconName: 'LayoutDashboard', icon: LayoutDashboard },
  { id: 'habits', label: 'My Habits', iconName: 'CheckSquare', icon: CheckSquare },
  { id: 'calendar', label: 'Calendar', iconName: 'Calendar', icon: Calendar },
  { id: 'statistics', label: 'Analytics', iconName: 'BarChart3', icon: BarChart3 },
  { id: 'achievements', label: 'Achievements', iconName: 'Trophy', icon: Trophy },
  { id: 'settings', label: 'Settings', iconName: 'Settings', icon: Settings },
];

export default function Sidebar({ activePage, onNavigate }) {
  const { state, logout } = useApp();
  const user = state?.user || {};

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <Flame size={28} className="sidebar-skull-icon" color="#ff4500" />
        </div>
        <div>
          <h1 className="sidebar-title">Ignite Habits</h1>
          <p className="sidebar-tagline">Fuel your daily routines</p>
        </div>
      </div>

      {/* User Profile Card */}
      {user.authenticated && (
        <div className="sidebar-user-card">
          <div className="user-avatar-badge">
            <User size={18} />
          </div>
          <div className="user-info">
            <span className="user-name">{user.displayName}</span>
            <span className="user-title">
              <Zap size={12} className="user-title-icon" /> {user.title || 'Consistency Member'}
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const IconComp = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="sidebar-link-icon">
                <IconComp size={20} color={isActive ? '#ff4500' : 'currentColor'} />
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="btn btn-ghost btn-block sidebar-logout-btn" onClick={logout}>
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
        <p className="sidebar-quote">Discipline turns goals into reality.</p>
      </div>
    </aside>
  );
}

export { NAV_ITEMS };
