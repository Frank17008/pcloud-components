import React from 'react';
import { DForm, DFormProps } from '@pointcloud/pcloud-components';

const items: DFormProps['items'] = [
  {
    name: 'username',
    label: '用户名',
    renderType: 'input',
    formItemProps: { rules: [{ required: true }] },
  },
  { name: 'password', label: '密码', renderType: 'password' },
  {
    name: 'sex',
    label: '性别',
    renderType: 'select',
    options: [
      { label: '男', value: '1' },
      { label: '女', value: '2' },
    ],
  },
  { name: 'age', label: '年龄', renderType: 'inputNumber', style: { width: '100%' } },
  { name: 'submit', label: '提交', renderType: 'button', htmlType: 'submit', type: 'primary' },
  {
    name: 'reset',
    label: '重置',
    renderType: 'button',
    htmlType: 'reset',
    style: { marginLeft: 16 },
  },
];

export default function BasicDemo() {
  return <DForm items={items} />;
}
