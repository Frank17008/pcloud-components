---
title: IconFont
nav:
  title: 字体图标组件
  path: /components
group:
  title: 业务组件
---

## 组件特性

- 基于`@ant-design/icons`, 摒弃内置图标
- 支持全局注册和局部注册
- 支持全局设置图标样式
- 支持自定义图标样式
- 无内置图标,可由用户自主选择
- 支持离线图标和在线 CDN

## 基础使用

<code title="全局注册" src="./demos/demo1.tsx" description="需要在项目入口处注册iconfont的脚本地址,其他组件即可引用使用; iconfont脚本地址需要在[iconfont.cn](https://www.iconfont.cn/)上生成"></code>

## 局部覆盖

<code title="局部注册" src="./demos/demo2.tsx" description="通过scriptUrl可临时局部覆盖字体图标配置"></code>

## 样式设置

<code title="样式设置" src="./demos/demo3.tsx" description="支持style设置字体大小,颜色等;或者通过自定义样式类名覆盖"></code>

## API

| 参数名称  | 说明                 | 类型                      | 默认值 |
| --------- | -------------------- | ------------------------- | ------ |
| type      | 图标 class 名称      | `string`                  | -      |
| scriptUrl | 自定义图标库脚本地址 | `string \| string[]` -    | -      |
| className | 自定义样式类名       | `string`                  | -      |
| style     | 自定义样式           | `React.CSSProperties`     | -      |
| onClick   | 点击事件回调         | `React.MouseEventHandler` | -      |

## 静态方法

| 函数名称             | 说明               | 参数                 | 示例                                              |
| -------------------- | ------------------ | -------------------- | ------------------------------------------------- |
| setIconfontScriptUrl | 设置图标库脚本地址 | `string \| string[]` | `IconFont.setIconfontScriptUrl(['url1', 'url2'])` |

## 双色图标主色

对于双色图标，可以通过使用 `getTwoToneColor()` 和 `setTwoToneColor(colorString)` 来全局设置图标主色。

```
import { getTwoToneColor, setTwoToneColor } from '@ant-design/icons';

setTwoToneColor('#eb2f96');
getTwoToneColor(); // #eb2f96
```

## 注意事项

- 离线环境或者局域网的环境下,建议直接在`iconfont.cn`上传自定义的图标,并生成对应的图标库脚本,将脚本文件引入项目`public`文件夹下, 然后在项目主入口处调用`IconFont.setIconfontScriptUrl(url)`方法进行图标库脚本的引入;如果是互联网环境,直接使用在线的 cdn 地址即可;
- antd 的图标在 4.0 版本时已经被分离为独立的包,如果没有用到 antd 内置的图标,完全可以不用安装`@ant-design/icons`;
- antd Icon API:[antd design icon](https://4x-ant-design.antgroup.com/components/icon-cn/#components-icon-demo-iconfont)
- iconfont.cn: [iconfont.cn](https://www.iconfont.cn/)
