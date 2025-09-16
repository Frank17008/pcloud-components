import { SignaturePad } from '@pointcloud/pcloud-components';
import { Input, InputNumber, Space } from 'antd';
import { useState } from 'react';

export default () => {
  const [penColor, setPenColor] = useState('#000000');
  const [penWidth, setPenWidth] = useState(2);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Space>
        <span>笔画颜色：</span>
        <Input type="color" value={penColor} style={{ width: 60 }} onChange={(e) => setPenColor(e.target.value)} />
        <span>笔画粗细：</span>
        <InputNumber min={1} max={10} value={penWidth} onChange={(value) => setPenWidth(value || 1)} />
        <span>背景颜色：</span>
        <Input type="color" value={backgroundColor} style={{ width: 60 }} onChange={(e) => setBackgroundColor(e.target.value)} />
      </Space>

      <SignaturePad
        width={600}
        height={200}
        penColor={penColor}
        penWidth={penWidth}
        backgroundColor={backgroundColor}
        clearText="重新签名"
        doneText="保存签名"
        onDone={(dataUrl) => {
          const link = document.createElement('a');
          link.download = 'signature.png';
          link.href = dataUrl;
          link.click();
        }}
      />
    </Space>
  );
};
