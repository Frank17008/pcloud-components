import React from 'react';
import { IPAddress } from '@pointcloud/pcloud-components';
export default function Demo4() {
  return (
    <>
      <IPAddress value="2001:0db8:0000:0000:0000:ff00:0042:8329" type="IPv6" readOnly style={{ marginBottom: '8px' }}></IPAddress>
      <br />
      <IPAddress value="2001:0db8:0000:0000:0000:ff00:0042:8329" type="IPv6" disabled></IPAddress>
    </>
  );
}
