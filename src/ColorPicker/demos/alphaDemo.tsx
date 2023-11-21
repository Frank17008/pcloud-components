import { useState } from 'react';
import { ColorPicker } from '@pointcloud/pcloud-components';

const AlphaDemo = () => {
  const [color, setColor] = useState();
  const onChangeComplete = (e) => {
    console.info(e.rgb);
  };
  const onChange = (e) => {
    setColor(e.rgb);
  };
  return <ColorPicker.AlphaPicker color={color} onChange={onChange} onChangeComplete={onChangeComplete} />;
};

export default AlphaDemo;
