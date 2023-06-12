import React, { useState } from 'react';
import LModal from '..';
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
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      <Button onClick={onOPen}>open</Button>
      <LModal
        visible={data.visible}
        onCancel={onClose}
        style={{ width: '100%', height: '100%' }}
        bodyStyle={{ height: '100%' }}
        mask={false}
        footer={null}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              height: 60,
              backgroundColor: 'red',
            }}
          >
            header
          </div>
          <div style={{ flex: 1, backgroundColor: 'blue' }}>content</div>
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
