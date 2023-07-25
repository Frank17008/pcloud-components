// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/stone/Documents/develop/pcloud-components/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'../dumi/layout')})],
    "component": ((props) => dynamic({
          loader: async () => {
            const React = await import('react');
            const { default: getDemoRenderArgs } = await import(/* webpackChunkName: 'dumi_demos' */ '/Users/stone/Documents/develop/pcloud-components/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
            const { default: Previewer } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi-theme-default/es/builtins/Previewer.js');
            const { usePrefersColor, context } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi/theme');

            return props => {
              
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
    
            }
          },
          loading: () => null,
        }))()
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'../dumi/layout')}), dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'/Users/stone/Documents/develop/pcloud-components/node_modules/dumi-theme-default/es/layout.js')})],
    "routes": [
      {
        "path": "/components/advanced-filter",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'AdvancedFilter__index.md' */'/Users/stone/Documents/develop/pcloud-components/src/AdvancedFilter/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "src/AdvancedFilter/index.md",
          "updatedTime": 1663828326000,
          "componentName": "AdvancedFilter",
          "title": "AdvancedFilter",
          "nav": {
            "title": "Components",
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
          "hasPreviewer": true
        },
        "title": "AdvancedFilter - pcloud-components"
      },
      {
        "path": "/components/config-provider",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'ConfigProvider__index.md' */'/Users/stone/Documents/develop/pcloud-components/src/ConfigProvider/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "src/ConfigProvider/index.md",
          "updatedTime": 1685599929000,
          "componentName": "ConfigProvider",
          "title": "ConfigProvider 全局配置",
          "nav": {
            "title": "Components",
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
          ]
        },
        "title": "ConfigProvider 全局配置 - pcloud-components"
      },
      {
        "path": "/components/dcascader",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'DCascader__index.md' */'/Users/stone/Documents/develop/pcloud-components/src/DCascader/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "src/DCascader/index.md",
          "updatedTime": 1685599929000,
          "componentName": "DCascader",
          "title": "DCascader",
          "nav": {
            "title": "Components",
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
              "value": "基本使用",
              "heading": "基本使用"
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
          "hasPreviewer": true
        },
        "title": "DCascader - pcloud-components"
      },
      {
        "path": "/components/dinput",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'DInput__index.md' */'/Users/stone/Documents/develop/pcloud-components/src/DInput/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "src/DInput/index.md",
          "updatedTime": 1685599929000,
          "componentName": "DInput",
          "title": "DInput",
          "nav": {
            "title": "Components",
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
              "value": "基本使用",
              "heading": "基本使用"
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
          "hasPreviewer": true
        },
        "title": "DInput - pcloud-components"
      },
      {
        "path": "/components/dselect",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'DSelect__index.md' */'/Users/stone/Documents/develop/pcloud-components/src/DSelect/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "src/DSelect/index.md",
          "updatedTime": 1685599929000,
          "componentName": "DSelect",
          "title": "DSelect",
          "nav": {
            "title": "Components",
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
              "value": "基本使用",
              "heading": "基本使用"
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
          "hasPreviewer": true
        },
        "title": "DSelect - pcloud-components"
      },
      {
        "path": "/components/dtable",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'DTable__index.md' */'/Users/stone/Documents/develop/pcloud-components/src/DTable/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "src/DTable/index.md",
          "updatedTime": 1685599929000,
          "componentName": "DTable",
          "title": "DTable",
          "nav": {
            "title": "Components",
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
              "value": "基本使用",
              "heading": "基本使用"
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
          "hasPreviewer": true
        },
        "title": "DTable - pcloud-components"
      },
      {
        "path": "/components/dtree-select",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'DTreeSelect__index.md' */'/Users/stone/Documents/develop/pcloud-components/src/DTreeSelect/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "src/DTreeSelect/index.md",
          "updatedTime": 1686729868000,
          "componentName": "DTreeSelect",
          "title": "DTreeSelect",
          "nav": {
            "title": "Components",
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
              "value": "基本使用",
              "heading": "基本使用"
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
          "hasPreviewer": true
        },
        "title": "DTreeSelect - pcloud-components"
      },
      {
        "path": "/components/error-boundary",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'ErrorBoundary__index.md' */'/Users/stone/Documents/develop/pcloud-components/src/ErrorBoundary/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "src/ErrorBoundary/index.md",
          "updatedTime": 1685599929000,
          "componentName": "ErrorBoundary",
          "title": "ErrorBoundary",
          "nav": {
            "title": "Components",
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
          "hasPreviewer": true
        },
        "title": "ErrorBoundary - pcloud-components"
      },
      {
        "path": "/components/lmodal",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'LModal__index.md' */'/Users/stone/Documents/develop/pcloud-components/src/LModal/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "src/LModal/index.md",
          "updatedTime": 1686634386000,
          "componentName": "LModal",
          "title": "LModal",
          "nav": {
            "title": "Components",
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
          "hasPreviewer": true
        },
        "title": "LModal - pcloud-components"
      },
      {
        "path": "/components/label-value",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'LabelValue__index.md' */'/Users/stone/Documents/develop/pcloud-components/src/LabelValue/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "src/LabelValue/index.md",
          "updatedTime": 1664272140000,
          "componentName": "LabelValue",
          "title": "LabelValue",
          "nav": {
            "title": "Components",
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
          "hasPreviewer": true
        },
        "title": "LabelValue - pcloud-components"
      },
      {
        "path": "/components/loading",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'Loading__index.md' */'/Users/stone/Documents/develop/pcloud-components/src/Loading/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "src/Loading/index.md",
          "updatedTime": 1686710369000,
          "componentName": "Loading",
          "title": "Loading",
          "nav": {
            "title": "Components",
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
          "hasPreviewer": true
        },
        "title": "Loading - pcloud-components"
      },
      {
        "path": "/components/no-data",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'NoData__index.md' */'/Users/stone/Documents/develop/pcloud-components/src/NoData/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "src/NoData/index.md",
          "updatedTime": 1664437191000,
          "componentName": "NoData",
          "title": "NoData",
          "nav": {
            "title": "Components",
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
          "hasPreviewer": true
        },
        "title": "NoData - pcloud-components"
      },
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__index.md' */'/Users/stone/Documents/develop/pcloud-components/docs/index.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1685599929000,
          "hero": {
            "title": "pcloud-components",
            "desc": "<div class=\"markdown\"><p>基于Antd封装的轻量级React业务组件库</p></div>",
            "actions": [
              {
                "text": "Getting Started",
                "link": "/components"
              }
            ]
          },
          "features": [
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png",
              "title": "开箱即用",
              "desc": "<div class=\"markdown\"><p>简单易用，降低使用者的代码量</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/antfincdn/Eb8IHpb9jE/Typescript_logo_2020.svg",
              "title": "TypeScript",
              "desc": "<div class=\"markdown\"><p>使用 TypeScript 开发，提供完整的类型定义文件</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
              "title": "简单易用",
              "desc": "<div class=\"markdown\"><p>基于AntDesign二次封装,提供了大量的业务型组件</p></div>"
            }
          ],
          "footer": "<div class=\"markdown\"><p>Open-source MIT Licensed | Copyright PointCloud © 2020</p></div>",
          "slugs": [
            {
              "depth": 2,
              "value": "Hello pcloud-components!",
              "heading": "hello-pcloud-components"
            }
          ],
          "title": "Hello pcloud-components!"
        },
        "title": "Hello pcloud-components! - pcloud-components"
      },
      {
        "path": "/components",
        "meta": {},
        "exact": true,
        "redirect": "/components/advanced-filter"
      }
    ],
    "title": "pcloud-components",
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
