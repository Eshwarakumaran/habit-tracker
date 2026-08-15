import { useState, useMemo } from 'react';
import HabitCard from '../components/HabitCard';
import HabitModal from '../components/HabitModal';
import EmptyState from '../components/EmptyState';
import { CATEGORIES } from '../data/categories';
import CategoryIcon from '../components/CategoryIcon';
import { Plus, Search, CheckSquare } from 'lucide-react';

export default function HabitsPage({
  habits,
  completions,
  onToggle,
  onAdd,
  onUpdate,
  onDelete,
  xpAnimation,
  LevelUpModal,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [filterCat, setFilterCat] = useState('all');
  const [search, setSearch] = useState('');

  const handleEdit = (habit) => {
    setEditingHabit(habit);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingHabit(null);
    setModalOpen(true);
  };

  const handleSubmit = (data) => {
    if (editingHabit) {
      onUpdate(editingHabit.id, data);
    } else {
      onAdd(data);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this habit? This cannot be undone.')) {
      onDelete(id);
    }
  };

  const filtered = useMemo(() => {
    return habits.filter((h) => {
      const matchCat = filterCat === 'all' || h.category === filterCat;
      const matchSearch = h.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [habits, filterCat, search]);

  return (
    <div className="page habits-page">
      <div className="page-header">
        <div>
          <h1>My Habits</h1>
          <p className="page-subtitle">Manage, filter, and optimize your daily routines.</p>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          <Plus size={18} />
          <span>Create Habit</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="habits-toolbar">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search habits by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-bar">
          <button
            className={`filter-btn ${filterCat === 'all' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilterCat('all')}
          >
            <CheckSquare size={14} />
            <span>All ({habits.length})</span>
          </button>

          {CATEGORIES.map((cat) => {
            const count = habits.filter((h) => h.category === cat.id).length;
            const isActive = filterCat === cat.id;
            return (
              <button
                key={cat.id}
                className={`filter-btn ${isActive ? 'filter-btn--active' : ''}`}
                style={{ '--btn-color': cat.color }}
                onClick={() => setFilterCat(cat.id)}
              >
                <CategoryIcon iconName={cat.iconName} size={14} color={isActive ? '#fff' : cat.color} />
                <span>
                  {cat.label} ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          iconName="Flame"
          title={habits.length === 0 ? 'No Habits Created Yet' : 'No Habits Match Filter'}
          message={
            habits.length === 0
              ? 'Create your first daily habit to start building consistency.'
              : 'No habits match your active filters. Try searching for another keyword.'
          }
          actionLabel={habits.length === 0 ? 'Create First Habit' : undefined}
          onAction={habits.length === 0 ? handleAdd : undefined}
        />
      ) : (
        <div className="habit-grid">
          {filtered.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              completions={completions}
              onToggle={onToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <HabitModal
        isOpen={modalOpen}
        habit={editingHabit}
        onSubmit={handleSubmit}
        onClose={() => setModalOpen(false)}
      />

      {xpAnimation}
      {LevelUpModal}
    </div>
  );
}
