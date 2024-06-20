import react from '@vitejs/plugin-react';
import path from 'path';
import postcssPresetEnv from 'postcss-preset-env';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // 配置 Scss
    // https://vitejs.dev/config/shared-options.html#css-preprocessoroptions
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/styles/sassConfig.scss";`,
            },
            less: {
                math: "always",
                globalVars: {
                    primary: '#007bff',
                    success: '#28a745',
                    info: '#17a2b8',
                    warning: '#ffc107',
                    danger: '#dc3545',
                }
            }
        },
        modules: {
            localsConvention: "camelCase",
            generateScopedName: '[name]__[local]___[hash:base64:5]',
            hashPrefix: 'toDoList',
        },
        devSourcemap: true, // 配置是否生成 source map 文件索引
        postcss: {
            plugins: [postcssPresetEnv()],
        }
    },
    // 配置 alias
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    // 配置 proxy
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    optimizeDeps: {
        exclude: [] // 将需要排除的依赖项添加到数组中
    },
    // 配置 env 文件
    // https://vitejs.dev/config/shared-options.html#envprefix
    envPrefix: ['VITE_', 'ENV_']
})
