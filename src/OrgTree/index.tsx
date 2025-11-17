import { forwardRef, useContext, useImperativeHandle, useRef, ReactElement } from 'react';
import { ConfigContext } from '@pointcloud/pcloud-components/ConfigProvider';
import OrgTreeComponent from 'react-org-tree';
import type { OrgTreeProps } from './interface';
import './index.less';

const OrgTree = forwardRef<any, OrgTreeProps>((props, ref): ReactElement | null => {
  const { data, className, style, ...otherProps } = props;

  const { getPrefixCls }: any = useContext(ConfigContext);
  const prefixCls = getPrefixCls('org-tree');

  const orgTreeRef = useRef<any>(null);

  // 暴露组件方法
  useImperativeHandle(ref, () => ({
    // 获取组织树实例
    getOrgTreeInstance: () => orgTreeRef.current,
    // 展开所有节点
    expandAll: () => {
      if (orgTreeRef.current && orgTreeRef.current.expandAll) {
        orgTreeRef.current.expandAll();
      }
    },
    // 折叠所有节点
    collapseAll: () => {
      if (orgTreeRef.current && orgTreeRef.current.collapseAll) {
        orgTreeRef.current.collapseAll();
      }
    },
  }));

  return (
    <div className={`${prefixCls} ${className || ''}`} style={style}>
      <div className={`${prefixCls}-container`}>
        <OrgTreeComponent ref={orgTreeRef} data={data} collapsable={true} expandAll={false} {...otherProps} />
      </div>
    </div>
  );
});

OrgTree.displayName = 'OrgTree';

export default OrgTree;
