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

export interface ILoadingInstance {
  destroy: () => void;
}

export interface ILoadingProps {
  open: (_params: LoadingInstanceProps) => ILoadingInstance;
  getInstance: () => ILoadingInstance | null;
  close: () => void;
}

export type LoadingProps = ILoadingProps;
