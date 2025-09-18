import React from 'react';
import { ContextMenu } from '@pointcloud/pcloud-components';
import './demo3.less';

const Demo = () => {
  const renderMenuItem = (label: string) => (
    <div className="menu-item" key={label}>
      {label}
    </div>
  );

  return (
    <div className="scroll-container">
      <div className="scroll-content">
        <ContextMenu
          trigger={<div className="trigger-area">在这里右键点击 (菜单会跟随容器滚动)</div>}
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
        >
          {['选项1', '选项2', '选项3'].map(renderMenuItem)}
        </ContextMenu>
      </div>
    </div>
  );
};

export default Demo;
