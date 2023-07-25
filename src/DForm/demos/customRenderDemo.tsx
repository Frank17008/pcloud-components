import React from 'react';
import { Button, Form, InputNumber } from 'antd';
import { DForm, DFormProps, DInput } from '@pointcloud/pcloud-components';

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
  {
    name: 'custom1',
    label: '自定义列表项1',
    renderType: 'other',
    render: (props) => <DInput {...props} />,
  },
  {
    name: 'custom2',
    label: '自定义列表项2',
    renderType: 'custom',
    style: { width: 200 },
    formItemProps: { rules: [{ required: true }] },
    render: (props, formItemProps) => (
      <Form.Item {...formItemProps}>
        <InputNumber {...props} />
      </Form.Item>
    ),
  },
  {
    name: 'custom3',
    label: '自定义列表项3',
    renderType: 'other',
    render: () => (
      <div>
        <Button type="dashed" style={{ marginRight: 16 }} onClick={() => alert('测试按钮')}>
          测试按钮
        </Button>
      </div>
    ),
  },
  { name: 'submit', label: '提交', renderType: 'button', htmlType: 'submit', type: 'primary' },
  {
    name: 'reset',
    label: '重置',
    renderType: 'button',
    htmlType: 'reset',
    style: { marginLeft: 16 },
  },
];

export default function CustomRenderDemo() {
  return <DForm items={items} labelCol={{ span: 3 }} />;
}
