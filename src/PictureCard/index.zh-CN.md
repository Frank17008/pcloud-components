---
title: PictureCard
description: 图文卡片组件
keywords: ['卡片', '文字卡片', '图片']
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

- 图片支持单张及多张预览
- 支持预览时放大、缩小、旋转等操作
- 支持图文上下布局、左右布局方式
- 支持自定义文字内容

## 基础用法

<code src="./demos/demo1.tsx" title="一般效果"></code>
<code src="./demos/demo2.tsx" title="无边框,无hover效果"></code>

## 布局方式

<code src="./demos/demo3.tsx"></code>

## 图片预览

<code src="./demos/demo4.tsx" title="单张图片" description="支持预览时旋转、放大、缩小等"></code>
<code src="./demos/demo5.tsx" title="多张图片" description="多张图片时,默认显示第一张图片;预览时支持切换"></code>

## API

### 通用属性

| 参数名称   | 说明       | 类型                                      | 默认值     |
| ---------- | ---------- | ----------------------------------------- | ---------- |
| className  | 类名       | string                                    |            |
| layout     | 布局方式   | `'vertical' \| 'horizontal'`              | 'vertical' |
| src        | 图片地址   | `ImageProps['src'] \|ImageProps['src'][]` |            |
| imageWidth | 图片宽度   | `ImageProps['width']`                     |            |
| content    | 内容区     | `React.ReactNode`                         |            |
| style      | 自定义样式 | `React.CSSProperties`                     |            |
| hoverable  | 开启 hover | boolean                                   | true       |
| bordered   | 显示边框   | boolean                                   | true       |

ImageProps 见[Antd4.x Image API](https://4x-ant-design.antgroup.com/components/image-cn/#API)
