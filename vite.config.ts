import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src', // This matches the tsconfig path alias
    },
  },
});
