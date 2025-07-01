import { RCropper } from '@pointcloud/pcloud-components';
import React, { useState } from 'react';
import { Radio } from 'antd';

const src = 'https://img1.baa.bitautotech.com/dzusergroupfiles/2024/11/06/e2a4e9bb9e854429bed46ba1e343b47a.jpg';
export default () => {
  const [dragMode, setDragMode] = useState<'crop' | 'move' | 'none'>('crop');
  const onCrop = (base64: string | undefined, file?: File) => {
    console.log(base64, file);
  };
  return (
    <>
      模式:&nbsp;&nbsp;
      <Radio.Group value={dragMode} onChange={(e) => setDragMode(e.target.value)} style={{ marginBottom: 16 }}>
        <Radio.Button value="crop">裁剪(crop)</Radio.Button>
        <Radio.Button value="move">移动(move)</Radio.Button>
        <Radio.Button value="none">无(none)</Radio.Button>
      </Radio.Group>
      <RCropper style={{ height: 300 }} dragMode={dragMode} src={src} onCrop={onCrop} />
    </>
  );
};
