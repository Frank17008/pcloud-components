import React, { useContext } from 'react';
import classNames from 'classnames';
import { LabelValueProps as ILabelValueProps } from './interface';
import { ConfigContext, defaultPrefixCls } from '../ConfigProvider';
import './styles/index.less';

export type LabelValueProps = ILabelValueProps;

function LabelValue({ label, value, emptyValue, className, noWrap, noColon }: ILabelValueProps) {
  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
  const classname = getPrefixCls('label-value');
  const wrapperClass = classNames({ [`${prefixCls}-label-value`]: !!prefixCls }, classname, className);
  return (
    <div className={wrapperClass}>
      <span className={`${defaultPrefixCls}-label`}>
        {label}
        {noColon ? '' : ':'}
      </span>
      <span title={value} className={`${noWrap ? `${defaultPrefixCls}-value no-wrap` : `${defaultPrefixCls}-value`}`}>
        {value || emptyValue || '暂无'}
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
