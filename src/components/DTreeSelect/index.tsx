/*
 * @Author       : wangfeihu
 * @Date         : 2023-05-22 10:38:17
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-06-30 16:24:47
 * @Description  : 基于antd的TreeSelect组件
 */

import React, { useRef, forwardRef, useState, useEffect, useMemo, useContext } from 'react';

import { TreeSelect, TreeSelectProps } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import { BaseSelectRef } from 'rc-select/lib/BaseSelect';

import { ConfigContext } from '@pointcloud/pcloud-components/components/ConfigProvider';

import './index.less';

export type DTreeSelectProps = Omit<TreeSelectProps, 'treeData' | 'loadData' | 'loading'> & {
  /** antd的treeData属性，可以是一个treeData数组，或一个返回等价treeData数组的promise */
  // eslint-disable-next-line no-unused-vars
  treeData?: TreeSelectProps['treeData'] | ((node?: DefaultOptionType) => Promise<TreeSelectProps['treeData']>);
  /** antd的loadData属性，动态加载子级列表数据,默认使用treeData所提供的方法，如果传入null，则表示不进行动态加载,该方法要求返回一个treeData数组或与其等价的Promise */
  // eslint-disable-next-line no-unused-vars
  loadData?: ((node?: DefaultOptionType) => Promise<TreeSelectProps['treeData']>) | null;
  /** 等同antd的loadData属性,用于监听loadData事件*/
  // eslint-disable-next-line no-unused-vars
  onLoadData?: (node?: DefaultOptionType) => void;
  /** antd的loading属性，是否显示加载中：传入数字表示延迟加载,单位毫秒，0等同于false */
  loading?: boolean | number;
};

// eslint-disable-next-line no-unused-vars
function deepFind(node: Array<any> | any, fn: (node: any, index: number) => boolean, childrenName: string = 'children') {
  if (fn instanceof Function) {
    const treelist = node instanceof Array ? node : [node];
    for (let i = 0; i < treelist.length; i++) {
      if (fn(treelist[i], i)) {
        return treelist[i];
      } else {
        const target: any = deepFind(treelist[i][childrenName] || [], fn, childrenName);
        if (target) return target;
      }
    }
  } else {
    return undefined;
  }
}

// 获取延时时间，默认800ms，true代表默认时间,false代表0
function getDelayTime(value?: boolean | number, defaultValue = 800) {
  if (value === true) {
    return defaultValue;
  } else if (value === false) {
    return 0;
  } else {
    return typeof value === 'number' ? Number(value) || 0 : defaultValue;
  }
}

function InternalTreeSelect(props: DTreeSelectProps, ref: React.Ref<BaseSelectRef>) {
  const { className = '', popupClassName, treeData: initOptions, fieldNames, loadData, onLoadData, loading: initLoading, ...otherProps } = props;

  const { getPrefixCls }: any = useContext(ConfigContext);

  const [treeData, setTreeData] = useState<TreeSelectProps['treeData']>([]);
  const [loading, setLoading] = useState<boolean>(typeof initLoading === 'boolean' ? initLoading : true);

  const loadingParamsRef = useRef<any>(null); // 数据加载同步处理引用
  const loadingRef = useRef<{ timer: any; status: 'loading' | 'done' }>({
    timer: null,
    status: 'done',
  }); // treeData加载状态引用

  const _className = `${getPrefixCls('tree-select')} ${className}`;
  const _popupClassName = `${getPrefixCls('tree-select-dropdown')} ${popupClassName}`;

  const _fieldNames = { label: 'label', value: 'value', children: 'children', ...fieldNames };

  const _treeNodeFilterProp = _fieldNames.label;

  const _loadingState = getDelayTime(initLoading, 600); // loading: 默认600ms，false或0表示不开启

  const _loading = typeof initLoading === 'boolean' ? initLoading : loading;

  // 将外部传入的options转化为统一的异步请求方法
  const getOptionsFun = useMemo(
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    () => (typeof initOptions === 'function' ? initOptions : (params?: any): Promise<TreeSelectProps['treeData']> => Promise.resolve(initOptions || [])),
    [initOptions],
  );

  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const updateOptions = (fun: (params?: any) => Promise<TreeSelectProps['treeData']>, value?: string) => {
    // 设置加载中状态
    if (_loadingState > 0) {
      loadingRef.current.status = 'loading';
      loadingParamsRef.current = value;
      clearTimeout(loadingRef.current.timer);
      loadingRef.current.timer = setTimeout(() => {
        if (loadingRef.current.status === 'loading') setLoading(true);
      }, _loadingState);
    }
    // 发起请求
    fun?.(value)
      .then((response) => {
        if (loadingParamsRef.current === value) {
          setTreeData(response);
          setLoading(false);
          loadingRef.current.status = 'done';
        }
      })
      .catch(() => {
        if (loadingParamsRef.current === value) {
          setLoading(false);
          loadingRef.current.status = 'done';
        }
      });
  };

  const _loadData = (selectedOption) => {
    if (onLoadData) onLoadData(selectedOption);
    const _getOptions = typeof initOptions === 'function' ? initOptions : null;
    const loadFn = loadData === null ? loadData : loadData || _getOptions;
    if (typeof loadFn === 'function') {
      // 设置加载中状态
      if (_loadingState > 0) {
        loadingRef.current.status = 'loading';
        loadingParamsRef.current = loadingParamsRef.current ? loadingParamsRef.current + 1 : 1;
        clearTimeout(loadingRef.current.timer);
        loadingRef.current.timer = setTimeout(() => {
          if (loadingRef.current.status === 'loading') {
            setLoading(true);
          }
        }, _loadingState);
      }
      const loadFnPromise = loadFn(selectedOption);
      if (typeof loadFnPromise['then'] === 'function') {
        loadFnPromise
          .then((response) => {
            loadingParamsRef.current = loadingParamsRef.current ? loadingParamsRef.current - 1 : null;
            if (!loadingParamsRef.current) {
              setLoading(false);
              loadingRef.current.status = 'done';
            }
            const list = treeData || [];
            const node = deepFind(list, (item) => item[_fieldNames.value] === selectedOption[_fieldNames.value], _fieldNames.children);
            if (node) node[_fieldNames.children] = response;
            setTreeData([...list]);
          })
          .catch(() => {
            loadingParamsRef.current = loadingParamsRef.current ? loadingParamsRef.current - 1 : null;
            if (!loadingParamsRef.current) {
              setLoading(false);
              loadingRef.current.status = 'done';
            }
          });
      }
      return loadFnPromise;
    } else {
      return Promise.resolve();
    }
  };

  // 初始加载数据
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updateOptions(getOptionsFun), [getOptionsFun]);

  return (
    <TreeSelect
      {...otherProps}
      ref={ref}
      className={_className}
      popupClassName={_popupClassName}
      fieldNames={fieldNames}
      treeNodeFilterProp={_treeNodeFilterProp}
      treeData={treeData}
      loadData={_loadData}
      loading={_loading}
    />
  );
}

const DTreeSelect = forwardRef(InternalTreeSelect);
export default DTreeSelect;
