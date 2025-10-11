module.exports = {
  npm: {
    publish: true,
  },
  git: {
    push: true,
    requireBranch: 'main',
    tag: true,
    tagName: 'v${version}',
    commitMessage: 'chore: release v${version}',
  },
  github: {
    release: true,
    releaseName: 'v${version}',
    autoGenerate: true,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      infile: 'CHANGELOG.md',
      ignoreRecommendedBump: true,
      strictSemVer: true,
      preset: {
        name: 'conventionalcommits',
        types: [
          {
            type: 'feat',
            section: '✨ 新功能',
          },
          {
            type: 'fix',
            section: '🐛 修复bug',
          },
          {
            type: 'docs',
            section: '📚 文档变更',
          },
          {
            type: 'style',
            section: '💄 代码美化',
            hidden: true,
          },
          {
            type: 'refactor',
            section: '♻️ 重构',
            hidden: true,
          },
          {
            type: 'perf',
            section: '⚡️ 性能优化',
          },
          {
            type: 'test',
            section: '✅ 测试',
            hidden: true,
          },
          {
            type: 'build',
            section: '📦️ 打包',
            hidden: true,
          },
          {
            type: 'ci',
            section: '👷 流程变更',
            hidden: true,
          },
          {
            type: 'chore',
            section: '🚀 构建/工程依赖/工具',
            hidden: true,
          },
          {
            type: 'revert',
            section: '⏪️ 回退',
            hidden: true,
          },
        ],
      },
    },
  },
  hooks: {
    'after:bump': 'npx gh-pages -d docs-dist',
  },
};
