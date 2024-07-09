import * as React from 'react';
import classNames from 'classnames';
import './index.less';
import { ConfigContext } from '../ConfigProvider';

function ErrorBoundary({ err }: { err?: any }) {
  const { prefixCls, getPrefixCls }: any = React.useContext(ConfigContext);
  const classname = getPrefixCls('error-boundary');
  const wrapperClass = classNames({ [`${prefixCls}-error-boundary`]: !!prefixCls }, classname);

  function refreshPage() {
    window.location.reload();
  }
  return (
    <div className={wrapperClass}>
      <h2>抱歉,系统出现问题.</h2>
      <div className="error-text">{err && JSON.stringify(err)}</div>
      <div className="error-refresh" onClick={refreshPage}>
        重新刷新浏览器
      </div>
    </div>
  );
}

export default ErrorBoundary;
