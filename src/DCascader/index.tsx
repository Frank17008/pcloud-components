/*
 * @Author       : wangfeihu
 * @Date         : 2023-05-18 13:35:38
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-06-30 16:19:18
 * @Description  : 基于antd的Cascader组件
 */
import React, { useRef, forwardRef, useState, useEffect, useMemo, useContext } from 'react';

import { Cascader } from 'antd';
import { DefaultOptionType, CascaderProps, CascaderRef } from 'antd/lib/cascader';

import { ConfigContext } from '@/ConfigProvider';

import './index.less';

export type DCascaderProps = Omit<CascaderProps<any>, 'options' | 'loadData' | 'loading'> & {
  /** antd的options属性，同onSearch属性，可以是一个options数组，或一个返回等价options数组的promise */
  // eslint-disable-next-line no-unused-vars
  options?:
    | DefaultOptionType[]
    | ((
        value?: string,
        option?: DefaultOptionType,
        options?: DefaultOptionType[],
      ) => Promise<DefaultOptionType[]>);
  /** antd的loadData属性，动态加载子级列表数据,默认使用options所提供的方法，如果传入null，则表示不进行动态加载,该方法要求返回一个options数组或与其等价的Promise */
  // eslint-disable-next-line no-unused-vars
  loadData?:
    | ((
        value?: string,
        option?: DefaultOptionType,
        options?: DefaultOptionType[],
      ) => Promise<DefaultOptionType[] | DefaultOptionType[]>)
    | null;
  /** 等同antd的loadData属性,用于监听antd loadData事件*/
  // eslint-disable-next-line no-unused-vars
  onLoadData?: (value?: string, option?: DefaultOptionType, options?: DefaultOptionType[]) => void;
  /** antd的loading属性，是否显示加载中：传入数字表示延迟加载,单位毫秒，0等同于false */
  loading?: boolean | number;
};

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

function updateDropDom(dSelectDropDom, timestamp) {
  const dSelectDom: HTMLElement | null = document.querySelector(`.d-cascader-${timestamp}`);
  const dSelectDropFirstMenu = dSelectDropDom.querySelector('ul.ant-cascader-menu');
  if (dSelectDom) {
    // 获取选择框宽度并恢复其初始样式
    dSelectDropDom.style.minWidth = `${dSelectDom.clientWidth}px`;
    dSelectDropFirstMenu.style.minWidth = `${dSelectDom.clientWidth}px`;
    // className && dSelectDom.setAttribute('class', className.replace(`d-cascader-${timestamp}`, ''));
    // dSelectDropDom.setAttribute('class', dSelectDropDom.className.replace(`d-cascader-dropdown-${timestamp}`, ''));
  }
}

function InternalCascader(props: DCascaderProps, ref: React.Ref<CascaderRef>) {
  const {
    className = '',
    popupClassName = '',
    fieldNames,
    options: initOptions,
    onChange,
    loadData,
    onLoadData,
    loading: initLoading,
    ...otherProps
  } = props;

  const { getPrefixCls }: any = useContext(ConfigContext);

  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const [loading, setLoading] = useState<boolean>(
    typeof initLoading === 'boolean' ? initLoading : true,
  );

  const loadingParamsRef = useRef<any>(null); // 数据加载同步处理引用
  const loadingRef = useRef<{ timer: any; status: 'loading' | 'done' }>({
    timer: null,
    status: 'done',
  }); // options加载状态引用
  const timestamp = new Date().getTime();

  const _className = `${getPrefixCls('cascader')} d-cascader-${timestamp} ${className}`;
  const _popupClassName = `${getPrefixCls(
    'cascader-dropdown',
  )} d-cascader-dropdown-${timestamp} ${popupClassName}`;

  const _fieldNames = { label: 'label', value: 'value', children: 'children', ...fieldNames };

  const _loadingState = getDelayTime(initLoading, 600); // loading: 默认600ms，false或0表示不开启

  const _loading = typeof initLoading === 'boolean' ? initLoading : loading;

  // 将外部传入的options转化为统一的异步请求方法
  const getOptionsFun = useMemo(
    () =>
      typeof initOptions === 'function'
        ? initOptions
        : (): Promise<DefaultOptionType[] | DefaultOptionType[]> =>
            Promise.resolve(initOptions || []),
    [initOptions],
  );

  const updateOptions = (
    // eslint-disable-next-line no-unused-vars
    fun: (
      value?: string,
      option?: DefaultOptionType,
      options?: DefaultOptionType[],
    ) => Promise<DefaultOptionType[] | DefaultOptionType[]>,
    value?: string,
  ) => {
    // 设置加载中状态
    if (_loadingState > 0) {
      loadingRef.current.status = 'loading';
      loadingParamsRef.current = value;
      clearTimeout(loadingRef.current.timer);
      loadingRef.current.timer = setTimeout(() => {
        if (loadingRef.current.status === 'loading') {
          setLoading(true);
        }
      }, _loadingState);
    }
    // 发起请求
    fun?.(value)
      .then((response) => {
        if (loadingParamsRef.current === value) {
          setOptions(response);
          setLoading(false);
          loadingParamsRef.current = null;
          loadingRef.current.status = 'done';
        }
      })
      .catch(() => {
        if (loadingParamsRef.current === value) {
          setLoading(false);
          loadingParamsRef.current = null;
          loadingRef.current.status = 'done';
        }
      });
  };

  const _loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    onLoadData?.(targetOption[_fieldNames.value], targetOption, selectedOptions);
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
      loadFn(targetOption[_fieldNames.value], targetOption, selectedOptions)
        .then((response) => {
          loadingParamsRef.current = loadingParamsRef.current ? loadingParamsRef.current - 1 : null;
          if (!loadingParamsRef.current) {
            setLoading(false);
            loadingRef.current.status = 'done';
          }
          targetOption[_fieldNames.children] = response;
          targetOption.loading = false;
          setOptions([...options]);
        })
        .catch(() => {
          loadingParamsRef.current = loadingParamsRef.current ? loadingParamsRef.current - 1 : null;
          if (!loadingParamsRef.current) {
            setLoading(false);
            loadingRef.current.status = 'done';
          }
          targetOption.loading = false;
          setOptions([...options]);
        });
    }
  };

  const _onChange = (value, selectedOptions) => onChange?.(value, selectedOptions);

  // 初始加载数据
  useEffect(() => updateOptions(getOptionsFun), [getOptionsFun]);

  // 操作dom设置下拉菜单样式,使下拉菜单宽度与选择框保持一致
  useEffect(() => {
    const dSelectDropDom: HTMLElement | null = document.querySelector(
      `.d-cascader-dropdown-${timestamp}`,
    );
    if (dSelectDropDom) {
      updateDropDom(dSelectDropDom, timestamp);
    } else {
      const observer = new MutationObserver((mutations) => {
        const { addedNodes } = mutations[0] || {};
        for (let i = 0; i < addedNodes.length; i++) {
          if (typeof addedNodes[i]['querySelector'] === 'function') {
            const dSelectDropDom: HTMLElement | null = addedNodes[i]['querySelector'](
              `.d-cascader-dropdown-${timestamp}`,
            );
            if (dSelectDropDom) {
              observer.disconnect();
              updateDropDom(dSelectDropDom, timestamp);
            }
          }
        }
      });

      observer.observe(document.body, { childList: true });

      return () => observer?.disconnect();
    }
  }, [timestamp]);

  return (
    <Cascader
      {...otherProps}
      ref={ref}
      fieldNames={_fieldNames}
      loadData={_loadData}
      className={_className}
      popupClassName={_popupClassName}
      options={options}
      loading={_loading}
      onChange={_onChange}
    />
  );
}

const DCascader = forwardRef(InternalCascader);
export default DCascader;
