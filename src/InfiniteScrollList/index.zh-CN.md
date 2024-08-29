---
title: InfiniteScrollList
nav:
  title: 无限滚动列表组件
  path: /components
group:
  title: 组合组件
---

## 组件特性

- 支持数据异步加载、自动分页加载
- 支持加载时使用额外的请求参数
- 内置加载时显示 loading 效果，内置全部加载完成后的效果
- 内置回到顶部按钮
- 支持自定义渲染列表项
- 支持栅格列表

## 基础用法

<code src="./demos/demo1.tsx" title="基础用法" description="最基本的用法,没有额外参数"></code>

## 携带参数

<code src="./demos/demo2.tsx" title="携带参数" description="携带参数时,组件会对内置的分页参数 `{ current:1, size: 10 }` 和传递进来的参数进行浅合并,并会在loadMore函数中将最终请求的参数抛出;支持将内置分页参数覆盖"></code>

## 栅格列表

<code src="./demos/demo3.tsx" description="自定义渲染的列表项支持诸如`{gutter: 10, column: 4}`的栅格布局, 尺寸与 antd中的Layout Grid 保持一致。"></code>

## API

| 参数名称         | 说明                                                                                                                                                                                                                                                        | 类型                                                                 | 默认值          |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | --------------- |
| containerId      | 容器 id (如果同一页面引用多次组件，需确保 id 唯一)                                                                                                                                                                                                          | string                                                               | `scrollableDiv` |
| itemKey          | 列表项的唯一标识字段                                                                                                                                                                                                                                        | string                                                               | `id`            |
| containerHeight  | 容器高度(超过此高度将滚动)number                                                                                                                                                                                                                            | number\|string                                                       |                 |
| initialParams    | 列表请求的额外参数                                                                                                                                                                                                                                          | any                                                                  | {}              |
| loadMore         | 加载数据方法                                                                                                                                                                                                                                                | (params?: T) => Promise<{ data: { total: number; records: any[] } }> |                 |
| renderItem       | 列表项的渲染方法                                                                                                                                                                                                                                            | (item: P, index: number) => React.ReactNode                          |                 |
| grid             | 栅格布局配置,详见[Antd List Grid 配置](https://4x-ant-design.antgroup.com/components/list-cn/#List-grid-props)                                                                                                                                              |                                                                      |                 |
| className        | 容器类名                                                                                                                                                                                                                                                    | string                                                               |                 |
| scrollThreshold  | 定义组件何时调用`loadMore`的阈值。默认值为`100px` 。如果是 0.8，这意味着当用户滚动高度低于总高度的 80% 时将调用`loadMore` 。如果以像素为单位的阈值（ `scrollThreshold="200px"` ），则一旦向下滚动至少（100％-scrollThreshold）个像素，就会调用`loadMore` 。 | string\|number                                                       | 100px           |
| visibilityHeight | 滚动高度达到此参数值才出现 BackTop                                                                                                                                                                                                                          | number                                                               | 200             |
