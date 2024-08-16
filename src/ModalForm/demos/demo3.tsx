import React, { useState } from 'react';
import { Button, Radio } from 'antd';
import { ModalForm, DFormProps } from '@pointcloud/pcloud-components';

const items: DFormProps['items'] = [
  {
    name: 'username',
    label: '用户名',
    renderType: 'input',
    formItemProps: { rules: [{ required: true }], grid: { span: 6 } },
  },
  { name: 'password', label: '密码', renderType: 'password', formItemProps: { rules: [{ required: true }], grid: { span: 6 } } },
  {
    name: 'sex',
    label: '性别',
    renderType: 'select',
    formItemProps: { rules: [{ required: true }], grid: { span: 6 } },
    options: [
      { label: '男', value: '1' },
      { label: '女', value: '2' },
    ],
  },
  { name: 'remark', label: '备注', renderType: 'textArea', formItemProps: { grid: { span: 24 } } },
];

export default function LayoutDemo() {
  const [layout, setLayout] = useState<DFormProps['layout']>('horizontal');
  const [open, setOpen] = useState<boolean>(false);
  const onRadioChange = (e) => setLayout(e.target.value);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>打开弹窗</Button>
      <ModalForm
        formProps={{ items, layout }}
        modalProps={{
          open,
          title: '标题',
          onCancel: () => {
            setOpen(false);
          },
          onOk: (values) => {
            console.info(values);
          },
        }}
      >
        <div style={{ marginBottom: '12px' }}>
          <span>布局选项：</span>
          <Radio.Group value={layout} onChange={onRadioChange}>
            <Radio value="horizontal">水平</Radio>
            <Radio value="vertical">垂直</Radio>
            <Radio value="inline">行内</Radio>
            <Radio value="inlineVertical">行内垂直</Radio>
            <Radio value="grid">栅格布局</Radio>
          </Radio.Group>
        </div>
      </ModalForm>
    </div>
  );
}
