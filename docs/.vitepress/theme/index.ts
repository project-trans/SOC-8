// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import './styles/vitepress-vars.css'
import './styles/styles.css'
import 'uno.css'

import {
  NolebaseEnhancedReadabilitiesPlugin,
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities'

import {
  NolebaseHighlightTargetedHeading,
  NolebaseNolebaseHighlightTargetedHeadingPlugin,
} from '@nolebase/vitepress-plugin-highlight-targeted-heading'

import {
  NolebaseGitChangelogPlugin
} from '@nolebase/vitepress-plugin-git-changelog/client'

import '@nolebase/vitepress-plugin-enhanced-readabilities/dist/style.css'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/dist/style.css'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'

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
  enhanceApp({ app }) {
    app.use(NolebaseEnhancedReadabilitiesPlugin, {
      spotlight: {
        defaultToggle: true,
      }
    })
    app.use(NolebaseNolebaseHighlightTargetedHeadingPlugin)
    app.use(NolebaseGitChangelogPlugin, {
      locales: {
        'zh-CN': {
          lastEditedDateFnsLocaleName: 'zhCN'
        }
      }
    })
  }
} satisfies Theme
