import React, { useState } from 'react';
import { Button, Radio } from 'antd';
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
];

export default function LayoutDemo() {
  const [layout, setLayout] = useState<DFormProps['layout']>('horizontal');

  const onRadioChange = (e) => setLayout(e.target.value);

  return (
    <div>
      <div style={{ marginBottom: '12px' }}>
        <span>布局选项：</span>
        <Radio.Group value={layout} onChange={onRadioChange}>
          <Radio value="horizontal">水平</Radio>
          <Radio value="vertical">垂直</Radio>
          <Radio value="inline">行内</Radio>
          <Radio value="inlineVertical">行内垂直</Radio>
        </Radio.Group>
      </div>
      <DForm style={{ minHeight: 400 }} items={items} layout={layout}>
        <DForm.Item>
          <div>
            <Button htmlType="submit" type="primary">
              提交
            </Button>
            <Button htmlType="reset" style={{ marginLeft: 6 }}>
              重置
            </Button>
          </div>
        </DForm.Item>
      </DForm>
    </div>
  );
}
