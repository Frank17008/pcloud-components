import { CropIcon, ZoomInIcon, ZoomOutIcon, FlipHIcon, FlipVIcon, RotateLeftIcon, RotateRightIcon, ResetIcon, OkIcon } from './svgIcons';
import './styles/toolbar.less';

const Toolbar = ({ onAction }) => {
  const { handleCancelCrop, handleCrop, handleZoomIn, handleZoomOut, handleRotateLeft, handleRotateRight, handleReset, handleFlipX, handleFlipY } = onAction;
  return (
    <div className="toolbar">
      <button type="button" onClick={handleCancelCrop} title="隐藏选区">
        <CropIcon className="icon" />
      </button>
      <button type="button" onClick={handleZoomIn} title="放大">
        <ZoomInIcon className="icon" />
      </button>
      <button type="button" onClick={handleZoomOut} title="缩小">
        <ZoomOutIcon className="icon" />
      </button>
      <button type="button" onClick={handleFlipX} title="水平翻转">
        <FlipHIcon className="icon" />
      </button>
      <button type="button" onClick={handleFlipY} title="垂直翻转">
        <FlipVIcon className="icon" />
      </button>
      <button type="button" onClick={handleRotateLeft} title="向左旋转">
        <RotateLeftIcon className="icon" />
      </button>
      <button type="button" onClick={handleRotateRight} title="向右旋转">
        <RotateRightIcon className="icon" />
      </button>
      <button type="button" onClick={handleReset} title="重置">
        <ResetIcon className="icon" />
      </button>
      <button type="button" onClick={handleCrop} title="裁剪">
        <OkIcon className="icon" />
      </button>
    </div>
  );
};
export default Toolbar;
