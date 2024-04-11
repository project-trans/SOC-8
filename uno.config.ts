import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerVariantGroup,
} from 'unocss'
import { presetExtra } from 'unocss-preset-extra'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-flex justify-center gap-2 text-white leading-30px children:mya !no-underline cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
  ],
  presets: [
    presetUno({
      dark: 'class',
    }),
    presetAttributify(),
    presetExtra(),
    presetTypography(),
    presetIcons({
      prefix: 'i-',
      scale: 1,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        'min-width': '1.2rem',
      },
      warn: true,
    }),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
})
