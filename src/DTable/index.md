---
title: DTable
nav:
  title: Components
  path: /components
group:
  title: 业务组件
---

<span style="font-size:24px;color:#454d64;font-weight:500">DTable 表格</span>

基于 antd 4.24.10 `Table` 的二次封装组件

- 支持表格数据异步加载、实现自动分页加载，支持加载时使用额外的请求参数
- 支持表格可滚动区域百分比设置，加载时显示 loading 效果
- 支持列属性统一默认设置，操作列可单独设置

---

## 基本使用

<code src="./demos/basicDemo.tsx"  />

## 统一设置列配置

<code src="./demos/columnsPropDemo.tsx" />

## 添加操作列

<code src="./demos/actionColumnDemo.tsx" />

## 指定额外的请求参数

<code src="./demos/extraParamsDemo.tsx" />

## 显示错误信息

<code src="./demos/errorMsgDemo.tsx" />

## API

DTableProps

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| loadMore | 表格数据的加载函数,在表格创建、分页变化、额外参数变化时自动运行，如果设置该属性，则 dataSource 失效 | `(params?: TableParamsProps) => Promise<DTableSourceProps>` | - |  |
| columnsProp | 表格列的基础默认配置,默认所有列居中，表头文字超出显示省略号，详见 antd columns | `ColumnsType[]` | { align: 'center',ellipsis: true} |  |
| actionColumn | 操作列配置,可以是一个普通列配置对象，也可以是一个 columns 的 render 函数 | `ColumnType<any> \| ColumnType<any>['render']` | - |  |
| showErrorMsg | 加载数据失败时是否显示错误信息（仅 loadMore 可用时生效） | `boolean \| (err:any) => string` | true |  |
| extraParams | 额外的请求参数,（仅 loadMore 可用时生效） | `TableParamsProps` | - |  |

DTableSourceProps

| 参数    | 说明                                               | 类型       | 默认值 | 版本 |
| ------- | -------------------------------------------------- | ---------- | ------ | ---- |
| records | 表格数据列表，等同于 antd table 的 datasource 属性 | `object[]` | -      |      |
| total   | 当前请求参数下的列表总数（用于分页）               | `number`   | -      |      |

TableParamsProps

| 参数    | 说明                         | 类型     | 默认值 | 版本 |
| ------- | ---------------------------- | -------- | ------ | ---- |
| current | 当前页码                     | `number` | 1      |      |
| size    | 分页大小                     | `number` | 10     |      |
| -       | 后台接口所支持的其他任意参数 | `any`    | -      |      |

其他属性同 antd Table 组件，详见：https://4x-ant-design.antgroup.com/components/table-cn/#API
