// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import './styles/vitepress-vars.css'
import './styles/styles.css'
import 'uno.css'

import {  
  NolebaseHighlightTargetedHeading,  
} from '@nolebase/vitepress-plugin-highlight-targeted-heading'

import '@nolebase/vitepress-plugin-highlight-targeted-heading/dist/style.css'

import { 
  NolebaseEnhancedReadabilitiesMenu, 
  NolebaseEnhancedReadabilitiesScreenMenu, 
} from '@nolebase/vitepress-plugin-enhanced-readabilities'

import '@nolebase/vitepress-plugin-enhanced-readabilities/dist/style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 为较宽的屏幕的导航栏添加阅读增强菜单
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu), 
      // 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
      'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'layout-top': () => [ 
        h(NolebaseHighlightTargetedHeading), 
      ], 
    })
  },
  enhanceApp() {
    // ...
  }
} satisfies Theme
