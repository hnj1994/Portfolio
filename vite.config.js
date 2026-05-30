import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  server: {
    port: 5173,
    host: true,
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'oxc',         // Use oxc (built into Vite 8, no separate install)
    assetsInlineLimit: 0,  // Never inline images
  },
});
