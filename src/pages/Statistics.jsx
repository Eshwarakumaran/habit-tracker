import StatCard from '../components/StatCard';
import { WeeklyBarChart, MonthlyLineChart, CategoryPieChart } from '../components/StatsChart';
import {
  getWeeklyChartData,
  getMonthlyChartData,
  getCategoryStats,
  getWeeklyCompletionPercent,
  getMonthlyCompletionPercent,
  calculateLongestStreak,
  countTotalCompletions,
} from '../utils/gamification';
import EmptyState from '../components/EmptyState';
import { BarChart3, TrendingUp, Calendar, Flame, Skull, PieChart as PieIcon } from 'lucide-react';

export default function Statistics({ habits, completions }) {
  const today = new Date();
  const weeklyData = getWeeklyChartData(habits, completions);
  const monthlyData = getMonthlyChartData(habits, completions);
  const categoryData = getCategoryStats(habits, completions);
  const weeklyPercent = getWeeklyCompletionPercent(habits, completions);
  const monthlyPercent = getMonthlyCompletionPercent(
    habits,
    completions,
    today.getFullYear(),
    today.getMonth()
  );
  const longestStreak = calculateLongestStreak(habits, completions);
  const totalCompleted = countTotalCompletions(completions);

  if (habits.length === 0) {
    return (
      <div className="page statistics-page">
        <div className="page-header">
          <div>
            <h1>Analytics & Stats</h1>
            <p className="page-subtitle">Performance metrics fueled by discipline.</p>
          </div>
        </div>
        <EmptyState
          iconName="BarChart3"
          title="No Analytics Data"
          message="Complete your daily habits to unlock interactive trend charts and statistics."
        />
      </div>
    );
  }

  return (
    <div className="page statistics-page">
      <div className="page-header">
        <div>
          <h1>Analytics & Hellfire Stats</h1>
          <p className="page-subtitle">Inspect your habit consistency, completion rates, and streak records.</p>
        </div>
      </div>

      <div className="stats-overview">
        <StatCard iconName="Zap" label="Weekly Completion" value={weeklyPercent} suffix="%" glow />
        <StatCard iconName="Calendar" label="Monthly Rate" value={monthlyPercent} suffix="%" />
        <StatCard iconName="Flame" label="Longest Streak" value={longestStreak} suffix=" days" glow />
        <StatCard iconName="Skull" label="Total Completions" value={totalCompleted} />
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-card-title">
            <BarChart3 size={18} color="#ff4500" />
            <h3>7-Day Completion Rate (%)</h3>
          </div>
          <WeeklyBarChart data={weeklyData} />
        </div>

        <div className="chart-card">
          <div className="chart-card-title">
            <TrendingUp size={18} color="#ff8c00" />
            <h3>Monthly Discipline Trend</h3>
          </div>
          <MonthlyLineChart data={monthlyData} />
        </div>

        <div className="chart-card">
          <div className="chart-card-title">
            <PieIcon size={18} color="#ff2200" />
            <h3>Habits Completed By Category</h3>
          </div>
          <CategoryPieChart data={categoryData} />
        </div>
      </div>
    </div>
  );
}
