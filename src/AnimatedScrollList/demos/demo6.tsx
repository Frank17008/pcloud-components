import { AnimatedScrollList } from '@pointcloud/pcloud-components';
import { Row, Col } from 'antd';

export default () => {
  const data = [
    { id: 1, text: '鼠标悬停时暂停滚动' },
    { id: 2, text: '鼠标离开时恢复滚动' },
    { id: 3, text: '这是第3条内容' },
    { id: 4, text: '这是第4条内容' },
  ];

  return (
    <Row gutter={16}>
      <Col span={12}>
        <div style={{ marginBottom: 16 }}>
          <h4>悬停暂停 (hoverStop=true)</h4>
          <div style={{ height: 150, border: '1px solid #d9d9d9', overflow: 'hidden', borderRadius: 4, padding: 16 }}>
            <AnimatedScrollList
              direction="up"
              speed={50}
              hoverStop={true}
              containerHeight={'100%'}
              data={data}
              renderItem={(item) => <div style={{ padding: '8px 0', fontSize: 14 }}>{item.text}</div>}
            />
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>将鼠标移入列表区域，滚动会暂停</div>
        </div>
      </Col>
      <Col span={12}>
        <div style={{ marginBottom: 16 }}>
          <h4>不暂停 (hoverStop=false)</h4>
          <div style={{ height: 150, border: '1px solid #d9d9d9', overflow: 'hidden', borderRadius: 4, padding: 16 }}>
            <AnimatedScrollList
              direction="up"
              speed={50}
              hoverStop={false}
              containerHeight={'100%'}
              data={data}
              renderItem={(item) => <div style={{ padding: '8px 0', fontSize: 14 }}>{item.text}</div>}
            />
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>鼠标悬停时不会暂停滚动</div>
        </div>
      </Col>
    </Row>
  );
};
