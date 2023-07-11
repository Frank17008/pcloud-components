---
title: Upload
description: 基于 antd 4.24.10 Upload 的二次封装组件
tocDepth: 2
nav:
  title: 组件
  path: /components
group:
  title: 业务组件
---

## 组件特性

- 针对图片格式的上传提供优化,默认提供 base64 格式的预览
- onPreview、onDownload、均支持 Promise,同时提供了非图片类文件开启预览按钮的功能
- 针对 From 表单使用场景进行了优化，解决了 Form disable 状态下删除图标和下载图标被意外禁用的 bug
- 该组件的 value 属性不是受控的，只起到默认值的作用，如果想要列表受控，请使用 fileList 属性

## 基础用法

<code src="./demos/basicDemo.tsx" title="基础用法" description="最基本的上传用法，与antd中的Upload用法一致，上传图像时默认对本地预览图像进行适当压缩"></code>

## 表单中使用

<code src="./demos/uploadInFormDemo.tsx" title="表单中使用" description="在form表单中作为表单项元素使用"></code>

## 生成缩略图

<code src="./demos/thumbDemo.tsx" title="生成缩略图" description="当上传文件为图像时，自动生成缩略图，图像文件过大时，还可以对缩略图进行压缩"></code>

## 自定义上传及删除

<code src="./demos/listDemo.tsx" title="自定义上传及删除" description="通过fileList搭配customRequest、onRemove可以实现完全受控的上传列表"></code>

## 图像下载及预览

<code src="./demos/previewDemo.tsx" title="图像下载及预览" description="通过enablePreview强制对非图像文件进行预览,使用优化过的onPreview、onDownload控制下载及预览的细节"></code>

## API

| 参数          | 说明                                                                                            | 类型                                                                                                                                      | 默认值 | 版本 |
| :------------ | :---------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :----- | :--- |
| value         | 初始文件列表(相当于 defaultFileList,但优先级高于 defaultFileList)                               | `DUploadFile \| DUploadFile[]`                                                                                                            |        |      |
| fileList      | 文件列表(在 Form 组件中表现为受控列表，在一般情况下相当于初始文件列表，其优先级高于 value 属性) | `DUploadFile \| DUploadFile[]`                                                                                                            |        |      |
| onChange      | 文件列表变化时的回调(仅在 customRequest 或 onRemove 后触发)                                     | `(list: DUploadFile[], info: UploadChangeParam<DUploadFile>) => void`                                                                     |        |      |
| customRequest | 文件上传时的回调函数，支持 Promise                                                              | `customRequest?: (file: DUploadFile, list: DUploadFile[], requestOption: any) => DUploadFile[] \| Promise<DUploadFile[] \| void> \| void` |        |      |
| onRemove      | 点击删除按钮时的回调，支持 Promise                                                              | `(file: DUploadFile, list: DUploadFile[]) => DUploadFile[] \| Promise<DUploadFile[] \| void> \| void`                                     |        |      |
| onDownload    | 点击下载按钮时的回调，支持 Promise                                                              | `(file: DUploadFile) => DUploadFile \| Blob \| Promise<DUploadFile \| Blob> \| void`                                                      |        |      |
| onPreview     | 点击预览按钮时的回调，支持 Promise                                                              | `(file: DUploadFile) => DUploadFile \| Blob \| Promise<DUploadFile \| Blob> \| void`                                                      |        |      |
| thumbOption   | 上传文件时的缩略图选项,null 表示不生成缩略图，(详见下文`ThumbOptionProps`介绍)                  | `ThumbOptionProps \| null`                                                                                                                |        |      |
| itemClassName | 列表项样式类名                                                                                  | `string`                                                                                                                                  |        |      |
| enablePreview | 是否强制允许文件预览                                                                            | `boolean`                                                                                                                                 | false  |      |

其他属性同 antd Upload 组件，详见：https://4x-ant-design.antgroup.com/components/upload-cn/#API

## DUploadFile

| 参数   | 说明                                               | 类型                   | 默认值 | 版本 |
| :----- | :------------------------------------------------- | :--------------------- | :----- | :--- |
| id     | 文件 id                                            | `string \| number`     |        |      |
| uid    | 文件 uid,系统自动生成                              | `string \| number`     |        |      |
| source | 文件来源 upload:文件对话框,remote:已上传的文件对象 | `'upload' \| 'remote'` |        |      |

继承自 UploadFile，附带额外属性用于渲染，详见：https://4x-ant-design.antgroup.com/components/upload-cn/#UploadFile

## ThumbOptionProps

| 参数        | 说明                                                                                         | 类型                                                               | 默认值                                                      | 版本 |
| :---------- | :------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- | :---------------------------------------------------------- | :--- |
| filter      | 对目标文件进行过滤，默认只对图片格式生成缩略图                                               | `((file: DUploadFile) => boolean) \| Array<string>`                | `['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml']` |      |
| size        | 文件 uid,系统自动生成 文件大小,当上传文件大于指定值时会对缩略图进行压缩,单位为字节，默认 2MB | `number`                                                           | `2097152`                                                   |      |
| compress    | 缩略图压缩参数,默认为 {width:300,height:200,quality:0.7}                                     | `CompressProps \| null`                                            | `{ width: 300, height: 200, quality: 0.7 }`                 |      |
| onError     | 缩略图生成失败时的回调函数                                                                   | `(err: Error) => void`                                             |                                                             |      |
| getThumbUrl | 自定义生成 base64 缩略图的方法                                                               | `(file: DUploadFile, option: ThumbOptionProps) => Promise<string>` |                                                             |      |

## DUpload.imageToBase64 方法

imageToBase64 方法用于将图像格式的文件转换为 base64 格式,可以使用 CompressProps 参数对 base64 进行适当的压缩以减小体积

###### 声明格式:

`function imageToBase64(blob: Blob, options?: CompressProps | null): Promise<string> `

###### 用法示例:

`imageToBase64 (file,{ width: 300, height: 200, quality: 0.7 }).then( url => console.log( url ) )`
