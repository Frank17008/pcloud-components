import React, { useState } from 'react';
import { Modal } from 'antd';

import { DUpload, DUploadFile } from '@pointcloud/pcloud-components';

const { imageToBase64 } = DUpload;

const loadedList: DUploadFile[] = [
  { id: 0, name: '110500.jpg', thumbUrl: '/mock/dupload/picture/110500-thumb.jpg' },
  { id: 1, name: '110502.jpg', thumbUrl: '/mock/dupload/picture/110502-thumb.jpg' },
  { id: 2, name: '110504.png', thumbUrl: '/mock/dupload/picture/110504.png' },
  { id: 3, name: '正门全景.jpg', thumbUrl: '/mock/dupload/picture/default.png' },
  { id: 4, name: '月牙湾 - 飞儿乐团.mp3' },
  {
    id: 5,
    name: 'ZJ-TZ-001_护国庙戏台历史建筑档案表.pdf',
    thumbUrl: '/mock/dupload/picture/default.png',
  },
];

export default function ListDemo() {
  const [fileList, setFileList] = useState<DUploadFile[]>(loadedList);

  const onChange = (files) => {
    console.log('files: ', files);
    setFileList(files);
  };

  // 为所有图像类文件添加base64预览
  const customRequest = (file: DUploadFile, list: DUploadFile[]) => {
    if (file.type?.startsWith('image')) {
      imageToBase64(file as unknown as Blob, { width: 300, height: 200, quality: 0.7 }).then((base64) => (file.thumbUrl = base64));
    }
    list.push(file);
    return list;
  };

  // 删除前弹窗确认，如果被删除文件不是通过文件对话框上传的，则将其标记为removed，并在列表中保留
  const onRemove = (file: DUploadFile, list: DUploadFile[]) => {
    const fileName = file?.fileName || file?.name || file?.id || file?.uid || '';
    return new Promise<DUploadFile[]>((resolve) => {
      Modal.confirm({
        centered: true,
        title: '删除',
        content: `是否删除文件${fileName} ?`,
        cancelText: '取消',
        okText: '确认',
        onOk() {
          if (file.source === 'upload') {
            const index = list.findIndex((item) => item.uid === file.uid);
            if (index >= 0) list.splice(index, 1);
          } else {
            file.status = 'removed';
          }
          resolve(list);
        },
      });
    });
  };

  return <DUpload multiple enablePreview fileList={fileList} onChange={onChange} customRequest={customRequest} onRemove={onRemove} />;
}
