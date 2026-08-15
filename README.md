# Spirit of Vengeance

> **Forge your destiny. Ride with discipline.**

A dark, gamified habit tracker web application with a hellfire-inspired aesthetic. Track daily habits, earn XP, unlock achievements, and channel your inner fire — all stored locally in your browser.

![Spirit of Vengeance](public/skull.svg)

## Features

### Dashboard
- **Soul Energy** — Real-time percentage of today's habit completion
- **Current Streak** — Consecutive days of perfect completion
- **Total Completed** — Lifetime habit completions
- **Today's Progress** — Habits done vs. due today
- **XP & Level** — Gamified progression with level-up animations
- **Daily Motivation** — Random hellfire-themed quotes on load

### Habit Management
- Add, edit, and delete habits
- Mark habits complete/incomplete
- Set frequency: **Daily** or **Weekly**
- Categories: Fitness, Study, Health, Coding, Personal
- Form validation and empty states

### Gamification
- **+25 XP** per habit completion (+ streak bonus up to +50)
- Level progression with visual progress bar
- **Achievements:**
  - 🔥 **First Flame** — Complete your first habit
  - ⛓️ **Hellwalker** — 7-day streak
  - 💀 **Soul Collector** — 50 total completions
  - 🏍️ **Spirit of Vengeance** — 30-day streak
  - And more...

### Calendar
- Monthly view with flame indicators for perfect days
- Partial and missed day styling
- Click any date to view completed habits

### Statistics
- Weekly and monthly completion percentages
- Longest streak tracking
- Interactive charts (bar, line, pie) powered by Recharts

### Settings
- Export/import JSON backups
- Reset all data
- Fully offline — no backend required

## Technologies

| Tech | Purpose |
|------|---------|
| [React 18](https://react.dev/) | UI framework |
| [Vite 6](https://vitejs.dev/) | Build tool & dev server |
| [Recharts](https://recharts.org/) | Statistics charts |
| CSS3 | Styling, animations, responsive design |
| localStorage | Persistent data storage |

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── FlameBackground.jsx
│   ├── SoulEnergyCard.jsx
│   ├── HabitCard.jsx
│   ├── HabitCalendar.jsx
│   └── ...
├── pages/            # Route sections
│   ├── Dashboard.jsx
│   ├── Habits.jsx
│   ├── CalendarPage.jsx
│   ├── Statistics.jsx
│   ├── Achievements.jsx
│   └── Settings.jsx
├── data/             # Static data (quotes, achievements, categories)
├── utils/            # Helpers, gamification logic, context
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Eshwarakumaran/spirit-of-vengeance.git
cd spirit-of-vengeance

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

1. **First launch** — Sample habits are pre-loaded to get you started
2. **Complete habits** — Click "Mark Complete" on any habit card to earn XP
3. **Forge new habits** — Navigate to "My Habits" and click "+ Forge Habit"
4. **Track progress** — Use the Calendar and Statistics pages to visualize your journey
5. **Unlock achievements** — Stay consistent to earn badges
6. **Backup data** — Export your progress from Settings before clearing browser data

## Design

- Dark charcoal background with burning orange/red glow effects
- Original skull, chain, and flame visual elements (no copyrighted assets)
- Cinematic gaming-dashboard aesthetic
- Fully responsive: sidebar on desktop, bottom nav on mobile
- Lightweight CSS animations for flames, XP gains, and level-ups

## License

MIT — free to use for personal and portfolio projects.

---

*Vengeance begins with discipline.*
