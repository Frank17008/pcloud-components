---
title: ScrollNumber
description: 数字滚动组件
keywords: ['数字', '滚动', 'number']
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

- 支持数字特效滚动
- 默认从 0 开始滚动, 支持自定义起始数值
- 默认千分位按照逗号分隔, 支持可配
- 默认数据保留 2 位小数, 支持可配
- 根据数据大小默认设置了动画时间, 支持自定义配置
- 支持 hooks 用法

## 基础使用

<code src="./demos/basicDemo.tsx" ></code>

## 千分位分隔符

<code src="./demos/separatorDemo.tsx" title="千分位分隔符"></code>

## 自定义过渡动画时间

<code src="./demos/durationDemo.tsx" title="自定义过渡动画时间"></code>

## 保留小数

<code src="./demos/noDecimalsDemo.tsx" title="不保留小数"></code>
<code src="./demos/decimalDemo.tsx" title="小数分隔符"></code>

## 自定义控制开始时间

<code src="./demos/delayStartDemo.tsx" title="延迟开始"></code>
<code src="./demos/manuallyStartDemo.tsx" title="手动开始"></code>

## 自定义前后缀

<code src="./demos/prefixDemo.tsx" title="自定义前缀"></code>
<code src="./demos/suffixDemo.tsx" title="自定义后缀"></code>

## Hooks 使用

<code src="./demos/hooksSimpleDemo.tsx" title="Hooks简单示例"></code>
<code src="./demos/hooksDemo.tsx" title="Hooks完整示例"></code>

## API

| 参数名称      | 说明              | 类型                                         | 默认值                   |
| ------------- | ----------------- | -------------------------------------------- | ------------------------ |
| className     | 样式类名          | `string`                                     | ——                       |
| start         | 开始数值          | `number`                                     | 0                        |
| end           | 结束数值          | `number`                                     | ——                       |
| duration      | 动画过渡时间(s)   | `number`                                     | 1 位数 0.8s；3 位数 1.5s |
| delay         | 延迟开始时间(s)   | `number`                                     | 0                        |
| decimals      | 保留小数位数      | `number`                                     | 2                        |
| decimal       | 小数位分隔符      | `string`                                     | `.`                      |
| separator     | 千分位分隔符      | `string`                                     | `,`                      |
| suffix        | 数值后缀字符      | `string`                                     | ——                       |
| prefix        | 数值前缀字符      | `string`                                     | ——                       |
| onReset       | 重置函数回调      | `({pauseResume,start,update}) => void`       | ——                       |
| onUpdate      | 更新函数回调      | `({pauseResume,start,reset}) => void`        | ——                       |
| onPauseResume | 暂停/恢复函数回调 | `({update,start,reset}) => void`             | ——                       |
| onStart       | 开始函数回调      | `({pauseResume,reset,update}) => void`       | ——                       |
| onEnd         | 结束函数回调      | `({pauseResume,reset,start,update}) => void` | ——                       |
