import React from 'react';
import { IPAddress } from '@pointcloud/pcloud-components';
export default function Demo1() {
  return (
    <>
      <IPAddress value="192.168.1.1" style={{ marginBottom: '8px' }}></IPAddress>
      <br />
      <IPAddress value="2001:0000:0000:abcd:0000:0000:0000:0001" type="IPv6"></IPAddress>
    </>
  );
}
