---
title: ConfigProvider
tocDepth: 2
nav:
  title: 组件
  path: /components
group:
  title: 其他
---

# ConfigProvider 全局化配置

为组件提供统一的全局化配置。

## 使用

GlobalConfig 使用 React 的 context 特性，只需在应用外围包裹一次即可全局生效。

```jsx | pure
import { ConfigProvider } from '@pointcloud/pcloud-components';

// ...
export default () => (
  <ConfigProvider prefixCls="myClassName">
    <App />
  </ConfigProvider>
);
```

## API

| 参数名称  | 说明             | 类型              | 默认值 |
| --------- | ---------------- | ----------------- | ------ |
| prefixCls | 全局样式类名前缀 | `string`          | `pui`  |
| children  | children 节点    | `React.ReactNode` | ——     |
