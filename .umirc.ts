import { defineConfig } from 'dumi';

const path = require('path');

export default defineConfig({
  title: 'pui-components',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  lessLoader: { javascriptEnabled: true },
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
  },
  // more config: https://d.umijs.org/config
});
