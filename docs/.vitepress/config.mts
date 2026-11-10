import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-GB',
  title: 'Moodle Baselines',
  description: 'Guides and reference material for Moodle baselines.',
  base: '/moodle-baselines/',
  themeConfig: {
    nav: [
      { text: 'Documentation', link: '/' },
      { text: 'GitHub', link: 'https://github.com/jontulloch/moodle-baselines' }
    ],
    sidebar: [
      {
        text: 'Moodle Baselines',
        items: [
          { text: 'Welcome', link: '/' },
          { text: 'Getting started', link: '/guide/getting-started' },
          { text: 'Example baseline', link: '/guide/example-baseline' }
        ]
      }
    ],
    search: { provider: 'local' },
    outline: { label: 'On this page', level: [2, 3] },
    editLink: {
      pattern: 'https://github.com/jontulloch/moodle-baselines/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    docFooter: { prev: 'Previous page', next: 'Next page' }
  }
})
