import { useState } from 'react';
import { ColorPicker } from '@pointcloud/pcloud-components';

const CompactDemo = () => {
  const [color, setColor] = useState();
  const onChangeComplete = (e) => {
    setColor(e.rgb);
  };
  const onChange = (v) => {};
  return <ColorPicker.CompactPicker color={color} onChange={onChange} onChangeComplete={onChangeComplete} />;
};

export default CompactDemo;
