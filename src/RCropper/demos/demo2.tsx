import { RCropper, DForm } from '@pointcloud/pcloud-components';
import React, { useState } from 'react';

const src = 'https://img1.baa.bitautotech.com/dzusergroupfiles/2024/11/06/e2a4e9bb9e854429bed46ba1e343b47a.jpg';
const formItems = [
  { label: '位置x', name: 'x', renderType: 'inputNumber', min: 0, max: 500, grid: { span: 6 } },
  { label: '位置y', name: 'y', renderType: 'inputNumber', min: 0, max: 500, grid: { span: 6 } },
  { label: '宽度width', name: 'width', renderType: 'inputNumber', min: 0, max: 500, grid: { span: 6 } },
  { label: '高度height', name: 'height', renderType: 'inputNumber', min: 0, max: 500, grid: { span: 6 } },
  {
    label: '选区比例aspectRatio',
    name: 'aspectRatio',
    renderType: 'select',
    grid: { span: 6 },
    options: [
      { label: 'Free', value: 0 },
      { label: '1:1', value: 1 },
      { label: '16:9', value: 16 / 9 },
      { label: '4:3', value: 4 / 3 },
    ],
  },
  {
    label: '初始选区比例initialAspectRatio',
    name: 'initialAspectRatio',
    renderType: 'select',
    grid: { span: 6 },
    options: [
      { label: 'Free', value: 0 },
      { label: '1:1', value: 1 },
      { label: '16:9', value: 16 / 9 },
      { label: '4:3', value: 4 / 3 },
    ],
  },
  { label: '缩放zoomable', name: 'zoomable', renderType: 'checkbox', grid: { span: 6 } },
  { label: '拖拽resizable', name: 'resizable', renderType: 'checkbox', grid: { span: 6 } },
];
export default () => {
  const [selection, setSelection] = useState({
    x: 250,
    y: 200,
    width: 100,
    height: 100,
    aspectRatio: 1,
    initialAspectRatio: 1,
    zoomable: true,
    resizable: true,
  });
  const onValuesChange = (changedValue, values) => {
    console.log('changedValue', changedValue, values);
    setSelection({ ...selection, ...values });
  };
  return (
    <>
      <h3>裁剪区域配置</h3>
      <DForm items={formItems} layout="grid" initialValues={selection} onValuesChange={onValuesChange}></DForm>
      <RCropper style={{ height: 400 }} selection={selection} src={src} />
    </>
  );
};
