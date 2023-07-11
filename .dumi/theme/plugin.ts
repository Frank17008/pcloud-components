/*
 * @Author       : wangfeihu
 * @Date         : 2023-07-05 14:31:47
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-07-11 10:11:47
 * @Description  : 自定义插件，用于在webpack中添加source-replace-loader
 */
import { IApi } from 'dumi';
import path from 'path';

export default (api: IApi) => {
  api.describe({
    key: 'dumiThemeAlias',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
    enableBy: api.EnableBy.config,
  });

  api.modifyWebpackConfig((memo) => {
    if (memo.module?.rules instanceof Array) {
      memo.module.rules = [
        {
          // 对antd-style目录下的文件进行处理
          test: /[\\|/]antd-style[\\|/][^\.]*\.(js|jsx|ts|tsx)$/,
          // 尽可能使用绝对路径
          use: { loader: path.join(__dirname, './source-replace-loader.js'), options: { alias: api.userConfig.dumiThemeAlias } },
        },
        ...memo.module.rules,
      ];
    }
    return memo;
  });
};
