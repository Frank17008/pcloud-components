import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';
import classNames from 'classnames';
import { ConfigContext } from '../ConfigProvider';
import { LoadingInstanceProps } from './interface';
import './styles/index.less';

function Loading(props: LoadingInstanceProps) {
  const { tip = '数据请求中...' } = props;
  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
  const classname = getPrefixCls('loading');
  const wrapperClass = classNames({ [`${prefixCls}-loading`]: !!prefixCls }, classname);
  return (
    <div className={wrapperClass}>
      <div className="mask" />
      <div className="loading">
        <Spin tip={tip} />
      </div>
    </div>
  );
}
Loading.newInstance = function newNotificationInstance<T extends LoadingInstanceProps>(args: T) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(<Loading {...args} />, div);
  return {
    destroy() {
      ReactDOM.unmountComponentAtNode(div);
      document.body?.removeChild(div);
    },
  };
};

export default Loading;
