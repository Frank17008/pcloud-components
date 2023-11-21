import { ColorPicker } from '@pointcloud/pcloud-components';

const PSDemo = () => {
  const onConfirm = (v) => {
    console.info(v);
  };
  const onChange = (v) => {
    console.info(v);
  };
  return <ColorPicker.PSPicker initColor="#ffff00" onChange={onChange} onConfirm={onConfirm} />;
};

export default PSDemo;
