import { ModalProps } from 'antd';
import { ReactNode } from 'react';

type IModalProps = Omit<ModalProps, 'width' | 'className'>;
export interface LModalProps extends IModalProps {
  children?: ReactNode | undefined;
  mode?: 'absolute' | 'relative';
}
