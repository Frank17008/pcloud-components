import * as React from 'react';

export interface ConfigProviderProps {
  /**
   * @description 全局组件类名前缀
   * @default pui
   */
  prefixCls?: string;
  getPrefixCls?: (componentName: string, customPrefix?: string) => string;
  children?: React.ReactNode;
}

export type OtherProps = Omit<ConfigProviderProps, 'chidlren'>;
