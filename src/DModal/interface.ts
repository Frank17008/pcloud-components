import { ReactNode } from 'react';
import { ModalProps } from 'antd';

type IModalProps = Omit<ModalProps, 'width' | 'className'>;

export interface DModalProps extends IModalProps {
  children?: ReactNode | undefined;
  mode?: 'absolute' | 'relative' | 'panel';
}

export interface DeleteModalProps {
  content?: React.ReactNode;
  onOk?: <T>(..._args: T[]) => T;
  onCancel?: <T>(..._args: T[]) => T;
  zIndex?: number;
}
