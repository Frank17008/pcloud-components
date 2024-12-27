import { LabelValue } from '@pointcloud/pcloud-components';

export default () => (
  <>
    <LabelValue label="抓拍车牌" value={<div style={{ color: '#fff', background: '#2d87f9', padding: '2px 5px' }}>陕U87221</div>} emptyValue="--" />
    <LabelValue
      style={{ display: 'block', marginTop: '10px' }}
      label="抓拍时间"
      value={Date.now()}
      formatter={(v) => new Date(v).toLocaleString()}
      emptyValue="--"
    />
  </>
);
