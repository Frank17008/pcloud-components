export interface OrgTreeNode {
  /** 节点唯一标识 */
  id: string | number;
  /** 节点显示文本 */
  label: string;
  /** 节点标题 */
  title?: string;
  /** 子节点 */
  children?: OrgTreeNode[];
  /** 节点是否展开 */
  expand?: boolean;
  /** 节点是否可折叠 */
  collapsable?: boolean;
  /** 自定义节点类名 */
  className?: string;
  /** 节点数据 */
  [key: string]: any;
}

export interface OrgTreeProps {
  /** 组织树数据 */
  data: OrgTreeNode;
  /** 水平方向布局 */
  horizontal?: boolean;
  /** 节点展开/折叠回调 */
  // eslint-disable-next-line no-unused-vars
  onExpand?: (node: OrgTreeNode, expanded: boolean) => void;
  /** 自定义节点渲染 */
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: React.MouseEvent, node: OrgTreeNode) => void;
}
