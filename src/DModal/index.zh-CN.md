---
title: DModal
nav:
  title: 组件
  path: /components
group:
  title: 业务组件
---

## 全局弹框

<code src="./demos/demo1.tsx" ></code>

## 相对弹框

<code src="./demos/demo2.tsx" ></code>

## 弹框大小

<code src="./demos/demo3.tsx" ></code>

## 弹框自定义显示内容

<code src="./demos/demo4.tsx" ></code>

## API

|        参数名称        | 说明                                                             |                          类型                           |       默认值        |
| :--------------------: | :--------------------------------------------------------------- | :-----------------------------------------------------: | :-----------------: |
|        children        | 自定义弹框内容                                                   |                    `React.ReactDOM`                     |          -          |
|          mode          | relative:相对位置弹框<br />absolute:全局弹框                     |              `relative\| absolute \|panel`              |      absolute       |
|       afterClose       | Modal 完全关闭后的回调                                           |                       `Function`                        |          -          |
|   cancelButtonProps    | cancel 按钮 props                                                |                      `ButtonProps`                      |          -          |
|       cancelText       | 取消按钮文字                                                     |                       `ReactNode`                       |        取消         |
|        centered        | 垂直居中展示 Modal                                               |                        `boolean`                        |       `false`       |
|        closable        | 是否显示右上角的关闭按钮                                         |                        `boolean`                        |       `true`        |
|       closeIcon        | 自定义关闭图标                                                   |                       `ReactNode`                       | `<CloseOutlined />` |
|     confirmLoading     | 确定按钮 loading                                                 |                        `boolean`                        |       `false`       |
|     destroyOnClose     | 关闭时销毁 Modal 里的子元素                                      |                        `boolean`                        |       `false`       |
| focusTriggerAfterClose | 对话框关闭后是否需要聚焦触发元素                                 |                        `boolean`                        |       `true`        |
|         footer         | 底部内容，当不需要默认底部按钮时，可以设为  footer={null}        |                       `ReactNode`                       |   (确定取消按钮)    |
|      forceRender       | 强制渲染 Modal                                                   |                        `boolean`                        |       `false`       |
|      getContainer      | 指定 Modal 挂载的节点，但依旧为全局展示，false  为挂载在当前位置 | `HTMLElement\| () => HTMLElement \| Selectors \| false` |   `document.body`   |
|        keyboard        | 是否支持键盘 esc 关闭                                            |                        `boolean`                        |       `true`        |
|          mask          | 是否展示遮罩                                                     |                        `boolean`                        |       `true`        |
|      maskClosable      | 点击蒙层是否允许关闭                                             |                        `boolean`                        |       `true`        |
|       maskStyle        | 遮罩样式                                                         |                     `CSSProperties`                     |                     |
|      modalRender       | 自定义渲染对话框                                                 |            `(node: ReactNode) => ReactNode`             |          -          |
|     okButtonProps      | ok 按钮 props                                                    |                      `ButtonProps`                      |          -          |
|         okText         | 确认按钮文字                                                     |                       `ReactNode`                       |        确定         |
|         okType         | 确认按钮类型                                                     |                        `string`                         |      `primary`      |
|         style          | 可用于设置浮层的样式，调整浮层位置等                             |                     `CSSProperties`                     |          -          |
|         title          | 标题                                                             |                       `ReactNode`                       |          -          |
|     wrapClassName      | 对话框外层容器的类名                                             |                        `string`                         |          -          |
|        onCancel        | 点击遮罩层或右上角叉或取消按钮的回调                             |                      `Function(e)`                      |          -          |
|          onOk          | 点击确定回调                                                     |                      `Function(e)`                      |          -          |
