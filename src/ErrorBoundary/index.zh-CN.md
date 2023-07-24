---
title: ErrorBoundary
nav:
  title: 组件
  path: /components
group:
  title: 业务组件
---

## 基础使用

```jsx
import * as React from 'react';
import { ErrorBoundary } from '@pointcloud/pcloud-components';

const Test = () => {
  const err = '网络开小差了...';
  return <ErrorBoundary err={err} />;
};
export default Test;
```
