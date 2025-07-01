import type { CropperGrid, CropperSelection, CropperImage, CropperCanvas, CropperHandle } from 'cropperjs';

export type RCropperGrid = Partial<Pick<CropperGrid, 'rows' | 'columns'>>;

export type RCropperSelection = Partial<
  Pick<CropperSelection, 'x' | 'y' | 'width' | 'height' | 'aspectRatio' | 'initialAspectRatio' | 'zoomable' | 'resizable'>
>;

export type RCropperImage = Partial<Pick<CropperImage, 'rotatable' | 'scalable' | 'skewable' | 'translatable'>>;

export type RCropperCanvas = Partial<Pick<CropperCanvas, 'scaleStep' | 'disabled'>>;

export interface RCropperEvents {
  onCrop?(_src: string | undefined, _file?: File): void;
  // eslint-disable-next-line no-unused-vars
  onZoom?(imgData: number[] | undefined): void;
  // eslint-disable-next-line no-unused-vars
  onRotate?(imgData: number[] | undefined): void;
  // eslint-disable-next-line no-unused-vars
  onFlip?(imgData: number[] | undefined): void;
  // eslint-disable-next-line no-unused-vars
  onReset?(imgData: number[] | undefined): void;
  // eslint-disable-next-line no-unused-vars
  onCancelCrop?(selectionData: { x: number; y: number; width: number; height: number }): void;
}
export interface RCropperProps extends RCropperEvents {
  /**
   * 图片的源地址
   * @description 可以是本地图片路径或网络图片URL
   */
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  /**
   * 拖拽模式
   * @default 'crop'
   * @description 'crop' - 裁剪模式, 'move' - 移动模式, 'none' - 禁用拖拽
   */
  dragMode?: 'crop' | 'move' | 'none';
  grid?: RCropperGrid;
  /**
   * 裁剪区域的配置
   * @description 可以设置裁剪区域的宽度、高度、纵横比等属性
   */
  selection?: RCropperSelection;
  /**
   * 图片的配置
   * @description 可以设置图片的旋转、缩放、倾斜、平移等属性
   */
  image?: RCropperImage;
  /**
   * 画布的配置
   * @description 可以设置画布的缩放步长、禁用状态等属性
   */
  canvas?: RCropperCanvas;
}

export type RCropperElement = CropperCanvas | CropperGrid | CropperSelection | CropperImage | CropperHandle | null;
