import { AnimatedScrollList } from '@pointcloud/pcloud-components';

export default () => {
  const data = [
    { id: 1, text: '这是第一条公告内容' },
    { id: 2, text: '这是第二条公告内容' },
    { id: 3, text: '这是第三条公告内容' },
    { id: 4, text: '这是第四条公告内容' },
    { id: 5, text: '这是第五条公告内容' },
  ];

  return (
    <div style={{ border: '1px solid #d9d9d9', borderRadius: 4, padding: 16 }}>
      <AnimatedScrollList
        direction="up"
        speed={50}
        containerHeight={150}
        data={data}
        renderItem={(item) => <div style={{ padding: '8px 0', fontSize: 14 }}>{item.text}</div>}
      />
    </div>
  );
};
