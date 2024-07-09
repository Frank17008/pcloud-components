import React from 'react';

export interface IAuthComponentProps {
  /**
   * @description 权限值
   */
  value: string | number | boolean;
  /**
   * @description 权限列表中的字段名称
   */
  fieldName?: string;
  /**
   * @description 权限列表数据
   */
  authList: any[];
  /**
   * @description 无权限时显示的内容
   */
  noAuthContent?: React.ReactNode;
  /**
   * @description 有权限时显示的内容
   */
  children?: React.ReactNode;
}

export type AuthComponentProps = IAuthComponentProps;
