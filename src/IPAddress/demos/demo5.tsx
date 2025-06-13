import React, { useState } from 'react';
import { IPAddress } from '@pointcloud/pcloud-components';
import { Switch } from 'antd';
export default function Demo5() {
  const originalValue = '2001:db8::1:ff00:41:8329'; // 标注简化形式
  const [value, setValue] = useState(originalValue);
  const [normalize, setNormalize] = useState(true);
  const onChange = (v: string) => {
    setValue(v);
  };
  return (
    <>
      规范化输出: <Switch checked={normalize} onChange={(v) => setNormalize(v)}></Switch>
      <div style={{ marginBottom: 20 }}>
        <span style={{ marginRight: 20 }}>原始简化值: {originalValue}</span>
        <span>输出值: {value}</span>
      </div>
      <IPAddress value={value} onChange={onChange} type="IPv6" normalize={normalize}></IPAddress>
    </>
  );
}
