import * as React from 'react';
import classNames from 'classnames';
import './index.less';
import { ConfigContext, defaultPrefixCls } from '../ConfigProvider';

function ErrorBoundary<T>({ err }: { err?: T }) {
  const { getPrefixCls }: any = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('error-boundary');

  function refreshPage() {
    window.location.reload();
  }
  return (
    <div className={classNames(`${defaultPrefixCls}-${prefixCls}`)}>
      <h2>抱歉,系统出现问题.</h2>
      <div className="error-text">{err && JSON.stringify(err)}</div>
      <div className="error-refresh" onClick={refreshPage}>
        重新刷新浏览器
      </div>
    </div>
  );
}

export default ErrorBoundary;
