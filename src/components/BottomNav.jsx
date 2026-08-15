import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart3,
  Trophy,
} from 'lucide-react';

const MOBILE_ITEMS = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { id: 'habits', label: 'Habits', icon: CheckSquare },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'statistics', label: 'Stats', icon: BarChart3 },
  { id: 'achievements', label: 'Badges', icon: Trophy },
];

export default function BottomNav({ activePage, onNavigate }) {
  return (
    <nav className="bottom-nav">
      {MOBILE_ITEMS.map((item) => {
        const IconComp = item.icon;
        const isActive = activePage === item.id;
        return (
          <button
            key={item.id}
            className={`bottom-nav-link ${isActive ? 'bottom-nav-link--active' : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-label={item.label}
          >
            <span className="bottom-nav-icon">
              <IconComp size={20} color={isActive ? '#ff4500' : 'currentColor'} />
            </span>
            <span className="bottom-nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
