/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import Cropper from 'cropperjs';
import { RCropperProps, RCropperSelection, RCropperGrid, RCropperCanvas } from './interface';

const isNonEmptyObject = (obj: unknown): obj is Record<string, unknown> => {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj) && Object.keys(obj).length > 0;
};

const camelToKebab = (key: string): string => {
  return key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
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
    // eslint-disable-next-line no-unused-expressions
    value ? element.setAttribute(attrName, '') : element.removeAttribute(attrName);
  } else if (value === null || value === undefined) {
    element.removeAttribute(attrName);
  } else {
    element.setAttribute(attrName, String(value));
  }
};

const RCropper = forwardRef((props: RCropperProps, ref: React.Ref<unknown>) => {
  const { src, alt = 'image', className, style, grid, canvas, selection, dragMode } = props;
  const cropperRef = useRef<HTMLImageElement>(null);
  const cropperInstanceRef = useRef<Cropper | null>(null);

  const setGrid = (_grid: RCropperGrid) => {
    if (cropperInstanceRef.current) {
      const selectionDom = cropperInstanceRef.current.getCropperSelection();
      const gridDom = selectionDom?.querySelector('cropper-grid');
      Object.keys(_grid).forEach((key) => {
        const kebabKey = camelToKebab(key);
        if (_grid[key] !== undefined) {
          setElementAttribute(gridDom, kebabKey, _grid[key]);
        }
      });
    }
  };
  const setSelection = (_selection: RCropperSelection) => {
    if (cropperInstanceRef.current) {
      const selectionDom = cropperInstanceRef.current.getCropperSelection();
      Object.keys(_selection).forEach((key) => {
        const kebabKey = camelToKebab(key);
        if (_selection[key] !== undefined) {
          selectionDom?.$nextTick(() => {
            setElementAttribute(selectionDom, kebabKey, _selection[key]);
          });
        }
      });
    }
  };
  const setCanvas = (_canvas: RCropperCanvas) => {
    if (cropperInstanceRef.current && _canvas) {
      const canvasDom = cropperInstanceRef.current.getCropperCanvas();
      Object.keys(_canvas).forEach((key) => {
        if (_canvas[key] !== undefined) {
          const kebabKey = camelToKebab(key);
          canvasDom?.$nextTick(() => {
            setElementAttribute(canvasDom, kebabKey, _canvas[key]);
          });
        }
      });
    }
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
  useImperativeHandle(ref, () => ({ cropper: cropperInstanceRef.current }));
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
        initializeOptions();
      });
    }
  }, []);

  return (
    <div className={className} style={style}>
      <img ref={cropperRef} src={src} alt={alt} />
    </div>
  );
});

export default RCropper;
