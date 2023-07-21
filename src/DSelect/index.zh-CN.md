---
title: DSelect
description: 基于 antd 4.24.10 Select 的二次封装组件
tocDepth: 2
nav:
  title: 组件
  path: /components
group:
  title: 业务组件
---

## 组件特性

- options、onSearch 均支持传入异步函数，在 From 表单组件中使用更方便
- 支持远程搜索，支持搜索时防抖功能
- 加载选项列表或搜索时可以显示加载中效果
- 本地搜索时默认匹配 label 字段

## 基础用法

<code src="./demos/basicDemo.tsx" title="基础用法"  description="默认开启输入防抖和异步加载,异步加载时会显示加载中效果"></code>

## 远程搜索

<code src="./demos/searchDemo.tsx" title="远程搜索"  description="设置onSearch属性即可开启远程搜索功能而不用设置showSearch，若仅设置showSearch为true，则使用默认本地搜索方法，与and默认使用value搜索不同，DSelect默认使用label进行搜索"></code>

## 搜索时防抖

<code src="./demos/debounceDemo.tsx" title="搜索时防抖"  description="使用远程搜索时启用输入防抖功能，可避免频繁调用远程接口导致服务器压力过大的问题"></code>

## 显示加载中

<code src="./demos/loadingDemo.tsx" title="显示加载中"  description="设置loading属性即可在远程搜索时显示加载中，支持延迟显示，默认600毫秒，传入0等同于false"></code>

## API

| 参数     | 说明                                                                                  | 类型                             | 默认值 | 版本 |
| -------- | ------------------------------------------------------------------------------------- | -------------------------------- | ------ | ---- |
| options  | antd 的 options 属性，可以是一个 options 数组，或一个返回等价 options 数组的 promise  | `(params?) => Promise<option[]>` | -      |      |
| onSearch | antd 的 onSearch 属性，onSearch 有效时 showSearch 自动为 true                         | `(params?) => Promise<option[]>` | -      |      |
| loading  | antd 的 loading 属性，是否显示加载中（传入数字表示延迟加载,单位毫秒，0 等同于 false） | `boolean \| number`              | 600    |      |
| debounce | 是否开启防抖（true 表示 800 毫秒，false 或 0 表示不开启）                             | `boolean \| number`              | false  |      |

其他属性同 antd Select 组件，详见：https://4x-ant-design.antgroup.com/components/select-cn/#API
