import React from 'react';
import { Button } from 'antd';
import { Loading } from '@pointcloud/pui-components';

export default () => {
  function onClick() {
    Loading.open();
    setTimeout(() => {
      Loading.close();
    }, 1000);
  }
  return <Button onClick={onClick}>提交</Button>;
};
