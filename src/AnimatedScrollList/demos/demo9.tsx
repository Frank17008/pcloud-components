import React from 'react';
import { AnimatedScrollList } from '@pointcloud/pcloud-components';

const headerStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
  padding: '12px 16px',
  fontWeight: 600,
  fontSize: 14,
  color: '#1f1f1f',
  backgroundColor: '#f7f8fa',
  border: '1px solid #e5e6eb',
};

const rowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
  padding: '12px 16px',
  fontSize: 14,
  color: '#1f1f1f',
  borderBottom: '1px solid #f0f0f0',
};

export default function Demo() {
  const data = [
    { id: 'task-1', service: '订单服务', status: '运行中', updatedAt: '10:21:35' },
    { id: 'task-2', service: '支付服务', status: '延迟', updatedAt: '10:20:11' },
    { id: 'task-3', service: '库存服务', status: '运行中', updatedAt: '10:18:02' },
    { id: 'task-4', service: '搜索服务', status: '运行中', updatedAt: '10:15:27' },
    { id: 'task-5', service: '推荐服务', status: '运行中', updatedAt: '10:12:44' },
    { id: 'task-6', service: '用户画像', status: '告警', updatedAt: '10:11:03' },
  ];

  const hanldeClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, item: any) => {
    e.stopPropagation();
    console.log('删除', item);
  };

  return (
    <div style={{ width: 520, padding: 16, backgroundColor: '#fff', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
      <AnimatedScrollList
        header={
          <div style={headerStyle}>
            <span>服务模块</span>
            <span>当前状态</span>
            <span>更新时间</span>
            <span>操作</span>
          </div>
        }
        containerHeight={240}
        data={data}
        direction="up"
        speed={60}
        style={{
          border: '1px solid #e5e6eb',
          backgroundColor: '#fff',
        }}
        renderItem={(item) => (
          <div style={rowStyle}>
            <span>{item.service}</span>
            <span style={{ color: item.status === '运行中' ? '#00b578' : item.status === '延迟' ? '#faad14' : '#f53f3f' }}>{item.status}</span>
            <span style={{ color: '#86909c' }}>{item.updatedAt}</span>
            <span style={{ color: '#ff0000', cursor: 'pointer' }} onClick={(e) => hanldeClick(e, item)}>
              删除
            </span>
          </div>
        )}
      />
    </div>
  );
}
