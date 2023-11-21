/*
 * @Author       : frank
 * @Date         : 2023-11-21
 * @Description  : 颜色选择器组件
 */
import { useState, useContext } from 'react';
import classNames from 'classnames';
import { Popconfirm } from 'antd';
import { SketchPicker } from 'react-color';
import { ConfigContext } from '../ConfigProvider';
import { IColorPicker } from './interface';
import './index.less';

export default ({ className, initColor, onChange, onCancel, onConfirm }: IColorPicker) => {
  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
  const classname = getPrefixCls('color-picker');
  const wrapperClass = classNames({ [`${prefixCls}-color-picker`]: !!prefixCls }, classname, className);
  const triggerClass = classNames({ [`${className}-trigger`]: !!className }, 'trigger');

  const [color, setColor] = useState(initColor);

  const handleConfirm = () => {
    const _color = `rgba(${color?.r},${color?.g},${color?.b},${color?.a})`;
    onConfirm(_color);
  };
  const onChangeComplete = (e) => {
    setColor(e.rgb);
    onChange && onChange(e);
  };

  return (
    <Popconfirm
      overlayClassName={wrapperClass}
      icon={null}
      title={<SketchPicker className="picker" color={color} onChangeComplete={onChangeComplete} />}
      onConfirm={handleConfirm}
      onCancel={onCancel}
      okText="确定"
      cancelText="取消"
    >
      <span className={triggerClass} style={{ background: initColor }} />
    </Popconfirm>
  );
};
