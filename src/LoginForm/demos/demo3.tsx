import { DForm, LoginForm } from '@pointcloud/pcloud-components';

export default () => {
  const [form] = DForm.useForm();
  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <LoginForm
        form={form}
        loginButtonItem={{ type: 'ghost', style: { borderRadius: '5px', marginTop: '10px' } }}
        usernameItem={{ placeholder: 'Enter your username' }}
        passwordItem={{ prefix: null }}
      />
    </div>
  );
};
