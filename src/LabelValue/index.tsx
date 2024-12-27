import React, { useContext } from 'react';
import classNames from 'classnames';
import { ILabelValueProps } from './interface';
import { ConfigContext, defaultPrefixCls } from '../ConfigProvider';
import './styles/index.less';

function LabelValue({ label, value, emptyValue, className, noWrap, noColon, formatter, style }: ILabelValueProps) {
  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
  const classname = getPrefixCls('label-value');
  const wrapperClass = classNames({ [`${prefixCls}-label-value`]: !!prefixCls }, classname, className);
  const title = typeof value === 'string' ? value : undefined;
  return (
    <div style={style} className={wrapperClass}>
      <span className={`${defaultPrefixCls}-label`}>
        {label}
        {noColon ? '' : ':'}
      </span>
      <span title={title} className={`${noWrap ? `${defaultPrefixCls}-value no-wrap` : `${defaultPrefixCls}-value`}`}>
        {formatter && typeof formatter === 'function' ? formatter(value) : value || emptyValue}
      </span>
    </div>
  );
}

LabelValue.defaultProps = {
  className: '',
  label: '',
  value: '',
  emptyValue: '-',
  noWrap: false,
  noColon: false,
};

export default React.memo(LabelValue);
