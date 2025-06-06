import React, { useState } from 'react';
import { DModal } from '@pointcloud/pcloud-components';
import { Button, Input } from 'antd';

function Demo3() {
  const [data, setData] = useState({ visible: false });
  const [style, setStyle] = useState({ width: '80%', height: '100%' });
  const onOPen = () => {
    data.visible = true;
    setData({ ...data });
  };
  const onClose = () => {
    data.visible = false;
    setData({ ...data });
  };

  const onChangeWidth = (e) => {
    style.width = e.target.value;
    setStyle({ ...style });
  };
  const onChangeHeight = (e) => {
    style.height = e.target.value;
    setStyle({ ...style });
  };
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Button onClick={onOPen}>open</Button>
      <div style={{ display: 'flex' }}>
        <span>
          width: <Input value={style.width} onChange={onChangeWidth} />
        </span>
        <span>
          height: <Input value={style.height} onChange={onChangeHeight} />
        </span>
      </div>
      <DModal visible={data.visible} onCancel={onClose} style={style} mode="relative">
        <div>111</div>
      </DModal>
    </div>
  );
}

export default Demo3;
