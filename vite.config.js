import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      // Use automatic JSX transform (React 17+ standard)
      // No need for explicit React imports in JSX files
    }),
  ],
  define: {
    // Properly set NODE_ENV via Vite config (not .env)
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
  build: {
    // Ensure proper minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
      },
      mangle: true,
    },
  },
  server: {
    proxy: {
      // Forward /api/* to the Express backend during development
      '/api': {
        target: 'http://localhost:10000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
}))
