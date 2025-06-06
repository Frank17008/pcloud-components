import React from 'react';

export interface ILabelValueProps {
  /**
   * @description 文字标签
   */
  label: string | React.ReactNode;
  /**
   * @description 文字标签值
   */
  value?: string | React.ReactNode;
  /**
   * @description 格式化value值
   */
  formatter?: (_v?: string | React.ReactNode) => string | React.ReactNode;
  /**
   * @description 文字标签值为空时的值
   * @default -
   */
  emptyValue?: string | React.ReactNode;
  /**
   * @description 类名
   */
  className?: string;
  /**
   * @description 样式
   */
  style?: React.CSSProperties;
  /**
   * @description 是否不换行
   * @default false
   */
  noWrap?: boolean;
  /**
   * @description 是否隐藏冒号
   * @default false
   */
  noColon?: boolean;
}

export type LabelValueProps = ILabelValueProps;
