---
title: DForm
description: 基于 antd 4.24.10 Form 的二次封装组件
tocDepth: 2
nav:
  title: 组件
  path: /components
group:
  title: 业务组件
---

## 组件特性

- 内置 input、select、button 等多种常用表单元素
- 支持表单元素自定义渲染
- 支持 items 和 children 两种添加表单元素方式
- 支持表单元素的默认默认属性设置
- 支持 inlineVertical 和 Grid 布局方式

## 基础用法

<code src="./demos/basicDemo.tsx" title="基础用法" description="通过items添加表单项"></code>

## 内置组件

<code src="./demos/internalRenderDemo.tsx" title="内置组件" description="renderType所支持的内置组件"></code>

## 自定义表单项渲染类型

<code src="./demos/customRenderDemo.tsx" title="自定义表单项渲染类型" description="通过 items 的 renderType 与 render 属性实现自定义渲染类型,renderType='other'时渲染结果会包含在 Form.Item中"></code>

## 设置表单项

<code src="./demos/columnsAndChildrenDemo.tsx" title="设置表单项" description="items与children都可以设置表单项,如果同时存在则children设置的表单项会排在前面"></code>

## 表单项默认值

<code src="./demos/defaultItemPropsDemo.tsx" title="表单项默认值" description="可以通过defaultItemProps统一设置表单项的默认值(只对items添加的表单项生效,且会被items中的同名属性值覆盖)" ></code>

## 布局方式

<code src="./demos/layoutDemo.tsx" title="布局方式" description="新增了行内垂直布局方式inlineVertical和grid栅格布局方式"></code>

## 动态设置字段

<code src="./demos/dynamicItemsDemo.tsx" title="动态设置字段" description="通过ref属性配合useForm可以直接操作组件内部的表单项列表，而不用通过外部state手动管理"></code>

## API

### DFormProps

| 参数             | 说明                                                                      | 类型                                                         | 默认值     | 版本 |
| :--------------- | :------------------------------------------------------------------------ | :----------------------------------------------------------- | :--------- | :--- |
| items            | 表单项数组,可以通过数组的形式添加表单项                                   | `DItemProps[]`                                               | -          |      |
| defaultItemProps | 统一设置 items 的默认属性                                                 | `DItemProps`                                                 | -          |      |
| layout           | 布局方式 新增了行内垂直布局方式 inlineVertical                            | `'inline' \| 'horizontal' \| 'vertical' \| 'inlineVertical'` | horizontal |      |
| children         | children 方式添加表单项,如果同时设置了 items，则 children 在 items 下面） | `ReactNode \| ReactNode[]`                                   | -          |      |

其他属性同 antd Form 组件，详见：https://4x-ant-design.antgroup.com/components/form-cn/#API

### DItemProps

| 参数          | 说明                                                    | 类型                                                                                          | 默认值 | 版本 |
| :------------ | :------------------------------------------------------ | :-------------------------------------------------------------------------------------------- | :----- | :--- |
| renderType    | [渲染类型](#render-type)                                | `string \| undefined`                                                                         | -      |      |
| render        | 自定义渲染函数, 仅 renderType 等于 custom、other 时生效 | `(props: ItemProps, formItemProps: FormItemProps, allProps?: InternalItemProps) => ReactNode` | -      |      |
| label         | label 标签文本,同 antd Form.Item 的 label,只能是 string | `string`                                                                                      | -      |      |
| name          | name 标签文本,同 antd Form.Item 的 name                 | [NamePath](https://4x-ant-design.antgroup.com/components/form-cn/#NamePath)                   | -      |      |
| formItemProps | Form.Item 的属性                                        | `object`                                                                                      | -      |      |
| -             | renderType 字段所指定的组件支持的其他属性               | `any`                                                                                         | -      |      |

<div id="render-type"></div>

### renderType

| 类型名称     | 类型名称           | 类型说明                                                  |
| :----------- | :----------------- | :-------------------------------------------------------- |
| dInputs      | `<DInputs />`      | 内置组件                                                  |
| input        | `<Input />`        | 内置组件                                                  |
| textArea     | `<TextArea />`     | 内置组件                                                  |
| password     | `<Password />`     | 内置组件                                                  |
| inputNumber  | `<InputNumber />`  | 内置组件                                                  |
| autoComplete | `<AutoComplete />` | 内置组件                                                  |
| dSelect      | `<DSelect />`      | 内置组件                                                  |
| select       | `<Select />`       | 内置组件                                                  |
| dCascader    | `<DCascader />`    | 内置组件                                                  |
| cascader     | `<Cascader />`     | 内置组件                                                  |
| dTreeSelect  | `<DTreeSelect />`  | 内置组件                                                  |
| treeSelect   | `<TreeSelect />`   | 内置组件                                                  |
| datePicker   | `<DatePicker />`   | 内置组件                                                  |
| timePicker   | `<TimePicker />`   | 内置组件                                                  |
| rangePicker  | `<RangePicker />`  | 内置组件                                                  |
| mentions     | `<Mentions />`     | 内置组件                                                  |
| checkbox     | `<Checkbox />`     | 内置组件                                                  |
| radio        | `<Radio />`        | 内置组件                                                  |
| rate         | `<Rate />`         | 内置组件                                                  |
| slider       | `<Slider />`       | 内置组件                                                  |
| switch       | `<Switch />`       | 内置组件                                                  |
| transfer     | `<Transfer />`     | 内置组件                                                  |
| upload       | `<Upload />`       | 内置组件                                                  |
| dUpload      | `<DUpload />`      | 内置组件                                                  |
| button       | `<Button />`       | 内置组件                                                  |
| divider      | `<Divider />`      | 内置组件                                                  |
| custom       | `<Custom />`       | 自定义组件渲染组件                                        |
| other        | `<Other />`        | 自定义组件渲染组件(包裹在`<Form.Item></Form.Item>`组件中) |

### ref(组件引用)

ref 可以直接操作内部状态,目前仅支持通过 setItems 方法更新内部表单项列表,setItems 方法接受一个回调方法，该方法接受一个包含当前组件所有表单项的列表，返回一个新的表单项列表,返回值可以是普通数组，也可以是一个 Promise

```
// 回调函数fn定义
const fn = (items: DItemProps[]) => DItemProps[] | Promise<DItemProps[]
// setItems定义
const setItems = (items: DItemProps[] | fn) => void
// ref定义
type ref = React.Ref<{ setItems }>
```
