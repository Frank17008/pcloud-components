import { defineConfig } from 'dumi';
const path = require('path');

export default defineConfig({
  title: 'pui-components',
  favicon: '/images/logo.png',
  logo: '/images/logo.png',
  outputPath: 'docs-dist',
  mode: 'site',
  lessLoader: { javascriptEnabled: true },
  // externals: {
  //   react: 'window.React',
  //   antd: 'window.antd',
  // },
  // scripts: [
  //   'https://cdnjs.cloudflare.com/ajax/libs/react/18.0.0/umd/react.production.min.js',
  //   'https://cdnjs.cloudflare.com/ajax/libs/antd/4.19.3/antd.min.js',
  // ],
  // 文件包含hash后缀
  hash: true,
  navs: [
    {
      title: '组件',
      path: '/components',
    },
  ],
  //  按需加载 antd
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  chainWebpack(memo) {
    // 设置 alias
    memo.resolve.alias.set('@pointcloud/pui-components', path.resolve(__dirname, 'src'));
    // 支持es
    memo.module
      .rule('mjs')
      .test(/\.mjs$/)
      .set('include', '/node_modules/')
      .set('type', 'javascript/auto');
  },
  // more config: https://d.umijs.org/config
});
