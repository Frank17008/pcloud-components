/**
 * description: actionColumn可以在列的最后添加一列操作列，可以是一个column对象，也可以是一个column render函数,该列默认拥有{ width:140, title:'操作', dataIndex:'action' }属性
 */
import React, { useState } from 'react';
import { Button, Radio } from 'antd';

import { DTable, DTableProps } from '@pointcloud/pcloud-components';

export default function ActionColumnDemo() {
  const [actionType, setActionType] = useState<'object' | 'render'>('object');

  const columns: DTableProps['columns'] = [
    { dataIndex: 'id', title: 'id' },
    { dataIndex: 'name', title: '标题' },
    { dataIndex: 'date', title: '时间' },
    { dataIndex: 'desc', title: '描述' },
  ];

  const onRadioChange = (e) => setActionType(e.target.value);

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

  const _actionColumn: DTableProps['actionColumn'] =
    actionType === 'object'
      ? { dataIndex: 'actionColumns', render: () => <Button>操作按钮</Button> }
      : (text, record) => (
          <Button
            type="link"
            onClick={() => {
              alert(JSON.stringify(record));
            }}
          >
            详情
          </Button>
        );

  return (
    <>
      <div style={{ marginBottom: '12px' }}>
        <span>列参数类型：</span>
        <Radio.Group value={actionType} onChange={onRadioChange}>
          <Radio value="object">默认</Radio>
          <Radio value="render">自定义渲染</Radio>
        </Radio.Group>
      </div>
      <DTable style={{ height: 400 }} columns={columns} loadMore={loadMore} actionColumn={_actionColumn} />
    </>
  );
}
