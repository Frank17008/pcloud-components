import { ReactNode } from 'react';
import { ModalProps } from 'antd';

type IModalProps = Omit<ModalProps, 'width' | 'className'>;

export interface DModalProps extends IModalProps {
  children?: ReactNode | undefined;
  mode?: 'absolute' | 'relative' | 'panel';
}

export interface DeleteModalProps {
  content?: React.ReactNode;
  onOk?: (...args: any[]) => any;
  onCancel?: (...args: any[]) => any;
  zIndex?: number;
}
