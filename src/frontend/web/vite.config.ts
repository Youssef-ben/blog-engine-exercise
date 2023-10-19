import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      App: path.resolve(__dirname, './src/'),
      Assets: path.resolve(__dirname, './src/assets/'),
      Controller: path.resolve(__dirname, './src/controller/'),
      Models: path.resolve(__dirname, './src/models/'),
      Views: path.resolve(__dirname, './src/views/'),
    },
  },
});
