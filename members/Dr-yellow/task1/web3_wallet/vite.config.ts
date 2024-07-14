import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9000, // 你想要的端口号
    host:'0.0.0.0'

  },
  resolve:{
    alias:{
      '@':'/src'
    }
  }
})
