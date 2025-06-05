import { Spin } from 'antd';
import classNames from 'classnames';
import { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ConfigContext } from '../ConfigProvider';
import { LoadingInstanceProps } from './interface';
import './styles/index.less';

function Loading(props: LoadingInstanceProps) {
  const { tip = '数据请求中...' } = props;
  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
  const classname = getPrefixCls('loading');
  const wrapperClass = classNames({ [`${prefixCls}-loading`]: !!prefixCls }, classname);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  return (
    <div className={wrapperClass}>
      <div className="mask" />
      <div className="loading">
        <Spin {...props} />
      </div>
    </div>
  );
}

Loading.newInstance = function newNotificationInstance(args: LoadingInstanceProps) {
  const { container, ...otherProps } = args || {};
  const div = document.createElement('div');
  // eslint-disable-next-line react/no-find-dom-node
  const element: any = ReactDOM.findDOMNode(container);
  if (element) {
    element.appendChild(div);
    element.style.position = 'relative';
  } else {
    document.body.appendChild(div);
  }
  ReactDOM.render(<Loading {...otherProps} />, div);

  return {
    destroy() {
      ReactDOM.unmountComponentAtNode(div);
      if (element) {
        element?.removeChild(div);
      } else {
        document.body.removeChild(div);
      }
    },
  };
};

export default Loading;
