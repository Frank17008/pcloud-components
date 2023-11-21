/*
 * @Author       : frank
 * @Date         : 2023-11-21
 * @Description  : 多模式颜色选择器组件
 */
import { useState, useContext } from 'react';
import classNames from 'classnames';
import { Popconfirm } from 'antd';
import {
  SketchPicker,
  PhotoshopPicker,
  SliderPicker,
  AlphaPicker,
  BlockPicker,
  ChromePicker,
  CirclePicker,
  CompactPicker,
  HuePicker,
  TwitterPicker,
} from 'react-color';
import { ConfigContext } from '../ConfigProvider';
import {
  ColorPickerProps,
  TwitterPickerProps,
  HuePickerProps,
  AlphaPickerProps,
  BlockPickerProps,
  ChromePickerProps,
  CompactPickerProps,
  CirclePickerProps,
  SliderPickerProps,
} from './interface';
import './index.less';

const ColorPicker = (props: ColorPickerProps) => {
  const { className, initColor = '#ff0000', onChange, onCancel, onConfirm, onChangeComplete } = props;
  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
  const classname = getPrefixCls('color-picker');
  const wrapperClass = classNames({ [`${prefixCls}-color-picker`]: !!prefixCls }, classname, className);
  const triggerClass = classNames({ [`${className}-trigger`]: !!className }, 'trigger');
  const [color, setColor] = useState<any>(initColor);
  const [finialColor, setFinialColor] = useState(initColor);
  const handleConfirm = () => {
    const _color = color?.a ? `rgba(${color?.r},${color?.g},${color?.b},${color?.a})` : initColor;
    setFinialColor(_color);
    // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
    onConfirm && onConfirm(_color);
  };
  const handleChange = (e) => {
    setColor(e.rgb);
    // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
    onChange && onChange(e);
  };
  const handleChangeComplete = (v) => {
    const _color = color?.a ? `rgba(${color?.r},${color?.g},${color?.b},${color?.a})` : initColor;
    // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
    onChangeComplete && onChangeComplete(_color);
  };
  return (
    <Popconfirm
      overlayClassName={wrapperClass}
      icon={null}
      title={<SketchPicker className="picker" color={color} onChange={handleChange} onChangeComplete={handleChangeComplete} />}
      onConfirm={handleConfirm}
      onCancel={onCancel}
      okText="确定"
      cancelText="取消"
    >
      <span className={triggerClass} style={{ background: finialColor }} />
    </Popconfirm>
  );
};

const PsPicker = ({ className, initColor, onConfirm, onChange, onChangeComplete, title }: ColorPickerProps & { title?: string }) => {
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [color, setColor] = useState<any>(initColor);
  const [finialColor, setFinialColor] = useState(initColor);
  const triggerClass = classNames({ [`${className}-trigger`]: !!className }, 'trigger');
  const onCancel = () => {
    setShowColorPicker(false);
  };
  const onOk = () => {
    const _color = color?.r ? `rgba(${color?.r},${color?.g},${color?.b},${color?.a})` : initColor;
    setShowColorPicker(false);
    setFinialColor(_color);
    // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
    onConfirm && onConfirm(color);
  };
  const handleClick = () => {
    setShowColorPicker(true);
  };
  const handleChange = (e) => {
    setColor(e.rgb);
    // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
    onChange && onChange(e);
  };
  const handleChangeComplete = () => {
    const _color = color?.a ? `rgba(${color?.r},${color?.g},${color?.b},${color?.a})` : initColor;
    // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
    onChangeComplete && onChangeComplete(_color);
  };
  return (
    <>
      <span className={triggerClass} style={{ background: finialColor }} onClick={handleClick} />
      {showColorPicker ? (
        <PhotoshopPicker
          className="ps-picker"
          color={color}
          header={title}
          onChange={handleChange}
          onChangeComplete={handleChangeComplete}
          onCancel={onCancel}
          onAccept={onOk}
        />
      ) : null}
    </>
  );
};

ColorPicker.PSPicker = (props: ColorPickerProps & { title?: string }) => <PsPicker {...props} />;
ColorPicker.SliderPicker = (props: SliderPickerProps) => <SliderPicker {...props} />;
ColorPicker.AlphaPicker = (props: AlphaPickerProps) => <AlphaPicker {...props} />;
ColorPicker.BlockPicker = (props: BlockPickerProps) => <BlockPicker {...props} />;
ColorPicker.ChromePicker = (props: ChromePickerProps) => <ChromePicker {...props} />;
ColorPicker.CirclePicker = (props: CirclePickerProps) => <CirclePicker {...props} />;
ColorPicker.CompactPicker = (props: CompactPickerProps) => <CompactPicker {...props} />;
ColorPicker.HuePicker = (props: HuePickerProps) => <HuePicker {...props} />;
ColorPicker.TwitterPicker = (props: TwitterPickerProps) => <TwitterPicker {...props} />;

export default ColorPicker;
