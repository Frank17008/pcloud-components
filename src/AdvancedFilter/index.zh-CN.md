---
title: AdvancedFilter
description: 高级搜索组件
tocDepth: 2
nav:
  title: 组件
  path: /components
group:
  title: 业务组件
---

## 基础使用

<code src="./demos/demo1.tsx" ></code>

## 自定义两侧渲染区

<code src="./demos/demo2.tsx" ></code>

## 自定义筛选项

<code src="./demos/demo3.tsx" ></code>

## API

|  参数名称  | 说明               |           类型            | 默认值 |
| :--------: | :----------------- | :-----------------------: | :----: |
|    left    | 筛选项配置         |     `React.ReactNode`     |        |
|   right    | 筛选项值变更时触发 |     `React.ReactNode`     |        |
| inputProps | 点击查询按钮时触发 | [InputProps](#inputprops) |        |
|  children  | 点击重置按钮时触发 |     `React.ReactNode`     |        |
|    fRef    | 表单引用 ref 值    |           `any`           |        |
|    icon    | 筛选文字按钮图标   |     `React.ReactNode`     |        |

### FormProps

|    参数名称    | 说明               |          类型           | 默认值 |
| :------------: | :----------------- | :---------------------: | :----: |
| formItemConfig | 筛选项配置         | [FormItem[]](#formitem) |        |
| onValuesChange | 筛选项值变更时触发 |      `(v) => void`      |        |
|    onSearch    | 点击查询按钮时触发 |      `(v) => void`      |        |
|    onReset     | 点击重置按钮时触发 |      `() => void`       |        |

### FormItem

|  参数名称   | 说明                                                 |                                                    类型                                                    |       默认值        |
| :---------: | :--------------------------------------------------- | :--------------------------------------------------------------------------------------------------------: | :-----------------: |
|    label    | 筛选项 label 文字                                    |                                                  `string`                                                  |                     |
|    name     | 筛选项字段名                                         |                                                  `string`                                                  |                     |
|    type     | 筛选项类型                                           | `input \| inputNumber \| radio \| select \| checkbox \| datePicker \| rangePicker \| switch \| treeSelect` |                     |
| placeholder | 筛选项 placeholder                                   |                                                  `string`                                                  |                     |
|   options   | 筛选项的配置项(select \| treeSelect 时可用)          |                                               `同 antd 组件`                                               |                     |
|   format    | 筛选项的格式化配置(rangePicker \| datePicker 时可用) |                                                  `string`                                                  | YYYY-MM-DD HH:mm:ss |

### InputProps

|  参数名称   | 说明                                   |        类型        |   默认值   |
| :---------: | :------------------------------------- | :----------------: | :--------: |
| placeholder | input 检索框 placeholder               |      `string`      |            |
|    name     | input 检索框字段名                     |      `string`      | (required) |
| inputSearch | input 检索框回车时或点击检索图标时触发 | `(v: any) => void` |            |

方法同 antd Form 组件，详见：https://4x-ant-design.antgroup.com/components/form-cn/#FormInstance
