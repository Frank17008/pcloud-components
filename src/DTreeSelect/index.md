---
title: DTreeSelect
nav:
  title: Components
  path: /components
group:
  title: 业务组件
---

<span style="font-size:24px;color:#454d64;font-weight:500">DTreeSelect 树选择</span>

基于 antd 4.19.3 `TreeSelect` 的二次封装组件

- treeData、loadData 均支持传入异步函数，在 From 表单组件中使用更方便
- 加载选项列表时可以显示加载中效果
- 本地搜索时默认匹配 label 字段

---

## 基本使用

<code src="./demos/basicDemo.tsx"  />

## 动态加载子级列表

<code src="./demos/loadChildrenDemo.tsx" />

## 显示加载中

<code src="./demos/loadingDemo.tsx" />

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| options | antd 的 treeData 属性，可以是一个 treeData 数组，或一个返回等价 treeData 数组的 promise | `(option?) => Promise<option[]>` | - |  |
| loadData | antd 的 loadData 属性，动态加载子级列表数据，默认使用 treeData 所提供的方法，如果传入 null，则表示不进行动态加载,该方法要求返回一个 options 数组或与其等价的 Promise | `(option?) => Promise<option[]>` | - |  |
| onLoadData | 等同 antd 的 loadData 属性,用于监听 antd loadData 事件 | `(option?) => void` | - |  |
| loading | 是否显示加载中（传入数字表示延迟加载,单位毫秒，0 等同于 false） | `boolean \| number` | 600 |  |

其他属性同 antd TreeSelect 组件，详见：https://4x-ant-design.antgroup.com/components/tree-select-cn/#API
