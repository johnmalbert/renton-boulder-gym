import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: import.meta.dirname,          // scope to this project only
  server: { port: 5173, open: false },
  build: { outDir: 'build' },
});
