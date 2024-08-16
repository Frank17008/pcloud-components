import { DForm, DFormProps, DModal, DModalProps } from '@pointcloud/pcloud-components';

export type ModalFormProps = {
  modalProps: DModalProps & { width?: number };
  formProps: DFormProps;
  children?: React.ReactNode;
};

export default (props: ModalFormProps) => {
  const { modalProps = {}, formProps, children } = props;
  const { open, onOk } = modalProps || {};

  const [form] = DForm.useForm();

  const modalFooter = !!formProps?.disabled ? { footer: null } : {};
  const handleOk = () => {
    form.validateFields().then((values) => {
      onOk?.(values);
    });
  };
  return (
    <DModal
      open={open}
      style={{ height: 'auto' }}
      centered
      destroyOnClose={true}
      okText="确定"
      cancelText="取消"
      bodyStyle={{ maxHeight: '600px', overflowY: 'auto' }}
      {...modalFooter}
      {...{ ...modalProps, onOk: handleOk }}
    >
      {children}
      <DForm {...formProps} form={form} />
    </DModal>
  );
};
