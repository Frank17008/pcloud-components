import { ReactNode } from 'react';
import {
  InputProps,
  InputNumberProps,
  AutoCompleteProps,
  CascaderProps,
  SelectProps,
  TreeSelectProps,
  DatePickerProps,
  TimePickerProps,
  MentionProps,
  CheckboxProps,
  RadioProps,
  RateProps,
  SliderSingleProps,
  SwitchProps,
  TransferProps,
  UploadProps,
  ButtonProps,
  DividerProps,
  FormItemProps,
} from 'antd';

import { PasswordProps, TextAreaProps } from 'antd/lib/input';
import { RangePickerProps } from 'antd/lib/date-picker';
import { SliderRangeProps } from 'antd/lib/slider';

import { DInputProps } from '../DInput';
import { DSelectProps } from '../DSelect';
import { DCascaderProps } from '../DCascader';
import { DTreeSelectProps } from '../DTreeSelect';
import itemsMap from './DItemsMap';
import { DUploadProps } from '../DUpload';

type RenderTypeProps =
  | 'dInput'
  | 'input'
  | 'textArea'
  | 'password'
  | 'inputNumber'
  | 'autoComplete'
  | 'dSelect'
  | 'select'
  | 'dCascader'
  | 'cascader'
  | 'dTreeSelect'
  | 'treeSelect'
  | 'datePicker'
  | 'timePicker'
  | 'rangePicker'
  | 'mentions'
  | 'checkbox'
  | 'radio'
  | 'rate'
  | 'slider'
  | 'switch'
  | 'transfer'
  | 'upload'
  | 'dupload'
  | 'other'
  | 'button'
  | 'divider'
  | 'custom';

// eslint-disable-next-line no-use-before-define
export type InternalItemProps = DCustomItemProps &
  FormItemProps &
  DInputProps &
  InputProps &
  TextAreaProps &
  PasswordProps &
  InputNumberProps &
  AutoCompleteProps &
  DSelectProps &
  SelectProps &
  DCascaderProps &
  CascaderProps &
  DTreeSelectProps &
  TreeSelectProps &
  DatePickerProps &
  TimePickerProps &
  RangePickerProps &
  MentionProps &
  CheckboxProps &
  RadioProps &
  RateProps &
  SliderSingleProps &
  SliderRangeProps &
  SwitchProps &
  TransferProps<any> &
  UploadProps &
  DUploadProps &
  ButtonProps &
  DividerProps;

type DCustomItemProps = {
  /** 渲染类型 */
  renderType?: RenderTypeProps | 'other';
  /** label标签文本,同antd Form.Item的label,只能是string */
  label?: string;
  /** name标签文本,同antd Form.Item的name */
  name?: string;
  /** 自定义渲染函数 renderType等于custom、other时生效 */
  // eslint-disable-next-line no-unused-vars
  render?: (props: InternalItemProps, formItemProps: FormItemProps, allProps?: InternalItemProps) => ReactNode;
  /** Form.Item 的其他属性 */
  formItemProps?: FormItemProps;
  children?: ReactNode;
};

export type DItemProps =
  | FormItemProps
  | DCustomItemProps
  | DInputProps
  | InputProps
  | TextAreaProps
  | PasswordProps
  | InputNumberProps
  | AutoCompleteProps
  | DSelectProps
  | SelectProps
  | DCascaderProps
  | CascaderProps
  | DTreeSelectProps
  | TreeSelectProps
  | DatePickerProps
  | TimePickerProps
  | RangePickerProps
  | MentionProps
  | CheckboxProps
  | RadioProps
  | RateProps
  | SliderSingleProps
  | SliderRangeProps
  | SwitchProps
  | TransferProps<any>
  | UploadProps
  | DUploadProps
  | ButtonProps
  | DividerProps;

function DItem(props: InternalItemProps) {
  // @ts-ignore
  const { formItemProps, label = '', name, renderType, render, children, ...otherProps } = props;
  const _formItemProps: FormItemProps = { label, name, ...formItemProps };
  if (renderType && renderType !== 'custom') {
    return itemsMap[renderType](otherProps, _formItemProps, label, render, children, props);
  } else {
    return render ? render(otherProps, _formItemProps, props) : <>{children}</>;
  }
}

export default DItem;
