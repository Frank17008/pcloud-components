import { useState } from 'react';
import { ColorPicker } from '@pointcloud/pcloud-components';

const HueDemo = () => {
  const [color, setColor] = useState();
  const onChangeComplete = (e) => {
    console.info(e.rgb);
  };
  const onChange = (e) => {
    setColor(e.rgb);
  };
  return <ColorPicker.HuePicker color={color} onChange={onChange} onChangeComplete={onChangeComplete} />;
};

export default HueDemo;
