/*
 * @Author       : wangfeihu
 * @Date         : 2023-06-12 17:35:10
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-06-15 08:36:23
 * @Description  : 根据renderType渲染对应的表单项组件
 */

import React, { ReactElement } from 'react';
import {
  Input,
  InputNumber,
  AutoComplete,
  Select,
  Cascader,
  TreeSelect,
  DatePicker,
  TimePicker,
  Mentions,
  Checkbox,
  Radio,
  Rate,
  Slider,
  Switch,
  Transfer,
  Upload,
  Form,
  Button,
  Divider,
  FormItemProps,
  SelectProps,
  AutoCompleteProps,
} from 'antd';

import DInput from '../DInput';
import DSelect from '../DSelect';
import DTreeSelect from '../DTreeSelect';
import DCascader from '../DCascader';
import { InternalItemProps } from './DItem';

const renderMap = {
  dInput: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
  ): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <DInput placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  input: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
  ): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <Input placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  textArea: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
  ): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <Input.TextArea placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  password: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
  ): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <Input.Password placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  inputNumber: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
  ): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <InputNumber placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  autoComplete: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
  ): ReactElement => {
    const _props: AutoCompleteProps = props;
    return (
      <Form.Item {...formItemProps}>
        <AutoComplete placeholder={label ? `请输入${label}` : ''} {..._props} />
      </Form.Item>
    );
  },
  dSelect: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
  ): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <DSelect placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  select: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
  ): ReactElement => {
    const _props: SelectProps = props;
    return (
      <Form.Item {...formItemProps}>
        <Select placeholder={label ? `请输入${label}` : ''} {..._props} />
      </Form.Item>
    );
  },
  dCascader: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
  ): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <DCascader placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  cascader: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
  ): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <Cascader placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  dTreeSelect: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
  ): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <DTreeSelect placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  treeSelect: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
  ): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <TreeSelect placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  datePicker: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
  ): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <DatePicker placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  timePicker: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
  ): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <TimePicker placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  rangePicker: (props: InternalItemProps, formItemProps: FormItemProps): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <DatePicker.RangePicker {...props} />
      </Form.Item>
    );
  },
  mentions: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
  ): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <Mentions placeholder={label ? `请输入${label}` : ''} {...props} />
      </Form.Item>
    );
  },
  checkbox: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
  ): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <Checkbox {...props}>{label}</Checkbox>
      </Form.Item>
    );
  },
  radio: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
  ): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <Radio {...props}>{label}</Radio>
      </Form.Item>
    );
  },
  rate: (props: InternalItemProps, formItemProps: FormItemProps): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <Rate {...props} />
      </Form.Item>
    );
  },
  slider: (props: InternalItemProps, formItemProps: FormItemProps): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <Slider {...props} />
      </Form.Item>
    );
  },
  switch: (props: InternalItemProps, formItemProps: FormItemProps): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <Switch {...props} />
      </Form.Item>
    );
  },
  transfer: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
    render: InternalItemProps['render'],
  ): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <Transfer render={render} {...props} />
      </Form.Item>
    );
  },
  upload: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
    render: InternalItemProps['render'],
    children: InternalItemProps['children'],
  ): ReactElement => {
    return (
      <Form.Item {...formItemProps}>
        <Upload {...props}>{children || label || ''}</Upload>
      </Form.Item>
    );
  },
  other: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
    render: InternalItemProps['render'],
    children: InternalItemProps['children'],
    allProps: InternalItemProps,
  ): ReactElement => {
    // rangePicker要求placeholder类型为string数组,在此对rangePicker类型做特殊处理
    const _placeholder = label ? `请输入${label}` : '';
    const placeholder: any =
      allProps.renderType === 'rangePicker' ? props.placeholder : _placeholder;

    return (
      <Form.Item {...formItemProps}>
        {render ? render({ placeholder, ...props }, formItemProps, allProps) : children}
      </Form.Item>
    );
  },
  button: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
  ): ReactElement => {
    return <Button {...props}>{label || ''}</Button>;
  },
  divider: (
    props: InternalItemProps,
    formItemProps: FormItemProps,
    label: InternalItemProps['label'],
  ): ReactElement => {
    return (
      <Divider orientation="left" orientationMargin={0} {...props}>
        {label}
      </Divider>
    );
  },
};

export default renderMap;
