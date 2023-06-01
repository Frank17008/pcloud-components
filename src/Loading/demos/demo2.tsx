import React from 'react';
import { Button } from 'antd';
import { Loading } from '@pointcloud/pcloud-components';

export default () => {
  function onClick() {
    Loading.open('正在疯狂提交, 请耐心等待...');
    setTimeout(() => {
      Loading.close();
    }, 2000);
  }
  return (
    <Button type="primary" onClick={onClick}>
      确认
    </Button>
  );
};
