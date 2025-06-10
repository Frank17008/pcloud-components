import { RCropper, DForm } from '@pointcloud/pcloud-components';
import React, { useState } from 'react';

const src = 'https://img1.baa.bitautotech.com/dzusergroupfiles/2024/11/06/e2a4e9bb9e854429bed46ba1e343b47a.jpg';
const formItems = [
  { label: '禁用Canvas画布', name: 'disabled', renderType: 'checkbox' },
  { label: '缩放步长', name: 'scaleStep', renderType: 'inputNumber', min: 0.01, max: 1, step: 0.01 },
];
export default () => {
  const [canvas, setCanvas] = useState({ disabled: false, scaleStep: 0.1 });
  const onValuesChange = (values) => {
    setCanvas((prev) => ({ ...prev, ...values }));
  };
  return (
    <>
      <DForm items={formItems} layout="inline" initialValues={canvas} onValuesChange={onValuesChange}></DForm>
      <RCropper style={{ height: 350 }} src={src} canvas={canvas} />
    </>
  );
};
