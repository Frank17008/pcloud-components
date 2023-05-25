/**
 * description: 开启合成输入后，在拼音输入未完成前不会触发onChange事件
 */
import React, { useState } from 'react';
import { Radio } from 'antd';

import { DInput } from '@pointcloud/pui-components';

export default function composeDemo() {
  const [enableCompose, setEnableCompose] = useState(true);
  const [value, setValue] = useState('');

  const onRadioChange = (e) => setEnableCompose(e.target.value);

  const onChange = (v, e) => {
    console.log('文本框内容发生变化:', value);
    setValue(v);
  };

  return (
    <>
      <div style={{ marginBottom: '12px' }}>
        <span>切换类型：</span>
        <Radio.Group value={enableCompose} onChange={onRadioChange}>
          <Radio value={true}>启用合成输入</Radio>
          <Radio value={false}>禁用合成输入</Radio>
        </Radio.Group>
      </div>
      <DInput
        style={{ width: 200, marginRight: '12px' }}
        enableCompose={enableCompose}
        onChange={onChange}
      />
      <span>当前值：{value}</span>
    </>
  );
}
