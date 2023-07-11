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
  { name: 'age', label: '年龄', renderType: 'inputNumber', style: { width: '100%' } },
];

export default function DefaultItemPropsDemo() {
  const [defaultProps, setDefaultProps] = useState<DFormProps['defaultItemProps']>();

  const onRadioChange = (e) => {
    const type = e.target.value;
    if (type === 'required') {
      setDefaultProps({ formItemProps: { rules: [{ required: true }] } });
    } else if (type === 'width') {
      setDefaultProps({ style: { width: 160 } });
    } else if (type === 'leftAlign') {
      setDefaultProps({
        formItemProps: { rules: [{ required: true }], labelAlign: 'left' },
        style: { width: 160 },
      });
    } else if (type === 'allowClear') {
      setDefaultProps({ allowClear: true });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '12px' }}>
        <span>默认值选项：</span>
        <Radio.Group onChange={onRadioChange}>
          <Radio value="required">必选</Radio>
          <Radio value="width">默认宽度</Radio>
          <Radio value="leftAlign">必选+标签左对齐</Radio>
          <Radio value="allowClear">允许清除</Radio>
        </Radio.Group>
      </div>
      <DForm items={items} defaultItemProps={defaultProps}>
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
    </div>
  );
}
