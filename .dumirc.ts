import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  resolve: { docDirs: ['docs'] },
  outputPath: 'docs-dist',
  favicons: ['/images/favicon.png'],
  logo: '/images/favicon.png',
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
