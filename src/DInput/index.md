---
title: DInput
nav:
  title: Components
  path: /components
group:
  title: 业务组件
---

<span style="font-size:24px;color:#454d64;font-weight:500">DInput 输入框</span>

基于 antd@4.24.8 `Input` 的二次封装组件,主要解决中文拼音输入也会触发 onChange 事件的问题,同时提供了输入防抖功能

---

## 基本使用

<code src="./demos/basicDemo.tsx"  />

## 启用合成输入

<code src="./demos/composeDemo.tsx" />

## 启用输入防抖

<code src="./demos/debounceDemo.tsx" />

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| onChange | 输入框内容变化时的回调 | `onChange: (value, e) => void` | - |  |
| enableCompose | 是否启用合成输入 | `boolean` | true |  |
| debounce | 是否开启防抖（true 表示 800 毫秒，false 或 0 表示不开启） | `boolean \| number` | false |  |

其他属性同 antd Input 组件，详见：https://4x-ant-design.antgroup.com/components/input-cn/#API
