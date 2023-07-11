/**
 * description: 基础用法：默认开启输入防抖和合成输入,onChange事件相较于antd将value值作为第一个参数、事件对象e作为第二个参数，这样可以方便监听输入值的变化
 */
import React from 'react';
import { DInput } from '@pointcloud/pcloud-components';

export default function BasicDemo() {
  const onChange = (value, e) => {
    console.log(value, '事件对象:', e);
  };
  return <DInput onChange={onChange} />;
}
