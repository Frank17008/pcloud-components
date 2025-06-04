import { RndDrag } from '@pointcloud/pcloud-components';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#333',
  color: '#fff',
  useSelect: 'none',
};

const commonStyle = {
  width: '100%',
  height: '100%',
  fontSize: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
};
function Demo6() {
  const resizeHandleComponent = {
    top: <div style={{ ...commonStyle, background: 'red' }}>Top</div>,
    right: <div style={{ ...commonStyle, background: 'pink' }}>R</div>,
    bottom: <div style={{ ...commonStyle, background: 'blue' }}>Bottom</div>,
    left: <div style={{ ...commonStyle, background: 'green' }}>L</div>,
    topRight: <div style={{ ...commonStyle, borderRadius: '50%', background: 'yellowgreen' }}>TR</div>,
    bottomRight: <div style={{ ...commonStyle, borderRadius: '50%', background: 'gray' }}>BR</div>,
    bottomLeft: <div style={{ ...commonStyle, borderRadius: '50%', background: 'orange' }}>BL</div>,
    topLeft: <div style={{ ...commonStyle, borderRadius: '50%', background: 'purple' }}>TL</div>,
  };
  return (
    <div style={{ width: '400px', height: '400px', background: '#f2f2f2', position: 'relative' }}>
      <RndDrag default={{ x: 100, y: 100, width: 200, height: 200 }} style={style} resizeHandleComponent={resizeHandleComponent}>
        我可以拖动哦
      </RndDrag>
    </div>
  );
}
export default Demo6;
