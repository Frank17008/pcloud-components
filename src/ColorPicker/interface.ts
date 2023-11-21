type Hlsa = { h: number; s: number; l: number; a?: number };
type Rgba = { r: number; b: number; g: number; a?: number };

interface ComponentProps {
  /**
   * 组件的颜色状态值
   */
  color?: string | Hlsa | Rgba | undefined;
  /**
   * 颜色值变化时触发
   * @param v 色值对象
   */
  onChange?: (v) => void;
  /**
   * 颜色变化完成时触发
   * @param v 颜色值 rgba
   */
  onChangeComplete?: (v) => void;
}

export interface ColorPickerProps extends ComponentProps {
  /**
   * 容器类名
   */
  className?: string;
  /**
   * 初始颜色，触发按钮的默认色
   */
  initColor?: string;
  /**
   * 点击取消时的回调函数
   */
  onCancel?: () => void;
  /**
   * 点击确定时的回调函数
   */
  onConfirm: (v) => void;
}

export interface TwitterPickerProps extends ComponentProps {
  /**
   * 单个色块的宽度(px)
   * @default 276
   */
  width?: string;
  /**
   * 默认展示的颜色值集合
   * @default ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF']
   */
  colors?: string[];
  /**
   * 小三角形位置
   */
  triangle?: 'hide' | 'top-left' | 'top-right';
}

export interface HuePickerProps extends ComponentProps {
  /**
   * 自定义滑块
   */
  pointer?: React.ReactNode;
  /**
   * 方向
   */
  direction?: 'horizontal' | 'vertical';
}

export interface AlphaPickerProps extends ComponentProps {
  /**
   * 单个色块的宽度(px)
   * @default 316
   */
  width?: string;
  /**
   * 单个色块的高度(px)
   * @default 16
   */
  height?: string;
  /**
   * 方向
   * @default horizontal
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * 自定义滑块
   */
  pointer?: React.ReactNode;
}
export interface SliderPickerProps extends ComponentProps {
  /**
   * 自定义滑块
   */
  pointer?: React.ReactNode;
}
export interface CompactPickerProps extends ComponentProps {
  /**
   * 默认展示的颜色值集合
   * @default ['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E']
   */
  colors?: string[];
}
export interface CirclePickerProps extends ComponentProps {
  /**
   * 单个色块的宽度(px)
   * @default 252
   */
  width?: string;
  /**
   * 默认展示的颜色值集合
   * @default ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]
   */
  colors?: string[];
  /**
   * 圆圈大小
   * @default 28
   */
  circleSize?: number;
  /**
   * 圆圈之间的间隔(px)
   * @default 14
   */
  circleSpacing?: number;
}

export interface BlockPickerProps extends ComponentProps {
  /**
   * 单个色块的宽度(px)
   * @default 170
   */
  width?: string;
  /**
   * 默认展示的颜色值集合
   * @default ['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8']
   */
  colors?: string[];
  /**
   * 小三角的位置
   * @default 'top'
   */
  triangle?: 'hide' | 'top';
}

export interface ChromePickerProps extends ComponentProps {
  /**
   * 是否显示不透明度的配置项
   * @default false
   */
  disableAlpha?: boolean;
}

export type ColorPickerType = ColorPickerProps;
export type TwitterPickerType = TwitterPickerProps;
export type HuePickerType = HuePickerProps;
export type AlphaPickerType = AlphaPickerProps;
export type SliderPickerType = SliderPickerProps;
export type CompactPickerType = CompactPickerProps;
export type CirclePickerType = CirclePickerProps;
export type BlockPickerType = BlockPickerProps;
export type ChromePickerType = ChromePickerProps;
