import type { RCropperActionHandlers } from './interface';
import type Cropper from 'cropperjs';

const base64ToFile = (base64: string, fileName: string = 'file.png') => {
  // 分割Base64字符串获取MIME类型和纯数据部分
  let arr = base64.split(',');
  let mime = arr?.[0]?.match(/:(.*?);/)?.[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  // 创建Uint8Array并填充数据
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  // 创建并返回File对象
  return new File([u8arr], fileName, { type: mime });
};
export function createCropperHandlers(
  cropperInstanceRef: React.RefObject<Cropper | null>,
  imgTransformRef: React.RefObject<number[] | undefined>,
  props: {
    // eslint-disable-next-line no-unused-vars
    onCrop?: (base64: string, file?: File) => void;
    // eslint-disable-next-line no-unused-vars
    onZoom?: (transform: number[] | undefined) => void;
    // eslint-disable-next-line no-unused-vars
    onRotate?: (transform: number[] | undefined) => void;
    // eslint-disable-next-line no-unused-vars
    onFlip?: (transform: number[] | undefined) => void;
    // eslint-disable-next-line no-unused-vars
    onReset?: (transform: number[] | undefined) => void;
    // eslint-disable-next-line no-unused-vars
    onCancelCrop?: (info: { x: number; y: number; width: number; height: number }) => void;
  },
): RCropperActionHandlers {
  return {
    async handleCrop() {
      try {
        const cropper = cropperInstanceRef.current;
        if (!cropper) return;
        const selection = cropper.getCropperSelection();
        const canvasEl = await selection?.$toCanvas();
        const img = canvasEl?.toDataURL() as string;
        const file = base64ToFile(img);
        props.onCrop?.(img, file);
      } catch {}
    },
    handleZoomIn() {
      try {
        const img = cropperInstanceRef.current?.getCropperImage();
        img?.$zoom(0.1);
        props.onZoom?.(img?.$getTransform());
      } catch {}
    },
    handleZoomOut() {
      try {
        const img = cropperInstanceRef.current?.getCropperImage();
        img?.$zoom(-0.1);
        props.onZoom?.(img?.$getTransform());
      } catch {}
    },
    handleRotateLeft() {
      try {
        const img = cropperInstanceRef.current?.getCropperImage();
        img?.$rotate('-45deg');
        props.onRotate?.(img?.$getTransform());
      } catch {}
    },
    handleRotateRight() {
      try {
        const img = cropperInstanceRef.current?.getCropperImage();
        img?.$rotate('45deg');
        props.onRotate?.(img?.$getTransform());
      } catch {}
    },
    handleFlipX() {
      try {
        const img = cropperInstanceRef.current?.getCropperImage();
        img?.$scale(-1, 1);
        props.onFlip?.(img?.$getTransform());
      } catch {}
    },
    handleFlipY() {
      try {
        const img = cropperInstanceRef.current?.getCropperImage();
        img?.$scale(1, -1);
        props.onFlip?.(img?.$getTransform());
      } catch {}
    },
    handleReset() {
      try {
        const img = cropperInstanceRef.current?.getCropperImage();
        if (img && imgTransformRef.current) {
          const [scaleX, skewY, skewX, scaleY, translateX, translateY] = imgTransformRef.current;
          img?.$setTransform(scaleX, skewY, skewX, scaleY, translateX, translateY);
          props.onReset?.(img?.$getTransform());
        }
      } catch {}
    },
    handleCancelCrop() {
      try {
        const selection = cropperInstanceRef.current?.getCropperSelection();
        const width = selection?.width as number;
        const height = selection?.height as number;
        const x = selection?.x as number;
        const y = selection?.y as number;
        if (width && height) {
          selection?.$clear();
        } else {
          selection?.$reset();
        }
        props.onCancelCrop?.({ x, y, width, height });
      } catch {}
    },
  };
}
