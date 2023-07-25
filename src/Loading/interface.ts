import { SpinProps } from 'antd';
import React, { ReactInstance, ReactNode } from 'react';

export interface LoadingInstanceProps extends SpinProps {
  /**
   * @description 加载框容器
   * @default body
   */

  container?: ReactInstance | undefined;
}

export interface LoadingProps {
  open: (param: LoadingInstanceProps) => React.ReactDOM;
  close: () => void;
  getInstance: () => React.ReactDOM;
}
