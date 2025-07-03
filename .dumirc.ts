import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  resolve: { docDirs: ['docs'] },
  outputPath: 'docs-dist',
  favicons: ['/images/favicon.png'],
  title: 'pcloud-components组件库',
  themeConfig: {
    name: 'pcloud-components',
    logo: '/images/favicon.png',
    // editLink: true,
    footer:
      '<p>© 2023-present <a href="http://www.pcgi.com.cn" target="_blank">PointCloud</a>. All rights reserved.</p><p>Powered by <a href="https://d.umijs.org" target="_blank">Dumi</a>.</p><p>Author: Frank Dong</p>',
    socialLinks: {
      github: 'https://github.com',
      yuque: 'https://www.yuque.com',
      zhihu: 'https://www.zhihu.com',
    },
  },
  locales: [
    { id: 'zh-CN', name: '中文', suffix: '' },
    { id: 'en-US', name: 'English', suffix: '-en' },
  ],
  alias: {
    '@pointcloud/pcloud-components': path.join(__dirname, './src'),
  },
  mfsu: false,
  styles: [
    `html, body { background: transparent; }
    @media (prefers-color-scheme: dark) {
      html, body { background: #0E1116; }
    }`,
  ],
  codeSplitting: { jsStrategy: 'granularChunks' },
});
