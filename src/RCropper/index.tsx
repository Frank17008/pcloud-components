import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from 'react';
import Cropper, { toKebabCase } from 'cropperjs';
import classNames from 'classnames';
import { RCropperElement, RCropperProps, RCropperSelection, RCropperGrid, RCropperCanvas } from './interface';
import { ConfigContext } from '../ConfigProvider';
import Toolbar from './toolbar';

const isNonEmptyObject = (obj: unknown): obj is Record<string, unknown> => {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj) && Object.keys(obj).length > 0;
};

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
/**
 * 属性设置方法
 * @param element DOM元素
 * @param attrName 属性名(kebab-case)
 * @param value 属性值
 */
const setElementAttribute = (element: Element | null | undefined, attrName: string, value: unknown): void => {
  if (!element) return;
  // 处理布尔值
  if (typeof value === 'boolean') {
    // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
    value ? element.setAttribute(attrName, '') : element.removeAttribute(attrName);
  } else if (value === null || value === undefined) {
    element.removeAttribute(attrName);
  } else {
    element.setAttribute(attrName, String(value));
  }
};

const RCropper = forwardRef((props: RCropperProps, ref: React.Ref<unknown>) => {
  const { src, alt = 'image', className, style, grid, canvas, selection, dragMode, onCrop, onZoom, onRotate, onFlip, onReset, onCancelCrop } = props;

  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
  const classname = getPrefixCls('rcropper');
  const wrapperClass = classNames({ [`${prefixCls}-rcropper`]: !!prefixCls }, classname, className);

  const cropperRef = useRef<HTMLImageElement>(null);
  const cropperInstanceRef = useRef<Cropper | null>(null);
  const imgTransformRef = useRef<number[]>();

  const setCropperElementAttributes = (elementGetter: (_cropper: Cropper) => RCropperElement, props: Record<string, unknown>, nextTick = false) => {
    if (cropperInstanceRef.current && isNonEmptyObject(props)) {
      const element = elementGetter(cropperInstanceRef.current);
      Object.keys(props).forEach((key) => {
        const kebabKey = toKebabCase(key);
        if (props[key] !== undefined) {
          const setAttr = () => setElementAttribute(element, kebabKey, props[key]);
          if (nextTick) {
            element?.$nextTick?.(setAttr);
          } else {
            setAttr();
          }
        }
      });
    }
  };

  const setGrid = (_grid: RCropperGrid) => {
    setCropperElementAttributes((cropper) => cropper.getCropperSelection()?.querySelector('cropper-grid') as RCropperElement, _grid);
  };
  const setSelection = (_selection: RCropperSelection) => {
    setCropperElementAttributes((cropper) => cropper.getCropperSelection(), _selection, true);
  };
  const setCanvas = (_canvas: RCropperCanvas) => {
    setCropperElementAttributes((cropper) => cropper.getCropperCanvas(), _canvas, true);
  };
  const setDragMode = (_dragMode: RCropperProps['dragMode']) => {
    if (cropperInstanceRef.current) {
      const selectionDom = cropperInstanceRef.current.getCropperSelection();
      const handleDom = selectionDom?.querySelector('cropper-handle');
      handleDom?.setAttribute('action', _dragMode || 'crop');
    }
  };
  // initialize cropper options
  const initializeOptions = () => {
    if (isNonEmptyObject(grid)) setGrid(grid);
    if (isNonEmptyObject(canvas)) setCanvas(canvas);
    if (isNonEmptyObject(selection)) setSelection(selection);
    if (dragMode) setDragMode(dragMode);
  };

  const handleAction = {
    handleCrop: async () => {
      if (cropperInstanceRef.current) {
        const selection = cropperInstanceRef.current.getCropperSelection();
        const canvasEl = await selection?.$toCanvas();
        const img = canvasEl?.toDataURL() as string;
        const file = base64ToFile(img);
        onCrop?.(img, file);
      }
    },
    handleZoomIn: () => {
      const img = cropperInstanceRef.current?.getCropperImage();
      img?.$zoom(0.1);
      onZoom?.(img?.$getTransform());
    },
    handleZoomOut: () => {
      const img = cropperInstanceRef.current?.getCropperImage();
      img?.$zoom(-0.1);
      onZoom?.(img?.$getTransform());
    },
    handleRotateLeft: () => {
      const img = cropperInstanceRef.current?.getCropperImage();
      img?.$rotate('-45deg');
      onRotate?.(img?.$getTransform());
    },
    handleRotateRight: () => {
      const img = cropperInstanceRef.current?.getCropperImage();
      img?.$rotate('45deg');
      onRotate?.(img?.$getTransform());
    },
    handleFlipX: () => {
      const img = cropperInstanceRef.current?.getCropperImage();
      img?.$scale(-1, 1);
      onFlip?.(img?.$getTransform());
    },
    handleFlipY: () => {
      const img = cropperInstanceRef.current?.getCropperImage();
      img?.$scale(1, -1);
      onFlip?.(img?.$getTransform());
    },
    handleReset: () => {
      const img = cropperInstanceRef.current?.getCropperImage();
      if (img && imgTransformRef.current) {
        const [scaleX, skewY, skewX, scaleY, translateX, translateY] = imgTransformRef.current;
        img?.$setTransform(scaleX, skewY, skewX, scaleY, translateX, translateY);
        onReset?.(img?.$getTransform());
      }
    },
    handleCancelCrop: () => {
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
      onCancelCrop?.({ x, y, width, height });
    },
  };
  useImperativeHandle(ref, () => ({
    cropper: cropperInstanceRef.current,
    image: cropperInstanceRef.current?.getCropperImage(),
    canvas: cropperInstanceRef.current?.getCropperCanvas(),
    selection: cropperInstanceRef.current?.getCropperSelection(),
  }));
  // handle dragMode
  useEffect(() => {
    if (dragMode) {
      setDragMode(dragMode);
    }
  }, [dragMode]);
  useEffect(() => {
    if (canvas) {
      setCanvas(canvas);
    }
  }, [canvas]);
  useEffect(() => {
    if (selection) {
      setSelection(selection);
    }
  }, [selection]);
  useEffect(() => {
    if (cropperInstanceRef.current) {
      const imgDom = cropperInstanceRef.current.getCropperImage();
      const selectionDom = cropperInstanceRef.current.getCropperSelection();
      if (!src) {
        imgDom?.setAttribute('src', src);
      } else {
        selectionDom?.$reset();
        selectionDom?.setAttribute('hidden', 'true');
      }
    }
  }, [src]);
  useEffect(() => {
    if (cropperRef.current && !cropperInstanceRef.current) {
      cropperInstanceRef.current = new Cropper(cropperRef.current);
      const img = cropperInstanceRef.current.getCropperImage();
      const cropperCanvas = cropperInstanceRef.current.getCropperCanvas();
      cropperCanvas?.$addStyles(`:host { height: 100%; }`);
      img?.$ready(() => {
        img.setAttribute('crossOrigin', 'Anonymous');
        // 缓存图片初始transform
        imgTransformRef.current = img.$getTransform();
        initializeOptions();
      });
    }
  }, []);

  return (
    <>
      <div className={wrapperClass} style={style}>
        <img ref={cropperRef} src={src} alt={alt} />
      </div>
      <Toolbar onAction={handleAction} />
    </>
  );
});

export default RCropper;
