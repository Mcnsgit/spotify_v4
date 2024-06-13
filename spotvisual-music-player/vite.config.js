import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  base: '/',
  publicDir: fileURLToPath(new URL('./public', import.meta.url)),
  build: {
    outDir: fileURLToPath(new URL('./dist', import.meta.url)),
    emptyOutDir: true,
  },
  plugins: [react()],
  server: {
    port: 3000,
    host: 'localhost',
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'path': 'path-browserify',
    
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@types/react'],
  },
  define: {
    __APP_ENV__: JSON.stringify(process.env.APP_ENV),
    CLIENT_ID__: JSON.stringify(process.env.CLIENT_ID),
    CLIENT_SECRET__: JSON.stringify(process.env.CLIENT_SECRET),
    REDIRECT_URI__: JSON.stringify(process.env.REDIRECT_URI),
    REFRESH_TOKEN__: JSON.stringify(process.env.REFRESH_TOKEN),
    'process.env': {
      CLIENT_ID: JSON.stringify(process.env.CLIENT_ID),
      CLIENT_SECRET: JSON.stringify(process.env.CLIENT_SECRET),
      REDIRECT_URI: JSON.stringify(process.env.REDIRECT_URI),
      REFRESH_TOKEN: JSON.stringify(process.env.REFRESH_TOKEN),
    },
  },
  envDir: fileURLToPath(new URL('.', import.meta.url)),
  envPrefix: 'VITE_',
  logLevel: 'info',
});