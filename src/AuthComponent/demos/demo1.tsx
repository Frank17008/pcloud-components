import { Button } from 'antd';
import { AuthComponent } from '@pointcloud/pcloud-components';

export default () => {
  const authList = [
    {
      code: 'add',
      path: '/add',
    },
    {
      code: 'edit',
      path: '/edit',
    },
    {
      code: 'delete',
      path: '/delete',
    },
  ];
  return (
    <AuthComponent fieldName="code" value="add" authList={authList}>
      <Button>新增</Button>
    </AuthComponent>
  );
};
