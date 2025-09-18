const fs = require('fs');
const path = require('path');

function deleteFolderRecursive(folderPath) {
  try {
    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
      console.log(`成功删除目录: ${folderPath}`);
    }
  } catch (error) {
    console.error(`删除目录失败: ${error.message}`);
    // 如果第一次删除失败，尝试逐个删除文件
    try {
      const files = fs.readdirSync(folderPath);
      files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        if (fs.lstatSync(filePath).isDirectory()) {
          deleteFolderRecursive(filePath);
        } else {
          fs.unlinkSync(filePath);
        }
      });
      fs.rmdirSync(folderPath);
      console.log(`手动删除成功: ${folderPath}`);
    } catch (manualError) {
      console.error(`手动删除也失败了: ${manualError.message}`);
    }
  }
}

// 获取命令行参数
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('请指定要清理的目录类型: tmp 或 docs');
  process.exit(1);
}

const dirType = args[0];
let targetPath = '';

if (dirType === 'tmp') {
  targetPath = path.join(__dirname, '../.dumi/tmp');
} else if (dirType === 'docs-dist') {
  targetPath = path.join(__dirname, '..', 'docs-dist');
} else {
  console.error('不支持的目录类型，请使用: tmp 或 docs');
  process.exit(1);
}

deleteFolderRecursive(targetPath);
