import CategoryIcon from './CategoryIcon';
import { Flame } from 'lucide-react';

export default function EmptyState({ iconName = 'Flame', icon, title, message, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        {iconName ? <CategoryIcon iconName={iconName} size={42} color="#ff4500" /> : icon || <Flame size={42} color="#ff4500" />}
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {actionLabel && onAction && (
        <button className="btn btn-primary" onClick={onAction}>
          <Flame size={16} />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
