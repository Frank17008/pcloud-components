import React from 'react';
import { IPAddress } from '@pointcloud/pcloud-components';
export default function Demo2() {
  return (
    <>
      small size: <IPAddress value="192.168.1.122" size="small" style={{ marginBottom: '8px' }}></IPAddress>
      <br />
      default size: <IPAddress value="192.168.22.14" size="middle" style={{ marginBottom: '8px' }}></IPAddress>
      <br />
      large size: <IPAddress value="192.168.1.103" size="large"></IPAddress>
    </>
  );
}
