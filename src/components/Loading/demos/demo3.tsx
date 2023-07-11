import React, { useRef } from 'react';
import { Button } from 'antd';
import { Loading } from '@pointcloud/pcloud-components';

export default () => {
  const container = useRef<any>();
  function onClick() {
    Loading.open({ tip: '正在疯狂提交, 请耐心等待...', container: container.current });
    setTimeout(() => {
      Loading.close();
    }, 2000);
  }
  return (
    <div ref={container} style={{ height: '300px' }}>
      <Button onClick={onClick}>指定挂载位置</Button>
    </div>
  );
};
