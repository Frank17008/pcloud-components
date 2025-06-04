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
function Demo5() {
  const [axis, setAxis] = useState<'x' | 'y' | 'both' | 'none'>('x');
  const onChange = (e: any) => {
    setAxis(e.target.value);
  };
  return (
    <>
      <Radio.Group
        value={axis}
        options={[
          { label: 'x轴', value: 'x' },
          { label: 'y轴', value: 'y' },
          { label: 'x+y轴', value: 'both' },
          { label: 'none', value: 'none' },
        ]}
        onChange={onChange}
        style={{ marginBottom: '10px' }}
      />
      <div style={{ width: '400px', height: '400px', background: '#f2f2f2', position: 'relative' }}>
        <RndDrag default={{ x: 100, y: 100, width: 100, height: 100 }} style={style} dragAxis={axis}>
          我被拖动了
        </RndDrag>
      </div>
    </>
  );
}
export default Demo5;
