import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), UnoCSS()],
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    }
  }
})

