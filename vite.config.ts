import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' || warning.message.includes('use client')) {
          return;
        }
        warn(warning);
      },
    },
  },
  server: {
    port: 3000,
  }
});