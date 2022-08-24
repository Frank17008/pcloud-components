export interface LabelValueProps {
  /**
   * @description 文字标签
   */
  label: string | undefined;
  /**
   * @description 文字标签值
   */
  value?: string | undefined;
  /**
   * @description 文字标签值为空时的值
   * @default -
   */
  emptyValue?: string | undefined;
  /**
   * @description 类名
   */
  className?: string;
  /**
   * @description 是否不换行
   * @default false
   */
  noWrap?: boolean;
  /**
   * @description 是否隐藏冒号
   * @default false
   */
  noColon?: boolean;
}
