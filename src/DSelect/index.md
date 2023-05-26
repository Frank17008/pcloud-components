---
title: DSelect
nav:
  title: Components
  path: /components
group:
  title: 业务组件
---

<span style="font-size:24px;color:#454d64;font-weight:500">DSelect 选择器</span>

基于 antd 4.24.8 `Select` 的二次封装组件

- options、onSearch 均支持传入异步函数，在 From 表单组件中使用更方便
- 支持远程搜索，支持搜索时防抖功能
- 加载选项列表或搜索时可以显示加载中效果

---

## 基本使用

<code src="./demos/basicDemo.tsx"  />

## 远程搜索

<code src="./demos/searchDemo.tsx" />

## 搜索时防抖

<code src="./demos/debounceDemo.tsx" />

## 显示加载中

<code src="./demos/loadingDemo.tsx" />

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| options | antd 的 options 属性，可以是一个 options 数组，或一个返回等价 options 数组的 promise | `(params?) => Promise<option[]>` | - |  |
| onSearch | antd 的 onSearch 属性，onSearch 有效时 showSearch 自动为 true | `(params?) => Promise<option[]>` | - |  |
| loading | antd 的 loading 属性，是否显示加载中（传入数字表示延迟加载,单位毫秒，0 等同于 false） | `boolean \| number` | 600 |  |
| debounce | 是否开启防抖（true 表示 800 毫秒，false 或 0 表示不开启） | `boolean \| number` | false |  |

其他属性同 antd Input 组件，详见：https://4x-ant-design.antgroup.com/components/select-cn/#API
