import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useCallback, useMemo } from 'react';
import Cropper, { toKebabCase } from 'cropperjs';
import classNames from 'classnames';
import { RCropperElement, RCropperProps, RCropperSelection, RCropperGrid, RCropperCanvas, RCropperRef } from './interface';
import { ConfigContext } from '../ConfigProvider';
import { createCropperHandlers } from './handler';
import Toolbar from './toolbar';

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
  const { src, alt = 'image', className, style, grid, canvas, selection, dragMode, onCrop, onZoom, onRotate, onFlip, onReset, onCancelCrop } = props;

  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
  const classname = getPrefixCls('rcropper');
  const wrapperClass = classNames({ [`${prefixCls}-rcropper`]: !!prefixCls }, classname, className);

  const cropperRef = useRef<HTMLImageElement>(null);
  const cropperInstanceRef = useRef<Cropper | null>(null);
  const imgTransformRef = useRef<number[]>();

  const setCropperElementAttributes = useCallback((elementGetter: (_cropper: Cropper) => RCropperElement, props: Record<string, unknown>, nextTick = false) => {
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
  }, []);

  const setGrid = useCallback((_grid: RCropperGrid) => {
    setCropperElementAttributes((cropper) => cropper.getCropperSelection()?.querySelector('cropper-grid') as RCropperElement, _grid);
  }, []);
  const setSelection = useCallback((_selection: RCropperSelection) => {
    setCropperElementAttributes((cropper) => cropper.getCropperSelection(), _selection, true);
  }, []);
  const setCanvas = useCallback((_canvas: RCropperCanvas) => {
    setCropperElementAttributes((cropper) => cropper.getCropperCanvas(), _canvas, true);
  }, []);
  const setDragMode = (_dragMode: RCropperProps['dragMode']) => {
    if (cropperInstanceRef.current) {
      const selectionDom = cropperInstanceRef.current.getCropperSelection();
      const handleDom = selectionDom?.querySelector('cropper-handle');
      handleDom?.setAttribute('action', _dragMode || 'crop');
    }
  };
  // initialize cropper options
  const initializeOptions = useCallback(() => {
    if (isNonEmptyObject(grid)) setGrid(grid);
    if (isNonEmptyObject(canvas)) setCanvas(canvas);
    if (isNonEmptyObject(selection)) setSelection(selection);
    if (dragMode) setDragMode(dragMode);
  }, [dragMode, grid, canvas, selection]);

  const handleAction = useMemo(
    () =>
      createCropperHandlers(cropperInstanceRef, imgTransformRef, {
        onCrop,
        onZoom,
        onRotate,
        onFlip,
        onReset,
        onCancelCrop,
      }),
    [onCrop, onZoom, onRotate, onFlip, onReset, onCancelCrop],
  );
  useImperativeHandle(
    ref,
    (): RCropperRef => ({
      cropper: cropperInstanceRef.current,
      image: cropperInstanceRef.current?.getCropperImage() ?? null,
      canvas: cropperInstanceRef.current?.getCropperCanvas() ?? null,
      selection: cropperInstanceRef.current?.getCropperSelection() ?? null,
    }),
  );
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
