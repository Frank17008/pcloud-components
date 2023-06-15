/**
 * description: extraParams可以指定current和size以外的其他参数,当extraParams发生变化时，自动使用默认分页参数调用loadMore方法
 */
import React, { useState } from 'react';
import { Radio } from 'antd';

import { DTable, DTableProps } from '@pointcloud/pcloud-components';

export default function extraParamsDemo() {
  const [queryPrams, setQueryParams] = useState(1);

  const columns: DTableProps['columns'] = [
    { dataIndex: 'id', title: 'id' },
    { dataIndex: 'name', title: '标题' },
    { dataIndex: 'date', title: '时间' },
    { dataIndex: 'desc', title: '描述' },
    { dataIndex: 'type', title: '类别' },
  ];

  const onRadioChange = (e) => setQueryParams(e.target.value);

  const loadMore = (params): Promise<{ records: any[]; total: number }> => {
    const { current = 1, size = 10, type = 1 } = params;
    let total = type === 1 ? 75 : type === 2 ? 24 : 12;
    const records: any[] = [];
    for (let i = (current - 1) * size; i < current * size; i++) {
      if (i >= total) break;
      records.push({
        id: i,
        name: '数据' + (i + 1),
        date: '2023-05-' + (type < 10 ? '0' + type : type) + ' 12:00:00',
        desc: '测试数据' + (i + 1),
        type: '类别' + type,
      });
    }
    if (type === 1) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ total, records });
        }, 1200);
      });
    } else {
      return Promise.resolve({ total, records });
    }
  };
  return (
    <>
      <div style={{ marginBottom: '12px' }}>
        <Radio.Group value={queryPrams} onChange={onRadioChange}>
          <Radio value={1}>类别1</Radio>
          <Radio value={2}>类别2</Radio>
          <Radio value={3}>类别3</Radio>
        </Radio.Group>
      </div>
      <DTable
        style={{ height: 400 }}
        columns={columns}
        loadMore={loadMore}
        extraParams={{ type: queryPrams }}
      />
    </>
  );
}
