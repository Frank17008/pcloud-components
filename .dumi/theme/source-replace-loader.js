/*
 * @Author       : wangfeihu
 * @Date         : 2023-07-05 15:02:44
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-07-10 13:41:18
 * @Description  : 根据传入的正则表达式进行import的替换
 */

module.exports = function (sourceCode) {
  const { alias } = this.getOptions() || {};

  let newSourceCode = sourceCode;

  for (const key in alias) {
    if (key) {
      const sourceName = key;
      const targetName = alias[key];
      const importReg1 = new RegExp(`import\\s+['|"]\\s*${sourceName}\/[^'|"]*['|"]`, 'g'); // 匹配import 'xxx'
      const importReg2 = new RegExp(`import\\s+([^'|"]*)['|"]\\s*${sourceName}\\s*['|"]`, 'g'); // 匹配import xxx from 'xxx'

      // 匹配import 'xxx',将sourceName模块替换为targetName
      newSourceCode = newSourceCode.replace(importReg1, (match) => {
        return match.replace(new RegExp(`['|"]\\s*${sourceName}`), `'${targetName}`);
      });

      // 匹配import xxx from 'xxx',将sourceName模块替换为targetName
      newSourceCode = newSourceCode.replace(importReg2, (match) => {
        return match.replace(new RegExp(`['|"]\\s*${sourceName}\\s*['|"]`), `'${targetName}'`);
      });
    }
  }
  return newSourceCode;
};
