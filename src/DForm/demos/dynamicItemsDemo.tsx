import { Radio } from 'antd';
import { useRef } from 'react';

import { DForm, DFormProps, DFormRefProps, DItemProps } from '@pointcloud/pcloud-components';

const items: DFormProps['items'] = [
  { name: 'username', label: '用户名', renderType: 'input', formItemProps: { rules: [{ required: true }] } },
  { name: 'password', label: '密码', renderType: 'password' },
  {
    name: 'type',
    label: '验证方式',
    renderType: 'other',
    render: () => (
      <Radio.Group>
        <Radio value="email">邮箱</Radio>
        <Radio value="phone">短信</Radio>
        <Radio value="">不验证</Radio>
      </Radio.Group>
    ),
  },

  { name: 'submit', label: '提交', renderType: 'button', htmlType: 'submit', type: 'primary' },
];

export default function DynamicItemsDemo() {
  const dFormRef = useRef<DFormRefProps>();

  const onValuesChange = (values) => {
    // 若选择邮箱验证方式，则插入一个邮箱地址输入框
    if (values?.type === 'email') {
      dFormRef.current?.setItems((list: DItemProps[]) => {
        const index = list.findIndex((item) => item.name === 'type');
        const target = list.find((item) => item.name === 'email') || list.find((item) => item.name === 'phone');
        list.splice(index + 1, target ? 1 : 0, { name: 'email', label: '邮箱', renderType: 'input', placeholder: 'expample@domain.com' });
        return list;
      });
      // 若选择短信验证方式，则插入一个手机号码输入框
    } else if (values?.type === 'phone') {
      dFormRef.current?.setItems((list: DItemProps[]) => {
        const index = list.findIndex((item) => item.name === 'type');
        const target = list.find((item) => item.name === 'email') || list.find((item) => item.name === 'phone');
        list.splice(index + 1, target ? 1 : 0, { name: 'phone', label: '手机号', renderType: 'input', placeholder: '86+' });
        return list;
      });
      // 其他情况下清除之前插入的输入框
    } else if ('type' in values) {
      dFormRef.current?.setItems((list: DItemProps[]) => {
        const target = list.find((item) => item.name === 'email') || list.find((item) => item.name === 'phone');
        const index = list.findIndex((item) => item.name === target?.name);
        list.splice(index, 1);
        return list;
      });
    }
  };

  return (
    <div>
      <DForm ref={dFormRef} items={items} onValuesChange={onValuesChange} />
    </div>
  );
}
