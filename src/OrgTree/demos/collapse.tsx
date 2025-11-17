/**
 * title: 折叠控制
 * description: 演示如何控制节点的可折叠性和展开状态
 */
import { useState, useRef } from 'react';
import { OrgTree } from '@pointcloud/pcloud-components';
import type { OrgTreeNode } from '@pointcloud/pcloud-components';
import { Switch } from 'antd';

const ControlCollapseDemo = () => {
  const orgTreeRef = useRef<any>(null);
  const [collapsable, setCollapsable] = useState<boolean>(true);

  // 示例数据 - 包含一些不可折叠的节点
  const data: OrgTreeNode = {
    id: '1',
    label: '总经理',
    title: '张三',
    children: [
      {
        id: '2',
        label: '技术部',
        title: '李四',
        // 技术部节点不可折叠
        collapsable: false,
        children: [
          {
            id: '5',
            label: '前端组',
            title: '王五',
            children: [
              { id: '10', label: '前端工程师1', title: '赵六' },
              { id: '11', label: '前端工程师2', title: '钱七' },
            ],
          },
          {
            id: '6',
            label: '后端组',
            title: '孙八',
            children: [
              { id: '12', label: '后端工程师1', title: '周九' },
              { id: '13', label: '后端工程师2', title: '吴十' },
            ],
          },
        ],
      },
      {
        id: '3',
        label: '市场部',
        title: '郑十一2',
        children: [
          { id: '7', label: '市场专员1', title: '王十二' },
          { id: '8', label: '市场专员2', title: '李十三' },
        ],
      },
      {
        id: '4',
        label: '人事部',
        title: '张十四',
        // 默认展开人事部节点
        expand: true,
        children: [{ id: '9', label: '人事专员', title: '赵十五' }],
      },
    ],
  };

  return (
    <div>
      <span>启用折叠功能:</span>
      <Switch
        checked={collapsable}
        onChange={(checked) => {
          setCollapsable(checked);
        }}
      />

      <div style={{ height: 500, overflow: 'auto' }}>
        <OrgTree ref={orgTreeRef} data={data} collapsable={collapsable} expandAll />
      </div>
    </div>
  );
};

export default ControlCollapseDemo;
