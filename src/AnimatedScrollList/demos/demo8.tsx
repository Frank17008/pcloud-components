import { AnimatedScrollList } from '@pointcloud/pcloud-components';
import { Radio, RadioChangeEvent } from 'antd';
import { useState } from 'react';

export default () => {
  const data = [
    { id: 1, text: '这是第一条公告内容' },
    { id: 2, text: '这是第二条公告内容' },
    { id: 3, text: '这是第三条公告内容' },
    { id: 4, text: '这是第四条公告内容' },
    { id: 5, text: '这是第五条公告内容' },
  ];

  const [scrollWhenInsufficient, setScrollWhenInsufficient] = useState(false);
  const handleChange = (e: RadioChangeEvent) => setScrollWhenInsufficient(e.target.value);
  return (
    <div style={{ border: '1px solid #d9d9d9', borderRadius: 4, padding: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <Radio.Group value={scrollWhenInsufficient} onChange={handleChange}>
          <Radio value={false}>不自动启动动画</Radio>
          <Radio value={true}>自动启动动画</Radio>
        </Radio.Group>
      </div>
      <AnimatedScrollList
        direction="up"
        speed={50}
        containerHeight={200}
        scrollWhenInsufficient={scrollWhenInsufficient}
        data={data}
        renderItem={(item) => (
          <div style={{ height: 30, lineHeight: '30px', fontSize: 14 }}>
            序号:{item.id} - {item.text} 我的高度是 30px
          </div>
        )}
      />
    </div>
  );
};
