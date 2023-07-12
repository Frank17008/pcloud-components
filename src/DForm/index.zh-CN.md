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
- 支持 inlineVertical 布局方式

## 基础用法

<code src="./demos/basicDemo.tsx" title="基础用法" description="通过items添加表单项"></code>

## 内置组件

<code src="./demos/internalRenderDemo.tsx" title="内置组件" description="renderType所支持的内置组件"></code>

## 自定义表单项渲染类型

<code src="./demos/customRenderDemo.tsx" title="自定义表单项渲染类型" description="通过 items 的 renderType 与 render 实现属性自定义渲染类型,renderType='other'时渲染结果会包含在 Form.Item中"></code>

## 设置表单项

<code src="./demos/columnsAndChildren.tsx" title="设置表单项" description="items与children都可以设置表单项,如果同时存在则children设置的表单项会排在前面"></code>

## 表单项默认值

<code src="./demos/defaultItemPropsDemo.tsx" title="表单项默认值" description="可以通过defaultItemProps统一设置表单项的默认值(只对items添加的表单项生效,且会被items中的同名属性值覆盖)" ></code>

## 布局方式

<code src="./demos/layoutDemo.tsx" title="布局方式" description="layout属性在原来的基础上新增了行内垂直布局方式inlineVertical"></code>

## API

DFormProps

| 参数             | 说明                                                                      | 类型                                                         | 默认值     | 版本 |
| :--------------- | :------------------------------------------------------------------------ | :----------------------------------------------------------- | :--------- | :--- |
| items            | 表单项数组,可以通过数组的形式添加表单项                                   | `DItemProps[]`                                               | -          |      |
| defaultItemProps | 统一设置 items 的默认属性                                                 | `DItemProps`                                                 | -          |      |
| layout           | 布局方式 新增了行内垂直布局方式 inlineVertical                            | `'inline' \| 'horizontal' \| 'vertical' \| 'inlineVertical'` | horizontal |      |
| children         | children 方式添加表单项,如果同时设置了 items，则 children 在 items 下面） | `ReactNode \| ReactNode[]`                                   | -          |      |

DItemProps

| 参数          | 说明                                                    | 类型                                                                                          | 默认值 | 版本 |
| :------------ | :------------------------------------------------------ | :-------------------------------------------------------------------------------------------- | :----- | :--- |
| renderType    | 渲染类型                                                | `string \| undefined`                                                                         | -      |      |
| render        | 自定义渲染函数, 仅 renderType 等于 custom、other 时生效 | `(props: ItemProps, formItemProps: FormItemProps, allProps?: InternalItemProps) => ReactNode` | -      |      |
| label         | label 标签文本,同 antd Form.Item 的 label,只能是 string | `string`                                                                                      | -      |      |
| name          | name 标签文本,同 antd Form.Item 的 name                 | [NamePath](https://4x-ant-design.antgroup.com/components/form-cn/#NamePath)                   | -      |      |
| formItemProps | Form.Item 的属性                                        | `object`                                                                                      | -      |      |
| -             | renderType 字段所指定的组件支持的其他属性               | `any`                                                                                         | -      |      |

renderType 可选值:  
`'dInput' | 'input' | 'textArea' | 'password' | 'inputNumber' | 'autoComplete' | 'dSelect' | 'select' | 'dCascader' | 'cascader' | 'dTreeSelect' | 'treeSelect' | 'datePicker' | 'timePicker' | 'rangePicker' | 'mentions' | 'checkbox' | 'radio' | 'rate' | 'slider' | 'switch' | 'transfer' | 'upload' | 'other' | 'button' | 'divider' | 'custom'`

其他属性同 antd Form 组件，详见：https://4x-ant-design.antgroup.com/components/form-cn/#API
