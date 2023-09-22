---
title: AuthComponent
description: 权限组件
tocDepth: 2
nav:
  title: 组件
  path: /components
group:
  title: 业务组件
---

## 基础使用

<code src="./demos/demo1.tsx" ></code>

<API id="AuthComponent"></API>

### AuthComponentProps

|     Name      | Description          |            Type             |  Default   |
| :-----------: | :------------------- | :-------------------------: | :--------: |
|     code      | 权限唯一标识         |           string            | (required) |
|   fieldName   | 权限列表中的字段名称 |           string            | (required) |
|     value     | 权限字段对应的值     | string \| number \| boolean |            |
| noAuthContent | 无权限时显示的内容   |         React.Node          |            |
|   children    | 有权限时显示的内容   |         React.Node          |            |
