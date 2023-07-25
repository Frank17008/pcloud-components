// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/stone/Documents/develop/pcloud-components/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('../dumi/layout').default],
    "component": ((props) => {
        const React = require('react');
        const { default: getDemoRenderArgs } = require('/Users/stone/Documents/develop/pcloud-components/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
        const { default: Previewer } = require('dumi-theme-default/es/builtins/Previewer');
        const { usePrefersColor, context } = require('dumi/theme');

        
      const { demos } = React.useContext(context);
      const [renderArgs, setRenderArgs] = React.useState([]);

      // update render args when props changed
      React.useLayoutEffect(() => {
        setRenderArgs(getDemoRenderArgs(props, demos));
      }, [props.match.params.uuid, props.location.query.wrapper, props.location.query.capture]);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
        })
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('../dumi/layout').default, require('/Users/stone/Documents/develop/pcloud-components/node_modules/dumi-theme-default/es/layout.js').default],
    "routes": [
      {
        "path": "/",
        "component": require('/Users/stone/Documents/develop/pcloud-components/README.md').default,
        "exact": true,
        "meta": {
          "locale": "en-US",
          "order": null,
          "filePath": "README.md",
          "updatedTime": 1689658695000,
          "slugs": [
            {
              "depth": 1,
              "value": "pcloud-components",
              "heading": "pcloud-components"
            },
            {
              "depth": 2,
              "value": "项目初始化",
              "heading": "项目初始化"
            },
            {
              "depth": 2,
              "value": "项目结构",
              "heading": "项目结构"
            },
            {
              "depth": 2,
              "value": "组件开发指南",
              "heading": "组件开发指南"
            },
            {
              "depth": 5,
              "value": "组件的基本结构",
              "heading": "组件的基本结构"
            },
            {
              "depth": 5,
              "value": "组件的编写",
              "heading": "组件的编写"
            },
            {
              "depth": 5,
              "value": "组件的导出",
              "heading": "组件的导出"
            },
            {
              "depth": 5,
              "value": "组件示例的编写",
              "heading": "组件示例的编写"
            },
            {
              "depth": 5,
              "value": "组件文档的编写",
              "heading": "组件文档的编写"
            },
            {
              "depth": 2,
              "value": "代码风格及提交规范",
              "heading": "代码风格及提交规范"
            },
            {
              "depth": 5,
              "value": "vscode 插件",
              "heading": "vscode-插件"
            },
            {
              "depth": 5,
              "value": "代码检查与格式化",
              "heading": "代码检查与格式化"
            },
            {
              "depth": 5,
              "value": "git 提交",
              "heading": "git-提交"
            },
            {
              "depth": 2,
              "value": "调试与发布",
              "heading": "调试与发布"
            },
            {
              "depth": 5,
              "value": "在测试项目中调试",
              "heading": "在测试项目中调试"
            },
            {
              "depth": 5,
              "value": "发布项目",
              "heading": "发布项目"
            }
          ],
          "title": "pcloud-components"
        },
        "title": "pcloud-components"
      },
      {
        "path": "/components/advanced-filter",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/AdvancedFilter/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/AdvancedFilter/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "AdvancedFilter",
          "title": "AdvancedFilter",
          "description": "高级搜索组件",
          "tocDepth": 2,
          "nav": {
            "title": "组件",
            "path": "/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/components/advanced-filter"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "基础使用",
              "heading": "基础使用"
            },
            {
              "depth": 2,
              "value": "自定义两侧渲染区",
              "heading": "自定义两侧渲染区"
            },
            {
              "depth": 2,
              "value": "自定义筛选项",
              "heading": "自定义筛选项"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "FormItem",
              "heading": "formitem"
            },
            {
              "depth": 3,
              "value": "InputProps",
              "heading": "inputprops"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "AdvancedFilter - @pointcloud/pcloud-components"
      },
      {
        "path": "/components/config-provider",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/ConfigProvider/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/ConfigProvider/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "ConfigProvider",
          "title": "ConfigProvider",
          "tocDepth": 2,
          "nav": {
            "title": "组件",
            "path": "/components"
          },
          "group": {
            "title": "其他",
            "__fallback": true,
            "path": "/components/config-provider"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "ConfigProvider 全局化配置",
              "heading": "configprovider-全局化配置"
            },
            {
              "depth": 2,
              "value": "使用",
              "heading": "使用"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "locale": "zh-CN"
        },
        "title": "ConfigProvider - @pointcloud/pcloud-components"
      },
      {
        "path": "/components/dcascader",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/DCascader/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/DCascader/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "DCascader",
          "title": "DCascader",
          "description": "基于 antd 4.24.10 Cascader 的二次封装组件",
          "tocDepth": 2,
          "nav": {
            "title": "组件",
            "path": "/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/components/dcascader"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "组件特性",
              "heading": "组件特性"
            },
            {
              "depth": 2,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "动态加载子级列表",
              "heading": "动态加载子级列表"
            },
            {
              "depth": 2,
              "value": "显示加载中",
              "heading": "显示加载中"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "DCascader - @pointcloud/pcloud-components"
      },
      {
        "path": "/components/dform",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/DForm/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/DForm/index.zh-CN.md",
          "updatedTime": 1689315267000,
          "componentName": "DForm",
          "title": "DForm",
          "description": "基于 antd 4.24.10 Form 的二次封装组件",
          "tocDepth": 2,
          "nav": {
            "title": "组件",
            "path": "/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/components/dform"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "组件特性",
              "heading": "组件特性"
            },
            {
              "depth": 2,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "内置组件",
              "heading": "内置组件"
            },
            {
              "depth": 2,
              "value": "自定义表单项渲染类型",
              "heading": "自定义表单项渲染类型"
            },
            {
              "depth": 2,
              "value": "设置表单项",
              "heading": "设置表单项"
            },
            {
              "depth": 2,
              "value": "表单项默认值",
              "heading": "表单项默认值"
            },
            {
              "depth": 2,
              "value": "布局方式",
              "heading": "布局方式"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "DForm - @pointcloud/pcloud-components"
      },
      {
        "path": "/components/dinput",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/DInput/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/DInput/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "DInput",
          "title": "DInput",
          "description": "基于 antd 4.24.10 Input 的二次封装组件",
          "tocDepth": 2,
          "nav": {
            "title": "组件",
            "path": "/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/components/dinput"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "组件特性",
              "heading": "组件特性"
            },
            {
              "depth": 2,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "启用合成输入",
              "heading": "启用合成输入"
            },
            {
              "depth": 2,
              "value": "启用输入防抖",
              "heading": "启用输入防抖"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "DInput - @pointcloud/pcloud-components"
      },
      {
        "path": "/components/dselect",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/DSelect/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/DSelect/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "DSelect",
          "title": "DSelect",
          "description": "基于 antd 4.24.10 Select 的二次封装组件",
          "tocDepth": 2,
          "nav": {
            "title": "组件",
            "path": "/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/components/dselect"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "组件特性",
              "heading": "组件特性"
            },
            {
              "depth": 2,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "远程搜索",
              "heading": "远程搜索"
            },
            {
              "depth": 2,
              "value": "搜索时防抖",
              "heading": "搜索时防抖"
            },
            {
              "depth": 2,
              "value": "显示加载中",
              "heading": "显示加载中"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "DSelect - @pointcloud/pcloud-components"
      },
      {
        "path": "/components/dtable",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/DTable/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/DTable/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "DTable",
          "title": "DTable",
          "description": "基于 antd 4.24.10 Table 的二次封装组件",
          "tocDepth": 2,
          "nav": {
            "title": "组件",
            "path": "/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/components/dtable"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "组件特性",
              "heading": "组件特性"
            },
            {
              "depth": 2,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "统一设置列配置",
              "heading": "统一设置列配置"
            },
            {
              "depth": 2,
              "value": "添加操作列",
              "heading": "添加操作列"
            },
            {
              "depth": 2,
              "value": "指定额外的请求参数",
              "heading": "指定额外的请求参数"
            },
            {
              "depth": 2,
              "value": "显示错误信息",
              "heading": "显示错误信息"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "DTable - @pointcloud/pcloud-components"
      },
      {
        "path": "/components/dtree-select",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/DTreeSelect/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/DTreeSelect/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "DTreeSelect",
          "title": "DTreeSelect",
          "description": "基于 antd 4.24.10 TreeSelect 的二次封装组件",
          "tocDepth": 2,
          "nav": {
            "title": "组件",
            "path": "/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/components/dtree-select"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "组件特性",
              "heading": "组件特性"
            },
            {
              "depth": 2,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "动态加载子级列表",
              "heading": "动态加载子级列表"
            },
            {
              "depth": 2,
              "value": "显示加载中",
              "heading": "显示加载中"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "DTreeSelect - @pointcloud/pcloud-components"
      },
      {
        "path": "/components/dupload",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/DUpload/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/DUpload/index.zh-CN.md",
          "updatedTime": 1689315267000,
          "componentName": "DUpload",
          "title": "Upload",
          "description": "基于 antd 4.24.10 Upload 的二次封装组件",
          "tocDepth": 2,
          "nav": {
            "title": "组件",
            "path": "/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/components/dupload"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "组件特性",
              "heading": "组件特性"
            },
            {
              "depth": 2,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "表单中使用",
              "heading": "表单中使用"
            },
            {
              "depth": 2,
              "value": "生成缩略图",
              "heading": "生成缩略图"
            },
            {
              "depth": 2,
              "value": "自定义上传及删除",
              "heading": "自定义上传及删除"
            },
            {
              "depth": 2,
              "value": "图像下载及预览",
              "heading": "图像下载及预览"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "DUploadFile",
              "heading": "duploadfile"
            },
            {
              "depth": 3,
              "value": "ThumbOptionProps",
              "heading": "thumboptionprops"
            },
            {
              "depth": 3,
              "value": "DUpload.imageToBase64 方法",
              "heading": "duploadimagetobase64-方法"
            },
            {
              "depth": 5,
              "value": "声明格式",
              "heading": "声明格式"
            },
            {
              "depth": 5,
              "value": "用法示例",
              "heading": "用法示例"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "Upload - @pointcloud/pcloud-components"
      },
      {
        "path": "/components/error-boundary",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/ErrorBoundary/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/ErrorBoundary/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "ErrorBoundary",
          "title": "ErrorBoundary",
          "nav": {
            "title": "组件",
            "path": "/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/components/error-boundary"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "基础使用",
              "heading": "基础使用"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "ErrorBoundary - @pointcloud/pcloud-components"
      },
      {
        "path": "/components/lmodal",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/LModal/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/LModal/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "LModal",
          "title": "LModal",
          "nav": {
            "title": "组件",
            "path": "/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/components/lmodal"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "全局弹框",
              "heading": "全局弹框"
            },
            {
              "depth": 2,
              "value": "相对弹框",
              "heading": "相对弹框"
            },
            {
              "depth": 2,
              "value": "弹框大小",
              "heading": "弹框大小"
            },
            {
              "depth": 2,
              "value": "弹框自定义显示内容",
              "heading": "弹框自定义显示内容"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "LModal - @pointcloud/pcloud-components"
      },
      {
        "path": "/components/label-value",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/LabelValue/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/LabelValue/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "LabelValue",
          "title": "LabelValue",
          "nav": {
            "title": "组件",
            "path": "/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/components/label-value"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "基础使用",
              "heading": "基础使用"
            },
            {
              "depth": 2,
              "value": "省略冒号",
              "heading": "省略冒号"
            },
            {
              "depth": 2,
              "value": "空值",
              "heading": "空值"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "LabelValue - @pointcloud/pcloud-components"
      },
      {
        "path": "/components/loading",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/Loading/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/Loading/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "Loading",
          "title": "Loading",
          "nav": {
            "title": "组件",
            "path": "/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/components/loading"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "单例 Loading",
              "heading": "单例-loading"
            },
            {
              "depth": 2,
              "value": "使用",
              "heading": "使用"
            },
            {
              "depth": 2,
              "value": "自定义内容",
              "heading": "自定义内容"
            },
            {
              "depth": 2,
              "value": "指定挂载位置",
              "heading": "指定挂载位置"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "Loading - @pointcloud/pcloud-components"
      },
      {
        "path": "/components/no-data",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/NoData/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/NoData/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "NoData",
          "title": "NoData",
          "nav": {
            "title": "组件",
            "path": "/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/components/no-data"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "使用",
              "heading": "使用"
            },
            {
              "depth": 2,
              "value": "自定义空文本描述",
              "heading": "自定义空文本描述"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "NoData - @pointcloud/pcloud-components"
      },
      {
        "path": "/zh-CN/guide",
        "component": require('/Users/stone/Documents/develop/pcloud-components/docs/guide.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/guide.zh-CN.md",
          "updatedTime": 1689068653000,
          "title": "简介",
          "nav": {
            "title": "指南",
            "order": 1
          },
          "group": {
            "title": "介绍",
            "order": -1,
            "__fallback": true,
            "path": "/zh-CN"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "这是什么?",
              "heading": "这是什么"
            },
            {
              "depth": 2,
              "value": "问题反馈",
              "heading": "问题反馈"
            }
          ],
          "locale": "zh-CN"
        },
        "title": "简介 - @pointcloud/pcloud-components"
      },
      {
        "path": "/zh-CN",
        "component": require('/Users/stone/Documents/develop/pcloud-components/docs/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.zh-CN.md",
          "updatedTime": 1689068653000,
          "hero": {
            "title": "pcloud-components"
          },
          "slugs": [],
          "locale": "zh-CN",
          "title": "Index"
        },
        "title": "Index - @pointcloud/pcloud-components"
      },
      {
        "path": "/zh-CN/components",
        "component": require('/Users/stone/Documents/develop/pcloud-components/docs/components/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/components/index.zh-CN.md",
          "updatedTime": 1689068653000,
          "title": "组件概览",
          "apiHeader": false,
          "nav": {
            "title": "组件",
            "order": 4
          },
          "slugs": [
            {
              "depth": 1,
              "value": "组件概览",
              "heading": "组件概览"
            },
            {
              "depth": 2,
              "value": "使用",
              "heading": "使用"
            }
          ],
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/components",
            "title": "组件"
          }
        },
        "title": "组件概览 - @pointcloud/pcloud-components"
      },
      {
        "path": "/zh-CN/components/advanced-filter",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/AdvancedFilter/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/AdvancedFilter/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "AdvancedFilter",
          "title": "AdvancedFilter",
          "description": "高级搜索组件",
          "tocDepth": 2,
          "nav": {
            "title": "组件",
            "path": "/zh-CN/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/zh-CN/components/advanced-filter"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "基础使用",
              "heading": "基础使用"
            },
            {
              "depth": 2,
              "value": "自定义两侧渲染区",
              "heading": "自定义两侧渲染区"
            },
            {
              "depth": 2,
              "value": "自定义筛选项",
              "heading": "自定义筛选项"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "FormItem",
              "heading": "formitem"
            },
            {
              "depth": 3,
              "value": "InputProps",
              "heading": "inputprops"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "AdvancedFilter - @pointcloud/pcloud-components"
      },
      {
        "path": "/zh-CN/components/config-provider",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/ConfigProvider/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/ConfigProvider/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "ConfigProvider",
          "title": "ConfigProvider",
          "tocDepth": 2,
          "nav": {
            "title": "组件",
            "path": "/zh-CN/components"
          },
          "group": {
            "title": "其他",
            "__fallback": true,
            "path": "/zh-CN/components/config-provider"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "ConfigProvider 全局化配置",
              "heading": "configprovider-全局化配置"
            },
            {
              "depth": 2,
              "value": "使用",
              "heading": "使用"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "locale": "zh-CN"
        },
        "title": "ConfigProvider - @pointcloud/pcloud-components"
      },
      {
        "path": "/zh-CN/components/dcascader",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/DCascader/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/DCascader/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "DCascader",
          "title": "DCascader",
          "description": "基于 antd 4.24.10 Cascader 的二次封装组件",
          "tocDepth": 2,
          "nav": {
            "title": "组件",
            "path": "/zh-CN/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/zh-CN/components/dcascader"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "组件特性",
              "heading": "组件特性"
            },
            {
              "depth": 2,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "动态加载子级列表",
              "heading": "动态加载子级列表"
            },
            {
              "depth": 2,
              "value": "显示加载中",
              "heading": "显示加载中"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "DCascader - @pointcloud/pcloud-components"
      },
      {
        "path": "/zh-CN/components/dform",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/DForm/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/DForm/index.zh-CN.md",
          "updatedTime": 1689315267000,
          "componentName": "DForm",
          "title": "DForm",
          "description": "基于 antd 4.24.10 Form 的二次封装组件",
          "tocDepth": 2,
          "nav": {
            "title": "组件",
            "path": "/zh-CN/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/zh-CN/components/dform"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "组件特性",
              "heading": "组件特性"
            },
            {
              "depth": 2,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "内置组件",
              "heading": "内置组件"
            },
            {
              "depth": 2,
              "value": "自定义表单项渲染类型",
              "heading": "自定义表单项渲染类型"
            },
            {
              "depth": 2,
              "value": "设置表单项",
              "heading": "设置表单项"
            },
            {
              "depth": 2,
              "value": "表单项默认值",
              "heading": "表单项默认值"
            },
            {
              "depth": 2,
              "value": "布局方式",
              "heading": "布局方式"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "DForm - @pointcloud/pcloud-components"
      },
      {
        "path": "/zh-CN/components/dinput",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/DInput/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/DInput/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "DInput",
          "title": "DInput",
          "description": "基于 antd 4.24.10 Input 的二次封装组件",
          "tocDepth": 2,
          "nav": {
            "title": "组件",
            "path": "/zh-CN/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/zh-CN/components/dinput"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "组件特性",
              "heading": "组件特性"
            },
            {
              "depth": 2,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "启用合成输入",
              "heading": "启用合成输入"
            },
            {
              "depth": 2,
              "value": "启用输入防抖",
              "heading": "启用输入防抖"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "DInput - @pointcloud/pcloud-components"
      },
      {
        "path": "/zh-CN/components/dselect",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/DSelect/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/DSelect/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "DSelect",
          "title": "DSelect",
          "description": "基于 antd 4.24.10 Select 的二次封装组件",
          "tocDepth": 2,
          "nav": {
            "title": "组件",
            "path": "/zh-CN/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/zh-CN/components/dselect"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "组件特性",
              "heading": "组件特性"
            },
            {
              "depth": 2,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "远程搜索",
              "heading": "远程搜索"
            },
            {
              "depth": 2,
              "value": "搜索时防抖",
              "heading": "搜索时防抖"
            },
            {
              "depth": 2,
              "value": "显示加载中",
              "heading": "显示加载中"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "DSelect - @pointcloud/pcloud-components"
      },
      {
        "path": "/zh-CN/components/dtable",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/DTable/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/DTable/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "DTable",
          "title": "DTable",
          "description": "基于 antd 4.24.10 Table 的二次封装组件",
          "tocDepth": 2,
          "nav": {
            "title": "组件",
            "path": "/zh-CN/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/zh-CN/components/dtable"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "组件特性",
              "heading": "组件特性"
            },
            {
              "depth": 2,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "统一设置列配置",
              "heading": "统一设置列配置"
            },
            {
              "depth": 2,
              "value": "添加操作列",
              "heading": "添加操作列"
            },
            {
              "depth": 2,
              "value": "指定额外的请求参数",
              "heading": "指定额外的请求参数"
            },
            {
              "depth": 2,
              "value": "显示错误信息",
              "heading": "显示错误信息"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "DTable - @pointcloud/pcloud-components"
      },
      {
        "path": "/zh-CN/components/dtree-select",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/DTreeSelect/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/DTreeSelect/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "DTreeSelect",
          "title": "DTreeSelect",
          "description": "基于 antd 4.24.10 TreeSelect 的二次封装组件",
          "tocDepth": 2,
          "nav": {
            "title": "组件",
            "path": "/zh-CN/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/zh-CN/components/dtree-select"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "组件特性",
              "heading": "组件特性"
            },
            {
              "depth": 2,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "动态加载子级列表",
              "heading": "动态加载子级列表"
            },
            {
              "depth": 2,
              "value": "显示加载中",
              "heading": "显示加载中"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "DTreeSelect - @pointcloud/pcloud-components"
      },
      {
        "path": "/zh-CN/components/dupload",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/DUpload/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/DUpload/index.zh-CN.md",
          "updatedTime": 1689315267000,
          "componentName": "DUpload",
          "title": "Upload",
          "description": "基于 antd 4.24.10 Upload 的二次封装组件",
          "tocDepth": 2,
          "nav": {
            "title": "组件",
            "path": "/zh-CN/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/zh-CN/components/dupload"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "组件特性",
              "heading": "组件特性"
            },
            {
              "depth": 2,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "表单中使用",
              "heading": "表单中使用"
            },
            {
              "depth": 2,
              "value": "生成缩略图",
              "heading": "生成缩略图"
            },
            {
              "depth": 2,
              "value": "自定义上传及删除",
              "heading": "自定义上传及删除"
            },
            {
              "depth": 2,
              "value": "图像下载及预览",
              "heading": "图像下载及预览"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "DUploadFile",
              "heading": "duploadfile"
            },
            {
              "depth": 3,
              "value": "ThumbOptionProps",
              "heading": "thumboptionprops"
            },
            {
              "depth": 3,
              "value": "DUpload.imageToBase64 方法",
              "heading": "duploadimagetobase64-方法"
            },
            {
              "depth": 5,
              "value": "声明格式",
              "heading": "声明格式"
            },
            {
              "depth": 5,
              "value": "用法示例",
              "heading": "用法示例"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "Upload - @pointcloud/pcloud-components"
      },
      {
        "path": "/zh-CN/components/error-boundary",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/ErrorBoundary/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/ErrorBoundary/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "ErrorBoundary",
          "title": "ErrorBoundary",
          "nav": {
            "title": "组件",
            "path": "/zh-CN/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/zh-CN/components/error-boundary"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "基础使用",
              "heading": "基础使用"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "ErrorBoundary - @pointcloud/pcloud-components"
      },
      {
        "path": "/zh-CN/components/lmodal",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/LModal/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/LModal/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "LModal",
          "title": "LModal",
          "nav": {
            "title": "组件",
            "path": "/zh-CN/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/zh-CN/components/lmodal"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "全局弹框",
              "heading": "全局弹框"
            },
            {
              "depth": 2,
              "value": "相对弹框",
              "heading": "相对弹框"
            },
            {
              "depth": 2,
              "value": "弹框大小",
              "heading": "弹框大小"
            },
            {
              "depth": 2,
              "value": "弹框自定义显示内容",
              "heading": "弹框自定义显示内容"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "LModal - @pointcloud/pcloud-components"
      },
      {
        "path": "/zh-CN/components/label-value",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/LabelValue/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/LabelValue/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "LabelValue",
          "title": "LabelValue",
          "nav": {
            "title": "组件",
            "path": "/zh-CN/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/zh-CN/components/label-value"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "基础使用",
              "heading": "基础使用"
            },
            {
              "depth": 2,
              "value": "省略冒号",
              "heading": "省略冒号"
            },
            {
              "depth": 2,
              "value": "空值",
              "heading": "空值"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "LabelValue - @pointcloud/pcloud-components"
      },
      {
        "path": "/zh-CN/components/loading",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/Loading/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/Loading/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "Loading",
          "title": "Loading",
          "nav": {
            "title": "组件",
            "path": "/zh-CN/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/zh-CN/components/loading"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "单例 Loading",
              "heading": "单例-loading"
            },
            {
              "depth": 2,
              "value": "使用",
              "heading": "使用"
            },
            {
              "depth": 2,
              "value": "自定义内容",
              "heading": "自定义内容"
            },
            {
              "depth": 2,
              "value": "指定挂载位置",
              "heading": "指定挂载位置"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "Loading - @pointcloud/pcloud-components"
      },
      {
        "path": "/zh-CN/components/no-data",
        "component": require('/Users/stone/Documents/develop/pcloud-components/src/NoData/index.zh-CN.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/NoData/index.zh-CN.md",
          "updatedTime": 1689130882000,
          "componentName": "NoData",
          "title": "NoData",
          "nav": {
            "title": "组件",
            "path": "/zh-CN/components"
          },
          "group": {
            "title": "业务组件",
            "__fallback": true,
            "path": "/zh-CN/components/no-data"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "使用",
              "heading": "使用"
            },
            {
              "depth": 2,
              "value": "自定义空文本描述",
              "heading": "自定义空文本描述"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "NoData - @pointcloud/pcloud-components"
      },
      {
        "path": "/components",
        "meta": {},
        "exact": true,
        "redirect": "/components/advanced-filter"
      }
    ],
    "title": "@pointcloud/pcloud-components",
    "component": (props) => props.children
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
