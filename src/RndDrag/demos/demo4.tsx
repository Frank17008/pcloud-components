import { RndDrag } from '@pointcloud/pcloud-components';
import { useState } from 'react';
import { Radio } from 'antd';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#333',
  color: '#fff',
  useSelect: 'none',
};
function Demo4() {
  const [enable, setEnable] = useState<boolean>(false);
  const onChange = (e: any) => {
    setEnable(e.target.value);
  };
  return (
    <div style={{ width: '400px', height: '400px', background: '#f2f2f2' }}>
      <Radio.Group
        value={enable}
        options={[
          { label: '启用拖动', value: false },
          { label: '禁用拖动', value: true },
        ]}
        onChange={onChange}
        style={{ marginBottom: '10px' }}
      />
      <RndDrag default={{ x: 100, y: 100, width: 100, height: 100 }} style={style} disableDragging={enable}>
        我被{enable ? '禁止' : '允许'}拖动了
      </RndDrag>
    </div>
  );
}
export default Demo4;
