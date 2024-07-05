/*
 * @Author       : wangfeihu
 * @Date         : 2023-06-12 17:35:10
 * @LastEditors  : frank
 * @LastEditTime : 2023-12-20 15:40:13
 * @Description  : 根据renderType渲染对应的表单项组件
 */

import {
  AutoComplete,
  AutoCompleteProps,
  Button,
  ButtonProps,
  Cascader,
  CascaderProps,
  Checkbox,
  CheckboxProps,
  DatePicker,
  DatePickerProps,
  Divider,
  DividerProps,
  Form,
  FormItemProps,
  Input,
  InputNumber,
  InputNumberProps,
  InputProps,
  MentionProps,
  Mentions,
  Radio,
  RadioProps,
  RadioGroupProps,
  Rate,
  RateProps,
  Select,
  SelectProps,
  Slider,
  SliderSingleProps,
  Switch,
  SwitchProps,
  TimePicker,
  TimePickerProps,
  Transfer,
  TransferProps,
  TreeSelect,
  TreeSelectProps,
  Upload,
  UploadProps,
} from 'antd';
import { ReactNode } from 'react';

import { RangePickerProps } from 'antd/lib/date-picker';
import { PasswordProps, TextAreaProps } from 'antd/lib/input';
import { CheckboxGroupProps } from 'antd/lib/checkbox/Group';
import DCascader, { DCascaderProps } from '../../DCascader';
import DInput, { DInputProps } from '../../DInput';
import DSelect, { DSelectProps } from '../../DSelect';
import DTreeSelect, { DTreeSelectProps } from '../../DTreeSelect';
import DUpload, { DUploadProps } from '../../DUpload';

import { DItemBaseProps } from './itemType';

const renderMap = {
  dInput: (props: DInputProps, formItemProps: FormItemProps, label: DItemBaseProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <DInput placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  input: (props: InputProps, formItemProps: FormItemProps, label: DItemBaseProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <Input placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  textArea: (props: TextAreaProps, formItemProps: FormItemProps, label: DItemBaseProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <Input.TextArea placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  password: (props: PasswordProps, formItemProps: FormItemProps, label: DItemBaseProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <Input.Password placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  inputNumber: (props: InputNumberProps, formItemProps: FormItemProps, label: DItemBaseProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <InputNumber placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  autoComplete: (props: AutoCompleteProps, formItemProps: FormItemProps, label: DItemBaseProps['label']) => {
    const _props: AutoCompleteProps = props;
    return (
      <Form.Item {...formItemProps}>
        <AutoComplete placeholder={label ? `请输入${label}` : ''} {..._props} />
      </Form.Item>
    );
  },
  dSelect: (props: DSelectProps, formItemProps: FormItemProps, label: DItemBaseProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <DSelect placeholder={label ? `请选择${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  select: (props: SelectProps, formItemProps: FormItemProps, label: DItemBaseProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <Select placeholder={label ? `请选择${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  dCascader: (props: DCascaderProps, formItemProps: FormItemProps, label: DItemBaseProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <DCascader placeholder={label ? `请选择${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  cascader: (props: CascaderProps, formItemProps: FormItemProps, label: DItemBaseProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <Cascader placeholder={label ? `请选择${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  dTreeSelect: (props: DTreeSelectProps, formItemProps: FormItemProps, label: DItemBaseProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <DTreeSelect placeholder={label ? `请选择${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  treeSelect: (props: TreeSelectProps, formItemProps: FormItemProps, label: DItemBaseProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <TreeSelect placeholder={label ? `请选择${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  datePicker: (props: DatePickerProps, formItemProps: FormItemProps, label: DItemBaseProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <DatePicker placeholder={label ? `请选择${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  timePicker: (props: TimePickerProps, formItemProps: FormItemProps, label: DItemBaseProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <TimePicker placeholder={label ? `请选择${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  rangePicker: (props: RangePickerProps, formItemProps: FormItemProps) => {
    return (
      <Form.Item {...formItemProps}>
        <DatePicker.RangePicker {...props} />
      </Form.Item>
    );
  },
  mentions: (props: MentionProps, formItemProps: FormItemProps, label: DItemBaseProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <Mentions placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  checkbox: (props: CheckboxProps, formItemProps: FormItemProps, label: DItemBaseProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <Checkbox {...props}>{label}</Checkbox>
      </Form.Item>
    );
  },
  checkboxGroup: (props: CheckboxGroupProps, formItemProps: FormItemProps) => {
    return (
      <Form.Item {...formItemProps}>
        <Checkbox.Group {...props} />
      </Form.Item>
    );
  },
  radio: (props: RadioProps, formItemProps: FormItemProps, label: DItemBaseProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <Radio {...props}>{label}</Radio>
      </Form.Item>
    );
  },
  radioGroup: (props: RadioGroupProps, formItemProps: FormItemProps) => {
    return (
      <Form.Item {...formItemProps}>
        <Radio.Group {...props} />
      </Form.Item>
    );
  },
  rate: (props: RateProps, formItemProps: FormItemProps) => {
    return (
      <Form.Item {...formItemProps}>
        <Rate {...props} />
      </Form.Item>
    );
  },
  slider: (props: SliderSingleProps, formItemProps: FormItemProps) => {
    return (
      <Form.Item {...formItemProps}>
        <Slider {...props} />
      </Form.Item>
    );
  },
  switch: (props: SwitchProps, formItemProps: FormItemProps) => {
    return (
      <Form.Item {...formItemProps}>
        <Switch {...props} />
      </Form.Item>
    );
  },
  transfer: (props: TransferProps<any>, formItemProps: FormItemProps, label: DItemBaseProps['label'], render: TransferProps<any>['render']) => {
    return (
      <Form.Item {...formItemProps}>
        <Transfer render={render} {...props}></Transfer>
      </Form.Item>
    );
  },
  upload: (props: UploadProps, formItemProps: FormItemProps, label: DItemBaseProps['label'], render: () => void, children: UploadProps['children']) => {
    return (
      <Form.Item {...formItemProps}>
        <Upload {...props}>{children || label || ''}</Upload>
      </Form.Item>
    );
  },
  dUpload: (
    props: DUploadProps,
    formItemProps: FormItemProps,
    // eslint-disable-next-line no-unused-vars
    render: (props: any) => ReactNode,
    children: DUploadProps['children'],
  ) => {
    return (
      <Form.Item {...formItemProps}>
        <DUpload {...props}>{children}</DUpload>
      </Form.Item>
    );
  },
  button: (props: ButtonProps, formItemProps: FormItemProps, label: DItemBaseProps['label']) => {
    return <Button {...props}>{label || ''}</Button>;
  },
  divider: (props: DividerProps, formItemProps: FormItemProps, label: DItemBaseProps['label']) => {
    return (
      <Divider orientation="left" orientationMargin={0} {...props}>
        {label}
      </Divider>
    );
  },
  other: (formItemProps: FormItemProps, children: DUploadProps['children']) => {
    return <Form.Item {...formItemProps}>{children}</Form.Item>;
  },
};

export default renderMap;
