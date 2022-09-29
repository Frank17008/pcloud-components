import React from 'react';

export interface LoadingInstanceProps {
  /**
   * @description 加载的文字提示
   * @default '数据请求中...'
   */
  tip?: string;
}

export interface LoadingProps {
  open: (tip?: string) => React.ReactDOM;
  close: () => void;
  getInstance: () => React.ReactDOM;
}
