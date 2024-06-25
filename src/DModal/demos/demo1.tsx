import React, { useState } from 'react';
import { DModal } from '@pointcloud/pcloud-components';
import { Button } from 'antd';

function Demo1() {
  const [data, setData] = useState({ visible: false });
  const onOPen = () => {
    data.visible = true;
    setData({ ...data });
  };
  const onClose = () => {
    data.visible = false;
    setData({ ...data });
  };
  return (
    <div>
      <Button onClick={onOPen}>open</Button>
      <DModal visible={data.visible} onCancel={onClose} style={{ width: '100%', height: '50%' }}>
        <div>111</div>
      </DModal>
    </div>
  );
}

export default Demo1;
