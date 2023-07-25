---
title: AdvancedFilter
description: 高级搜索组件
tocDepth: 2
nav:
  title: 组件
  path: /components
group:
  title: 业务组件
---

## 基础使用

<code src="./demos/demo1.tsx" ></code>

## 自定义两侧渲染区

<code src="./demos/demo2.tsx" ></code>

## 自定义筛选项

<code src="./demos/demo3.tsx" ></code>

<API id="AdvancedFilter"></API>

### FormItem

|    Name     | Description                                          |                                                   Type                                                   |       Default       |
| :---------: | :--------------------------------------------------- | :------------------------------------------------------------------------------------------------------: | :-----------------: |
|    label    | 筛选项 label 文字                                    |                                                  string                                                  |                     |
|    name     | 筛选项字段名                                         |                                                  string                                                  |                     |
|    type     | 筛选项类型                                           | input \| inputNumber \| radio \| select \| checkbox \| datePicker \| rangePicker \| switch \| treeSelect |                     |
| placeholder | 筛选项 placeholder                                   |                                                  string                                                  |                     |
|   options   | 筛选项的配置项(select \| treeSelect 时可用)          |                                               同 antd 组件                                               |                     |
|   format    | 筛选项的格式化配置(rangePicker \| datePicker 时可用) |                                                  string                                                  | YYYY-MM-DD HH:mm:ss |

### InputProps

|    Name     | Description                            |       Type       |  Default   |
| :---------: | :------------------------------------- | :--------------: | :--------: |
| placeholder | input 检索框 placeholder               |      string      |            |
|    name     | input 检索框字段名                     |      string      | (required) |
| inputSearch | input 检索框回车时或点击检索图标时触发 | (v: any) => void |            |
