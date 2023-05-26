/*
 * @Author       : wangfeihu
 * @Date         : 2023-05-22 10:38:17
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-05-26 17:51:19
 * @Description  : 基于antd的TreeSelect组件
 */

import React, { useRef, forwardRef, useState, useEffect, useMemo, useContext } from 'react';

import { TreeSelect, TreeSelectProps } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import { BaseSelectRef } from 'rc-select/lib/BaseSelect';

import { ConfigContext } from '@/ConfigProvider';

import './index.less';

export type DTreeSelectProps = Omit<TreeSelectProps, 'treeData' | 'loadData' | 'loading'> & {
  /** antd的treeData属性，可以是一个treeData数组，或一个返回等价treeData数组的promise */
  treeData?:
    | TreeSelectProps['treeData']
    | ((node?: DefaultOptionType) => Promise<TreeSelectProps['treeData']>);
  /** antd的loadData属性，动态加载子级列表数据,默认使用treeData所提供的方法，如果传入null，则表示不进行动态加载,该方法要求返回一个treeData数组或与其等价的Promise */
  loadData?: ((node?: DefaultOptionType) => Promise<TreeSelectProps['treeData']>) | null;
  /** 等同antd的loadData属性,用于监听loadData事件*/
  onLoadData?: (node?: DefaultOptionType) => void;
  /** antd的loading属性，是否显示加载中：传入数字表示延迟加载,单位毫秒，0等同于false */
  loading?: boolean | number;
};

/**
 *
 * loading相关代码
 */

function InternalTreeSelect(props: DTreeSelectProps, ref: React.Ref<BaseSelectRef>) {
  const {
    className = '',
    popupClassName,
    treeData: initOptions,
    fieldNames,
    treeNodeFilterProp,
    loadData,
    onLoadData,
    loading: initLoading,
    ...otherProps
  } = props;

  const { getPrefixCls }: any = useContext(ConfigContext);

  const [treeData, setTreeData] = useState<TreeSelectProps['treeData']>([]);
  const [loading, setLoading] = useState<boolean>(
    typeof initLoading === 'boolean' ? initLoading : true,
  );

  const loadingParamsRef = useRef<any>(null); // 数据加载同步处理引用
  const loadingRef = useRef<{ timer: any; status: 'loading' | 'done' }>({
    timer: null,
    status: 'done',
  }); // treeData加载状态引用

  const _className = `${getPrefixCls('tree-select')} ${className}`;
  const _popupClassName = `${getPrefixCls('tree-select-dropdown')} ${popupClassName}`;

  const _fieldNames = { label: 'label', value: 'value', children: 'children', ...fieldNames };

  const _treeNodeFilterProp = _fieldNames.label;

  const _loadingState = getDelayTime(loading, 600); // loading: 默认600ms，false或0表示不开启

  const _loading = typeof initLoading === 'boolean' ? initLoading : loading;

  // 将外部传入的options转化为统一的异步请求方法
  const getOptionsFun = useMemo(
    () =>
      typeof initOptions === 'function'
        ? initOptions
        : (params?: any): Promise<TreeSelectProps['treeData']> =>
            Promise.resolve(initOptions || []),
    [initOptions],
  );

  const updateOptions = (
    fun: (params?: any) => Promise<TreeSelectProps['treeData']>,
    value?: string,
  ) => {
    // 设置加载中状态
    if (_loadingState > 0) {
      loadingRef.current.status = 'loading';
      clearTimeout(loadingRef.current.timer);
      loadingRef.current.timer = setTimeout(() => {
        loadingRef.current.status === 'loading' && setLoading(true);
      }, _loadingState);
    }
    // 发起请求
    loadingParamsRef.current = value;
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
    onLoadData && onLoadData(selectedOption);
    const _getOptions = typeof initOptions === 'function' ? initOptions : null;
    const loadFn = loadData === null ? loadData : loadData || _getOptions;
    if (typeof loadFn === 'function') {
      const loadFnPromise = loadFn?.(selectedOption);
      if (typeof loadFnPromise['then'] === 'function') {
        loadFnPromise.then((response) => {
          const list = treeData || [];
          const node = deepFind(
            list,
            (item) => item[_fieldNames.value] === selectedOption[_fieldNames.value],
            _fieldNames.children,
          );
          node && (node[_fieldNames.children] = response);
          setTreeData([...list]);
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
      fieldNames={_fieldNames}
      treeNodeFilterProp={_treeNodeFilterProp}
      treeData={treeData}
      loadData={_loadData}
      loading={_loading}
    />
  );
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

function deepFind(
  node: Array<any> | any,
  fn: (node: any, index: number) => boolean,
  childrenName: string = 'children',
) {
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

const DTreeSelect = forwardRef(InternalTreeSelect);
export default DTreeSelect;
