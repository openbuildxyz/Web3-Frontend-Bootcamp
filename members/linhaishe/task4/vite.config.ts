import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig(({ mode }) => {
  return {
    define: {
      global: {},
      'process.env': process.env,
    },
    plugins: [react()],
  };
});
