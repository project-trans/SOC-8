import genConfig from '@project-trans/vitepress-theme-project-trans/config'
import type { SidebarOptions } from '@project-trans/vitepress-theme-project-trans/theme'
import type { ThemeContext } from '@project-trans/vitepress-theme-project-trans/utils'
import { withThemeContext } from '@project-trans/vitepress-theme-project-trans/utils'
import type { DefaultTheme } from 'vitepress'

type NavConfig = DefaultTheme.Config['nav']

const nav = [
  {
    text: '简体中文翻译',
    link: '/soc8cn/',
  },
]

const baseConfig = {
  useTitleFromFrontmatter: true,
  sortMenusByFrontmatterOrder: true,
  useFolderTitleFromIndexFile: true,
  useFolderLinkFromIndexFile: true,
  excludeFilesByFrontmatterFieldName: true,
  collapsed: true,
  documentRootPath: '/docs',
} satisfies Partial<SidebarOptions>

const sidebarOptions = [
  {
    ...baseConfig,
    scanStartPath: 'soc8cn',
    resolvePath: '/soc8cn/',
    sortMenusByFrontmatterOrder: true,
  }
]

const themeConfig: ThemeContext = {
  siteTitle: 'SOC-8',
  siteDescription: '跨性别和多元性别人群健康照护指南第八版（SOC-8）',
  baseUrl: '/SOC-8/',
  /** Repo */
  githubRepoLink: 'https://github.com/project-trans/SOC-8',
  /** vitepress 根目录 */
  rootDir: 'docs',
  /** 文档所在目录（目前似未使用此项） */
  include: ['soc8cn'],
  nav,
  sidebarOptions,
  enableChangeLog: false,
  enableSuggestionBox: false,
  /** 文档所在目录（用于GitHub编辑链接） */
  sitePattern: `src`,
}

// https://vitepress.dev/reference/site-config
export default withThemeContext(themeConfig, genConfig)
