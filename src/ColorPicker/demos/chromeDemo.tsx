import { useState } from 'react';
import { ColorPicker } from '@pointcloud/pcloud-components';

const ChromeDemo = () => {
  const [color, setColor] = useState();
  const onChangeComplete = (e) => {
    setColor(e.rgb);
  };
  const onChange = (v) => {};
  return <ColorPicker.ChromePicker color={color} onChange={onChange} onChangeComplete={onChangeComplete} />;
};

export default ChromeDemo;
