import React, { ReactInstance, ReactNode } from 'react';

export interface LoadingInstanceProps {
  /**
   * @description 加载的文字提示
   * @default '数据请求中...'
   */
  tip?: string;
  container?: ReactInstance | undefined;
}

export interface LoadingProps {
  open: (param: LoadingInstanceProps) => React.ReactDOM;
  close: () => void;
  getInstance: () => React.ReactDOM;
}
