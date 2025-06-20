import React from 'react';

export type FormItemType = 'input' | 'inputNumber' | 'radio' | 'select' | 'checkbox' | 'datePicker' | 'rangePicker' | 'switch' | 'treeSelect';

export interface FormItem {
  /**
   * @description 筛选项label文字
   */
  label?: string;
  /**
   * @description 筛选项字段名
   */
  name: string;
  /**
   * @description 筛选项类型
   */
  type: FormItemType;
  /**
   * @description 筛选项placeholder
   */
  placeholder?: string;
  /**
   * @description 筛选项的配置项(select|treeSelect时可用)
   */
  options?: any[];
  /**
   * @description 筛选项的格式化配置(rangePicker|datePicker时可用)
   */
  format?: string;
}
export interface FormProps {
  /**
   * @description 筛选项配置
   */
  formItemConfig: FormItem[];
  /**
   * @description 筛选项值变更时触发
   */
  onValuesChange?: (_values: any) => void;
  /**
   * @description 点击查询按钮时触发
   */
  onSearch?: (_v: any) => void;
  /**
   * @description 点击重置按钮时触发
   */
  onReset?: () => void;
}

export interface FProps extends FormProps {
  /**
   * @description 显示查询/重置按钮
   * @default true
   */
  showButton?: boolean;
  /**
   * @description 筛选项表单的Ref
   */

  formRef?: any;
}

export interface InputProps {
  /**
   * @description input检索框placeholder
   */
  placeholder?: string;
  /**
   * @description input检索框字段名
   */
  name: string;
  /**
   * @description input检索框回车时或点击检索图标时触发
   */
  inputSearch?: (_v: any) => void;
}
export interface FilterProps extends FormProps {
  /**
   * @description 左侧渲染区
   */
  left?: React.ReactNode;
  /**
   * @description 右侧渲染区
   */
  right?: React.ReactNode;
  /**
   * @description input检索框props
   */
  inputProps: InputProps;
  /**
   * @description children
   */
  children?: React.ReactNode;
  /**
   * @description 表单引用ref值
   */
  fRef?: any;
  /**
   * @description 筛选文字按钮图标
   */
  icon?: React.ReactNode;
}

export type AdvancedFilterProps = FilterProps;
export type FormFilterProps = FProps;
export type FotmItemProps = FormItem;
export type InputSearchProps = InputProps;
