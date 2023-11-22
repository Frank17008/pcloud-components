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

|   参数名称    | 说明                 |             类型              |   默认值   |
| :-----------: | :------------------- | :---------------------------: | :--------: |
|     code      | 权限唯一标识         |           `string`            | (required) |
|   fieldName   | 权限列表中的字段名称 |           `string`            | (required) |
|     value     | 权限字段对应的值     | `string \| number \| boolean` |            |
|   authList    | 数据列表             |            `any[]`            | (required) |
| noAuthContent | 无权限时显示的内容   |         `React.Node`          |            |
|   children    | 有权限时显示的内容   |         `React.Node`          |            |
