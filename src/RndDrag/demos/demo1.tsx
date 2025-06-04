import { RndDrag } from '@pointcloud/pcloud-components';
function Default() {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 1px #ddd',
    background: '#333',
    color: '#fff',
  };
  return (
    <div style={{ width: '400px', height: '400px', background: '#f2f2f2', userSelect: 'none' }}>
      <RndDrag default={{ x: 100, y: 100, width: 100, height: 100 }} style={style}>
        我可以拖动哦
      </RndDrag>
    </div>
  );
}
export default Default;
