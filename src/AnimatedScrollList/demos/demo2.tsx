import React from 'react';
import { AnimatedScrollList } from '@pointcloud/pcloud-components';
import { Row, Col } from 'antd';

export default () => {
  const data = [
    { id: 1, text: '向上滚动' },
    { id: 2, text: '向下滚动' },
    { id: 3, text: '向左滚动' },
    { id: 4, text: '向右滚动' },
  ];

  return (
    <Row gutter={16}>
      <Col span={12}>
        <div style={{ marginBottom: 16 }}>
          <h4>向上滚动 (up)</h4>
          <div style={{ border: '1px solid #d9d9d9', borderRadius: 4, padding: 16 }}>
            <AnimatedScrollList
              direction="up"
              speed={50}
              containerHeight={150}
              data={data}
              renderItem={(item) => <div style={{ padding: '8px 0', fontSize: 14 }}>{item.text}</div>}
            />
          </div>
        </div>
      </Col>
      <Col span={12}>
        <div style={{ marginBottom: 16 }}>
          <h4>向下滚动 (down)</h4>
          <div style={{ border: '1px solid #d9d9d9', borderRadius: 4, padding: 16 }}>
            <AnimatedScrollList
              direction="down"
              speed={50}
              containerHeight={150}
              data={data}
              renderItem={(item) => <div style={{ padding: '8px 0', fontSize: 14 }}>{item.text}</div>}
            />
          </div>
        </div>
      </Col>
      <Col span={12}>
        <div style={{ marginBottom: 16 }}>
          <h4>向左滚动 (left)</h4>
          <div style={{ height: 150, border: '1px solid #d9d9d9', borderRadius: 4, padding: 16 }}>
            <AnimatedScrollList
              direction="left"
              speed={50}
              containerWidth={400}
              containerHeight={150}
              data={data}
              renderItem={(item) => <div style={{ padding: '0 16px', whiteSpace: 'nowrap' }}>{item.text}</div>}
            />
          </div>
        </div>
      </Col>
      <Col span={12}>
        <div style={{ marginBottom: 16 }}>
          <h4>向右滚动 (right)</h4>
          <div style={{ height: 150, border: '1px solid #d9d9d9', borderRadius: 4, padding: 16 }}>
            <AnimatedScrollList
              direction="right"
              speed={50}
              containerWidth={400}
              containerHeight={150}
              data={data}
              renderItem={(item) => <div style={{ padding: '0 16px', whiteSpace: 'nowrap' }}>{item.text}</div>}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};
