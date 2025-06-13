import React from 'react';
import { IPAddress } from '@pointcloud/pcloud-components';
import { HeartOutlined } from '@ant-design/icons';
export default function Demo3() {
  return (
    <>
      <IPAddress value="192.168.1.1" delimiter="*" style={{ marginBottom: '8px' }}></IPAddress>
      <br />
      <IPAddress value="192.168.1.1" delimiter={<HeartOutlined />}></IPAddress>
    </>
  );
}
