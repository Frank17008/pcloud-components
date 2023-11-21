import { useState } from 'react';
import { ColorPicker } from '@pointcloud/pcloud-components';

const BasicDemo = () => {
  const [color, setColor] = useState<string>('#000');
  const [currentColor, setCurrentColor] = useState<string>('#ff0000');
  const onChange = (v) => {
    const { r, g, b, a } = v.rgb;
    setCurrentColor(`rgba(${r},${g},${b},${a})`);
  };
  const onConfirm = (v) => {
    setColor(v);
  };
  return (
    <>
      <ColorPicker onChange={onChange} initColor={'#ff0000'} onConfirm={onConfirm} />
      <span style={{ display: 'inline-block', height: '26px', marginLeft: '10px', verticalAlign: 'super' }}>RGBA值：{currentColor}</span>
      <div style={{ width: '60px', color, fontWeight: 'bolder' }}>我会变色</div>
    </>
  );
};

export default BasicDemo;
