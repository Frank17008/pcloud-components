import { SpinProps } from 'antd';
import React, { ReactInstance } from 'react';

export interface LoadingInstanceProps extends Omit<SpinProps, 'delay'> {
  /**
   * @description 加载框容器
   * @default body
   */

  container?: ReactInstance | undefined;
  /**
   * @description 延迟显示加载框毫秒
   * @default 0
   */
  delay?: number;
}

export interface ILoadingProps {
  open: (_param: LoadingInstanceProps) => React.ReactNode;
  close: () => void;
  getInstance: () => React.ReactNode;
}

export type LoadingProps = ILoadingProps;
