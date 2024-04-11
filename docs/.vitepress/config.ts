import { readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vitepress'
import mdPangu from 'markdown-it-pangu'
import katex from 'markdown-it-katex'
import footnote from 'markdown-it-footnote'
import nav from './nav'
import { sidebar } from './sidebar'

const dir = 'docs'
const siteTitle = 'SOC-8'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  vite: {
    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/vitepress-plugin-highlight-targeted-heading',
      ],
    },
  },
  title: 'SOC-8',
  base: '/SOC-8/',
  markdown: {
    config(md) {
      md.use(mdPangu)
      md.use(footnote)
      md.use(katex)
    },
  },
  dir,
  lastUpdated: true,
  head: [
    ['meta', { property: 'og:site_name', content: siteTitle }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle,
    nav,
    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/project-trans/SOC-8' },
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
  },
  transformHead: (context) => {
    const head = [...context.head] || []

    const pageSourceFilePath = join(dir, context.pageData.filePath)
    const pageSourceFileStat = statSync(join(dir, context.pageData.filePath))

    if (pageSourceFileStat.isDirectory()) {
      head.push([
        'meta',
        {
          property: 'og:title',
          content: siteTitle,
        },
      ])

      head.push([
        'meta',
        {
          name: 'description',
          content: '跨性别和多元性别人群健康照护指南第八版（SOC-8）',
        },
      ])

      return head
    }

    let pageSourceFileContent = readFileSync(pageSourceFilePath, { encoding: 'utf-8' })

    // remove all frontmatter
    pageSourceFileContent = pageSourceFileContent.replace(/---[\s\S]*?---/, '')

    // remove markdown heading markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/^(#+)\s+(.*)/gm, ' $2 ')
    // remove markdown link markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/\[([^\]]+)\]\([^)]+\)/gm, ' $1 ')
    // remove markdown image markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/\!\[([^\]]+)\]\([^)]+\)/gm, ' $1 ')
    // remove markdown reference link markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/\[.*]/gm, '')
    // remove markdown bold markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/\*\*([^*]+)\*\*/gm, ' $1 ')
    pageSourceFileContent = pageSourceFileContent.replace(/__([^*]+)__/gm, ' $1 ')
    // remove markdown italic markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/\*([^*]+)\*/gm, ' $1 ')
    pageSourceFileContent = pageSourceFileContent.replace(/_([^*]+)_/gm, ' $1 ')
    // remove markdown code markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/`([^`]+)`/gm, ' $1 ')
    // remove markdown code block markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/```([^`]+)```/gm, ' $1 ')
    // remove markdown table header markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/\|:?-+:?\|/gm, '')
    // remove markdown table cell markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/\|([^|]+)\|/gm, ' $1 ')

    // remove specific html tags completely
    const tags = ['']
    tags.forEach((tag) => {
      pageSourceFileContent = pageSourceFileContent.replace(new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, 'g'), '')
    })

    // remove specific html tags but keep the text content
    const tagsToKeepContent = ['u', 'Containers', 'img', 'a']
    tagsToKeepContent.forEach((tag) => {
      pageSourceFileContent = pageSourceFileContent.replace(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'g'), ' $1 ')
    })

    // remove all new lines (either \r, \n)
    pageSourceFileContent = pageSourceFileContent.replace(/[\r|\n]/gm, '')

    // calculate the first 200 characters of the page content
    let pageContent = pageSourceFileContent.slice(0, 200)
    // trim space
    pageContent = pageContent.trim()
    // if pageSourceFileContent is longer than 200 characters, add ellipsis
    if (pageSourceFileContent.length > 100)
      pageContent += '...'

    head.push([
      'meta',
      { name: 'description', content: pageContent },
    ])

    head.push([
      'meta',
      { property: 'og:title', content: context.title },
    ])

    head.push([
      'meta',
      { property: 'og:description', content: pageContent },
    ])

    head.push([
      'meta',
      { property: 'og:title', content: context.title },
    ])

    head.push([
      'meta',
      { property: 'twitter:description', content: pageContent },
    ])

    return head
  },
})
