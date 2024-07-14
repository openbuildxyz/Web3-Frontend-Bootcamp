import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
    presets: [presetAttributify(), presetUno()],
    content: {
        pipeline: {
          include: [
            // 默认设置
            /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
            // 项目中的文件
            'src/**/*.{js,ts}',
          ],
        },
      },
})