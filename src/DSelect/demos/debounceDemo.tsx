/**
 * description: 远程搜索时防抖：使用远程搜索时，默认启用输入防抖功能，可避免频繁调用远程接口导致服务器压力大的问题
 */
import React, { useState } from 'react';

import { Radio } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';

import { DSelect } from '@pointcloud/pui-components';

export default function debounceDemo() {
  const options = [
    { label: '选项1', value: 1, type: '640' },
    { label: '选项2', value: 2, type: '640' },
    { label: '选项3', value: 3, type: '443' },
    { label: '选项4', value: 4, type: '443' },
  ];

  const [debounce, setDebounce] = useState(true);

  const onRadioChange = (e) => setDebounce(e.target.value);

  const getOptionsAsync = (value?) => {
    return new Promise<DefaultOptionType[]>((resolve, reject) => {
      const list = value ? options.filter((item) => item.label.includes(value)) : options;
      resolve(list);
    });
  };

  const onChange = (value, option) => {
    console.log(value, option);
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
      <DSelect
        style={{ width: 200 }}
        options={getOptionsAsync}
        onChange={onChange}
        onSearch={getOptionsAsync}
        debounce={debounce}
      />
    </>
  );
}
