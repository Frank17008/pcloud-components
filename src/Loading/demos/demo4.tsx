import React, { useState } from 'react';
import { Button, List } from 'antd';
import { useLoading } from '@pointcloud/pcloud-components';

interface ListItem {
  id: number;
  name: string;
}

export default (): React.ReactNode => {
  const { isLoading, openLoading, closeLoading } = useLoading(false);
  const [data, setData] = useState<ListItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchListData = async () => {
    return new Promise<ListItem[]>((resolve, reject) => {
      const random = Math.random() > 0.2;
      setTimeout(() => {
        if (random) {
          resolve([
            { id: 1, name: '项目1' },
            { id: 2, name: '项目2' },
            { id: 3, name: '项目3' },
          ]);
        } else {
          reject('数据加载失败，请重试');
        }
      }, 1500);
    });
  };

  const onClick = async () => {
    try {
      setError(null);
      openLoading({ tip: '正在加载列表数据...' });
      const result = await fetchListData();
      setData(result);
    } catch (err) {
      setError(err as string);
      setData([]);
    } finally {
      closeLoading();
    }
  };

  return (
    <div style={{ height: '300px', padding: '20px' }}>
      <Button onClick={onClick} type="primary" loading={isLoading}>
        {isLoading ? '加载中...' : '获取列表数据'}
      </Button>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      {data.length > 0 && (
        <List style={{ marginTop: '20px' }} bordered dataSource={data} renderItem={(item) => <List.Item key={item.id}>{item.name}</List.Item>} />
      )}
    </div>
  );
};
