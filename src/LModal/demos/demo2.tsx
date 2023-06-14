import React, { useState } from 'react';
import LModal from '..';
import { Button } from 'antd';

function Demo2() {
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
    <div style={{ width: '100%', height: '300px' }}>
      <Button onClick={onOPen}>open</Button>
      <LModal visible={data.visible} onCancel={onClose} mode="relative">
        <div>111</div>
      </LModal>
    </div>
  );
}

export default Demo2;
