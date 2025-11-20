import React, { useEffect, useMemo, useState } from 'react';
import { Radio, Space } from 'antd';
import { AnimatedScrollList } from '@pointcloud/pcloud-components';

interface ServiceItem {
  id: string;
  service: string;
  status: '运行中' | '延迟' | '告警';
  updatedAt: string;
}

const statuses: ServiceItem['status'][] = ['运行中', '延迟', '告警'];
const MIN_ITEMS = 4;

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

const statusColorMap = {
  运行中: '#00b578',
  延迟: '#faad14',
  告警: '#f53f3f',
};

const initialData: ServiceItem[] = [
  { id: 'task-1', service: '订单服务', status: '运行中', updatedAt: '10:21:35' },
  { id: 'task-2', service: '支付服务', status: '延迟', updatedAt: '10:20:11' },
  { id: 'task-3', service: '库存服务', status: '运行中', updatedAt: '10:18:02' },
  { id: 'task-4', service: '搜索服务', status: '运行中', updatedAt: '10:15:27' },
  { id: 'task-5', service: '推荐服务', status: '运行中', updatedAt: '10:12:44' },
  { id: 'task-6', service: '用户画像', status: '告警', updatedAt: '10:11:03' },
];

function createRandomItem(index: number): ServiceItem {
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  return {
    id: `task-${Date.now()}`,
    service: `新增服务-${index + 1}`,
    status,
    updatedAt: new Date().toLocaleTimeString(),
  };
}

export default function Demo() {
  const [data, setData] = useState<ServiceItem[]>(initialData);
  const [autoAppend, setAutoAppend] = useState(false);
  const [autoTrim, setAutoTrim] = useState(false);

  useEffect(() => {
    if (!autoAppend) return undefined;
    const timer = window.setInterval(() => {
      setData((prev) => [...prev, createRandomItem(prev.length)]);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [autoAppend]);

  useEffect(() => {
    if (!autoTrim) return undefined;
    const timer = window.setInterval(() => {
      setData((prev) => {
        if (prev.length <= MIN_ITEMS) {
          return prev;
        }
        return prev.slice(1);
      });
    }, 3000);
    return () => window.clearInterval(timer);
  }, [autoTrim]);

  return (
    <div style={{ width: 560, padding: 16, backgroundColor: '#fff', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
      <Space style={{ marginBottom: 12 }}>
        <Radio
          checked={autoAppend}
          onChange={(e) => {
            setAutoTrim(false);
            setAutoAppend(e.target.checked);
          }}
        >
          自动新增数据
        </Radio>
        <Radio
          checked={autoTrim}
          onChange={(e) => {
            setAutoAppend(false);
            setAutoTrim(e.target.checked);
          }}
        >
          自动减少数据
        </Radio>
      </Space>
      <AnimatedScrollList
        header={
          <div style={headerStyle}>
            <span>服务模块</span>
            <span>当前状态</span>
            <span>更新时间</span>
            <span>操作</span>
          </div>
        }
        containerHeight={260}
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
            <span style={{ color: statusColorMap[item.status] }}>{item.status}</span>
            <span style={{ color: '#86909c' }}>{item.updatedAt}</span>
            <span style={{ color: '#ff4d4f' }}>监控中</span>
          </div>
        )}
      />
    </div>
  );
}
