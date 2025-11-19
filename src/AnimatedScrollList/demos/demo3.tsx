import React from 'react';
import { AnimatedScrollList } from '@pointcloud/pcloud-components';

export default () => {
  const data = [
    { id: 1, title: '公告标题 1', content: '这是第一条公告的详细内容' },
    { id: 2, title: '公告标题 2', content: '这是第二条公告的详细内容' },
    { id: 3, title: '公告标题 3', content: '这是第三条公告的详细内容' },
    { id: 4, title: '公告标题 4', content: '这是第四条公告的详细内容' },
  ];

  return (
    <div style={{ border: '1px solid #d9d9d9', borderRadius: 4, padding: 16 }}>
      <AnimatedScrollList
        direction="up"
        speed={50}
        containerHeight={300}
        data={data}
        renderItem={(item) => (
          <div
            style={{
              height: 80,
              padding: 16,
              marginBottom: 16,
              backgroundColor: '#f5f5f5',
              borderRadius: 4,
              border: '1px solid #e8e8e8',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: 8 }}>{item.title}</div>
            <div style={{ color: '#666', fontSize: 12 }}>{item.content}</div>
          </div>
        )}
      />
    </div>
  );
};
