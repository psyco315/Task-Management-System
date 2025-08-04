import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';



export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173
  },
  base: '/', // ensure this is '/'
});
