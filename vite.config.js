import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
    plugins: [react()],
    base: command === 'serve' ? '/' : (process.env.VITE_APP_BASE || '/habit-tracker/'),
    build: {
        outDir: 'dist',
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom'],
                    'chart-vendor': ['recharts'],
                },
            },
        },
    },
    server: {
        port: 5173,
        open: true,
    },
}));