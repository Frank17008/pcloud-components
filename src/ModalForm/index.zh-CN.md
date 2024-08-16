---
title: ModalForm
nav:
  title: 组件
  path: /components
group:
  title: 组合组件
---

## 组件特性

- 融合了 DModal、DForm 组件,支持两者的所有特性
- 禁用表单时自动隐藏表单 Footer
- 提交表单时自动校验
- 支持表单的多种布局方式
- 支持弹窗内嵌其他子级元素

## 基本使用

<code src="./demos/demo1.tsx" ></code>

## 回填数据、禁用表单

<code src="./demos/demo2.tsx" ></code>

## 布局方式

<code src="./demos/demo3.tsx" ></code>

## API

| 参数名称   | 说明           | 类型                                   | 默认值                             |
| ---------- | -------------- | -------------------------------------- | ---------------------------------- |
| modalProps | Modal 弹窗配置 | [DModalProps](/components/d-modal#api) | [DefaultProps](#DefaultModalProps) |
| formProps  | Form 表单配置  | [DFormProps](/components/d-form#api)   | 参考 DFormProps 默认值             |
| children   | 子元素         | React.ReactNode                        |                                    |

### DefaultModalProps

| 参数名称       | 说明             | 类型    | 默认值                                    |
| -------------- | ---------------- | ------- | ----------------------------------------- |
| centered       | 是否居中         | boolean | true                                      |
| destroyOnClose | 关闭时销毁内容   | boolean | true                                      |
| okText         | 确认按钮文字     | string  | 确定                                      |
| cancelText     | 取消按钮文字     | string  | 取消                                      |
| bodyStyle      | 弹窗 Body 区样式 | object  | { maxHeight: '600px', overflowY: "auto" } |
