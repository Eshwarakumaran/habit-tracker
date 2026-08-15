import CategoryIcon from './CategoryIcon';

export default function StatCard({ icon, iconName, label, value, suffix = '', glow = false }) {
  return (
    <div className={`stat-card ${glow ? 'stat-card--glow' : ''}`}>
      <div className="stat-card-icon">
        {iconName ? <CategoryIcon iconName={iconName} size={22} color="#ff5500" /> : icon}
      </div>
      <div className="stat-card-content">
        <span className="stat-card-value">
          {value}
          {suffix && <span className="stat-card-suffix">{suffix}</span>}
        </span>
        <span className="stat-card-label">{label}</span>
      </div>
    </div>
  );
}
