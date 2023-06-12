import { ConfigContext } from '@/ConfigProvider';
import { Modal, ModalProps } from 'antd';
import classNames from 'classnames';
import React, { useContext, useRef } from 'react';
import { IProps, IStyle } from './interface';
import './styles/index.less';

function LModal(props: IProps) {
  const { children, ...otherProps } = props;

  const { getPrefixCls }: any = useContext(ConfigContext);
  const containerRef = useRef<any>();

  const style: ModalProps = {
    getContainer: containerRef.current,
    width: otherProps.style?.width || '80%',
    centered: true,
    ...otherProps,
  };

  return (
    <div ref={containerRef} className={`${getPrefixCls('modal-container')}`}>
      <Modal {...style}>{children}</Modal>
    </div>
  );
}
export default LModal;
