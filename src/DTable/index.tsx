/*
 * @Author       : wangfeihu
 * @Date         : 2023-05-09 15:04:48
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-05-29 14:31:34
 * @Description  : 基于antd的Table组件
 */
import React, { forwardRef, useEffect, useRef, useState, useContext } from 'react';

import { message, PaginationProps, Table, TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';

import { ConfigContext } from '@/ConfigProvider';

import './index.less';

export type DTableSourceProps = {
  records: TableProps<any>['dataSource'];
  total: number;
  loading?: boolean;
};
type PrimeryObject = undefined | null | string | number | boolean | symbol | Function;
export type TableParamsProps = { current?: number; size?: number; [key: string]: any };

export type DTableProps = TableProps<any> & {
  /** 表格列的基础默认配置,默认所有列居中，表头文字超出显示省略号，详见 antd columns */
  columnsProp?: ColumnType<any>;
  /** 操作列配置,可以是一个普通列配置对象，也可以是一个columns的 render 函数 */
  actionColumn?: ColumnType<any> | ColumnType<any>['render'];
  /** 表格数据的加载函数,在表格创建、分页变化、额外参数变化时自动运行，如果设置该属性，则 dataSource 失效 */
  loadMore?: (params?: TableParamsProps) => Promise<DTableSourceProps>;
  /** 加载数据失败时是否显示错误信息（仅loadMore可用时生效） */
  showErrorMsg?: boolean | ((err: any) => string);
  /** 额外的请求参数,（仅loadMore可用时生效） */
  extraParams?: TableParamsProps;
};

// 分页器配置项
const defaultPagination: PaginationProps = {
  hideOnSinglePage: false,
  size: 'small',
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total) => (
    <div className="d-pagination-total">
      共<span> {total} </span>条
    </div>
  ),
};

function InternalTable(props: DTableProps, ref: React.Ref<HTMLDivElement>) {
  const {
    loadMore,
    columnsProp,
    actionColumn,
    showErrorMsg = true,
    extraParams,
    dataSource,
    rowKey = 'id',
    scroll,
    className,
    pagination,
    columns,
    loading,
    ...otherProps
  } = props;

  const { getPrefixCls }: any = useContext(ConfigContext);

  const loadingParamsRef = useRef<any>(null);

  const _tableSource = loadMore ? [] : dataSource || [];
  const [tableSource, setTableSource] = useState<DTableSourceProps>({
    total: _tableSource.length,
    loading: false,
    records: _tableSource,
  });

  const _pagination: DTableProps['pagination'] =
    pagination === false || pagination === null ? false : { ...defaultPagination, ...pagination };

  const [tableParams, setTableParams] = useState<{
    current: number;
    size: number;
    [key: string]: any;
  }>({ ...extraParams, ...getTablePage(_pagination) });

  // 默认垂直滚动高度为 calc(100% - 56px),其中56px为表格header高度，如需修改，需要自行覆盖styles中的相关样式
  const _scroll: DTableProps['scroll'] = scroll
    ? { y: 'calc(100% - 56px)', ...scroll }
    : { y: 'calc(100% - 56px)' };

  // 修改列对齐方式为居中
  const _columns: DTableProps['columns'] = columns?.map((item) => ({
    align: 'center',
    ellipsis: true,
    ...columnsProp,
    ...item,
  }));

  // 加入操作列
  const _actionColumn: DTableProps['actionColumn'] = actionColumn
    ? getActionColumnProps(actionColumn, columnsProp)
    : undefined;
  _actionColumn && (_columns?.push(_actionColumn) || []);

  // pcf-table 样式中已经包含对_scroll的支持
  const _className = `${getPrefixCls('table')} ${className || ''} ${
    _pagination ? 'height-on-page' : ''
  }`;

  // loading 默认延迟 600ms
  const _loading: DTableProps['loading'] =
    typeof loading === 'boolean'
      ? { spinning: loading, delay: 600 }
      : { delay: 600, spinning: false, ...loading };

  // 监听分页大小变化,如果外部也监听了onChange，则不会触发loadMore，但如果外部onChange返回值为undefined则正常触loadMore
  const onChange = (page: number, pageSize: number) => {
    if (_pagination && typeof _pagination?.onChange === 'function') {
      const data = _pagination.onChange(page, pageSize);
      if (data === undefined) loadData({ ...tableParams, current: page, size: pageSize });
    } else {
      loadData({ ...tableParams, current: page, size: pageSize });
    }
  };
  // 加载数据
  const loadData = (params?: TableParamsProps) => {
    if (typeof loadMore === 'function') {
      setTableSource({ ...tableSource, loading: true });
      const _tableQuery = { ...getTablePage(_pagination), ...params };
      const paramsString = JSON.stringify(_tableQuery);
      loadingParamsRef.current = paramsString;

      setTableParams(_tableQuery);
      loadMore(_tableQuery)
        .then((response) => {
          if (loadingParamsRef.current === paramsString) {
            const { total = 0, records = [] } = response;
            setTableSource({ total, records, loading: false });
          }
        })
        .catch((err) => {
          setTableSource({ ...tableSource, loading: false });
          if (showErrorMsg) {
            const errMsg = err?.response?.data?.msg || err?.msg || err?.message;
            message.error(
              typeof showErrorMsg === 'function' ? showErrorMsg(err) : `数据加载异常：${errMsg}`,
            );
          } else {
            throw err;
          }
        });
    } else if (dataSource) {
      const total = (_pagination && _pagination.total) || dataSource.length;
      setTableParams({ ...getTablePage(_pagination), ...params });
      setTableSource({ total, loading: false, records: dataSource });
    }
  };

  // 数据初始加载
  useEffect(() => loadData(extraParams), [dataSource, extraParams]);

  return (
    <Table
      {...otherProps}
      ref={ref}
      rowKey={rowKey}
      className={_className}
      columns={_columns}
      dataSource={tableSource.records}
      pagination={{
        ..._pagination,
        total: tableSource.total,
        current: tableParams.current,
        pageSize: tableParams.size,
        onChange,
      }}
      scroll={_scroll}
      loading={{ ..._loading, spinning: tableSource.loading }}
    />
  );
}

// 操作列
function getActionColumnProps(
  props: DTableProps['actionColumn'],
  columnsProp: DTableProps['columnsProp'],
) {
  const defaultProps = { width: 140, title: '操作', dataIndex: 'action' };
  if (typeof props === 'function') {
    return { ...columnsProp, ...defaultProps, render: props };
  } else {
    return { ...columnsProp, ...defaultProps, ...props };
  }
}

// 分页配置
function getTablePage(_pagination: DTableProps['pagination']) {
  const { current, defaultCurrent, pageSize, defaultPageSize } = _pagination || {};
  return { current: current || defaultCurrent || 1, size: pageSize || defaultPageSize || 10 };
}

const DTable = forwardRef(InternalTable);
export default DTable;
