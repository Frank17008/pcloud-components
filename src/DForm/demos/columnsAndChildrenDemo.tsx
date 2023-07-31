import React from 'react';
import { Button } from 'antd';
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
];

export default function BasicDemo() {
  return (
    <DForm items={items}>
      <DForm.Item renderType="custom" formItemProps={{ wrapperCol: { offset: 8, span: 16 } }}>
        <div>
          <Button htmlType="submit" type="primary">
            提交
          </Button>
          <Button htmlType="reset" style={{ marginLeft: 16 }}>
            重置
          </Button>
        </div>
      </DForm.Item>
    </DForm>
  );
}
