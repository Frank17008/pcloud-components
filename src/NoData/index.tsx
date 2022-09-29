import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../ConfigProvider';
import { NoDataProps } from './interface';
import './styles/index.less';

const defaultSrc =
  'data:image/png;base64,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';

const NoData = (props: NoDataProps) => {
  const { emptyText = '暂无结果', src = defaultSrc } = props;
  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
  const classname = getPrefixCls('nodata');
  const wrapperClass = classNames({ [`${prefixCls}-nodata`]: !!prefixCls }, classname);
  return (
    <div className={wrapperClass}>
      <img className="not-data-image" src={src} alt="图片加载失败" />
      <span className="noData-text">{emptyText}</span>
    </div>
  );
};
export default NoData;
