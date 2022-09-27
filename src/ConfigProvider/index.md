---
title: ConfigProvider 全局配置
nav:
  title: Components
  path: /components
group:
  title: 其他
---

# ConfigProvider 全局化配置

为组件提供统一的全局化配置。

## 使用

GlobalConfig 使用 React 的 context 特性，只需在应用外围包裹一次即可全局生效。

```jsx | pure
import { ConfigProvider } from '@pointcloud/pui-components';

// ...
export default () => (
  <ConfigProvider prefixCls="myClassName">
    <App />
  </ConfigProvider>
);
```

<API />
