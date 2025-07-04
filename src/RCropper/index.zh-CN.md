---
title: RCropper
description: 图片裁剪组件
keywords: ['图片', '裁剪', 'Cropperjs']
tocDepth: 2
demo:
  cols: 2
nav:
  title: 组件
  path: /components
group:
  title: 业务组件
---

## 组件特性

- 基于 Cropper.js 最新版本封装，支持高性能图片裁剪
- 支持矩形选区、固定/自定义宽高比裁剪
- 支持图片缩放、旋转、翻转等基础操作
- 支持自定义网格线与画布配置
- 支持通过 ref 获取实例对象，灵活调用底层方法
- 响应式设计，适配不同屏幕和容器尺寸
- 支持裁剪结果导出为 base64 或 File 对象
- 选区可拖拽、缩放、重置，交互体验友好
- 支持禁用缩放、调整选区等高级配置

## 基础用法

<code src="./demos/demo1.tsx" title="模式选择"></code>

## 设置选区

<code src="./demos/demo2.tsx" title="设置选区"></code>

## canvas 画布设置

<code src="./demos/demo3.tsx" title="canvas画布设置"></code>

## API

### RCropperProps 属性

| 属性名    | 类型                                             | 默认值    | 说明                   |
| --------- | ------------------------------------------------ | --------- | ---------------------- |
| src       | `string`                                         | -         | (必选)要裁剪的图片地址 |
| alt       | `string`                                         | `'image'` | 图片 alt 描述          |
| className | `string`                                         | -         | 自定义类名             |
| style     | `React.CSSProperties`                            | -         | 自定义样式             |
| grid      | [RCropperGrid](#rcroppergrid-网格配置)           | -         | 网格线配置             |
| canvas    | [RCropperCanvas](#rcroppercanvas-画布配置)       | -         | 画布配置               |
| selection | [RCropperSelection](#rcropperselection-选区配置) | -         | 选区配置               |
| dragMode  | `'crop' \| 'move' \| 'none'`                     | `crop`    | 拖拽模式               |

### RCropperGrid 网格配置

| 属性名  | 类型     | 默认值 | 说明     |
| ------- | -------- | ------ | -------- |
| rows    | `number` | 3      | 网格行数 |
| columns | `number` | 3      | 网格列数 |

### RCropperCanvas 画布配置

| 属性名    | 类型      | 默认值  | 说明     |
| --------- | --------- | ------- | -------- |
| scaleStep | `number`  | 0.1     | 缩放步长 |
| disabled  | `boolean` | `false` | 是否禁用 |

### RCropperSelection 选区配置

| 属性名             | 类型      | 默认值 | 说明           |
| ------------------ | --------- | ------ | -------------- |
| x                  | `number`  | -      | 选区 x 坐标    |
| y                  | `number`  | -      | 选区 y 坐标    |
| width              | `number`  | -      | 选区宽度       |
| height             | `number`  | -      | 选区高度       |
| aspectRatio        | `number`  | `1:1`  | 选区宽高比     |
| initialAspectRatio | `number`  | `1:1`  | 初始宽高比     |
| zoomable           | `boolean` | `true` | 是否可缩放     |
| resizable          | `boolean` | `true` | 是否可调整大小 |

### 事件

| 方法名       | 参数                                                            | 返回值 | 说明         |
| ------------ | --------------------------------------------------------------- | ------ | ------------ |
| onCrop       | `(base64: string, file: File)`                                  | `void` | 裁剪完成回调 |
| onZoom       | `transform: number[]`                                           | `void` | 缩放回调     |
| onRotate     | `transform: number[]`                                           | `void` | 旋转回调     |
| onFlip       | `transform: number[]`                                           | `void` | 翻转回调     |
| onReset      | `transform: number[]`                                           | `void` | 重置回调     |
| onCancelCrop | `rect: { x: number, y: number, width: number, height: number }` | `void` | 取消裁剪回调 |

### 实例方法

通过 `ref` 可调用以下方法：

| 方法名    | 参数 | 返回值             | 说明              |
| --------- | ---- | ------------------ | ----------------- |
| cropper   | -    | `Cropper`          | 获取 Cropper 实例 |
| image     | -    | `CropperImage`     | 获取图片元素      |
| canvas    | -    | `CropperCanvas`    | 获取画布元素      |
| selection | -    | `CropperSelection` | 获取选区元素      |
