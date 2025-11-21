# @pointcloud/pcloud-components

[![NPM version](https://img.shields.io/npm/v/@pointcloud/pcloud-components.svg?style=flat)](https://npmjs.org/package/@pointcloud/pcloud-components)
[![NPM downloads](https://img.shields.io/npm/dm/@pointcloud/pcloud-components.svg?style=flat)](https://npmjs.org/package/@pointcloud/pcloud-components)
[![License](https://img.shields.io/npm/l/@pointcloud/pcloud-components.svg?style=flat)](https://npmjs.org/package/@pointcloud/pcloud-components)

一套基于 Ant Design v4.24.16 和 React v17.0.2 开发的业务组件库，包含 30+ 个高质量组件，可帮助您快速构建企业级中后台产品原型。

## 🎁 组件列表

### 表单组件

| 组件名称    | 描述                                |
| ----------- | ----------------------------------- |
| DForm       | 基于 Ant Design Form 的增强表单组件 |
| DInput      | 增强版输入框组件                    |
| DSelect     | 支持异步加载的下拉选择组件          |
| DCascader   | 支持异步加载的级联选择组件          |
| DTreeSelect | 支持异步加载的树选择组件            |
| DUpload     | 文件上传组件                        |
| ColorPicker | 颜色选择器组件                      |

### 数据展示组件

| 组件名称           | 描述             |
| ------------------ | ---------------- |
| DTable             | 增强版表格组件   |
| LabelValue         | 标签值展示组件   |
| WordCloud          | 词云组件         |
| ScrollNumber       | 数字滚动动画组件 |
| AspectRatio        | 宽高比容器组件   |
| NoData             | 无数据展示组件   |
| IPAddress          | IP 地址输入组件  |
| AnimatedScrollList | 动画滚动列表组件 |
| OrgTree            | 组织树组件       |

### 模态框组件

| 组件名称  | 描述             |
| --------- | ---------------- |
| DModal    | 增强版模态框组件 |
| ModalForm | 表单模态框组件   |
| LoginForm | 登录表单组件     |

### 其他业务组件

| 组件名称           | 描述               |
| ------------------ | ------------------ |
| Loading            | 全局加载组件       |
| ContextMenu        | 右键菜单组件       |
| AdvancedFilter     | 高级筛选组件       |
| InfiniteScrollList | 无限滚动列表组件   |
| PictureCard        | 图片卡片组件       |
| SignaturePad       | 签名板组件         |
| RndDrag            | 可拖拽调整大小组件 |
| RCropper           | 图片裁剪组件       |

## 🚀 安装

```bash
# 使用 npm
npm install @pointcloud/pcloud-components

# 使用 yarn
yarn add @pointcloud/pcloud-components

# 使用 pnpm
pnpm add @pointcloud/pcloud-components
```

## 🔨 快速开始

通过 umd 引入时,需要先引入`react`和`react-dom`, 示例:

```html
<link rel="stylesheet" href="https://unpkg.com/@pointcloud/pcloud-components@0.1.30/dist/umd/pcloud-components.min.css" />
<script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@pointcloud/pcloud-components@0.1.30/dist/umd/pcloud-components.min.js"></script>
```

### 1. 基础使用

```jsx
import React from 'react';
import { DCascader } from '@pointcloud/pcloud-components';

const App = () => {
  const handleChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  return <DCascader showSearch placeholder="请选择" onChange={handleChange} />;
};

export default App;
```

### 2. 使用表单组件

```jsx
import React from 'react';
import { DForm, DInput, DSelect } from '@pointcloud/pcloud-components';

const App = () => {
  const onFinish = (values) => {
    console.log('表单值:', values);
  };

  return (
    <DForm onFinish={onFinish}>
      <DForm.Item label="用户名" name="username">
        <DInput placeholder="请输入用户名" />
      </DForm.Item>

      <DForm.Item label="状态" name="status">
        <DSelect
          options={[
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 },
          ]}
        />
      </DForm.Item>

      <DForm.Item>
        <button type="submit">提交</button>
      </DForm.Item>
    </DForm>
  );
};

export default App;
```

## 📖 详细文档

访问我们的[在线文档](https://frank17008.github.io/pcloud-components)查看完整的组件列表和使用示例。

## ⚙️ 环境支持

- React >= 17.0.2
- Ant Design <= 4.24.16
- Node >= 16.20.0
- Modern browsers
