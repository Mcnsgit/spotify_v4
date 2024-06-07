import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'development',
  base: '/spotvisual-music-player/',
  root: path.resolve(__dirname, 'src'),
  publicDir: path.resolve(__dirname, 'public'), // Adjusted to use publicDir
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Correctly resolved path for output directory
    emptyOutDir: true
  },
  logLevel: 'info',
  define: {
    'process.env': process.env
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@types/react']
  },
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
