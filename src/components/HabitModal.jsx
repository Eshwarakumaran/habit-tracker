import HabitForm from './HabitForm';
import { X, Flame } from 'lucide-react';

export default function HabitModal({ isOpen, habit, onSubmit, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Flame size={20} color="#ff4500" />
            <h2>{habit ? 'Edit Habit' : 'Create New Habit'}</h2>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <HabitForm
          habit={habit}
          onSubmit={(data) => {
            onSubmit(data);
            onClose();
          }}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
