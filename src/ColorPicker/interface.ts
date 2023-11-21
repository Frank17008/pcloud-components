export interface IColorPicker {
  className?: string;
  initColor?: any;
  onChange?: (v) => void;
  onCancel?: () => void;
  onConfirm: (v: string) => void;
}
