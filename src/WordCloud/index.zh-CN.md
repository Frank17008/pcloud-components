---
title: WordCloud
description: 词云组件
keywords: ['词云', 'Cloud', 'WordCloud']
demo:
  cols: 2
tocDepth: 2
nav:
  title: 组件
  path: /components
group:
  title: 业务组件
---

## 组件特性

- svg 渲染
- 词组数据支持自定义颜色
- 支持鼠标事件

## 基础使用

<code src="./demos/demo1.tsx" ></code>

## 事件监听

<code src="./demos/demo2.tsx" ></code>

## 其他参数

<code src="./demos/demo3.tsx" ></code>

## API

| 参数名称  | 说明         | 类型                                       | 默认值                                |
| --------- | ------------ | ------------------------------------------ | ------------------------------------- |
| className | 样式类名     | string                                     |                                       |
| words     | 词组数据     | `Array<{text:string;value:string number}>` |                                       |
| minSize   | 画布最小尺寸 | number[]                                   | [300,300]                             |
| size      | 画布尺寸     | number[]                                   |                                       |
| maxWords  | 最大单词量   | number                                     | 100                                   |
| callbacks | 事件回调     | [Callbacks](#Callbacks)                    | 参照[Callbacks](#Callbacks)中的默认值 |
| options   | 其他配置     | [Options](#Options)                        | 参照[Options](#Options)中的默认值     |

### Callbacks

| 参数名称        | 说明         | 类型                    | 默认值                                     |
| --------------- | ------------ | ----------------------- | ------------------------------------------ |
| getWordColor    | 单词颜色     | ({text, value})=>string | ({ text, value }) =>\`${text} (${value})\` |
| onWordClick     | 点击事件     | function({text, value}) |                                            |
| onWordMouseOut  | 鼠标移出事件 | function({text, value}) |                                            |
| onWordMouseOver | 鼠标移动事件 | function({text, value}) |                                            |
| getWordTooltip  | 鼠标提示     | function({text, value}) |                                            |

### Options

| 参数名称           | 说明                             | 类型                                                                  | 默认值            |
| ------------------ | -------------------------------- | --------------------------------------------------------------------- | ----------------- |
| fontWeight         | 字体加粗程度                     | string                                                                | 'normal'          |
| padding            | 单词间距                         | number                                                                | 1                 |
| colors             | 单词颜色                         | string[]                                                              | 20 个随机颜色值   |
| deterministic      | 是否固定单词每次渲染的角度和位置 | boolean                                                               | false             |
| enableTooltip      | 开启 tooltip                     | boolean                                                               | true              |
| fontFamily         | 字体                             | string                                                                | `times new roman` |
| fontSizes          | 字体大小范围                     | number[]                                                              | [4,32]            |
| fontStyle          | 字体样式                         | string                                                                | 'normal'          |
| rotationAngles     | 字体旋转角度范围                 | number[]                                                              | [-90,90]          |
| scale              | 字体放大比例                     | `linear\|sqrt\|log`                                                   | "sqrt"            |
| spiral             | 螺旋类型                         | `archimedean\|rectangular`                                            | rectangular       |
| transitionDuration | 字体过渡动画时间                 | number                                                                | 600               |
| tooltipOptions     | 提示框的其他配置                 | 参考[Tippy.js Props](https://atomiks.github.io/tippyjs/v6/all-props/) | {}                |
