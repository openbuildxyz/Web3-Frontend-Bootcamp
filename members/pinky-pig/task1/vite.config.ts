import { defineConfig, mergeConfig } from 'vite'
import baseConfig from './vite.base.config'

// https://vitejs.dev/config/
// eslint-disable-next-line unused-imports/no-unused-vars
export default defineConfig(({ mode }) => {
  return mergeConfig(baseConfig, {
    build: {
      outDir: 'dist',
    },
  })
})
