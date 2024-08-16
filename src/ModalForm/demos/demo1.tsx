import { ModalForm } from '@pointcloud/pcloud-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState<boolean>(false);

  const formItems = [
    {
      name: 'username',
      label: '用户名',
      renderType: 'input',
      formItemProps: { rules: [{ required: true }] },
    },
    { name: 'password', label: '密码', renderType: 'password' },
    { name: 'tel', label: '电话', renderType: 'inputNumber' },
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
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开弹窗</Button>
      <ModalForm
        formProps={{ items: formItems }}
        modalProps={{
          open,
          width: 660,
          title: '标题',
          onCancel: () => {
            setOpen(false);
          },
          onOk: (values) => {
            console.info(values);
          },
        }}
      />
    </>
  );
};
