import { type DefaultTheme } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

export const sidebar =  generateSidebar([
  // 大学指南
  {
    documentRootPath: '/docs',
    scanStartPath: 'soc8cn',
    resolvePath: '/soc8cn/',
    useTitleFromFrontmatter: true,
    sortMenusByFrontmatterOrder: true,
  },

  // 这个 `as` 源于 vitepress-sidebar 的类型定义与实际情况的差异，目前不影响使用，后续 vitepress-sidebar 修复后可以移除。
]) as DefaultTheme.Config['sidebar']
