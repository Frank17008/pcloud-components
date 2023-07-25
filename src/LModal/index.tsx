import { ConfigContext } from '@/ConfigProvider';
import { Modal, ModalProps } from 'antd';
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { LModalProps } from './interface';
import './styles/index.less';
export { LModalProps };

function LModal(props: LModalProps) {
  const { children, mode = 'absolute', ...otherProps } = props;

  const { getPrefixCls }: any = useContext(ConfigContext);
  const containerRef = useRef<any>();

  const style: ModalProps = useMemo(() => {
    return {
      getContainer: containerRef.current,
      width: otherProps.style?.width || '80%',
      centered: true,

      ...otherProps,
    };
  }, [otherProps]);

  useEffect(() => {
    if (otherProps.open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [otherProps.open]);

  useEffect(() => {
    if (containerRef.current) {
      if (mode === 'absolute') {
        containerRef.current.parentElement.style.position = '';
      } else {
        containerRef.current.parentElement.style.position = 'relative';
      }
    }
  }, [mode, containerRef.current]);
  return (
    <div
      ref={containerRef}
      className={`${getPrefixCls('modal-container')} ${getPrefixCls(
        mode === 'absolute' || mode === 'panel'
          ? 'absolute-modal-container'
          : 'relative-modal-container',
      )}`}
    >
      <Modal {...style}>{children}</Modal>
    </div>
  );
}
export default LModal;
