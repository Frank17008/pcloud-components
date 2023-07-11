import React from 'react';
import { NoData } from '@pointcloud/pcloud-components';

export default () => {
  return (
    <div style={{ position: 'relative', height: '200px' }}>
      <NoData emptyText="数据为空" />
    </div>
  );
};
