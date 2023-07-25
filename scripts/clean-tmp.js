/*
 * @Author       : wangfeihu
 * @Date         : 2023-07-11 14:40:42
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-07-12 10:35:03
 * @Description  : 清除tmp目录，主要解决tmp目录非空导致npm start执行失败的问题
 */

const fs = require('fs');
const path = require('path');

// 递归删除文件及文件夹
function removeFileOrDir(path, retry = 1) {
  if (fs.existsSync(path)) {
    let retryCount = 0;
    if (fs.statSync(path).isDirectory()) {
      const files = fs.readdirSync(path);
      files.forEach((curPath) => {
        const tmpPath = path + '/' + curPath;
        removeFileOrDir(tmpPath);
      });
      try {
        fs.rmdirSync(path);
      } catch (err) {
        if (retryCount >= retry) {
          removeFileOrDir(path);
          retryCount++;
        }
      }
    } else {
      try {
        fs.unlinkSync(path);
      } catch (err) {
        if (retryCount >= retry) {
          removeFileOrDir(path);
          retryCount++;
        }
      }
    }
  }
}

const targetPath = path.join(__dirname, '../.dumi/tmp');

if (fs.existsSync(targetPath)) {
  removeFileOrDir(targetPath);
  console.log('removed success: ' + targetPath);
}
