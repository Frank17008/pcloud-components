import { useState } from 'react';
import { ColorPicker } from '@pointcloud/pcloud-components';

const TwitterDemo = () => {
  const [color, setColor] = useState();
  const onChangeComplete = (e) => {
    setColor(e.rgb);
  };
  const onChange = () => {};
  return <ColorPicker.TwitterPicker color={color} onChange={onChange} onChangeComplete={onChangeComplete} />;
};

export default TwitterDemo;
