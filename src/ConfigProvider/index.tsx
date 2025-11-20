import React, { createContext, useMemo } from 'react';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { ConfigProviderProps } from './interface';

export const defaultPrefixCls = 'pui';

// export const ConfigContext = createContext<ConfigProviderProps>({} as ConfigProviderProps);
export const ConfigContext = createContext<ConfigProviderProps>({
  // prefixCls: defaultPrefixCls,
  getPrefixCls: (componentName: string, customPrefix?: string) => `${customPrefix || defaultPrefixCls}-${componentName}`,
});

const ConfigProvider = (props: ConfigProviderProps) => {
  const { children, prefixCls = defaultPrefixCls, getPrefixCls, ...antdProps } = props;
  const contextValue = useMemo(() => ({ prefixCls, getPrefixCls }), [prefixCls, getPrefixCls]);
  return (
    <ConfigContext.Provider value={contextValue}>
      <AntdConfigProvider {...antdProps}>{children}</AntdConfigProvider>
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
