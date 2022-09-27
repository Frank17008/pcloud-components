import React, { createContext } from 'react';
import { ConfigProviderProps, OtherProps } from './interface';

export const defaultPrefixCls = 'pui';

// export const ConfigContext = createContext<ConfigProviderProps>({} as ConfigProviderProps);
export const ConfigContext = createContext<ConfigProviderProps>({
  getPrefixCls: (componentName: string, customPrefix?: string) =>
    `${customPrefix || defaultPrefixCls}-${componentName}`,
});

const ConfigProvider = (props: ConfigProviderProps) => {
  const { children } = props;
  return <ConfigContext.Provider value={props}>{children}</ConfigContext.Provider>;
};

export default ConfigProvider;
