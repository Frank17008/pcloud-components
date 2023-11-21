---
title: ScrollNumber
description: 数字滚动组件
keywords: ['数字', '滚动', 'number']
tocDepth: 2
nav:
  title: 组件
  path: /components
group:
  title: 业务组件
---

## 组件特性

- 支持数字特效滚动
- 默认从 0 开始,千分位按照逗号分隔,保留 2 位小数精度
- 默认设置了动画时间,支持自定义配置
- 支持 hooks 用法

## 基础使用

<code src="./demos/basicDemo.tsx" ></code>

## 不保留小数精度

```jsx
import { ScrollNumber } from '@pointcloud/pcloud-components';

export default () => {
  return <ScrollNumber end={100} decimals={0} />;
};
```

## 千分位分隔

```jsx
import { ScrollNumber } from '@pointcloud/pcloud-components';

export default () => {
  return <ScrollNumber end={100001} decimals={0} separator={','} />;
};
```

## 自定义过渡动画时间

```jsx
import { ScrollNumber } from '@pointcloud/pcloud-components';

export default () => {
  return <ScrollNumber end={1001} decimals={0} separator={','} duration={5} />;
};
```

## 延迟开始

```jsx
import { ScrollNumber } from '@pointcloud/pcloud-components';

export default () => {
  return <ScrollNumber end={1001} decimals={0} separator={','} delay={5} />;
};
```

## 手动开始

```jsx
import { ScrollNumber } from '@pointcloud/pcloud-components';

export default () => {
  return (
    <ScrollNumber end={1001} decimals={0} separator={','}>
      {({ countUpRef, start }) => (
        <div>
          <span ref={countUpRef} />
          <button onClick={start}>Start</button>
        </div>
      )}
    </ScrollNumber>
  );
};
```
