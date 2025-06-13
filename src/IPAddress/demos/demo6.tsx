import React, { useState } from 'react';
import { IPAddress } from '@pointcloud/pcloud-components';
import { Switch } from 'antd';
export default function Demo5() {
  const [autoComplete, setAutoComplete] = useState(true);

  return (
    <>
      <div style={{ marginBottom: 10 }}>
        自动聚焦: <Switch checked={autoComplete} onChange={setAutoComplete}></Switch>
      </div>
      <IPAddress type="IPv6" autoComplete={autoComplete}></IPAddress>
    </>
  );
}
