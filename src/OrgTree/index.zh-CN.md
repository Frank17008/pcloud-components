---
title: OrgTree 组织架构树
nav:
  title: 组件
  path: /components
---

## 介绍

OrgTree 是基于 react-org-tree 封装的组织架构树组件，用于展示组织层级关系，支持垂直和水平两种布局方式，并提供丰富的自定义选项。

当启用 `showZoomControl` 属性时，组件支持两种缩放方式：

1. 通过缩放控制按钮进行缩放
2. 通过鼠标滚轮进行缩放（向上滚动放大，向下滚动缩小）

## 代码演示

### 基本使用

最简单的用法，展示基本组织架构树。
<code title="基本使用" src="./demos/basic.tsx" description="最简单的用法，展示基本组织架构树。">

### 水平布局

水平方向展示组织架构树。
<code title="水平布局" src="./demos/horizontal.tsx" description="水平方向展示组织架构树。">

## API

### OrgTreeProps

| 参数               | 说明                                                     | 类型                                                 | 默认值 |
| ------------------ | -------------------------------------------------------- | ---------------------------------------------------- | ------ |
| data               | 组织树数据                                               | [OrgTreeNode](#orgtreenode)                          | -      |
| horizontal         | 是否水平布局                                             | boolean                                              | false  |
| onExpand           | 节点展开/折叠回调                                        | (node: OrgTreeNode, expanded: boolean) => void       | -      |
| onNodeClick        | 节点点击回调                                             | (node: OrgTreeNode, event: React.MouseEvent) => void | -      |
| renderNode         | 自定义节点渲染                                           | (node: OrgTreeNode) => ReactNode                     | -      |
| renderExpandButton | 自定义节点展开/折叠按钮                                  | (node: OrgTreeNode, expanded: boolean) => ReactNode  | -      |
| zoom               | 缩放比例                                                 | number                                               | 1      |
| draggable          | 是否可拖拽                                               | boolean                                              | false  |
| onDrop             | 拖拽结束回调                                             | (source: OrgTreeNode, target: OrgTreeNode) => void   | -      |
| className          | 自定义类名                                               | string                                               | -      |
| style              | 自定义样式                                               | React.CSSProperties                                  | -      |
| showZoomControl    | 是否显示缩放控制（启用后支持按钮和鼠标滚轮两种缩放方式） | boolean                                              | false  |
| onZoom             | 缩放控制回调                                             | (zoom: number) => void                               | -      |

### OrgTreeNode

| 参数        | 说明           | 类型             | 默认值 |
| ----------- | -------------- | ---------------- | ------ |
| id          | 节点唯一标识   | string \| number | -      |
| label       | 节点显示文本   | string           | -      |
| title       | 节点标题       | string           | -      |
| children    | 子节点         | OrgTreeNode[]    | -      |
| expand      | 节点是否展开   | boolean          | -      |
| collapsable | 节点是否可折叠 | boolean          | -      |
| className   | 自定义节点类名 | string           | -      |

### 方法

通过 ref 可以获取组件实例，并调用以下方法：

| 方法名             | 说明           | 参数           |
| ------------------ | -------------- | -------------- |
| getOrgTreeInstance | 获取组织树实例 | -              |
| setZoom            | 设置缩放比例   | (zoom: number) |
| zoomIn             | 放大           | -              |
| zoomOut            | 缩小           | -              |
| resetZoom          | 重置缩放       | -              |
| expandAll          | 展开所有节点   | -              |
| collapseAll        | 折叠所有节点   | -              |

## 注意事项

1. 组件依赖于 `react-org-tree`，使用前请确保已安装该依赖。
2. 数据结构必须包含 `id` 和 `label` 字段，`children` 字段用于表示子节点。
3. 当使用拖拽功能时，需要自行实现 `onDrop` 回调中的数据更新逻辑。
4. 自定义节点渲染时，建议保持节点大小一致，以获得更好的视觉效果。
5. 在大数据量情况下，建议使用虚拟滚动或分页加载，以避免性能问题。
6. 启用 `showZoomControl` 后，可以通过鼠标滚轮进行缩放：向上滚动放大，向下滚动缩小。缩放范围限制在 50% 到 200% 之间。
