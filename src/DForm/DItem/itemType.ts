/*
 * @Author       : wangfeihu
 * @Date         : 2023-07-12 16:46:29
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-07-13 17:14:32
 * @Description  : DItem的类型声明
 */
import { HTMLAttributes, ReactNode } from 'react';
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
  RadioGroupProps,
  ColProps,
} from 'antd';

import { PasswordProps, TextAreaProps } from 'antd/lib/input';
import { RangePickerProps } from 'antd/lib/date-picker';
import { CheckboxGroupProps } from 'antd/lib/checkbox';

import { DInputProps } from '../../DInput';
import { DSelectProps } from '../../DSelect';
import { DCascaderProps } from '../../DCascader';
import { DTreeSelectProps } from '../../DTreeSelect';
import { DUploadProps } from '../../DUpload';
import { IPAddressProps } from '../../IPAddress';

export type DItemBaseProps = {
  /** label标签文本,同antd Form.Item的label,只能是string */
  label?: string;
  /** name标签文本,同antd Form.Item的name */
  name?: string | number | (string | number)[];
  /** Form.Item 的其他属性 */
  formItemProps?: FormItemProps & { grid?: Omit<ColProps, 'prefixCls'> };
};

/** 自定义渲染的DItem */
type CustomItemProps = DItemBaseProps &
  HTMLAttributes<HTMLElement> & {
    /** 渲染类型 */
    renderType?: 'custom' | 'other';
    /** 自定义渲染函数 */
    // eslint-disable-next-line no-unused-vars, no-use-before-define
    render?: (props: any, formItemProps: FormItemProps, allProps?: DItemProps) => ReactNode;
    children?: ReactNode;
    [key: string]: any;
  };

export type DInputItemProps = { renderType?: 'dInput' } & DItemBaseProps & DInputProps;
export type DIpAddressProps = { renderType?: 'ipAddress' } & DItemBaseProps & IPAddressProps;
export type InputItemProps = { renderType?: 'input' } & DItemBaseProps & InputProps;
export type TextAreaItemProps = { renderType?: 'textArea' } & DItemBaseProps & TextAreaProps;
export type PasswordItemProps = { renderType?: 'password' } & DItemBaseProps & PasswordProps;
export type InputNumberItemProps = { renderType?: 'inputNumber' } & DItemBaseProps & InputNumberProps;
export type AutoCompleteItemProps = { renderType?: 'autoComplete' } & DItemBaseProps & AutoCompleteProps;
export type DSelectItemProps = { renderType?: 'dSelect' } & DItemBaseProps & DSelectProps;
export type SelectItemProps = { renderType?: 'select' } & DItemBaseProps & SelectProps;
export type DCascaderItemProps = { renderType?: 'dCascader' } & DItemBaseProps & DCascaderProps;
export type CascaderItemProps = { renderType?: 'cascader' } & DItemBaseProps & CascaderProps;
export type DTreeSelectItemProps = { renderType?: 'dTreeSelect' } & DItemBaseProps & DTreeSelectProps;
export type TreeSelectItemProps = { renderType?: 'treeSelect' } & DItemBaseProps & TreeSelectProps;
export type DatePickerItemProps = { renderType?: 'datePicker' } & DItemBaseProps & DatePickerProps;
export type TimePickerItemProps = { renderType?: 'timePicker' } & DItemBaseProps & TimePickerProps;
export type RangePickerItemProps = { renderType?: 'rangePicker' } & DItemBaseProps & RangePickerProps;
export type MentionItemProps = { renderType?: 'mentions' } & DItemBaseProps & MentionProps;
export type CheckboxItemProps = { renderType?: 'checkbox' } & DItemBaseProps & CheckboxProps;
export type DCheckboxGroupProps = { renderType?: 'checkboxGroup' } & DItemBaseProps & CheckboxGroupProps;
export type RadioItemProps = { renderType?: 'radio' } & DItemBaseProps & RadioProps;
export type DRadioGorupProps = { renderType?: 'radioGroup' } & DItemBaseProps & RadioGroupProps;
export type RateItemProps = { renderType?: 'rate' } & DItemBaseProps & RateProps;
export type SliderItemProps = { renderType?: 'slider' } & DItemBaseProps & SliderSingleProps;
export type SwitchItemProps = { renderType?: 'switch' } & DItemBaseProps & SwitchProps;
export type TransferItemProps = { renderType?: 'transfer' } & DItemBaseProps & TransferProps<any>;
export type UploadItemProps = { renderType?: 'upload' } & DItemBaseProps & UploadProps;
export type DUploadItemProps = { renderType?: 'dUpload' } & DItemBaseProps & DUploadProps;
export type ButtonItemProps = { renderType?: 'button' } & DItemBaseProps & ButtonProps;
export type DividerItemProps = { renderType?: 'divider' } & DItemBaseProps & DividerProps;

export type DItemProps =
  | CustomItemProps
  | DInputItemProps
  | DIpAddressProps
  | InputItemProps
  | TextAreaItemProps
  | PasswordItemProps
  | InputNumberItemProps
  | AutoCompleteItemProps
  | DSelectItemProps
  | SelectItemProps
  | DCascaderItemProps
  | CascaderItemProps
  | DTreeSelectItemProps
  | TreeSelectItemProps
  | DatePickerItemProps
  | TimePickerItemProps
  | RangePickerItemProps
  | MentionItemProps
  | CheckboxItemProps
  | CheckboxGroupProps
  | DCheckboxGroupProps
  | RadioItemProps
  | RadioGroupProps
  | DRadioGorupProps
  | RateItemProps
  | SliderItemProps
  | SwitchItemProps
  | TransferItemProps
  | UploadItemProps
  | DUploadItemProps
  | ButtonItemProps
  | DividerItemProps;
