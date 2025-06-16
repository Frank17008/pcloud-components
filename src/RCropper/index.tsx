import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import Cropper, { toKebabCase } from 'cropperjs';
import { RCropperElement, RCropperProps, RCropperSelection, RCropperGrid, RCropperCanvas } from './interface';

const isNonEmptyObject = (obj: unknown): obj is Record<string, unknown> => {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj) && Object.keys(obj).length > 0;
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
  const { src, alt = 'image', className, style, grid, canvas, selection, dragMode, onCrop } = props;
  const cropperRef = useRef<HTMLImageElement>(null);
  const cropperInstanceRef = useRef<Cropper | null>(null);

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

  const handleCrop = async () => {
    if (cropperInstanceRef.current) {
      const cropperCanvas = cropperInstanceRef.current.getCropperCanvas();
      const canvasEl = await cropperCanvas?.$toCanvas();
      const img = canvasEl?.toDataURL();
      onCrop?.(img);
    }
  };
  // initialize cropper options
  const initializeOptions = () => {
    if (isNonEmptyObject(grid)) setGrid(grid);
    if (isNonEmptyObject(canvas)) setCanvas(canvas);
    if (isNonEmptyObject(selection)) setSelection(selection);
    if (dragMode) setDragMode(dragMode);
  };
  useImperativeHandle(ref, () => ({
    cropper: cropperInstanceRef.current,
    handleCrop,
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
        initializeOptions();
      });
    }
  }, []);

  return (
    <>
      <div className={className} style={style}>
        <img ref={cropperRef} src={src} alt={alt} />
      </div>
      <div onClick={handleCrop}>ok</div>
    </>
  );
});

export default RCropper;
