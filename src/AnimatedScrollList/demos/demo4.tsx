import React from 'react';
import { AnimatedScrollList } from '@pointcloud/pcloud-components';

export default () => {
  const data = [
    { id: 1, title: '短标题', content: '这是内容较短的公告' },
    { id: 2, title: '中等长度标题', content: <div>这是内容长度中等的公告，包含更多的文字描述信息</div> },
    {
      id: 3,
      title: '较长的标题内容',
      content: (
        <div style={{ display: 'flex', gap: 10 }}>
          <img height={200} src="https://picsum.photos/200/300" alt="随机图片" />
          <p>这是含有图片的列表项, 图片要设置固定高度, 容器可以不用设置定高, 组件内会自动计算`</p>
        </div>
      ),
    },
    { id: 4, title: '标题', content: '短内容' },
    {
      id: 5,
      title: '超长标题示例',
      content: (
        <div>
          <div>这是内容超长的公告示例，包含大量的文字描述信息，用于测试不固定高度列表项的无缝循环滚动效果，确保在不同高度的列表项情况下都能正常工作</div>
          <div>这是内容超长的公告示例，包含大量的文字描述信息，用于测试不固定高度列表项的无缝循环滚动效果，确保在不同高度的列表项情况下都能正常工作</div>
          <div>这是内容超长的公告示例，包含大量的文字描述信息，用于测试不固定高度列表项的无缝循环滚动效果，确保在不同高度的列表项情况下都能正常工作</div>
        </div>
      ),
    },
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
              padding: 16,
              marginBottom: 16,
              backgroundColor: '#f5f5f5',
              borderRadius: 4,
              border: '1px solid #e8e8e8',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: 8 }}>序号: {item.id}</div>
            <div style={{ fontWeight: 'bold', marginBottom: 8 }}>{item.title}</div>
            <div style={{ color: '#666', fontSize: 12, lineHeight: 1.6 }}>{item.content}</div>
          </div>
        )}
      />
    </div>
  );
};
