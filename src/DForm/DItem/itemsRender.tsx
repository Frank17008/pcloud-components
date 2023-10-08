/*
 * @Author       : wangfeihu
 * @Date         : 2023-06-12 17:35:10
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-08-16 16:54:13
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

import DCascader, { DCascaderProps } from '../../DCascader';
import DInput, { DInputProps } from '../../DInput';
import DSelect, { DSelectProps } from '../../DSelect';
import DTreeSelect, { DTreeSelectProps } from '../../DTreeSelect';
import DUpload, { DUploadProps } from '../../DUpload';

import { DItemProps } from './itemType';

const renderMap = {
  dInput: (props: DInputProps, formItemProps: FormItemProps, label: DItemProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <DInput placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  input: (props: InputProps, formItemProps: FormItemProps, label: DItemProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <Input placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  textArea: (props: TextAreaProps, formItemProps: FormItemProps, label: DItemProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <Input.TextArea placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  password: (props: PasswordProps, formItemProps: FormItemProps, label: DItemProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <Input.Password placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  inputNumber: (props: InputNumberProps, formItemProps: FormItemProps, label: DItemProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <InputNumber placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  autoComplete: (props: AutoCompleteProps, formItemProps: FormItemProps, label: DItemProps['label']) => {
    const _props: AutoCompleteProps = props;
    return (
      <Form.Item {...formItemProps}>
        <AutoComplete placeholder={label ? `请输入${label}` : ''} {..._props} />
      </Form.Item>
    );
  },
  dSelect: (props: DSelectProps, formItemProps: FormItemProps, label: DItemProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <DSelect placeholder={label ? `请选择${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  select: (props: SelectProps, formItemProps: FormItemProps, label: DItemProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <Select placeholder={label ? `请选择${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  dCascader: (props: DCascaderProps, formItemProps: FormItemProps, label: DItemProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <DCascader placeholder={label ? `请选择${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  cascader: (props: CascaderProps, formItemProps: FormItemProps, label: DItemProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <Cascader placeholder={label ? `请选择${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  dTreeSelect: (props: DTreeSelectProps, formItemProps: FormItemProps, label: DItemProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <DTreeSelect placeholder={label ? `请选择${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  treeSelect: (props: TreeSelectProps, formItemProps: FormItemProps, label: DItemProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <TreeSelect placeholder={label ? `请选择${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  datePicker: (props: DatePickerProps, formItemProps: FormItemProps, label: DItemProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <DatePicker placeholder={label ? `请选择${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  timePicker: (props: TimePickerProps, formItemProps: FormItemProps, label: DItemProps['label']) => {
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
  mentions: (props: MentionProps, formItemProps: FormItemProps, label: DItemProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <Mentions placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  checkbox: (props: CheckboxProps, formItemProps: FormItemProps, label: DItemProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <Checkbox {...props}>{label}</Checkbox>
      </Form.Item>
    );
  },
  radio: (props: RadioProps, formItemProps: FormItemProps, label: DItemProps['label']) => {
    return (
      <Form.Item {...formItemProps}>
        <Radio {...props}>{label}</Radio>
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
        <Slider />
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
  transfer: (props: TransferProps<any>, formItemProps: FormItemProps, label: DItemProps['label'], render: TransferProps<any>['render']) => {
    return (
      <Form.Item {...formItemProps}>
        <Transfer render={render} {...props} />
      </Form.Item>
    );
  },
  upload: (props: UploadProps, formItemProps: FormItemProps, label: DItemProps['label'], render: () => void, children: UploadProps['children']) => {
    return (
      <Form.Item {...formItemProps}>
        <Upload {...props}>{children || label || ''}</Upload>
      </Form.Item>
    );
  },
  dUpload: (
    props: DUploadProps,
    formItemProps: FormItemProps,
    label: DItemProps['label'],
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
  button: (props: ButtonProps, formItemProps: FormItemProps, label: DItemProps['label']) => {
    return <Button {...props}>{label || ''}</Button>;
  },
  divider: (props: DividerProps, formItemProps: FormItemProps, label: DItemProps['label']) => {
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
