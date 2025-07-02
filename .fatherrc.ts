import { defineConfig } from 'father';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: { output: 'dist/esm' },
  umd: {
    output: 'dist/umd',
    // 生产环境打包时不打包public文件夹
    chainWebpack: (memo) => {
      if (process.env.NODE_ENV === 'production') {
        memo.plugin('copy').tap((options) => {
          options[0].patterns[0].filter = () => false;
          return options;
        });
        // memo.module.rules.delete('svg');
        // memo.module
        //   .rule('svg')
        //   .test(/\.svg$/)
        //   .use('@svgr/webpack')
        //   .loader('@svgr/webpack')
        //   .options({
        //     svgo: true,
        //   });
      }

      return memo;
    },
  },
});
