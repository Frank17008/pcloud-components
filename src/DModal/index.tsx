import { ConfigContext } from '@pointcloud/pcloud-components/ConfigProvider';
import { Modal, ModalProps } from 'antd';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { DModalProps, DeleteModalProps } from './interface';
import './styles/index.less';

function DModal(props: DModalProps) {
  const { children, mode = 'absolute', ...otherProps } = props;
  const { getPrefixCls }: any = useContext(ConfigContext);
  const containerRef = useRef<any>();

  const style: ModalProps = useMemo(() => {
    return {
      getContainer: containerRef.current,
      width: otherProps.style?.width || '80%',
      centered: true,
      maskClosable: false,
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
        mode === 'absolute' || mode === 'panel' ? 'absolute-modal-container' : 'relative-modal-container',
      )}`}
    >
      <Modal {...style}>{children}</Modal>
    </div>
  );
}

DModal.useModal = Modal.useModal;
DModal.info = Modal.info;
DModal.success = Modal.success;
DModal.error = Modal.error;
DModal.warning = Modal.warning;
DModal.confirm = Modal.confirm;
DModal.delete = ({ content, onOk, onCancel, zIndex }: DeleteModalProps) => {
  return DModal.confirm({
    title: '删除提示',
    content,
    centered: true,
    closable: true,
    okText: '确定',
    cancelText: '取消',
    className: 'pui-modal-container',
    onOk,
    onCancel,
    zIndex,
  });
};

export default DModal;
