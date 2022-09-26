import * as React from 'react';
import './index.less';

function ErrorBoundary<T>({ err }: { err?: T }) {
  function refreshPage() {
    window.location.reload();
  }
  return (
    <div className="error-message">
      <h2>抱歉,系统出现问题.</h2>
      <div className="error-text">{err && JSON.stringify(err)}</div>
      <div className="error-refresh" onClick={refreshPage}>
        重新刷新浏览器
      </div>
    </div>
  );
}

export default ErrorBoundary;
