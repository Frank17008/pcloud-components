import React from 'react';
import { AnimatedScrollList } from '@pointcloud/pcloud-components';

export default () => {
  const data = [
    { id: 1, text: '标签 1' },
    { id: 2, text: '标签 2' },
    { id: 3, text: '标签 3' },
    { id: 4, text: '标签 4' },
    { id: 5, text: '标签 5' },
    { id: 6, text: '标签 6' },
  ];

  return (
    <div>
      <h4>水平向左滚动</h4>
      <div style={{ height: 100, border: '1px solid #d9d9d9', borderRadius: 4, padding: 16, marginBottom: 24 }}>
        <AnimatedScrollList
          direction="left"
          speed={80}
          containerWidth="100%"
          containerHeight={100}
          data={data}
          renderItem={(item) => (
            <div
              style={{
                padding: '8px 24px',
                marginRight: 16,
                backgroundColor: '#1890ff',
                color: '#fff',
                borderRadius: 16,
                fontSize: 14,
                whiteSpace: 'nowrap',
              }}
            >
              {item.text}
            </div>
          )}
        />
      </div>

      <h4>水平向右滚动</h4>
      <div style={{ height: 100, border: '1px solid #d9d9d9', borderRadius: 4, padding: 16 }}>
        <AnimatedScrollList
          direction="right"
          speed={80}
          containerWidth="100%"
          containerHeight={100}
          data={data}
          renderItem={(item) => (
            <div
              style={{
                padding: '8px 24px',
                marginRight: 16,
                backgroundColor: '#52c41a',
                color: '#fff',
                borderRadius: 16,
                fontSize: 14,
                whiteSpace: 'nowrap',
              }}
            >
              {item.text}
            </div>
          )}
        />
      </div>
    </div>
  );
};

