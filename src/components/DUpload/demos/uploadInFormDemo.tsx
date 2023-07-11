import React from 'react';
import { Button, Form } from 'antd';
import { DUpload, DForm } from '@pointcloud/pcloud-components';

export default function UploadInFormDemo() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('提交成功:', values);
  };

  return (
    <DForm style={{ minHeight: 400 }} form={form} onFinish={onFinish}>
      <DForm.Item name="name" label="名称" renderType="input" formItemProps={{ rules: [{ required: true }] }} />
      <DForm.Item name="file" label="文件" renderType="other" formItemProps={{ rules: [{ required: true }] }}>
        <DUpload multiple enablePreview />
      </DForm.Item>
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </DForm>
  );
}
