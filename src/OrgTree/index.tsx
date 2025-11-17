import { forwardRef, useContext, useImperativeHandle, useRef, ReactElement } from 'react';
import { ConfigContext } from '@pointcloud/pcloud-components/ConfigProvider';
import OrgTreeComponent from 'react-org-tree';
import type { OrgTreeProps } from './interface';
import './index.less';

const OrgTree = forwardRef<any, OrgTreeProps>((props, ref): ReactElement | null => {
  const { data, className, style, collapsable = true, expandAll = false, labelWidth, labelClassName, ...otherProps } = props;

  const { getPrefixCls }: any = useContext(ConfigContext);
  const prefixCls = getPrefixCls('org-tree');

  const orgTreeRef = useRef<any>(null);

  // 暴露组件方法
  useImperativeHandle(ref, () => ({
    // 获取组织树实例
    getOrgTreeInstance: () => orgTreeRef.current,
  }));

  // 处理样式相关属性
  const treeStyle: React.CSSProperties = {};
  if (labelWidth) {
    treeStyle['--org-tree-label-width'] = typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth;
  }

  return (
    <div className={`${prefixCls} ${className || ''}`} style={style}>
      <div className={`${prefixCls}-container`}>
        <OrgTreeComponent
          ref={orgTreeRef}
          data={data}
          collapsable={collapsable}
          expandAll={expandAll}
          labelWidth={labelWidth}
          labelClassName={labelClassName}
          style={treeStyle}
          {...otherProps}
        />
      </div>
    </div>
  );
});

OrgTree.displayName = 'OrgTree';

export default OrgTree;
