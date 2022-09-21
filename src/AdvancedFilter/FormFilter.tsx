import {
  Row,
  Col,
  Input,
  Button,
  DatePicker,
  Form,
  Radio,
  Select,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
} from 'antd';
import React, { useImperativeHandle } from 'react';
import { FProps, FormItem } from '.';
import './styles/index.less';

const grid = { xxl: { span: 6 }, xl: { span: 6 }, lg: { span: 8 } };
const formItemLayout = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };
export default (props: FProps) => {
  const { formItemConfig, showButton = true, onValuesChange, onSearch, onReset, formRef } = props;
  const [form] = Form.useForm();
  useImperativeHandle(formRef, () => ({
    resetFields: form.resetFields,
    setFieldsValue: form.setFieldsValue,
    form,
  }));
  const search = () => {
    let values = form.getFieldsValue();
    Object.keys(values).forEach((item) => {
      const config: any = formItemConfig.find((c) => c.name === item);
      const isDate = ['datePicker', 'rangePicker'].includes(config?.type);
      if (isDate && values[item]) {
        values = { ...values, ...formatTime({ [item]: values[item] }) };
      }
    });
    onSearch && onSearch(values);
  };
  const valuesChange = (v: any) => {
    const value = formatTime(v);
    onValuesChange && onValuesChange(value);
  };
  const formatTime = (v: any) => {
    const fieldName = Object.keys(v)[0];
    const config = formItemConfig.find((item) => item.name === fieldName);
    if (config?.type === 'datePicker') {
      v[fieldName] = v[fieldName]?.format(config?.format || 'YYYY-MM-DD HH:mm:ss');
    }
    if (config?.type === 'rangePicker') {
      v[fieldName] = [
        v[fieldName][0]?.format(config?.format || 'YYYY-MM-DD HH:mm:ss'),
        v[fieldName][1]?.format(config?.format || 'YYYY-MM-DD HH:mm:ss'),
      ];
    }
    return v;
  };
  const reset = () => {
    form.resetFields();
    onReset && onReset();
  };
  const renderComponent = (type: string, item: FormItem) => {
    switch (type) {
      case 'input':
        return (
          <Input {...item} allowClear placeholder={item.placeholder || `请输入${item.label}`} />
        );
      case 'inputNumber':
        return <InputNumber {...item} placeholder={item.placeholder || `请输入${item.label}`} />;
      case 'radio':
        return <Radio.Group {...item} options={item.options} />;
      case 'select':
        return (
          <Select
            {...item}
            allowClear
            placeholder={item.placeholder || `请选择${item.label}`}
            options={item.options}
          />
        );
      case 'checkbox':
        return <Checkbox.Group {...item} options={item.options} />;
      case 'switch':
        return <Switch />;
      case 'datePicker':
        return (
          <DatePicker
            {...item}
            allowClear
            placeholder={item.placeholder || `请选择${item.label}`}
          />
        );
      case 'rangePicker':
        return <DatePicker.RangePicker allowClear />;
      case 'treeSelect':
        return (
          <TreeSelect
            {...item}
            dropdownClassName="tree-select-filter"
            showSearch
            allowClear
            placeholder={item.placeholder || `请选择${item.label}`}
            treeData={item.options}
          />
        );
      default:
        return <></>;
    }
  };
  return (
    <Form
      {...formItemLayout}
      className="form-filter"
      form={form}
      colon={false}
      onValuesChange={valuesChange}
    >
      <Row className="filter-row">
        {formItemConfig?.map((item: FormItem) => {
          return (
            <Col key={item.name} {...grid} className="filter-col">
              <Form.Item label={item.label} name={item.name} className="filter-item">
                {renderComponent(item.type, item)}
              </Form.Item>
            </Col>
          );
        })}
      </Row>
      {showButton && (
        <Row className="search-btn">
          <Button type="primary" onClick={search}>
            查询
          </Button>
          <Button onClick={reset}>重置</Button>
        </Row>
      )}
    </Form>
  );
};
