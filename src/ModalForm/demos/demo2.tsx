import { ModalForm } from '@pointcloud/pcloud-components';
import { Button } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
  const [open, setOpen] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<any>();
  const formItems = [
    { name: 'username', label: '用户名', renderType: 'input' },
    { name: 'password', label: '密码', renderType: 'password' },
  ];

  useEffect(() => {
    setInitialValues({ username: 'admin', password: '123456' });
  }, [open]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>回填数据</Button>
      <ModalForm
        formProps={{ items: formItems, disabled: true, initialValues }}
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
      />
    </>
  );
};
