---
title: Loading
nav:
  title: Components
  path: /components
group:
  title: 业务组件
---

# 单例 Loading

单例模式,只创建一个组件实例;函数式调用

## 使用

<code src="./demos/demo1.tsx" />

## 自定义内容

<code src="./demos/demo2.tsx" />

## API

| Name | Description | Type | 返回值 | Default |
| :-: | :-- | :-: | :-: | :-: |
| open | 打开方法 | (tip?:string) => React.ReactDOM | React.ReactDOM | tip 默认值：数据请求中... |
| close | 关闭方法 | Function | -- | -- |
| getInstance | 获取 loading 实例 | Function | React.ReactDOM | -- |
