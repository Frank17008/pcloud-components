---
title: Loading
nav:
  title: 组件
  path: /components
group:
  title: 业务组件
---

# 单例 Loading

单例模式,只创建一个组件实例;函数式调用

## 使用

<code src="./demos/demo1.tsx" ></code>

## 自定义内容

<code src="./demos/demo2.tsx" ></code>

## 指定挂载位置

<code src="./demos/demo3.tsx" ></code>

## API

|    Name     | Description       |                            Type                            |     返回值     |                            Default                             |
| :---------: | :---------------- | :--------------------------------------------------------: | :------------: | :------------------------------------------------------------: |
|    open     | 打开方法          | ({tip?:string,container?:ReactInstance}) => React.ReactDOM | React.ReactDOM | tip 默认值：数据请求中...<br />container 默认值：document.body |
|    close    | 关闭方法          |                          Function                          |       --       |                               --                               |
| getInstance | 获取 loading 实例 |                          Function                          | React.ReactDOM |                               --                               |
