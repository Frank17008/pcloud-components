import React from 'react';
import { LabelValueProps } from './interface';
import './styles/index.less';

function LabelValue({ label, value, emptyValue, className, noWrap, noColon }: LabelValueProps) {
  return (
    <div className={`pui-label-value ${className}`}>
      <span className="pui-label">
        {label}
        {noColon ? '' : ':'}
      </span>
      <span title={value} className={`${noWrap ? 'pui-value no-wrap' : 'pui-value'}`}>
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
