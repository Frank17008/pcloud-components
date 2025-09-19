import React, { useState, useEffect, forwardRef, useContext, useMemo } from 'react';
import type { FormProps, FormInstance } from 'antd';
import classNames from 'classnames';
import { DForm, type DItemProps } from '@pointcloud/pcloud-components';
import { defaultUsernameItem, defaultPasswordItem, defaultLoginButtonItem } from './defaultConfig';
import { ConfigContext } from '../ConfigProvider';

const mergeItemProps = <T extends Partial<DItemProps>, P>(defaultItem: DItemProps, item: T, options?: P): DItemProps => {
  let baseMerged = { ...defaultItem, ...item };
  // 检查是否存在 formItemProps 属性
  if ('formItemProps' in defaultItem && 'formItemProps' in item) {
    baseMerged['formItemProps'] = { ...defaultItem.formItemProps, ...item.formItemProps };
  }
  if (options) {
    baseMerged = { ...baseMerged, ...options };
  }
  return baseMerged;
};

export interface LoginFormProps extends Omit<FormProps, 'onFinish'> {
  /** 登录表单额外的表单项 */
  extraItems?: DItemProps[];
  /** 点击登录按钮的回调 */
  onFinish?: (values: any) => void | Promise<any>;
  /** 登录按钮文本 */
  loginText?: string;
  /** 是否禁用登录按钮 */
  loginButtonDisabled?: boolean;
  /** 用户名表单项配置 */
  usernameItem?: Partial<DItemProps>;
  /** 密码表单项配置 */
  passwordItem?: Partial<DItemProps>;
  /** 登录按钮表单项配置 */
  loginButtonItem?: Partial<DItemProps>;
}

const LoginForm = forwardRef<FormInstance, LoginFormProps>((props, ref) => {
  const {
    extraItems = [],
    onFinish,
    loginText = '登录',
    loginButtonDisabled = false,
    usernameItem = {},
    passwordItem = {},
    loginButtonItem = {},
    className = '',
    ...restProps
  } = props;

  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);

  const [loading, setLoading] = useState(false);
  const [form] = DForm.useForm();
  const classname = getPrefixCls('login-form');
  const wrapperClass = classNames({ [`${prefixCls}-login-form`]: !!prefixCls }, classname, className).trim();

  const mergedUsernameItem = useMemo(() => mergeItemProps(defaultUsernameItem, usernameItem), [usernameItem]);
  const mergedPasswordItem = useMemo(() => mergeItemProps(defaultPasswordItem, passwordItem), [passwordItem]);
  const mergedLoginButtonItem = useMemo(
    () =>
      mergeItemProps(defaultLoginButtonItem, loginButtonItem, {
        label: loginText,
        disabled: loginButtonDisabled || loading,
        loading,
      }),
    [loginButtonItem, loginText, loginButtonDisabled, loading],
  );

  const items: DItemProps[] = useMemo(
    () => [mergedUsernameItem, mergedPasswordItem, ...extraItems, mergedLoginButtonItem],
    [mergedUsernameItem, mergedPasswordItem, extraItems, mergedLoginButtonItem],
  );

  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(form);
      } else {
        (ref as React.MutableRefObject<FormInstance | null>).current = form;
      }
    }
  }, [form, ref]);

  const handleFinish = async (values: any) => {
    if (!onFinish) return;
    setLoading(true);
    try {
      const result = onFinish(values);
      if (result instanceof Promise) {
        await result;
      }
    } finally {
      setLoading(false);
    }
  };

  return <DForm form={form} items={items} onFinish={handleFinish} className={wrapperClass} {...restProps} />;
});

export default LoginForm;
