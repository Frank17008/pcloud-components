import React from 'react';
import { AnimatedScrollList } from '@pointcloud/pcloud-components';
import { Row, Col } from 'antd';

export default () => {
  const data = [
    { id: 1, text: '慢速滚动' },
    { id: 2, text: '中速滚动' },
    { id: 3, text: '快速滚动' },
    { id: 4, text: '超快滚动' },
  ];

  return (
    <Row gutter={16}>
      <Col span={12}>
        <div style={{ marginBottom: 16 }}>
          <h4>慢速 (20px/s)</h4>
          <div style={{ border: '1px solid #d9d9d9', borderRadius: 4, padding: 16 }}>
            <AnimatedScrollList
              direction="up"
              speed={20}
              containerHeight={150}
              data={data}
              renderItem={(item) => <div style={{ padding: '8px 0', fontSize: 14 }}>{item.text}</div>}
            />
          </div>
        </div>
      </Col>
      <Col span={12}>
        <div style={{ marginBottom: 16 }}>
          <h4>中速 (50px/s)</h4>
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
          <h4>快速 (100px/s)</h4>
          <div style={{ border: '1px solid #d9d9d9', borderRadius: 4, padding: 16 }}>
            <AnimatedScrollList
              direction="up"
              speed={100}
              containerHeight={150}
              data={data}
              renderItem={(item) => <div style={{ padding: '8px 0', fontSize: 14 }}>{item.text}</div>}
            />
          </div>
        </div>
      </Col>
      <Col span={12}>
        <div style={{ marginBottom: 16 }}>
          <h4>超快 (200px/s)</h4>
          <div style={{ border: '1px solid #d9d9d9', borderRadius: 4, padding: 16 }}>
            <AnimatedScrollList
              direction="up"
              speed={200}
              containerHeight={150}
              data={data}
              renderItem={(item) => <div style={{ padding: '8px 0', fontSize: 14 }}>{item.text}</div>}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};
