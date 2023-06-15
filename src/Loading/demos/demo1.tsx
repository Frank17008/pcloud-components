import React, { useRef } from 'react';
import { Button } from 'antd';
import { Loading } from '@pointcloud/pcloud-components';

export default () => {
  function onClick() {
    Loading.open();

    setTimeout(() => {
      Loading.close();
    }, 1000);
  }
  return (
    <div className="test" style={{ position: 'relative', top: 0 }}>
      <Button onClick={onClick}>提交</Button>
    </div>
  );
};
