# Development Guide

## Prerequisites
- Node.js 18+ (check `.nvmrc` for exact version)
- npm or yarn package manager
- Git

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Eshwarakumaran/spirit-of-vengeance.git
cd spirit-of-vengeance
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The app will open automatically at `http://localhost:5173`

### 4. Make Your Changes
- Edit files in `src/` directory
- Changes will hot-reload automatically
- Check console for any errors

### 5. Build for Production
```bash
npm run build
```
Output will be in the `dist/` directory.

### 6. Preview Production Build
```bash
npm run preview
```

## Project Structure

```
spirit-of-vengeance/
├── src/
│   ├── components/        # React components
│   ├── pages/            # Page components (Dashboard, Habits, etc.)
│   ├── data/             # Static data (quotes, achievements)
│   ├── utils/            # Utility functions and context
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── .github/
│   └── workflows/        # GitHub Actions workflows
├── vite.config.js        # Vite configuration
├── package.json          # Dependencies and scripts
└── README.md            # Project documentation
```

## Code Style

### JavaScript/React
- Use functional components with hooks
- Keep components focused and reusable
- Use meaningful names for functions and variables
- Add comments for complex logic
- Use arrow functions

### File Naming
- Components: PascalCase (e.g., `HabitCard.jsx`)
- Utils/Hooks: camelCase (e.g., `dateUtils.js`)
- Styles: Match component name (e.g., `HabitCard.css`)

### Comments
```javascript
// Single line comment for brief explanations

/* 
 * Multi-line comment for complex logic
 * or detailed explanations
 */
```

## Common Tasks

### Add a New Component
1. Create file in `src/components/YourComponent.jsx`
2. Export as default function
3. Import and use in other components

### Add a New Page
1. Create file in `src/pages/YourPage.jsx`
2. Add case in `App.jsx` switch statement
3. Add button in navigation if needed

### Modify State
- Use React Context in `src/utils/AppContext.jsx`
- Access via `useApp()` hook in components

### Add Data
- Quotes: `src/data/quotes.js`
- Achievements: `src/data/achievements.js`
- Categories: `src/data/categories.js`

## Testing Locally

### Test Different Browsers
- Chrome DevTools for debugging
- Firefox for compatibility
- Safari for macOS testing

### Test Offline
1. Open DevTools (F12)
2. Go to Network tab
3. Check "Offline" checkbox
4. All features should still work

### Test Data Export/Import
1. Go to Settings
2. Export data as JSON
3. Reset all data
4. Import the JSON back
5. Verify all data is restored

## Performance Tips

- Use React DevTools Profiler to identify slow components
- Check Network tab for large assets
- Use Lighthouse for performance audits
- Minimize re-renders with useMemo/useCallback

## Troubleshooting

### App not starting?
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port 5173 already in use?
```bash
# Kill the process or use different port
npm run dev -- --port 5174
```

### Build fails?
```bash
npm run build -- --verbose
```
Check for TypeScript/JavaScript errors in output

### localStorage issues?
- Open DevTools → Application → Storage → LocalStorage
- Check if data is being saved
- Clear storage and try again

## Submitting Changes

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Test thoroughly
4. Commit: `git commit -am 'Add my feature'`
5. Push: `git push origin feature/my-feature`
6. Create a Pull Request on GitHub

## Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Recharts Documentation](https://recharts.org/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [GitHub Markdown Guide](https://guides.github.com/features/mastering-markdown/)

## Need Help?

- Check existing GitHub issues
- Review the main README.md
- Look at similar components for examples
- Ask in discussions or create an issue

Happy coding! 🔥
