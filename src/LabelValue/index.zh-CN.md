---
title: LabelValue
nav:
  title: 组件
  path: /components
group:
  title: 业务组件
---

## 基础使用

<code src="./demos/demo1.tsx" ></code>

## 省略冒号

配置 noColon 为 true,省略了中间的冒号

<code src="./demos/demo2.tsx" ></code>

## 空值

值为空时,则默认展示 emptyValue 的属性值

<code src="./demos/demo3.tsx" ></code>

## API

| 参数名称   | 说明                 | 类型                          | 默认值            |
| ---------- | -------------------- | ----------------------------- | ----------------- |
| className  | 容器样式类名         | `string`                      | `pui-label-value` |
| label      | 文字标签             | `string \| undefined`         | ——                |
| value      | 文字标签值           | `string \| undefined`         | ——                |
| emptyValue | 文字标签值为空时的值 | `string \| undefined \| null` | ——                |
| noWrap     | 是否不换行           | `boolean`                     | `false`           |
| noColon    | 是否隐藏冒号         | `boolean`                     | `false`           |
