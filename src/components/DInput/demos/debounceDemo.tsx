/**
 * description: 开启输入防抖后onChange事件会在指定时间后才触发，debounce值为false或0代表关闭输入防抖，值为true则代表使用默认时常，即800毫秒
 */
import React, { useState } from 'react';
import { Radio } from 'antd';

import { DInput } from '@pointcloud/pcloud-components';

export default function DebounceDemo() {
  const [debounce, setDebounce] = useState(true);
  const [value, setValue] = useState('');

  const onRadioChange = (e) => setDebounce(e.target.value);

  const onChange = (v) => {
    console.log('文本框内容发生变化:', value);
    setValue(v);
  };

  return (
    <>
      <div style={{ marginBottom: '12px' }}>
        <span>切换类型：</span>
        <Radio.Group value={debounce} onChange={onRadioChange}>
          <Radio value={true}>开启防抖</Radio>
          <Radio value={false}>关闭防抖</Radio>
          <Radio value={800}>防抖时间800毫秒</Radio>
          <Radio value={2000}>防抖时间2000毫秒</Radio>
        </Radio.Group>
      </div>
      <DInput style={{ width: 200, marginRight: '12px' }} debounce={debounce} onChange={onChange} />
      <span>当前值：{value}</span>
    </>
  );
}
