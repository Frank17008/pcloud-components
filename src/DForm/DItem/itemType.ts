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

type DInputItemProps = { renderType?: 'dInput' } & DItemBaseProps & DInputProps;
type InputItemProps = { renderType?: 'input' } & DItemBaseProps & InputProps;
type TextAreaItemProps = { renderType?: 'textArea' } & DItemBaseProps & TextAreaProps;
type PasswordItemProps = { renderType?: 'password' } & DItemBaseProps & PasswordProps;
type InputNumberItemProps = { renderType?: 'inputNumber' } & DItemBaseProps & InputNumberProps;
type AutoCompleteItemProps = { renderType?: 'autoComplete' } & DItemBaseProps & AutoCompleteProps;
type DSelectItemProps = { renderType?: 'dSelect' } & DItemBaseProps & DSelectProps;
type SelectItemProps = { renderType?: 'select' } & DItemBaseProps & SelectProps;
type DCascaderItemProps = { renderType?: 'dCascader' } & DItemBaseProps & DCascaderProps;
type CascaderItemProps = { renderType?: 'cascader' } & DItemBaseProps & CascaderProps;
type DTreeSelectItemProps = { renderType?: 'dTreeSelect' } & DItemBaseProps & DTreeSelectProps;
type TreeSelectItemProps = { renderType?: 'treeSelect' } & DItemBaseProps & TreeSelectProps;
type DatePickerItemProps = { renderType?: 'datePicker' } & DItemBaseProps & DatePickerProps;
type TimePickerItemProps = { renderType?: 'timePicker' } & DItemBaseProps & TimePickerProps;
type RangePickerItemProps = { renderType?: 'rangePicker' } & DItemBaseProps & RangePickerProps;
type MentionItemProps = { renderType?: 'mentions' } & DItemBaseProps & MentionProps;
type CheckboxItemProps = { renderType?: 'checkbox' } & DItemBaseProps & CheckboxProps;
type DCheckboxGroupProps = { renderType?: 'checkboxGroup' } & DItemBaseProps & CheckboxGroupProps;
type RadioItemProps = { renderType?: 'radio' } & DItemBaseProps & RadioProps;
type DRadioGorupProps = { renderType?: 'radioGroup' } & DItemBaseProps & RadioGroupProps;
type RateItemProps = { renderType?: 'rate' } & DItemBaseProps & RateProps;
type SliderItemProps = { renderType?: 'slider' } & DItemBaseProps & SliderSingleProps;
type SwitchItemProps = { renderType?: 'switch' } & DItemBaseProps & SwitchProps;
type TransferItemProps = { renderType?: 'transfer' } & DItemBaseProps & TransferProps<any>;
type UploadItemProps = { renderType?: 'upload' } & DItemBaseProps & UploadProps;
type DUploadItemProps = { renderType?: 'dUpload' } & DItemBaseProps & DUploadProps;
type ButtonItemProps = { renderType?: 'button' } & DItemBaseProps & ButtonProps;
type DividerItemProps = { renderType?: 'divider' } & DItemBaseProps & DividerProps;

export type DItemProps =
  | CustomItemProps
  | DInputItemProps
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
