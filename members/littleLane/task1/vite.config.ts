import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    // css 模块化
    modules: {
      generateScopedName: "[name]_[local]__[hash:base64:5]",
      hashPrefix: "prefix",
    },
    // 预编译支持 less
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      },
    },
  },
});
