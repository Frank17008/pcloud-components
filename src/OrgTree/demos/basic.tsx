/**
 * title: 基本使用
 * description: 最简单的用法，展示基本组织架构树。
 */
import React, { useRef } from 'react';
import { OrgTree } from '@pointcloud/pcloud-components';
import type { OrgTreeNode } from '@pointcloud/pcloud-components';

const BasicDemo = () => {
  const orgTreeRef = useRef<any>(null);

  // 示例数据
  const data: OrgTreeNode = {
    id: '1',
    label: '总经理',
    title: '张三',
    children: [
      {
        id: '2',
        label: '技术部',
        title: '李四',
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
        title: '郑十一',
        children: [
          { id: '7', label: '市场专员1', title: '王十二' },
          { id: '8', label: '市场专员2', title: '李十三' },
        ],
      },
      {
        id: '4',
        label: '人事部',
        title: '张十四',
        children: [{ id: '9', label: '人事专员', title: '赵十五' }],
      },
    ],
  };

  // 节点点击事件
  const handleNodeClick = (event: React.MouseEvent, node: OrgTreeNode) => {
    console.log('节点点击:', node, event);
  };

  return (
    <div style={{ height: 500, overflow: 'auto' }}>
      <OrgTree data={data} onClick={handleNodeClick} />
    </div>
  );
};

export default BasicDemo;
