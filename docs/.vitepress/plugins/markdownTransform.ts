import { relative, resolve } from 'node:path'
import type { Plugin } from 'vite'

const ROOT = resolve(__dirname, '../../')

export function MarkdownTransform(): Plugin {
  return {
    name: 'docs-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('.md'))
        return null

      id = relative(ROOT, id)
      if (id === 'index.md')
        return null

      code = pageHeaderTemplate(code)

      return code
    },
  }
}

function pageHeaderTemplate(code: string) {
  return code.replace(/(^---$(\s|\S)+^---$)/m, `$1

# {{ $frontmatter.title }}

<PageInfo />

`)
}
