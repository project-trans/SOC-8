import { defineConfig } from 'vitepress'
import nav from './nav'
import mdPangu from "markdown-it-pangu"
import katex from 'markdown-it-katex'
import footnote from 'markdown-it-footnote'
import { sidebar } from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  vite: {
    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/vitepress-plugin-highlight-targeted-heading'
      ],
    },
  },
  title: "SOC-8",
  description: "跨性别和多元性别人群健康照护指南第八版（SOC-8）",
  base: '/SOC-8/',
  markdown: {
    config(md) {
      md.use(mdPangu);
      md.use(footnote);
      md.use(katex);
    },
  },
  dir: 'docs',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: 'SOC-8',
    nav,
    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/project-trans/SOC-8' }
    ],

    editLink: {
      pattern: 'https://github.com/project-trans/SOC-8/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面', // label localization
    },

    // label localization
    outline: { label: '本页大纲', level: 'deep' },
    lastUpdated: { text: '最后更新' },
    darkModeSwitchLabel: '深色模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
  }
})
