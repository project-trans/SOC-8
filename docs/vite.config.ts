import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import { GitChangelog, GitChangelogMarkdownSection } from '@nolebase/vitepress-plugin-git-changelog/vite'
import { MarkdownTransform } from './.vitepress/plugins/markdownTransform'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [
    MarkdownTransform(),
    GitChangelog({
      repoURL: () => 'https://github.com/project-trans/SOC-8',
      rewritePaths: {
        'docs/': 'SOC-8/',
      },
    }),
    GitChangelogMarkdownSection({
      sections: {
        disableChangelog: false,
        disableContributors: true,
      },
      getChangelogTitle: () => '变更历史',
      excludes: [],
      exclude: (_, { helpers }): boolean => {
        if (helpers.idEquals('index.md'))
          return true

        return false
      },
    }),
    Components({
      dirs: resolve(__dirname, '.vitepress/theme/components'),
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: './.vitepress/components.d.ts',
      transformer: 'vue3',
    }),
    UnoCSS(),
  ],
})
