import React, { useState } from 'react';
import { LModal } from '@pointcloud/pcloud-components';
import { Button } from 'antd';

function Demo4() {
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
    <div style={{ width: '100%', height: '100px' }}>
      <Button onClick={onOPen}>open</Button>
      <LModal visible={data.visible} onCancel={onClose} style={{ width: '80%', height: '50%' }} bodyStyle={{ height: '100%' }} footer={null}>
        <div style={{ height: '100%', overflow: 'auto' }}>
          <div
            style={{
              height: 60,
              backgroundColor: 'red',
            }}
          >
            header
          </div>
          <div style={{ height: 1000, backgroundColor: 'blue' }}>content</div>
          <div
            style={{
              height: 60,
              backgroundColor: 'yellow',
            }}
          >
            footer
          </div>
        </div>
      </LModal>
    </div>
  );
}

export default Demo4;
