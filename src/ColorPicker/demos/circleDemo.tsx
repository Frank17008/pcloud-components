import { useState } from 'react';
import { ColorPicker } from '@pointcloud/pcloud-components';

const CircleDemo = () => {
  const [color, setColor] = useState();
  const onChangeComplete = (e) => {
    setColor(e.rgb);
  };
  const onChange = (v) => {};
  return <ColorPicker.CirclePicker color={color} onChange={onChange} onChangeComplete={onChangeComplete} />;
};

export default CircleDemo;
