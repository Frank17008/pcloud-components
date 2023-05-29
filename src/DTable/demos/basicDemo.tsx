/**
 * description: 基础用法：设置loadMore属性即可自动加载表格数据，分页变化时会自动调用该函数，如果在外部监听了分页的onChange事件，则不会触发loadMore，但如果外部onChange返回值为undefined则正常触loadMore
 */
import React from 'react';
import { DTable, DTableProps } from '@pointcloud/pui-components';

export default function basicDemo() {
  const columns: DTableProps['columns'] = [
    { dataIndex: 'id', title: 'id' },
    { dataIndex: 'name', title: '标题' },
    { dataIndex: 'date', title: '时间' },
    { dataIndex: 'desc', title: '描述' },
  ];
  const loadMore = (params) => {
    const { current = 1, size = 10, type = 1 } = params;
    let total = 75;
    const records: any[] = [];
    for (let i = (current - 1) * size; i < current * size; i++) {
      if (i >= total) break;
      records.push({
        id: i,
        name: '数据' + (i + 1),
        date: '2023-05-' + (type < 10 ? '0' + type : type) + ' 12:00:00',
        desc: '测试数据' + (i + 1),
      });
    }
    return Promise.resolve({ total, records });
  };
  return (
    <div style={{ height: 400 }}>
      <DTable style={{ height: '100%' }} columns={columns} loadMore={loadMore} />
    </div>
  );
}
