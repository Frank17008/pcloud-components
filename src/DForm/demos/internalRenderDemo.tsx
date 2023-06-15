import React, { Button } from 'antd';
import { DForm, DFormProps } from '@pointcloud/pcloud-components';

const selectOptions = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
];

const treeSelectData = [
  { label: '选项1', value: '1', children: [{ label: '子选项1', value: '1-1', isLeaf: true }] },
  { label: '选项2', value: '2', isLeaf: true },
];

const transferDataSource = [
  { key: '1', title: '选项1', description: '这是第一个选项' },
  { key: '2', title: '选项2', description: '这是第二个选项' },
];

const items: DFormProps['items'] = [
  { name: '', label: '输入类组件', renderType: 'divider', orientation: 'center' },
  { name: 'dInput', label: 'dInput输入框', renderType: 'dInput' },
  { name: 'input', label: 'input输入框', renderType: 'input' },
  { name: 'textArea', label: 'textArea文本域', renderType: 'textArea' },
  { name: 'password', label: 'password密码框', renderType: 'password' },
  {
    name: 'inputNumber',
    label: 'inputNumber数字输入框',
    renderType: 'inputNumber',
    style: { width: '100%' },
  },
  {
    name: 'autoComplete',
    label: 'autoComplete自动完成',
    renderType: 'autoComplete',
    options: selectOptions,
  },
  { name: '', label: '下拉类组件', renderType: 'divider', orientation: 'center' },
  { name: 'dSelect', label: 'dSelect选择器', renderType: 'dSelect', options: selectOptions },
  { name: 'select', label: 'select选择器', renderType: 'select', options: selectOptions },
  {
    name: 'dCascader',
    label: 'dCascader联级选择',
    renderType: 'dCascader',
    options: treeSelectData,
  },
  { name: 'cascader', label: 'cascader联级选择', renderType: 'cascader', options: treeSelectData },
  {
    name: 'dTreeSelect',
    label: 'dTreeSelect选择器',
    renderType: 'dTreeSelect',
    treeData: treeSelectData,
  },
  {
    name: 'treeSelect',
    label: 'treeSelect选择器',
    renderType: 'treeSelect',
    treeData: treeSelectData,
  },
  { name: '', label: '日期类组件', renderType: 'divider', orientation: 'center' },
  {
    name: 'datePicker',
    label: 'datePicker日期选择器',
    renderType: 'datePicker',
    style: { width: 300 },
  },
  {
    name: 'timePicker',
    label: 'timePicker时间选择器',
    renderType: 'timePicker',
    style: { width: 300 },
  },
  {
    name: 'rangePicker',
    label: 'rangePicker时间范围选择器',
    renderType: 'rangePicker',
    style: { width: 300 },
  },
  { name: '', label: '其他组件', renderType: 'divider', orientation: 'center' },
  {
    name: 'checkbox',
    label: 'checkbox',
    renderType: 'checkbox',
    checked: false,
    formItemProps: { label: 'checkbox多选框' },
  },
  { name: 'mentions', label: 'mentions提及', renderType: 'mentions', options: selectOptions },
  { name: 'radio', label: 'radio', renderType: 'radio', formItemProps: { label: 'radio单选框' } },
  { name: 'rate', label: 'rate评分', renderType: 'rate' },
  { name: 'slider', label: 'slider滑动输入条', renderType: 'slider', style: { width: 300 } },
  {
    name: 'transfer',
    label: 'transfer穿梭框',
    renderType: 'transfer',
    dataSource: transferDataSource,
    render: (item) => item.title,
  },
  {
    name: 'upload',
    label: 'upload上传',
    renderType: 'upload',
    fileList: [],
    children: <Button>upload上传</Button>,
  },
  {
    name: 'uploadPicture',
    label: '+',
    renderType: 'upload',
    listType: 'picture-card',
    fileList: [],
    formItemProps: { label: 'upload卡片模式' },
  },
  { name: 'submit', label: '提交', renderType: 'button', htmlType: 'submit', type: 'primary' },
  {
    name: 'reset',
    label: '重置',
    renderType: 'button',
    htmlType: 'reset',
    style: { marginLeft: 16 },
  },
];

export default function InternalRenderDemo() {
  return <DForm items={items} layout="vertical" />;
}
