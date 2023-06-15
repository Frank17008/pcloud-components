/*
 * @Author       : wangfeihu
 * @Date         : 2023-05-16 10:08:26
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-05-26 09:44:03
 * @Description  : 基于antd的Input组件
 */
import React, { ChangeEvent, useRef, forwardRef, useState, useContext } from 'react';

import { Input, InputProps, InputRef } from 'antd';

import { ConfigContext } from '@/ConfigProvider';

export type DInputProps = Omit<InputProps, 'onChange'> & {
  /** 输入框内容变化时的回调 */
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  /** 是否启用合成输入 */
  enableCompose?: boolean;
  /** 是否开启防抖： true表示800毫秒，false或0表示不开启 */
  debounce?: boolean | number;
};

function InternalInput(props: DInputProps, ref: React.Ref<InputRef>) {
  const {
    className = '',
    onChange,
    onCompositionStart,
    onCompositionEnd,
    value: initValue,
    debounce = false,
    enableCompose = true,
    ...otherProps
  } = props;

  const { getPrefixCls }: any = useContext(ConfigContext);

  const [value, setValue] = useState(initValue);
  const [composeFlag, setComposeFlag] = useState<boolean>(false);
  const debounceRef = useRef<any>();

  const _className = `${getPrefixCls('input')} ${className}`;

  // debounce: 默认800ms，false或0表示不开启
  const _debounce = getDebounceTime(debounce);

  const emitChange = (_value, e) => {
    if (_debounce > 0) {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onChange?.(_value, e);
      }, _debounce);
    } else {
      onChange?.(_value, e);
    }
  };

  // 监听用户onChange事件（如果正在进行合成输入，则不响应用户事件）
  const _onChange = (e) => {
    const _value = e.target.value;
    setValue(_value);
    if (!composeFlag) emitChange(_value, e);
  };

  // 监听合成输入开始事件(执行用户事件并置合成标记为true)
  const _onCompositionStart = (e) => {
    onCompositionStart?.(e);
    enableCompose && setComposeFlag(true);
  };

  // 监听合成输入结束事件(执行用户事件并置合成标记为false,同时触发用户onChange事件)
  const _onCompositionEnd = (e) => {
    onCompositionEnd?.(e);
    if (enableCompose) {
      setComposeFlag(false);
      emitChange(e.target.value, e);
    }
  };

  return (
    <Input
      {...otherProps}
      className={_className}
      ref={ref}
      value={value}
      onChange={_onChange}
      onCompositionStart={_onCompositionStart}
      onCompositionEnd={_onCompositionEnd}
    />
  );
}

// 获取防抖超时时间，debounce: 默认800ms，false或0表示不开启
function getDebounceTime(debounce?: boolean | number, defaultValue = 800) {
  if (debounce === true) {
    return defaultValue;
  } else if (debounce === false) {
    return 0;
  } else {
    return typeof debounce === 'number' ? debounce : defaultValue;
  }
}

const DInput = forwardRef(InternalInput);
export default DInput;
