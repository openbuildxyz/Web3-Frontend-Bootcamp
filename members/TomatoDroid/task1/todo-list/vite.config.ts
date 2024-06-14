import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS({
      shortcuts: {
        'border-base': 'border-gray-200 dark:border-gray-800',
        'bg-active': 'bg-gray:10',
        'bg-faded': 'bg-gray:5',
        'bg-base': 'bg-white dark:bg-[#020420]',
        'text-faded': 'text-gray6:100 dark:text-gray:100',
      },
      theme: {
        colors: {
          primary: {
            DEFAULT: '#00DC82',
          },
        },
      },
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle',
          },
        }),
      ],
      transformers: [
        transformerDirectives(),
      ],
    }),
    React(),
  ],
})
