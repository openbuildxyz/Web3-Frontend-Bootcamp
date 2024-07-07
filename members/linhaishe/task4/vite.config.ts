import { defineConfig, loadEnv } from 'vite';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';

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
