import { LockOutlined, UserOutlined } from '@ant-design/icons';
import type { InputItemProps, PasswordItemProps, ButtonItemProps } from '../DForm/DItem/itemType';

export const defaultUsernameItem: InputItemProps = {
  name: 'username',
  label: '用户名',
  renderType: 'input',
  formItemProps: {
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
    ],
  },
  placeholder: '请输入用户名',
  prefix: <UserOutlined />,
};

export const defaultPasswordItem: PasswordItemProps = {
  name: 'password',
  label: '密码',
  renderType: 'password',
  formItemProps: {
    rules: [
      {
        required: true,
        message: '请输入密码',
      },
    ],
  },
  placeholder: '请输入密码',
  prefix: <LockOutlined />,
};

export const defaultLoginButtonItem: ButtonItemProps = {
  renderType: 'button',
  type: 'primary',
  htmlType: 'submit',
  label: '登录',
  block: true,
};
