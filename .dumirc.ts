import { defineConfig } from 'dumi';
import { SiteThemeConfig } from 'dumi-theme-antd-style';
import path from 'path';

import { name } from './package.json';

const themeConfig: SiteThemeConfig = {
  name,
  logo: '/images/favicon.png',
  hero: {
    'zh-CN': {
      description: '基于Antd封装的轻量级React业务组件库',
      actions: [
        {
          type: 'primary',
          text: '开始使用',
          link: '/guide',
        },
        {
          text: '组件概览',
          link: '/components',
        },
        {
          text: 'Gitlab',
          link: 'http://192.168.101.96:8090/pointcloud_frontend/basiclibrary/pcloud-components',
          openExternal: true,
        },
      ],
      features: [],
    },
  },
  socialLinks: { gitlab: 'http://192.168.101.96:8090/pointcloud_frontend/basiclibrary/pcloud-components' },
  apiHeader: {
    pkg: name,
    sourceUrl: `{gitlab}/tree/master/src/components/{atomId}/index.tsx`,
    docUrl: `{gitlab}/tree/master/example/docs/components/{atomId}.{locale}.md`,
  },
  footer: 'PointCloud',
};

export default defineConfig({
  themeConfig,
  resolve: { docDirs: ['docs', 'src'] },
  outputPath: 'docs-dist',
  favicons: ['/images/favicon.png'],
  locales: [
    { id: 'zh-CN', name: '中文', suffix: '' },
    { id: 'en-US', name: 'English', suffix: '-en' },
  ],
  alias: {
    '@pointcloud/pcloud-components': path.join(__dirname, './src'),
    antd5: path.join(__dirname, './node_modules/dumi-theme-antd-style/node_modules/antd'),
  },
  mfsu: false,
  styles: [
    `html, body { background: transparent; }
    @media (prefers-color-scheme: dark) {
      html, body { background: #0E1116; }
    }
    h1, h2, h3, h4, h5, h6 { font-weight: bold !important; }`,
  ],
  codeSplitting: { jsStrategy: 'granularChunks' },
  dumiThemeAlias: { antd: 'antd5' },
});
