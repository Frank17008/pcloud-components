import React, { useContext } from 'react';
import classNames from 'classnames';
import { LabelValueProps } from './interface';
import { ConfigContext, defaultPrefixCls } from '../ConfigProvider';
import './styles/index.less';

function LabelValue({ label, value, emptyValue, className, noWrap, noColon }: LabelValueProps) {
  const { getPrefixCls }: any = useContext(ConfigContext);
  const prefixCls = getPrefixCls('label-value');
  return (
    <div className={classNames(prefixCls, className)}>
      <span className={`${defaultPrefixCls}-label`}>
        {label}
        {noColon ? '' : ':'}
      </span>
      <span
        title={value}
        className={`${noWrap ? `${defaultPrefixCls}-value no-wrap` : `${defaultPrefixCls}-value`}`}
      >
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
