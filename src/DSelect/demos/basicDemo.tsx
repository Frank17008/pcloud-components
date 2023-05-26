/**
 * description: 基础用法：默认开启输入防抖和异步加载,异步加载时会显示加载中效果
 */
import React from 'react';
import { DSelect } from '@pointcloud/pui-components';

export default function basicDemo() {
  const options = [
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 },
    { label: '选项4', value: 4 },
  ];

  const getOptionsAsync = () => Promise.resolve(options);

  const onChange = (value, option) => {
    console.log(value, option);
  };

  return (
    <DSelect style={{ width: 200 }} options={getOptionsAsync} showSearch onChange={onChange} />
  );
}
