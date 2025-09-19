import { LoginForm } from '@pointcloud/pcloud-components';

export default () => {
  const onFinish = (values: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(`登录成功！用户名: ${values.username}`);
        resolve(null);
      }, 1000);
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <LoginForm onFinish={onFinish} loginText="登录系统" />
    </div>
  );
};
