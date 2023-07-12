import React from 'react';
import { DUpload, DUploadFile } from '@pointcloud/pcloud-components';

export default function PreviewDemo() {
  const onChange = (files) => {
    console.log('files: ', files.length, files);
  };

  const testFile: DUploadFile = new File([new Blob(['测试内容'])], 'test2.txt');
  testFile.status = 'done';

  const files: DUploadFile[] = [
    testFile,
    {
      id: 1,
      name: '110500.jpg',
      status: 'done',
      url: '/mock/dupload/picture/110500.jpg',
      thumbUrl: '/mock/dupload/picture/110500-thumb.jpg',
    },
    { id: 2, name: '110504.png', status: 'done', thumbUrl: '/mock/dupload/picture/110504.png' },
  ];

  function resBlob(reader, data, type): Promise<Blob> {
    return new Promise((resolve) => {
      function push() {
        reader.read().then(({ done, value }) => {
          data.push(value);
          if (done) {
            resolve(new Blob(data, { type }));
          } else {
            push();
          }
        });
      }
      push();
    });
  }

  function formatDateTime(date) {
    function pad(num) {
      return num.toString().padStart(2, '0');
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${year}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}:${pad(second)}`;
  }

  // 预览png及pdf(如果是其他格式的文件，a标签会无法打开，此时会自动下载该文件)
  const onPreview = (file) => {
    // 如果file既不是是Blob类型又不包含url,则调用接口进行预览
    if (!(file instanceof Blob) && !file?.url) {
      return fetch('/mock/dupload/picture/110504.png').then((res) => {
        const reader = res.body?.getReader();
        return resBlob(reader, [], res.headers.get('Content-Type'));
      });
    } else {
      // 如果file是Blob类型或包含url,则使用默认方法直接预览
      return file;
    }
  };

  const onDownload = (file) => {
    // 如果file既不是是Blob类型又不包含url,则调用接口进行下载
    if (!(file instanceof Blob) && !file?.url) {
      const nameIndex: number = file.name.lastIndexOf('.');
      const name = file.name.substring(0, nameIndex);
      const extNmae = file.name.substring(nameIndex + 1);
      const fileName = `${name}_${formatDateTime(new Date())}.${extNmae}`;
      return fetch('/mock/dupload/picture/110504.png').then((res) => {
        const reader = res.body?.getReader();
        return resBlob(reader, [], res.headers.get('Content-Type')).then((res) => new File([res], fileName));
      });
    } else {
      // 如果file是Blob类型或包含url,则使用默认方法下载
      return file;
    }
  };

  return <DUpload value={files} multiple onChange={onChange} enablePreview onPreview={onPreview} onDownload={onDownload} />;
}
