import { defineConfig, loadEnv } from 'vite';
import viteBaseConfig from './vite.base.config';
import viteDevConfig from './vite.dev.config';
import viteProdConfig from './vite.prod.config';

// 策略模式
const envResolver = {
  "build": () => {
    // 生产环境配置
    console.log("build started");
    return ({ ...viteBaseConfig, ...viteDevConfig })
  },
  "serve": () => {
    // 开发环境配置
    console.log("serve started");
    return Object.assign({}, viteBaseConfig, viteProdConfig)
  }
};

export default defineConfig(({ mode, command }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '');
  console.log(env);


  // 根据命令和模式加载相应的配置
  return envResolver[command]();
});


