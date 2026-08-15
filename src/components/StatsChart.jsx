import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';
import { getCategoryById } from '../data/categories';

const FLAME_COLORS = ['#ff4500', '#ff6b35', '#ff5722', '#e65100', '#ff7043', '#ff8c00'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p>{label}</p>
      <p>{payload[0].value}% complete</p>
    </div>
  );
};

export function WeeklyBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="name" stroke="#888" fontSize={12} />
        <YAxis stroke="#888" fontSize={12} domain={[0, 100]} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="percent" fill="#ff4500" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MonthlyLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="name" stroke="#888" fontSize={11} interval={2} />
        <YAxis stroke="#888" fontSize={12} domain={[0, 100]} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="percent"
          stroke="#ff4500"
          strokeWidth={2}
          dot={{ fill: '#ff4500', r: 3 }}
          activeDot={{ r: 6, fill: '#ff6600' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function CategoryPieChart({ data }) {
  const chartData = data.map((d) => ({
    ...d,
    name: getCategoryById(d.category).label,
  }));

  if (chartData.length === 0) {
    return <p className="chart-empty">No category data yet.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="completed"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={50}
          paddingAngle={3}
        >
          {chartData.map((_, i) => (
            <Cell key={i} fill={FLAME_COLORS[i % FLAME_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="chart-tooltip">
                <p>{payload[0].name}</p>
                <p>{payload[0].value} completions</p>
              </div>
            );
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
