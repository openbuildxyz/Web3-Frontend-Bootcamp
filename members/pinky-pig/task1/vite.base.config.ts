import path, { resolve } from 'node:path'
import react from '@vitejs/plugin-react'

export default {
  resolve: {
    alias: {
      '~/': `${resolve(__dirname)}/src/`,
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  plugins: [react()],
}
