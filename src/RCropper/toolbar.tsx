import { ReactComponent as CropIcon } from './svgIcons/crop.svg';
import { ReactComponent as FlipHIcon } from './svgIcons/flip_h.svg';
import { ReactComponent as FlipVIcon } from './svgIcons/flip_v.svg';
import { ReactComponent as MoveIcon } from './svgIcons/move.svg';
import { ReactComponent as OkIcon } from './svgIcons/ok.svg';
import { ReactComponent as ResetIcon } from './svgIcons/reset.svg';
import { ReactComponent as RotateLeftIcon } from './svgIcons/rotate_l.svg';
import { ReactComponent as RotateRightIcon } from './svgIcons/rotate_r.svg';
import { ReactComponent as ZoomInIcon } from './svgIcons/zoom_in.svg';
import { ReactComponent as ZoomOutIcon } from './svgIcons/zoom_out.svg';
import './styles/toolbar.less';

const Toolbar = ({ onAction }) => {
  const { handleCancelCrop, handleCrop, handleZoomIn, handleZoomOut, handleRotateLeft, handleRotateRight, handleReset, handleFlipX, handleFlipY } = onAction;
  return (
    <div className="toolbar">
      <button type="button" onClick={handleCancelCrop} title="隐藏选区">
        <CropIcon className="icon" width={24} height={24} />
      </button>
      <button type="button" onClick={handleZoomIn} title="放大">
        <ZoomInIcon className="icon" width={24} height={24} />
      </button>
      <button type="button" onClick={handleZoomOut} title="缩小">
        <ZoomOutIcon className="icon" width={22} height={22} />
      </button>
      <button type="button" onClick={handleFlipX} title="水平翻转">
        <FlipHIcon className="icon" width={24} height={24} />
      </button>
      <button type="button" onClick={handleFlipY} title="垂直翻转">
        <FlipVIcon className="icon" width={22} height={22} />
      </button>
      <button type="button" onClick={handleRotateLeft} title="向左旋转">
        <RotateLeftIcon className="icon" width={24} height={24} />
      </button>
      <button type="button" onClick={handleRotateRight} title="向右旋转">
        <RotateRightIcon className="icon" width={24} height={24} />
      </button>
      <button type="button" onClick={handleReset} title="重置">
        <ResetIcon className="icon" width={20} height={20} />
      </button>
      <button type="button" onClick={handleCrop} title="裁剪">
        <OkIcon className="icon" width={24} height={24} />
      </button>
    </div>
  );
};
export default Toolbar;
