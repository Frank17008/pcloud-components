import { ConfigProviderProps as AntdConfigProviderProps } from 'antd/lib/config-provider';

export interface ConfigProviderProps extends AntdConfigProviderProps {
  /**
   * @description 全局组件类名前缀
   * @default pui
   */
  prefixCls?: string;
  getPrefixCls?: (_componentName: string, _customPrefix?: string) => string;
}
