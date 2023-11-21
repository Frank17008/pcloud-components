import { useState } from 'react';
import { ColorPicker } from '@pointcloud/pcloud-components';

const BlockDemo = () => {
  const [color, setColor] = useState();
  const onChangeComplete = (e) => {
    setColor(e.rgb);
  };
  const onChange = (v) => {};
  return <ColorPicker.BlockPicker color={color} onChange={onChange} onChangeComplete={onChangeComplete} />;
};

export default BlockDemo;
