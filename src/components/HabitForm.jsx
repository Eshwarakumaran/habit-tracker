import { useState, useEffect } from 'react';
import { CATEGORIES, FREQUENCIES, TIMES_OF_DAY, DIFFICULTIES } from '../data/categories';
import CategoryIcon from './CategoryIcon';
import { Sparkles, Target, Clock, Zap, Flame, AlertCircle } from 'lucide-react';

const initialForm = {
  name: '',
  category: 'fitness',
  frequency: 'daily',
  targetGoal: '',
  targetUnit: 'mins',
  timeOfDay: 'anytime',
  difficulty: 'medium',
};

export default function HabitForm({ habit, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (habit) {
      setForm({
        name: habit.name || '',
        category: habit.category || 'fitness',
        frequency: habit.frequency || 'daily',
        targetGoal: habit.targetGoal || '',
        targetUnit: habit.targetUnit || 'mins',
        timeOfDay: habit.timeOfDay || 'anytime',
        difficulty: habit.difficulty || 'medium',
      });
    } else {
      setForm(initialForm);
    }
    setErrors({});
  }, [habit]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = 'Habit title is required.';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Title must be at least 2 characters.';
    } else if (form.name.trim().length > 80) {
      newErrors.name = 'Title must be under 80 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      name: form.name.trim(),
      category: form.category,
      frequency: form.frequency,
      targetGoal: form.targetGoal ? Number(form.targetGoal) : null,
      targetUnit: form.targetUnit.trim() || 'times',
      timeOfDay: form.timeOfDay,
      difficulty: form.difficulty,
    });
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit} noValidate>
      {/* Habit Name */}
      <div className="form-group">
        <label htmlFor="habit-name">
          <Sparkles size={16} /> Habit Title *
        </label>
        <input
          id="habit-name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="e.g. Morning Fitness Workout"
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && (
          <span className="form-error">
            <AlertCircle size={14} /> {errors.name}
          </span>
        )}
      </div>

      {/* Category Select */}
      <div className="form-group">
        <label htmlFor="habit-category">Category</label>
        <div className="category-options-grid">
          {CATEGORIES.map((cat) => {
            const isSelected = form.category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`category-pill ${isSelected ? 'category-pill--selected' : ''}`}
                style={{
                  '--cat-color': cat.color,
                  '--cat-glow': cat.bgGlow,
                }}
                onClick={() => setForm({ ...form, category: cat.id })}
              >
                <CategoryIcon iconName={cat.iconName} size={16} color={isSelected ? '#fff' : cat.color} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row: Target Goal & Unit */}
      <div className="form-row">
        <div className="form-group flex-1">
          <label htmlFor="habit-target">
            <Target size={16} /> Target Goal (Optional)
          </label>
          <input
            id="habit-target"
            type="number"
            min="1"
            max="10000"
            value={form.targetGoal}
            onChange={(e) => setForm({ ...form, targetGoal: e.target.value })}
            placeholder="e.g. 30"
          />
        </div>

        <div className="form-group flex-1">
          <label htmlFor="habit-unit">Target Unit</label>
          <select
            id="habit-unit"
            value={form.targetUnit}
            onChange={(e) => setForm({ ...form, targetUnit: e.target.value })}
          >
            <option value="mins">Minutes</option>
            <option value="hours">Hours</option>
            <option value="pages">Pages</option>
            <option value="liters">Liters</option>
            <option value="steps">Steps</option>
            <option value="times">Times</option>
            <option value="reps">Reps</option>
            <option value="session">Session</option>
          </select>
        </div>
      </div>

      {/* Row: Time of Day & Frequency */}
      <div className="form-row">
        <div className="form-group flex-1">
          <label htmlFor="habit-time">
            <Clock size={16} /> Time of Day
          </label>
          <select
            id="habit-time"
            value={form.timeOfDay}
            onChange={(e) => setForm({ ...form, timeOfDay: e.target.value })}
          >
            {TIMES_OF_DAY.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group flex-1">
          <label htmlFor="habit-frequency">Frequency</label>
          <select
            id="habit-frequency"
            value={form.frequency}
            onChange={(e) => setForm({ ...form, frequency: e.target.value })}
          >
            {FREQUENCIES.map((freq) => (
              <option key={freq.id} value={freq.id}>
                {freq.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Difficulty Level Select */}
      <div className="form-group">
        <label>
          <Zap size={16} /> Difficulty Level & XP Reward
        </label>
        <div className="difficulty-picker">
          {DIFFICULTIES.map((diff) => {
            const isSelected = form.difficulty === diff.id;
            return (
              <button
                key={diff.id}
                type="button"
                className={`difficulty-pill ${isSelected ? 'difficulty-pill--selected' : ''}`}
                style={{ '--diff-color': diff.color }}
                onClick={() => setForm({ ...form, difficulty: diff.id })}
              >
                <span>{diff.label}</span>
                <span className="xp-tag">+{diff.xp} XP</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          <Flame size={18} />
          <span>{habit ? 'Save Changes' : 'Create Habit'}</span>
        </button>
      </div>
    </form>
  );
}
