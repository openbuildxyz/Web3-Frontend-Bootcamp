import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '127.0.0.1',  // Add this to force IPv4 only
  },
  plugins: [react()],
})
