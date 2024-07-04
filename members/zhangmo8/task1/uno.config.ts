import { defineConfig, presetIcons, presetUno } from "unocss"

export default defineConfig({
  shortcuts: [
    ['btn', 'border-none px-4 py-1 rounded inline-block bg-#564c94 text-white cursor-pointer outline-none hover:bg-#6c60ba active:bg-#40386e'],
    ['icon-btn', 'h-12 rd inline-block cursor-pointer select-none border-none text-white bg-transparent transition ease-in-out hover:text-black hover:bg-#9991cc duration-500'],
  ],
  presets: [
    presetUno(),
    presetIcons(),
  ]
})
