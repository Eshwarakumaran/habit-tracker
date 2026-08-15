import { useMemo, useState } from 'react';
import SoulEnergyCard from '../components/SoulEnergyCard';
import StatCard from '../components/StatCard';
import HabitCard from '../components/HabitCard';
import { LevelProgressBar } from '../components/ProgressBar';
import EmptyState from '../components/EmptyState';
import { getRandomQuote } from '../data/quotes';
import { getDayCompletionStatus } from '../utils/gamification';
import { CATEGORIES } from '../data/categories';
import CategoryIcon from '../components/CategoryIcon';
import { Flame, CheckSquare, Zap, Plus, ArrowRight, Search } from 'lucide-react';
import HabitModal from '../components/HabitModal';
import { useApp } from '../utils/AppContext';

export default function Dashboard({
  habits,
  completions,
  stats,
  onToggle,
  onEdit,
  onDelete,
  onNavigate,
  xpAnimation,
  LevelUpModal,
}) {
  const { state, addHabit } = useApp();
  const userName = state?.user?.displayName || 'Partner';
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quote = useMemo(() => getRandomQuote(), []);
  const todayStatus = getDayCompletionStatus(habits, completions, new Date());

  const filteredHabits = useMemo(() => {
    return habits.filter((h) => {
      const matchSearch = h.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCat === 'all' || h.category === selectedCat;
      return matchSearch && matchCat;
    });
  }, [habits, search, selectedCat]);

  return (
    <div className="page dashboard-page">
      {/* Header Banner */}
      <div className="page-header dashboard-header">
        <div>
          <div className="title-with-badge">
            <h1>Executive Dashboard</h1>
            <span className="flame-badge-sm">
              <Flame size={14} color="#ff4500" /> ACTIVE
            </span>
          </div>
          <p className="page-subtitle">Welcome back, {userName}. Track your daily consistency and goals.</p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          <span>Create New Habit</span>
        </button>
      </div>

      {/* Quote Banner */}
      <blockquote className="motivation-quote">
        <span className="quote-flame">
          <Flame size={22} color="#ff4500" />
        </span>
        <p>"{quote}"</p>
      </blockquote>

      {/* Main Grid Stats */}
      <div className="dashboard-grid">
        <SoulEnergyCard
          soulEnergy={stats.soulEnergy}
          habits={habits}
          completions={completions}
        />

        <div className="dashboard-stats">
          <StatCard iconName="Flame" label="Current Streak" value={stats.streak} suffix=" days" glow />
          <StatCard iconName="CheckSquare" label="Total Completed" value={stats.totalCompleted} />
          <StatCard iconName="CheckSquare" label="Today's Target" value={todayStatus.completed} suffix={`/${todayStatus.total}`} />
          <StatCard iconName="Zap" label="Member Level" value={stats.level} glow />
        </div>
      </div>

      {/* XP Level Section */}
      <div className="dashboard-xp-section">
        <LevelProgressBar xp={stats.xp} level={stats.level} />
      </div>

      {/* Filters & Search */}
      <section className="dashboard-today">
        <div className="section-header">
          <h2>
            <CheckSquare size={22} color="#ff4500" className="header-icon" /> Today's Active Habits
          </h2>
          
          <div className="filter-controls">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search habits..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)} className="cat-select">
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>

            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('habits')}>
              <span>View All ({habits.length})</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {filteredHabits.length === 0 ? (
          <EmptyState
            iconName="Flame"
            title="No Habits Found"
            message={search ? "No habits match your search parameters." : "Begin your journey by creating your first daily habit."}
            actionLabel="Create Habit"
            onAction={() => setIsModalOpen(true)}
          />
        ) : (
          <div className="habit-grid">
            {filteredHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                completions={completions}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </section>

      <HabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          addHabit(data);
        }}
      />

      {xpAnimation}
      {LevelUpModal}
    </div>
  );
}
