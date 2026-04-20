import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    // Properly set NODE_ENV via Vite config (not .env)
    'process.env.NODE_ENV': JSON.stringify(mode),
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
