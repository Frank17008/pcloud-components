import { ModalProps } from 'antd';
import { ReactNode } from 'react';

type IModalProps = Omit<ModalProps, 'width' | 'className'>;
export interface IProps extends IModalProps {
  children?: ReactNode | undefined;
  mode?: 'absolute' | 'relative';
}
