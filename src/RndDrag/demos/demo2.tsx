import { RndDrag } from '@pointcloud/pcloud-components';
import React, { useState } from 'react';
import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';

const options = [
  { label: 'id选择器-box1', value: '#box1' },
  { label: 'class选择器-box2', value: '.box2' },
  { label: '当前浏览器窗口window', value: 'window' },
  { label: 'body', value: 'body' },
  { label: 'parent', value: 'parent' },
];
const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ccc',
  background: '#333',
  color: '#f2f2f8',
  useSelect: 'none',
};
const box2Style: React.CSSProperties = {
  width: '300px',
  height: '300px',
  background: '#f2f2f2',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
};
function Demo2() {
  const [bounds, setBounds] = useState<string | Element>('#box1');
  const onChange = (e: RadioChangeEvent) => {
    const value = e.target.value;
    setBounds(value);
  };
  return (
    <>
      <Radio.Group value={bounds} options={options} onChange={onChange} style={{ marginBottom: '10px' }}></Radio.Group>
      <div id="box1" style={{ width: '450px', height: '450px', background: '#c8c8c8' }}>
        我的id是box1
        <div className="box2" style={box2Style}>
          我的class是box2
          <RndDrag default={{ x: 50, y: 50, width: 100, height: 50 }} style={style} bounds={bounds}>
            我可以拖动哦
          </RndDrag>
        </div>
      </div>
    </>
  );
}

export default Demo2;
